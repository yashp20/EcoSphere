from fastapi import HTTPException
from jose import jwt
import requests
from functools import lru_cache

# Replace with YOUR Clerk domain:
CLERK_JWKS_URL = "https://flying-adder-10.clerk.accounts.dev/.well-known/jwks.json"


@lru_cache()
def get_jwks():
    return requests.get(CLERK_JWKS_URL).json()


def get_public_key(token: str):
    headers = jwt.get_unverified_header(token)
    kid = headers.get("kid")

    jwks = get_jwks()

    for key in jwks["keys"]:
        if key["kid"] == kid:
            return key

    # If no valid key is found, the JWKS may have rotated -> refresh cache
    get_jwks.cache_clear()
    jwks = get_jwks()

    for key in jwks["keys"]:
        if key["kid"] == kid:
            return key

    raise HTTPException(status_code=401, detail="Invalid token kid")


def verify_clerk_token(token: str):
    public_key = get_public_key(token)

    try:
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=None,  # Clerk doesn't require audience verification by default
            options={"verify_aud": False},
        )
        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
