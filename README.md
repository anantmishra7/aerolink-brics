# AEROLINK BRICS
### AI-Powered Federated Air Intelligence & Climate Response Network
> **“See Pollution Earlier. Predict Its Movement. Coordinate Action.”**  
> *Built for the **Build with AI / Code for Community — Track 2: Clean Air & Climate Resilience** Challenge.*

---

## 1. Executive Summary & Problem Statement

Major metropolitan centers across the BRICS alliance (Delhi, Beijing, São Paulo, Johannesburg, Moscow, and emerging economic zones) monitor macro-level air quality through municipal continuous ambient air quality stations. However, these systems consistently miss:
1. **Hyper-local pollution events**: Stubble burning clusters along agricultural margins, fugitive dust plumes from haulage corridors, unmonitored brick kilns, and nocturnal factory stack bypasses.
2. **Cross-border & trans-boundary transport**: Particulate matter (PM2.5, PM10) and gaseous precursors (NO2, SO2) originating in upwind agricultural or industrial regions and traveling hundreds of kilometers across provincial and international boundaries under seasonal wind advection.
3. **Data siloing & geopolitical friction**: Sovereign nations are hesitant to centralize raw domestic sensor grids or industrial emissions records onto foreign servers, resulting in delayed alerts, fragmented responses, and severe public health crises.

---

## 2. The Solution: AEROLINK BRICS

**AEROLINK BRICS** is an international climate-technology command center and federated intelligence network that bridges the gap between hyper-local ground observations and continental atmospheric dynamics.

The platform provides:
- **Multi-Source Data Fusion**: Ingests citizen-submitted photos and micro-sensors, calibrated reference ground monitors, orbital remote sensing (Copernicus Sentinel-5P, MODIS, VIIRS), and synoptic weather matrices.
- **AI Hidden Hotspot Detection**: Flags anomalous particulate gradients and thermal signatures where ground monitoring networks are sparse.
- **Trans-Boundary Plume Tracking**: Uses Lagrangian trajectory models to calculate advection vectors, travel velocities, and arrival ETAs for downwind megacities.
- **AI Air Quality Multi-Horizon Forecasting**: Delivers probabilistic predictions (+1h, +3h, +6h, +12h, +24h) with 90% confidence intervals.
- **Economic Corridor Risk Monitoring**: Evaluates cumulative exposure across major freight and manufacturing corridors (e.g., Delhi NCR → Agra Industrial Belt, Beijing-Tianjin-Hebei Jing-Jin-Ji, Mpumalanga Coal Belt → Gauteng).
- **Human-in-the-Loop Authority Response Center**: Adheres strictly to the principle **AI Recommendation → Human Verification → Authority Action**, logging auditable response timelines from anomaly detection to inspection dispatch and public health advisories.
- **Federated Climate AI**: Enables BRICS member states (India, China, Brazil, South Africa, Russia) to collaboratively train global neural dispersion models by exchanging encrypted model gradient deltas ($\Delta w$) with Differential Privacy ($\epsilon = 0.75$), preserving complete sovereign data locality.
- **Open Climate Interoperability Layer**: Exposes standardized JSON schemas and REST/gRPC endpoints (`v1.0.0-brics-interop`) to facilitate seamless machine-to-machine coordination across national environmental ministries.

---

## 3. Why Existing Systems Miss Hyper-Local Events

| Dimension | Legacy Environmental Monitoring | AEROLINK BRICS Approach |
| :--- | :--- | :--- |
| **Spatial Granularity** | 10–20 fixed government stations per megacity (~50 km² blindspots) | Mobile citizen observers + IoT micro-sensors + sub-kilometer orbital imagery |
| **Temporal Latency** | 1- to 3-hour batch reporting | Real-time stream ingestion with instant in-browser AI computer vision inference |
| **Plume Vectorization** | Static AQI dials without advection modeling | Dynamic trajectory arrows tracking plume movement across jurisdictional borders |
| **Source Attribution** | Black-box correlation or retrospective manual studies | Explainable AI factor attribution (SHAP decomposition: wind vector, thermal anomaly, ground delta) |
| **Cross-Border Trust** | Requires centralized data sharing (frequently rejected) | Federated model aggregation (FedAvg-Clim) ensuring raw national data never leaves sovereign borders |

