import SensorCard from "./SensorCard";
import thermoIcon from "../src/assets/thermoIcon.png";
import distanceIcon from "../src/assets/DistanceSensor.jpg";

export default function Grid() {
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-4">
          <SensorCard
            cardTitle="Temperatura"
            descriptionText="Valor"
            value="25°C"
            imageURL={thermoIcon}
            linkButton="/sensor/temperatura"
          />
        </div>
        <div className="col-md-4">
          <SensorCard
            cardTitle="Humedad"
            descriptionText="Valor"
            value="60%"
            imageURL="..."
            linkButton="/sensor/humedad"
          />
        </div>

        <div className="col-md-4">
          <SensorCard
            cardTitle="Luz"
            descriptionText="Valor"
            value="60%"
            imageURL={lightIcon}
            linkButton="/sensor/humedad"
            imgSize={110} // ⬅ otro tamaño
          />
        </div>

        <div className="col-md-4">
          <SensorCard
            cardTitle="Distancia 1"
            descriptionText="Valor"
            value="153 cm"
            imageURL={distanceIcon}
            linkButton="/sensor/distancia"
            imgSize={110}
          />
        </div>
        <div className="col-md-4">
          <SensorCard
            cardTitle="Distancia 2"
            descriptionText="Valor"
            value="153 cm"
            imageURL={distanceIcon}
            linkButton="/sensor/distancia"
            imgSize={110}
          />
        </div>

        <div className="col-md-4">
          <SensorCard
            cardTitle="Lluvia"
            descriptionText="Valor"
            value="154"
            imageURL={lluviaIcon}
            linkButton="/sensor/distancia"
            imgSize={110}
          />
        </div>
        <div className="col-md-4">
          <SensorCard
            cardTitle="Display"
            descriptionText="showing"
            value="154"
            imageURL={OledIcon}
            linkButton="/sensor/distancia"
            imgSize={110}
          />
        </div>
        <div className="col-md-4">
          <SensorCard
            cardTitle="Servo 2"
            descriptionText="showing"
            value="154"
            imageURL={servoIcon}
            linkButton="/sensor/distancia"
            imgSize={110}
          />
        </div>
        <div className="col-md-4">
          <SensorCard
            cardTitle="Servo 2"
            descriptionText="showing"
            value="154"
            imageURL={servoIcon}
            linkButton="/sensor/distancia"
            imgSize={110}
          />
        </div>
      </div>
    </div>
  );
}
