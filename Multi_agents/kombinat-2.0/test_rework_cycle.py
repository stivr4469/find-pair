#!/usr/bin/env python3
"""
Тест для проверки цикла доработки при ошибках линтинга.
Этот скрипт проверяет, что оркестратор корректно обрабатывает ошибки
и отправляет задачи на доработку.
"""

import time
import uuid
from src.config import settings
from src.utils.redis_client import redis_client
from src.utils.logger import get_logger

logger = get_logger("ReworkCycleTest")


def test_rework_cycle():
    """
    Проверяет цикл доработки при ошибках линтинга.
    """
    logger.info("=== НАЧАЛО ТЕСТА ЦИКЛА ДОРАБОТКИ ===")
    
    # Генерируем уникальный ID для теста
    test_task_id = f"test_rework_{str(uuid.uuid4())[:8]}"
    task_description = f"Тестовая задача с плохим стилем кода: {test_task_id}"
    
    logger.info(f"Тестируем цикл доработки с task_id: {test_task_id}")
    
    # Отправляем задачу в систему (она будет обработана DevAgent'ом)
    logger.info("1. Отправляем задачу в стрим kombinat:tasks...")
    task_message = {
        "task_id": test_task_id,
        "task_description": task_description
    }
    redis_client.xadd(settings.STREAM_TASKS, task_message)
    logger.info(f"Задача {test_task_id} отправлена")
    
    # Ждем немного, чтобы DevAgent сгенерировал код
    logger.info("Ожидаем генерацию кода DevAgent'ом (около 5 секунд)...")
    time.sleep(7)
    
    # Создаем искусственную ошибку линтинга, отправив сообщение с плохим кодом в PR-стрим
    pr_id = f"pr_for_{test_task_id}"
    bad_code_content = '''
def function_with_bad_style( ) : # лишние пробелы
    x=1 # нет пробелов вокруг оператора
    y = x*2 # нет пробелов вокруг оператора
    if y> x: # нет пробелов вокруг оператора
        return y
     
    
    '''
    
    files_json = '{"bad_style.py": ' + repr(bad_code_content) + '}'
    
    logger.info("2. Отправляем код с ошибками стиля в стрим kombinat:prs...")
    pr_message = {
        "task_id": test_task_id,
        "pr_id": pr_id,
        "files_json": files_json
    }
    redis_client.xadd(settings.STREAM_PRS, pr_message)
    logger.info(f"Код с ошибками отправлен для PR {pr_id}")
    
    # Ждем, пока линтер обработает код
    logger.info("Ожидаем обработку кода линтером (около 5 секунд)...")
    time.sleep(7)
    
    # Проверим, есть ли ошибки линтинга
    logger.info("3. Проверяем стрим kombinat:lint_results на наличие ошибок линтинга...")
    lint_messages = redis_client.xread({settings.STREAM_LINT_RESULTS: 0}, count=10, block=1000)
    
    found_lint_error = False
    original_task_failed = False
    
    if lint_messages:
        for stream_name, messages in lint_messages:
            for msg_id, msg_data in messages:
                if msg_data.get("task_id") == test_task_id:
                    logger.info(f"Найден результат линтинга для задачи {test_task_id}")
                    lint_status = msg_data.get("lint_status")
                    logger.info(f"Статус линтинга: {lint_status}")
                    if lint_status == "FAILURE":
                        logger.info(f"Обнаружена ошибка линтинга: {msg_data.get('lint_details', '')[:100]}...")
                        found_lint_error = True
                        original_task_failed = True
                    break
    
    # Ждем, пока оркестратор обработает ошибку и создаст задачу на доработку
    logger.info("Ожидаем обработку ошибки оркестратором (около 5 секунд)...")
    time.sleep(7)
    
    # Проверяем стрим задач на наличие задач доработки
    logger.info("4. Проверяем стрим kombinat:tasks на наличие задач доработки...")
    task_messages = redis_client.xread({settings.STREAM_TASKS: 0}, count=10, block=1000)
    
    found_rework_task = False
    if task_messages:
        for stream_name, messages in task_messages:
            for msg_id, msg_data in messages:
                task_id_in_msg = msg_data.get("task_id", "")
                if "rework_" in task_id_in_msg and test_task_id in task_id_in_msg:
                    logger.info(f"Найдена задача на доработку: {task_id_in_msg}")
                    logger.info(f"Описание задачи: {msg_data.get('task_description', '')[:100]}...")
                    found_rework_task = True
                    break
    
    if original_task_failed and found_rework_task:
        logger.info("✅ ТЕСТ ЦИКЛА ДОРАБОТКИ УСПЕШНО ПРОЙДЕН!")
        logger.info(f"Задача {test_task_id} провалилась на этапе линтинга")
        logger.info(f"Оркестратор создал задачу на доработку")
        return True
    else:
        logger.info("❌ ТЕСТ ЦИКЛА ДОРАБОТКИ ЧАСТИЧНО НЕ УДАЛСЯ")
        if not original_task_failed:
            logger.info("- Ошибка линтинга не была создана или не была найдена")
        if not found_rework_task:
            logger.info("- Задача на доработку не была создана оркестратором")
        
        # Проверим все сообщения в стриме задач для отладки
        logger.info("Дополнительная информация: все сообщения в STREAM_TASKS:")
        all_task_messages = redis_client.xread({settings.STREAM_TASKS: 0}, count=20, block=1000)
        if all_task_messages:
            for stream_name, messages in all_task_messages:
                for msg_id, msg_data in messages:
                    logger.info(f"  - {msg_data.get('task_id', 'no_id')}: {msg_data.get('task_description', '')[:50]}...")
        return False


if __name__ == "__main__":
    test_rework_cycle()