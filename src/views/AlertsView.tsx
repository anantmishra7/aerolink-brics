import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { ClimateAlert, AlertSeverity } from '../types';

export const AlertsView: React.FC = () => {
  const { alerts, acknowledgeAlert, setActiveTab } = useApp();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          icon: '🔴',
          label: 'CRITICAL',
          classes: 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse'
        };
      case 'warning':
        return {
          icon: '🟠',
          label: 'WARNING',
          classes: 'bg-amber-500/20 text-amber-300 border-amber-500/50'
        };
      case 'watch':
        return {
          icon: '🟡',
          label: 'WATCH',
          classes: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
        };
      case 'advisory':
        return {
          icon: '🟢',
          label: 'ADVISORY',
          classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
        };
    }
  };

  const filteredAlerts = filterSeverity === 'all'
    ? alerts
    : alerts.filter(a => a.severity === filterSeverity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <Bell className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              AI EARLY WARNING SYSTEM
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Machine-actionable environmental alerts dispatched prior to dangerous threshold exceedances.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#091124] border border-[#1E2F56] p-1 rounded-lg text-xs font-mono">
          {['all', 'critical', 'warning', 'watch', 'advisory'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2.5 py-1 rounded capitalize transition-colors ${
                filterSeverity === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const badge = getSeverityBadge(alert.severity);
          return (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border transition-all ${
                alert.severity === 'critical'
                  ? 'bg-gradient-to-r from-red-950/40 via-[#0D1730] to-[#091124] border-red-500/50 shadow-lg shadow-red-500/10'
                  : 'bg-[#091124] border-[#1E2F56]'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#1E2F56]/60">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border flex items-center gap-1.5 ${badge.classes}`}>
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    {alert.id}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {alert.region} ({alert.country})
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {alert.timestamp}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    Confidence: {alert.confidence}%
                  </span>
                </div>
              </div>

              {/* Title & Trigger */}
              <h2 className="text-base font-heading font-bold text-white mb-2">
                {alert.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
                <div className="p-3 rounded-lg bg-[#0D1730] border border-[#1E2F56]">
                  <span className="text-slate-400 font-mono text-[10px] block mb-0.5">DETECTION TRIGGER</span>
                  <p className="text-slate-200">{alert.trigger}</p>
                </div>

                <div className="p-3 rounded-lg bg-[#0D1730] border border-[#1E2F56]">
                  <span className="text-slate-400 font-mono text-[10px] block mb-0.5">EXPECTED IMPACT WINDOW</span>
                  <p className="text-slate-200">{alert.expectedImpact}</p>
                </div>
              </div>

              {/* Recommended Action & Authority */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-3">
                <div>
                  <span className="text-cyan-300 font-mono font-bold block mb-0.5">
                    RECOMMENDED MITIGATION RESPONSE:
                  </span>
                  <p className="text-slate-300">{alert.recommendedAction}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Target Authority: <strong className="text-white">{alert.responsibleAuthority}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!alert.isAcknowledged ? (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#0D1730] hover:bg-[#152347] border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Acknowledge</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Acknowledged</span>
                    </span>
                  )}

                  <button
                    onClick={() => setActiveTab('authority')}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-heading text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Escalate Incident</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
