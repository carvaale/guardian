from fastapi import APIRouter
from starlette.responses import JSONResponse
from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from database.database import SessionLocal
from database.models import Users
from fastapi.security import OAuth2PasswordRequestForm
from providers.auth import (
    authenticate_user,
    create_access_token,
    verify_token,
    get_current_user,
    hash_password,
    verify_password,
)

router = APIRouter()


class CreateUserRequest(BaseModel):
    email: str
    password: str
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/login", response_model=Token)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
) -> Token:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = create_access_token(
        user.id, user.email, user.role, timedelta(hours=24)
    )
    return {"access_token": token, "token_type": "bearer"}
    """ """


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    db: db_dependency, create_user_request: CreateUserRequest
) -> JSONResponse:
    """
    Creates a new user
    """
    existing_user = (
        db.query(Users)
        .filter(Users.email == create_user_request.email)
        .first()
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    create_user_model = Users(
        email=create_user_request.email,
        password=hash_password(create_user_request.password),
        role="user",  # TODO: Set up enum for string validation
    )
    db.add(create_user_model)
    db.commit()
    return JSONResponse({"status 201": "User created successfully"})


@router.get("/logout")
def logout() -> JSONResponse:
    """ """
    return JSONResponse({"status 200": "guardian is running"})


@router.get("/verify")
def verify(current_user: dict = Depends(get_current_user)) -> JSONResponse:
    return JSONResponse({"status 200": "User verified"})
    """ """
