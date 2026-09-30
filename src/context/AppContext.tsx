import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CityMetric,
  PollutionHotspot,
  EconomicCorridor,
  CitizenReport,
  ClimateAlert,
  AuthorityIncident,
  FederatedNode,
  FederatedTrainingRound,
  TransBoundaryPlume,
  FusionWeights
} from '../types';
import {
  BRICS_CITIES,
  MOCK_HOTSPOTS,
  MOCK_CORRIDORS,
  MOCK_TRANS_BOUNDARY,
  INITIAL_CITIZEN_REPORTS,
  INITIAL_CLIMATE_ALERTS,
  INITIAL_AUTHORITY_INCIDENTS,
  FEDERATED_NODES,
  FEDERATED_ROUNDS,
  INITIAL_FUSION_WEIGHTS
} from '../data/mockData';

export type ActiveTab =
  | 'landing'
  | 'overview'
  | 'hotspots'
  | 'forecast'
  | 'corridors'
  | 'citizens'
  | 'alerts'
  | 'federated'
  | 'authority'
  | 'data-models';

export interface MapLayerState {
  aqi: boolean;
  pm25: boolean;
  pm10: boolean;
  industrial: boolean;
  agricultural: boolean;
  citizenReports: boolean;
  satellite: boolean;
  windVectors: boolean;
  pollutionMovement: boolean;
  predictedHotspots: boolean;
  crossBorderPlume: boolean;
  climateRisk: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aero-ai';
  text: string;
  timestamp: string;
  citations?: string[];
  suggestedQuestions?: string[];
}

export interface JudgeDemoStep {
  step: number;
  title: string;
  description: string;
  highlightTab: ActiveTab;
  systemAction: string;
  evidenceCallout: string;
}

