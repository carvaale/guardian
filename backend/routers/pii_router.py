from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import JSONResponse

from backend.providers.pii import PiiWrapper

router = APIRouter()


class PiiIdentifierRequest(BaseModel):
    pii_csv: str | None
    token: str


@router.get("/get_pii")
def get_pii(request: PiiIdentifierRequest) -> JSONResponse:
    pii_identifier = PiiWrapper()

    user_pii = pii_identifier.get_pii(token=request.token)

    return JSONResponse(user_pii)


@router.post("/update_pii")
def update_pii(request: PiiIdentifierRequest) -> JSONResponse:
    pii_identifier = PiiWrapper()

    user_pii = pii_identifier.update_pii(
        pii=request.pii_csv, token=request.token
    )

    return JSONResponse(user_pii)
