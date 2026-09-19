import { RateObservation } from "./quotes";

export interface Chokepoint {
  id: string;
  name: string;
  lat: number;
  lon: number;
  dailyCallsNormal: number;
  dailyCallsCurrent: number;
  status: "normal" | "congested" | "disrupted";
  capacityNote: string;
  alternatives: string[];
}

export interface TransitStat {
  id: string;
  chokepointId: string;
  chokepointName: string;
  sourceId: string;
  date: string;
  transitCalls: number;
  tradeVolumeTonnes: number;
  tradeVolumeTeu?: number;
  direction: "northbound" | "southbound" | "bidirectional";
}

export interface PortStat {
  id: string;
  portId: string;
  portName: string;
  country: string;
  period: string;
  vesselsAtAnchor: number;
  avgWaitHours: number;
  throughputTeu?: number;
}

export interface DisruptionEvent {
  id: string;
  chokepointId?: string;
  chokepointName?: string;
  region: string;
  kind: "canal_draft" | "rerouting" | "weather" | "security_incident";
  startedAt: string;
  endedAt?: string;
  summary: string;
  documentUrl: string;
}
