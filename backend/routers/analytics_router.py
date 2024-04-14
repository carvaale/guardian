from datetime import datetime, time
from typing import Annotated
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, validator
from sqlalchemy import and_, func
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
from backend.database.db import SessionLocal, engine
from backend.database.models import OpenAIChat
from fastapi import Depends

router = APIRouter()

class ExamineRequest(BaseModel):
    startTime: time
    endTime: time
    keyword: str




def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/find_leak")
def examine(request: ExamineRequest, db: db_dependency) -> JSONResponse:
    try:
        records = db.query(OpenAIChat).filter(
            and_(
                func.substr(OpenAIChat.timestamp, 1, 5).between(request.startTime.strftime("%H:%M"), request.endTime.strftime("%H:%M")),
                OpenAIChat.response.contains(request.keyword)
            )
        ).all()

        result = [{"response": r.response, "user_id": r.user_id, "timestamp": r.timestamp} for r in records]
        return JSONResponse(content=result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))