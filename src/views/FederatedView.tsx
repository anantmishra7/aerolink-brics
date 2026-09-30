import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Lock,
  Globe,
  TrendingUp,
  CheckCircle2,
  Share2,
  Database,
  ShieldCheck,
  Sparkles,
  Info,
  Server
} from 'lucide-react';

export const FederatedView: React.FC = () => {
  const { federatedNodes, federatedRounds } = useApp();

  const currentRound = federatedRounds[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              FEDERATED CLIMATE AI ARCHITECTURE
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Collaborative cross-border neural intelligence with zero raw data egress and mathematical privacy guarantees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            CONCEPTUAL / DEMO FEDERATED PROTOCOL
          </span>
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            Round #{currentRound.roundNumber} Synchronized
          </span>
        </div>
      </div>

      {/* Core Federated Concept Banner (Section 14 Requirement) */}
      <div className="rounded-xl brics-card p-6 border border-cyan-500/40 relative overflow-hidden">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-1.5 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            SOVEREIGN DATA LOCALITY PRINCIPLE
          </div>
          <h2 className="text-xl font-heading font-extrabold text-white mb-2">
            Train Locally. Aggregate Globally. Never Expose Raw Telemetry.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In standard centralized architectures, countries must surrender sensitive national sensor grids, industrial stack telemetry, and domestic data to an external server. In <strong>AeroLink Federated AI</strong>, raw environmental datasets stay strictly within sovereign borders. Only encrypted tensor gradient weights (Δw) are transmitted to the BRICS coordination layer.
          </p>
        </div>

        {/* Visual Architecture Diagram (Section 14 Specification) */}
        {/* COUNTRY A + B + C + D + E -> FEDERATED AGGREGATION -> SHARED PREDICTIVE INTELLIGENCE */}
        <div className="p-4 rounded-xl bg-[#091124] border border-[#1E2F56] space-y-6">
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            FEDERATED SYNCHRONIZATION PIPELINE
          </div>

          {/* 5 Country Edge Nodes Row */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {federatedNodes.map((node) => (
              <div
                key={node.id}
                className="p-3 rounded-lg bg-[#0D1730] border border-[#1E2F56] flex flex-col items-center text-center group hover:border-cyan-500/50 transition-colors"
              >
                <span className="text-2xl mb-1">{node.flag}</span>
                <span className="font-heading font-bold text-xs text-white">
                  {node.country} Node
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-0.5 truncate max-w-full">
                  {node.nodeName}
                </span>
                <div className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                  {node.status}
                </div>
              </div>
            ))}
          </div>

          {/* Aggregation Directional Vectors */}
          <div className="flex flex-col items-center justify-center py-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <Share2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Homomorphic Weight Encryption & Differential Privacy (ε=0.75)</span>
            </div>
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-2" />
            <div className="text-[10px] font-mono text-slate-400">
              ↓ Secure Aggregation Protocol: FedAvg-Clim v3.2.4 ↓
            </div>
          </div>

          {/* Central Federated Consensus & Shared Model */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0F2042] to-[#0A1730] border-2 border-cyan-500/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-[10px] font-mono text-cyan-300 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                FEDERATED GLOBAL MODEL AGGREGATION
              </div>
              <h3 className="text-base font-heading font-black text-white mt-0.5">
                Shared Continental Predictive Intelligence
              </h3>
              <p className="text-xs text-slate-300">
                Aggregates 17.2M multi-national observations into a singular resilient plume-dispersion model.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-center font-mono">
                <div className="text-[10px] text-slate-400">GLOBAL ACCURACY</div>
                <div className="text-2xl font-black text-emerald-400">
                  {currentRound.globalAccuracyPct}%
                </div>
              </div>

              <div className="text-center font-mono">
                <div className="text-[10px] text-slate-400">IMPROVEMENT</div>
                <div className="text-2xl font-black text-cyan-300">
                  +{currentRound.improvementPct}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Federated Rounds History Table (Section 14 Specification) */}
      <div className="rounded-xl brics-card p-6 border border-[#1E2F56]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2F56]">
          <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Federated Training Convergence History</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            5 Participating Nodes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-[#091124] text-slate-400 uppercase text-[10px] border-b border-[#1E2F56]">
              <tr>
                <th className="p-3">Training Round</th>
                <th className="p-3">Sync Date</th>
                <th className="p-3">Participating Nodes</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Delta Gain</th>
                <th className="p-3">Loss Metric</th>
                <th className="p-3">Aggregation Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2F56]/60 text-slate-200">
              {federatedRounds.map((rnd) => (
                <tr key={rnd.roundNumber} className="hover:bg-[#0D1730]/60 transition-colors">
                  <td className="p-3 font-bold text-cyan-300">
                    Round #{rnd.roundNumber}
                  </td>
                  <td className="p-3 text-slate-400">{rnd.date}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {rnd.participatingCountries.map((c) => (
                        <span key={c} className="px-1.5 py-0.5 rounded bg-[#091124] border border-[#1E2F56] text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-emerald-400">
                    {rnd.globalAccuracyPct}%
                  </td>
                  <td className="p-3 text-cyan-300 font-bold">
                    +{rnd.improvementPct}%
                  </td>
                  <td className="p-3 text-slate-300">{rnd.lossMetric}</td>
                  <td className="p-3 text-slate-400 truncate max-w-xs">{rnd.aggregationMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
