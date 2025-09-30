# src/orchestrator/main.py
import uuid

from src.config import settings
from src.utils.redis_client import redis_client
from src.utils.logger import get_logger

# Получаем логгер для нашего инициатора
logger = get_logger("OrchestratorInitiator")

def initiate_task():
    """
    Инициирует новую задачу, отправляя сообщение в начальный стрим 'tasks'.
    """
    try:
        # 1. Генерируем уникальный ID для задачи
        task_id = str(uuid.uuid4())
        
        # 2. Определяем описание задачи (в будущем это может приходить из API, CLI и т.д.)
        task_description = "Создать модуль аутентификации с функциями login и validate_token"

        # 3. Формируем полезную нагрузку сообщения
        message_payload = {
            "task_id": task_id,
            "task_description": task_description,
        }

        # 4. Отправляем сообщение в стрим 'tasks'
        logger.info(f"Initiating new task with ID: {task_id}")
        logger.info(f"Task description: '{task_description}'")
        
        redis_client.xadd(settings.STREAM_TASKS, message_payload)
        
        logger.info(
            f"Successfully sent task {task_id} to stream '{settings.STREAM_TASKS}'."
        )
        logger.info("The agent pipeline has been triggered.")

    except Exception as e:
        logger.error(f"Failed to initiate task: {e}", exc_info=True)


if __name__ == "__main__":
    """
    Точка входа для запуска скрипта-инициатора.
    """
    initiate_task()