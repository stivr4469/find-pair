# src/utils/llm_client.py
import json
from openai import OpenAI, APIConnectionError
from src.config import settings
from src.utils.logger import get_logger

logger = get_logger(__name__)

client = None
if settings.OPENAI_API_BASE:
    try:
        # Создаем клиент OpenAI без прокси, которые могут быть переданы из переменных окружения
        import os
        # Сохраняем любые возможные переменные прокси
        original_http_proxy = os.environ.get('HTTP_PROXY')
        original_https_proxy = os.environ.get('HTTPS_PROXY')
        original_no_proxy = os.environ.get('NO_PROXY')
        
        # Временно удаляем переменные прокси, чтобы избежать конфликта с OpenAI клиентом
        os.environ.pop('HTTP_PROXY', None)
        os.environ.pop('HTTPS_PROXY', None)
        os.environ.pop('NO_PROXY', None)
        
        client = OpenAI(
            base_url=settings.OPENAI_API_BASE,
            api_key=settings.OPENAI_API_KEY,
        )
        
        # Восстанавливаем переменные прокси, если они были
        if original_http_proxy is not None:
            os.environ['HTTP_PROXY'] = original_http_proxy
        if original_https_proxy is not None:
            os.environ['HTTPS_PROXY'] = original_https_proxy
        if original_no_proxy is not None:
            os.environ['NO_PROXY'] = original_no_proxy
        
        # Проверяем доступность сервера при инициализации
        client.models.list()
        logger.info(f"LLM client initialized and connected for model: {settings.OPENAI_MODEL_NAME}")
    except APIConnectionError:
        logger.warning("LLM server is not accessible. Client initialized, but will use mock responses.")
    except Exception as e:
        logger.error(f"Failed to initialize LLM client: {e}", exc_info=True)
        client = None
else:
    logger.warning("OPENAI_API_BASE environment variable is not set. LLM client will not be used.")


def get_mock_response(user_prompt: str) -> str:
    """
    Возвращает мок-ответ в зависимости от промпта.
    ИСПРАВЛЕННАЯ ЛОГИКА.
    """
    logger.info(f"Checking user prompt for mock response: {user_prompt[:100]}...")
    
    # ИСПРАВЛЕНИЕ: Проверка для DevAgent теперь более приоритетная и точная.
    # Проверяем на вхождение ключевых слов в нижнем регистре
    user_prompt_lower = user_prompt.lower()
    if "generate" in user_prompt_lower and "python code" in user_prompt_lower and "pytest" in user_prompt_lower:
        logger.warning("Returning MOCK response for DevAgent.")
        mock_files = {
            "src/auth.py": """
# MOCK CODE by DevAgent
class AuthError(Exception):
    pass

def login(username: str, password: str) -> str:
    if username == "admin" and password == "password123":
        # Преднамеренная ошибка для LintAgent: f-string без переменных
        f_string_error = f"User logged in"
        return "fake-jwt-token"
    else:
        raise AuthError("Invalid credentials")

def validate_token(token: str) -> bool:
    return token == "fake-jwt-token"
""",
            "tests/test_auth.py": """
# MOCK TESTS by DevAgent
import pytest
from src.auth import login, validate_token, AuthError

def test_login_success():
    assert login("admin", "password123") == "fake-jwt-token"

def test_login_failure():
    with pytest.raises(AuthError):
        login("user", "wrong_pass")

def test_validate_token_success():
    assert validate_token("fake-jwt-token") is True

def test_validate_token_failure():
    assert validate_token("invalid") is False
"""
        }
        return json.dumps(mock_files)
    
    # Мок для SpecAgent
    elif "Create a technical specification" in user_prompt:
        logger.warning("Returning MOCK response for SpecAgent.")
        return """
# MOCK SPECIFICATION
## Module: Mock Authentication
### API:
- `login(user, pass)`: returns token or raises AuthError.
- `validate(token)`: returns bool.
"""
    
    logger.info("Returning DEFAULT empty JSON mock response.")
    return "{}" # Default empty JSON


def generate_text(system_prompt: str, user_prompt: str, temperature: float = 0.7) -> str:
    """
    Генерирует текст с использованием LLM или возвращает мок-ответ при ошибке.
    """
    logger.info(f"LLM client availability: {'Available' if client else 'Not available'}")
    
    if not client:
        logger.warning("LLM client is not initialized. Using mock response.")
        return get_mock_response(user_prompt)

    try:
        response = client.chat.completions.create(
            model=settings.OPENAI_MODEL_NAME,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=temperature,
        )
        content = response.choices[0].message.content
        logger.info("Received response from LLM successfully.")
        return content.strip()
    except APIConnectionError as e:
        logger.warning(f"LLM server is not accessible. Using mock response. Error: {e}")
        return get_mock_response(user_prompt)
    except Exception as e:
        logger.error(f"An unexpected error occurred during LLM call: {e}", exc_info=True)
        raise