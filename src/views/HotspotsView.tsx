import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Wind,
  Compass,
  AlertTriangle,
  Info,
  CheckCircle2,
  Satellite,
  Activity,
  Camera,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { PollutionHotspot } from '../types';

export const HotspotsView: React.FC = () => {
  const { hotspots, selectedHotspot, setSelectedHotspot, setActiveTab } = useApp();

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'MODERATE':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/50';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <Flame className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              AI HIDDEN HOTSPOT DETECTION
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Detecting hyper-local and trans-boundary pollution clusters missed by sparse official monitoring networks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            MULTI-SOURCE AI INFERENCE
          </span>
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono">
            {hotspots.length} Active Detections
          </span>
        </div>
      </div>

      {/* Grid of Hotspots + Deep Drill-Down Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hotspots List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold px-1">
            REGISTERED POLLUTION HOTSPOTS
          </div>

          {hotspots.map((h) => {
            const isSelected = selectedHotspot?.id === h.id;
            return (
              <div
                key={h.id}
                onClick={() => setSelectedHotspot(h)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#0F1E3D] border-cyan-500 shadow-lg shadow-cyan-500/15'
                    : 'bg-[#091124] border-[#1E2F56] hover:border-slate-500 hover:bg-[#0D1730]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      HOTSPOT #{h.id}
                    </span>
                    <span className="text-[10px] text-slate-400">({h.country})</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getRiskBadge(h.riskLevel)}`}>
                    {h.riskLevel}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-sm mb-1">
                  {h.name}
                </h3>

                <p className="text-xs text-slate-300 mb-2">
                  Likely Source: <strong className="text-white">{h.probableSource}</strong>
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#1E2F56]/60">
                  <div className="text-slate-400">
                    {h.primaryPollutant}: <span className="text-cyan-300 font-bold">{h.pollutantValue} µg/m³</span>
                  </div>
                  <div className="text-right text-slate-400">
                    AI Confidence: <span className="text-emerald-400 font-bold">{h.aiConfidence}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Drill-Down Details Panel (Right Column) */}
        <div className="lg:col-span-7">
          {selectedHotspot ? (
            <div className="rounded-xl brics-card p-6 border border-cyan-500/40 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2F56]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
                      HOTSPOT #{selectedHotspot.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${getRiskBadge(selectedHotspot.riskLevel)}`}>
                      RISK: {selectedHotspot.riskLevel}
                    </span>
                  </div>
                  <h2 className="text-xl font-heading font-extrabold text-white mt-1.5">
                    {selectedHotspot.name}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Geographic Coordinates: {selectedHotspot.lat.toFixed(4)}°N, {selectedHotspot.lng.toFixed(4)}°E • Detected {selectedHotspot.firstDetected}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-heading font-black text-cyan-300">
                    {selectedHotspot.pollutantValue} <span className="text-xs font-mono font-normal text-slate-400">µg/m³</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    {selectedHotspot.primaryPollutant} CONCENTRATION
                  </div>
                </div>
              </div>

              {/* Core Parameters Table Grid (Section 4 Example format) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
                  <div className="text-slate-400 text-[10px] font-mono">LIKELY SOURCE</div>
                  <div className="font-semibold text-white mt-0.5">{selectedHotspot.probableSource}</div>
                </div>

                <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
                  <div className="text-slate-400 text-[10px] font-mono">AI CONFIDENCE</div>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">{selectedHotspot.aiConfidence}%</div>
                </div>

                <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
                  <div className="text-slate-400 text-[10px] font-mono">ESTIMATED AREA</div>
                  <div className="font-mono text-cyan-300 font-bold text-sm mt-0.5">{selectedHotspot.estimatedAreaKm2} km²</div>
                </div>

                <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
                  <div className="text-slate-400 text-[10px] font-mono">WIND VECTOR</div>
                  <div className="font-mono text-teal-300 text-sm mt-0.5">{selectedHotspot.windVector.direction} ({selectedHotspot.windVector.speedKmh} km/h)</div>
                </div>
              </div>

              {/* Predicted Impact Callout */}
              <div className="p-3.5 rounded-lg bg-[#0D1730] border border-amber-500/40 text-xs">
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
                  DOWNWIND IMPACT FORECAST
                </div>
                <div className="font-medium text-slate-200">
                  {selectedHotspot.predictedImpact}
                </div>
              </div>

              {/* Multi-Source Contributing Factors */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold mb-3">
                  CONTRIBUTING FACTORS TO HOTSPOT DETECTION
                </div>
                <div className="space-y-2.5">
                  {selectedHotspot.contributingFactors.map((f, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#091124] border border-[#1E2F56]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-200 font-medium">{f.name}</span>
                        <span className="font-mono text-cyan-300 font-bold">+{f.percentage}%</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Source Evidence Chain */}
              <div className="p-4 rounded-xl bg-[#091124] border border-[#1E2F56]">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>SYNCHRONIZED MULTI-SOURCE EVIDENCE VERIFICATION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Camera className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Citizen Reports:</strong>
                      <p className="text-slate-400 text-[11px]">
                        {selectedHotspot.evidence.citizenReportsCount} geotagged visual reports logged
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Satellite className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Satellite Swath:</strong>
                      <p className="text-slate-400 text-[11px]">
                        {selectedHotspot.evidence.satelliteThermalAnomaly}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Ground Sensor:</strong>
                      <p className="text-slate-400 text-[11px]">
                        {selectedHotspot.evidence.groundSensorPm25} µg/m³ PM2.5 reference calibration
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Wind className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Meteorology:</strong>
                      <p className="text-slate-400 text-[11px]">
                        {selectedHotspot.evidence.meteorologicalFactor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link to Authority Console */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('authority')}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Escalate to Authority Console</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-xl brics-card border border-[#1E2F56] text-center text-slate-400">
              Select a hotspot on the left to inspect multi-source telemetry details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
