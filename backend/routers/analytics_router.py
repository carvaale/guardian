from fastapi import APIRouter
from starlette.responses import JSONResponse

router = APIRouter()


@router.post("/examine")
def examine() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})
