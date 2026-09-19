export class QuoteMismatchError extends Error {
  constructor(message: string) {
    super(`[FREIGHTLINE QUOTE VIOLATION] ${message}`);
    this.name = "QuoteMismatchError";
  }
}

export class DefinitionMismatchError extends Error {
  constructor(message: string) {
    super(`[FREIGHTLINE DEFINITION VIOLATION] ${message}`);
    this.name = "DefinitionMismatchError";
  }
}

export type QuoteType = "index_level" | "usd_per_feu" | "usd_per_teu" | "usd_per_day";
export type RateBasis = "spot" | "contract" | "charter" | "composite";

export interface RateObservation {
  id: string;
  sourceId: string;
  laneId?: string;
  laneName?: string;
  indexId?: string;
  indexName?: string;
  value: number;
  quoteType: QuoteType;
  basis: RateBasis;
  currency?: string;
  asOfDate: string;
  publishedAt: string;
  documentUrl: string;
  isSeed: boolean;
}

/**
 * TRAP 1 GUARD: Index level is NOT a dollar freight price.
 * Baltic Dry Index is an index_level; container spot rate is usd_per_feu.
 * Combining them throws!
 */
export function assertNoIndexPriceBlend(quotes: RateObservation[]): void {
  const quoteTypes = new Set(quotes.map(q => q.quoteType));
  if (quoteTypes.has("index_level") && (quoteTypes.has("usd_per_feu") || quoteTypes.has("usd_per_teu") || quoteTypes.has("usd_per_day"))) {
    throw new QuoteMismatchError(
      "Cannot blend or plot an index_level (e.g. Baltic Dry Index points) with currency freight rates (e.g. USD/FEU). An index level is a normalized composite level, not a price."
    );
  }
}

/**
 * TRAP 3 GUARD: Port calls vs Trade Volume.
 * Calls are vessels; volume is tonnes/TEU. Summing or converting them throws!
 */
export function assertCallsVsVolume(calls: number, volume: number): never {
  throw new DefinitionMismatchError(
    `Cannot convert or sum transit calls (${calls} vessels) with trade volume (${volume} tonnes). As vessel sizes expand, calls can decline while trade volume rises.`
  );
}

/**
 * AUGUST 2026 PORTWATCH METHODOLOGY BREAK:
 * Values spanning across August 2026 are not directly comparable.
 */
export function checkMethodologyBreak(dateA: string, dateB: string): { isComparable: boolean; note: string } {
  const boundary = "2026-08-01";
  const aBefore = dateA < boundary;
  const bBefore = dateB < boundary;
  if (aBefore !== bBefore) {
    return {
      isComparable: false,
      note: "Not comparable across the August 2026 PortWatch methodology addition of tracked vessels.",
    };
  }
  return {
    isComparable: true,
    note: "Consistent methodology window.",
  };
}
