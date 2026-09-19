import { FALLBACK_DISRUPTIONS } from "@/lib/fallback-data";

export default function DisruptionsPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">Maritime Corridor Disruptions & Rerouting</h1>
        <p className="text-text-muted mt-1">
          Historical and active disruptions affecting oceanic corridors, canal draft limits, and maritime security.
        </p>
      </div>

      <div className="space-y-4">
        {FALLBACK_DISRUPTIONS.map((d) => (
          <div key={d.id} className="p-5 bg-white border border-border rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-danger uppercase">
                {d.kind.replace("_", " ")}
              </span>
              <span className="text-text-muted text-[11px]">Started: {d.startedAt.slice(0, 10)}</span>
            </div>
            <h2 className="text-sm font-bold text-text">{d.chokepointName} — {d.region}</h2>
            <p className="text-text-muted">{d.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
