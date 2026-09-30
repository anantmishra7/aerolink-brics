import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Camera,
  Satellite,
  Wind,
  Activity,
  Sliders,
  Sparkles,
  Info,
  ShieldCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const DataFusionEngine: React.FC = () => {
  const { fusionWeights, setFusionWeights, citizenReports } = useApp();

  // Dynamic calculations based on current weights
  // Simulated raw stream signals (0 - 100)
  const citizenSignalRaw = Math.min(100, citizenReports.length * 15 + 35); // 80
  const satelliteSignalRaw = 92; // High thermal radiative spike
  const groundSensorSignalRaw = 88; // Ground PM2.5 spike
  const meteorologySignalRaw = 84; // Stagnant inversion + direct advection

  const totalWeight =
    fusionWeights.citizenReports +
    fusionWeights.satelliteSignal +
    fusionWeights.groundSensors +
    fusionWeights.meteorology;

  const normalizedCitizenW = fusionWeights.citizenReports / (totalWeight || 1);
  const normalizedSatW = fusionWeights.satelliteSignal / (totalWeight || 1);
  const normalizedGroundW = fusionWeights.groundSensors / (totalWeight || 1);
  const normalizedMetW = fusionWeights.meteorology / (totalWeight || 1);

  const compositeRiskScore = Math.round(
    citizenSignalRaw * normalizedCitizenW +
    satelliteSignalRaw * normalizedSatW +
    groundSensorSignalRaw * normalizedGroundW +
    meteorologySignalRaw * normalizedMetW
  );

  return (
    <div className="rounded-xl brics-card p-4 md:p-6 border border-[#1E2F56] relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </span>
            <h2 className="text-base md:text-lg font-heading font-extrabold text-white tracking-wide">
              ENVIRONMENTAL DATA FUSION ENGINE
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Synthesizing four asynchronous real-world data streams into unified predictive intelligence.
          </p>
        </div>

        {/* Scientific Disclaimer Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Configurable Demo Weights (Non-Regulatory)</span>
        </div>
      </div>

      {/* 4 Data Streams Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Stream 1: Citizen */}
        <div className="p-3.5 rounded-lg bg-[#091124] border border-cyan-500/30 relative group hover:border-cyan-500 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-heading font-bold">
              <Camera className="w-4 h-4" />
              <span>CITIZEN STREAM</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {fusionWeights.citizenReports}% Weight
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2">
            Geotagged photos + micro-sensor readings (PurpleAir, Sensirion) + olfactory reports.
          </p>
          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1E2F56]/60">
            <span className="text-slate-400">Signal Intensity:</span>
            <span className="text-cyan-300 font-bold">{citizenSignalRaw}%</span>
          </div>
        </div>

        {/* Stream 2: Satellite */}
        <div className="p-3.5 rounded-lg bg-[#091124] border border-blue-500/30 relative group hover:border-blue-500 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-heading font-bold">
              <Satellite className="w-4 h-4" />
              <span>SATELLITE STREAM</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              {fusionWeights.satelliteSignal}% Weight
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2">
            Sentinel-5P tropospheric column NO2/SO2 + MODIS/VIIRS thermal fire radiative power.
          </p>
          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1E2F56]/60">
            <span className="text-slate-400">Signal Intensity:</span>
            <span className="text-blue-300 font-bold">{satelliteSignalRaw}%</span>
          </div>
        </div>

        {/* Stream 3: Meteorology */}
        <div className="p-3.5 rounded-lg bg-[#091124] border border-teal-500/30 relative group hover:border-teal-500 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-heading font-bold">
              <Wind className="w-4 h-4" />
              <span>METEOROLOGY</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
              {fusionWeights.meteorology}% Weight
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2">
            Synoptic wind vectors + boundary layer height + humidity + atmospheric inversion lids.
          </p>
          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1E2F56]/60">
            <span className="text-slate-400">Signal Intensity:</span>
            <span className="text-teal-300 font-bold">{meteorologySignalRaw}%</span>
          </div>
        </div>

        {/* Stream 4: Ground Monitoring */}
        <div className="p-3.5 rounded-lg bg-[#091124] border border-purple-500/30 relative group hover:border-purple-500 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-heading font-bold">
              <Activity className="w-4 h-4" />
              <span>GROUND SENSORS</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              {fusionWeights.groundSensors}% Weight
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2">
            Calibrated reference CPCB/MEE stations + PM2.5, PM10, CO, SO2 continuous telemetry.
          </p>
          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1E2F56]/60">
            <span className="text-slate-400">Signal Intensity:</span>
            <span className="text-purple-300 font-bold">{groundSensorSignalRaw}%</span>
          </div>
        </div>
      </div>

      {/* Visual Fusion Flow Diagram & Composite Result */}
      <div className="bg-[#091124] p-4 rounded-xl border border-[#1E2F56] flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Flow Representation */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span>DATA INGESTION PIPELINE</span>
            <span className="text-cyan-400">AI ATTENTION FUSION LAYER</span>
          </div>

          {/* Interactive Weight Tuning Sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Citizen Reports & Photos</span>
                <span className="font-mono text-cyan-300 font-bold">{fusionWeights.citizenReports}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={fusionWeights.citizenReports}
                onChange={(e) =>
                  setFusionWeights(prev => ({ ...prev, citizenReports: Number(e.target.value) }))
                }
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Satellite Remote Sensing Observations</span>
                <span className="font-mono text-blue-300 font-bold">{fusionWeights.satelliteSignal}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={fusionWeights.satelliteSignal}
                onChange={(e) =>
                  setFusionWeights(prev => ({ ...prev, satelliteSignal: Number(e.target.value) }))
                }
                className="w-full accent-blue-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Calibrated Ground Reference Sensors</span>
                <span className="font-mono text-purple-300 font-bold">{fusionWeights.groundSensors}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={fusionWeights.groundSensors}
                onChange={(e) =>
                  setFusionWeights(prev => ({ ...prev, groundSensors: Number(e.target.value) }))
                }
                className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Meteorological & Synoptic Flow Models</span>
                <span className="font-mono text-teal-300 font-bold">{fusionWeights.meteorology}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={fusionWeights.meteorology}
                onChange={(e) =>
                  setFusionWeights(prev => ({ ...prev, meteorology: Number(e.target.value) }))
                }
                className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Fusion Output Result Badge */}
        <div className="w-full lg:w-72 bg-gradient-to-br from-[#0F1E3D] to-[#070D1E] p-4 rounded-xl border border-cyan-500/50 flex flex-col items-center justify-center text-center shadow-lg shadow-cyan-500/10">
          <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            AI COMPOSITE FUSION SCORE
          </div>

          <div className="text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-cyan-300 my-1">
            {compositeRiskScore} <span className="text-base text-slate-400 font-mono font-normal">/ 100</span>
          </div>

          <div className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono uppercase bg-red-500/20 text-red-300 border border-red-500/40 mb-2">
            CRITICAL POLLUTION ANOMALY
          </div>

          <p className="text-[11px] text-slate-300 leading-tight">
            High convergence across all 4 independent streams verifies active regional particulate transport.
          </p>
        </div>
      </div>
    </div>
  );
};
