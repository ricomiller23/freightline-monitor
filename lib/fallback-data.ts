import { RateObservation } from "./quotes";
import { Chokepoint, TransitStat, PortStat, DisruptionEvent } from "./definitions";

export const FALLBACK_CHOKEPOINTS: Chokepoint[] = [
  {
    id: "cp-suez",
    name: "Suez Canal / Bab el-Mandeb",
    lat: 30.58,
    lon: 32.57,
    dailyCallsNormal: 72,
    dailyCallsCurrent: 24,
    status: "disrupted",
    capacityNote: "Traffic diverted via Cape of Good Hope due to Red Sea regional maritime security risks.",
    alternatives: ["Cape of Good Hope (+10-14 days transit)"]
  },
  {
    id: "cp-panama",
    name: "Panama Canal",
    lat: 9.08,
    lon: -79.68,
    dailyCallsNormal: 36,
    dailyCallsCurrent: 32,
    status: "congested",
    capacityNote: "Draft restrictions stabilizing following reservoir replenishment; booking auction premiums elevated.",
    alternatives: ["Magellan Strait", "US Intermodal Rail Bridge"]
  },
  {
    id: "cp-malacca",
    name: "Strait of Malacca",
    lat: 2.50,
    lon: 101.50,
    dailyCallsNormal: 240,
    dailyCallsCurrent: 248,
    status: "normal",
    capacityNote: "High density commercial corridor operating under normal oceanic draft.",
    alternatives: ["Sunda Strait", "Lombok Strait"]
  },
  {
    id: "cp-hormuz",
    name: "Strait of Hormuz",
    lat: 26.56,
    lon: 56.25,
    dailyCallsNormal: 85,
    dailyCallsCurrent: 82,
    status: "normal",
    capacityNote: "Hydrocarbon tanker corridor operating under heightened naval escort advisory.",
    alternatives: ["Petroline (East-West Pipeline)", "Habshan-Fujairah Pipeline"]
  }
];

export const FALLBACK_RATES: RateObservation[] = [
  {
    id: "rate-drewry-wci-sep17",
    sourceId: "drewry",
    indexId: "wci-composite",
    indexName: "Drewry World Container Index",
    value: 4500,
    quoteType: "usd_per_feu",
    basis: "spot",
    currency: "USD",
    asOfDate: "2026-09-17",
    publishedAt: "2026-09-17T14:00:00Z",
    documentUrl: "https://www.drewry.co.uk/",
    isSeed: true
  },
  {
    id: "rate-drewry-wci-sep03",
    sourceId: "drewry",
    indexId: "wci-composite",
    indexName: "Drewry World Container Index",
    value: 4465,
    quoteType: "usd_per_feu",
    basis: "spot",
    currency: "USD",
    asOfDate: "2026-09-03",
    publishedAt: "2026-09-03T14:00:00Z",
    documentUrl: "https://www.drewry.co.uk/",
    isSeed: true
  },
  {
    id: "rate-bdi-sep18",
    sourceId: "baltic-exchange",
    indexId: "bdi",
    indexName: "Baltic Dry Index (BDI)",
    value: 3370,
    quoteType: "index_level",
    basis: "composite",
    currency: undefined,
    asOfDate: "2026-09-18",
    publishedAt: "2026-09-18T16:00:00Z",
    documentUrl: "https://www.balticexchange.com/",
    isSeed: true
  },
  {
    id: "rate-fbx-sep18",
    sourceId: "freightos",
    indexId: "fbx-global",
    indexName: "Freightos Baltic Index (FBX)",
    value: 3407.40,
    quoteType: "usd_per_feu",
    basis: "spot",
    currency: "USD",
    asOfDate: "2026-09-18",
    publishedAt: "2026-09-18T18:00:00Z",
    documentUrl: "https://www.freightos.com/",
    isSeed: true
  }
];

export const FALLBACK_TRANSIT_STATS: TransitStat[] = [
  {
    id: "ts-suez-2026-09-18",
    chokepointId: "cp-suez",
    chokepointName: "Suez Canal",
    sourceId: "imf-portwatch",
    date: "2026-09-18",
    transitCalls: 24,
    tradeVolumeTonnes: 1420000,
    tradeVolumeTeu: 110000,
    direction: "bidirectional"
  },
  {
    id: "ts-panama-2026-09-18",
    chokepointId: "cp-panama",
    chokepointName: "Panama Canal",
    sourceId: "imf-portwatch",
    date: "2026-09-18",
    transitCalls: 32,
    tradeVolumeTonnes: 1180000,
    tradeVolumeTeu: 82000,
    direction: "bidirectional"
  }
];

