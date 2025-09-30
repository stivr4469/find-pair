# Dockerfile
# Используем легковесный и современный образ Python
FROM python:3.11-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Добавляем /app в PYTHONPATH для корректного импорта модулей
ENV PYTHONPATH=/app

# Копируем файл с зависимостями
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь исходный код в рабочую директорию
COPY . .

# Команда для запуска будет передаваться через docker-compose