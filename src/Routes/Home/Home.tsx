import Grid from "./components/Grid";

export default function Home() {
  return (
    <>
      {/* Hero Section (TAL CUAL ME LA DISTE, SIN CAMBIOS) */}
      <section
        style={{
          width: "100%",
          minHeight: "60vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 0",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "700px",
            background: "rgba(0,0,0,0.6)",
            padding: "40px",
            borderRadius: "20px",
            color: "white",
            backdropFilter: "blur(4px)",
          }}
        >
          <h1 className="text-center mb-3">WELCOME!</h1>
          <p className="text-center fs-5">
            Esta es la sección Hero. Somos el equipo numero 2 haciendo el front
            end con una mezcla de Bootstrap y React. La imagen se puede cambiar
            mas tarde
          </p>
        </div>
      </section>

      {/* title section */}
      <section className="container mt-5">
        <div
          className="p-5 rounded shadow text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="display-5 fw-bold">Sensor display</h1>
          <p className="lead">
            See the performace of the sensors in real time.
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="mt-5">
        <Grid />
      </section>
    </>
  );
}
