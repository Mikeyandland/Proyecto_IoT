import MqttComp from "./MQTTComponent";
import SensorCard from "./SensorCard";

export default function Grid() {
  return (
    <>
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <SensorCard
              cardTitle="Temperature"
              value="yupi"
              imageURL="/src/assets/thermoIcon.png"
              linkButton="/sensors/temperature"
            >
              <MqttComp path="TEAM2/HomeX/temp" sensor="temperature"></MqttComp>
            </SensorCard>
          </div>
          <div className="col-md-4">
            <SensorCard
              cardTitle="Distance"
              value="yupi"
              imageURL="/src/assets/DistanceSensor.jpg"
              linkButton="/sensors/distance"
            >
              <MqttComp path="TEAM2/HomeX/dist" sensor="distance"></MqttComp>
            </SensorCard>
          </div>
          <div className="col-md-4">
            <SensorCard
              cardTitle="Pressure"
              value="yupi"
              imageURL="/src/assets/pressure.png"
              linkButton="/sensors/pressure"
            >
              <MqttComp path="TEAM2/HomeX/pres" sensor="pressure"></MqttComp>
            </SensorCard>
          </div>
          <div className="col-md-4">
            <SensorCard
              cardTitle="Light"
              value="yupi"
              imageURL="/src/assets/lightSensor.png"
              linkButton="/sensors/light"
            >
              <MqttComp path="TEAM2/HomeX/light" sensor="light"></MqttComp>
            </SensorCard>
          </div>
          <div className="col-md-4">
            <SensorCard
              cardTitle="Rain"
              value="yupi"
              imageURL="/src/assets/lluviaImage.jpg"
              linkButton="/sensors/rain"
            >
              <MqttComp path="TEAM2/HomeX/rain" sensor="rain"></MqttComp>
            </SensorCard>
          </div>
          <div className="col-md-4">
            <SensorCard
              cardTitle="Button"
              value="yupi"
              imageURL="/src/assets/button.png"
              linkButton="/sensors/button"
            >
              <MqttComp path="TEAM2/HomeX/button" sensor="button"></MqttComp>
            </SensorCard>
          </div>{" "}
          <div className="col-md-4">
            <SensorCard
              cardTitle="Ultra"
              value="yupi"
              imageURL="/src/assets/radar.png"
              linkButton="/sensors/ultra"
            >
              <MqttComp path="TEAM2/HomeX/ultra" sensor="ultra"></MqttComp>
            </SensorCard>
          </div>
        </div>
      </div>
    </>
  );
}
