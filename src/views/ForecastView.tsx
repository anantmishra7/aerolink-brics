import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  Info,
  Calendar,
  Sparkles,
  Layers,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';
import { DELHI_FORECAST_POINTS } from '../data/mockData';

export const ForecastView: React.FC = () => {
  const { selectedCity } = useApp();
  const [activeMetric, setActiveMetric] = useState<'aqi' | 'pm25' | 'pm10'>('aqi');

  const forecastData = DELHI_FORECAST_POINTS;
  const currentAqi = selectedCity.aqi;
  const peakForecast = forecastData.reduce((prev, current) => (prev.aqi > current.aqi) ? prev : current);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              AI AIR QUALITY FORECAST
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Probabilistic multi-horizon neural forecasting driven by Lagrangian plume dispersion models.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            SIMULATED AI ENSEMBLE FORECAST
          </span>
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            Horizon: +24 Hours
          </span>
        </div>
      </div>

      {/* 4 Summary Metric Highlight Cards (Section 10 Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current AQI */}
        <div className="p-4 rounded-xl bg-[#091124] border border-[#1E2F56]">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
            CURRENT AIR QUALITY
          </div>
          <div className="text-3xl font-heading font-black text-white">
            {currentAqi} <span className="text-xs font-mono font-normal text-slate-400">AQI</span>
          </div>
          <div className="text-xs text-red-400 font-semibold mt-1">
            Status: {selectedCity.status}
          </div>
        </div>

        {/* Predicted Peak */}
        <div className="p-4 rounded-xl bg-[#091124] border border-red-500/40">
          <div className="text-[10px] font-mono text-red-400 uppercase font-bold mb-1">
            PREDICTED PEAK SPIKE
          </div>
          <div className="text-3xl font-heading font-black text-rose-400">
            {peakForecast.aqi} <span className="text-xs font-mono font-normal text-slate-400">AQI</span>
          </div>
          <div className="text-xs text-slate-300 mt-1">
            Delta: <strong className="text-rose-300">+{peakForecast.aqi - currentAqi} AQI surge</strong>
          </div>
        </div>

        {/* Expected Peak Time */}
        <div className="p-4 rounded-xl bg-[#091124] border border-amber-500/40">
          <div className="text-[10px] font-mono text-amber-400 uppercase font-bold mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            EXPECTED PEAK WINDOW
          </div>
          <div className="text-2xl font-heading font-black text-amber-300">
            18:00 – 22:00
          </div>
          <div className="text-xs text-slate-400 mt-1">
            In ~4.5 to 6.0 hours from now
          </div>
        </div>

        {/* Forecast Confidence */}
        <div className="p-4 rounded-xl bg-[#091124] border border-cyan-500/40">
          <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            FORECAST CONFIDENCE
          </div>
          <div className="text-3xl font-heading font-black text-emerald-400">
            {peakForecast.confidence}%
          </div>
          <div className="text-xs text-slate-300 mt-1">
            Multi-Station Convergence: High
          </div>
        </div>
      </div>

      {/* Main Interactive Forecast Chart */}
      <div className="rounded-xl brics-card p-4 sm:p-6 border border-[#1E2F56]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E2F56]">
          <div>
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <span>{selectedCity.name} Multi-Horizon Airshed Forecast</span>
              <span className="text-xs text-slate-400 font-normal">(+1h, +3h, +6h, +12h, +24h)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Includes 90% confidence interval shading reflecting meteorological uncertainty.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1 bg-[#091124] border border-[#1E2F56] p-1 rounded-lg">
            <button
              onClick={() => setActiveMetric('aqi')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                activeMetric === 'aqi'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AQI
            </button>
            <button
              onClick={() => setActiveMetric('pm25')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                activeMetric === 'pm25'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PM2.5 (µg/m³)
            </button>
            <button
              onClick={() => setActiveMetric('pm10')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                activeMetric === 'pm10'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PM10 (µg/m³)
            </button>
          </div>
        </div>

        {/* Recharts Area Chart with Confidence Interval Band */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="ciGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2F56" vertical={false} />
              <XAxis dataKey="timeLabel" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#070D1E',
                  borderColor: '#06B6D4',
                  borderRadius: '8px',
                  color: '#FFF',
                  fontSize: '12px'
                }}
              />
              <ReferenceLine y={300} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Hazardous Threshold (300)', fill: '#F87171', fontSize: 10 }} />
              <Area
                type="monotone"
                dataKey="upperAqiCi"
                stroke="transparent"
                fill="url(#ciGradient)"
                name="Upper 90% Bound"
              />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke="#06B6D4"
                strokeWidth={3}
                fill="url(#metricGradient)"
                name={`Forecasted ${activeMetric.toUpperCase()}`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Horizon Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-4 border-t border-[#1E2F56]">
          {forecastData.map((pt) => (
            <div key={pt.timeOffset} className="p-2.5 rounded-lg bg-[#091124] border border-[#1E2F56] text-center">
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{pt.timeOffset} ({pt.timeLabel})</div>
              <div className="text-lg font-heading font-black text-white mt-0.5">{pt.aqi} AQI</div>
              <div className="text-[11px] font-mono text-slate-400">PM2.5: {pt.pm25} µg/m³</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1 font-bold">Conf: {pt.confidence}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
