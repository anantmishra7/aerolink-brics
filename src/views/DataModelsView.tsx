import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Database,
  Code,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  Server,
  Sparkles,
  Info
} from 'lucide-react';
import { airIntelligenceService } from '../services/apiService';

export const DataModelsView: React.FC = () => {
  const { hotspots, selectedCity } = useApp();
  const [copied, setCopied] = useState(false);

  const apiStatusList = airIntelligenceService.getApiStatusList();
  const sampleExportPayload = airIntelligenceService.exportInteroperabilityJson(hotspots[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleExportPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sampleExportPayload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aerolink-interop-${hotspots[0].id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Database className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              OPEN CLIMATE INTEROPERABILITY LAYER
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized machine-readable exchange schemas enabling cross-national environmental coordination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            Spec: v1.0.0-brics-interop
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
            JSON-Schema Compliant
          </span>
        </div>
      </div>

      {/* API Health & Readiness Status Table (Section 15 & 24 Requirement) */}
      <div className="rounded-xl brics-card p-6 border border-[#1E2F56]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2F56]">
          <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Multi-National Ingestion & API Connector Status</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Auto-Detects Environment Variables (.env)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-[#091124] text-slate-400 uppercase text-[10px] border-b border-[#1E2F56]">
              <tr>
                <th className="p-3">Service Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Target Endpoint</th>
                <th className="p-3">Connector Status</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Data Freshness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2F56]/60 text-slate-200">
              {apiStatusList.map((api) => (
                <tr key={api.serviceName} className="hover:bg-[#0D1730]/60 transition-colors">
                  <td className="p-3 font-bold text-white">{api.serviceName}</td>
                  <td className="p-3 text-cyan-300">{api.category}</td>
                  <td className="p-3 text-slate-400 truncate max-w-xs">{api.endpoint}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      api.isLive
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950/70 text-amber-300 border-amber-800'
                    }`}>
                      {api.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{api.latencyMs} ms</td>
                  <td className="p-3 text-slate-400">{api.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Standardized Exchange Schema Preview & JSON Inspector */}
      <div className="rounded-xl brics-card p-6 border border-cyan-500/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2F56]">
          <div>
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Standardized Cross-Border Event Schema Preview</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Payload format for transmitting detected hotspot telemetry to neighboring BRICS states.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#0D1730] hover:bg-[#152347] border border-[#1E2F56] text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Schema'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
          </div>
        </div>

        {/* JSON Syntax Box */}
        <div className="bg-[#050B17] rounded-xl p-4 border border-[#1E2F56] overflow-x-auto max-h-[380px] text-xs font-mono text-slate-200">
          <pre className="text-cyan-300">
            {sampleExportPayload}
          </pre>
        </div>
      </div>

      {/* REST API Endpoints Preview */}
      <div className="rounded-xl brics-card p-6 border border-[#1E2F56]">
        <h2 className="text-base font-heading font-bold text-white mb-3">
          Federated REST & gRPC API Endpoints
        </h2>

        <div className="space-y-2.5 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                GET
              </span>
              <span className="text-white">/api/v1/brics/hotspots/active</span>
            </div>
            <span className="text-slate-400 text-[11px]">Returns verified multi-source hotspots</span>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                POST
              </span>
              <span className="text-white">/api/v1/brics/observations/submit</span>
            </div>
            <span className="text-slate-400 text-[11px]">Ingest citizen photos + sensor packets</span>
          </div>

          <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold border border-purple-800">
                POST
              </span>
              <span className="text-white">/api/v1/federated/weights/aggregate</span>
            </div>
            <span className="text-slate-400 text-[11px]">Secure gradient weights sync (FedAvg-Clim)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
