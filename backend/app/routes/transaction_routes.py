"""
NutriVanta Backend - Transaction Routes
Handles payment transaction history for users.
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from app.schemas import TransactionOut
from app.auth import get_current_user_id
from app.database import get_supabase

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.get("/", response_model=list[TransactionOut])
async def list_transactions(
    user_id: str = Depends(get_current_user_id),
    status_filter: str | None = Query(None, alias="status"),
    limit: int = Query(50, ge=1, le=200),
):
    """List all transactions for the authenticated user."""
    sb = get_supabase()

    query = (
        sb.table("transactions")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
    )

    if status_filter:
        query = query.eq("status", status_filter)

    result = query.execute()

    return [
        TransactionOut(
            id=t.get("txn_id", t["id"]),
            user_id=t["user_id"],
            date=t["date"],
            doctor=t["doctor"],
            doctor_initials=t.get("doctor_initials", ""),
            service=t["service"],
            amount=t["amount"],
            method=t["method"],
            status=t.get("status", "Paid"),
            created_at=t.get("created_at"),
        )
        for t in (result.data or [])
    ]


@router.get("/{transaction_id}", response_model=TransactionOut)
async def get_transaction(
    transaction_id: str,
    user_id: str = Depends(get_current_user_id),
):
    """Get a specific transaction by ID."""
    sb = get_supabase()

    result = (
        sb.table("transactions")
        .select("*")
        .eq("txn_id", transaction_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Transaction not found.")

    t = result.data[0]
    return TransactionOut(
        id=t.get("txn_id", t["id"]),
        user_id=t["user_id"],
        date=t["date"],
        doctor=t["doctor"],
        doctor_initials=t.get("doctor_initials", ""),
        service=t["service"],
        amount=t["amount"],
        method=t["method"],
        status=t.get("status", "Paid"),
        created_at=t.get("created_at"),
    )