---

## 4. System Architecture

```mermaid
graph TD
    subgraph SENSING_LAYER ["01 — Multi-Source Sensing Layer"]
        C[Citizen Observers<br/>Photos + Micro-Sensors]
        G[Calibrated Ground Monitors<br/>CPCB / MEE / CSIR / INPE]
        S[Satellite Remote Sensing<br/>Sentinel-5P / MODIS / VIIRS]
        M[Meteorology & Synoptic Grids<br/>Wind / Inversion / Temp / Hum]
    end

    subgraph FUSION_LAYER ["02 — AI Data Fusion Engine"]
        F[Attention-Weighted Fusion Engine<br/>Citizen 20% | Satellite 30% | Ground 25% | Met 25%]
        V[AeroVision Multimodal Vision<br/>Smoke, Plume, Ash & Dust Classifier]
    end

    subgraph INTELLIGENCE_LAYER ["03 — Intelligence & Prediction"]
        H[AI Hidden Hotspot Detection]
        T[Trans-Boundary Plume Tracker]
        FC[Multi-Horizon Neural Forecaster<br/>+1h, +3h, +6h, +12h, +24h]
        E[Explainable AI Attribution Layer]
    end

    subgraph ACTION_LAYER ["04 — Action & Interoperability"]
        AL[AI Early Warning Engine<br/>Advisory | Watch | Warning | Critical]
        AU[Authority Response Console<br/>Human-in-the-Loop Verification]
        OP[Open Climate Interoperability Layer<br/>JSON-Schema v1.0.0-brics-interop]
        AI[AeroAI Floating Intelligence Assistant]
    end

    subgraph FEDERATED_LAYER ["05 — Sovereign Federated AI Layer"]
        N1[India Node<br/>CPCB Cloud]
        N2[China Node<br/>MEE Cluster]
        N3[Brazil Node<br/>INPE Hub]
        N4[South Africa Node<br/>CSIR Meraka]
        N5[Russia Node<br/>Roshydromet]
        FED[Federated Aggregation Engine<br/>FedAvg-Clim + Differential Privacy]
    end

    C --> V
    V --> F
    G --> F
    S --> F
    M --> F

    F --> H
    F --> T
    F --> FC
    F --> E

    H --> AL
    T --> AL
    FC --> AL
    AL --> AU
    AU --> OP

    N1 -- Encrypted Gradients --> FED
    N2 -- Encrypted Gradients --> FED
    N3 -- Encrypted Gradients --> FED
    N4 -- Encrypted Gradients --> FED
    N5 -- Encrypted Gradients --> FED
    FED -- Shared Model Parameters --> FC
```

---

## 5. Key Platform Modules

### 5.1 Global BRICS Air Map
- Interactive high-definition environmental command map centered on BRICS economic belts.
- **12 Toggleable Map Layers**: AQI Heatmap, PM2.5 Dispersion, PM10 Coarse Dust, Industrial Emissions, Agricultural Burning, Citizen Reports, Satellite Observations, Wind Direction Grid, Pollution Movement Arrows, AI Predicted Hotspots, Cross-Border Plumes, and Climate Risk Zones.
- **Animated Directional Plume Vectors**: Visualizes the complete trajectory from source to downwind receptor:  
  `Industrial Region / Agricultural Burning → Wind Advection → Plume Crosses Border → Downwind Megacity`.

### 5.2 AI Hidden Hotspot Detection
- Pinpoints unmonitored clusters using multi-signal correlation.
- Detailed drill-down: Hotspot ID, Location, Risk Level, Primary Pollutant, Probable Source, AI Confidence, First Detected, Estimated Footprint Area, Wind Vector, and Downwind Impact.
- Displays multi-source evidence verification badges (Citizen reports count, Satellite thermal radiative power, Ground PM2.5 delta, Meteorological inversion lid).

### 5.3 Trans-Boundary Pollution Tracker
- Simulates regional particulate transport events across state and national borders.
- Calculates transport velocity (e.g., 24 km/h NW $\rightarrow$ SE), total distance (320 km), arrival ETA (4.5–6.0 hours), and exposed downwind populations.

