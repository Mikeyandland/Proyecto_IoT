import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import thermoIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/thermoIcon.png";

export default function SensorPage_Temperatura() {
  // 🔥 Simulación de valores (luego lo conectas a tu MQTT)
  const currentValue = 25; // °C
  const isFunctional = true; 
  const interpretation = currentValue < 20 ? "Frío" : "Caluroso";

  return (
    <div className="container mt-5">

      <div className="card shadow-lg p-4">
        
        <div className="row">
          {/* Imagen */}
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              src={thermoIcon}
              alt="Temperatura"
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          </div>

          {/* Información */}
          <div className="col-md-8">
            <h2 className="mb-3">Sensor de Temperatura</h2>

            <p className="fs-5">
              <strong>Valor actual:</strong> {currentValue} °C
            </p>

            <p className="fs-5">
              <strong>Estado funcional:</strong>{" "}
              <span className={isFunctional ? "text-success" : "text-danger"}>
                {isFunctional ? "Funcional" : "No Funcional"}
              </span>
            </p>

            <p className="fs-5">
              <strong>Interpretación:</strong>{" "}
              {interpretation === "Frío" ? (
                <span className="text-primary">Frío 🧊</span>
              ) : (
                <span className="text-warning">Caluroso 🔥</span>
              )}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
