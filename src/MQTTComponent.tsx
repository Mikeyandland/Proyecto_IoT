import { useState } from "react";
import mqtt from "mqtt";

//public server
/*const client = mqtt.connect("mqtt://test.mosquitto.org:8081",{
    protocol: "mqtts",
    clientId: "MiguelGarduno"
});*/

const client = mqtt.connect("tcp://test.mosquitto.org:1883", {
  clientId: "MiguelGarduno",
});

client.subscribe("TEAM2/HomeX/dist");

function MqttComp() {
  const [messageHook, setMesgHook] = useState(<>Nothing is published yet</>);
  const [topicHook, setTopicHook] = useState(<em></em>);

  client.on("message", (topicFromTheBroker, messageFromTheBroker) => {
    setMesgHook(<>{messageFromTheBroker.toString()}</>);
    setTopicHook(<em>{topicFromTheBroker.toString()}</em>);
    console.log(messageFromTheBroker.toString());
    client.end();
  });

  return (
    <>
      <p>The message is {messageHook}</p>
      <p>
        <a href="https://tec.mx/es">{topicHook}</a>
      </p>
    </>
  );
}

export default MqttComp;
