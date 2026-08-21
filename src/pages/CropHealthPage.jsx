import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation } from '../data/translations';
import { 
  Activity, 
  Sprout, 
  Camera, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Droplet, 
  Sun, 
  Layers, 
  ArrowRight, 
  MapPin,
  CheckCircle2,
  Maximize2,
  Compass
} from 'lucide-react';

export const CropHealthPage = () => {
  const { farmerProfile, location, agroRegion, crops, weatherData, setActiveTab, t } = useApp();

  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [activeNDVILayer, setActiveNDVILayer] = useState('ndvi'); // 'ndvi' | 'moisture' | 'thermal'

  const activeCrop = crops[selectedCropIndex] || crops[0] || {
    name: "Cotton",
    healthScore: 88,
    healthStatus: "Optimal Growth",
    variety: "Hybrid BG-II",
    areaAcres: 2.5
  };

  const humidity = weatherData?.current?.humidity ?? 74;
  const rainProb = weatherData?.current?.rainProbability ?? 45;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-emerald-800 uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4 text-emerald-600" /> Multi-Spectral Telemetry & Satellite Biomass
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            Crop Health & NDVI Biomass Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Real-time vegetative vigour indices, chlorophyll density, and multi-factor stress radar for {location.formatted}.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('cropDoctor')}
          className="flex items-center gap-2 px-5 py-3 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs rounded-2xl shadow-agri transition-all cursor-pointer flex-shrink-0"
        >
          <Camera className="w-4 h-4 text-emerald-300" />
          <span>Launch AI Leaf Scanner</span>
        </button>
      </div>

      {/* CROP SELECTOR CHIPS */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
        {crops.map((crop, idx) => (
          <button
            key={crop.id}
            onClick={() => setSelectedCropIndex(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedCropIndex === idx
                ? 'bg-agri-dark text-white shadow-agri border border-gov-gold/30'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            🌾 {getCropTranslation(crop.name, t)} ({crop.healthScore}/100)
          </button>
        ))}
      </div>

      {/* HEALTH SCORE HERO GAUGE & OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Overall Health Index */}
        <div className="md:col-span-4 bg-gradient-to-br from-agri-dark via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-gov-gold/30 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 block">
              CANOPY VIGOUR INDEX
            </span>
            <div className="text-5xl font-black font-sans tracking-tight">
              {activeCrop.healthScore} <span className="text-xl text-emerald-300/80 font-normal">/ 100</span>
            </div>
            <span className="inline-block px-3 py-1 bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 rounded-full text-xs font-bold">
              ✅ {activeCrop.healthStatus || "High Photosynthetic Active Biomass"}
            </span>
          </div>

          <div className="space-y-3 pt-4 border-t border-emerald-800/60 text-xs">
            <div className="flex justify-between">
              <span className="text-emerald-200/80">Chlorophyll Pigment (SPAD):</span>
              <strong className="text-white">44.2 (Optimal)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-200/80">Canopy Temperature:</span>
              <strong className="text-white">26.4°C (Normal)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-200/80">Mean NDVI Index:</span>
              <strong className="text-emerald-300 font-bold">0.76 (Dense Green)</strong>
            </div>
          </div>
        </div>

        {/* Right: 4-Pillar Crop Stress Radar */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-black text-sm sm:text-base text-agri-dark flex items-center gap-2">
              <Activity className="w-5 h-5 text-agri-primary" /> 4-Pillar Crop Stress Analysis Radar
            </h3>
            <span className="text-xs font-bold text-gray-500">Telemetry: {location.district || "Regional"} Hub</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Water Stress */}
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-sky-950 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-sky-600" /> Moisture / Water Stress
                </span>
                <span className="font-extrabold text-sky-700">14% (Low)</span>
              </div>
              <div className="w-full h-2 bg-sky-200 rounded-full overflow-hidden">
                <div className="h-full bg-sky-600 rounded-full" style={{ width: '14%' }} />
              </div>
              <p className="text-[11px] text-gray-600 font-medium">Root zone moisture is sufficient. No cavitation observed.</p>
            </div>

            {/* 2. Nutrient / Chlorosis Deficit */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-amber-950 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-600" /> Nutrient / Chlorosis Deficit
                </span>
                <span className="font-extrabold text-amber-700">18% (Mild)</span>
              </div>
              <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '18%' }} />
              </div>
              <p className="text-[11px] text-gray-600 font-medium">Minor magnesium trace deficit in lower older leaves.</p>
            </div>

            {/* 3. Pest Pressure */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Pest Pressure Index
                </span>
                <span className="font-extrabold text-emerald-700">22% (Controlled)</span>
              </div>
              <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '22%' }} />
              </div>
              <p className="text-[11px] text-gray-600 font-medium">Trap catches are well below the Economic Threshold Level (ETL).</p>
            </div>

            {/* 4. Pathogen & Fungal Risk */}
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-rose-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Fungal / Spore Pathogen Risk
                </span>
                <span className="font-extrabold text-rose-700">35% (Elevated)</span>
              </div>
              <div className="w-full h-2 bg-rose-200 rounded-full overflow-hidden">
                <div className="h-full bg-rose-600 rounded-full" style={{ width: '35%' }} />
              </div>
              <p className="text-[11px] text-gray-600 font-medium">Elevated due to {humidity}% humidity and recent rainfall.</p>
            </div>

          </div>
        </div>

      </div>

      {/* SATELLITE NDVI MULTI-SPECTRAL FIELD MAP */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-black text-base text-agri-dark flex items-center gap-2">
              <Layers className="w-5 h-5 text-agri-primary" /> Sentinel-2 Satellite Multi-Spectral Field Map ({farmerProfile.farmSizeAcres} Acres)
            </h3>
            <p className="text-xs text-gray-500 font-medium">Resolution: 10m Ground Sample Distance • Refreshed 2 Days Ago</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveNDVILayer('ndvi')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeNDVILayer === 'ndvi' ? 'bg-agri-dark text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              NDVI Vigour
            </button>
            <button
              onClick={() => setActiveNDVILayer('moisture')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeNDVILayer === 'moisture' ? 'bg-agri-dark text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              NDRE Moisture
            </button>
            <button
              onClick={() => setActiveNDVILayer('thermal')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeNDVILayer === 'thermal' ? 'bg-agri-dark text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Thermal Canopy
            </button>
          </div>
        </div>

        {/* Raster Map Visualization Canvas */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 aspect-video max-h-72 flex items-center justify-center border border-gray-300 shadow-inner">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" 
            alt="Satellite Raster" 
            className="w-full h-full object-cover opacity-75"
          />

          {/* Raster Colour Overlay */}
          <div className={`absolute inset-0 transition-opacity ${
            activeNDVILayer === 'ndvi' 
              ? 'bg-gradient-to-tr from-emerald-600/50 via-teal-500/40 to-lime-400/40 mix-blend-color' 
              : activeNDVILayer === 'moisture' 
                ? 'bg-gradient-to-tr from-sky-600/50 via-cyan-500/40 to-blue-400/40 mix-blend-color' 
                : 'bg-gradient-to-tr from-amber-600/50 via-orange-500/40 to-rose-400/40 mix-blend-color'
          }`} />

          {/* Field Boundaries Overlay & Zone Labels */}
          <div className="absolute inset-8 border-2 border-dashed border-white/80 rounded-2xl p-4 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-white text-[10px] font-black rounded-lg">
                📍 {farmerProfile.name}'s Farm Parcel ({location.formatted})
              </span>
              <span className="px-3 py-1 bg-emerald-600/90 text-white text-[10px] font-black rounded-lg">
                High Biomass Zone (NDVI: 0.78)
              </span>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[10px] text-white/90 font-bold bg-black/60 px-2 py-0.5 rounded">
                Latitude: {location.lat?.toFixed(3)}°N • Longitude: {location.lng?.toFixed(3)}°E
              </span>
              <span className="text-[10px] text-white/90 font-bold bg-black/60 px-2 py-0.5 rounded">
                Crop: {activeCrop.name}
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2">
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-700">Vegetation Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-gray-600">High Vigour (0.7 - 0.9)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-gray-600">Moderate (0.4 - 0.7)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-gray-600">Stress Zone (&lt; 0.4)</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('cropDoctor')}
            className="text-xs font-bold text-agri-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            Suspect an infected patch? Scan leaf with Crop Doctor →
          </button>
        </div>
      </div>

      {/* PROACTIVE HEALTH ADVISORY BANNER */}
      <div className="p-6 bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 text-white rounded-3xl shadow-ai border border-ai-mauve/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-purple-200 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Health & Biomass Recommendation</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Overall crop health is strong ({activeCrop.healthScore}/100). To protect against fungal spore germination from {humidity}% humidity, apply preventive Trichoderma viride.
          </h3>
          <p className="text-xs text-purple-200/80 font-medium">
            Next satellite pass scheduled in 3 days. Biomass index trending +4.2% over last 14 days.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ai')}
          className="self-start md:self-auto px-5 py-3 bg-white text-ai-plum hover:bg-purple-50 font-black text-xs rounded-2xl shadow-md transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Bot className="w-4 h-4 text-ai-plum" />
          <span>Consult AI Agronomist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
