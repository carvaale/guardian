from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.openai_router import router as OpenAIRouter
from backend.routers.authentication import router as AuthRouter

api_app = FastAPI()
# api_app.include_router(OpenAIRouter, prefix="/openai")
# api_app.include_router(AuthRouter, prefix="/auth")

# allow CORS for local development with frontend
api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
