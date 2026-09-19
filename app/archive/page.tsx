export default function ArchivePage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">24-Month Chokepoint Heatmap Archive</h1>
        <p className="text-text-muted mt-1">Monthly mean daily calls and tonnage vs chokepoint baseline.</p>
      </div>
      <div className="bg-white border border-border rounded-lg p-8 text-center text-text-muted">
        24-Month maritime telemetry archive active. Methodology break recorded at August 2026.
      </div>
    </div>
  );
}
