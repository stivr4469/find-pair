# src/orchestrator/listener.py
import time
import uuid
from typing import Dict, Any, List, Tuple
from redis.exceptions import RedisError

from src.utils.redis_client import redis_client
from src.utils.logger import get_logger
from src.config import settings

class OrchestratorListener:
    """
    Оркестратор-Слушатель, который реагирует на результаты проверок
    и замыкает цикл разработки, отправляя задачи на доработку.
    """
    def __init__(self):
        self.worker_name = "orchestrator_listener_01"
        self.group_name = settings.GROUP_RESULTS_ORCHESTRATOR
        self.streams_to_listen = [
            settings.STREAM_LINT_RESULTS,
            settings.STREAM_TEST_RESULTS,
        ]
        self.redis = redis_client
        self.logger = get_logger(self.worker_name)
        self._ensure_groups_exist()

    def _ensure_groups_exist(self):
        """Убеждается, что группы потребителей существуют для всех отслеживаемых стримов."""
        for stream in self.streams_to_listen:
            try:
                self.redis.xgroup_create(stream, self.group_name, id='0', mkstream=True)
                self.logger.info(f"Group '{self.group_name}' created for stream '{stream}'.")
            except RedisError as e:
                if "BUSYGROUP" in str(e):
                    self.logger.info(f"Group '{self.group_name}' already exists for stream '{stream}'.")
                else:
                    raise

    def process_failure(self, task_id: str, stage: str, report: str):
        """Обрабатывает провал на одном из этапов и отправляет задачу на доработку."""
        self.logger.warning(f"Task {task_id} FAILED at stage '{stage}'.")

        rework_task_description = (
            f"The previous attempt to complete task {task_id} failed at the '{stage}' stage.\n"
            f"Error report:\n---\n{report}\n---\n"
            "Please generate a new version of the code that fixes these specific issues."
        )
        new_task_id = f"rework_{task_id}_{uuid.uuid4().hex[:4]}"
        message_payload = {"task_id": new_task_id, "task_description": rework_task_description}
        self.redis.xadd(settings.STREAM_TASKS, message_payload)
        self.logger.info(f"Sent rework task {new_task_id} to stream '{settings.STREAM_TASKS}'.")

    def process_success(self, task_id: str, stage: str):
        """Обрабатывает успех на одном из этапов."""
        self.logger.info(f"Task {task_id} PASSED stage '{stage}'.")

    def handle_message(self, stream: str, message_id: str, data: Dict[str, str]):
        """Обрабатывает одно сообщение и гарантированно подтверждает его."""
        try:
            self.logger.info(f"Processing message {message_id} from stream '{stream}'...")
            task_id = data.get("task_id")
            if not task_id:
                self.logger.warning(f"Message {message_id} has no task_id. Skipping.")
                return

            if stream == settings.STREAM_LINT_RESULTS:
                if data.get("lint_status") == "FAILURE":
                    self.process_failure(task_id, "linting", data.get("lint_details", "No details."))
                else: self.process_success(task_id, "linting")
            
            elif stream == settings.STREAM_TEST_RESULTS:
                if data.get("test_status") == "FAILURE":
                    self.process_failure(task_id, "testing", data.get("test_report", "No details."))
                else: self.process_success(task_id, "testing")
        except Exception as e:
            self.logger.error(f"Error processing message {message_id}: {e}", exc_info=True)
        finally:
            self.redis.xack(stream, self.group_name, message_id)
            self.logger.info(f"ACKed message {message_id} from stream '{stream}'.")

    def run(self):
        """Основной цикл работы слушателя, использующий XAUTOCLAIM."""
        self.logger.info(f"Orchestrator Listener started. Listening to: {self.streams_to_listen}")
        
        streams_for_new = {stream: '>' for stream in self.streams_to_listen}

        while True:
            try:
                # ШАГ 1: Проверить и забрать "зависшие" сообщения, которые не подтверждались более 5 секунд.
                for stream in self.streams_to_listen:
                    # min_idle_time в миллисекундах
                    response = self.redis.xautoclaim(stream, self.group_name, self.worker_name, min_idle_time=5000, count=10)
                    if response and response[1]:
                        claimed_messages = response[1]
                        self.logger.warning(f"Claimed {len(claimed_messages)} stuck message(s) from stream '{stream}'. Processing...")
                        for msg_id, msg_data in claimed_messages:
                            self.handle_message(stream, msg_id, msg_data)

                # ШАГ 2: Если зависших нет, ждем новые сообщения.
                response = self.redis.xreadgroup(
                    groupname=self.group_name,
                    consumername=self.worker_name,
                    streams=streams_for_new,
                    count=10,
                    block=5000 # Ждем до 5 секунд
                )
                if response:
                    for stream, messages in response:
                        for msg_id, msg_data in messages:
                            self.handle_message(stream, msg_id, msg_data)

            except RedisError as e:
                self.logger.error(f"Redis connection error: {e}. Reconnecting...")
                time.sleep(5)
            except Exception as e:
                self.logger.error(f"An unexpected error in main loop: {e}", exc_info=True)
                time.sleep(5)

if __name__ == "__main__":
    listener = OrchestratorListener()
    listener.run()