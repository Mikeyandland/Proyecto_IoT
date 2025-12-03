import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import useFetchHistory from "../hooks/useFetchHistory";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

type Props = {
  sensorId: string;
  limit?: number;
  height?: number;
};

export default function HistoryChart({
  sensorId,
  limit = 100,
  height = 120,
}: Props) {
  const { data, loading } = useFetchHistory(sensorId, limit, 15_000);

  const chartData = React.useMemo(() => {
    const labels = data.map((r) => new Date(r.ts));
    const values = data.map((r) => (r.value === null ? NaN : r.value));
    return {
      labels,
      datasets: [
        {
          label: sensorId,
          data: values,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.2)",
          tension: 0.2,
          pointRadius: 0,
        },
      ],
    };
  }, [data, sensorId]);

  const options = React.useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time" as const,
          time: { unit: "minute" },
          ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 6 },
        },
        y: { beginAtZero: true },
      },
      plugins: {
        legend: { display: false },
        tooltip: { mode: "index", intersect: false },
      },
    }),
    []
  );

  return (
    <div style={{ height }}>
      {loading ? (
        <div style={{ fontSize: 12, color: "#666" }}>Loading history…</div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
