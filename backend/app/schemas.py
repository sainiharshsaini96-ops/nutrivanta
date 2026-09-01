"""
NutriVanta Backend - Pydantic Schemas / Models
Defines request/response data shapes for all API endpoints.
"""

from __future__ import annotations
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# ──────────────────────────────────────────────
#  AUTH SCHEMAS
# ──────────────────────────────────────────────

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    phone: Optional[str] = None
    gender: Optional[str] = None
    location: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    dob: Optional[str] = None
    gender: Optional[str] = None
    location: Optional[str] = None
    role: str = "NutriVanta Member"
    avatar: Optional[str] = None
    health_goals: list[str] = []
    created_at: Optional[str] = None


# ──────────────────────────────────────────────
#  USER PROFILE SCHEMAS
# ──────────────────────────────────────────────

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    dob: Optional[str] = None
    gender: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    health_goals: Optional[list[str]] = None


# ──────────────────────────────────────────────
#  NUTRITIONIST SCHEMAS
# ──────────────────────────────────────────────

class EducationItem(BaseModel):
    title: str
    institution: str
    year: str


class PackageItem(BaseModel):
    id: str
    title: str
    duration: str
    price: int
    description: str
    popular: bool = False
    features: list[str] = []


class ReviewItem(BaseModel):
    id: str
    name: str
    initials: str
    rating: int = Field(..., ge=1, le=5)
    date: str
    comment: str


class NutritionistOut(BaseModel):
    id: str
    name: str
    role: str
    degree: Optional[str] = None
    experience: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    location: Optional[str] = None
    next_available: Optional[str] = None
    avatar: Optional[str] = None
    about: Optional[str] = None
    expertise: list[str] = []
    education: list[EducationItem] = []
    packages: list[PackageItem] = []
    reviews: list[ReviewItem] = []


class NutritionistCreate(BaseModel):
    name: str
    role: str
    degree: Optional[str] = None
    experience: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    about: Optional[str] = None
    expertise: list[str] = []
    education: list[EducationItem] = []
    packages: list[PackageItem] = []


# ──────────────────────────────────────────────
#  BOOKING / CONSULTATION SCHEMAS
# ──────────────────────────────────────────────

class BookingCreate(BaseModel):
    nutritionist_id: str
    package_id: str
    patient_name: str
    patient_email: EmailStr
    patient_phone: str
    payment_method: str = "upi"
    booking_date: str
    booking_time: str


class BookingOut(BaseModel):
    id: str
    user_id: str
    nutritionist_id: str
    nutritionist_name: Optional[str] = None
    package_id: str
    package_title: Optional[str] = None
    patient_name: str
    patient_email: str
    patient_phone: str
    payment_method: str
    booking_date: str
    booking_time: str
    amount: int = 0
    status: str = "confirmed"
    created_at: Optional[str] = None


# ──────────────────────────────────────────────
#  TRANSACTION SCHEMAS
# ──────────────────────────────────────────────

class TransactionOut(BaseModel):
    id: str
    user_id: str
    date: str
    doctor: str
    doctor_initials: str
    service: str
    amount: int
    method: str
    status: str = "Paid"
    created_at: Optional[str] = None


# ──────────────────────────────────────────────
#  CONTACT FORM SCHEMAS
# ──────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    subject: str = "Consultation Inquiry"
    message: str = Field(..., min_length=10)


class ContactMessageOut(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    status: str = "new"
    created_at: Optional[str] = None


# ──────────────────────────────────────────────
#  REVIEW SCHEMAS
# ──────────────────────────────────────────────

class ReviewCreate(BaseModel):
    nutritionist_id: str
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=5)


class ReviewOut(BaseModel):
    id: str
    user_id: str
    user_name: str
    nutritionist_id: str
    rating: int
    comment: str
    date: str
    created_at: Optional[str] = None


# ──────────────────────────────────────────────
#  GENERIC RESPONSES
# ──────────────────────────────────────────────

class MessageResponse(BaseModel):
    message: str
    success: bool = True


class StatsOut(BaseModel):
    total_consultations: int = 0
    active_plans: int = 0
    total_spent: int = 0
