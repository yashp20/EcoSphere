import os
import requests
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

NREL_KEY = os.getenv("NREL_API_KEY")

def solar_resource(lat, lon):
    url = "https://developer.nrel.gov/api/solar/solar_resource/v1.json"
    params = {"api_key": NREL_KEY, "lat": lat, "lon": lon}
    try:
        res = requests.get(url, params=params, timeout=10).json()
        outputs = res.get("outputs")
        if not outputs:
            raise HTTPException(status_code=502, detail="NREL solar resource error")
        ghi = outputs["avg_ghi"]["annual"]
        dni = outputs["avg_dni"]["annual"]
    except Exception:
        raise HTTPException(status_code=502, detail="Failed to fetch NREL solar resource")

    return {
        "ghi": ghi,   # global horizontal irradiance
        "dni": dni
    }


def pvwatts_ac_output(lat, lon, system_kw):
    """Returns annual AC output for a system size in kW."""
    url = "https://developer.nrel.gov/api/pvwatts/v8.json"

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
        outputs = res.get("outputs")
        if not outputs:
            raise HTTPException(status_code=502, detail="NREL PVWatts error")
        return outputs["ac_annual"]    # yearly output in kWh
    except Exception:
        raise HTTPException(status_code=502, detail="Failed to fetch PVWatts output")

