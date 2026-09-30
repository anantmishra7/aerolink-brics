import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Wind,
  Clock,
  Compass,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { EconomicCorridor } from '../types';

export const CorridorsView: React.FC = () => {
  const { corridors, setActiveTab } = useApp();
  const [selectedCorridor, setSelectedCorridor] = useState<EconomicCorridor>(corridors[0]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
        return 'text-red-400 border-red-500/50 bg-red-950/40';
      case 'HIGH':
        return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
      case 'MODERATE':
        return 'text-teal-400 border-teal-500/50 bg-teal-950/40';
      default:
        return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Navigation className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              BRICS ECONOMIC CORRIDOR RISK MONITOR
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking dynamic pollution advection along high-density manufacturing, energy, and logistics arterial corridors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            AIRSHED ADVECTION TRACKING
          </span>
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            {corridors.length} Corridors Monitored
          </span>
        </div>
      </div>

      {/* Corridor Cards Grid (Section 9 Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {corridors.map((corridor) => {
          const isSelected = selectedCorridor.id === corridor.id;
          return (
            <div
              key={corridor.id}
              onClick={() => setSelectedCorridor(corridor)}
              className={`p-5 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-[#0F1E3D] border-cyan-500 shadow-lg shadow-cyan-500/20'
                  : 'bg-[#091124] border-[#1E2F56] hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  {corridor.country}
                </span>
                {corridor.activeAlertBadge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950 text-red-300 border border-red-800 animate-pulse font-bold">
                    PLUME APPROACHING
                  </span>
                )}
              </div>

              <h2 className="text-base font-heading font-bold text-white mb-2">
                {corridor.name}
              </h2>

              {/* Current vs 6-Hour Forecast Risk Badges */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className={`p-2 rounded-lg border text-center font-mono ${getRiskColor(corridor.currentRisk)}`}>
                  <div className="text-[10px] uppercase text-slate-400 font-bold">CURRENT RISK</div>
                  <div className="text-sm font-bold mt-0.5">{corridor.currentRisk}</div>
                </div>

                <div className={`p-2 rounded-lg border text-center font-mono ${getRiskColor(corridor.forecast6hRisk)}`}>
                  <div className="text-[10px] uppercase text-slate-400 font-bold">6-HOUR FORECAST</div>
                  <div className="text-sm font-bold mt-0.5">{corridor.forecast6hRisk}</div>
                </div>
              </div>

              {/* Driver & Affected Cities */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400">Potential Driver:</span>{' '}
                  <strong className="text-white">{corridor.primaryDriver}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Transit Distance:</span>{' '}
                  <span className="font-mono text-cyan-300">{corridor.distanceKm} km (~{corridor.estimatedTransitHours} hrs)</span>
                </div>
                <div>
                  <span className="text-slate-400">Trend:</span>{' '}
                  <span className={`font-mono font-bold capitalize ${corridor.trend === 'worsening' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {corridor.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal Corridor Visualizer (Section 9 Requirement) */}
      <div className="rounded-xl brics-card p-6 border border-[#1E2F56]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E2F56]">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
              HORIZONTAL CORRIDOR PATHWAY
            </span>
            <h2 className="text-lg font-heading font-extrabold text-white">
              {selectedCorridor.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Origin: <strong className="text-white">{selectedCorridor.originCity}</strong> → Receptor: <strong className="text-cyan-300">{selectedCorridor.targetCity}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#091124] border border-[#1E2F56] text-xs font-mono text-slate-300">
              {selectedCorridor.distanceKm} Kilometers
            </span>
            <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
              ETA: ~{selectedCorridor.estimatedTransitHours} Hours
            </span>
          </div>
        </div>

        {/* Waypoints Sequence Bar */}
        <div className="relative py-6 px-2 overflow-x-auto no-scrollbar">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-cyan-500 -translate-y-1/2 z-0" />

          <div className="flex items-center justify-between gap-6 relative z-10 min-w-[600px]">
            {selectedCorridor.citiesAffected.map((city, idx) => {
              const isOrigin = idx === 0;
              const isTarget = idx === selectedCorridor.citiesAffected.length - 1;

              return (
                <div key={city} className="flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-lg transition-transform hover:scale-110 ${
                      isOrigin
                        ? 'bg-red-500 text-slate-950 ring-4 ring-red-500/30'
                        : isTarget
                        ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/30 animate-pulse'
                        : 'bg-[#0D1730] border-2 border-amber-400 text-amber-300'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-xs font-heading font-bold text-white mt-2 max-w-[100px] truncate">
                    {city}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {isOrigin ? 'Source Zone' : isTarget ? 'Primary Basin' : 'Waypoint'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-6 p-4 rounded-xl bg-[#091124] border border-[#1E2F56] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Automated notifications have been queued for municipal authorities in all {selectedCorridor.citiesAffected.length} cities along this corridor.
            </span>
          </div>

          <button
            onClick={() => setActiveTab('alerts')}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-heading text-xs transition-colors shrink-0"
          >
            Dispatch Corridor Advisory
          </button>
        </div>
      </div>
    </div>
  );
};
