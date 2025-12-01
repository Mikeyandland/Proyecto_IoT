import { useState, useEffect } from "react";
import mqtt from "mqtt";

interface PropsMQTT {
  path: string;
  sensor: string;
  url?: string;
  clientIdBase?: string;
}

function MqttComp({
  path,
  sensor,
  url = "mqtt://test.mosquitto.org:8081",
  clientIdBase = "MiguelGarduno",
}: PropsMQTT) {
  const [message, setMessage] = useState<string>("Nothing is published yet");
  const [topic, setTopic] = useState<string>("");

  useEffect(() => {
    const topicName = path;

    // create a unique client per component instance so topics/clients don't conflict
    const clientId = `${clientIdBase}-${Math.random()
      .toString(16)
      .slice(2, 8)}`;
    const opts: any = { clientId };
    if (url.includes(":8081")) opts.protocol = "mqtts";

    const client = mqtt.connect(url, opts);

    client.on("connect", () => {
      client.subscribe(topicName, (err) => {
        if (err) console.error("MQTT subscribe error:", err);
      });
    });

    const handleMessage = (
      topicFromTheBroker: string,
      messageFromTheBroker: Buffer
    ) => {
      const text = messageFromTheBroker.toString();
      setMessage(text);
      setTopic(topicFromTheBroker);
      console.log("MQTT message:", topicFromTheBroker, text);
    };

    client.on("message", handleMessage);
    client.on("error", (err) => console.error("MQTT client error:", err));

    return () => {
      client.off("message", handleMessage);
      try {
        client.unsubscribe(topicName, () => {});
      } catch {}
      client.end(true);
    };
  }, [path, url, clientIdBase]);

  return (
    <>
      <p>
        The {sensor} value is {message}
      </p>
      <p>{topic ? <em>{topic}</em> : null}</p>
    </>
  );
}

export default MqttComp;
