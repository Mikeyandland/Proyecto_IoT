"""
Endpoints:
- GET /api/sensors/<sensor_id>/history?limit=200

"""
from flask import Flask, jsonify, request
import os
import psycopg2
import psycopg2.extras

app = Flask(__name__)
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("Set DATABASE_URL env var to a valid Postgres DSN, e.g. postgresql://user:pass@host:5432/dbname")


def get_conn():
    # Basic sanity checks to catch obvious placeholder values early
    # Accept valid DSNs that contain '://' and '@'
    if DATABASE_URL.strip() == "" or "user:pass" in DATABASE_URL or "://" not in DATABASE_URL or "@" not in DATABASE_URL:
        raise RuntimeError("DATABASE_URL looks like a placeholder. Set it to: postgresql://iot_user:SecreT123@localhost:5432/iot_db")
    try:
        return psycopg2.connect(DATABASE_URL)
    except psycopg2.OperationalError as e:
        # Re-raise a clearer error for the server logs
        raise RuntimeError(f"Unable to connect to the database: {e}") from e


@app.after_request
def _add_cors_headers(response):
    # Allow requests from the dev server or any host during development
    response.headers.setdefault("Access-Control-Allow-Origin", "*")
    response.headers.setdefault(
        "Access-Control-Allow-Headers", "Content-Type,Authorization"
    )
    response.headers.setdefault("Access-Control-Allow-Methods", "GET,OPTIONS")
    return response


@app.route("/api/sensors/<sensor_id>/history")
def sensor_history(sensor_id):
    limit = int(request.args.get("limit", 200))
    from_ts = request.args.get("from")
    to_ts = request.args.get("to")
    params = [sensor_id]
    q = "SELECT ts, value, raw FROM sensor_readings WHERE sensor_id=%s"
    if from_ts:
        q += " AND ts >= %s"
        params.append(from_ts)
    if to_ts:
        q += " AND ts <= %s"
        params.append(to_ts)
    q += " ORDER BY ts DESC LIMIT %s"
    params.append(limit)

    try:
        with get_conn() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
                cur.execute(q, params)
                rows = cur.fetchall()
    except Exception as e:
        # Log the error to console (visible where Flask runs) and return a 500 with JSON
        app.logger.exception("Error fetching sensor history")
        return jsonify({"error": "internal_server_error", "message": str(e)}), 500
    rows = [dict(r) for r in reversed(rows)]
    for r in rows:
        r["ts"] = r["ts"].isoformat()
    return jsonify(rows)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
