from datetime import datetime
import enum
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from backend.database.db import Base
from sqlalchemy.orm import relationship 

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)



class OpenAIChat(Base):
    __tablename__ = "openai_responses"
    id = Column(Integer, primary_key=True, index=True)
    response = Column(String)
    prompt = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(String)

