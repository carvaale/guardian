from fastapi import APIRouter
from starlette.responses import JSONResponse

router = APIRouter()


@router.get("/create_user")
def create_user() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.get("/get_user")
def get_user() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.get("/update_user")
def update_user() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.get("/delete_user")
def delete_user() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})
