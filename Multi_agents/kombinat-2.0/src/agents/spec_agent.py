# src/agents/spec_agent.py
from typing import Dict, Any

from src.agents.base_worker import BaseWorker
from src.config import settings
from src.utils.redis_client import redis_client
from src.utils import llm_client

class SpecAgent(BaseWorker):
    """
    Агент, отвечающий за генерацию спецификаций с помощью LLM.
    Слушает стрим `tasks` и публикует результат в стрим `specs`.
    """
    def __init__(self):
        super().__init__(
            worker_name="spec_agent_01",
            stream_name=settings.STREAM_TASKS,
            group_name=settings.GROUP_TASKS
        )

    def process_message(self, message_id: str, data: Dict[str, Any]):
        """
        Обрабатывает сообщение из стрима `tasks`.
        """
        task_id = data.get("task_id", "unknown_task")
        task_description = data.get("task_description", "")

        if not task_description:
            self.logger.warning(f"Skipping message {message_id}: 'task_description' is missing.")
            return

        # 1. Сгенерировать спецификацию с помощью LLM
        system_prompt = "You are a senior software architect. Your task is to write a clear and concise technical specification based on a user request. The specification should be in Markdown format and describe the public API, internal structure, and acceptance criteria."
        user_prompt = f"Create a technical specification for the following task: '{task_description}'"
        
        try:
            spec = llm_client.generate_text(system_prompt, user_prompt)
        except Exception as e:
            self.logger.error(f"Failed to generate spec for task {task_id}: {e}")
            # Здесь можно добавить логику повторной попытки или отправки в стрим ошибок
            return

        # 2. Подготовить сообщение для следующего стрима
        output_data = {
            "task_id": task_id,
            "spec_id": f"spec_{task_id}",
            "spec_content": spec
        }

        # 3. Опубликовать результат в стрим `specs`
        redis_client.xadd(settings.STREAM_SPECS, output_data)
        self.logger.info(f"Published spec for task {task_id} to stream '{settings.STREAM_SPECS}'.")


if __name__ == "__main__":
    spec_agent = SpecAgent()
    spec_agent.run()