### 5.4 AI Air Quality Multi-Horizon Forecasting
- Forecasts AQI, PM2.5, and PM10 across +1h, +3h, +6h, +12h, and +24h.
- Interactive Recharts visualization with shaded 90% confidence interval bands reflecting meteorological turbulence.
- Highlights Current AQI, Predicted Peak AQI, Expected Peak Window, and Forecast Confidence.

### 5.5 BRICS Economic Corridor Risk Monitor
- Tracks arterial logistics and manufacturing corridors:
  - *Delhi NCR $\rightarrow$ Agra Industrial Belt (India)*
  - *Beijing-Tianjin-Hebei Jing-Jin-Ji Megacity Corridor (China)*
  - *Mpumalanga Coal Basin $\rightarrow$ Gauteng Economic Hub (South Africa)*
  - *Santos Maritime Port $\rightarrow$ São Paulo Metropole (Brazil)*
- Horizontal waypoint visualizer showing step-by-step impact across intermediate cities.

### 5.6 Citizen Air Watch & AI Computer Vision
- Structured upload flow for citizens: Category selection (Smoke, Industrial emission, Crop burning, Dust, Chemical smell, Vehicle pollution, Fire, Unknown), photo upload, geolocation, and optional PM2.5 reading.
- Multimodal computer vision pipeline:  
  `IMAGE → AI VISION ANALYSIS → Detected Environmental Indicators → Potential Source Classification → Confidence → Cross-Validation with Environmental Data`.
- Supports live Google Gemini 1.5 Flash Vision API when `VITE_GEMINI_API_KEY` is present, or built-in simulated inference.

### 5.7 AI Explainability: "Why Is Risk Increasing?"
- Eliminates the AI black-box barrier by decomposing risk factors into percentage attributions:
  - `+32% Wind direction alignment with urban basin`
  - `+24% Upwind fire reports & citizen photos`
  - `+18% Satellite thermal anomaly (Sentinel-5P / MODIS)`
  - `+15% Seasonal nocturnal thermal inversion`
  - `+11% Ground sensor telemetry spike`
- Plain-language synthesis explains the causal atmospheric mechanism clearly to decision-makers.

### 5.8 Authority Response Center (Human-in-the-Loop)
- Dedicated console for environmental officers and disaster management authorities.
- Actions: **Verify Hotspot**, **Dispatch Inspection**, **Issue Public Advisory**, **Increase Monitoring**, **Notify Neighboring Region**, and **Mark Resolved**.
- Auditable response timeline tracking the exact sequence from sensor anomaly to field mitigation.

### 5.9 Federated Climate AI
- Interactive visualization of sovereign edge nodes (CPCB India, MEE China, INPE Brazil, CSIR South Africa, Roshydromet Russia).
- Convergence history table tracking training rounds, accuracy gain (+7.4%), loss metrics, and Differential Privacy ($\epsilon = 0.75$).

### 5.10 Open Climate Interoperability Layer
- Standardized machine-readable JSON schema (`v1.0.0-brics-interop`).
- REST and gRPC endpoint documentation preview.
- One-click copy and download of interoperability payloads.

### 5.11 AeroAI Floating Climate Assistant
- Context-aware chatbot with quick prompt pills citing live multi-source signals (satellite anomalies, wind vectors, ground sensors, citizen alerts).

---

## 6. Judge Demo Mode: "Cross-Border Smoke Event"

To evaluate the platform during competition judging, click the **Launch Judge Demo** button in the header. The interactive walkthrough guides evaluators through 10 sequential milestones:

