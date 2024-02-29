from fastapi import APIRouter
from starlette.responses import JSONResponse

from backend.exceptions import OpenAIRouteExceptionHandler
from backend.providers.llm import OpenAIWrapper

router = APIRouter(route_class=OpenAIRouteExceptionHandler)


@router.post("/generate")
def generate_data() -> JSONResponse:
    """ """

    openai = OpenAIWrapper()

    return JSONResponse({"status 200": openai})
