import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("userProfile");

    if (!savedUser) {
      setErrorMsg("No hay usuarios registrados. Crea una cuenta primero.");
      return;
    }

    const userData = JSON.parse(savedUser);

    // Validar credenciales
    if (
      form.usuario === userData.usuario &&
      form.password === userData.password
    ) {
      navigate("/home");
    } else {
      setErrorMsg("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <>
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <div className="card shadow p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input
                type="text"
                name="usuario"
                className="form-control"
                value={form.usuario}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMsg && (
              <p className="text-danger text-center mb-3">{errorMsg}</p>
            )}

            <button className="btn btn-primary w-100" type="submit">
              Entrar
            </button>
          </form>

          <hr />
          <p className="text-center">
            ¿No tienes cuenta? <a href="/register">Crear cuenta</a>
          </p>
        </div>
      </div>
    </>
  );
}
