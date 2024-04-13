from datetime import datetime
from sqlite3 import connect as sqlite_connect

from openai import OpenAI

from backend.utils.anonymizer import Anonymizer
from backend.utils.pii_scrubber import PIIScrubber
from backend.database.db import SessionLocal
from backend.database.models import OpenAIChat
from backend.routers.auth_router import LoginResponse
from backend.providers.auth import verify_token
from backend.constants import OPENAI_APIKEY


class OpenAIWrapper:
    def __init__(self) -> None:
        self._client = OpenAI(api_key=OPENAI_APIKEY)
        self.db = SessionLocal()
    
    def get_user_id(self, token: str) -> int:
        """ """
        print(token)
        user = verify_token(token)
        print(user)
        user_id : int = user.get("user_id")
        return user_id
        # openai_response = OpenAIChat(user_id=user_id)
        # self.db.add(openai_response)
        # self.db.commit()


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

    def _save_to_db(self, response: str, uId : int) -> None:
        """ """
        '''Note I didnt test the if the database saves the timestamp because my computer literally fries if I try to run this. Please test it for me.'''
        current_time = datetime.utcnow().strftime('%H:%M')
        openai_response = OpenAIChat(response=response.content, user_id = uId, timestamp = current_time)
        self.db.add(openai_response)
        self.db.commit()
        # db_conn = sqlite_connect("guardian.db")
        # db_cursor = db_conn.cursor()

        # db_cursor.execute(
        #     "INSERT INTO openai_responses (response) VALUES (?)", (response,)
        # )

        # db_conn.commit()

    def generate(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
        user_token: str,
    ) -> None:
        """ """
        scrubber = PIIScrubber()
        anonymizer = Anonymizer()

        prompt = scrubber.scrub_input(prompt)
        print("This is the scrubber prompt: ", prompt)
        prompt = anonymizer.anonymize_input(prompt)
        print("This is the anonymizer prompt: ", prompt)
        userId = self.get_user_id(user_token)

        openai_response = self._send_openai_request( 
             model,prompt, max_tokens, temperature
        )
        openai_response = openai_response.choices[0].message
        print("THis is from openai retard : ",openai_response)
        print("This is the prompt retard: ", prompt)

        self._save_to_db(openai_response,userId)

        return openai_response
