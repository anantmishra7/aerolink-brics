import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  Radio,
  Eye,
  Cpu,
  Flame,
  TrendingUp,
  ShieldAlert,
  Play,
  ArrowRight,
  Sparkles,
  Camera,
  Satellite,
  Wind,
  CheckCircle2,
  Users,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { COMMUNITY_IMPACT_METRICS } from '../data/mockData';

export const LandingView: React.FC = () => {
  const { setActiveTab, startJudgeDemo } = useApp();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden brics-card border border-[#1E2F56] p-6 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-1 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>BUILD WITH AI / CODE FOR COMMUNITY — TRACK 2: CLEAN AIR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none mb-3">
            AEROLINK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">BRICS</span>
          </h1>

          <h2 className="text-lg sm:text-2xl font-heading font-bold text-cyan-200 mb-4">
            “See Pollution Earlier. Predict Its Movement. Coordinate Action.”
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8">
            An AI-powered federated climate intelligence network combining citizen observations, satellite signals, ground sensors, and meteorological data to detect hidden pollution and strengthen coordinated climate action across BRICS economic corridors.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
            >
              <span>Explore Live Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={startJudgeDemo}
              className="px-6 py-3 rounded-xl bg-[#0D1730] hover:bg-[#132145] border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-heading font-bold text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current text-cyan-400" />
              <span>Launch Judge Demo</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Visualization Graphic */}
        <div className="w-full lg:w-[460px] relative z-10">
          <div className="rounded-xl bg-[#091124] border border-cyan-500/40 p-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-[#1E2F56] text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                REAL-TIME AIRSHED RADAR
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                ACTIVE PLUME DETECTED
              </span>
            </div>

            {/* Radar Mini View */}
            <div className="relative h-56 w-full flex items-center justify-center my-3 bg-[#050A14] rounded-lg overflow-hidden border border-[#1E2F56]/60">
              {/* Concentric circles */}
              <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20" />
              <div className="absolute w-28 h-28 rounded-full border border-cyan-500/30" />
              <div className="absolute w-12 h-12 rounded-full border border-cyan-500/40" />

              {/* Radar sweep */}
              <div className="absolute w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(6,182,212,0.25)_0deg,transparent_60deg)] radar-spinner pointer-events-none" />

              {/* Origin Marker */}
              <div className="absolute top-10 left-16 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-ping opacity-75" />
                <span className="text-[9px] font-mono text-red-400 font-bold mt-1">Upwind Burning</span>
              </div>

              {/* Wind Vector Vector Flow Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 80 50 Q 150 110 280 150"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                  className="wind-stream"
                />
              </svg>

              {/* Target City */}
              <div className="absolute bottom-8 right-16 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
                <span className="text-[9px] font-mono text-cyan-300 font-bold mt-1">Delhi NCR Basin</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Advection Speed:</span>
                <span className="text-teal-300 font-bold">24 km/h NW → SE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Impact:</span>
                <span className="text-amber-300 font-bold">In 4.5 – 6.0 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Model Convergence:</span>
                <span className="text-emerald-400 font-bold">88.4% (Multi-Stream)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step "How It Works" Section (Section 22 Requirement) */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold">
            END-TO-END PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
            HOW AEROLINK BRICS WORKS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Bridging hyper-local citizen observations with continental orbital remote sensing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl brics-card border border-[#1E2F56] relative hover:border-cyan-500/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
              01
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Observe</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Citizens submit geotagged smoke photos, local sensor readings (PM2.5), and olfactory reports alongside ground stations.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl brics-card border border-[#1E2F56] relative hover:border-teal-500/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
              02
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Fuse</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multi-source AI engine correlates citizen signals with Sentinel-5P orbital swaths and synoptic wind matrices.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl brics-card border border-[#1E2F56] relative hover:border-red-500/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-300 border border-red-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
              03
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-400" />
              <span>Detect</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Identifies hidden agricultural burning, stack flares, and rural emission sources missed by sparse official stations.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl brics-card border border-[#1E2F56] relative hover:border-amber-500/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
              04
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Forecast</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Predicts cross-border plume advection, downwind arrival ETA, and multi-horizon AQI spikes along economic corridors.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl brics-card border border-[#1E2F56] relative hover:border-emerald-500/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
              05
            </div>
            <h3 className="font-heading font-bold text-white text-sm mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Respond</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated Early Warnings alert environmental authorities for drone verification, misting cannons, and cross-border coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Community Impact Statistics (Section 16 Requirement) */}
      <section className="rounded-xl brics-card p-6 border border-[#1E2F56]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E2F56]">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              MEASURABLE SCALE
            </span>
            <h3 className="text-lg font-heading font-bold text-white">
              COMMUNITY IMPACT & NETWORK RESILIENCE
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            SIMULATION / DEMO METRICS
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
            <div className="text-2xl font-heading font-black text-cyan-300">
              {COMMUNITY_IMPACT_METRICS.citizensReporting.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Citizens Reporting</div>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
            <div className="text-2xl font-heading font-black text-amber-300">
              {COMMUNITY_IMPACT_METRICS.hotspotsDetected}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Hotspots Detected</div>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
            <div className="text-2xl font-heading font-black text-red-400">
              {COMMUNITY_IMPACT_METRICS.crossRegionEvents}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Cross-Region Plumes</div>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
            <div className="text-2xl font-heading font-black text-teal-300">
              {COMMUNITY_IMPACT_METRICS.authorityAlertsDispatched}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Authority Alerts</div>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
            <div className="text-2xl font-heading font-black text-emerald-300">
              {COMMUNITY_IMPACT_METRICS.medianWarningLeadTimeHours}h
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Median Warning Lead Time</div>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
            <div className="text-2xl font-heading font-black text-blue-300">
              {COMMUNITY_IMPACT_METRICS.citiesProtected}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">Corridor Hubs Protected</div>
          </div>
        </div>
      </section>
    </div>
  );
};
