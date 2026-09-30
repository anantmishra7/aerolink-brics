import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  TrendingUp,
  Wind,
  Flame,
  Satellite,
  Activity,
  History,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const AIExplainability: React.FC = () => {
  const { selectedHotspot } = useApp();

  const factors = selectedHotspot?.contributingFactors || [
    { name: 'Wind vector alignment with urban basin', percentage: 32, description: 'Sustained 24 km/h NW wind direct towards metropolitan center' },
    { name: 'Upwind fire reports & citizen photos', percentage: 24, description: '19 localized citizen alerts verified in upwind agricultural belt' },
    { name: 'Satellite thermal anomaly (Sentinel-5P / MODIS)', percentage: 18, description: 'Radiative fire power index spiked to 4.2 MW/km²' },
    { name: 'Seasonal inversion history', percentage: 15, description: 'Shallow nocturnal boundary layer traps particulate mass' },
    { name: 'Ground sensor gradient spike', percentage: 11, description: 'Rural telemetry stations show +112 µg/m³ delta in 90 min' }
  ];

  const getFactorIcon = (name: string) => {
    if (name.toLowerCase().includes('wind')) return <Wind className="w-4 h-4 text-teal-400" />;
    if (name.toLowerCase().includes('fire') || name.toLowerCase().includes('citizen')) return <Flame className="w-4 h-4 text-orange-400" />;
    if (name.toLowerCase().includes('satellite')) return <Satellite className="w-4 h-4 text-blue-400" />;
    if (name.toLowerCase().includes('history') || name.toLowerCase().includes('seasonal')) return <History className="w-4 h-4 text-purple-400" />;
    return <Activity className="w-4 h-4 text-cyan-400" />;
  };

  return (
    <div className="rounded-xl brics-card p-4 md:p-6 border border-[#1E2F56]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h2 className="text-base md:text-lg font-heading font-extrabold text-white tracking-wide">
              WHY IS RISK INCREASING?
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Transparent factor attribution decomposed by AI feature importance weights.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SHAP Feature Attribution (No Black Box)</span>
        </div>
      </div>

      {/* Plain Language Synthesis (Section 11 Requirement) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1B33] to-[#0A162B] border border-cyan-500/40 mb-6 shadow-md">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold uppercase mb-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AI EXPLANATION</span>
        </div>
        <p className="text-sm md:text-base font-heading text-white font-medium leading-relaxed">
          “{selectedHotspot?.aiExplanation || 'Risk is increasing because multiple independent signals indicate elevated particulate transport from an upwind region along a persistent atmospheric conveyor corridor.'}”
        </p>
      </div>

      {/* Factor Breakdown Bars */}
      <div className="space-y-3 mb-6">
        {factors.map((factor) => (
          <div
            key={factor.name}
            className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56] hover:border-cyan-500/40 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                {getFactorIcon(factor.name)}
                <span>{factor.name}</span>
              </div>
              <span className="font-mono text-xs font-bold text-cyan-300">
                +{factor.percentage}%
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                style={{ width: `${factor.percentage * 2.5}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              {factor.description}
            </p>
          </div>
        ))}
      </div>

      {/* Multi-Source Ground Truth Evidence Grid (Section 18 Requirement) */}
      <div className="pt-4 border-t border-[#1E2F56]">
        <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
          VERIFIED MULTI-SOURCE EVIDENCE CHAIN
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded bg-[#0D1730] border border-[#1E2F56]">
            <div className="text-slate-400 text-[10px]">Citizen Reports</div>
            <div className="font-mono text-cyan-300 font-bold mt-0.5">
              {selectedHotspot?.evidence.citizenReportsCount || 28} Verified Alerts
            </div>
          </div>

          <div className="p-2 rounded bg-[#0D1730] border border-[#1E2F56]">
            <div className="text-slate-400 text-[10px]">Satellite Signal</div>
            <div className="font-mono text-blue-300 font-bold mt-0.5">
              MODIS 4.2 MW/km²
            </div>
          </div>

          <div className="p-2 rounded bg-[#0D1730] border border-[#1E2F56]">
            <div className="text-slate-400 text-[10px]">Ground Sensor PM2.5</div>
            <div className="font-mono text-purple-300 font-bold mt-0.5">
              {selectedHotspot?.evidence.groundSensorPm25 || 168.4} µg/m³
            </div>
          </div>

          <div className="p-2 rounded bg-[#0D1730] border border-[#1E2F56]">
            <div className="text-slate-400 text-[10px]">Meteorology</div>
            <div className="font-mono text-teal-300 font-bold mt-0.5">
              NW 24 km/h Inversion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
