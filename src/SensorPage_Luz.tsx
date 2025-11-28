import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import lightIcon from "/Users/miguelgomezcarmona/Desktop/IoT_SmartHouse/src/assets/lightSensor.png";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function SensorPage_Luz() {
  // 💡 Valores de ejemplo (después se conectan a MQTT)
  const currentValue = 60; // Porcentaje de luz
  const isFunctional = true;

  return (
    <div className="container mt-5">

      {/* CARD PRINCIPAL */}
      <div className="card shadow-lg p-4">
        <div className="row">

          {/* Imagen */}
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              src={lightIcon}
              alt="Luz"
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
          </div>

          {/* Información */}
          <div className="col-md-8">
            <h2 className="mb-3">Sensor de Luz</h2>

            <p className="fs-5">
              <strong>Valor actual:</strong> {currentValue}%
            </p>

            <p className="fs-5">
              <strong>Estado funcional:</strong>{" "}
              <span className={isFunctional ? "text-success" : "text-danger"}>
                {isFunctional ? "Funcional" : "No Funcional"}
              </span>
            </p>

            {/* Barra de interpretación */}
            <p className="fs-5"><strong>Interpretación:</strong></p>

            <div className="progress" style={{ height: "25px", fontSize: "14px" }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${currentValue}%` }}
              >
                {currentValue}%
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 📊 GRÁFICA */}
      <div className="card shadow-lg p-4 mt-4">
        <h4 className="mb-3">Histórico de Intensidad de Luz</h4>

        <div style={{ height: "300px" }}>
          <Line
            data={{
              labels: ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
              datasets: [
                {
                  label: "Luz (%)",
                  data: [40, 45, 50, 60, 70, 65],
                  borderColor: "rgba(255, 193, 7, 1)",
                  borderWidth: 3,
                  tension: 0.3,
                  pointRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

    </div>
  );
}
