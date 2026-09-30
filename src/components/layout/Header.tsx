import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  Globe,
  Radio,
  Flame,
  TrendingUp,
  MapPin,
  Camera,
  Bell,
  Cpu,
  ShieldAlert,
  Database,
  Sparkles,
  Play,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { BRICS_CITIES } from '../../data/mockData';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    alerts,
    isJudgeDemoActive,
    startJudgeDemo,
    stopJudgeDemo,
    setIsChatOpen,
    isLiveApiConnected
  } = useApp();

  const unacknowledgedAlertsCount = alerts.filter(a => !a.isAcknowledged).length;

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Global Overview', icon: <Globe className="w-4 h-4" /> },
    { id: 'hotspots', label: 'Hotspot Intelligence', icon: <Flame className="w-4 h-4" /> },
    { id: 'forecast', label: 'Pollution Forecast', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'corridors', label: 'Corridor Monitor', icon: <MapPin className="w-4 h-4" /> },
    { id: 'citizens', label: 'Citizen Reports', icon: <Camera className="w-4 h-4" /> },
    { id: 'alerts', label: 'Climate Alerts', icon: <Bell className="w-4 h-4" /> },
    { id: 'federated', label: 'Federated AI', icon: <Cpu className="w-4 h-4" /> },
    { id: 'authority', label: 'Authority Console', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'data-models', label: 'Data & Models', icon: <Database className="w-4 h-4" /> },
  ];

  const countries = ['All BRICS', 'India', 'China', 'Brazil', 'Russia', 'South Africa'];

  const filteredCities = selectedCountry === 'All BRICS'
    ? BRICS_CITIES
    : BRICS_CITIES.filter(c => c.country === selectedCountry);

  return (
    <header className="sticky top-0 z-40 bg-[#070D1E]/95 backdrop-blur-md border-b border-[#1E2F56]">
      {/* Top Utility & Status Bar */}
      <div className="px-4 py-2 border-b border-[#1E2F56]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070D1E] rounded-[6px] flex items-center justify-center">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base tracking-wider text-white">
                  AEROLINK <span className="text-cyan-400">BRICS</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                  FEDERATED CLIMATE AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                “See Pollution Earlier. Predict Its Movement. Coordinate Action.”
              </p>
            </div>
          </button>
        </div>

        {/* Global Selectors & System Indicators */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Country Selector */}
          <div className="flex items-center gap-1.5 bg-[#0D1730] border border-[#1E2F56] rounded-md px-2 py-1">
            <span className="text-slate-400 text-[11px]">Country:</span>
            <select
              value={selectedCountry}
              onChange={(e) => {
                const newCountry = e.target.value;
                setSelectedCountry(newCountry);
                const matchingCity = BRICS_CITIES.find(c => newCountry === 'All BRICS' || c.country === newCountry);
                if (matchingCity) setSelectedCity(matchingCity);
              }}
              className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
            >
              {countries.map(c => (
                <option key={c} value={c} className="bg-[#0D1730] text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-1.5 bg-[#0D1730] border border-[#1E2F56] rounded-md px-2 py-1">
            <span className="text-slate-400 text-[11px]">Focus:</span>
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const found = BRICS_CITIES.find(c => c.id === e.target.value);
                if (found) setSelectedCity(found);
              }}
              className="bg-transparent text-cyan-300 text-xs font-medium focus:outline-none cursor-pointer"
            >
              {filteredCities.map(c => (
                <option key={c.id} value={c.id} className="bg-[#0D1730] text-white">
                  {c.name} ({c.country}) — AQI {c.aqi}
                </option>
              ))}
            </select>
          </div>

          {/* Data Status Indicator */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
            <Info className="w-3 h-3 text-amber-400" />
            <span>{isLiveApiConnected ? 'LIVE FEED CONNECTED' : 'SIMULATION / DEMO DATA'}</span>
          </div>

          {/* AI System Status */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>FEDERATED AI: SYNCED (ROUND #18)</span>
          </div>

          {/* Judge Demo Button */}
          <button
            onClick={() => {
              if (isJudgeDemoActive) {
                stopJudgeDemo();
              } else {
                startJudgeDemo();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all shadow-md ${
              isJudgeDemoActive
                ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/20 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 shadow-cyan-500/25'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isJudgeDemoActive ? 'Exit Judge Demo' : 'Launch Judge Demo'}</span>
          </button>

          {/* Presentation PDF Download Button */}
          <a
            href="/AeroLink_BRICS_Presentation.pdf"
            download="AeroLink_BRICS_Presentation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            title="Download Executive Presentation Deck (PDF)"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Deck (PDF)</span>
          </a>

          {/* AeroAI Chatbot Trigger */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-colors"
            title="Open AeroAI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">AeroAI</span>
          </button>

          {/* Alerts Bell Notification */}
          <button
            onClick={() => setActiveTab('alerts')}
            className="relative p-1.5 rounded-md bg-[#0D1730] border border-[#1E2F56] text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            title="View Active Early Warnings"
          >
            <Bell className="w-4 h-4" />
            {unacknowledgedAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold animate-pulse">
                {unacknowledgedAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <nav className="px-4 flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setActiveTab('landing')}
          className={`px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'landing'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === 'alerts' && unacknowledgedAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping ml-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
