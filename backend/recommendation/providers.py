from fastapi import APIRouter, HTTPException
import os, requests

router = APIRouter()

GOOGLE_KEY = os.getenv("GOOGLE_MAPS_KEY")

@router.get("/providers/{zip}")
def get_providers(zip: str):

    if not GOOGLE_KEY:
        raise HTTPException(status_code=500, detail="Missing Google Maps API key")

    # Step 1: geocode ZIP
    geo_url = (
        "https://maps.googleapis.com/maps/api/geocode/json"
        f"?address={zip}&key={GOOGLE_KEY}"
    )
    geo_res = requests.get(geo_url).json()

    if not geo_res["results"]:
        return {"providers": []}

    loc = geo_res["results"][0]["geometry"]["location"]
    lat, lng = loc["lat"], loc["lng"]

    # Step 2: Places search
    places_url = (
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        f"?location={lat},{lng}&radius=30000"
        f"&keyword=solar installer"
        f"&key={GOOGLE_KEY}"
    )

    places_res = requests.get(places_url).json()
    results = places_res.get("results", [])

    providers = []

    for p in results:
        providers.append({
            "name": p.get("name"),
            "address": p.get("vicinity"),
            "rating": p.get("rating"),
            "user_ratings_total": p.get("user_ratings_total"),
        })

    return {"providers": providers}
