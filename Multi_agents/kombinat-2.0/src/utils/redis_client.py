# src/utils/redis_client.py
import redis
import time
from src.config import settings

def get_redis_client() -> redis.Redis:
    """
    Создает и возвращает клиент для подключения к Redis.
    Использует decode_responses=True для автоматического декодирования ответов из UTF-8.
    Реализует повторные попытки подключения при недоступности Redis.
    """
    max_retries = 20
    retry_delay = 5  # seconds
    
    for attempt in range(max_retries):
        try:
            client = redis.Redis(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                decode_responses=True
            )
            # Проверяем соединение
            client.ping()
            print(f"Successfully connected to Redis at {settings.REDIS_HOST}:{settings.REDIS_PORT}")
            return client
        except redis.exceptions.ConnectionError as e:
            if attempt < max_retries - 1:
                print(f"Failed to connect to Redis at {settings.REDIS_HOST}:{settings.REDIS_PORT}. "
                      f"Retrying in {retry_delay} seconds... (Attempt {attempt + 1}/{max_retries})")
                time.sleep(retry_delay)
            else:
                print(f"Fatal: Could not connect to Redis at {settings.REDIS_HOST}:{settings.REDIS_PORT} "
                      f"after {max_retries} attempts. Error: {e}")
                exit(1)

# Создаем единый экземпляр клиента для всего приложения
redis_client = get_redis_client()