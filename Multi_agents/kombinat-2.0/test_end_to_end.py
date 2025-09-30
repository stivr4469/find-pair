# test_end_to_end.py
"""
Скрипт для тестирования сквозной функциональности системы Kombinat.

Этот скрипт запускает полный цикл обработки задачи:
1. Инициализирует Redis стримы
2. Отправляет задачу в систему
3. Ожидает результаты от агентов
4. Проверяет правильность обработки
"""

import time
import uuid
from src.config import settings
from src.utils.redis_client import redis_client
from src.utils.logger import get_logger

logger = get_logger("EndToEndTest")

def test_end_to_end():
    """
    Выполняет сквозное тестирование системы Kombinat.
    """
    logger.info("=== НАЧАЛО СКВОЗНОГО ТЕСТИРОВАНИЯ ===")
    
    # Генерируем уникальный ID для теста
    test_task_id = f"test_{str(uuid.uuid4())[:8]}"
    task_description = f"Тестовая задача: создать модуль аутентификации для задачи {test_task_id}"
    
    logger.info(f"Тестируем с task_id: {test_task_id}")
    
    # Проверяем, что стримы существуют
    logger.info("Проверяем существование стримов...")
    streams = [settings.STREAM_TASKS, settings.STREAM_SPECS, settings.STREAM_PRS]
    for stream in streams:
        try:
            redis_client.xinfo_stream(stream)
            logger.info(f"Стрим {stream} существует")
        except:
            logger.info(f"Создаем стрим {stream}")
            redis_client.xadd(stream, {"init": "stream"})
    
    # Отправляем задачу в систему
    logger.info("1. Отправляем задачу в стрим kombinat:tasks...")
    task_message = {
        "task_id": test_task_id,
        "task_description": task_description
    }
    redis_client.xadd(settings.STREAM_TASKS, task_message)
    logger.info(f"Задача {test_task_id} отправлена")
    
    # Ждем немного, чтобы агенты обработали задачу
    logger.info("Ожидаем обработку задачи SpecAgent (около 3 секунд)...")
    time.sleep(5)
    
    # Проверяем стрим спецификаций
    logger.info("2. Проверяем стрим kombinat:specs на наличие спецификации...")
    spec_messages = redis_client.xread({settings.STREAM_SPECS: 0}, count=10, block=1000)
    
    found_test_spec = False
    spec_content = None
    if spec_messages:
        for stream_name, messages in spec_messages:
            for msg_id, msg_data in messages:
                if msg_data.get("task_id") == test_task_id:
                    logger.info(f"Найдена спецификация для задачи {test_task_id}")
                    logger.info(f"Содержимое: {msg_data.get('spec_content', '')[:100]}...")
                    found_test_spec = True
                    spec_content = msg_data.get('spec_content')
                    break
    
    if not found_test_spec:
        logger.warning(f"Спецификация для задачи {test_task_id} не найдена")
    
    # Ждем немного больше для генерации кода
    logger.info("Ожидаем обработку спецификации DevAgent (около 5 секунд)...")
    time.sleep(7)
    
    # Проверяем стрим PR'ов
    logger.info("3. Проверяем стрим kombinat:prs на наличие сгенерированного кода...")
    pr_messages = redis_client.xread({settings.STREAM_PRS: 0}, count=10, block=1000)
    
    found_test_code = False
    if pr_messages:
        for stream_name, messages in pr_messages:
            for msg_id, msg_data in messages:
                if msg_data.get("task_id") == test_task_id:
                    logger.info(f"Найден сгенерированный код для задачи {test_task_id}")
                    logger.info(f"Содержимое: {msg_data.get('code_content', '')[:100]}...")
                    found_test_code = True
                    break
    
    if not found_test_code:
        logger.warning(f"Сгенерированный код для задачи {test_task_id} не найден")
    
    if found_test_spec and found_test_code:
        logger.info("✅ СКВОЗНОЕ ТЕСТИРОВАНИЕ УСПЕШНО ПРОЙДЕНО!")
        logger.info(f"Задача {test_task_id} была успешно обработана обеими агентами")
        logger.info("- SpecAgent сгенерировал спецификацию")
        logger.info("- DevAgent сгенерировал код по спецификации")
        return True
    else:
        logger.info("❌ СКВОЗНОЕ ТЕСТИРОВАНИЕ ЧАСТИЧНО НЕ УДАЛОСЬ")
        if not found_test_spec:
            logger.info("- SpecAgent не обработал задачу (или обработка еще не завершена)")
        if not found_test_code:
            logger.info("- DevAgent не обработал спецификацию (или обработка еще не завершена)")
        return False

if __name__ == "__main__":
    test_end_to_end()