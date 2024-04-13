from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from pytest import Session
from starlette.responses import JSONResponse
from fastapi import APIRouter, Depends, HTTPException, Header, Query
from backend.exceptions import OpenAIRouteExceptionHandler
from backend.providers.llm import OpenAIWrapper
from backend.database.db import SessionLocal
from backend.providers.auth import verify_token
from backend.database.models import OpenAIChat

router = APIRouter(route_class=OpenAIRouteExceptionHandler)

class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int
    temperature: float
    token: str
    model: str


@router.post("/generate")
def generate_data(request: GenerateRequest) -> JSONResponse:
    """
    Endpoint to generate responses using the OpenAI model.
    """
    openai = OpenAIWrapper()
    # openai.get_user_id(request.token)
    generated_response = openai.generate(request.model,request.prompt, request.max_tokens, request.temperature, request.token)
    return JSONResponse({"generated_response": generated_response.content})