export const FALLBACK_PORT_STATS: PortStat[] = [
  {
    id: "port-la",
    portId: "us-lax",
    portName: "Port of Los Angeles",
    country: "United States",
    period: "2026-08",
    vesselsAtAnchor: 6,
    avgWaitHours: 42.5,
    throughputTeu: 960597
  },
  {
    id: "port-rotterdam",
    portId: "nl-rtm",
    portName: "Port of Rotterdam",
    country: "Netherlands",
    period: "2026-08",
    vesselsAtAnchor: 4,
    avgWaitHours: 28.0,
    throughputTeu: 1120000
  }
];

export const FALLBACK_DISRUPTIONS: DisruptionEvent[] = [
  {
    id: "dis-cape-reroute",
    chokepointId: "cp-suez",
    chokepointName: "Suez Canal / Red Sea",
    region: "Red Sea & Gulf of Aden",
    kind: "rerouting",
    startedAt: "2023-12-15T00:00:00Z",
    summary: "Commercial container fleet rerouting around Cape of Good Hope (+74% transit volume increase around South Africa).",
    documentUrl: "https://portwatch.imf.org/"
  },
  {
    id: "dis-panama-draft",
    chokepointId: "cp-panama",
    chokepointName: "Panama Canal",
    region: "Central America",
    kind: "canal_draft",
    startedAt: "2026-06-01T00:00:00Z",
    summary: "Panama Canal Authority maximum authorized draft set at 48 feet in Neopanamax locks following rainy season recovery.",
    documentUrl: "https://pancanal.com/en/"
  }
];

export const FREIGHTLINE_SOURCES = [
  { id: "imf-portwatch", name: "IMF PortWatch Daily Chokepoints", tier: "A", kind: "api", url: "https://portwatch.imf.org/", cadence: "daily", enabled: true, licenceNote: "IMF Data License (August 2026 Methodology Revision Noted)" },
  { id: "unctad-lsci", name: "UNCTAD Liner Shipping Connectivity", tier: "A", kind: "api", url: "https://unctadstat.unctad.org/", cadence: "quarterly", enabled: true, licenceNote: "UN Open Data" },
  { id: "baltic-exchange", name: "Baltic Exchange (BDI)", tier: "B", kind: "html", url: "https://www.balticexchange.com/", cadence: "daily", enabled: true, licenceNote: "Headline Quoted Only (Attributed License)" },
  { id: "drewry", name: "Drewry World Container Index", tier: "B", kind: "html", url: "https://www.drewry.co.uk/", cadence: "weekly", enabled: true, licenceNote: "Headline Quoted Only (Attributed)" },
  { id: "freightos", name: "Freightos Baltic Index (FBX)", tier: "B", kind: "html", url: "https://www.freightos.com/", cadence: "weekly", enabled: true, licenceNote: "Public Index Level" },
  { id: "panama-canal", name: "Panama Canal Authority (ACP)", tier: "A", kind: "html", url: "https://pancanal.com/en/", cadence: "daily", enabled: true, licenceNote: "Official Canal Authority" },
  { id: "suez-canal", name: "Suez Canal Authority (SCA)", tier: "A", kind: "html", url: "https://www.suezcanal.gov.eg/", cadence: "daily", enabled: true, licenceNote: "Official Canal Authority" },
  { id: "port-la", name: "Port of Los Angeles Operations", tier: "A", kind: "html", url: "https://www.portoflosangeles.org/", cadence: "monthly", enabled: true, licenceNote: "Municipal Open Data" },
  { id: "port-rotterdam", name: "Port of Rotterdam Throughput", tier: "A", kind: "html", url: "https://www.portofrotterdam.com/", cadence: "monthly", enabled: true, licenceNote: "Port Authority Stats" },
  { id: "eurostat-comext", name: "Eurostat COMEXT Maritime Trade", tier: "A", kind: "api", url: "https://ec.europa.eu/eurostat/api/dissemination/", cadence: "monthly", enabled: true, licenceNote: "EU Data Policy" },
  { id: "imo", name: "International Maritime Organization Notices", tier: "A", kind: "rss", url: "https://www.imo.org/", cadence: "event", enabled: true, licenceNote: "UN Agency Notice" },
  { id: "gcaptain", name: "gCaptain Maritime Intel", tier: "C", kind: "rss", url: "https://gcaptain.com/feed/", cadence: "realtime", enabled: true, licenceNote: "Editorial Context Only" }
];
