import {
  PollutionHotspot,
  EconomicCorridor,
  CitizenReport,
  TransBoundaryPlume,
  ClimateAlert,
  AuthorityIncident,
  FederatedNode,
  FederatedTrainingRound,
  CityMetric,
  ForecastPoint,
  FusionWeights
} from '../types';

export const INITIAL_FUSION_WEIGHTS: FusionWeights = {
  citizenReports: 20,
  satelliteSignal: 30,
  groundSensors: 25,
  meteorology: 25,
};

export const BRICS_CITIES: CityMetric[] = [
  // India
  {
    id: 'delhi',
    name: 'Delhi NCR',
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    aqi: 284,
    pm25: 168.4,
    pm10: 245.0,
    no2: 54.2,
    temperatureC: 29.5,
    humidityPct: 62,
    windSpeedKmh: 14.2,
    windDirection: 'NW',
    dominantSource: 'Upwind Biomass Burning + Urban Mobile',
    isLiveApi: false,
    status: 'Hazardous'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    lat: 19.0760,
    lng: 72.8777,
    aqi: 138,
    pm25: 52.8,
    pm10: 98.2,
    no2: 38.0,
    temperatureC: 31.0,
    humidityPct: 78,
    windSpeedKmh: 18.0,
    windDirection: 'WSW',
    dominantSource: 'Coastal Inversion + Port Freight',
    isLiveApi: false,
    status: 'Moderate'
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    country: 'India',
    lat: 22.5726,
    lng: 88.3639,
    aqi: 172,
    pm25: 86.5,
    pm10: 142.1,
    no2: 44.5,
    temperatureC: 30.2,
    humidityPct: 74,
    windSpeedKmh: 9.5,
    windDirection: 'NE',
    dominantSource: 'Industrial Outskirts & Brick Kilns',
    isLiveApi: false,
    status: 'Unhealthy'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    country: 'India',
    lat: 12.9716,
    lng: 77.5946,
    aqi: 68,
    pm25: 22.4,
    pm10: 48.0,
    no2: 24.1,
    temperatureC: 26.0,
    humidityPct: 58,
    windSpeedKmh: 12.0,
    windDirection: 'SE',
    dominantSource: 'Vehicular Congestion Corridor',
    isLiveApi: false,
    status: 'Moderate'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    country: 'India',
    lat: 13.0827,
    lng: 80.2707,
    aqi: 82,
    pm25: 28.6,
    pm10: 62.4,
    no2: 29.8,
    temperatureC: 32.5,
    humidityPct: 81,
    windSpeedKmh: 16.5,
    windDirection: 'ENE',
    dominantSource: 'Maritime Port Emissions + Dust',
    isLiveApi: false,
    status: 'Moderate'
  },

  // China
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    lat: 39.9042,
    lng: 116.4074,
    aqi: 156,
    pm25: 72.1,
    pm10: 118.0,
    no2: 42.0,
    temperatureC: 18.2,
    humidityPct: 45,
    windSpeedKmh: 11.0,
    windDirection: 'SSW',
    dominantSource: 'Hebei Industrial Corridor Inflow',
    isLiveApi: false,
    status: 'Unhealthy'
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    country: 'China',
    lat: 31.2304,
    lng: 121.4737,
    aqi: 94,
    pm25: 34.0,
    pm10: 68.5,
    no2: 36.2,
    temperatureC: 22.4,
    humidityPct: 69,
    windSpeedKmh: 15.2,
    windDirection: 'E',
    dominantSource: 'Yangtze River Delta Logistics',
    isLiveApi: false,
    status: 'Moderate'
  },
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    country: 'China',
    lat: 23.1291,
    lng: 113.2644,
    aqi: 78,
    pm25: 26.5,
    pm10: 54.0,
    no2: 31.0,
    temperatureC: 27.8,
    humidityPct: 75,
    windSpeedKmh: 10.4,
    windDirection: 'S',
    dominantSource: 'Pearl River Delta Manufacturing',
    isLiveApi: false,
    status: 'Moderate'
  },

  // Brazil
  {
    id: 'sao-paulo',
    name: 'São Paulo',
    country: 'Brazil',
    lat: -23.5505,
    lng: -46.6333,
    aqi: 142,
    pm25: 58.2,
    pm10: 92.0,
    no2: 41.5,
    temperatureC: 24.1,
    humidityPct: 64,
    windSpeedKmh: 13.0,
    windDirection: 'NW',
    dominantSource: 'Cubatão Chemical & Fleet Inversion',
    isLiveApi: false,
    status: 'Moderate'
  },
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    lat: -22.9068,
    lng: -43.1729,
    aqi: 72,
    pm25: 24.0,
    pm10: 51.0,
    no2: 27.0,
    temperatureC: 28.0,
    humidityPct: 70,
    windSpeedKmh: 16.0,
    windDirection: 'SSE',
    dominantSource: 'Metropolitan Beltway Congestion',
    isLiveApi: false,
    status: 'Moderate'
  },

  // Russia
  {
    id: 'moscow',
    name: 'Moscow',
    country: 'Russia',
    lat: 55.7558,
    lng: 37.6173,
    aqi: 64,
    pm25: 21.0,
    pm10: 44.0,
    no2: 32.0,
    temperatureC: 11.5,
    humidityPct: 60,
    windSpeedKmh: 14.5,
    windDirection: 'WNW',
    dominantSource: 'Thermal District Heating & Transit',
    isLiveApi: false,
    status: 'Moderate'
  },
  {
    id: 'saint-petersburg',
    name: 'Saint Petersburg',
    country: 'Russia',
    lat: 59.9343,
    lng: 30.3351,
    aqi: 48,
    pm25: 14.2,
    pm10: 31.0,
    no2: 21.5,
    temperatureC: 9.8,
    humidityPct: 68,
    windSpeedKmh: 20.0,
    windDirection: 'SW',
    dominantSource: 'Gulf of Finland Marine Shipping',
    isLiveApi: false,
    status: 'Good'
  },

  // South Africa
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    country: 'South Africa',
    lat: -26.2041,
    lng: 28.0473,
    aqi: 164,
    pm25: 78.4,
    pm10: 132.0,
    no2: 48.0,
    temperatureC: 22.0,
    humidityPct: 40,
    windSpeedKmh: 17.5,
    windDirection: 'ENE',
    dominantSource: 'Mpumalanga Coal Fleet Trans-boundary',
    isLiveApi: false,
    status: 'Unhealthy'
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    lat: -33.9249,
    lng: 18.4241,
    aqi: 42,
    pm25: 11.0,
    pm10: 26.0,
    no2: 18.0,
    temperatureC: 19.5,
    humidityPct: 65,
    windSpeedKmh: 24.0,
    windDirection: 'SE',
    dominantSource: 'Atlantic Maritime Inflow',
    isLiveApi: false,
    status: 'Good'
  }
];

