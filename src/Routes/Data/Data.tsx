import Grid from "./Grid";
import StatsLedButton from "../../components/StatsLedButton";

const Data = () => {
  return (
    <>
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

      <section className="mt-5">
        <Grid />
        <StatsLedButton />
      </section>
    </>
  );
};

export default Data;
