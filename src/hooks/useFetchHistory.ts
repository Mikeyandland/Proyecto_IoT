import { useEffect, useState, useRef } from "react";

type Reading = {
  ts: string;
  value: number | null;
  raw?: string;
};

export default function useFetchHistory(
  sensorId: string,
  limit = 100,
  pollIntervalMs?: number
) {
  const [data, setData] = useState<Reading[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function fetchOnce() {
    if (!sensorId) return;
    setLoading(true);
    setError(null);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    // allow configuring backend base via Vite env: VITE_API_BASE
    const base = (import.meta as any).env?.VITE_API_BASE || "http://localhost:8000";
    const url = `${base.replace(/\/$/, "")}/api/sensors/${encodeURIComponent(
      sensorId
    )}/history?limit=${limit}`;

    try {
      const resp = await fetch(url, { signal: ac.signal });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      // try parse JSON, but if server returned HTML (index.html) capture that and surface clearer error
      const text = await resp.text();
      try {
        const json = JSON.parse(text) as Reading[];
        setData(json);
      } catch (parseErr) {
        // likely an HTML response (vite dev server) or an error page
        const snippet = text.slice(0, 300);
        throw new Error(`Invalid JSON from ${url}: ${snippet}`);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOnce();
    let timer: NodeJS.Timeout | undefined;
    if (pollIntervalMs && pollIntervalMs > 0) {
      timer = setInterval(fetchOnce, pollIntervalMs);
    }
    return () => {
      if (timer) clearInterval(timer);
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorId, limit, pollIntervalMs]);

  return { data, loading, error, reload: fetchOnce };
}