export const MOCK_HOTSPOTS: PollutionHotspot[] = [
  {
    id: 'BRICS-042',
    name: 'Indo-Gangetic North Boundary #042',
    country: 'India',
    city: 'Delhi NCR',
    lat: 29.3540,
    lng: 76.5820,
    riskLevel: 'HIGH',
    primaryPollutant: 'PM2.5',
    pollutantValue: 168,
    probableSource: 'Agricultural Biomass Burning',
    aiConfidence: 91,
    firstDetected: '2 hours ago (10:14 UTC)',
    estimatedAreaKm2: 340,
    windVector: {
      speedKmh: 24,
      direction: 'NW → SE',
      degrees: 135
    },
    predictedImpact: 'Delhi NCR & Panipat Industrial Corridor within 3-5 hours',
    contributingFactors: [
      { name: 'Wind vector alignment with Delhi', percentage: 32, description: 'Sustained 24 km/h NW wind straight towards urban basin' },
      { name: 'Upwind fire reports & citizen photos', percentage: 24, description: '19 localized citizen alerts verified in Punjab-Haryana belt' },
      { name: 'Satellite thermal anomaly (Sentinel-5P / MODIS)', percentage: 18, description: 'Radiative fire power index spiked to 4.2 MW/km²' },
      { name: 'Seasonal inversion history', percentage: 15, description: 'Shallow nocturnal boundary layer traps particulate mass' },
      { name: 'Ground sensor gradient spike', percentage: 11, description: 'Rural telemetry stations show +112 µg/m³ delta in 90 min' }
    ],
    evidence: {
      citizenReportsCount: 28,
      satelliteThermalAnomaly: 'MODIS Fire Pixel Cluster #9914 (Confidence 94%)',
      groundSensorPm25: 168.4,
      meteorologicalFactor: 'NW surface wind at 24 km/h with 45m thermal inversion lid',
      historicalCorrelationPct: 88.5
    },
    aiExplanation: 'Risk is increasing because multiple independent signals indicate elevated particulate transport from an upwind agricultural belt along a persistent atmospheric conveyor corridor.'
  },
  {
    id: 'BRICS-108',
    name: 'Hebei Industrial Corridor #108',
    country: 'China',
    city: 'Beijing',
    lat: 38.8500,
    lng: 115.4800,
    riskLevel: 'HIGH',
    primaryPollutant: 'PM2.5',
    pollutantValue: 148,
    probableSource: 'Heavy Industrial Steel Smelting & Coking',
    aiConfidence: 87,
    firstDetected: '4 hours ago',
    estimatedAreaKm2: 520,
    windVector: {
      speedKmh: 14,
      direction: 'SSW → NNE',
      degrees: 25
    },
    predictedImpact: 'Beijing Southern Suburbs & Daxing Airshed in 6 hours',
    contributingFactors: [
      { name: 'Industrial SO2 / NO2 conversion rate', percentage: 35, description: 'Secondary aerosol synthesis under high humidity' },
      { name: 'Southerly atmospheric channeling', percentage: 28, description: 'Mountain barrier traps plume along Yan mountains' },
      { name: 'Ground optical depth anomaly', percentage: 20, description: 'Continuous LiDAR lidar backscatter at 300m elevation' },
      { name: 'Citizen visibility reports', percentage: 17, description: 'Reports of dense photochemical haze along G4 highway' }
    ],
    evidence: {
      citizenReportsCount: 14,
      satelliteThermalAnomaly: 'TROPOMI tropospheric NO2 column 18.2 µmol/m²',
      groundSensorPm25: 148.0,
      meteorologicalFactor: 'Weak southerly breeze (14 km/h) against orographic basin',
      historicalCorrelationPct: 84.0
    },
    aiExplanation: 'Secondary sulfate/nitrate aerosol mass is accumulating downwind from heavy manufacturing clusters, channeled toward Beijing basin by stagnant orographic flows.'
  },
  {
    id: 'BRICS-089',
    name: 'Mpumalanga Highveld Energy Belt #089',
    country: 'South Africa',
    city: 'Johannesburg',
    lat: -26.2500,
    lng: 29.4000,
    riskLevel: 'CRITICAL',
    primaryPollutant: 'SO2',
    pollutantValue: 215,
    probableSource: 'Coal-Fired Power Station Fleet & Open-Cast Mining',
    aiConfidence: 93,
    firstDetected: '1.5 hours ago',
    estimatedAreaKm2: 780,
    windVector: {
      speedKmh: 21,
      direction: 'E → W',
      degrees: 270
    },
    predictedImpact: 'Greater Johannesburg & Ekurhuleni Metropolitan Belt',
    contributingFactors: [
      { name: 'Highveld thermal subsidence', percentage: 38, description: 'Inversion layer trapped under anticyclonic system' },
      { name: 'Combined stack emissions', percentage: 30, description: 'Multiple 3600MW stations operating under peak baseload' },
      { name: 'Satellite column NO2 / SO2 footprint', percentage: 20, description: 'OMI / Sentinel-5P high-density plume verified' },
      { name: 'Citizen olfactory & health alerts', percentage: 12, description: 'Persistent sulfur smell reported across Springs & Benoni' }
    ],
    evidence: {
      citizenReportsCount: 42,
      satelliteThermalAnomaly: 'Sentinel-5P SO2 total vertical column: 3.8 DU',
      groundSensorPm25: 122.0,
      meteorologicalFactor: 'Winter anticyclone subsidence with zero vertical dispersion',
      historicalCorrelationPct: 91.2
    },
    aiExplanation: 'Severe trans-district sulfur and fine particulate plume driven by concentrated power-generation emissions migrating westward under strong anticyclonic stagnation.'
  },
  {
    id: 'BRICS-055',
    name: 'Cubatão Petrochemical Basin #055',
    country: 'Brazil',
    city: 'São Paulo',
    lat: -23.8800,
    lng: -46.4200,
    riskLevel: 'MODERATE',
    primaryPollutant: 'NO2',
    pollutantValue: 94,
    probableSource: 'Refinery Cracking & Heavy Freight Traffic',
    aiConfidence: 79,
    firstDetected: '5 hours ago',
    estimatedAreaKm2: 210,
    windVector: {
      speedKmh: 16,
      direction: 'SE → NW',
      degrees: 315
    },
    predictedImpact: 'ABC Industrial Ring and East São Paulo by early evening',
    contributingFactors: [
      { name: 'Sea breeze front pushing emissions inland', percentage: 34, description: 'Atlantic marine front advects plume over Serra do Mar' },
      { name: 'Refinery flare activity reports', percentage: 26, description: 'Citizen photos of visible flare stack plumes' },
      { name: 'Highway Anchieta freight concentration', percentage: 22, description: 'Heavy diesel exhaust accumulation in valley' },
      { name: 'Local monitor PM10 divergence', percentage: 18, description: 'Station SP-08 showing 3x baseline particulate spike' }
    ],
    evidence: {
      citizenReportsCount: 16,
      satelliteThermalAnomaly: 'Moderate infrared anomaly at refinery sector',
      groundSensorPm25: 64.5,
      meteorologicalFactor: 'Maritime breeze driving coastal valley air uphill',
      historicalCorrelationPct: 76.5
    },
    aiExplanation: 'Coastal petrochemical and heavy diesel transport emissions are being funneled through mountain passes directly into the metropolitan residential fringes.'
  }
];

