# Полная инструкция по запуску приложения Kombinat-2.0

## Общая информация

Kombinat-2.0 - это многоагентная система для автоматического программирования, которая использует различные агенты для разработки, тестирования, линтирования и оркестрации задач. Приложение разработано для запуска в Docker-контейнерах с использованием Docker Compose.

## Структура приложения

Приложение состоит из следующих компонентов:
- Redis (как основное хранилище сообщений)
- SpecAgent (создает технические спецификации)
- DevAgent (генерирует код)
- LintAgent (проверяет код на ошибки)
- TestAgent (запускает тесты)
- Orchestrator Listener (координирует работу агентов)

## Требования к системе

- Docker Engine (с поддержкой Docker Compose)
- Python 3.11 (для локального тестирования)
- Доступ к LLM-серверу (в данном случае, на IP-адресе 192.168.88.78:1234)

## Подготовка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd kombinat-2.0
```

### 2. Настройка .env файла

Копируем пример файла конфигурации:

```bash
cp .env.example .env
```

Или используем готовый .env файл с нужными настройками:

```bash
# .env
# Настройки подключения к Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Имена стримов
STREAM_TASKS=kombinat:tasks
STREAM_SPECS=kombinat:specs
STREAM_PRS=kombinat:prs
STREAM_LINT_RESULTS=kombinat:lint_results
STREAM_TEST_RESULTS=kombinat:test_results

# Имена Consumer Groups
GROUP_TASKS=spec_agents_group
GROUP_SPECS=dev_agents_group
GROUP_PRS_LINTERS=lint_agents_group
GROUP_PRS_TESTERS=test_agents_group
GROUP_RESULTS_ORCHESTRATOR=orchestrator_group

# Настройки LLM
OPENAI_API_BASE=http://192.168.88.78:1234/v1
OPENAI_API_KEY=not-needed-for-local
OPENAI_MODEL_NAME=openai/gpt-oss-20b
```

**ВАЖНО**: Адрес LLM-сервера должен быть доступен по адресу `192.168.88.78:1234` с протоколом OpenAI API.

## Запуск приложения

### 1. Остановка всех активных контейнеров (если были)

```bash
docker-compose down
```

Для полной очистки, включая осиротевшие контейнеры:

```bash
docker-compose down --remove-orphans
```

### 2. Запуск приложения

```bash
docker-compose up --build -d
```

Флаг `--build` гарантирует пересборку образов с последними изменениями, флаг `-d` запускает контейнеры в фоновом режиме.

### 3. Проверка состояния контейнеров

```bash
docker-compose ps
```

Все контейнеры должны быть в состоянии "Up". Пример корректного вывода:

```
Name                              Command               State                    Ports
---------------------------------------------------------------------------------------------------
kombinat-20_dev_agent_1           python -m src.agents.dev_agent   Up
kombinat-20_lint_agent_1          python -m src.agents.lint_agent  Up
kombinat-20_orchestrator_listener_1 python -m src.orchestrator.listener Up
kombinat-20_redis_1               docker-entrypoint.sh redis ...   Up      0.0.0.0:6380->6379/tcp
kombinat-20_spec_agent_1          python -m src.agents.spec_agent  Up
kombinat-20_test_agent_1_1        python -m src.agents.test_agent  Up
kombinat-20_test_agent_2_1        python -m src.agents.test_agent  Up
```

### 4. Проверка логов агентов

Для проверки корректной инициализации LLM-клиента:

```bash
docker-compose logs spec_agent
```

Должна быть строка подтверждения инициализации:

```
LLM client initialized and connected for model: openai/gpt-oss-20b
```

## ВАЖНО: Настройки Redis

**Порт Redis НИКОГДА не меняется** - он всегда остается на 6380 порту (как переадресованный с 6379). Это критически важно для внутренней работы приложения:

- Redis внутри контейнера работает на порту 6379
- Для доступа с хост-машины Redis доступен на порту 6380
- Все внутренние настройки контейнеров используют `redis:6379`
- Порт 6380 НИКОГДА не изменяется ни при каких обстоятельствах
- Даже при проблемах с Redis, НЕЛЬЗЯ менять порт 6380 на хост-машине

## Доступ к приложению

### Для проверки состояния Redis

Из командной строки хост-машины:

```bash
docker exec -i kombinat-20_redis_1 redis-cli -h localhost -p 6379 ping
```

Должен вернуть `PONG`.

### Для отправки задач в систему

```bash
docker exec -i kombinat-20_redis_1 redis-cli -h localhost -p 6379 XADD kombinat:tasks "*" task_id "task1" task_description "Implement authentication module with login and validate_token functions"
```

## Отладка и устранение неполадок

### 1. Проверка доступности LLM-сервера

```bash
curl -s http://192.168.88.78:1234/v1/models
```

Должен вернуть список доступных моделей, включая `openai/gpt-oss-20b`.

### 2. Проверка логов отдельных агентов

```bash
docker-compose logs spec_agent
docker-compose logs dev_agent
docker-compose logs lint_agent
docker-compose logs test_agent
docker-compose logs orchestrator_listener
```

### 3. Непрерывный мониторинг логов

```bash
docker-compose logs -f
```

### 4. Для просмотра логов определенного агента в реальном времени

```bash
docker-compose logs -f spec_agent
```

## Остановка приложения

### Для полной остановки без сохранения состояния

```bash
docker-compose down
```

### Для временной остановки с сохранением состояния

```bash
docker-compose stop
```

### Для повторного запуска (после stop)

```bash
docker-compose start
```

## Перезапуск и обновления

### При изменении кода или конфигов

```bash
docker-compose down
docker-compose up --build -d
```

### При обновлении только одного агента

```bash
docker-compose down <agent_name>
docker-compose up <agent_name> --build -d
```

## Проверка работоспособности системы

После запуска система готова к работе, когда:

1. Все контейнеры в состоянии "Up"
2. В логах агентов нет ошибок подключения к LLM
3. В логах присутствует строка "LLM client initialized and connected for model: openai/gpt-oss-20b"
4. Redis доступен и принимает соединения
5. Агенты успешно подписываются на соответствующие стримы Redis

## Важные моменты

- Система автоматически обрабатывает ситуации, когда LLM-сервер недоступен, переключаясь в режим mock-ответов
- Контейнеры используют внутреннюю сеть Docker для общения между собой
- Настройки proxy автоматически отключены для предотвращения конфликтов с OpenAI-клиентом
- Порт Redis (6380) НЕЛЬЗЯ менять ни при каких обстоятельствах
- Система может обрабатывать рерайты задач (когда одна задача проходит через несколько этапов проверки)

## Заключение

После выполнения этих шагов приложение будет полностью готово к обработке задач. Система будет автоматически распределять задачи между агентами через Redis-стримы, используя LLM для генерации и проверки кода.