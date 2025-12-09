import os
import requests
from dotenv import load_dotenv

load_dotenv()

ELEC_KEY = os.getenv("ELECTRICITYMAPS_API_KEY")

def get_carbon_intensity(lat, lon):
    url = f"https://api.electricitymap.org/v3/carbon-intensity/latest?lat={lat}&lon={lon}"
    
    headers = {"auth-token": ELEC_KEY}

    res = requests.get(url, headers=headers).json()

    return {
        "carbon_intensity": res.get("carbonIntensity"),
        "fossil_percentage": res.get("fossilFuelPercentage")
    }