export const MOCK_CORRIDORS: EconomicCorridor[] = [
  {
    id: 'corridor-in-1',
    name: 'Delhi NCR → Agra Industrial Belt',
    country: 'India',
    originCity: 'Punjab / Haryana Border',
    targetCity: 'Delhi NCR & Greater Noida',
    currentRisk: 'HIGH',
    forecast6hRisk: 'CRITICAL',
    primaryDriver: 'Upwind Agricultural Residue Burning + Brick Kiln Flumes',
    citiesAffected: ['Ambala', 'Panipat', 'Sonipat', 'Delhi', 'Noida', 'Faridabad'],
    distanceKm: 320,
    estimatedTransitHours: 4.5,
    trend: 'worsening',
    coordinates: [
      [30.3752, 76.7821],
      [29.3909, 76.9635],
      [28.9931, 77.0151],
      [28.6139, 77.2090],
      [28.5355, 77.3910],
      [27.1767, 78.0081]
    ],
    activeAlertBadge: 'CRITICAL_PLUME_APPROACHING'
  },
  {
    id: 'corridor-cn-1',
    name: 'Beijing-Tianjin-Hebei (Jing-Jin-Ji) Megacity Corridor',
    country: 'China',
    originCity: 'Tangshan / Baoding Steel Arc',
    targetCity: 'Beijing Metropolitan Airshed',
    currentRisk: 'MODERATE',
    forecast6hRisk: 'HIGH',
    primaryDriver: 'Heavy Metallurgical Coking & Inter-provincial Logistics',
    citiesAffected: ['Tangshan', 'Langfang', 'Baoding', 'Beijing', 'Tianjin'],
    distanceKm: 240,
    estimatedTransitHours: 6.0,
    trend: 'worsening',
    coordinates: [
      [39.6300, 118.1800],
      [39.5200, 116.7000],
      [38.8671, 115.4845],
      [39.9042, 116.4074],
      [39.0842, 117.2009]
    ]
  },
  {
    id: 'corridor-za-1',
    name: 'Mpumalanga Coal Basin → Gauteng Economic Hub',
    country: 'South Africa',
    originCity: 'eMalahleni (Witbank)',
    targetCity: 'Johannesburg / Pretoria Megacity',
    currentRisk: 'HIGH',
    forecast6hRisk: 'CRITICAL',
    primaryDriver: 'Baseload Thermal Generation & Open-Pit Fugitive Dust',
    citiesAffected: ['eMalahleni', 'Middelburg', 'Secunda', 'Benoni', 'Johannesburg'],
    distanceKm: 180,
    estimatedTransitHours: 3.8,
    trend: 'worsening',
    coordinates: [
      [-25.8728, 29.2242],
      [-26.5167, 29.1833],
      [-26.1885, 28.3206],
      [-26.2041, 28.0473]
    ],
    activeAlertBadge: 'SO2_HEALTH_WATCH'
  },
  {
    id: 'corridor-br-1',
    name: 'Santos Maritime Port → São Paulo Metropole',
    country: 'Brazil',
    originCity: 'Cubatão Industrial Strip',
    targetCity: 'São Paulo ABC Paulista',
    currentRisk: 'MODERATE',
    forecast6hRisk: 'MODERATE',
    primaryDriver: 'Bunker Fuel Combustion & Heavy Truck Fleet',
    citiesAffected: ['Santos', 'Cubatão', 'Santo André', 'São Bernardo', 'São Paulo'],
    distanceKm: 95,
    estimatedTransitHours: 2.2,
    trend: 'stable',
    coordinates: [
      [-23.9608, -46.3336],
      [-23.8800, -46.4200],
      [-23.6639, -46.5383],
      [-23.5505, -46.6333]
    ]
  }
];

