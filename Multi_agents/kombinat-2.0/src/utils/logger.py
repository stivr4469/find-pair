# src/utils/logger.py
import logging
import sys

def get_logger(name: str) -> logging.Logger:
    """
    Настраивает и возвращает логгер с единым форматом.
    """
    logger = logging.getLogger(name)
    
    # Предотвращаем дублирование хендлеров, если логгер уже был настроен
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        
        # Создаем хендлер для вывода в stdout
        handler = logging.StreamHandler(sys.stdout)
        
        # Устанавливаем форматтер
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - [%(levelname)s] - %(message)s'
        )
        handler.setFormatter(formatter)
        
        # Добавляем хендлер к логгеру
        logger.addHandler(handler)
        
    return logger

# Пример использования:
# from src.utils.logger import get_logger
# logger = get_logger(__name__)
# logger.info("This is an info message.")