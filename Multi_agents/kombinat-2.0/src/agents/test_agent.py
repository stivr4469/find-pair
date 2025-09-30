# src/agents/test_agent.py
import tempfile
import os
import subprocess
import json
from typing import Dict, Any

from src.agents.base_worker import BaseWorker
from src.config import settings
from src.utils.redis_client import redis_client

class TestAgent(BaseWorker):
    """
    Агент, отвечающий за выполнение юнит-тестов.
    Слушает стрим `prs`, запускает pytest и публикует результат в стрим `test_results`.
    """
    def __init__(self):
        super().__init__(
            worker_name=f"test_agent_{os.getpid()}",  # Уникальное имя для каждого экземпляра
            stream_name=settings.STREAM_PRS,
            group_name=settings.GROUP_PRS_TESTERS
        )

    def _run_tests(self, files: Dict[str, str]) -> (bool, str):
        """
        Запускает pytest на предоставленных файлах.
        Возвращает кортеж (is_success: bool, output: str).
        """
        # Создаем временный каталог для тестов
        with tempfile.TemporaryDirectory() as temp_dir:
            # Создаем структуру каталогов и файлы
            file_paths = []
            for file_path, content in files.items():
                full_path = os.path.join(temp_dir, file_path)
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                file_paths.append(full_path)

            self.logger.info(f"Running tests in temporary directory: {temp_dir}")
            
            try:
                # Запускаем pytest как подпроцесс в директории с тестами
                # -v для подробного вывода, --tb=short для сокращенного трейсбэка
                command = ['python', '-m', 'pytest', '-v', '--tb=short']
                result = subprocess.run(
                    command, 
                    cwd=temp_dir, 
                    capture_output=True, 
                    text=True,
                    timeout=60  # Ограничение времени выполнения
                )

                if result.returncode == 0:
                    self.logger.info("All tests passed.")
                    return True, "All tests passed successfully."
                else:
                    self.logger.warning(f"Tests failed with return code {result.returncode}.")
                    return False, f"Tests failed:\nSTDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}"
            
            except subprocess.TimeoutExpired:
                self.logger.error("Tests execution timed out.")
                return False, "Tests execution timed out after 60 seconds."
            except Exception as e:
                self.logger.error(f"Failed to run tests: {e}")
                return False, f"Failed to run tests: {str(e)}"

    def process_message(self, message_id: str, data: Dict[str, Any]):
        """
        Обрабатывает сообщение из стрима `prs`.
        """
        task_id = data.get("task_id", "unknown_task")
        pr_id = data.get("pr_id", "unknown_pr")
        files_json = data.get("files_json", "{}")

        try:
            files = json.loads(files_json)
        except json.JSONDecodeError:
            self.logger.error(f"Failed to decode files_json for message {message_id}.")
            return

        if not files:
            self.logger.warning(f"Skipping message {message_id}: 'files_json' is empty.")
            return

        # 1. Запустить тесты
        is_success, details = self._run_tests(files)

        # 2. Подготовить сообщение для следующего стрима
        output_data = {
            "task_id": task_id,
            "pr_id": pr_id,
            "test_status": "SUCCESS" if is_success else "FAILURE",
            "test_details": details
        }

        # 3. Опубликовать результат в стрим `test_results`
        redis_client.xadd(settings.STREAM_TEST_RESULTS, output_data)
        self.logger.info(f"Published test results for PR {pr_id} to stream '{settings.STREAM_TEST_RESULTS}'.")


if __name__ == "__main__":
    """
    Точка входа для запуска воркера TestAgent.
    """
    test_agent = TestAgent()
    test_agent.run()