from fastapi import APIRouter, Depends
from backend.database.db import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel
import backend.database.models as models

router = APIRouter()

models.Base.metadata.create_all(bind=engine)


class User(BaseModel):
    username: str
    email: str
    password: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login")
async def login():
    return {"message": "login"}


@router.post("/register")
async def register(user: User, db: Session = Depends(get_db)):
    return {"message": "register"}


@router.post("/logout")
async def logout():
    return {"message": "logout"}
