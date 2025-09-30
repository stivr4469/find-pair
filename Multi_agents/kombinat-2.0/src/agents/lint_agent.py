# src/agents/lint_agent.py
import subprocess
import tempfile
import os
import json
from typing import Dict, Any

from src.agents.base_worker import BaseWorker
from src.config import settings
from src.utils.redis_client import redis_client

class LintAgent(BaseWorker):
    """
    Агент, отвечающий за проверку качества кода (линтинг).
    Слушает стрим `prs`, выполняет `ruff` и публикует результат в стрим `lint_results`.
    """
    def __init__(self):
        super().__init__(
            worker_name="lint_agent_01",
            stream_name=settings.STREAM_PRS,
            group_name=settings.GROUP_PRS_LINTERS # Используем новую константу
        )

    def _run_linter_on_content(self, code_content: str) -> (bool, str):
        """Запускает линтер на переданном коде."""
        with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as tmp_file:
            tmp_file_path = tmp_file.name
            tmp_file.write(code_content)
            tmp_file.flush()

        self.logger.info(f"Running linter on temporary file: {tmp_file_path}")
        try:
            command = ['ruff', 'check', '--output-format=text', tmp_file_path]
            result = subprocess.run(command, capture_output=True, text=True)
            if result.returncode == 0:
                return True, "No issues found."
            else:
                return False, result.stdout
        except FileNotFoundError:
            return False, "`ruff` is not installed or not in PATH."
        finally:
            os.remove(tmp_file_path)

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

        total_issues = []
        overall_success = True

        # Проверяем каждый .py файл
        for file_path, content in files.items():
            if file_path.endswith('.py'):
                is_success, details = self._run_linter_on_content(content)
                if not is_success:
                    overall_success = False
                    total_issues.append(f"--- Issues in {file_path} ---\n{details}")

        lint_details = "\n".join(total_issues) if not overall_success else "No issues found."

        output_data = {
            "task_id": task_id,
            "pr_id": pr_id,
            "lint_status": "SUCCESS" if overall_success else "FAILURE",
            "lint_details": lint_details
        }

        redis_client.xadd(settings.STREAM_LINT_RESULTS, output_data)
        self.logger.info(f"Published lint results for PR {pr_id} to stream '{settings.STREAM_LINT_RESULTS}'.")


if __name__ == "__main__":
    lint_agent = LintAgent()
    lint_agent.run()