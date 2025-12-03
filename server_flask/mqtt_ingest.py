#!/usr/bin/env python3

import os
import logging
import signal
import sys
import time
from psycopg2.pool import ThreadedConnectionPool
import psycopg2
import paho.mqtt.client as mqtt

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    logging.error("DATABASE_URL not set")
    sys.exit(1)

MQTT_BROKER = os.getenv("MQTT_BROKER", "test.mosquitto.org")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "TEAM2/HomeX/#")

# simple pool
db_pool = ThreadedConnectionPool(minconn=1, maxconn=10, dsn=DATABASE_URL)


def insert_reading(sensor_id: str, raw: str, value):
    conn = None
    try:
        conn = db_pool.getconn()
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO sensor_readings(sensor_id, value, raw) VALUES (%s, %s, %s)",
                (sensor_id, value, raw),
            )
        conn.commit()
    except Exception:
        logging.exception("DB insert error")
        if conn:
            conn.rollback()
    finally:
        if conn:
            db_pool.putconn(conn)


def on_connect(client, userdata, flags, rc):
    logging.info("Connected to MQTT broker, rc=%s", rc)
    client.subscribe(MQTT_TOPIC)


def on_message(client, userdata, msg):
    try:
        topic = msg.topic
        raw = msg.payload.decode("utf-8", errors="replace")
        sensor = topic.split("/")[-1]
        try:
            val = float(raw)
            if not (val == val):
                val = None
        except Exception:
            val = None
        insert_reading(sensor, raw, val)
        logging.info("Saved %s -> %s (parsed=%s)", topic, raw, val)
    except Exception:
        logging.exception("Error processing message")


def main():
    client = mqtt.Client(client_id=f"ingest-py-{int(time.time())%10000}")
    client.on_connect = on_connect
    client.on_message = on_message

    # connect
    client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)

    def _shutdown(signum, frame):
        logging.info("Shutting down...")
        try:
            client.disconnect()
            client.loop_stop()
        except Exception:
            pass
        try:
            db_pool.closeall()
        except Exception:
            pass
        sys.exit(0)

    signal.signal(signal.SIGINT, _shutdown)
    signal.signal(signal.SIGTERM, _shutdown)

    client.loop_forever()


if __name__ == "__main__":
    main()
