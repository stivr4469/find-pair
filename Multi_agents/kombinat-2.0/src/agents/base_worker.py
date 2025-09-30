# src/agents/base_worker.py
import time
from abc import ABC, abstractmethod
from typing import Dict, Any
from redis.exceptions import RedisError

from src.utils.redis_client import redis_client
from src.utils.logger import get_logger

class BaseWorker(ABC):
    """
    Абстрактный базовый класс для всех агентов-воркеров.
    Инкапсулирует логику работы с Redis Streams:
    - Подключение к стриму и группе потребителей.
    - Автоматическое создание стрима и группы, если они не существуют.
    - Бесконечный цикл чтения и обработки сообщений.
    - Подтверждение (ACK) успешно обработанных сообщений.
    - Базовая обработка ошибок и логирование.
    """
    def __init__(self, worker_name: str, stream_name: str, group_name: str):
        self.worker_name = worker_name
        self.stream_name = stream_name
        self.group_name = group_name
        self.redis = redis_client
        self.logger = get_logger(self.worker_name)
        
        self._ensure_group_exists()

    def _ensure_group_exists(self):
        """
        Убеждается, что стрим и группа потребителей существуют.
        Если нет - создает их.
        """
        try:
            # Проверяем информацию о группах для данного стрима
            self.redis.xinfo_groups(self.stream_name)
            self.logger.info(f"Stream '{self.stream_name}' already exists.")
        except RedisError as e:
            # Если стрим не существует, Redis выдаст ошибку
            if "no such key" in str(e).lower():
                self.logger.info(f"Stream '{self.stream_name}' does not exist. Creating it.")
                # Создаем стрим, добавляя в него "пустое" сообщение
                self.redis.xadd(self.stream_name, {"init": "stream"})
            else:
                self.logger.error(f"Unexpected Redis error when checking stream: {e}")
                raise

        try:
            # Пытаемся создать группу. Если она уже есть, ничего не произойдет.
            # mkstream=True создает стрим, если он не существует.
            self.redis.xgroup_create(self.stream_name, self.group_name, id='0', mkstream=True)
            self.logger.info(f"Consumer group '{self.group_name}' created or already exists.")
        except RedisError as e:
            # Ошибка "BUSYGROUP" означает, что группа уже существует, это нормально.
            if "BUSYGROUP" not in str(e):
                self.logger.error(f"Failed to create consumer group '{self.group_name}': {e}")
                raise
            else:
                self.logger.info(f"Consumer group '{self.group_name}' already exists.")

    @abstractmethod
    def process_message(self, message_id: str, data: Dict[str, Any]):
        """
        Абстрактный метод для обработки сообщения.
        Должен быть реализован в каждом конкретном воркере.
        """
        pass

    def run(self):
        """
        Основной цикл работы воркера.
        """
        self.logger.info(f"Worker '{self.worker_name}' started. Listening to stream '{self.stream_name}'...")
        while True:
            try:
                # Ожидаем новые сообщения в стриме
                # '>' означает "новые сообщения, которые еще не были доставлены никому в группе"
                # block=0 означает бесконечное ожидание
                response = self.redis.xreadgroup(
                    groupname=self.group_name,
                    consumername=self.worker_name,
                    streams={self.stream_name: '>'},
                    count=1,
                    block=0
                )

                if not response:
                    continue

                # response - это список стримов, у нас он один
                stream, messages = response[0]
                for message_id, data in messages:
                    self.logger.info(f"Received message {message_id}: {data}")
                    
                    try:
                        # Основная логика обработки
                        self.process_message(message_id, data)
                        
                        # Подтверждаем успешную обработку
                        self.redis.xack(self.stream_name, self.group_name, message_id)
                        self.logger.info(f"Successfully processed and ACKed message {message_id}.")
                        
                    except Exception as e:
                        # При любой ошибке логируем, но НЕ подтверждаем сообщение.
                        # Оно останется в Pending Entries List (PEL) для повторной обработки.
                        self.logger.error(f"Error processing message {message_id}: {e}", exc_info=True)

            except RedisError as e:
                self.logger.error(f"Redis connection error: {e}. Reconnecting in 5 seconds...")
                time.sleep(5)
            except Exception as e:
                self.logger.error(f"An unexpected error occurred in the worker loop: {e}", exc_info=True)
                time.sleep(5)