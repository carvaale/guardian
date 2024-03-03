import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
JWT_ALGORITHM = "HS256"
DATABASE_URL = "sqlite:///./backend/database/guardian.db"
