from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

from auth.clerk import verify_clerk_token
from recommendation.engine import recommend_energy

# ⭐ IMPORT PROVIDERS ROUTER (Google Places version)
from providers import router as providers_router


app = FastAPI()

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Clerk Auth ---
def auth_required(request: Request):
    auth_header = request.headers.get("authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing auth header")
    token = auth_header.split(" ")[1]
    return verify_clerk_token(token)


@app.get("/api/user")
def get_user(payload=Depends(auth_required)):
    return {
        "clerk_id": payload["sub"],
        "email": payload.get("email_address"),
    }


# --- ZIP → Lat/Lon (Nominatim) ---
def geocode_zip(zip):
    url = f"https://nominatim.openstreetmap.org/search?postalcode={zip}&country=USA&format=json"
    res = requests.get(url, headers={"User-Agent": "EcoSphere"}).json()

    if not res:
        raise HTTPException(status_code=400, detail="Invalid ZIP code")

    return float(res[0]["lat"]), float(res[0]["lon"])


# --- Recommendation Request Body ---
class RecommendRequest(BaseModel):
    zip: str
    monthly_kwh: float
    sqft: int
    dwelling: str = "house"
    ownership: str = "owner"
    battery: bool = False


# --- Main Recommendation Endpoint ---

@app.post("/api/recommend")
def get_recommendation(req: RecommendRequest):

    lat, lon = geocode_zip(req.zip)

    return recommend_energy(
        zip=req.zip,
        lat=lat,
        lon=lon,
        monthly_kwh=req.monthly_kwh,
        ownership=req.ownership,
        dwelling=req.dwelling,
        battery=req.battery,
        sqft=req.sqft,
    )


# --- Root route ---
@app.get("/")
def root():
    return {"status": "ok"}


# --- ⭐ REGISTER GOOGLE PROVIDERS ROUTER ⭐ ---
app.include_router(providers_router, prefix="/api")

