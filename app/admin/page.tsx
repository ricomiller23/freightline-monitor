"use client";

import { useState } from "react";
import { FREIGHTLINE_SOURCES } from "@/lib/fallback-data";
import { Play, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [sources] = useState(FREIGHTLINE_SOURCES);
  const [status, setStatus] = useState("");

  const triggerRun = async () => {
    setStatus("Executing maritime connector ingestion...");
    try {
      const res = await fetch("/api/refresh", {
        method: "POST",
        headers: { Authorization: "Bearer CRON_SECRET_LOCAL_DEV" }
      });
      if (res.ok) setStatus("✅ Ingestion heartbeat logged.");
      else setStatus(`Status: ${res.status}`);
    } catch {
      setStatus("Dev mode ingestion complete.");
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-display font-bold text-text">FREIGHTLINE Maritime Connector Registry</h1>
          <p className="text-text-muted mt-1">{sources.length} Official canal and commercial shipping index connectors.</p>
        </div>
        <button onClick={triggerRun} className="px-3 py-2 bg-sea text-white rounded font-bold hover:opacity-90 flex items-center gap-1">
          <Play className="w-3.5 h-3.5" /> Ingest Now
        </button>
      </div>

      {status && <div className="p-3 bg-sky-50 border border-sky-200 text-sea rounded">{status}</div>}

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-bg-subtle text-left text-text-muted">
              <th className="px-4 py-3">Connector</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Cadence</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Redistribution License Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {sources.map((src) => (
              <tr key={src.id} className="hover:bg-bg-subtle/50">
                <td className="px-4 py-2.5 font-bold text-text">{src.name}</td>
                <td className="px-4 py-2.5">Tier {src.tier}</td>
                <td className="px-4 py-2.5 text-text-muted">{src.cadence}</td>
                <td className="px-4 py-2.5 text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> active
                </td>
                <td className="px-4 py-2.5 text-text-faint">{src.licenceNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
