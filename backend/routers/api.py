from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.admin_router import router as AdminRouter
from backend.routers.analytics_router import router as AnalyticsRouter
from backend.routers.auth_router import router as AuthRouter
from backend.routers.llm_router import router as LLMRouter

api_app = FastAPI()
api_app.include_router(LLMRouter, prefix="/llm")
api_app.include_router(AuthRouter, prefix="/auth")
api_app.include_router(AdminRouter, prefix="/admin")
api_app.include_router(AnalyticsRouter, prefix="/analytics")


# allow CORS for local development with frontend
api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
