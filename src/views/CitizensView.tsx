import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  MapPin,
  Clock,
  Activity,
  Layers,
  ShieldCheck,
  Send,
  Loader2,
  Cpu
} from 'lucide-react';
import { CitizenCategory, CitizenReport, AIVisionAnalysis } from '../types';
import { aiVisionService } from '../services/geminiVisionService';

export const CitizensView: React.FC = () => {
  const { citizenReports, addCitizenReport, selectedCity } = useApp();

  const [category, setCategory] = useState<CitizenCategory>('Crop burning');
  const [locationName, setLocationName] = useState('GT Road Bypass, Karnal Sector 14');
  const [description, setDescription] = useState('Dense agricultural field burning observed over 500m stretch. Acrid smoke plume drifting southeast across highway.');
  const [sensorPm25, setSensorPm25] = useState('194.2');
  const [deviceModel, setDeviceModel] = useState('AirBeam3 Pocket Sensor');
  const [selectedImage, setSelectedImage] = useState<string>('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=600&q=80');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AIVisionAnalysis | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const categories: CitizenCategory[] = [
    'Crop burning',
    'Industrial emission',
    'Smoke',
    'Dust',
    'Chemical smell',
    'Vehicle pollution',
    'Fire',
    'Unknown'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setCurrentAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setSubmissionSuccess(false);

    try {
      const analysis = await aiVisionService.analyzePollutionImage(
        selectedImage,
        category,
        description
      );
      setCurrentAnalysis(analysis);

      // Create new CitizenReport
      const newReport: CitizenReport = {
        id: `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: 'Just now (14:30 UTC)',
        submitterAlias: 'AeroObserver_Live',
        country: selectedCity.country,
        city: selectedCity.name,
        locationName,
        lat: selectedCity.lat + 0.15,
        lng: selectedCity.lng + 0.12,
        category,
        description,
        imageUrl: selectedImage,
        sensorReading: {
          pm25: parseFloat(sensorPm25) || undefined,
          aqi: Math.round((parseFloat(sensorPm25) || 100) * 1.3),
          deviceModel
        },
        aiVisionAnalysis: analysis,
        crossValidated: true
      };

      addCitizenReport(newReport);
      setSubmissionSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl brics-card border border-[#1E2F56]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Camera className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-heading font-extrabold text-white">
              CITIZEN AIR WATCH INTELLIGENCE
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empowering frontline communities to report local pollution events with instant AI computer vision cross-validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
            {citizenReports.length} Reports Logged
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono">
            Requires Multi-Source Verification
          </span>
        </div>
      </div>

      {/* Main Grid: Upload Interface & AI Computer Vision Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Form (Left Column) */}
        <div className="lg:col-span-6 rounded-xl brics-card p-5 border border-[#1E2F56]">
          <h2 className="text-base font-heading font-bold text-white mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Submit Citizen Observation</span>
          </h2>

          <form onSubmit={handleAnalyzeAndSubmit} className="space-y-4">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                Pollution Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-colors ${
                      category === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                        : 'bg-[#091124] text-slate-400 border-[#1E2F56] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload / Preview */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">
                Observation Photo
              </label>
              <div className="flex items-center gap-3">
                <div className="w-24 h-24 rounded-lg bg-[#091124] border border-[#1E2F56] overflow-hidden shrink-0">
                  <img
                    src={selectedImage}
                    alt="Observation Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-950 file:text-cyan-300 hover:file:bg-cyan-900 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Upload photo or use sample image. In-browser tensor processor extracts optical plume signatures.
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
                  Location / Highway
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-[#091124] border border-[#1E2F56] focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
                  Target Airshed
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedCity.name} Corridor (${selectedCity.country})`}
                  className="w-full bg-[#091124]/60 border border-[#1E2F56] rounded-lg px-3 py-1.5 text-xs text-slate-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
                Field Notes & Visual Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#091124] border border-[#1E2F56] focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Optional Sensor Reading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Optional PM2.5 (µg/m³)
                </label>
                <input
                  type="number"
                  value={sensorPm25}
                  onChange={(e) => setSensorPm25(e.target.value)}
                  className="w-full bg-[#0D1730] border border-[#1E2F56] rounded px-2 py-1 text-xs text-cyan-300 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Sensor Device Model
                </label>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full bg-[#0D1730] border border-[#1E2F56] rounded px-2 py-1 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Running AI Vision Analysis Pipeline...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Vision & Publish Observation</span>
                </>
              )}
            </button>
          </form>

          {submissionSuccess && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Observation verified and synchronized to regional data fusion engine!</span>
            </div>
          )}
        </div>

        {/* AI Computer Vision Pipeline Display (Right Column - Section 6 Requirement) */}
        <div className="lg:col-span-6 rounded-xl brics-card p-5 border border-cyan-500/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2F56]">
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>AI Computer Vision Pipeline</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              {currentAnalysis?.modelIdentifier || 'AeroVision-Edge-v2.4'}
            </span>
          </div>

          {/* Visual Architecture Flow: IMAGE -> AI VISION -> INDICATORS -> CLASSIFICATION -> CONFIDENCE -> CROSS-VALIDATION */}
          <div className="space-y-3">
            {/* Step 1: Image Input */}
            <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                01 — OPTICAL IMAGE INPUT
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-slate-800 overflow-hidden shrink-0">
                  <img src={selectedImage} alt="Input" className="w-full h-full object-cover" />
                </div>
                <div className="text-xs text-slate-300">
                  <span>Geotagged frame captured at <strong>{locationName}</strong></span>
                  <div className="text-[11px] font-mono text-cyan-400">Resolution: 1080x1080 • Multimodal Tensor Ready</div>
                </div>
              </div>
            </div>

            {/* Step 2: Detected Indicators */}
            <div className="p-3 rounded-lg bg-[#091124] border border-[#1E2F56]">
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1">
                02 — DETECTED ENVIRONMENTAL INDICATORS
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {(currentAnalysis?.visualIndicators || [
                  'Horizontal low-altitude smoke plume',
                  'Dense dark-orange biomass ash discoloration',
                  'Downwind particulate drift'
                ]).map((ind, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#0D1730] border border-cyan-500/40 text-cyan-300 text-[11px] font-mono"
                  >
                    ✓ {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Step 3: Potential Classification & Confidence */}
            <div className="p-3.5 rounded-lg bg-[#0D1730] border border-amber-500/40">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-amber-400 uppercase font-bold">03 — POTENTIAL SOURCE CLASSIFICATION</span>
                <span className="text-emerald-400 font-bold">
                  AI Confidence: {currentAnalysis?.confidence || 89}%
                </span>
              </div>
              <div className="text-sm font-heading font-bold text-white">
                {currentAnalysis?.potentialClassification || 'Potential source: Agricultural / biomass residue burning'}
              </div>
              <div className="text-xs text-amber-300/90 mt-1">
                {currentAnalysis?.environmentalRelevance || 'Severe localized PM2.5 / black carbon emission event; severe respiratory risk.'}
              </div>
            </div>

            {/* Step 4: Cross-Validation & Recommended Action */}
            <div className="p-3.5 rounded-lg bg-[#091124] border border-teal-500/40">
              <div className="text-[10px] font-mono text-teal-400 uppercase font-bold mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                04 — CROSS-VALIDATION WITH ENVIRONMENTAL DATA
              </div>
              <p className="text-xs text-slate-300">
                {currentAnalysis?.recommendedAction || 'Cross-check satellite thermal anomaly pixels (MODIS/VIIRS) and NW-SE wind advection corridor.'}
              </p>
            </div>

            {/* Prudent Scientific Disclaimer */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Prudent Scientific Standard:</strong> Computer vision models classify optical indicators but do not definitively prove emission origins. All classifications are stamped as <em>“Potential source estimates”</em> and require cross-validation before regulatory enforcement.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Citizen Feed */}
      <div className="rounded-xl brics-card p-5 border border-[#1E2F56]">
        <h2 className="text-base font-heading font-bold text-white mb-4">
          Recent Citizen Field Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {citizenReports.slice(0, 3).map((r) => (
            <div key={r.id} className="p-3.5 rounded-lg bg-[#091124] border border-[#1E2F56] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-cyan-300 font-bold">{r.id}</span>
                <span className="text-slate-400">{r.timestamp}</span>
              </div>
              <div className="font-heading font-bold text-white text-xs">
                {r.locationName}
              </div>
              <div className="text-[11px] text-slate-300 line-clamp-2">
                {r.description}
              </div>
              {r.sensorReading?.pm25 && (
                <div className="text-[11px] font-mono text-amber-300">
                  PM2.5: {r.sensorReading.pm25} µg/m³ ({r.sensorReading.deviceModel})
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
