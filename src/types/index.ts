export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type AlertSeverity = 'advisory' | 'watch' | 'warning' | 'critical';

export interface WindVector {
  speedKmh: number;
  direction: string;
  degrees: number;
}

export interface ContributingFactor {
  name: string;
  percentage: number;
  description: string;
}

export interface HotspotEvidence {
  citizenReportsCount: number;
  satelliteThermalAnomaly: string;
  groundSensorPm25: number;
  meteorologicalFactor: string;
  historicalCorrelationPct: number;
}

export interface PollutionHotspot {
  id: string;
  name: string;
  country: 'India' | 'China' | 'Brazil' | 'Russia' | 'South Africa';
  city: string;
  lat: number;
  lng: number;
  riskLevel: RiskLevel;
  primaryPollutant: 'PM2.5' | 'PM10' | 'NO2' | 'SO2' | 'CO' | 'O3';
  pollutantValue: number;
  probableSource: string;
  aiConfidence: number;
  firstDetected: string;
  estimatedAreaKm2: number;
  windVector: WindVector;
  predictedImpact: string;
  contributingFactors: ContributingFactor[];
  evidence: HotspotEvidence;
  aiExplanation: string;
}

export interface EconomicCorridor {
  id: string;
  name: string;
  country: string;
  originCity: string;
  targetCity: string;
  currentRisk: RiskLevel;
  forecast6hRisk: RiskLevel;
  primaryDriver: string;
  citiesAffected: string[];
  distanceKm: number;
  estimatedTransitHours: number;
  trend: 'worsening' | 'improving' | 'stable';
  coordinates: [number, number][];
  activeAlertBadge?: string;
}

export type CitizenCategory =
  | 'Smoke'
  | 'Industrial emission'
  | 'Crop burning'
  | 'Dust'
  | 'Chemical smell'
  | 'Vehicle pollution'
  | 'Fire'
  | 'Unknown';

export interface AIVisionAnalysis {
  visualIndicators: string[];
  potentialClassification: string;
  confidence: number;
  environmentalRelevance: string;
  recommendedAction: string;
  modelIdentifier: string;
  verifiedStatus: 'unverified' | 'ai_verified' | 'authority_confirmed';
}

export interface CitizenReport {
  id: string;
  timestamp: string;
  submitterAlias: string;
  country: string;
  city: string;
  locationName: string;
  lat: number;
  lng: number;
  category: CitizenCategory;
  description: string;
  imageUrl?: string;
  sensorReading?: {
    pm25?: number;
    aqi?: number;
    deviceModel?: string;
  };
  aiVisionAnalysis?: AIVisionAnalysis;
  crossValidated: boolean;
}

export interface TransBoundaryPlume {
  id: string;
  originRegion: string;
  originCountry: string;
  targetRegion: string;
  targetCountry: string;
  windVector: WindVector;
  estimatedDistanceKm: number;
  estimatedArrivalHours: string;
  affectedCities: string[];
  confidencePct: number;
  status: 'In Transit' | 'Impacting' | 'Dissipating';
  activeAlertTitle: string;
  pathCoordinates: [number, number][];
}

export interface ClimateAlert {
  id: string;
  severity: AlertSeverity;
  region: string;
  country: string;
  title: string;
  trigger: string;
  expectedImpact: string;
  confidence: number;
  recommendedAction: string;
  responsibleAuthority: string;
  timestamp: string;
  isAcknowledged: boolean;
  status: 'active' | 'investigating' | 'acknowledged' | 'resolved';
}

export interface AuthorityActionTimeline {
  time: string;
  event: string;
  actor: string;
}

export interface AuthorityIncident {
  id: string;
  hotspotId: string;
  title: string;
  location: string;
  country: string;
  riskLevel: RiskLevel;
  affectedPopulation: string;
  sourceProbability: string;
  recommendedResponse: string;
  status: 'Pending' | 'Verified' | 'Inspection Dispatched' | 'Advisory Issued' | 'Coordinated' | 'Resolved';
  timeline: AuthorityActionTimeline[];
}

export interface FederatedNode {
  id: string;
  country: 'India' | 'China' | 'Brazil' | 'Russia' | 'South Africa';
  flag: string;
  nodeName: string;
  datacenterRegion: string;
  status: 'Online & Synced' | 'Training Local Epochs' | 'Aggregating Weights';
  localSamples: string;
  modelVersion: string;
  parameterDeltaNorm: number;
  differentialPrivacyEpsilon: number;
  latencyMs: number;
  lastSync: string;
}

export interface FederatedTrainingRound {
  roundNumber: number;
  date: string;
  participatingCountries: string[];
  globalAccuracyPct: number;
  improvementPct: number;
  lossMetric: number;
  aggregationMethod: string;
}

export interface CityMetric {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  temperatureC: number;
  humidityPct: number;
  windSpeedKmh: number;
  windDirection: string;
  dominantSource: string;
  isLiveApi: boolean;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
}

export interface ForecastPoint {
  timeOffset: string;
  timeLabel: string;
  aqi: number;
  pm25: number;
  pm10: number;
  confidence: number;
  lowerAqiCi: number;
  upperAqiCi: number;
  riskCategory: RiskLevel;
}

export interface FusionWeights {
  citizenReports: number;
  satelliteSignal: number;
  groundSensors: number;
  meteorology: number;
}
