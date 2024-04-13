from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import JSONResponse

from backend.exceptions import OpenAIRouteExceptionHandler
from backend.providers.llm import OpenAIWrapper

router = APIRouter(route_class=OpenAIRouteExceptionHandler)


class OpenAIRequest(BaseModel):
    model: str
    prompt: str
    max_tokens: int
    temperature: float
    token: str


@router.post("/generate")
def generate_data(request: OpenAIRequest) -> JSONResponse:
    """
    Endpoint to generate responses using the OpenAI model.

    :param request: The request object
    :type request: OpenAIRequest
    :return: JSONResponse
    :rtype: JSONResponse
    """
    openai = OpenAIWrapper()

    openai_response = openai.generate(
        model=request.model,
        prompt=request.prompt,
        max_tokens=request.max_tokens,
        temperature=request.temperature,
        user_token=request.token,
    )

    return JSONResponse(openai_response)
