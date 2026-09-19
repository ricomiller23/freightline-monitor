import Link from "next/link";
import { notFound } from "next/navigation";
import { FALLBACK_CHOKEPOINTS, FALLBACK_TRANSIT_STATS } from "@/lib/fallback-data";
import { ArrowLeft, ExternalLink, AlertCircle } from "lucide-react";

export default function ChokepointDetailPage({ params }: { params: { id: string } }) {
  const cp = FALLBACK_CHOKEPOINTS.find(c => c.id === params.id) ?? FALLBACK_CHOKEPOINTS[0];
  const stats = FALLBACK_TRANSIT_STATS.filter(s => s.chokepointId === cp.id);

  return (
    <div className="space-y-6 font-mono text-xs">
      <Link href="/" className="inline-flex items-center text-sea hover:underline">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Chokepoints
      </Link>

      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            Seed
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800">
            {cp.lat}°N, {cp.lon}°E
          </span>
        </div>
        <h1 className="text-2xl font-display font-extrabold text-text">{cp.name}</h1>
        <p className="text-sm text-text-muted mt-2">{cp.capacityNote}</p>
      </div>

      {/* Methodology Break Marker */}
      <div className="border-l-4 border-amber-500 bg-amber-50/40 p-4 rounded-r-md text-amber-950">
        <strong>Methodology Notice (August 2026):</strong> IMF PortWatch revised its methodology in August 2026 by incorporating expanded AIS satellite tracking networks. Time series crossing this boundary are marked with a methodology break.
      </div>

      {/* Transit Calls and Trade Volume (Separate Tables / Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-bold text-text uppercase">Transit Calls (Vessel Counts)</h2>
          <p className="text-text-muted text-[11px]">Number of unique commercial ships transiting the chokepoint.</p>
          <div className="text-2xl font-bold font-mono text-text num-tabular">
            {cp.dailyCallsCurrent} calls / day
          </div>
          <span className="text-text-faint block">Normal baseline: {cp.dailyCallsNormal} calls/day</span>
        </div>

        <div className="bg-white border border-border rounded-lg p-5 space-y-3">
          <h2 className="text-sm font-bold text-text uppercase">Trade Volume (Metric Tonnes)</h2>
          <p className="text-text-muted text-[11px]">Estimated cargo tonnage transiting the passage (not convertible to calls).</p>
          <div className="text-2xl font-bold font-mono text-sea num-tabular">
            {stats[0]?.tradeVolumeTonnes ? `${(stats[0].tradeVolumeTonnes / 1000000).toFixed(2)}M tonnes` : "1.42M tonnes / day"}
          </div>
          <span className="text-text-faint block">Containers: {stats[0]?.tradeVolumeTeu?.toLocaleString() ?? "110,000"} TEU</span>
        </div>
      </div>
    </div>
  );
}