export const MOCK_TRANS_BOUNDARY: TransBoundaryPlume = {
  id: 'PLUME-IND-PAK-01',
  originRegion: 'Punjab Agricultural Belt (Cross-Border)',
  originCountry: 'India / Regional Airshed',
  targetRegion: 'National Capital Region (NCR) & Indo-Gangetic Plain',
  targetCountry: 'India',
  windVector: {
    speedKmh: 24,
    direction: 'NW → SE',
    degrees: 135
  },
  estimatedDistanceKm: 320,
  estimatedArrivalHours: '4.5 – 6.0 hours',
  affectedCities: ['Amritsar', 'Ludhiana', 'Panipat', 'Delhi NCR', 'Faridabad'],
  confidencePct: 88,
  status: 'In Transit',
  activeAlertTitle: 'Potential trans-boundary biomass particulate transport detected along North-West corridor',
  pathCoordinates: [
    [31.6340, 74.8723],
    [30.9010, 75.8573],
    [29.3909, 76.9635],
    [28.6139, 77.2090]
  ]
};

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'REP-2026-8812',
    timestamp: '10:12 UTC (36 min ago)',
    submitterAlias: 'AeroObserver_Karnal',
    country: 'India',
    city: 'Delhi NCR Corridor (Karnal)',
    locationName: 'GT Road Sector 14, Karnal Bypass',
    lat: 29.6857,
    lng: 76.9905,
    category: 'Crop burning',
    description: 'Extensive agricultural field burning observed over 500m stretch. Acrid odor and dense dark orange smoke plume rising across highway. Visibility down to 200m.',
    sensorReading: {
      pm25: 194.2,
      aqi: 244,
      deviceModel: 'AirBeam3 Pocket Sensor'
    },
    aiVisionAnalysis: {
      visualIndicators: ['Dense low-altitude smoke plume', 'Biomass ash discoloration', 'Horizontal wind drift'],
      potentialClassification: 'Potential source: Agricultural / biomass residue burning',
      confidence: 89,
      environmentalRelevance: 'Severe fine particulate (PM2.5/PM10) emission event',
      recommendedAction: 'Cross-check satellite thermal hotspots and upwind wind trajectory models',
      modelIdentifier: 'AeroVision-Edge-v2.4 (Gemini-Multimodal-Enabled)',
      verifiedStatus: 'ai_verified'
    },
    crossValidated: true
  },
  {
    id: 'REP-2026-8809',
    timestamp: '09:44 UTC (1 hr ago)',
    submitterAlias: 'GreenLens_Tangshan',
    country: 'China',
    city: 'Beijing Airshed (Tangshan)',
    locationName: 'Fengrun Heavy Industrial District',
    lat: 39.8320,
    lng: 118.1250,
    category: 'Industrial emission',
    description: 'Continuous white-gray emissions venting from secondary quenching stacks without scrubbers during nocturnal transition.',
    sensorReading: {
      pm25: 112.0,
      aqi: 180,
      deviceModel: 'PurpleAir PA-II'
    },
    aiVisionAnalysis: {
      visualIndicators: ['High velocity chimney exhaust', 'Aerosol condensation cone'],
      potentialClassification: 'Potential source: Industrial smelting / particulate emission',
      confidence: 84,
      environmentalRelevance: 'Elevated SO2 and secondary PM2.5 precursor flux',
      recommendedAction: 'Alert Municipal Ecology & Environment Bureau for stack telemetry audit',
      modelIdentifier: 'AeroVision-Edge-v2.4',
      verifiedStatus: 'authority_confirmed'
    },
    crossValidated: true
  },
  {
    id: 'REP-2026-8801',
    timestamp: '08:30 UTC (2 hrs ago)',
    submitterAlias: 'CleanHighveld_ZA',
    country: 'South Africa',
    city: 'Johannesburg Airshed (Middelburg)',
    locationName: 'R555 Coal Haulage Road',
    lat: -25.7700,
    lng: 29.4600,
    category: 'Dust',
    description: 'Heavy fugitive coal dust clouds billowing from uncovered freight trucks and open stockpiles along R555 corridor.',
    sensorReading: {
      pm25: 88.0,
      aqi: 167,
      deviceModel: 'Sensirion SPS30 DIY'
    },
    aiVisionAnalysis: {
      visualIndicators: ['Diffuse ground-level dust swirl', 'Reduced road contrast'],
      potentialClassification: 'Potential source: Mineral fugitive dust / haulage drift',
      confidence: 81,
      environmentalRelevance: 'Coarse particulate (PM10) dominant threshold breach',
      recommendedAction: 'Dispatch dust suppression wetting trucks along secondary freight arteries',
      modelIdentifier: 'AeroVision-Edge-v2.4',
      verifiedStatus: 'ai_verified'
    },
    crossValidated: true
  }
];

