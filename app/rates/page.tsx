import { FALLBACK_RATES } from "@/lib/fallback-data";

export default function RatesPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">Freight Benchmarks: Rates vs. Indices</h1>
        <p className="text-text-muted mt-1">
          Strict separation of dollar currency rates ($/FEU, $/TEU) from composite index levels (points). Basis (spot vs contract) is rendered on every observation.
        </p>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-bg-subtle text-left text-text-muted">
              <th className="px-4 py-3">Benchmark Name</th>
              <th className="px-4 py-3">Quote Type</th>
              <th className="px-4 py-3">Basis</th>
              <th className="px-4 py-3">Published Value</th>
              <th className="px-4 py-3">As of Date</th>
              <th className="px-4 py-3">Citation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {FALLBACK_RATES.map((r) => (
              <tr key={r.id} className="hover:bg-bg-subtle/50">
                <td className="px-4 py-3 font-bold text-text">{r.indexName}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.quoteType === "index_level" ? "bg-purple-100 text-purple-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {r.quoteType.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 uppercase text-text-muted">{r.basis}</td>
                <td className="px-4 py-3 font-bold font-mono text-text num-tabular text-sm">
                  {r.quoteType === "index_level" ? `${r.value.toLocaleString()} pts` : `$${r.value.toLocaleString()} / FEU`}
                </td>
                <td className="px-4 py-3 text-text-muted">{r.asOfDate}</td>
                <td className="px-4 py-3">
                  <a href={r.documentUrl} target="_blank" rel="noreferrer" className="text-brand hover:underline">
                    source doc
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
