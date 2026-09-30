import React from 'react';
import { useApp } from '../context/AppContext';
import { GlobalAirMap } from '../components/map/GlobalAirMap';
import { TransBoundaryTracker } from '../components/transboundary/TransBoundaryTracker';
import { DataFusionEngine } from '../components/fusion/DataFusionEngine';
import { AIExplainability } from '../components/explainability/AIExplainability';
import {
  Activity,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { BRICS_CITIES } from '../data/mockData';

export const OverviewView: React.FC = () => {
  const {
    selectedCity,
    setSelectedCity,
    selectedCountry,
    setSelectedCountry,
    alerts,
    setActiveTab
  } = useApp();

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
    if (aqi <= 100) return 'text-yellow-400 border-yellow-500/40 bg-yellow-950/40';
    if (aqi <= 150) return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    if (aqi <= 200) return 'text-red-400 border-red-500/40 bg-red-950/40';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/40';
  };

  const activeCriticalAlert = alerts.find(a => a.severity === 'critical');

  return (
    <div className="space-y-6">
      {/* Top Critical Alert Ticker if any */}
      {activeCriticalAlert && (
        <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-red-500/10">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-red-500 text-slate-950 animate-pulse">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-heading font-bold text-white flex items-center gap-2">
                <span>{activeCriticalAlert.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-900 text-red-200">
                  {activeCriticalAlert.region}
                </span>
              </div>
              <p className="text-[11px] text-red-200/90 mt-0.5">
                {activeCriticalAlert.expectedImpact}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('alerts')}
            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-slate-950 text-xs font-bold font-heading flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>Review Early Warning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Focus City Environmental Telemetry Quick-Bar */}
      <div className="rounded-xl brics-card p-4 border border-[#1E2F56]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* City Headline */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-heading font-extrabold text-white">
                  {selectedCity.name}, {selectedCity.country}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {selectedCity.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Primary Airshed Driver: <strong className="text-slate-300">{selectedCity.dominantSource}</strong>
              </p>
            </div>
          </div>

          {/* Real-time Telemetry Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* AQI */}
            <div className={`px-3 py-2 rounded-lg border font-mono ${getAqiColor(selectedCity.aqi)}`}>
              <div className="text-[10px] uppercase font-bold text-slate-400">AIR QUALITY INDEX</div>
              <div className="text-xl font-heading font-black">{selectedCity.aqi} AQI</div>
            </div>

            {/* PM2.5 */}
            <div className="px-3 py-2 rounded-lg bg-[#091124] border border-[#1E2F56] font-mono">
              <div className="text-[10px] uppercase font-bold text-slate-400">PM2.5 CONCENTRATION</div>
              <div className="text-lg font-heading font-bold text-cyan-300">{selectedCity.pm25} µg/m³</div>
            </div>

            {/* PM10 */}
            <div className="px-3 py-2 rounded-lg bg-[#091124] border border-[#1E2F56] font-mono">
              <div className="text-[10px] uppercase font-bold text-slate-400">PM10 COARSE</div>
              <div className="text-lg font-heading font-bold text-slate-200">{selectedCity.pm10} µg/m³</div>
            </div>

            {/* Wind */}
            <div className="px-3 py-2 rounded-lg bg-[#091124] border border-[#1E2F56] font-mono flex items-center gap-2">
              <Wind className="w-4 h-4 text-teal-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">SURFACE WIND</div>
                <div className="text-sm font-bold text-teal-300">{selectedCity.windSpeedKmh} km/h {selectedCity.windDirection}</div>
              </div>
            </div>

            {/* Met Temp / Hum */}
            <div className="px-3 py-2 rounded-lg bg-[#091124] border border-[#1E2F56] font-mono flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">TEMP / HUMIDITY</div>
                <div className="text-sm font-bold text-amber-300">{selectedCity.temperatureC}°C / {selectedCity.humidityPct}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick City Selector Pill Row */}
        <div className="mt-4 pt-3 border-t border-[#1E2F56]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">Switch Airshed:</span>
          {BRICS_CITIES.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCity(c);
                setSelectedCountry(c.country);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-colors border ${
                selectedCity.id === c.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                  : 'bg-[#0D1730] text-slate-400 border-[#1E2F56] hover:text-white hover:border-slate-500'
              }`}
            >
              {c.name} ({c.aqi})
            </button>
          ))}
        </div>
      </div>

      {/* Centerpiece: Interactive Global Air Map */}
      <GlobalAirMap />

      {/* Trans-Boundary Atmospheric Transport Tracker */}
      <TransBoundaryTracker />

      {/* Multi-Source Environmental Data Fusion Engine */}
      <DataFusionEngine />

      {/* AI Explainability Attribution */}
      <AIExplainability />
    </div>
  );
};