export const INITIAL_CLIMATE_ALERTS: ClimateAlert[] = [
  {
    id: 'ALT-IN-2026-004',
    severity: 'critical',
    region: 'Delhi NCR & Northern Corridor',
    country: 'India',
    title: 'CRITICAL PM2.5 TRANSPORT SPIKE IMMINENT',
    trigger: 'Upwind biomass-burning cluster + 24 km/h NW wind corridor + shallow thermal inversion',
    expectedImpact: 'PM2.5 surge above 220 µg/m³ across Delhi, Gurugram, and Noida between 18:00 and 22:00',
    confidence: 89,
    recommendedAction: 'Enforce Stage-IV GRAP measures, restrict non-essential diesel transport, trigger mobile mist guns',
    responsibleAuthority: 'Central Pollution Control Board (CPCB) & Commission for Air Quality Management (CAQM)',
    timestamp: '10:25 UTC (23 min ago)',
    isAcknowledged: false,
    status: 'active'
  },
  {
    id: 'ALT-ZA-2026-012',
    severity: 'warning',
    region: 'Gauteng & Mpumalanga Highveld',
    country: 'South Africa',
    title: 'TRANS-DISTRICT SULFUR & PARTICULATE WARNING',
    trigger: 'Concentrated power station emission plume coupled with stable anticyclonic subsidence',
    expectedImpact: 'SO2 spikes exceeding 200 µg/m³ impacting eastern suburbs of Ekurhuleni & Johannesburg',
    confidence: 86,
    recommendedAction: 'Direct high-emission units to switch to scrubbed reserve mode; alert vulnerable populations',
    responsibleAuthority: 'Department of Forestry, Fisheries and the Environment (DFFE)',
    timestamp: '09:15 UTC (1.5 hrs ago)',
    isAcknowledged: true,
    status: 'investigating'
  },
  {
    id: 'ALT-CN-2026-009',
    severity: 'watch',
    region: 'Beijing-Tianjin-Hebei Corridor',
    country: 'China',
    title: 'REGIONAL PHOTOCHEMICAL HAZE WATCH',
    trigger: 'Southerly atmospheric channeling pushing precursor gases against Yan mountain rim',
    expectedImpact: 'Secondary aerosol accumulation with AQI reaching 160-185 in Southern Beijing',
    confidence: 82,
    recommendedAction: 'Activate inter-provincial joint inspection mechanism across Hebei heavy manufacturing zones',
    responsibleAuthority: 'Ministry of Ecology and Environment (MEE) Joint Coordination Desk',
    timestamp: '08:50 UTC (2 hrs ago)',
    isAcknowledged: true,
    status: 'acknowledged'
  },
  {
    id: 'ALT-BR-2026-003',
    severity: 'advisory',
    region: 'Baixada Santista & ABC Paulista',
    country: 'Brazil',
    title: 'COASTAL VALLEY INVERSION ADVISORY',
    trigger: 'Maritime sea breeze front pushing petrochemical emissions uphill into São Paulo plateau',
    expectedImpact: 'Localized NO2 and ozone precursors elevation in Santo André and Mauá',
    confidence: 76,
    recommendedAction: 'Increase continuous monitoring frequency at station SP-08; review industrial flare logs',
    responsibleAuthority: 'CETESB (Companhia Ambiental do Estado de São Paulo)',
    timestamp: '07:30 UTC (3.5 hrs ago)',
    isAcknowledged: true,
    status: 'resolved'
  }
];

