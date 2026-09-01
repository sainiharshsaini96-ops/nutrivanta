"""
NutriVanta Backend - Booking Routes
Handles consultation booking creation and retrieval.
"""

import random
from fastapi import APIRouter, HTTPException, Depends, Query
from app.schemas import BookingCreate, BookingOut, MessageResponse
from app.auth import get_current_user_id
from app.database import get_supabase

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.post("/", response_model=BookingOut, status_code=201)
async def create_booking(
    payload: BookingCreate,
    user_id: str = Depends(get_current_user_id),
):
    """Book a consultation with a nutritionist."""
    sb = get_supabase()

    # Fetch the nutritionist and package info for the booking record
    nut_result = (
        sb.table("nutritionists")
        .select("name, packages")
        .eq("id", payload.nutritionist_id)
        .execute()
    )

    if not nut_result.data:
        raise HTTPException(status_code=404, detail="Nutritionist not found.")

    nutritionist = nut_result.data[0]

    # Find the matching package
    packages = nutritionist.get("packages", [])
    matched_pkg = next((p for p in packages if p["id"] == payload.package_id), None)

    if not matched_pkg:
        raise HTTPException(status_code=404, detail="Package not found for this nutritionist.")

    amount = matched_pkg.get("price", 0)

    booking_data = {
        "user_id": user_id,
        "nutritionist_id": payload.nutritionist_id,
        "nutritionist_name": nutritionist["name"],
        "package_id": payload.package_id,
        "package_title": matched_pkg.get("title", ""),
        "patient_name": payload.patient_name,
        "patient_email": payload.patient_email,
        "patient_phone": payload.patient_phone,
        "payment_method": payload.payment_method.upper(),
        "booking_date": payload.booking_date,
        "booking_time": payload.booking_time,
        "amount": amount,
        "status": "confirmed",
    }

    result = sb.table("bookings").insert(booking_data).execute()

    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create booking.")

    b = result.data[0]

    # Also create a transaction record
    txn_id = f"TXN-{random.randint(10000, 99999)}"
    txn_data = {
        "txn_id": txn_id,
        "user_id": user_id,
        "date": payload.booking_date,
        "doctor": nutritionist["name"],
        "doctor_initials": "".join(
            word[0] for word in nutritionist["name"].split() if word
        ),
        "service": matched_pkg.get("title", "Consultation"),
        "amount": amount,
        "method": payload.payment_method.upper(),
        "status": "Paid",
    }
    sb.table("transactions").insert(txn_data).execute()

    return BookingOut(
        id=b["id"],
        user_id=b["user_id"],
        nutritionist_id=b["nutritionist_id"],
        nutritionist_name=b.get("nutritionist_name"),
        package_id=b["package_id"],
        package_title=b.get("package_title"),
        patient_name=b["patient_name"],
        patient_email=b["patient_email"],
        patient_phone=b["patient_phone"],
        payment_method=b["payment_method"],
        booking_date=b["booking_date"],
        booking_time=b["booking_time"],
        amount=b.get("amount", 0),
        status=b.get("status", "confirmed"),
        created_at=b.get("created_at"),
    )


@router.get("/", response_model=list[BookingOut])
async def list_bookings(
    user_id: str = Depends(get_current_user_id),
    status_filter: str | None = Query(None, alias="status"),
):
    """List all bookings for the authenticated user."""
    sb = get_supabase()

    query = (
        sb.table("bookings")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
    )

    if status_filter:
        query = query.eq("status", status_filter)

    result = query.execute()

    return [
        BookingOut(
            id=b["id"],
            user_id=b["user_id"],
            nutritionist_id=b["nutritionist_id"],
            nutritionist_name=b.get("nutritionist_name"),
            package_id=b["package_id"],
            package_title=b.get("package_title"),
            patient_name=b["patient_name"],
            patient_email=b["patient_email"],
            patient_phone=b["patient_phone"],
            payment_method=b["payment_method"],
            booking_date=b["booking_date"],
            booking_time=b["booking_time"],
            amount=b.get("amount", 0),
            status=b.get("status", "confirmed"),
            created_at=b.get("created_at"),
        )
        for b in (result.data or [])
    ]


@router.get("/{booking_id}", response_model=BookingOut)
async def get_booking(
    booking_id: str,
    user_id: str = Depends(get_current_user_id),
):
    """Get a specific booking by ID."""
    sb = get_supabase()

    result = (
        sb.table("bookings")
        .select("*")
        .eq("id", booking_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Booking not found.")

    b = result.data[0]
    return BookingOut(
        id=b["id"],
        user_id=b["user_id"],
        nutritionist_id=b["nutritionist_id"],
        nutritionist_name=b.get("nutritionist_name"),
        package_id=b["package_id"],
        package_title=b.get("package_title"),
        patient_name=b["patient_name"],
        patient_email=b["patient_email"],
        patient_phone=b["patient_phone"],
        payment_method=b["payment_method"],
        booking_date=b["booking_date"],
        booking_time=b["booking_time"],
        amount=b.get("amount", 0),
        status=b.get("status", "confirmed"),
        created_at=b.get("created_at"),
    )


@router.patch("/{booking_id}/cancel", response_model=MessageResponse)
async def cancel_booking(
    booking_id: str,
    user_id: str = Depends(get_current_user_id),
):
    """Cancel a booking (sets status to 'cancelled')."""
    sb = get_supabase()

    result = (
        sb.table("bookings")
        .update({"status": "cancelled"})
        .eq("id", booking_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Booking not found.")

    return MessageResponse(message="Booking cancelled successfully.")
