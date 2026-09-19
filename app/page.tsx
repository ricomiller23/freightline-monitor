import Link from "next/link";
import { FALLBACK_CHOKEPOINTS, FALLBACK_RATES } from "@/lib/fallback-data";
import { Anchor, AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";

export default function FreightlineBoardPage() {
  return (
    <div className="space-y-8 font-mono text-xs">
      {/* Header Banner */}
      <div className="bg-bg-subtle border border-border rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-display font-bold text-text">Global Maritime Chokepoints & Freight Telemetry</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-100 text-amber-900 border border-amber-300">
              Seed Active
            </span>
          </div>
          <p className="text-text-muted mt-1">
            Corridor-first tracking of transit calls, trade volume, draft restrictions, and freight rate benchmarks.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-border p-2.5 rounded shadow-sm">
            <span className="text-text-muted block text-[10px]">Drewry WCI (Spot)</span>
            <strong className="text-sm font-bold text-text num-tabular">$4,500 / FEU</strong>
          </div>
          <div className="bg-white border border-border p-2.5 rounded shadow-sm">
            <span className="text-text-muted block text-[10px]">Baltic Dry Index</span>
            <strong className="text-sm font-bold text-sea num-tabular">3,370 pts</strong>
          </div>
        </div>
      </div>

      {/* Index vs Price Explainer Strip */}
      <div className="border-l-4 border-sea bg-sky-50/50 p-4 rounded-r-md text-sky-950 leading-relaxed">
        <strong>Index Discipline:</strong> An index level is not a price. The Baltic Dry Index (BDI) is a weighted composite of dry bulk charter rates normalized to a base level; a container index (WCI/FBX) is a published rate in dollars per 40ft container ($/FEU). They are never combined on the same axis.
      </div>

      {/* Chokepoint Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-bold text-text flex items-center justify-between">
          <span>Strategic Maritime Chokepoints</span>
          <span className="text-xs font-mono text-text-muted font-normal">Ranked by transit deviation</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FALLBACK_CHOKEPOINTS.map((cp) => {
            const isDisrupted = cp.status === "disrupted";
            const isCongested = cp.status === "congested";
            return (
              <div key={cp.id} className="bg-white border border-border rounded-lg p-6 space-y-4 shadow-sm hover:border-sea/40 transition-all">
                <div className="flex justify-between items-start border-b border-border pb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 border border-amber-200">
                        Seed
                      </span>
                      {isDisrupted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-danger border border-red-200 uppercase">
                          DISRUPTED
                        </span>
                      )}
                      {isCongested && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase">
                          CONGESTED
                        </span>
                      )}
                      {!isDisrupted && !isCongested && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                          NORMAL
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-bold text-text hover:text-sea">
                      <Link href={`/chokepoint/${cp.id}`}>{cp.name}</Link>
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-text-muted block">Daily Vessel Calls</span>
                    <div className="text-xl font-bold font-mono text-text num-tabular mt-0.5">
                      {cp.dailyCallsCurrent} <span className="text-xs font-normal text-text-faint">/ {cp.dailyCallsNormal} normal</span>
                    </div>
                  </div>
                </div>

                <p className="text-text-muted text-xs leading-relaxed">{cp.capacityNote}</p>

                <div className="p-3 bg-bg-subtle rounded border border-border text-[11px] text-text-muted space-y-1">
                  <strong className="text-text block">Rerouting Alternatives:</strong>
                  <ul className="list-disc list-inside space-y-0.5">
                    {cp.alternatives.map((alt, idx) => (
                      <li key={idx}>{alt}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-border flex justify-between items-center text-[11px]">
                  <span className="text-text-faint">Coordinates: {cp.lat}°N, {cp.lon}°E</span>
                  <Link href={`/chokepoint/${cp.id}`} className="text-sea hover:underline font-bold flex items-center gap-1">
                    Telemetry & Volume <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
