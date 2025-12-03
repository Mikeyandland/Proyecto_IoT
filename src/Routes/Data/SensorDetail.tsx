import { useParams } from "react-router-dom";
import HistoryChart from "../../components/HistoryChart";
import useFetchHistory from "../../hooks/useFetchHistory";

export default function SensorDetail() {
  const { id } = useParams<{ id: string }>();
  const sensorId = id || "";
  const { data, loading, error, reload } = useFetchHistory(sensorId, 200, 0);

  const latest = data.length ? data[data.length - 1] : undefined;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>{sensorId}</h2>
          <div className="mb-3">
            <HistoryChart sensorId={sensorId} limit={500} height={360} />
          </div>
          <div className="mb-3">
            <button className="btn btn-secondary me-2" onClick={() => reload()}>
              Reload
            </button>
            <small className="text-muted">
              Showing last {data.length} readings
            </small>
          </div>

          <div>
            {loading && <div>Loading readings...</div>}
            {error && <div className="text-danger">{error}</div>}
            {!loading && data.length === 0 && <div>No readings available</div>}

            {data.length > 0 && (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Value</th>
                    <th>Raw</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .slice()
                    .reverse()
                    .map((r) => (
                      <tr key={r.ts}>
                        <td>{new Date(r.ts).toLocaleString()}</td>
                        <td>{r.value === null ? "—" : r.value}</td>
                        <td style={{ fontSize: 12, color: "#444" }}>{r.raw}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