1. **Citizen Uploads Smoke Report**: Ingestion of geolocated observation near Punjab-Haryana border (#REP-8812) with 194.2 µg/m³ PM2.5 reading.
2. **AI Computer Vision Detection**: AeroVision extracts optical indicators and classifies *"Potential source: Agricultural biomass burning"* with 89% confidence.
3. **Nearby Ground Sensors Corroborate Surge**: Rural telemetry grid logs +112 µg/m³ delta in under 90 minutes.
4. **Satellite Orbital Thermal Anomaly Flagged**: Sentinel-5P and MODIS infrared channels confirm 4.2 MW/km² radiative fire cluster (#9914).
5. **Wind Vector Predicts Advection Trajectory**: Synoptic weather grid calculates sustained 24 km/h NW $\rightarrow$ SE winds under a 45m inversion lid.
6. **Cross-Border Plume Trajectory Model Active**: Trans-boundary tracker projects 320 km transit and 4.5–6.0 hour arrival ETA.
7. **Economic Corridor Risk Escalation**: Delhi NCR $\rightarrow$ Agra corridor escalates from MODERATE to CRITICAL.
8. **AI Multi-Horizon Forecast Predicts Peak**: Forecaster predicts Delhi AQI will peak at 378 (PM2.5: 236 µg/m³) between 18:00 and 22:00.
9. **Automated Early Warning Dispatched**: Critical alert #ALT-IN-2026-004 sent to CPCB and CAQM command centers.
10. **Human-in-the-Loop Authority Verification**: Duty Officer confirms evidence chain, dispatches anti-smog mist cannons, and initiates Stage-IV GRAP enforcement.

---

## 7. Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS, custom climate-tech design system (deep navy `#070D1E`, cyan `#06B6D4`, teal `#14B8A6`, alert red `#EF4444`)
- **Data Visualization**: Recharts (forecast and convergence charts), Custom SVG Geospatial Animation Engine with animated vector paths and particle wind streams
- **Icons**: Lucide React
- **AI Services**: Modular AI Vision Service supporting Google Gemini 1.5 Flash API or local simulated multimodal inference
- **Interoperability**: JSON Schema `v1.0.0-brics-interop`

---

## 8. Installation & Running Locally

### Prerequisites
- Node.js (v18 or v20+)
- npm (v9 or v10+)

### Setup Instructions

1. Clone or navigate to the repository directory:
   ```bash
   cd "Clean Air & Climate Resilience"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   ```bash
   cp .env.example .env
   ```
   Add your API keys if you wish to connect live APIs (e.g., Google Gemini, OpenAQ, OpenWeather, Copernicus Sentinel Hub). If left blank, the platform automatically activates realistic simulation datasets with explicit labelling.

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 9. Environment Variables Reference

See `.env.example`:
```env
# AI & Computer Vision Service
VITE_GEMINI_API_KEY=
VITE_OPENAI_API_KEY=
VITE_AI_VISION_MODEL=gemini-1.5-flash

# Real-Time Air Quality Ground Monitoring
VITE_OPENAQ_API_KEY=
VITE_WAQI_API_KEY=

# Meteorological & Wind Feeds
VITE_OPENWEATHER_API_KEY=

# Satellite Observations & Remote Sensing
VITE_SENTINEL_HUB_CLIENT_ID=
VITE_SENTINEL_HUB_CLIENT_SECRET=
VITE_NASA_FIRMS_MAP_KEY=

# Application Mode
VITE_APP_MODE=demo
VITE_ENABLE_FEDERATED_SIMULATION=true
```

---

## 10. Scientific & Ethical Guidelines

AEROLINK BRICS adheres to strict scientific and ethical AI guidelines:
1. **Explicit Simulation Badges**: Whenever generated or calibrated demo data is rendered, the UI prominently displays `[SIMULATION / DEMO DATA]` to prevent false claims.
2. **Prudent Optical Classification**: Computer vision models never claim definitive emission causality from photographs alone; results are marked as *"Potential source estimates"* requiring multi-sensor verification.
3. **Sovereignty & Privacy**: Federated learning ensures that national datasets remain strictly on sovereign infrastructure.
4. **Human Accountability**: All regulatory actions (fines, factory shutdowns, traffic restrictions) require human verification by certified environmental officers.

---

## 11. Limitations & Future Roadmap

### Current Limitations
- External tile servers and live satellite APIs are simulated by default unless active client credentials are provided in `.env`.
- Federated training rounds are demonstrated conceptually via deterministic aggregation metrics rather than a live multi-datacenter cluster.

### Future Roadmap
- Integration with the BRICS Earth Observation Satellite Constellation agreement for automated orbital tasking.
- Deployment of on-device WebAssembly/TensorFlow.js edge models on citizen smartphones for offline plume detection.
- Expansion to include maritime corridor emissions along BRICS maritime trade lanes.

---

## 12. License
Developed for the **Build with AI / Code for Community — Track 2: Clean Air & Climate Resilience** Competition. Open-source climate commons.
