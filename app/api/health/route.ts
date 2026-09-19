import { NextResponse } from "next/server";
import { FREIGHTLINE_SOURCES } from "@/lib/fallback-data";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    sourcesCount: FREIGHTLINE_SOURCES.length,
    activeSources: FREIGHTLINE_SOURCES.filter(s => s.enabled).length
  });
}
