'use client';

import { WorldVectorLandmass } from './WorldVectorLandmass';
import React, { useState } from 'react';
import { Anchor, Compass, ExternalLink, ShieldAlert, ArrowUpRight } from 'lucide-react';

export interface ChokepointLocation {
  id: string;
  name: string;
  category: 'chokepoint' | 'megaport';
  lat: number;
  lng: number;
  dailyCalls: number;
  tradeVolumeMt: number;
  avgWaitHours: number;
  status: 'Normal' | 'Congested' | 'Disrupted' | 'Draft Restricted';
  alternativeRoute: string;
  sourceAuthority: string;
  sourceUrl: string;
}

export const MONITORED_CHOKEPOINTS: ChokepointLocation[] = [
  {
    id: 'suez-canal',
    name: 'Suez Canal',
    category: 'chokepoint',
    lat: 30.58,
    lng: 32.56,
    dailyCalls: 34,
    tradeVolumeMt: 2.1,
    avgWaitHours: 42,
    status: 'Disrupted',
    alternativeRoute: 'Cape of Good Hope (+10-14 transit days)',
    sourceAuthority: 'IMF PortWatch & Suez Canal Authority',
    sourceUrl: 'https://portwatch.imf.org/'
  },
  {
    id: 'bab-el-mandeb',
    name: 'Bab el-Mandeb (Southern Red Sea)',
    category: 'chokepoint',
    lat: 12.58,
    lng: 43.33,
    dailyCalls: 28,
    tradeVolumeMt: 1.8,
    avgWaitHours: 36,
    status: 'Disrupted',
    alternativeRoute: 'Around Africa (Cape Route +74% volume surge)',
    sourceAuthority: 'IMF PortWatch',
    sourceUrl: 'https://portwatch.imf.org/'
  },
  {
    id: 'panama-canal',
    name: 'Panama Canal (Miraflores Locks)',
    category: 'chokepoint',
    lat: 9.08,
    lng: -79.68,
    dailyCalls: 36,
    tradeVolumeMt: 1.5,
    avgWaitHours: 68,
    status: 'Draft Restricted',
    alternativeRoute: 'Magellan Strait / US Intermodal Rail',
    sourceAuthority: 'Panama Canal Authority (ACP)',
    sourceUrl: 'https://pancanal.com/en/'
  },
  {
    id: 'strait-of-hormuz',
    name: 'Strait of Hormuz',
    category: 'chokepoint',
    lat: 26.56,
    lng: 56.25,
    dailyCalls: 115,
    tradeVolumeMt: 18.5,
    avgWaitHours: 18,
    status: 'Normal',
    alternativeRoute: 'Petroline Pipeline (East-West Yanbu)',
    sourceAuthority: 'IMF PortWatch & EIA',
    sourceUrl: 'https://portwatch.imf.org/'
  },
  {
    id: 'strait-of-malacca',
    name: 'Strait of Malacca (Singapore Strait)',
    category: 'chokepoint',
    lat: 1.43,
    lng: 102.89,
    dailyCalls: 240,
    tradeVolumeMt: 22.0,
    avgWaitHours: 24,
    status: 'Congested',
    alternativeRoute: 'Sunda Strait / Lombok Strait',
    sourceAuthority: 'MPA Singapore & IMO',
    sourceUrl: 'https://portwatch.imf.org/'
  },
  {
    id: 'port-la-longbeach',
    name: 'San Pedro Bay Ports (LA / Long Beach)',
    category: 'megaport',
    lat: 33.74,
    lng: -118.26,
    dailyCalls: 22,
    tradeVolumeMt: 1.9,
    avgWaitHours: 48,
    status: 'Congested',
    alternativeRoute: 'Pacific Northwest / Oakland',
    sourceAuthority: 'Port of Los Angeles Operations',
    sourceUrl: 'https://www.portoflosangeles.org/'
  },
  {
    id: 'port-rotterdam',
    name: 'Port of Rotterdam (Europort Gateway)',
    category: 'megaport',
    lat: 51.92,
    lng: 4.47,
    dailyCalls: 85,
    tradeVolumeMt: 4.8,
    avgWaitHours: 32,
    status: 'Normal',
    alternativeRoute: 'Antwerp-Bruges / Hamburg',
    sourceAuthority: 'Port of Rotterdam Authority',
    sourceUrl: 'https://www.portofrotterdam.com/'
  }
];

