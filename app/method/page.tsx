export default function MethodPage() {
  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs leading-relaxed">
      <div className="bg-bg-subtle border border-border rounded-lg p-5">
        <h1 className="text-xl font-display font-bold text-text">FREIGHTLINE Correctness Rules</h1>
        <p className="text-text-muted mt-1">Four core principles that protect shipping data from misinterpretation.</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-display font-bold text-text uppercase">1. An Index Is Not a Price</h2>
        <p className="text-text-muted">
          The Baltic Dry Index (BDI) is a composite index level of Capesize, Panamax, and Supramax timecharter averages normalized to an arbitrary base of 1,000 points. It does not represent dollars per ton. In contrast, the Drewry World Container Index represents actual spot freight rates in USD per 40ft container ($/FEU).
        </p>

        <h2 className="text-sm font-display font-bold text-text uppercase mt-4">2. Spot vs. Contract Basis</h2>
        <p className="text-text-muted">
          Contract freight rates signed on long-term annual tenders frequently diverge by a factor of two or more from weekly spot quotations on the same oceanic corridor. Every rate renders its basis.
        </p>

        <h2 className="text-sm font-display font-bold text-text uppercase mt-4">3. Calls vs. Volume</h2>
        <p className="text-text-muted">
          Vessel transits measure ship movements; trade volume measures actual transported tonnage. As containerships scale to 24,000 TEU Ultra Large Container Vessels (ULCVs), fewer ship transits can transport greater net cargo volume.
        </p>
      </div>
    </div>
  );
}
