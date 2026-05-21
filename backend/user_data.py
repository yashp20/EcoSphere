from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
from typing import Optional

from auth.clerk import verify_clerk_token
from db.supabase_client import get_supabase

router = APIRouter()


# --- Auth helpers ---
def get_clerk_id(request: Request) -> str:
    """Extract and verify the Clerk user ID. Raises 401 if missing/invalid."""
    auth_header = request.headers.get("authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing auth header")
    token = auth_header.split(" ")[1]
    payload = verify_clerk_token(token)
    return payload["sub"]


def get_clerk_id_optional(request: Request) -> Optional[str]:
    """Extract Clerk user ID if a valid token is present, else None (no error)."""
    try:
        return get_clerk_id(request)
    except Exception:
        return None


# --- Save an assessment (called internally after a recommendation) ---
def save_assessment(clerk_id: str, inputs: dict, result: dict):
    sb = get_supabase()
    if not sb or not clerk_id:
        return
    try:
        sb.table("assessments").insert({
            "clerk_id": clerk_id,
            "zip": inputs.get("zip"),
            "monthly_kwh": inputs.get("monthly_kwh"),
            "sqft": inputs.get("sqft"),
            "ownership": inputs.get("ownership"),
            "battery": inputs.get("battery"),
            "result_json": result,
        }).execute()
        print(f"[DEBUG] Saved assessment for {clerk_id}")
    except Exception as e:
        print(f"[ERROR] Failed to save assessment: {e}")


# --- History ---
@router.get("/history")
def get_history(request: Request):
    clerk_id = get_clerk_id(request)
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Database not configured")

    res = (
        sb.table("assessments")
        .select("*")
        .eq("clerk_id", clerk_id)
        .order("created_at", desc=True)
        .limit(50)
        .execute()
    )
    return {"history": res.data}


@router.delete("/history/{assessment_id}")
def delete_history(assessment_id: str, request: Request):
    clerk_id = get_clerk_id(request)
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Database not configured")

    sb.table("assessments").delete().eq("id", assessment_id).eq("clerk_id", clerk_id).execute()
    return {"status": "deleted"}


# --- Favorites ---
class FavoriteProvider(BaseModel):
    name: str
    address: Optional[str] = ""
    phone: Optional[str] = ""
    website: Optional[str] = ""
    rating: Optional[float] = None


@router.get("/favorites")
def get_favorites(request: Request):
    clerk_id = get_clerk_id(request)
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Database not configured")

    res = (
        sb.table("favorite_providers")
        .select("*")
        .eq("clerk_id", clerk_id)
        .order("created_at", desc=True)
        .execute()
    )
    return {"favorites": res.data}


@router.post("/favorites")
def add_favorite(provider: FavoriteProvider, request: Request):
    clerk_id = get_clerk_id(request)
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Database not configured")

    res = sb.table("favorite_providers").insert({
        "clerk_id": clerk_id,
        "name": provider.name,
        "address": provider.address,
        "phone": provider.phone,
        "website": provider.website,
        "rating": provider.rating,
    }).execute()
    return {"status": "added", "favorite": res.data[0] if res.data else None}


@router.delete("/favorites/{favorite_id}")
def delete_favorite(favorite_id: str, request: Request):
    clerk_id = get_clerk_id(request)
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Database not configured")

    sb.table("favorite_providers").delete().eq("id", favorite_id).eq("clerk_id", clerk_id).execute()
    return {"status": "deleted"}
