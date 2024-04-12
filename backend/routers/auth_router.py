from starlette.responses import JSONResponse
from datetime import timedelta, datetime
from typing import Annotated, Any
from fastapi import APIRouter, Depends, HTTPException, Header, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from backend.database.db import SessionLocal
from backend.database.models import Users
from fastapi.security import OAuth2PasswordRequestForm
from backend.providers.auth import (
    authenticate_user,
    create_access_token,
    verify_token,
    get_current_user,
    hash_password,
    verify_password,
)

router = APIRouter()


class CreateUserRequest(BaseModel):
    username: str
    email: str
    password: str


class User(BaseModel):
    email: str
    role: str


class LoginResponse(BaseModel):
    user: User
    access_token: str
    token_type: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/login", response_model=LoginResponse)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
) -> LoginResponse:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    role = (
        db.query(Users).filter(Users.email == form_data.username).first().role
    )
    token = create_access_token(
        user.id, user.email, user.role, timedelta(hours=24)
    )
    user_response = User(email=user.email, role=role)
    return {
        "user": user_response,
        "access_token": token,
        "token_type": "bearer",
    }


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    form_data: CreateUserRequest,
    db: db_dependency,
) -> JSONResponse:
    existing_user = (
        db.query(Users).filter(Users.email == form_data.username).first()
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    create_user_model = Users(
        
        email=form_data.email,
        username = form_data.username,
        password=hash_password(form_data.password),
        role="user",  # TODO: Set up enum for string validation
    )
    db.add(create_user_model)
    db.commit()
    return status.HTTP_201_CREATED


@router.get("/logout")
def logout() -> JSONResponse:
    """ """
    return JSONResponse({"status 200": "guardian is running"})


@router.post("/verify", response_model=dict)
def verify(token_data: LoginResponse) -> dict:
    token_data = token_data.access_token
    user_info: str = verify_token(token_data)
    if user_info == "":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    return user_info