export const INITIAL_AUTHORITY_INCIDENTS: AuthorityIncident[] = [
  {
    id: 'INC-2026-DEL-01',
    hotspotId: 'BRICS-042',
    title: 'North-West Biomass Inflow & Delhi Airshed Impact',
    location: 'Punjab-Haryana Border → Delhi NCR Corridor',
    country: 'India',
    riskLevel: 'HIGH',
    affectedPopulation: '28.5 Million across Delhi NCR',
    sourceProbability: '89% Agricultural Residue + 11% Kilns',
    recommendedResponse: 'Issue immediate Stage-III public advisory, mobilize anti-smog water cannons, coordinate upwind ground patrol',
    status: 'Inspection Dispatched',
    timeline: [
      { time: '10:05 UTC', event: 'AI multi-source fusion engine flags anomalous PM2.5 gradient (+112 µg/m³ in 90m)', actor: 'AeroLink Fusion Engine' },
      { time: '10:12 UTC', event: 'Citizen photo report #REP-8812 received with visual plume confirmation', actor: 'Citizen Air Watch Network' },
      { time: '10:18 UTC', event: 'Sentinel-5P / MODIS confirms 4.2 MW/km² thermal radiative fire cluster', actor: 'Copernicus Remote Sensing Desk' },
      { time: '10:25 UTC', event: 'Automated Early Warning sent to CAQM & CPCB Command Center', actor: 'AI Early Warning Dispatcher' },
      { time: '10:42 UTC', event: 'CAQM Duty Officer acknowledges alert; authorizes mobile mist-cannon deployment and drone inspection', actor: 'CAQM Regional Officer Sharma' }
    ]
  },
  {
    id: 'INC-2026-JNB-02',
    hotspotId: 'BRICS-089',
    title: 'Mpumalanga Highveld SO2 Trans-boundary Incursion',
    location: 'eMalahleni → Gauteng Basin',
    country: 'South Africa',
    riskLevel: 'CRITICAL',
    affectedPopulation: '14.2 Million across Gauteng',
    sourceProbability: '92% Thermal Power Fleet + 8% Open-cast Smoldering',
    recommendedResponse: 'Enforce immediate baseload load-shedding rebalance, issue respiratory health alerts',
    status: 'Verified',
    timeline: [
      { time: '09:02 UTC', event: 'Sentinel-5P SO2 column anomaly triggers threshold breach (3.8 DU)', actor: 'AeroLink Satellite AI' },
      { time: '09:15 UTC', event: 'Warning alert dispatched to DFFE Air Quality Management', actor: 'AI Early Warning Dispatcher' },
      { time: '09:30 UTC', event: 'Ground sensors in Springs and Benoni corroborate rising sulfur trends', actor: 'CSIR Sensor Grid' },
      { time: '09:55 UTC', event: 'DFFE confirms meteorological trapping conditions with South African Weather Service', actor: 'DFFE Officer Mthembu' }
    ]
  }
];

