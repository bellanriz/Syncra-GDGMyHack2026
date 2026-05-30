from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers.ai import legacy_router as legacy_ai_router
from app.routers.ai import router as ai_router
from app.routers.ecosystem import router as ecosystem_router

app = FastAPI(
    title="Syncra AI Backend",
    version="0.1.0",
    description="FastAPI backend for Syncra ecosystem intelligence features.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ecosystem_router, prefix="/api", tags=["ecosystem"])
app.include_router(ai_router, prefix="/api/ai", tags=["ai"])
app.include_router(legacy_ai_router, prefix="/api", tags=["ai"])


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/health")
def api_health_check() -> dict[str, str]:
    return {"status": "ok"}
