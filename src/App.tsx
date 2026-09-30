import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { JudgeDemoBanner } from './components/layout/JudgeDemoBanner';
import { AeroAIChat } from './components/chat/AeroAIChat';
import { LandingView } from './views/LandingView';
import { OverviewView } from './views/OverviewView';
import { HotspotsView } from './views/HotspotsView';
import { ForecastView } from './views/ForecastView';
import { CorridorsView } from './views/CorridorsView';
import { CitizensView } from './views/CitizensView';
import { AlertsView } from './views/AlertsView';
import { FederatedView } from './views/FederatedView';
import { AuthorityView } from './views/AuthorityView';
import { DataModelsView } from './views/DataModelsView';
import { Radio } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingView />;
      case 'overview':
        return <OverviewView />;
      case 'hotspots':
        return <HotspotsView />;
      case 'forecast':
        return <ForecastView />;
      case 'corridors':
        return <CorridorsView />;
      case 'citizens':
        return <CitizensView />;
      case 'alerts':
        return <AlertsView />;
      case 'federated':
        return <FederatedView />;
      case 'authority':
        return <AuthorityView />;
      case 'data-models':
        return <DataModelsView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Judge Demo Scenario Walkthrough Bar */}
      <JudgeDemoBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>

      {/* Floating AeroAI Assistant */}
      <AeroAIChat />

      {/* International Climate-Tech Command Center Footer */}
      <footer className="bg-[#050A17] border-t border-[#1E2F56] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#070D1E] rounded-[6px] flex items-center justify-center">
                <Radio className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm text-white tracking-wide">
                AEROLINK <span className="text-cyan-400">BRICS</span>
              </div>
              <p className="text-[11px] text-slate-400">
                AI-Powered Federated Air Intelligence & Climate Response Network
              </p>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="text-center md:text-right max-w-xl text-[11px] text-slate-500 space-y-1">
            <p>
              <strong>Ethical & Scientific Standard:</strong> Simulated data is explicitly flagged. Computer vision outputs are classified as potential source estimates and require multi-sensor ground and satellite verification before official regulatory enforcement.
            </p>
            <p className="text-slate-400 font-mono">
              Build with AI / Code for Community — Track 2: Clean Air & Climate Resilience
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
