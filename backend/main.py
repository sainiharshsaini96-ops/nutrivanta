"""
NutriVanta Backend - FastAPI Application Entry Point
Main server setup with CORS, route registration, and health checks.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.auth_routes import router as auth_router
from app.routes.user_routes import router as user_router
from app.routes.nutritionist_routes import router as nutritionist_router
from app.routes.booking_routes import router as booking_router
from app.routes.transaction_routes import router as transaction_router
from app.routes.contact_routes import router as contact_router
from app.routes.review_routes import router as review_router

# ──────────────────────────────────────────────
#  App Initialization
# ──────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="🌿 NutriVanta — Personalized Nutrition Guidance Platform API",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ──────────────────────────────────────────────
#  CORS Middleware
# ──────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
#  Route Registration
# ──────────────────────────────────────────────

API_PREFIX = "/api/v1"

app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(user_router, prefix=API_PREFIX)
app.include_router(nutritionist_router, prefix=API_PREFIX)
app.include_router(booking_router, prefix=API_PREFIX)
app.include_router(transaction_router, prefix=API_PREFIX)
app.include_router(contact_router, prefix=API_PREFIX)
app.include_router(review_router, prefix=API_PREFIX)

# ──────────────────────────────────────────────
#  Health Check & Root
# ──────────────────────────────────────────────


@app.get("/", tags=["Health"])
async def root():
    """Root endpoint — API health check."""
    return {
        "status": "🟢 Online",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "message": "NutriVanta API is running. Visit /docs for Swagger UI.",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Detailed health check."""
    from app.database import get_supabase

    try:
        sb = get_supabase()
        # Quick test query
        sb.table("users").select("id").limit(1).execute()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return {
        "status": "healthy",
        "database": db_status,
        "version": settings.APP_VERSION,
    }
