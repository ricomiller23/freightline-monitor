import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LanePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 font-mono text-xs">
      <Link href="/" className="inline-flex items-center text-sea hover:underline">
        <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Chokepoints
      </Link>
      <div className="bg-white border border-border rounded-lg p-6">
        <h1 className="text-xl font-display font-bold text-text">Trade Lane: {params.id}</h1>
        <p className="text-text-muted mt-1">Oceanic corridor telemetry and freight rate history.</p>
      </div>
    </div>
  );
}
