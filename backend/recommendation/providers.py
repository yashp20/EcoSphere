from fastapi import APIRouter, Query
from recommendation.solar_providers import get_providers_for_zip

router = APIRouter()


@router.get("/providers")
def get_providers(zip: str = Query(...)):
    providers = get_providers_for_zip(zip)

    result = []
    for p in providers:
        result.append({
            "name": p["name"],
            "address": p["address"],
            "phone": p["phone"],
            "website": p["website"],
            "opening_hours": [],
            "distance_miles": None,
            "rating": p["rating"],
        })

    print(f"[DEBUG] Found {len(result)} solar providers for ZIP {zip}")
    return {"providers": result}
