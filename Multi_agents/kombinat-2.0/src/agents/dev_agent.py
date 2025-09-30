# src/agents/dev_agent.py
import json
from typing import Dict, Any

from src.agents.base_worker import BaseWorker
from src.config import settings
from src.utils.redis_client import redis_client
from src.utils import llm_client

class DevAgent(BaseWorker):
    """
    Агент, отвечающий за генерацию кода и тестов по спецификации с помощью LLM.
    Слушает стрим `specs` и публикует результат в стрим `prs`.
    """
    def __init__(self):
        super().__init__(
            worker_name="dev_agent_01",
            stream_name=settings.STREAM_SPECS,
            group_name=settings.GROUP_SPECS
        )

    def process_message(self, message_id: str, data: Dict[str, Any]):
        """
        Обрабатывает сообщение из стрима `specs`.
        """
        task_id = data.get("task_id", "unknown_task")
        spec_id = data.get("spec_id", "unknown_spec")
        spec_content = data.get("spec_content", "")

        if not spec_content:
            self.logger.warning(f"Skipping message {message_id}: 'spec_content' is missing.")
            return

        # 1. Сгенерировать код и тесты с помощью LLM
        system_prompt = """You are an expert Python developer. Your task is to generate code and corresponding unit tests based on a technical specification.
You MUST respond with a single JSON object. This JSON object must have file paths as keys and the code content as string values.
Example response format:
{
  "src/module/main.py": "class MyClass:\\n  pass",
  "tests/test_main.py": "import pytest\\nfrom src.module.main import MyClass\\n\\ndef test_my_class():\\n  assert MyClass is not None"
}
Do not add any text or explanations outside of the JSON object.
"""
        user_prompt = f"Generate the Python code and pytest unit tests for the following specification:\n\n---\n\n{spec_content}"

        try:
            response_text = llm_client.generate_text(system_prompt, user_prompt, temperature=0.2)
            # LLM может вернуть код, обернутый в ```json ... ```, очистим это
            if response_text.startswith("```json"):
                response_text = response_text[7:-3].strip()
            
            files = json.loads(response_text)

        except json.JSONDecodeError:
            self.logger.error(f"Failed to decode JSON from LLM response for task {task_id}. Response was:\n{response_text}")
            return
        except Exception as e:
            self.logger.error(f"Failed to generate code for task {task_id}: {e}")
            return

        # 2. Подготовить сообщение для следующего стрима
        output_data = {
            "task_id": task_id,
            "spec_id": spec_id,
            "pr_id": f"pr_{task_id}",
            "branch_name": f"feature/task_{task_id}",
            "files_json": json.dumps(files)
        }

        # 3. Опубликовать результат в стрим `prs`
        redis_client.xadd(settings.STREAM_PRS, output_data)
        self.logger.info(f"Published generated code and tests for task {task_id} to stream '{settings.STREAM_PRS}'.")


if __name__ == "__main__":
    dev_agent = DevAgent()
    dev_agent.run()