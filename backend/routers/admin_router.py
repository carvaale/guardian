from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from starlette.responses import JSONResponse
from sqlalchemy.orm import Session
from backend.database.db import SessionLocal

from backend.database.models import Users
from typing import List, Annotated
from backend.providers.auth import hash_password
from fastapi import status

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

class UserResponse(BaseModel):
    username : str
    user_id: int
    email: str
    role: str   

class CreateResponse(BaseModel):
    username: str
    email: str
    role: str
    password: str


@router.post("/create_user")
def create_user(user:CreateResponse, db: db_dependency) -> JSONResponse:
        
        existing_user = db.query(Users).filter(Users.email == user.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )
        create_user_model = Users(
            username = user.username,
            email=user.email,
            password=hash_password(user.password),
            role=user.role,  # TODO: Set up enum for string validation
        )
        db.add(create_user_model)
        db.commit()
        return JSONResponse(content = {"message" : "User created successfully"},
                                       status_code=status.HTTP_201_CREATED)




@router.get("/get_user/{user_id}")
def get_user(user_id : int, db: db_dependency) -> JSONResponse:
    user = db.query(Users).filter(Users.id == user_id).first()
    if user is None:
        return HTTPException(status_code=404, detail="User not found")
    user_response = UserResponse(email=user.email, role=user.role, user_id = user.id, username = user.username)
    return JSONResponse(content = user_response)
    """ """


@router.get("/get_users", response_model=dict)
def get_users(db:db_dependency) -> dict:
    users : UserResponse = db.query(Users).all()
    user_response = [{ "username": user.username,"user_id": user.id, "email": user.email, "role": user.role} for user in users]
    return JSONResponse(content = user_response)
    """ """


@router.get("/update_user")
def update_user() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.delete("/delete_user/{user_id}", response_model= dict)
def delete_user(user_id: int, db:db_dependency) -> dict:
    user = db.query(Users).filter(Users.id == user_id).first()
    if user is None:
        return HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return JSONResponse({"status 200": "User deleted"})

