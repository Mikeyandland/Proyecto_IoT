import Carousel from "./components/Carrussel";
export default function Home() {
  return (
    <>
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
          <h1 className="text-center mb-3">WELCOME TO YOUR SMART HOUSE!</h1>
          <p className="text-center fs-5">
            Experience your house like never before
          </p>
        </div>
      </section>
      <section style={{ color: "black" }}>
        <p style={{ margin: "5rem" }}></p>
        <Carousel></Carousel>
        <p style={{ margin: "3rem" }}></p>
      </section>
    </>
  );
}
