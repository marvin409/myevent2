from __future__ import annotations

from copy import deepcopy
from datetime import date
from itertools import count
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"

app = Flask(__name__, static_folder=str(DIST_DIR), static_url_path="/assets")


def _seed_events() -> list[dict[str, Any]]:
    return [
        {
            "id": 3,
            "title": "Ka-Atari Rooftop Sessions",
            "category": "Concert",
            "description": (
                "An elevated live-music evening with skyline views, a curated set list, "
                "signature cocktails, and limited premium tables."
            ),
            "host_name": "Ka-Atari Live",
            "contact_email": "hello@kaatari-events.com",
            "contact_phone": "+254700000300",
            "venue": "Skyline Deck",
            "location": "Nairobi",
            "event_date": "2026-06-12",
            "start_time": "19:00",
            "end_time": "23:30",
            "capacity": 180,
            "ticket_price": 3500,
            "image_url": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
            "theme": "Afro-fusion evening",
            "premium_badge": "Featured Night",
            "perks": ["VIP lounge", "Reserved rooftop tables", "Signature welcome drink"],
            "tags": ["live music", "rooftop", "premium", "nairobi"],
            "is_featured": True,
            "is_public": True,
            "created_at": "2026-04-17",
        },
        {
            "id": 2,
            "title": "Garden Aisle Wedding Experience",
            "category": "Wedding",
            "description": (
                "A luxury garden wedding concept built around floral styling, polished "
                "guest flow, and cinematic evening lighting."
            ),
            "host_name": "Ka-Atari Weddings",
            "contact_email": "weddings@kaatari-events.com",
            "contact_phone": "+254700000200",
            "venue": "Emerald Gardens",
            "location": "Karen",
            "event_date": "2026-08-21",
            "start_time": "14:00",
            "end_time": "21:00",
            "capacity": 250,
            "ticket_price": 0,
            "image_url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
            "theme": "Black tie garden celebration",
            "premium_badge": "Signature Experience",
            "perks": ["Luxury decor", "Valet parking", "Fine dining service"],
            "tags": ["wedding", "garden", "luxury"],
            "is_featured": True,
            "is_public": True,
            "created_at": "2026-04-16",
        },
        {
            "id": 1,
            "title": "Executive Product Launch Dinner",
            "category": "Corporate",
            "description": (
                "A premium launch format for partners, media, and executive guests with "
                "clear brand staging and high-trust presentation."
            ),
            "host_name": "Ka-Atari Corporate",
            "contact_email": "corporate@kaatari-events.com",
            "contact_phone": "+254700000100",
            "venue": "Capital Club Hall",
            "location": "Upper Hill",
            "event_date": "2026-05-30",
            "start_time": "18:30",
            "end_time": "22:00",
            "capacity": 120,
            "ticket_price": 5000,
            "image_url": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
            "theme": "Formal launch dinner",
            "premium_badge": "Limited Seats",
            "perks": ["VIP check-in", "Media wall", "Private networking zone"],
            "tags": ["corporate", "launch", "executive"],
            "is_featured": False,
            "is_public": True,
            "created_at": "2026-04-15",
        },
    ]


EVENTS = _seed_events()
NEXT_ID = count(max(event["id"] for event in EVENTS) + 1)
REQUIRED_FIELDS = [
    "title",
    "description",
    "host_name",
    "contact_email",
    "venue",
    "location",
    "event_date",
    "start_time",
]


def _split_csv(raw_value: Any) -> list[str]:
    if isinstance(raw_value, list):
        return [str(item).strip() for item in raw_value if str(item).strip()]
    if not raw_value:
        return []
    return [item.strip() for item in str(raw_value).split(",") if item.strip()]


def _as_bool(raw_value: Any, default: bool = False) -> bool:
    if isinstance(raw_value, bool):
        return raw_value
    if raw_value is None:
        return default
    return str(raw_value).strip().lower() in {"1", "true", "yes", "on"}


