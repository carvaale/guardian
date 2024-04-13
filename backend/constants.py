import os

from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_ALGORITHM = "HS256"
DATABASE_URL = "sqlite:///./backend/database/guardian.db"
