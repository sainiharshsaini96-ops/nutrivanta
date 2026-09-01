"""
NutriVanta Backend - Auth Routes
Handles user registration, login, and current-user retrieval.
"""

from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas import (
    UserRegister, UserLogin, TokenResponse, UserOut, MessageResponse
)
from app.auth import hash_password, verify_password, create_access_token, get_current_user_id
from app.database import get_supabase

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: UserRegister):
    """Register a new user account."""
    sb = get_supabase()

    # Check if email already exists
    existing = sb.table("users").select("id").eq("email", payload.email).execute()
    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists."
        )

    # Hash password and insert new user
    hashed = hash_password(payload.password)
    new_user = {
        "name": payload.name,
        "email": payload.email,
        "password_hash": hashed,
        "phone": payload.phone,
        "gender": payload.gender,
        "location": payload.location,
        "role": "NutriVanta Member",
        "health_goals": [],
    }

    result = sb.table("users").insert(new_user).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create user.")

    user_data = result.data[0]
    token = create_access_token(data={"sub": user_data["id"]})

    user_out = UserOut(
        id=user_data["id"],
        name=user_data["name"],
        email=user_data["email"],
        phone=user_data.get("phone"),
        dob=user_data.get("dob"),
        gender=user_data.get("gender"),
        location=user_data.get("location"),
        role=user_data.get("role", "NutriVanta Member"),
        avatar=user_data.get("avatar"),
        health_goals=user_data.get("health_goals", []),
        created_at=user_data.get("created_at"),
    )

    return TokenResponse(access_token=token, user=user_out)


@router.post("/login", response_model=TokenResponse)
async def login(payload: UserLogin):
    """Login with email and password."""
    sb = get_supabase()

    result = sb.table("users").select("*").eq("email", payload.email).execute()
    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    user_data = result.data[0]

    if not verify_password(payload.password, user_data.get("password_hash", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = create_access_token(data={"sub": user_data["id"]})

    user_out = UserOut(
        id=user_data["id"],
        name=user_data["name"],
        email=user_data["email"],
        phone=user_data.get("phone"),
        dob=user_data.get("dob"),
        gender=user_data.get("gender"),
        location=user_data.get("location"),
        role=user_data.get("role", "NutriVanta Member"),
        avatar=user_data.get("avatar"),
        health_goals=user_data.get("health_goals", []),
        created_at=user_data.get("created_at"),
    )

    return TokenResponse(access_token=token, user=user_out)


@router.get("/me", response_model=UserOut)
async def get_current_user(user_id: str = Depends(get_current_user_id)):
    """Get the currently authenticated user's profile."""
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