def _as_number(raw_value: Any, default: int | float | None = None) -> int | float | None:
    if raw_value in (None, ""):
        return default
    try:
        number = float(raw_value)
    except (TypeError, ValueError):
        return default
    return int(number) if number.is_integer() else number


def _normalize_event(payload: dict[str, Any]) -> dict[str, Any]:
    event = {
        "id": next(NEXT_ID),
        "title": str(payload.get("title", "")).strip(),
        "category": str(payload.get("category", "General")).strip() or "General",
        "description": str(payload.get("description", "")).strip(),
        "host_name": str(payload.get("host_name", "")).strip(),
        "contact_email": str(payload.get("contact_email", "")).strip(),
        "contact_phone": str(payload.get("contact_phone", "")).strip(),
        "venue": str(payload.get("venue", "")).strip(),
        "location": str(payload.get("location", "")).strip(),
        "event_date": str(payload.get("event_date", "")).strip(),
        "start_time": str(payload.get("start_time", "")).strip(),
        "end_time": str(payload.get("end_time", "")).strip(),
        "capacity": _as_number(payload.get("capacity")),
        "ticket_price": _as_number(payload.get("ticket_price"), 0) or 0,
        "image_url": str(payload.get("image_url", "")).strip(),
        "theme": str(payload.get("theme", "")).strip(),
        "premium_badge": str(payload.get("premium_badge", "")).strip(),
        "perks": _split_csv(payload.get("perks")),
        "tags": _split_csv(payload.get("tags")),
        "is_featured": _as_bool(payload.get("is_featured"), default=False),
        "is_public": _as_bool(payload.get("is_public"), default=True),
        "created_at": str(payload.get("created_at") or date.today().isoformat()),
    }
    return event


def _stats_payload() -> dict[str, Any]:
    public_events = [event for event in EVENTS if event.get("is_public")]
    featured_events = [event for event in EVENTS if event.get("is_featured")]

    hooks = []
    if featured_events:
        hooks.append("Featured visibility")
    if public_events:
        hooks.append("Public reach")
    if any(event.get("premium_badge") for event in EVENTS):
        hooks.append("Premium copy")
    if any((event.get("ticket_price") or 0) > 0 for event in EVENTS):
        hooks.append("Pricing cues")

    return {
        "total_events": len(EVENTS),
        "featured_events": len(featured_events),
        "public_events": len(public_events),
        "conversion_hooks": hooks,
    }


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.get("/api")
def api_index():
    return jsonify(
        {
            "name": "Ka-Atari Event Planner API",
            "status": "ok",
            "endpoints": ["/api/events", "/api/events/stats", "/api/health"],
        }
    )


@app.route("/api/events", methods=["GET", "POST", "OPTIONS"])
def events_collection():
    if request.method == "OPTIONS":
        return ("", 204)

    if request.method == "GET":
        return jsonify(deepcopy(EVENTS))

    payload = request.get_json(silent=True) or {}
    missing_fields = [
        field for field in REQUIRED_FIELDS if not str(payload.get(field, "")).strip()
    ]

    if missing_fields:
        return jsonify({"error": "Missing required fields.", "fields": missing_fields}), 400

    event = _normalize_event(payload)
    EVENTS.insert(0, event)
    return jsonify(deepcopy(event)), 201


@app.get("/api/events/stats")
def event_stats():
    return jsonify(_stats_payload())


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/")
def frontend_index():
    if DIST_DIR.exists():
        return send_from_directory(DIST_DIR, "index.html")
    return jsonify({"status": "ok", "message": "Frontend build not found."})


@app.get("/<path:path>")
def frontend_assets(path: str):
    target = DIST_DIR / path
    if DIST_DIR.exists() and target.is_file():
        return send_from_directory(DIST_DIR, path)
    if DIST_DIR.exists():
        return send_from_directory(DIST_DIR, "index.html")
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
