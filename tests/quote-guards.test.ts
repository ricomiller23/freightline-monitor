import { describe, it, expect } from "vitest";
import { assertNoIndexPriceBlend, assertCallsVsVolume, checkMethodologyBreak, QuoteMismatchError, DefinitionMismatchError } from "../lib/quotes";
import { FALLBACK_RATES } from "../lib/fallback-data";

describe("FREIGHTLINE — Quote & Chokepoint Invariant Tests", () => {
  it("strictly blocks blending index_level with usd_per_feu on same axis", () => {
    expect(() => assertNoIndexPriceBlend(FALLBACK_RATES)).toThrow(QuoteMismatchError);
  });

  it("strictly prevents converting or summing vessel calls with trade volume", () => {
    expect(() => assertCallsVsVolume(24, 1420000)).toThrow(DefinitionMismatchError);
  });

  it("flags non-comparable time series crossing the August 2026 PortWatch methodology addition", () => {
    const check = checkMethodologyBreak("2026-07-15", "2026-08-15");
    expect(check.isComparable).toBe(false);
    expect(check.note).toContain("Not comparable across the August 2026 PortWatch methodology");

    const consistent = checkMethodologyBreak("2026-08-05", "2026-09-05");
    expect(consistent.isComparable).toBe(true);
  });
});
