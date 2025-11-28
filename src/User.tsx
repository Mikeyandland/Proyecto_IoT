import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function User() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <h3>No user has been registered</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Header /> {/* ⬅️ AGREGADO */}
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">User's profile</h2>

        <div className="card shadow p-4">
          <h4 className="mb-3">
            {user.nombre} {user.apellido}
          </h4>

          <p>
            <strong>Age:</strong> {user.edad}
          </p>
          <p>
            <strong>Major:</strong> {user.carrera}
          </p>
          <p>
            <strong>User Name:</strong> @{user.usuario}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>

          <hr />
          <p className="text-muted">The info comes from Register.tsx.</p>
        </div>
      </div>
    </>
  );
}
