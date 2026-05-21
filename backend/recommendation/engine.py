from recommendation.solar import solar_resource, pvwatts_ac_output

# -----------------------------
# LOCATION-BASED SOLAR (lat/lon heuristic)
# -----------------------------
def estimate_solar_resource(lat: float):
    if lat <= 30:
        return 5.5, 6.5
    elif lat <= 40:
        return 4.5, 5.5
    else:
        return 3.5, 4.5


# -----------------------------
# SYSTEM SIZE (usage + sqft)
# -----------------------------
def calculate_system_size(monthly_kwh: float, sqft: int):
    base_kw = monthly_kwh / 120

    if sqft < 1200:
        base_kw *= 0.9
    elif sqft > 3000:
        base_kw *= 1.25

    return round(base_kw, 1)


# -----------------------------
# MAIN RECOMMENDER
# -----------------------------
def recommend_energy(zip, lat, lon, monthly_kwh, ownership, dwelling, battery, sqft):

    solar_data = solar_resource(lat, lon)          # ✅ real NREL data
    ghi = solar_data["ghi"]
    dni = solar_data["dni"]

    solar_kw = calculate_system_size(monthly_kwh, sqft)
    system_cost = solar_kw * 2800
    battery_cost = 12000 if battery else 0

    annual_output = pvwatts_ac_output(lat, lon, solar_kw)   # ✅ real PVWatts output

    itc_savings = 0.30 * (system_cost + battery_cost)
    savings_per_year = annual_output * 0.18

    payback = max(
        1.0,
        round((system_cost + battery_cost - itc_savings) / savings_per_year, 1)
    )

    carbon_intensity = 490
    co2_savings_tons = (annual_output * carbon_intensity) / 1_000_000
    remaining_footprint = max(0, (monthly_kwh * 12 - annual_output) * carbon_intensity / 1_000_000)

    payback_timeline = [
        {"year": y, "net_savings": round(savings_per_year * y - (system_cost + battery_cost - itc_savings), 2)}
        for y in range(0, 21)
    ]

    return {
        "best_option": "solar",
        "lat": lat,
        "lon": lon,
        "rankings": {
            "solar": {
                "solar_kw": solar_kw,
                "annual_output_kwh": annual_output,
                "annual_savings": round(savings_per_year, 2),   # ✅ ADD THIS
                "system_cost": system_cost,
                "battery_cost": battery_cost,
                "itc_savings": itc_savings,
                "payback_years": payback,
                "ghi": ghi,
                "dni": dni,
                "carbon_intensity": carbon_intensity,
                "co2_savings_tons_per_year": round(co2_savings_tons, 2),
                "remaining_carbon_footprint": round(remaining_footprint, 2),
                "payback_timeline": payback_timeline,
            }
        }
    }
