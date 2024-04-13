import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database.db import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)
    pii = Column(String)


class OpenAIChat(Base):
    __tablename__ = "openai_responses"
    id = Column(Integer, primary_key=True, index=True)
    response = Column(String)
    prompt = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(String)
