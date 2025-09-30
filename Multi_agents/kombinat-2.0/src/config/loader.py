# src/config/loader.py
import os
from dotenv import load_dotenv

# Определяем путь к .env файлу относительно текущего файла
# Это делает загрузку независимой от того, откуда запускается скрипт
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')

if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    print("Warning: .env file not found. Using default environment variables.")