import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Navigation,
  Wind,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

export const TransBoundaryTracker: React.FC = () => {
  const { transBoundary } = useApp();

  return (
    <div className="rounded-xl brics-card p-4 md:p-6 border border-[#1E2F56]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <Globe className="w-5 h-5" />
            </span>
            <h2 className="text-base md:text-lg font-heading font-extrabold text-white tracking-wide">
              TRANS-BOUNDARY POLLUTION TRACKER
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking cross-border and inter-provincial atmospheric particulate transport plumes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            ATMOSPHERIC SIMULATION MODEL
          </span>
          <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-mono font-bold animate-pulse">
            PLUME IN TRANSIT
          </span>
        </div>
      </div>

      {/* Horizontal Atmospheric Transport Pipeline Diagram (Section 8 Requirement) */}
      <div className="p-4 rounded-xl bg-[#091124] border border-[#1E2F56] mb-6">
        <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3">
          ATMOSPHERIC DISPERSION & TRANSPORT FLOW
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1: Source */}
          <div className="p-3 rounded-lg bg-[#0D1730] border border-red-500/40">
            <div className="text-[10px] font-mono text-red-400 font-bold uppercase mb-1">
              01 — SOURCE REGION
            </div>
            <div className="text-sm font-heading font-bold text-white mb-1">
              {transBoundary.originRegion}
            </div>
            <div className="text-xs text-slate-400">
              Origin: <span className="text-slate-200">{transBoundary.originCountry}</span>
            </div>
            <div className="mt-2 text-[11px] font-mono text-red-300 bg-red-950/60 p-1 rounded border border-red-800">
              Primary: Agricultural Biomass Fire Clusters
            </div>
          </div>

          {/* Step 2: Transport */}
          <div className="p-3 rounded-lg bg-[#0D1730] border border-teal-500/40">
            <div className="text-[10px] font-mono text-teal-400 font-bold uppercase mb-1">
              02 — ATMOSPHERIC TRANSPORT
            </div>
            <div className="text-sm font-heading font-bold text-teal-300 mb-1 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-teal-400" />
              <span>{transBoundary.windVector.direction}</span>
            </div>
            <div className="text-xs text-slate-400">
              Speed: <span className="font-mono text-white">{transBoundary.windVector.speedKmh} km/h</span>
            </div>
            <div className="mt-2 text-[11px] font-mono text-teal-300 bg-teal-950/60 p-1 rounded border border-teal-800">
              Travel Distance: {transBoundary.estimatedDistanceKm} km
            </div>
          </div>

          {/* Step 3: Downwind Region */}
          <div className="p-3 rounded-lg bg-[#0D1730] border border-amber-500/40">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
              03 — DOWNWIND REGION
            </div>
            <div className="text-sm font-heading font-bold text-white mb-1">
              {transBoundary.targetRegion}
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Arrival: <strong className="text-amber-300">{transBoundary.estimatedArrivalHours}</strong></span>
            </div>
            <div className="mt-2 text-[11px] font-mono text-amber-300 bg-amber-950/60 p-1 rounded border border-amber-800">
              Boundary Layer: 45m (Inversion Trap)
            </div>
          </div>

          {/* Step 4: Predicted Impact */}
          <div className="p-3 rounded-lg bg-[#0D1730] border border-cyan-500/40">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
              04 — PREDICTED IMPACT
            </div>
            <div className="text-sm font-heading font-bold text-cyan-300 mb-1">
              {transBoundary.affectedCities.length} Megacities / Corridors
            </div>
            <div className="text-xs text-slate-400">
              AI Confidence: <strong className="text-emerald-400 font-mono">{transBoundary.confidencePct}%</strong>
            </div>
            <div className="mt-2 text-[11px] font-mono text-cyan-300 bg-cyan-950/60 p-1 rounded border border-cyan-800">
              Estimated PM2.5 Peak: &gt; 230 µg/m³
            </div>
          </div>
        </div>
      </div>

      {/* Real-world demo scenario callout */}
      <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-500/40 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white mb-0.5">
              ACTIVE DETECTION: {transBoundary.activeAlertTitle}
            </div>
            <p className="text-slate-300 text-[11px]">
              Sustained North-Westerly advection is carrying fine biomass particulate matter past state borders directly toward downwind urban receptors. Neighboring pollution authorities have received automated machine notifications.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
          <span className="text-slate-400 font-mono text-[11px]">Affected Corridors:</span>
          {transBoundary.affectedCities.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded bg-[#070D1E] text-slate-200 border border-[#1E2F56] text-[10px] font-mono">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
