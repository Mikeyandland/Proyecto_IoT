Flask + MQTT ingest example

This folder contains a minimal example that subscribes to MQTT topics (paho-mqtt), writes readings to Postgres, and exposes a small Flask API to read historical data.

Files

- `schema.sql` - SQL to create `sensor_readings` table.
- `mqtt_ingest.py` - paho-mqtt script that writes messages to Postgres using `psycopg2` pool.
- `api.py` - Flask API exposing `/api/sensors/<id>/history`.
- `requirements.txt` - Python dependencies.

Run locally

1. Create DB and table (example with psql):

```
# create db and user as you need, then:
psql $DATABASE_URL -f server_flask/schema.sql
```

2. Create and activate virtualenv, install deps:

```
python -m venv .venv
source .venv/bin/activate
pip install -r server_flask/requirements.txt
```

3. Set env vars and run ingest and API in separate terminals:

```
export DATABASE_URL='postgresql://user:pass@host:5432/dbname'
export MQTT_BROKER='test.mosquitto.org'
export MQTT_PORT=1883
export MQTT_TOPIC='TEAM2/HomeX/#'

# terminal 1: ingest
python server_flask/mqtt_ingest.py

# terminal 2: api
python server_flask/api.py
```

4. Test endpoint:

```
curl 'http://localhost:8000/api/sensors/dist/history?limit=50'
```

Notes

- This is a minimal example for development. For production separate ingest and API processes, use TLS, use migrations (Alembic) and manage credentials securely.
