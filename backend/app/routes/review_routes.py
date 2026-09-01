"""
NutriVanta Backend - Review Routes
Handles reviews for nutritionists.
"""

from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas import ReviewCreate, ReviewOut, MessageResponse
from app.auth import get_current_user_id
from app.database import get_supabase

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/", response_model=ReviewOut, status_code=status.HTTP_201_CREATED)
async def create_review(
    payload: ReviewCreate,
    user_id: str = Depends(get_current_user_id),
):
    """Submit a review for a nutritionist."""
    sb = get_supabase()

    # Get user name for the review display
    user_result = sb.table("users").select("name").eq("id", user_id).execute()
    user_name = user_result.data[0]["name"] if user_result.data else "Anonymous"

    # Format the date
    review_date = datetime.now(timezone.utc).strftime("%d %b %Y")

    review_data = {
        "user_id": user_id,
        "user_name": user_name,
        "nutritionist_id": payload.nutritionist_id,
        "rating": payload.rating,
        "comment": payload.comment,
        "date": review_date,
    }

    result = sb.table("reviews").insert(review_data).execute()

    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to submit review.")

    # Update nutritionist average rating and review count
    reviews_result = (
        sb.table("reviews")
        .select("rating")
        .eq("nutritionist_id", payload.nutritionist_id)
        .execute()
    )

    if reviews_result.data:
        ratings = [r["rating"] for r in reviews_result.data]
        avg_rating = round(sum(ratings) / len(ratings), 1)
        sb.table("nutritionists").update({
            "rating": avg_rating,
            "reviews_count": len(ratings),
        }).eq("id", payload.nutritionist_id).execute()

    r = result.data[0]
    return ReviewOut(
        id=r["id"],
        user_id=r["user_id"],
        user_name=r["user_name"],
        nutritionist_id=r["nutritionist_id"],
        rating=r["rating"],
        comment=r["comment"],
        date=r["date"],
        created_at=r.get("created_at"),
    )


@router.get("/nutritionist/{nutritionist_id}", response_model=list[ReviewOut])
async def get_nutritionist_reviews(nutritionist_id: str):
    """Get all reviews for a specific nutritionist."""
    sb = get_supabase()

    result = (
        sb.table("reviews")
        .select("*")
        .eq("nutritionist_id", nutritionist_id)
        .order("created_at", desc=True)
        .execute()
    )

    return [
        ReviewOut(
            id=r["id"],
            user_id=r["user_id"],
            user_name=r["user_name"],
            nutritionist_id=r["nutritionist_id"],
            rating=r["rating"],
            comment=r["comment"],
            date=r["date"],
            created_at=r.get("created_at"),
        )
        for r in (result.data or [])
    ]
