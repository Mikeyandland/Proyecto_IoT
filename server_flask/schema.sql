-- Table for sensor readings
CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY,
  sensor_id TEXT NOT NULL,
  value DOUBLE PRECISION NULL,
  raw TEXT NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sensor_ts ON sensor_readings (sensor_id, ts DESC);

-- If using TimescaleDB, after creating the table run:
-- SELECT create_hypertable('sensor_readings', 'ts');
