"""
NutriVanta Backend - Nutritionist Routes
CRUD operations for nutritionist profiles.
"""

from fastapi import APIRouter, HTTPException, Query
from app.schemas import NutritionistOut, NutritionistCreate, MessageResponse
from app.database import get_supabase

router = APIRouter(prefix="/nutritionists", tags=["Nutritionists"])


@router.get("/", response_model=list[NutritionistOut])
async def list_nutritionists(
    expertise: str | None = Query(None, description="Filter by expertise area"),
    limit: int = Query(20, ge=1, le=100),
):
    """List all nutritionists, optionally filtered by expertise."""
    sb = get_supabase()

    query = sb.table("nutritionists").select("*").limit(limit)

    if expertise:
        query = query.contains("expertise", [expertise])

    result = query.execute()
    nutritionists = []

    for n in (result.data or []):
        nutritionists.append(
            NutritionistOut(
                id=n["id"],
                name=n["name"],
                role=n.get("role", ""),
                degree=n.get("degree"),
                experience=n.get("experience"),
                rating=n.get("rating"),
                reviews_count=n.get("reviews_count", 0),
                location=n.get("location"),
                next_available=n.get("next_available"),
                avatar=n.get("avatar"),
                about=n.get("about"),
                expertise=n.get("expertise", []),
                education=n.get("education", []),
                packages=n.get("packages", []),
                reviews=n.get("reviews", []),
            )
        )

    return nutritionists


@router.get("/{nutritionist_id}", response_model=NutritionistOut)
async def get_nutritionist(nutritionist_id: str):
    """Get a specific nutritionist's full profile."""
    sb = get_supabase()
    result = sb.table("nutritionists").select("*").eq("id", nutritionist_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Nutritionist not found.")

    n = result.data[0]
    return NutritionistOut(
        id=n["id"],
        name=n["name"],
        role=n.get("role", ""),
        degree=n.get("degree"),
        experience=n.get("experience"),
        rating=n.get("rating"),
        reviews_count=n.get("reviews_count", 0),
        location=n.get("location"),
        next_available=n.get("next_available"),
        avatar=n.get("avatar"),
        about=n.get("about"),
        expertise=n.get("expertise", []),
        education=n.get("education", []),
        packages=n.get("packages", []),
        reviews=n.get("reviews", []),
    )


@router.post("/", response_model=NutritionistOut, status_code=201)
async def create_nutritionist(payload: NutritionistCreate):
    """Create a new nutritionist profile (admin use)."""
    sb = get_supabase()

    new_nutritionist = {
        "name": payload.name,
        "role": payload.role,
        "degree": payload.degree,
        "experience": payload.experience,
        "location": payload.location,
        "avatar": payload.avatar,
        "about": payload.about,
        "expertise": payload.expertise,
        "education": [e.model_dump() for e in payload.education],
        "packages": [p.model_dump() for p in payload.packages],
        "rating": 0.0,
        "reviews_count": 0,
        "reviews": [],
    }

    result = sb.table("nutritionists").insert(new_nutritionist).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create nutritionist.")

    n = result.data[0]
    return NutritionistOut(
        id=n["id"],
        name=n["name"],
        role=n.get("role", ""),
        degree=n.get("degree"),
        experience=n.get("experience"),
        rating=n.get("rating"),
        reviews_count=n.get("reviews_count", 0),
        location=n.get("location"),
        next_available=n.get("next_available"),
        avatar=n.get("avatar"),
        about=n.get("about"),
        expertise=n.get("expertise", []),
        education=n.get("education", []),
        packages=n.get("packages", []),
        reviews=n.get("reviews", []),
    )
