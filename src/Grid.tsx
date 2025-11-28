import SensorCard from "./SensorCard";
import thermoIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/thermoIcon.png";
import distanceIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/DistanceSensor.jpg";
import lightIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/lightSensor.png";
import lluviaIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/lluviaImage.jpg";
import OledIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/OledImage.jpg";
import servoIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/ServoImage.png";


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
            imgSize={110}     // ⬅ control del tamaño
          />
        </div>

        <div className="col-md-4">
          <SensorCard
            cardTitle="Luz"
            descriptionText="Valor"
            value="60%"
            imageURL={lightIcon}
            linkButton="/sensor/humedad"
            imgSize={110}    // ⬅ otro tamaño
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