export const FEDERATED_NODES: FederatedNode[] = [
  {
    id: 'node-in',
    country: 'India',
    flag: '🇮🇳',
    nodeName: 'CPCB-India CleanAir Federated Node',
    datacenterRegion: 'NIC MeitY Cloud, New Delhi',
    status: 'Online & Synced',
    localSamples: '4,820,000 hourly observations',
    modelVersion: 'v3.2.4-regional',
    parameterDeltaNorm: 0.042,
    differentialPrivacyEpsilon: 0.75,
    latencyMs: 38,
    lastSync: '4 min ago'
  },
  {
    id: 'node-cn',
    country: 'China',
    flag: '🇨🇳',
    nodeName: 'MEE-China Atmospheric Edge Cluster',
    datacenterRegion: 'Tsinghua Climate Cloud, Beijing',
    status: 'Online & Synced',
    localSamples: '6,150,000 hourly observations',
    modelVersion: 'v3.2.4-regional',
    parameterDeltaNorm: 0.038,
    differentialPrivacyEpsilon: 0.68,
    latencyMs: 82,
    lastSync: '6 min ago'
  },
  {
    id: 'node-br',
    country: 'Brazil',
    flag: '🇧🇷',
    nodeName: 'INPE-Brazil Amazon & Megacity Node',
    datacenterRegion: 'São José dos Campos HPC Hub',
    status: 'Training Local Epochs',
    localSamples: '2,940,000 hourly observations',
    modelVersion: 'v3.2.4-regional',
    parameterDeltaNorm: 0.051,
    differentialPrivacyEpsilon: 0.82,
    latencyMs: 145,
    lastSync: '12 min ago'
  },
  {
    id: 'node-za',
    country: 'South Africa',
    flag: '🇿🇦',
    nodeName: 'CSIR-South Africa Climate Node',
    datacenterRegion: 'Meraka Institute Cloud, Pretoria',
    status: 'Online & Synced',
    localSamples: '1,890,000 hourly observations',
    modelVersion: 'v3.2.4-regional',
    parameterDeltaNorm: 0.046,
    differentialPrivacyEpsilon: 0.70,
    latencyMs: 198,
    lastSync: '2 min ago'
  },
  {
    id: 'node-ru',
    country: 'Russia',
    flag: '🇷🇺',
    nodeName: 'Roshydromet Boreal Air Modeling Node',
    datacenterRegion: 'Hydromet Centre HPC, Moscow',
    status: 'Online & Synced',
    localSamples: '2,410,000 hourly observations',
    modelVersion: 'v3.2.4-regional',
    parameterDeltaNorm: 0.044,
    differentialPrivacyEpsilon: 0.74,
    latencyMs: 110,
    lastSync: '8 min ago'
  }
];

