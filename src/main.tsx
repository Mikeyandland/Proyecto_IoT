// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import Home from "./Home.tsx";
// import Login from "./Login.tsx";
// import Register from "./Register.tsx"; // <--- IMPORTANTE
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// <Route path="/register" element={<Register />} />
// import User from "./User.tsx";
// <Route path="/user" element={<User />} />

// import "bootstrap/dist/css/bootstrap.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/register" element={<Register />} /> {/* <--- NUEVA RUTA */}
//         <Route path="/user" element={<User />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import User from "./User.tsx";
import Grid from "./Grid.tsx";
import MqttComp from "./MQTTComponent.tsx";

// SENSORES (aquí agregas tus SensorPage_XXXX.tsx)
import SensorPage_Temperatura from "./SensorPage_Temperatura.tsx";

import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* PÁGINAS */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/grid" element={<Grid />} />

        {/* SENSOR TEMPERATURA */}
        <Route
          path="/sensor/temperatura"
          element={<SensorPage_Temperatura />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
