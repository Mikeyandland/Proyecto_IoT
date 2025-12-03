import { Routes, Route } from "react-router-dom";

import Home from "./Routes/Home/Home.tsx";
import Login from "./Routes/Login/Login.tsx";
import Register from "./Routes/Register/Register.tsx";
import User from "./Routes/User/User.tsx";
import Header from "./components/Header.tsx";
import Data from "./Routes/Data/Data.tsx";
import SensorDetail from "./Routes/Data/SensorDetail";

import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/stats" element={<Data />} />
        <Route path="/sensors/:id" element={<SensorDetail />} />
      </Routes>
    </>
  );
}
