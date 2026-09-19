export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle mt-16 py-8 text-xs text-text-muted font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p>
            <strong>FREIGHTLINE</strong> — Where freight is moving, where it is stuck, and what the authorities are reporting.
          </p>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Light Theme Invariant</span>
            <span>•</span>
            <span>Index Level != Freight Price</span>
            <span>•</span>
            <span>Vessel Calls != Trade Tonnes</span>
          </div>
        </div>
        <p className="text-text-faint text-[11px] leading-relaxed">
          <strong>Non-Procurement Disclaimer:</strong> Descriptive maritime data only. Does not constitute shipping charter, procurement, or commodity trading advice. An index level (such as BDI points) is a normalized composite level and must never be interpreted as a dollar freight price. IMF PortWatch methodology addition of tracked vessels occurred in August 2026; series crossing this date are marked with a methodology break.
        </p>
      </div>
    </footer>
  );
}
