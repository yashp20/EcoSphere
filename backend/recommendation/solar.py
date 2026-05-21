import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

NREL_KEY = os.getenv("NREL_API_KEY")

def solar_resource(lat, lon):
    if not NREL_KEY:
        raise HTTPException(status_code=500, detail="Missing NREL_API_KEY in .env")
    url = "https://developer.nlr.gov/api/solar/solar_resource/v1.json"
    params = {"api_key": NREL_KEY, "lat": lat, "lon": lon}
    try:
        res = requests.get(url, params=params, timeout=10).json()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"NREL request failed: {e}")

    outputs = res.get("outputs")
    if not outputs:
        raise HTTPException(status_code=502, detail=f"NREL solar resource error: {res}")
    ghi = outputs["avg_ghi"]["annual"]
    dni = outputs["avg_dni"]["annual"]

    return {
        "ghi": ghi,
        "dni": dni
    }


def pvwatts_ac_output(lat, lon, system_kw):
    """Returns annual AC output for a system size in kW."""
    url = "https://developer.nlr.gov/api/pvwatts/v8.json"

    params = {
        "api_key": NREL_KEY,
        "lat": lat,
        "lon": lon,
        "system_capacity": system_kw,
        "azimuth": 180,
        "tilt": 30,
        "array_type": 1,
        "module_type": 1,
        "losses": 14,
    }

    try:
        res = requests.get(url, params=params, timeout=10).json()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"PVWatts request failed: {e}")

    outputs = res.get("outputs")
    if not outputs:
        raise HTTPException(status_code=502, detail=f"NREL PVWatts error: {res}")
    return outputs["ac_annual"]

