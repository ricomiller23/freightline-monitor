# FREIGHTLINE
## Global Shipping, Port & Supply-Chain Congestion Monitor

A light-theme, always-fresh public data dashboard tracking strategic maritime chokepoints, canal draft restrictions, and freight rate benchmarks with index-vs-price discipline.

### Core Invariants
1. **Index Level != Price:** Baltic Dry Index (index points) is strictly isolated from container freight rates (USD/FEU).
2. **Calls vs Volume:** Transit calls (vessels) and trade volume (tonnes/TEU) are separate series and never summed or converted.
3. **August 2026 Methodology Break:** Explicitly rendered marker for the PortWatch addition of tracked vessels.
4. **Light Theme Only:** Zero dark mode or `prefers-color-scheme`.
