from datetime import datetime
from sqlite3 import connect as sqlite_connect

from openai import OpenAI

from backend.constants import OPENAI_API_KEY
from backend.database.db import SessionLocal
from backend.database.models import OpenAIChat, Users
from backend.routers.auth_router import LoginResponse
from backend.utils.anonymizer import Anonymizer
from backend.utils.pii_scrubber import PIIScrubber
from backend.utils.user_info import UserInfo
from backend.utils.save_db import SaveToDB


class OpenAIWrapper:
    def __init__(self) -> None:
        self._client = OpenAI(api_key=OPENAI_API_KEY)
        self.db = SessionLocal()

    def _send_openai_request(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
    ) -> None:
        """Send a request to OpenAI's API to generate a response.

        :param model: The model to use.
        :type model: str
        :param prompt: The prompt to use.
        :type prompt: str
        :param max_tokens: The maximum number of tokens to generate.
        :type max_tokens: int
        :param temperature: The temperature to use.
        :type temperature: float
        :return: The response.
        :rtype: None
        """
        return self._client.chat.completions.create(
            messages=[{"role": "system", "content": prompt}],
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
        )

   

    def generate(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
        user_token: str,
    ) -> dict:
        """Generate a response using OpenAI's API.

        :param model: The model to use.
        :type model: str
        :param prompt: The prompt to use.
        :type prompt: str
        :param max_tokens: The maximum number of tokens to generate.
        :type max_tokens: int
        :param temperature: The temperature to use.
        :type temperature: float
        :param user_token: The user's token.
        :type user_token: str
        :return: The response.
        :rtype: dict
        """

        userInfo = UserInfo()
        userId = userInfo.get_user_id(user_token)

        scrubber = PIIScrubber()
        user_pii = self.db.query(Users).filter(Users.id == userId).first().pii
        pre_scrubbed_prompt = prompt
        prompt = scrubber.scrub_input(prompt=prompt, user_defined_pii=user_pii)

        anonymizer = Anonymizer()
        # prompt = anonymizer.anonymize_input(prompt)

        openai_response = self._send_openai_request(
            model, prompt, max_tokens, temperature
        )
        
        openai_response = openai_response.choices[0].message.content

        save = SaveToDB(self.db)
        save._save_to_db(openai_response, userId,pre_scrubbed_prompt)

        return {"openai_response": openai_response}
