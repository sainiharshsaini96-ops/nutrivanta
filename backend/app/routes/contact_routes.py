"""
NutriVanta Backend - Contact Routes
Handles contact form submissions.
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas import ContactMessage, ContactMessageOut, MessageResponse
from app.database import get_supabase

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("/", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_form(payload: ContactMessage):
    """Submit a contact/support form message (no auth required)."""
    sb = get_supabase()

    contact_data = {
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "subject": payload.subject,
        "message": payload.message,
        "status": "new",
    }

    result = sb.table("contact_messages").insert(contact_data).execute()

    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to submit message.")

    return MessageResponse(
        message=f"Thank you {payload.name}! Your message has been sent to our clinical support team."
    )


@router.get("/", response_model=list[ContactMessageOut])
async def list_contact_messages():
    """List all contact messages (admin use)."""
    sb = get_supabase()

    result = (
        sb.table("contact_messages")
        .select("*")
        .order("created_at", desc=True)
        .limit(100)
        .execute()
    )

    return [
        ContactMessageOut(
            id=m["id"],
            name=m["name"],
            email=m["email"],
            phone=m.get("phone"),
            subject=m["subject"],
            message=m["message"],
            status=m.get("status", "new"),
            created_at=m.get("created_at"),
        )
        for m in (result.data or [])
    ]
