import React, { useState } from "react";
import mqtt from "mqtt";

export default function StatsLedButton() {
  const [status, setStatus] = useState<string | null>(null);
  const [on, setOn] = useState<boolean | null>(null);

  const publish = (payload: string) => {
    setStatus("publishing...");
    const url = "wss://test.mosquitto.org:8081";
    const clientId = `web-stats-${Math.random().toString(16).slice(2, 8)}`;
    const client = mqtt.connect(url, { clientId, connectTimeout: 4000 });
    const topic = "TEAM2/HomeX/cmd/led";
    client.on("connect", () => {
      client.publish(topic, payload, { qos: 0 }, (err) => {
        if (err) setStatus(`publish error: ${String(err)}`);
        else setStatus(payload === "1" ? "LED ON sent" : "LED OFF sent");
        client.end();
      });
    });
    client.on("error", (err) => {
      setStatus(`connect error: ${String(err)}`);
      client.end();
    });
  };

  const handleClick = () => {
    // If we have a known state, toggle it; otherwise just send ON
    if (on === null) {
      publish("1");
      setOn(true);
    } else {
      const next = !on;
      publish(next ? "1" : "0");
      setOn(next);
    }
  };

  const label =
    on === null ? "Turn LED ON" : on ? "Turn LED OFF" : "Turn LED ON";

  return (
    <div className="container mt-4 mb-5 text-center">
      <button className="btn btn-primary btn-lg" onClick={handleClick}>
        {label}
      </button>
      {status ? <div className="mt-2 text-muted">{status}</div> : null}
    </div>
  );
}
