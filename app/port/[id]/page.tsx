import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FALLBACK_PORT_STATS } from "@/lib/fallback-data";

export default function PortPage({ params }: { params: { id: string } }) {
  const port = FALLBACK_PORT_STATS.find(p => p.portId === params.id) ?? FALLBACK_PORT_STATS[0];
  return (
    <div className="space-y-6 font-mono text-xs">
      <Link href="/" className="inline-flex items-center text-sea hover:underline">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Chokepoints
      </Link>
      <div className="bg-white border border-border rounded-lg p-6">
        <h1 className="text-xl font-display font-bold text-text">{port.portName}</h1>
        <p className="text-text-muted mt-1">{port.country} • Anchor wait: {port.avgWaitHours} hrs</p>
      </div>
    </div>
  );
}
