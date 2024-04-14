
from datetime import datetime

from backend.database.models import OpenAIChat

class SaveToDB:
    def __init__(self, db_session):
        self.db = db_session
    def _save_to_db(self, response: str, uId: int, prompt:str) -> None:

        """Save the response to the database.

        :param response: The response to save.
        :type response: str
        :param uId: The user ID.
        :type uId: int
        :return: None
        :rtype: None
        """
        current_time = datetime.utcnow().strftime("%H:%M")
        openai_response = OpenAIChat(
            response=response, user_id=uId, timestamp=current_time, prompt=prompt
        )
        self.db.add(openai_response)
        self.db.commit()

