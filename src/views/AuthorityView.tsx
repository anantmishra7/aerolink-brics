import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Users,
  Compass,
  FileCheck,
  Megaphone,
  Radio,
  Share2,
  Check,
  Info
} from 'lucide-react';
import { AuthorityIncident } from '../types';

export const AuthorityView: React.FC = () => {
  const { authorityIncidents, updateIncidentStatus } = useApp();
  const [selectedIncident, setSelectedIncident] = useState<AuthorityIncident>(authorityIncidents[0]);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const handleAction = (incidentId: string, actionName: AuthorityIncident['status'], message: string) => {
    updateIncidentStatus(incidentId, actionName);
    setFeedbackToast(message);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              AUTHORITY RESPONSE CENTER
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Operational command console for municipal, state, and cross-border environmental regulators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            HUMAN-IN-THE-LOOP MANDATE
          </span>
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            Authorized Console Session Active
          </span>
        </div>
      </div>

      {/* Human-in-the-Loop Workflow Protocol Banner (Section 19 Requirement) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1E3C] via-[#09152B] to-[#0D1730] border border-cyan-500/40 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-mono mb-2">
          <span className="text-cyan-300 font-bold uppercase flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            REGULATORY GOVERNANCE PROTOCOL
          </span>
          <span className="text-slate-400 text-[11px]">
            AI Proposes Policy • Certified Human Decides
          </span>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#091124] border border-cyan-500/30">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">1</span>
            <span className="text-slate-200">AI Recommendation</span>
          </div>
          <span className="text-cyan-400 font-bold">→</span>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#091124] border border-amber-500/30">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px]">2</span>
            <span className="text-amber-200">Human Verification</span>
          </div>
          <span className="text-cyan-400 font-bold">→</span>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#091124] border border-emerald-500/30">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px]">3</span>
            <span className="text-emerald-200">Authority Action</span>
          </div>
        </div>
      </div>

      {feedbackToast && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Incident Command Center Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incidents List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold px-1">
            ACTIVE REGULATORY INCIDENTS
          </div>

          {authorityIncidents.map((inc) => {
            const isSelected = selectedIncident?.id === inc.id;
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[#0F1E3D] border-cyan-500 shadow-lg shadow-cyan-500/15'
                    : 'bg-[#091124] border-[#1E2F56] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-300 font-bold">{inc.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-300 border border-red-800 font-bold">
                    {inc.riskLevel}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-sm mb-1">
                  {inc.title}
                </h3>
                <p className="text-xs text-slate-400 mb-2">
                  {inc.location} ({inc.country})
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[#1E2F56]/60">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-amber-300 font-bold">{inc.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Incident Action Console (Right Column) */}
        <div className="lg:col-span-7">
          {selectedIncident && (
            <div className="rounded-xl brics-card p-6 border border-[#1E2F56] space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E2F56]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      INCIDENT #{selectedIncident.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                      HOTSPOT #{selectedIncident.hotspotId}
                    </span>
                  </div>
                  <h2 className="text-xl font-heading font-extrabold text-white mt-1">
                    {selectedIncident.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Location: {selectedIncident.location}
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-[#091124] border border-[#1E2F56] font-mono text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">CURRENT STATUS</div>
                  <div className="text-sm font-bold text-amber-300">{selectedIncident.status}</div>
                </div>
              </div>

              {/* Affected Population & Source Probability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#091124] border border-[#1E2F56]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AFFECTED POPULATION</span>
                  </div>
                  <div className="text-base font-heading font-bold text-white">
                    {selectedIncident.affectedPopulation}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#091124] border border-[#1E2F56]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">
                    SOURCE ATTRIBUTION PROBABILITY
                  </div>
                  <div className="text-base font-heading font-bold text-amber-300">
                    {selectedIncident.sourceProbability}
                  </div>
                </div>
              </div>

              {/* Recommended Response */}
              <div className="p-4 rounded-xl bg-[#0D1730] border border-cyan-500/40 text-xs">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1">
                  AI RECOMMENDED REGULATORY ACTION
                </div>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {selectedIncident.recommendedResponse}
                </p>
              </div>

              {/* Regulatory Action Buttons (Section 13 Specification) */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold mb-3">
                  AUTHORIZED ACTION EXECUTION
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono font-bold">
                  <button
                    onClick={() => handleAction(selectedIncident.id, 'Verified', 'Hotspot evidence verified and confirmed by Duty Officer.')}
                    className="p-2.5 rounded-lg bg-[#0D1730] hover:bg-[#152347] border border-[#1E2F56] hover:border-cyan-500 text-slate-200 hover:text-white flex items-center gap-1.5 justify-center transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verify Hotspot</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedIncident.id, 'Inspection Dispatched', 'Mobile misting cannons and field inspection units dispatched.')}
                    className="p-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 justify-center transition-colors shadow-md shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Inspection</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedIncident.id, 'Advisory Issued', 'Emergency Stage-IV public health advisory broadcasted.')}
                    className="p-2.5 rounded-lg bg-[#0D1730] hover:bg-[#152347] border border-[#1E2F56] hover:border-amber-500 text-slate-200 hover:text-white flex items-center gap-1.5 justify-center transition-colors"
                  >
                    <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Issue Advisory</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedIncident.id, 'Verified', 'Ground telemetry rate increased to 5-minute sampling.')}
                    className="p-2.5 rounded-lg bg-[#0D1730] hover:bg-[#152347] border border-[#1E2F56] text-slate-200 hover:text-white flex items-center gap-1.5 justify-center transition-colors"
                  >
                    <Radio className="w-3.5 h-3.5 text-teal-400" />
                    <span>Increase Monitoring</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedIncident.id, 'Coordinated', 'Machine-actionable alert payload transmitted to neighboring state board.')}
                    className="p-2.5 rounded-lg bg-[#0D1730] hover:bg-[#152347] border border-[#1E2F56] text-slate-200 hover:text-white flex items-center gap-1.5 justify-center transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Notify Neighbor</span>
                  </button>

                  <button
                    onClick={() => handleAction(selectedIncident.id, 'Resolved', 'Incident mitigation complete and logged as resolved.')}
                    className="p-2.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 flex items-center gap-1.5 justify-center transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mark Resolved</span>
                  </button>
                </div>
              </div>

              {/* Response Timeline (Section 13 Specification) */}
              <div className="pt-4 border-t border-[#1E2F56]">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AUDITABLE INCIDENT RESPONSE TIMELINE</span>
                </div>

                <div className="space-y-3 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-[#1E2F56] pl-6 text-xs">
                  {selectedIncident.timeline.map((entry, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#070D1E]" />
                      <div className="font-mono text-cyan-300 font-bold">{entry.time}</div>
                      <div className="text-slate-200 font-medium">{entry.event}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Actor: {entry.actor}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
