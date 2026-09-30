import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Wind,
  Flame,
  AlertTriangle,
  Info,
  Maximize2,
  Minimize2,
  Navigation,
  Eye,
  Camera,
  Satellite,
  Compass,
  ArrowRight
} from 'lucide-react';
import { MapLayerState } from '../../context/AppContext';

export const GlobalAirMap: React.FC = () => {
  const {
    selectedCity,
    setSelectedCity,
    hotspots,
    selectedHotspot,
    setSelectedHotspot,
    corridors,
    transBoundary,
    citizenReports,
    mapLayers,
    toggleMapLayer,
    selectedCountry,
    setSelectedCountry
  } = useApp();

  const [mapZoom, setMapZoom] = useState<'global' | 'regional'>('global');
  const [showLayerPanel, setShowLayerPanel] = useState<boolean>(false);

  // Conversion of Lat/Lng to SVG coordinates
  // Equirectangular projection mapping:
  // Lng [-180, 180] -> X [0, 1000]
  // Lat [85, -85] -> Y [0, 500]
  const projectCoordinates = (lat: number, lng: number): [number, number] => {
    if (mapZoom === 'regional' && selectedCity) {
      // Zoom centered on selected city's airshed (+/- 12 deg lat, +/- 18 deg lng)
      const centerLat = selectedCity.lat;
      const centerLng = selectedCity.lng;
      const x = 500 + ((lng - centerLng) / 18) * 380;
      const y = 250 - ((lat - centerLat) / 12) * 200;
      return [Math.max(20, Math.min(980, x)), Math.max(20, Math.min(480, y))];
    }

    const x = ((lng + 180) / 360) * 1000;
    const y = ((85 - lat) / 170) * 500;
    return [x, y];
  };

  const layerItems: { key: keyof MapLayerState; label: string; icon: string; color: string }[] = [
    { key: 'aqi', label: 'AQI Heatmap', icon: '🟢', color: '#10B981' },
    { key: 'pm25', label: 'PM2.5 Dispersion', icon: '🟣', color: '#8B5CF6' },
    { key: 'pm10', label: 'PM10 Coarse Dust', icon: '🟡', color: '#F59E0B' },
    { key: 'industrial', label: 'Industrial Emissions', icon: '🏭', color: '#64748B' },
    { key: 'agricultural', label: 'Agricultural Burning', icon: '🌾', color: '#F97316' },
    { key: 'citizenReports', label: 'Citizen Reports', icon: '📸', color: '#06B6D4' },
    { key: 'satellite', label: 'Satellite Observations', icon: '🛰️', color: '#38BDF8' },
    { key: 'windVectors', label: 'Wind Direction Grid', icon: '💨', color: '#2DD4BF' },
    { key: 'pollutionMovement', label: 'Pollution Movement Arrows', icon: '➡️', color: '#EF4444' },
    { key: 'predictedHotspots', label: 'AI Predicted Hotspots', icon: '🔥', color: '#DC2626' },
    { key: 'crossBorderPlume', label: 'Cross-Border Plumes', icon: '🌐', color: '#F43F5E' },
    { key: 'climateRisk', label: 'Climate Risk Zones', icon: '⚠️', color: '#E11D48' }
  ];

  return (
    <div className="relative w-full rounded-xl brics-card overflow-hidden border border-[#1E2F56]">
      {/* Map Header Toolbar */}
      <div className="px-4 py-2.5 bg-[#091124] border-b border-[#1E2F56] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
            <h3 className="text-xs md:text-sm font-heading font-bold text-white tracking-wide">
              GLOBAL BRICS AIR MONITORING & TRANSPORT GRID
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            SIMULATION / DEMO DATA
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            onClick={() => setMapZoom(prev => (prev === 'global' ? 'regional' : 'global'))}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1730] border border-[#1E2F56] hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-mono transition-colors"
          >
            {mapZoom === 'global' ? <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> : <Minimize2 className="w-3.5 h-3.5 text-teal-400" />}
            <span>{mapZoom === 'global' ? 'Regional Airshed Zoom' : 'Global BRICS Overview'}</span>
          </button>

          {/* Layer Panel Button */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
              showLayerPanel
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                : 'bg-[#0D1730] text-slate-300 border-[#1E2F56] hover:border-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Map Layers (12)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Viewport */}
      <div className="relative w-full h-[480px] bg-[#050B17] overflow-hidden select-none">
        {/* SVG Base Map & Overlay Visualization */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="plumeGradient" cx="20%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </radialGradient>

            <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Arrow Marker for Directional Movement */}
            <marker
              id="arrowMarker"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
            </marker>

            <marker
              id="windMarker"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#14B8A6" />
            </marker>

            {/* Grid Pattern */}
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#101F3D" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="500" fill="url(#gridPattern)" />

          {/* Stylized World Continents Outlines */}
          <g fill="#0A1428" stroke="#1E2F56" strokeWidth="1">
            {/* Simplified Eurasia */}
            <path d="M 480 90 Q 620 70 780 100 Q 860 140 850 220 Q 770 240 700 200 Q 640 240 560 210 Q 510 160 480 90 Z" />
            {/* Indian Subcontinent */}
            <path d="M 680 200 Q 720 230 730 290 Q 700 320 680 260 Z" fill="#0C1B33" stroke="#223C70" />
            {/* Africa */}
            <path d="M 460 210 Q 560 200 580 280 Q 550 420 500 440 Q 450 360 440 270 Z" fill="#0C1B33" stroke="#223C70" />
            {/* South America */}
            <path d="M 280 250 Q 380 280 360 420 Q 300 480 260 380 Q 250 290 280 250 Z" fill="#0C1B33" stroke="#223C70" />
            {/* North America */}
            <path d="M 120 70 Q 280 60 320 160 Q 260 220 180 210 Q 110 140 120 70 Z" />
          </g>

          {/* Layer 8 & 9: Wind Direction Grid & Vector Streams */}
          {mapLayers.windVectors && (
            <g opacity="0.6">
              {/* Wind stream lines across BRICS belts */}
              <path
                d="M 660 180 Q 700 220 720 250"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="1.5"
                className="wind-stream"
                markerEnd="url(#windMarker)"
              />
              <path
                d="M 730 140 Q 770 170 800 200"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="1.5"
                className="wind-stream"
                markerEnd="url(#windMarker)"
              />
              <path
                d="M 560 380 Q 520 370 480 390"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="1.5"
                className="wind-stream"
                markerEnd="url(#windMarker)"
              />
              <path
                d="M 330 360 Q 300 340 280 320"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="1.5"
                className="wind-stream"
                markerEnd="url(#windMarker)"
              />
            </g>
          )}

          {/* Layer 11: Cross-Border Plume Trajectory (Animated Transport Vector) */}
          {mapLayers.crossBorderPlume && (
            <g>
              {/* Pulsing Plume Halo */}
              <circle
                cx={projectCoordinates(29.3540, 76.5820)[0]}
                cy={projectCoordinates(29.3540, 76.5820)[1]}
                r="38"
                fill="url(#plumeGradient)"
                className="animate-pulse"
              />

              {/* Trajectory Path: Origin -> Wind -> Plume -> Border -> Downwind City */}
              <path
                d={`M ${projectCoordinates(31.6340, 74.8723)[0]} ${projectCoordinates(31.6340, 74.8723)[1]}
                    L ${projectCoordinates(29.3909, 76.9635)[0]} ${projectCoordinates(29.3909, 76.9635)[1]}
                    L ${projectCoordinates(28.6139, 77.2090)[0]} ${projectCoordinates(28.6139, 77.2090)[1]}`}
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeDasharray="6,4"
                className="wind-stream"
                markerEnd="url(#arrowMarker)"
              />

              {/* Trajectory Flow Waypoints */}
              <circle
                cx={projectCoordinates(31.6340, 74.8723)[0]}
                cy={projectCoordinates(31.6340, 74.8723)[1]}
                r="4"
                fill="#EF4444"
              />
              <text
                x={projectCoordinates(31.6340, 74.8723)[0] - 8}
                y={projectCoordinates(31.6340, 74.8723)[1] - 8}
                fill="#FCA5A5"
                fontSize="9"
                fontFamily="JetBrains Mono"
                fontWeight="bold"
              >
                Upwind Agricultural Origin
              </text>

              <circle
                cx={projectCoordinates(28.6139, 77.2090)[0]}
                cy={projectCoordinates(28.6139, 77.2090)[1]}
                r="5"
                fill="#06B6D4"
                className="animate-ping"
              />
              <text
                x={projectCoordinates(28.6139, 77.2090)[0] + 10}
                y={projectCoordinates(28.6139, 77.2090)[1] + 4}
                fill="#67E8F9"
                fontSize="10"
                fontFamily="Outfit"
                fontWeight="bold"
              >
                Delhi NCR (Downwind Impact Zone)
              </text>
            </g>
          )}

          {/* Layer 10: AI Predicted Hotspots */}
          {mapLayers.predictedHotspots &&
            hotspots.map((h) => {
              const [x, y] = projectCoordinates(h.lat, h.lng);
              const isSelected = selectedHotspot?.id === h.id;
              return (
                <g
                  key={h.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedHotspot(h)}
                >
                  {/* Warning Radar Ping */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 18 : 12}
                    fill="none"
                    stroke={h.riskLevel === 'CRITICAL' ? '#EF4444' : '#F97316'}
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity="0.7"
                  />
                  {/* Hotspot Core */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 7 : 5}
                    fill={h.riskLevel === 'CRITICAL' ? '#EF4444' : '#F97316'}
                    stroke="#FFF"
                    strokeWidth="1.5"
                  />
                  {/* Hotspot ID Label */}
                  <text
                    x={x + 8}
                    y={y - 6}
                    fill="#F1F5F9"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                    className="drop-shadow"
                  >
                    #{h.id} [{h.riskLevel}]
                  </text>
                </g>
              );
            })}

          {/* Layer 6: Citizen Reports Pinned on Map */}
          {mapLayers.citizenReports &&
            citizenReports.map((r) => {
              const [x, y] = projectCoordinates(r.lat, r.lng);
              return (
                <g key={r.id} className="cursor-pointer">
                  <circle cx={x} cy={y} r="4" fill="#06B6D4" stroke="#FFF" strokeWidth="1" />
                  <title>{`${r.submitterAlias}: ${r.category} at ${r.locationName}`}</title>
                </g>
              );
            })}

          {/* Layer 1: Major BRICS Cities Markers */}
          {mapLayers.aqi && (
            <g>
              {/* Delhi */}
              <circle
                cx={projectCoordinates(28.6139, 77.2090)[0]}
                cy={projectCoordinates(28.6139, 77.2090)[1]}
                r="6"
                fill="#EF4444"
                stroke="#FFF"
                strokeWidth="1"
              />
              {/* Beijing */}
              <circle
                cx={projectCoordinates(39.9042, 116.4074)[0]}
                cy={projectCoordinates(39.9042, 116.4074)[1]}
                r="6"
                fill="#F97316"
                stroke="#FFF"
                strokeWidth="1"
              />
              {/* Shanghai */}
              <circle
                cx={projectCoordinates(31.2304, 121.4737)[0]}
                cy={projectCoordinates(31.2304, 121.4737)[1]}
                r="5"
                fill="#EAB308"
                stroke="#FFF"
                strokeWidth="1"
              />
              {/* São Paulo */}
              <circle
                cx={projectCoordinates(-23.5505, -46.6333)[0]}
                cy={projectCoordinates(-23.5505, -46.6333)[1]}
                r="6"
                fill="#F59E0B"
                stroke="#FFF"
                strokeWidth="1"
              />
              {/* Johannesburg */}
              <circle
                cx={projectCoordinates(-26.2041, 28.0473)[0]}
                cy={projectCoordinates(-26.2041, 28.0473)[1]}
                r="6"
                fill="#EF4444"
                stroke="#FFF"
                strokeWidth="1"
              />
              {/* Moscow */}
              <circle
                cx={projectCoordinates(55.7558, 37.6173)[0]}
                cy={projectCoordinates(55.7558, 37.6173)[1]}
                r="5"
                fill="#10B981"
                stroke="#FFF"
                strokeWidth="1"
              />
            </g>
          )}
        </svg>

        {/* Floating Directional Flow Legend (Section 3 Requirement) */}
        <div className="absolute bottom-3 left-3 bg-[#070D1E]/90 border border-[#1E2F56] p-2.5 rounded-lg backdrop-blur-md text-[11px] shadow-lg max-w-xs md:max-w-md">
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
            ATMOSPHERIC TRANSPORT PIPELINE
          </div>
          <div className="flex items-center gap-1.5 flex-wrap font-mono text-slate-300">
            <span className="px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-700/50">
              Industrial / Fire Region
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
            <span className="px-1.5 py-0.5 rounded bg-teal-950/80 text-teal-300 border border-teal-700/50">
              Wind Advection
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
            <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/50">
              Plume Crosses Border
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
            <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              Downwind City
            </span>
          </div>
        </div>

        {/* Selected Hotspot / City Telemetry Card Overlay */}
        {selectedHotspot && (
          <div className="absolute top-3 right-3 bg-[#091124]/95 border border-cyan-500/40 p-3 rounded-lg shadow-xl backdrop-blur-md max-w-xs text-xs">
            <div className="flex items-center justify-between gap-2 border-b border-[#1E2F56] pb-1.5 mb-2">
              <span className="font-heading font-bold text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400" />
                {selectedHotspot.name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 font-bold">
                {selectedHotspot.riskLevel} RISK
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Probable Source:</span>
                <span className="font-semibold text-white">{selectedHotspot.probableSource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{selectedHotspot.primaryPollutant}:</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedHotspot.pollutantValue} µg/m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Confidence:</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedHotspot.aiConfidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wind Vector:</span>
                <span className="font-mono text-teal-300">{selectedHotspot.windVector.direction} ({selectedHotspot.windVector.speedKmh} km/h)</span>
              </div>
              <div className="pt-1 border-t border-[#1E2F56]/60 text-[11px] text-amber-300/90">
                <strong>Predicted Impact:</strong> {selectedHotspot.predictedImpact}
              </div>
            </div>
          </div>
        )}

        {/* Toggleable Layer Drawer */}
        {showLayerPanel && (
          <div className="absolute top-12 left-3 bg-[#070D1E]/95 border border-[#1E2F56] p-3 rounded-lg shadow-2xl backdrop-blur-md w-64 max-h-[400px] overflow-y-auto text-xs z-20">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E2F56] mb-2">
              <span className="font-heading font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Active Map Layers
              </span>
              <button
                onClick={() => setShowLayerPanel(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1.5">
              {layerItems.map((layer) => (
                <label
                  key={layer.key}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-[#0D1730] cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <span>{layer.icon}</span>
                    <span>{layer.label}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={mapLayers[layer.key]}
                    onChange={() => toggleMapLayer(layer.key)}
                    className="accent-cyan-500 rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
