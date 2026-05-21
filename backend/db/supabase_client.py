import os
from dotenv import load_dotenv

_client = None


def get_supabase():
    """Returns a cached Supabase client, or None if env vars are missing.

    Env vars are read lazily (on first call) so the client picks up
    .env changes without needing the module re-imported.
    """
    global _client

    if _client is not None:
        return _client

    # Re-load .env each time until a client is successfully created.
    load_dotenv(override=True)
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")

    if not supabase_url or not supabase_key:
        print("[WARN] SUPABASE_URL / SUPABASE_KEY not set — database features disabled")
        return None

    try:
        from supabase import create_client
        _client = create_client(supabase_url, supabase_key)
        print("[DEBUG] Supabase client connected")
        return _client
    except Exception as e:
        print(f"[ERROR] Failed to init Supabase client: {e}")
        return None
