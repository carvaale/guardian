from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import Depends, HTTPException, Header, Query
from sqlalchemy.orm import Session
from starlette import status
from backend.database.models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jwt import encode, decode, PyJWTError
from dotenv import load_dotenv

import os


load_dotenv()

#SECRET_KEY = os.getenv("SECRET_KEY")
SECRET_KEY :str = '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb'
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


def authenticate_user(email: str, password: str, db: Session):
    user = db.query(Users).filter(Users.email == email).first()
    if not user:
        return False
    
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(user_id: int, email: str, role: str, expires_delta: timedelta):
    expire = datetime.utcnow() + expires_delta
    exp = int((expire - datetime(1970, 1, 1)).total_seconds())
    to_encode = {"sub": str(user_id), "email": email, "role": role, "exp": exp}
    encoded_jwt = encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    try:
        print(type(token))
        #token_bytes = token.encode('utf-8')
        
        payload = decode(token, SECRET_KEY, ALGORITHM)
        email: str = payload.get("email")
        print(email)
        user_id: int = payload.get("sub")
        print(user_id)
        role: str = payload.get("role")
        if email is None or user_id is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )
        return {"user_id": user_id, "email": email, "role": role}
    except PyJWTError as e:
        print(f"Couldnt work: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    return verify_token(token)



def hash_password(password: str):
    return bcrypt_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return bcrypt_context.verify(plain_password, hashed_password)