export function MaritimeChokepointMap() {
  const [selectedPoint, setSelectedPoint] = useState<ChokepointLocation>(MONITORED_CHOKEPOINTS[0]);

  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((84 - lat) / 142) * 100;
    return {
      x: Math.max(4, Math.min(96, x)),
      y: Math.max(6, Math.min(94, y))
    };
  };

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm space-y-0">
      <div className="bg-bg-subtle border-b border-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Anchor className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-text flex items-center gap-2">
              <span>Global Strategic Chokepoints & Container Gateways</span>
              <span className="bg-sky-50 text-sky-800 text-[10px] font-mono px-2 py-0.5 rounded border border-sky-200">
                IMF PortWatch Ingest
              </span>
            </h3>
            <p className="text-xs text-text-muted">Daily vessel transit calls, cargo tonnage, wait-time bottlenecks, and alternative corridors</p>
          </div>
        </div>

        <span className="text-xs font-mono bg-white border border-border px-2.5 py-1 rounded text-text-muted">
          Calls (vessels) ≠ Volume (tonnage)
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-[#EBF3FD]/40 border-b border-border overflow-hidden select-none">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <WorldVectorLandmass />

        </svg>

        {/* Chokepoint & Port Pins */}
        {MONITORED_CHOKEPOINTS.map((pt) => {
          const coords = project(pt.lat, pt.lng);
          const isSel = selectedPoint.id === pt.id;

          return (
            <div
              key={pt.id}
              onClick={() => setSelectedPoint(pt)}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              {pt.status === 'Disrupted' && (
                <span className="absolute -inset-1.5 rounded-full animate-ping opacity-75 bg-red-500" />
              )}

              <div className={`p-1.5 rounded-full shadow-md transition-transform group-hover:scale-125 ${
                isSel 
                  ? 'bg-sky-600 text-white ring-4 ring-sky-200' 
                  : pt.status === 'Disrupted' 
                    ? 'bg-red-600 text-white' 
                    : pt.status === 'Congested' || pt.status === 'Draft Restricted' 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-slate-700 text-white'
              }`}>
                <Anchor className="w-3.5 h-3.5" />
              </div>

              <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-text text-white p-2.5 rounded-lg text-[10px] font-mono shadow-xl transition-opacity z-30">
                <div className="font-bold text-white text-[11px] truncate">{pt.name}</div>
                <div className="text-slate-300">Status: {pt.status} · Wait: {pt.avgWaitHours}h</div>
                <div className="text-sky-300 font-bold mt-1">Daily Transit: {pt.dailyCalls} calls ({pt.tradeVolumeMt} Mt)</div>
                <div className="text-amber-300">Reroute: {pt.alternativeRoute}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Chokepoint Dossier */}
      <div className="p-5 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              selectedPoint.status === 'Disrupted' ? 'bg-red-50 text-red-700 border border-red-200' :
              selectedPoint.status === 'Draft Restricted' || selectedPoint.status === 'Congested' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              ● {selectedPoint.status.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-text-muted">
              Wait: <strong className="text-text">{selectedPoint.avgWaitHours}h average</strong>
            </span>
          </div>

          <h4 className="text-lg font-bold font-display text-text">{selectedPoint.name}</h4>
          <p className="text-xs text-text-muted font-mono">
            Daily Vessel Calls: <strong className="text-text">{selectedPoint.dailyCalls}</strong> · Volume: <strong className="text-text">{selectedPoint.tradeVolumeMt} MM Tonnes/day</strong> · Alternate: <span className="text-amber-700">{selectedPoint.alternativeRoute}</span>
          </p>
        </div>

        <a
          href={selectedPoint.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-bg-subtle border border-border hover:border-brand/40 text-xs font-mono text-brand font-medium hover:underline shadow-xs"
        >
          <span>{selectedPoint.sourceAuthority}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}