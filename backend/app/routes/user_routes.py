"""
NutriVanta Backend - User Routes
Handles user profile read/update and user stats.
"""

from fastapi import APIRouter, HTTPException, Depends
from app.schemas import UserOut, UserProfileUpdate, StatsOut, MessageResponse
from app.auth import get_current_user_id
from app.database import get_supabase

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/profile", response_model=UserOut)
async def get_profile(user_id: str = Depends(get_current_user_id)):
    """Get the authenticated user's full profile."""
    sb = get_supabase()
    result = sb.table("users").select("*").eq("id", user_id).execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="User not found.")

    u = result.data[0]
    return UserOut(
        id=u["id"],
        name=u["name"],
        email=u["email"],
        phone=u.get("phone"),
        dob=u.get("dob"),
        gender=u.get("gender"),
        location=u.get("location"),
        role=u.get("role", "NutriVanta Member"),
        avatar=u.get("avatar"),
        health_goals=u.get("health_goals", []),
        created_at=u.get("created_at"),
    )


@router.put("/profile", response_model=UserOut)
async def update_profile(
    payload: UserProfileUpdate,
    user_id: str = Depends(get_current_user_id),
):
    """Update the authenticated user's profile."""
    sb = get_supabase()

    update_data = payload.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update.")

    result = (
        sb.table("users")
        .update(update_data)
        .eq("id", user_id)
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="User not found.")

    u = result.data[0]
    return UserOut(
        id=u["id"],
        name=u["name"],
        email=u["email"],
        phone=u.get("phone"),
        dob=u.get("dob"),
        gender=u.get("gender"),
        location=u.get("location"),
        role=u.get("role", "NutriVanta Member"),
        avatar=u.get("avatar"),
        health_goals=u.get("health_goals", []),
        created_at=u.get("created_at"),
    )


@router.get("/stats", response_model=StatsOut)
async def get_user_stats(user_id: str = Depends(get_current_user_id)):
    """Get aggregated stats for the authenticated user (consultations, spending)."""
    sb = get_supabase()

    # Count bookings
    bookings = (
        sb.table("bookings")
        .select("id, amount, status")
        .eq("user_id", user_id)
        .execute()
    )

    total_consultations = len(bookings.data) if bookings.data else 0
    total_spent = sum(b.get("amount", 0) for b in (bookings.data or []))
    active_plans = sum(
        1 for b in (bookings.data or []) if b.get("status") == "confirmed"
    )

    return StatsOut(
        total_consultations=total_consultations,
        active_plans=active_plans,
        total_spent=total_spent,
    )
