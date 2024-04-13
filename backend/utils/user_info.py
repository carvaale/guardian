from backend.providers.auth import verify_token


class UserInfo:
    def get_user_id(self, token: str) -> int:
        print(token)
        user = verify_token(token)
        print(user)
        user_id: int = user.get("user_id")
        return user_id
        # openai_response = OpenAIChat(user_id=user_id)
        # self.db.add(openai_response)
        # self.db.commit()
