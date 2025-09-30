# run_system.py
"""
Скрипт для запуска системы Kombinat.

Для запуска системы выполните:
1. docker-compose up --build (в отдельном терминале)
2. python run_system.py (в этом терминале)

Альтернативно, вы можете просто запустить агентов с помощью Docker Compose,
а затем использовать этот скрипт для инициации задач.
"""

import time
import subprocess
import sys
import os

def check_docker_compose():
    """Проверяет, запущены ли все сервисы через docker-compose"""
    try:
        result = subprocess.run(['docker-compose', 'ps'], capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker Compose статус сервисов:")
            print(result.stdout)
            return True
        else:
            print("Ошибка при проверке docker-compose:")
            print(result.stderr)
            return False
    except FileNotFoundError:
        print("Docker Compose не найден. Убедитесь, что Docker установлен и в PATH.")
        return False

def start_system():
    """Запускает систему с помощью docker-compose в фоновом режиме"""
    print("Запускаем систему с помощью Docker Compose...")
    try:
        subprocess.run(['docker-compose', 'up', '-d', '--build'], check=True)
        print("Система запущена в фоновом режиме.")
        print("Сервисы запускаются. Подождите около 10 секунд для полной инициализации...")
        time.sleep(10)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при запуске системы: {e}")
        return False

def stop_system():
    """Останавливает систему"""
    print("Останавливаем систему с помощью Docker Compose...")
    try:
        subprocess.run(['docker-compose', 'down'], check=True)
        print("Система остановлена.")
    except subprocess.CalledProcessError as e:
        print(f"Ошибка при остановке системы: {e}")

def main():
    print("=== Kombinat System Runner ===")
    print("Проверяем статус запущенных сервисов...")
    
    if not check_docker_compose():
        response = input("Docker Compose не запущен. Запустить систему? (y/n): ")
        if response.lower() == 'y':
            if start_system():
                print("Система успешно запущена!")
            else:
                print("Не удалось запущить систему.")
                return
        else:
            print("Продолжение работы невозможно без запущенных сервисов.")
            return
    else:
        print("Сервисы уже запущены.")
    
    # Проверяем, можем ли мы запустить инициатор задач
    response = input("Запустить инициатор задач? (y/n): ")
    if response.lower() == 'y':
        from src.orchestrator.main import initiate_task
        print("Запускаем инициатор задач...")
        initiate_task()
        
        print("\nСистема будет обрабатывать задачу. Вы можете:")
        print("- Проверить логи агентов: docker-compose logs -f")
        print("- Запустить тест: python test_end_to_end.py")
    
    print("\nДля завершения работы системы выполните: python run_system.py stop")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "stop":
        stop_system()
    else:
        main()