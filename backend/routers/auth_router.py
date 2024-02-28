from fastapi import APIRouter
from starlette.responses import JSONResponse

router = APIRouter()


@router.get("/login")
def login() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.get("/signup")
def signup() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.get("/logout")
def logout() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})


@router.get("/verify")
def verify() -> JSONResponse:
    """ """

    return JSONResponse({"status 200": "guardian is running"})
