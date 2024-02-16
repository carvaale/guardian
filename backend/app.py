from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.openai_router import router as OpenAIRouter
from backend.routers.authentication import router as AuthRouter


app = FastAPI()
app.title = "guardian"
app.description = "XXX"

api = FastAPI(root_path="/api")
api.title = "guardian api"
api.description = "XXX"
api.include_router(OpenAIRouter, prefix="/openai")
api.include_router(AuthRouter, prefix="/auth")

app.mount("/api", api, name="api")


# Allow Front-end Origin in local development
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.get("/healthcheck")
async def healthcheck():
    """
    Endpoint to verify that the service is up and running
    """
    return {"status": "guardian is running"}
