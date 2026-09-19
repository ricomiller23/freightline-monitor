import { NextResponse } from "next/server";
import { FALLBACK_RATES, FALLBACK_CHOKEPOINTS, FALLBACK_TRANSIT_STATS } from "@/lib/fallback-data";

export async function GET() {
  return NextResponse.json({
    rates: FALLBACK_RATES,
    chokepoints: FALLBACK_CHOKEPOINTS,
    transits: FALLBACK_TRANSIT_STATS,
    asOf: new Date().toISOString()
  });
}
