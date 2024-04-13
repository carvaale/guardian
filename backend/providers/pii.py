from starlette.responses import JSONResponse

from backend.database.db import SessionLocal
from backend.database.models import Users
from backend.utils.user_info import UserInfo


class PiiWrapper:
    def __init__(self):
        self.db = SessionLocal()
        self._current_user = UserInfo()

    def get_pii(self, token: str) -> JSONResponse:
        """Get the PII of the user.

        :param token: The user's token.
        :type token: str
        :return: The response.
        :rtype: JSONResponse
        """
        user_id = self._current_user.get_user_id(token)

        user = self.db.query(Users).filter(Users.id == user_id).first()

        pii_csv = user.pii if user.pii else " "

        return {"pii_csv": pii_csv}

    def update_pii(self, pii: str, token: str) -> JSONResponse:
        """Update the PII of the user.

        :param pii: The PII to update.
        :type pii: str
        :param token: The user's token.
        :type token: str
        :return: The response.
        :rtype: JSONResponse
        """
        user_id = self._current_user.get_user_id(token)

        user = self.db.query(Users).filter(Users.id == user_id).first()

        print(pii)

        user.pii = pii

        self.db.commit()

        return {"message": "PII updated successfully."}
