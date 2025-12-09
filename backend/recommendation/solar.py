import os
import requests
from dotenv import load_dotenv

load_dotenv()

NREL_KEY = os.getenv("NREL_API_KEY")

def solar_resource(lat, lon):
    url = "https://developer.nrel.gov/api/solar/solar_resource/v1.json"
    params = {"api_key": NREL_KEY, "lat": lat, "lon": lon}
    res = requests.get(url, params=params).json()

    ghi = res["outputs"]["avg_ghi"]["annual"]
    dni = res["outputs"]["avg_dni"]["annual"]

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

    res = requests.get(url, params=params).json()

    return res["outputs"]["ac_annual"]    # yearly output in kWh

