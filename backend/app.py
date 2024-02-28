from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import llm_router

app = FastAPI()
app.title = "guardian"
app.description = "XXX"

api = FastAPI(root_path="/api")
api.title = "guardian api"
api.description = "XXX"
api.include_router(llm_router.router, prefix="/openai")

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
