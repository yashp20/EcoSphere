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
        place_id = p.get("place_id")
        
        # Fetch place details for phone, website, hours
        details = {}
        if place_id:
            detail_url = (
                "https://maps.googleapis.com/maps/api/place/details/json"
                f"?place_id={place_id}"
                f"&fields=name,formatted_address,formatted_phone_number,website,opening_hours,geometry"
                f"&key={GOOGLE_KEY}"
            )
            detail_res = requests.get(detail_url).json().get("result", {})
            details = detail_res

        # Calculate distance (rough haversine-free distance using lat/lng delta)
        p_lat = p.get("geometry", {}).get("location", {}).get("lat", lat)
        p_lng = p.get("geometry", {}).get("location", {}).get("lng", lng)
        dist_miles = round(
            ((p_lat - lat) ** 2 + (p_lng - lng) ** 2) ** 0.5 * 69, 1
        )

        providers.append({
            "name": p.get("name"),
            "address": details.get("formatted_address", p.get("vicinity", "")),
            "phone": details.get("formatted_phone_number", ""),
            "website": details.get("website", ""),
            "opening_hours": details.get("opening_hours", {}).get("weekday_text", []),
            "distance_miles": dist_miles,
            "rating": p.get("rating"),
        })

    return {"providers": providers}
