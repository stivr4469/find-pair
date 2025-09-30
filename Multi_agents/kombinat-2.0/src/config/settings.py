# src/config/settings.py
import os
from . import loader  # Загружает переменные из .env при импорте

# --- Настройки подключения к Redis ---
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

# --- Имена стримов ---
STREAM_TASKS = os.getenv("STREAM_TASKS", "kombinat:tasks")
STREAM_SPECS = os.getenv("STREAM_SPECS", "kombinat:specs")
STREAM_PRS = os.getenv("STREAM_PRS", "kombinat:prs")
STREAM_LINT_RESULTS = os.getenv("STREAM_LINT_RESULTS", "kombinat:lint_results")
STREAM_TEST_RESULTS = os.getenv("STREAM_TEST_RESULTS", "kombinat:test_results")

# --- Имена Consumer Groups ---
GROUP_TASKS = os.getenv("GROUP_TASKS", "spec_agents_group")
GROUP_SPECS = os.getenv("GROUP_SPECS", "dev_agents_group")
GROUP_PRS_LINTERS = os.getenv("GROUP_PRS_LINTERS", "lint_agents_group")
GROUP_PRS_TESTERS = os.getenv("GROUP_PRS_TESTERS", "test_agents_group")
GROUP_RESULTS_ORCHESTRATOR = os.getenv("GROUP_RESULTS_ORCHESTRATOR", "orchestrator_group") # Новая группа

# --- Настройки LLM ---
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL_NAME")

# --- Настройки цикла ---
MAX_REWORK_ITERATIONS = 10