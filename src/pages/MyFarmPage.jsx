import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation, getStageTranslation, getSoilTranslation } from '../data/translations';
import { 
  Sprout, 
  MapPin, 
  Droplet, 
  Layers, 
  Calendar, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck,
  Bot,
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react';

export const MyFarmPage = () => {
  const { farmerProfile, location, agroRegion, crops, setActiveTab, t } = useApp();

  const [selectedCropId, setSelectedCropId] = useState(crops[0]?.id);

  // Update selected crop if crops list changes (e.g. location changed)
  useEffect(() => {
    if (crops.length > 0 && !crops.some(c => c.id === selectedCropId)) {
      setSelectedCropId(crops[0].id);
    }
  }, [crops, selectedCropId]);

  const activeCrop = crops.find(c => c.id === selectedCropId) || crops[0];

  if (!activeCrop) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-gray-100">
        <p className="text-gray-500">No active crops registered for this location yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* FARM PROFILE BANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-agri-dark text-white flex items-center justify-center font-bold text-xl shadow-md border border-gov-gold/40">
              <Sprout className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-agri-dark font-sans tracking-tight">{farmerProfile.name}'s Farm</h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  {location.isGpsVerified ? "GPS Grounded Telemetry" : "Verified Farm Telemetry"}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-earth-terracotta" /> {location.formatted} • <strong className="text-agri-dark">{agroRegion?.agroZone || "Agro-Zone"}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="self-start sm:self-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
          >
            {t.myFarm?.editProfile || "Edit Farm Parameters"}
          </button>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/40 space-y-1">
            <span className="text-gray-500 font-bold block text-[10px] uppercase tracking-wider">
              {t.myFarm?.totalArea || "Total Farm Area"}
            </span>
            <span className="text-base font-black text-agri-dark">
              {farmerProfile.farmSizeAcres} {t.dashboard?.acresUnit || "Acres"}
            </span>
          </div>

          <div className="p-4 bg-earth-cream rounded-2xl border border-earth-wheat/40 space-y-1">
            <span className="text-gray-500 font-bold block text-[10px] uppercase tracking-wider">
              {t.myFarm?.soilType || "Soil Type"}
            </span>
            <span className="text-xs font-black text-earth-walnut line-clamp-1">
              {getSoilTranslation(farmerProfile.soilType, t)}
            </span>
          </div>

          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
            <span className="text-gray-500 font-bold block text-[10px] uppercase tracking-wider">
              {t.myFarm?.irrigation || "Irrigation System"}
            </span>
            <span className="text-xs font-black text-sky-950 flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-sky-600" /> {farmerProfile.irrigationType}
            </span>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
            <span className="text-gray-500 font-bold block text-[10px] uppercase tracking-wider">
              {t.myFarm?.activeCrops || "Active Crops"}
            </span>
            <span className="text-base font-black text-purple-950">{crops.length} Registered</span>
          </div>
        </div>
      </div>

      {/* MULTI-CROP SELECTOR TABS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {crops.map((crop) => {
            const isSelected = crop.id === activeCrop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all text-xs font-black whitespace-nowrap cursor-pointer ${
                  isSelected 
                    ? 'bg-agri-dark text-white border-agri-dark shadow-agri scale-102 border-gov-gold/40' 
                    : 'bg-white text-gray-700 hover:bg-agri-bg border-gray-200'
                }`}
              >
                <Sprout className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-agri-primary'}`} />
                <span>{getCropTranslation(crop.name, t)} ({crop.variety})</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-100 text-gray-600'
                }`}>
                  {crop.healthScore}/100
                </span>
              </button>
            );
          })}
        </div>

        {/* SELECTED CROP DETAILS & HEALTH SCORE */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-agri-primary uppercase tracking-wider">
                <span>{activeCrop.variety}</span> • <span>{activeCrop.areaAcres} {t.dashboard?.acresUnit || "Acres"}</span>
              </div>
              <h2 className="text-2xl font-black text-agri-dark font-sans">
                {getCropTranslation(activeCrop.name, t)} Farm Telemetry
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-gray-400 font-extrabold text-[10px] uppercase block">SOWING DATE</span>
                  <span className="font-bold text-gray-800">{activeCrop.sowingDate}</span>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-gray-400 font-extrabold text-[10px] uppercase block">EXPECTED HARVEST</span>
                  <span className="font-bold text-gray-800">{activeCrop.expectedHarvest}</span>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-gray-400 font-extrabold text-[10px] uppercase block">SOIL MOISTURE</span>
                  <span className="font-extrabold text-emerald-700">{activeCrop.soilMoisture}</span>
                </div>
              </div>
            </div>

            {/* Health Index Gauge */}
            <div className="md:col-span-4 bg-gradient-to-br from-agri-bg to-emerald-50 p-6 rounded-3xl border border-agri-soft/50 text-center space-y-2 shadow-xs">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest block">
                {t.myFarm?.healthScore || "Crop Health Score"}
              </span>
              <div className="text-4xl font-black text-agri-dark">{activeCrop.healthScore} <span className="text-lg text-gray-400 font-semibold">/100</span></div>
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-full shadow-xs">
                {activeCrop.healthStatus}
              </span>
              <p className="text-[11px] text-gray-500 pt-1 font-semibold">
                Pest Risk: <strong className="text-amber-600">{activeCrop.risks?.pest || "Low"}</strong>
              </p>
            </div>

          </div>

          {/* AI ADVISORY QUICK BUTTON FOR THIS CROP */}
          <div className="p-4 bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-ai border border-ai-mauve/40">
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-purple-200" />
              <span className="text-xs font-bold">
                {getCropTranslation(activeCrop.name, t)} ({getStageTranslation(activeCrop.currentStage, t)})
              </span>
            </div>
            <button
              onClick={() => setActiveTab('ai')}
              className="px-4 py-2 bg-white text-ai-plum hover:bg-purple-50 text-xs font-extrabold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-ai-purple" /> {t.myFarm?.consultAi || "Consult AI Assistant About This Stage"}
            </button>
          </div>

          {/* VISUAL CROP LIFECYCLE TIMELINE */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-agri-dark flex items-center gap-2">
                <Calendar className="w-5 h-5 text-earth-terracotta" /> {t.myFarm?.lifecycle || "Crop Lifecycle Journey"}
              </h3>
              <span className="text-xs text-earth-walnut font-bold bg-earth-sand/60 px-3.5 py-1 rounded-full border border-earth-wheat/30">
                {t.dashboard?.stageLabel || "Current Stage"}: {getStageTranslation(activeCrop.currentStage, t)}
              </span>
            </div>

            {/* Stage Progress Nodes */}
            <div className="space-y-4">
              {activeCrop.stages?.map((stg, sIdx) => {
                const isCurrent = stg.status === 'current';
                const isCompleted = stg.status === 'completed';

                return (
                  <div 
                    key={sIdx}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-agri-bg to-emerald-50 border-agri-primary shadow-md' 
                        : isCompleted 
                          ? 'bg-white border-gray-100 opacity-90'
                          : 'bg-gray-50 border-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Icon Indicator */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCurrent 
                          ? 'bg-agri-primary text-white ring-4 ring-emerald-200 shadow-md' 
                          : isCompleted 
                            ? 'bg-emerald-100 text-emerald-800 font-bold' 
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Activity className="w-5 h-5 animate-pulse" /> : <Clock className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-black ${isCurrent ? 'text-agri-dark text-base' : 'text-gray-800'}`}>
                            {getStageTranslation(stg.name, t)}
                          </span>
                          <span className="text-xs text-gray-500 font-bold">{stg.dates}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">{stg.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
