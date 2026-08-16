import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockCrops } from '../data/mockData';
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
  ShieldCheck
} from 'lucide-react';

export const MyFarmPage = () => {
  const { farmerProfile, location, setActiveTab, t } = useApp();

  const [selectedCropId, setSelectedCropId] = useState(mockCrops[0].id);
  const activeCrop = mockCrops.find(c => c.id === selectedCropId) || mockCrops[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* FARM PROFILE BANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-agri-dark text-white flex items-center justify-center font-bold text-xl shadow-md">
              <Sprout className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-agri-dark font-sans">{farmerProfile.name}'s Farm</h1>
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  Verified Farm Profile
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-earth-terracotta" /> {location.formatted}
              </p>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-agri-bg rounded-2xl border border-agri-soft/30 space-y-1">
            <span className="text-gray-500 font-semibold block">Total Farm Area</span>
            <span className="text-base font-extrabold text-agri-dark">{farmerProfile.farmSizeAcres} Acres</span>
          </div>

          <div className="p-3.5 bg-earth-cream rounded-2xl border border-earth-wheat/30 space-y-1">
            <span className="text-gray-500 font-semibold block">Soil Type</span>
            <span className="text-xs font-bold text-earth-walnut line-clamp-1">{farmerProfile.soilType}</span>
          </div>

          <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
            <span className="text-gray-500 font-semibold block">Irrigation System</span>
            <span className="text-xs font-bold text-sky-950 flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-sky-600" /> {farmerProfile.irrigationType}
            </span>
          </div>

          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
            <span className="text-gray-500 font-semibold block">Active Crops</span>
            <span className="text-base font-extrabold text-purple-950">{mockCrops.length} Registered</span>
          </div>
        </div>
      </div>

      {/* MULTI-CROP SELECTOR TABS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {mockCrops.map((crop) => {
            const isSelected = crop.id === activeCrop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all text-xs font-bold whitespace-nowrap ${
                  isSelected 
                    ? 'bg-agri-dark text-white border-agri-dark shadow-agri scale-102' 
                    : 'bg-white text-gray-700 hover:bg-agri-bg border-gray-200'
                }`}
              >
                <Sprout className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-agri-primary'}`} />
                <span>{crop.name} ({crop.variety})</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
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
              <div className="flex items-center gap-2 text-xs font-bold text-agri-primary uppercase tracking-wide">
                <span>{activeCrop.variety}</span> • <span>{activeCrop.areaAcres} Acres</span>
              </div>
              <h2 className="text-2xl font-extrabold text-agri-dark font-sans">{activeCrop.name} Farm Profile</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 font-bold block">SOWING DATE</span>
                  <span className="font-bold text-gray-800">{activeCrop.sowingDate}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 font-bold block">EXPECTED HARVEST</span>
                  <span className="font-bold text-gray-800">{activeCrop.expectedHarvest}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 font-bold block">SOIL MOISTURE</span>
                  <span className="font-bold text-emerald-700">{activeCrop.soilMoisture}</span>
                </div>
              </div>
            </div>

            {/* Health Index Gauge */}
            <div className="md:col-span-4 bg-gradient-to-br from-agri-bg to-emerald-50 p-5 rounded-3xl border border-agri-soft/40 text-center space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Crop Health Score</span>
              <div className="text-4xl font-extrabold text-agri-dark">{activeCrop.healthScore} <span className="text-lg text-gray-400 font-semibold">/100</span></div>
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">
                {activeCrop.healthStatus}
              </span>
              <p className="text-[11px] text-gray-500 pt-1">
                Pest Risk: <strong className="text-amber-600">{activeCrop.risks.pest}</strong>
              </p>
            </div>

          </div>

          {/* VISUAL CROP LIFECYCLE TIMELINE */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-agri-dark flex items-center gap-2">
                <Calendar className="w-5 h-5 text-earth-terracotta" /> Crop Lifecycle Journey
              </h3>
              <span className="text-xs text-earth-walnut font-bold bg-earth-sand/50 px-3 py-1 rounded-full">
                Current Stage: {activeCrop.currentStage}
              </span>
            </div>

            {/* Stage Progress Nodes */}
            <div className="space-y-4">
              {activeCrop.stages.map((stg, sIdx) => {
                const isCurrent = stg.status === 'current';
                const isCompleted = stg.status === 'completed';

                return (
                  <div 
                    key={sIdx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-agri-bg to-emerald-50 border-agri-primary shadow-md' 
                        : isCompleted 
                          ? 'bg-white border-gray-100 opacity-90'
                          : 'bg-gray-50 border-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Icon Indicator */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCurrent 
                          ? 'bg-agri-primary text-white ring-4 ring-emerald-200' 
                          : isCompleted 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Activity className="w-5 h-5 animate-pulse" /> : <Clock className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${isCurrent ? 'text-agri-dark text-base' : 'text-gray-800'}`}>
                            {stg.name}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">{stg.dates}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{stg.description}</p>
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