export const FEDERATED_ROUNDS: FederatedTrainingRound[] = [
  {
    roundNumber: 18,
    date: '2026-09-30 (Current)',
    participatingCountries: ['India', 'China', 'Brazil', 'South Africa', 'Russia'],
    globalAccuracyPct: 91.4,
    improvementPct: 7.4,
    lossMetric: 0.084,
    aggregationMethod: 'FedAvg-Clim + Differential Privacy (ε=0.75)'
  },
  {
    roundNumber: 17,
    date: '2026-09-23',
    participatingCountries: ['India', 'China', 'Brazil', 'South Africa', 'Russia'],
    globalAccuracyPct: 89.2,
    improvementPct: 3.1,
    lossMetric: 0.098,
    aggregationMethod: 'FedAvg-Clim'
  },
  {
    roundNumber: 16,
    date: '2026-09-16',
    participatingCountries: ['India', 'China', 'Brazil', 'South Africa'],
    globalAccuracyPct: 86.5,
    improvementPct: 4.8,
    lossMetric: 0.114,
    aggregationMethod: 'FedAvg-Clim'
  },
  {
    roundNumber: 15,
    date: '2026-09-09',
    participatingCountries: ['India', 'China', 'Russia'],
    globalAccuracyPct: 82.5,
    improvementPct: 5.2,
    lossMetric: 0.138,
    aggregationMethod: 'FedProx-Robust'
  }
];

export const DELHI_FORECAST_POINTS: ForecastPoint[] = [
  {
    timeOffset: '+0h',
    timeLabel: 'Current (14:00)',
    aqi: 284,
    pm25: 168,
    pm10: 245,
    confidence: 96,
    lowerAqiCi: 275,
    upperAqiCi: 295,
    riskCategory: 'HIGH'
  },
  {
    timeOffset: '+1h',
    timeLabel: '15:00',
    aqi: 298,
    pm25: 179,
    pm10: 260,
    confidence: 93,
    lowerAqiCi: 285,
    upperAqiCi: 312,
    riskCategory: 'HIGH'
  },
  {
    timeOffset: '+3h',
    timeLabel: '17:00',
    aqi: 334,
    pm25: 204,
    pm10: 298,
    confidence: 89,
    lowerAqiCi: 310,
    upperAqiCi: 358,
    riskCategory: 'CRITICAL'
  },
  {
    timeOffset: '+6h',
    timeLabel: '20:00 (Peak Inflow)',
    aqi: 378,
    pm25: 236,
    pm10: 342,
    confidence: 84,
    lowerAqiCi: 342,
    upperAqiCi: 410,
    riskCategory: 'CRITICAL'
  },
  {
    timeOffset: '+12h',
    timeLabel: '02:00',
    aqi: 350,
    pm25: 215,
    pm10: 312,
    confidence: 79,
    lowerAqiCi: 312,
    upperAqiCi: 388,
    riskCategory: 'CRITICAL'
  },
  {
    timeOffset: '+24h',
    timeLabel: '14:00 (Tomorrow)',
    aqi: 242,
    pm25: 138,
    pm10: 210,
    confidence: 72,
    lowerAqiCi: 195,
    upperAqiCi: 288,
    riskCategory: 'MODERATE'
  }
];

export const COMMUNITY_IMPACT_METRICS = {
  citizensReporting: 3140,
  hotspotsDetected: 162,
  crossRegionEvents: 41,
  authorityAlertsDispatched: 98,
  medianWarningLeadTimeHours: 4.8,
  citiesProtected: 24
};
