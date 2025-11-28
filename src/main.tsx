import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home.tsx";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import User from "./User.tsx";
import Grid from "./Grid.tsx";

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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