export const JUDGE_DEMO_STEPS: JudgeDemoStep[] = [
  {
    step: 1,
    title: 'Citizen Uploads Smoke Report',
    description: 'An observer near the Punjab-Haryana border uploads a photo of dense orange smoke and records PM2.5 of 194 µg/m³.',
    highlightTab: 'citizens',
    systemAction: 'In-browser tensor preprocessing receives photographic evidence & geotag.',
    evidenceCallout: 'Citizen Air Watch: Report #REP-8812 ingested with geolocated timestamp.'
  },
  {
    step: 2,
    title: 'AI Computer Vision Detection',
    description: 'AeroVision analyzes optical characteristics and classifies "Potential source: Agricultural biomass burning" with 89% confidence.',
    highlightTab: 'citizens',
    systemAction: 'Inference model distinguishes combustion smoke from cloud reflection and industrial dust.',
    evidenceCallout: 'Visual indicators: Low-altitude smoke plume, biomass ash discoloration, horizontal wind shear.'
  },
  {
    step: 3,
    title: 'Nearby Ground Sensors Corroborate Surge',
    description: 'Local ground monitors register a sharp upward delta of +112 µg/m³ PM2.5 in under 90 minutes.',
    highlightTab: 'overview',
    systemAction: 'Multi-station telemetry spatial gradient analysis flags anomalous rate of change.',
    evidenceCallout: 'Station telemetry: Rural monitor grid confirms particulate boundary breach.'
  },
  {
    step: 4,
    title: 'Satellite Orbital Thermal Anomaly Flagged',
    description: 'Copernicus Sentinel-5P and MODIS infrared channels confirm a 4.2 MW/km² thermal radiative fire cluster.',
    highlightTab: 'hotspots',
    systemAction: 'Thermal anomaly pixel cluster matched with geographic coordinates.',
    evidenceCallout: 'Satellite verification: MODIS Fire Pixel Cluster #9914 (Confidence: 94%).'
  },
  {
    step: 5,
    title: 'Wind Vector Predicts Advection Trajectory',
    description: 'Synoptic weather grid shows sustained 24 km/h NW → SE winds with a shallow 45m thermal inversion lid.',
    highlightTab: 'corridors',
    systemAction: 'Atmospheric Lagrangian trajectory solver projects particulate transport vector.',
    evidenceCallout: 'Meteorological feed: NW wind advects plume directly downwind towards Delhi NCR basin.'
  },
  {
    step: 6,
    title: 'Cross-Border Plume Trajectory Model Active',
    description: 'Trans-boundary transport model calculates 320 km travel distance with arrival window of 4.5 to 6.0 hours.',
    highlightTab: 'overview',
    systemAction: 'Regional airshed model predicts downwind plume dispersion and arrival ETA.',
    evidenceCallout: 'Trans-Boundary Tracker: Plume #PLUME-IND-PAK-01 approaching Delhi NCR.'
  },
  {
    step: 7,
    title: 'Economic Corridor Risk Escalation',
    description: 'Delhi NCR → Agra Industrial Belt corridor forecast escalates from MODERATE to CRITICAL.',
    highlightTab: 'corridors',
    systemAction: 'Corridor risk index dynamically updated across 6 metropolitan waypoints.',
    evidenceCallout: 'Corridor Monitor: 6 cities and 28.5 million residents in projected trajectory path.'
  },
  {
    step: 8,
    title: 'AI Multi-Horizon Forecast Predicts Peak',
    description: 'Forecast engine predicts Delhi AQI will peak at 378 (PM2.5: 236 µg/m³) between 18:00 and 22:00.',
    highlightTab: 'forecast',
    systemAction: 'Ensemble neural forecaster outputs 84% confidence with probabilistic confidence intervals.',
    evidenceCallout: 'AI Forecast: Peak arrival expected in 6 hours with +94 AQI jump over baseline.'
  },
  {
    step: 9,
    title: 'Automated Early Warning Dispatched',
    description: 'AI Early Warning System issues CRITICAL alert to CPCB and CAQM command centers.',
    highlightTab: 'alerts',
    systemAction: 'Machine-actionable alert payload formatted according to open interoperability schema.',
    evidenceCallout: 'Alert Engine: Alert #ALT-IN-2026-004 dispatched with recommended mitigation actions.'
  },
  {
    step: 10,
    title: 'Human-in-the-Loop Authority Verification',
    description: 'Duty Officer verifies the evidence chain, initiates mobile mist-cannons, and dispatches inspection drones.',
    highlightTab: 'authority',
    systemAction: 'Incident logged with full audit timeline from detection to mitigation.',
    evidenceCallout: 'Authority Response Center: Stage-IV GRAP enforcement authorized and logged.'
  }
];

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedCity: CityMetric;
  setSelectedCity: (city: CityMetric) => void;
  mapLayers: MapLayerState;
  toggleMapLayer: (layerKey: keyof MapLayerState) => void;
  fusionWeights: FusionWeights;
  setFusionWeights: React.Dispatch<React.SetStateAction<FusionWeights>>;
  hotspots: PollutionHotspot[];
  selectedHotspot: PollutionHotspot | null;
  setSelectedHotspot: (hotspot: PollutionHotspot | null) => void;
  corridors: EconomicCorridor[];
  transBoundary: TransBoundaryPlume;
  citizenReports: CitizenReport[];
  addCitizenReport: (report: CitizenReport) => void;
  alerts: ClimateAlert[];
  acknowledgeAlert: (alertId: string) => void;
  authorityIncidents: AuthorityIncident[];
  updateIncidentStatus: (incidentId: string, newStatus: AuthorityIncident['status']) => void;
  federatedNodes: FederatedNode[];
  federatedRounds: FederatedTrainingRound[];
  // Judge Demo
  isJudgeDemoActive: boolean;
  currentDemoStep: number;
  startJudgeDemo: () => void;
  stopJudgeDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  // AI Assistant
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (question: string) => void;
  // Simulation vs Live
  isLiveApiConnected: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [selectedCountry, setSelectedCountry] = useState<string>('All BRICS');
  const [selectedCity, setSelectedCity] = useState<CityMetric>(BRICS_CITIES[0]); // Delhi NCR
  const [selectedHotspot, setSelectedHotspot] = useState<PollutionHotspot | null>(MOCK_HOTSPOTS[0]);
  const [hotspots] = useState<PollutionHotspot[]>(MOCK_HOTSPOTS);
  const [corridors] = useState<EconomicCorridor[]>(MOCK_CORRIDORS);
  const [transBoundary] = useState<TransBoundaryPlume>(MOCK_TRANS_BOUNDARY);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(INITIAL_CITIZEN_REPORTS);
  const [alerts, setAlerts] = useState<ClimateAlert[]>(INITIAL_CLIMATE_ALERTS);
  const [authorityIncidents, setAuthorityIncidents] = useState<AuthorityIncident[]>(INITIAL_AUTHORITY_INCIDENTS);
  const [federatedNodes] = useState<FederatedNode[]>(FEDERATED_NODES);
  const [federatedRounds] = useState<FederatedTrainingRound[]>(FEDERATED_ROUNDS);
  const [fusionWeights, setFusionWeights] = useState<FusionWeights>(INITIAL_FUSION_WEIGHTS);

  // Map layer controls
  const [mapLayers, setMapLayers] = useState<MapLayerState>({
    aqi: true,
    pm25: true,
    pm10: false,
    industrial: true,
    agricultural: true,
    citizenReports: true,
    satellite: true,
    windVectors: true,
    pollutionMovement: true,
    predictedHotspots: true,
    crossBorderPlume: true,
    climateRisk: true
  });

  const toggleMapLayer = (layerKey: keyof MapLayerState) => {
    setMapLayers(prev => ({ ...prev, [layerKey]: !prev [layerKey] }));
  };

  const addCitizenReport = (report: CitizenReport) => {
    setCitizenReports(prev => [report, ...prev]);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, isAcknowledged: true, status: 'acknowledged' } : a))
    );
  };

  const updateIncidentStatus = (incidentId: string, newStatus: AuthorityIncident['status']) => {
    setAuthorityIncidents(prev =>
      prev.map(inc => {
        if (inc.id === incidentId) {
          const newTimelineEntry = {
            time: 'Just now (' + new Date().toTimeString().slice(0, 5) + ' UTC)',
            event: `Authority status updated to ${newStatus}`,
            actor: 'Authorized Duty Officer (Console)'
          };
          return {
            ...inc,
            status: newStatus,
            timeline: [...inc.timeline, newTimelineEntry]
          };
        }
        return inc;
      })
    );
  };

  // Judge Demo State
  const [isJudgeDemoActive, setIsJudgeDemoActive] = useState<boolean>(false);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);

  const startJudgeDemo = () => {
    setIsJudgeDemoActive(true);
    setCurrentDemoStep(1);
    setActiveTab(JUDGE_DEMO_STEPS[0].highlightTab);
  };

  const stopJudgeDemo = () => {
    setIsJudgeDemoActive(false);
  };

  const nextDemoStep = () => {
    if (currentDemoStep < JUDGE_DEMO_STEPS.length) {
      const nextStepNum = currentDemoStep + 1;
      setCurrentDemoStep(nextStepNum);
      const nextStepObj = JUDGE_DEMO_STEPS[nextStepNum - 1];
      if (nextStepObj) {
        setActiveTab(nextStepObj.highlightTab);
      }
    } else {
      setIsJudgeDemoActive(false);
    }
  };

  const prevDemoStep = () => {
    if (currentDemoStep > 1) {
      const prevStepNum = currentDemoStep - 1;
      setCurrentDemoStep(prevStepNum);
      const prevStepObj = JUDGE_DEMO_STEPS[prevStepNum - 1];
      if (prevStepObj) {
        setActiveTab(prevStepObj.highlightTab);
      }
    }
  };

  // AI Chatbot State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'aero-ai',
      text: "Hello! I am AeroAI, your federated climate intelligence assistant. I analyze synchronized telemetry from citizen observations, satellite orbits, ground monitors, and atmospheric transport vectors across BRICS regions. What would you like to investigate today?",
      timestamp: 'Just now',
      suggestedQuestions: [
        "What is causing today's pollution spike in Delhi NCR?",
        "Where is the pollution plume originating and moving?",
        "Which areas may be affected in the next 6 hours?",
        "Why did the AI risk level increase to HIGH?",
        "What should local authorities do right now?",
        "Explain hotspot #BRICS-042"
      ]
    }
  ]);

  const sendChatMessage = (question: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toTimeString().slice(0, 5)
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = '';
      let citations: string[] = [];

      const q = question.toLowerCase();
      if (q.includes('spike') || q.includes('delhi') || q.includes('causing')) {
        reply = `Today's elevated pollution in Delhi NCR is driven by an upwind agricultural biomass burning cluster in the Punjab-Haryana corridor, funneled by a sustained 24 km/h North-Westerly wind advection vector.

Contributing factors verified by our data fusion engine:
• Wind alignment towards Delhi basin (+32% risk factor)
• Upwind citizen fire reports & ground photographs (+24%)
• MODIS/Sentinel-5P radiative fire thermal pixel anomaly (+18%)
• Nocturnal thermal inversion trapping particulate mass (+15%)
• Ground telemetry surge (+11% delta)`;
        citations = [
          'Sentinel-5P Thermal Radiative Cluster #9914',
          'Citizen Air Watch Report #REP-8812 (Karnal Bypass)',
          'CPCB Rural Reference Sensor Grid (Delta: +112 µg/m³)',
          'Synoptic Wind Vector: NW 24 km/h'
        ];
      } else if (q.includes('originating') || q.includes('moving') || q.includes('where')) {
        reply = `The pollution plume is originating from Hotspot #BRICS-042 located along the North-West agricultural belt (lat 29.35°N, lng 76.58°E).

Atmospheric Transport Analysis:
• Movement vector: North-West → South-East (135° bearing)
• Transport velocity: ~24 km/h
• Estimated trajectory distance: 320 km
• Current position: Approaching Panipat-Sonipat corridor
• Projected metropolitan entry: Delhi NCR airshed within 3.5 to 5 hours.`;
        citations = [
          'Lagrangian Atmospheric Particle Trajectory Solver',
          'Regional Airshed Wind Convergence Model',
          'Economic Corridor Monitor (Delhi-Agra Axis)'
        ];
      } else if (q.includes('next') || q.includes('affected') || q.includes('6 hours')) {
        reply = `Downwind impact projections for the next 6 hours:
1. Panipat & Sonipat (Next 1–2 hours): Severe PM2.5 surge (expected 180–220 µg/m³)
2. North & West Delhi (Next 3–4 hours): AQI rising into 'Critical' category (>330)
3. Central Delhi, Gurugram, & Noida (Next 5–6 hours): Peak particulate concentration expected between 18:00 and 22:00 UTC (AQI 378).

Vulnerable populations along the National Highway 44 corridor should minimize strenuous outdoor activity.`;
        citations = [
          'AeroLink Multi-Horizon Neural Forecaster (+6h Horizon)',
          'City Airshed Inversion Depth Estimator',
          'CAQM Early Warning Trigger Matrix'
        ];
      } else if (q.includes('why') || q.includes('increase') || q.includes('risk')) {
        reply = `Risk increased from MODERATE to HIGH/CRITICAL because multiple independent environmental signals reached simultaneous threshold breaches:

1. Citizen Signal: 28 localized visual smoke and odor reports logged within 90 minutes.
2. Ground Monitors: Consecutive hourly PM2.5 readings leaped from 56 µg/m³ to 168 µg/m³.
3. Remote Sensing: Satellite infrared channels confirmed 4.2 MW/km² thermal radiative power.
4. Meteorology: Atmospheric boundary layer height dropped below 50 meters, eliminating vertical dispersion.`;
        citations = [
          'Copernicus Sentinel-5P Cloud-Screened AOD',
          'Four-Stream Multi-Source Fusion Engine',
          'AI Explainability Attribution Metric'
        ];
      } else if (q.includes('authority') || q.includes('do') || q.includes('action')) {
        reply = `Recommended immediate actions for local authorities:
• Verify Hotspot: Review citizen photographic verification and orbital thermal footprint.
• Enforce Stage-IV GRAP: Impose strict bans on non-essential heavy diesel truck transit into Delhi NCR.
• Mobile Mitigation: Dispatch mist cannons and anti-smog guns to high-traffic arterial junctions.
• Upwind Coordination: Send automated cross-district notification to Punjab & Haryana state pollution control boards to dispatch field enforcement teams to reported coordinates.
• Public Advisory: Issue high-particulate health warnings for schools, elderly, and respiratory patients.`;
        citations = [
          'Authority Response Center Playbook (GRAP-IV)',
          'Commission for Air Quality Management (CAQM) Directives',
          'Open Climate Interoperability Protocol v1.0'
        ];
      } else {
        reply = `Hotspot #BRICS-042 is an AI-detected high-risk pollution origin in the Indo-Gangetic border airshed.

Key Metadata:
• Status: High Risk (AI Confidence: 91%)
• Probable Source: Agricultural Biomass Burning
• Estimated Affected Footprint: ~340 km²
• Wind Vector: 24 km/h NW → SE
• Multi-Source Evidence: 28 citizen observations + Sentinel-5P infrared cluster + 168 µg/m³ ground sensor calibration.

This hotspot is currently feeding into the Delhi NCR Economic Corridor.`;
        citations = [
          'AeroLink Hotspot Registry #BRICS-042',
          'Multi-Sensor Fusion Score (88.4 / 100)',
          'Federated Edge Model CPCB-Node-v3.2'
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'aero-ai',
        text: reply,
        timestamp: new Date().toTimeString().slice(0, 5),
        citations
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  const isLiveApiConnected = Boolean(
    import.meta.env.VITE_OPENAQ_API_KEY ||
    import.meta.env.VITE_OPENWEATHER_API_KEY ||
    import.meta.env.VITE_SENTINEL_HUB_CLIENT_ID
  );

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCountry,
        setSelectedCountry,
        selectedCity,
        setSelectedCity,
        mapLayers,
        toggleMapLayer,
        fusionWeights,
        setFusionWeights,
        hotspots,
        selectedHotspot,
        setSelectedHotspot,
        corridors,
        transBoundary,
        citizenReports,
        addCitizenReport,
        alerts,
        acknowledgeAlert,
        authorityIncidents,
        updateIncidentStatus,
        federatedNodes,
        federatedRounds,
        isJudgeDemoActive,
        currentDemoStep,
        startJudgeDemo,
        stopJudgeDemo,
        nextDemoStep,
        prevDemoStep,
        isChatOpen,
        setIsChatOpen,
        chatMessages,
        sendChatMessage,
        isLiveApiConnected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
