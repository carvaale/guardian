from sqlite3 import connect as sqlite_connect

from openai import OpenAI

from backend.utils.anonymizer import Anonymizer
from backend.utils.pii_scrubber import PIIScrubber


class OpenAIWrapper:
    def __init__(self) -> None:
        self._client = OpenAI()

    def _send_openai_request(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
    ) -> None:
        """ """
        return self._client.chat.completions.create(
            model=model,
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature,
        )

    def _save_to_db(self, response: str) -> None:
        """ """
        db_conn = sqlite_connect("guardian.db")
        db_cursor = db_conn.cursor()

        db_cursor.execute(
            "INSERT INTO openai_responses (response) VALUES (?)", (response,)
        )

        db_conn.commit()

    def generate(
        self,
        model: str,
        prompt: str,
        max_tokens: int,
        temperature: float,
    ) -> None:
        """ """
        scrubber = PIIScrubber()
        anonymizer = Anonymizer()

        prompt = scrubber.scrub_input(prompt)
        prompt = anonymizer.anonymize_input(prompt)

        openai_response = self._send_openai_request(
            model, prompt, max_tokens, temperature
        )

        openai_response = openai_response.choices[0].message

        self._save_to_db(openai_response)

        return openai_response
