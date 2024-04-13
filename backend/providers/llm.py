from datetime import datetime

from openai import OpenAI

from backend.constants import OPENAI_API_KEY

# from backend.database.db import SessionLocal
from backend.database.models import OpenAIChat
from backend.providers.auth import verify_token

# from sqlite3 import connect as sqlite_connect


# from backend.routers.auth_router import LoginResponse
# from backend.utils.anonymizer import Anonymizer
# from backend.utils.pii_scrubber import PIIScrubber


class OpenAIWrapper:
    def __init__(self) -> None:
        self._client = OpenAI(api_key=OPENAI_API_KEY)
        # self.db = SessionLocal()

    def _send_openai_request(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
    ) -> None:
        """ """
        return self._client.chat.completions.create(
            messages=[{"role": "system", "content": prompt}],
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
        )

    def _save_to_db(self, response: str, uId: int) -> None:
        """ """
        current_time = datetime.utcnow().strftime("%H:%M")
        openai_response = OpenAIChat(
            response=response.content, user_id=uId, timestamp=current_time
        )
        self.db.add(openai_response)
        self.db.commit()
        # db_conn = sqlite_connect("guardian.db")
        # db_cursor = db_conn.cursor()

        # db_cursor.execute(
        #     "INSERT INTO openai_responses (response) VALUES (?)", (response,)
        # )

        # db_conn.commit()

    def get_user_id(self, token: str) -> int:
        """ """
        print(token)
        user = verify_token(token)
        print(user)
        user_id: int = user.get("user_id")
        return user_id
        # openai_response = OpenAIChat(user_id=user_id)
        # self.db.add(openai_response)
        # self.db.commit()

    def generate(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
        user_token: str,
    ) -> None:
        """ """

        # scrubber = PIIScrubber()
        # anonymizer = Anonymizer()

        # prompt = scrubber.scrub_input(prompt)
        # prompt = anonymizer.anonymize_input(prompt)

        openai_response = self._send_openai_request(
            model, prompt, max_tokens, temperature
        )
        openai_response = openai_response.choices[0].message

        # userId = self.get_user_id(user_token)
        # self._save_to_db(openai_response, userId)

        return {"openai_response": openai_response.content}
