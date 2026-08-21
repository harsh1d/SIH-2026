import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation, getStageTranslation } from '../data/translations';
import { 
  Calendar, 
  Sprout, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Droplets, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight, 
  Plus, 
  Layers, 
  ChevronRight, 
  Bot, 
  ThermometerSun, 
  Check, 
  FileText,
  MapPin
} from 'lucide-react';

export const CropJourneyPage = () => {
  const { farmerProfile, location, agroRegion, crops, setActiveTab, t, showToast } = useApp();

  const [selectedCropId, setSelectedCropId] = useState(crops[0]?.id);
  const [activeStageIdx, setActiveStageIdx] = useState(2); // Stage 3 (Flowering) by default
  const [logNotes, setLogNotes] = useState([
    { id: 1, date: "3 Days ago", stage: "Flowering & Square Formation", text: "Completed foliar spray of Boron 20% (1g/L) across 2.5 acres to enhance flower retention.", author: farmerProfile.name },
    { id: 2, date: "10 Days ago", stage: "Vegetative Growth & Branching", text: "Drip fertigation with 19:19:19 NPK (5 kg/acre) completed. Crop canopy looking healthy and vigorous.", author: farmerProfile.name }
  ]);
  const [newLogText, setNewLogText] = useState('');

  useEffect(() => {
    if (crops.length > 0 && !crops.some(c => c.id === selectedCropId)) {
      setSelectedCropId(crops[0].id);
    }
  }, [crops, selectedCropId]);

  const activeCrop = crops.find(c => c.id === selectedCropId) || crops[0] || {
    name: "Cotton",
    variety: "Hybrid BG-II",
    sowingDate: "June 15, 2026",
    expectedHarvest: "November 20, 2026",
    stages: []
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: "Just now",
      stage: activeCrop.stages?.[activeStageIdx]?.name || "Active Growth",
      text: newLogText.trim(),
      author: farmerProfile.name
    };

    setLogNotes([newEntry, ...logNotes]);
    setNewLogText('');
    showToast('Field activity logged successfully to Crop Journey!', 'success');
  };

  const selectedStageData = activeCrop.stages?.[activeStageIdx] || activeCrop.stages?.[2] || {
    name: "Flowering & Square Formation",
    dates: "Day 56 - 85",
    description: "Active flowering and green boll development.",
    status: "current"
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-earth-walnut uppercase tracking-widest mb-1">
            <Calendar className="w-4 h-4 text-earth-terracotta" /> Phenological Progression & Milestones
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            Crop Lifecycle Journey & Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Stage-by-stage agronomic milestones, fertigation schedules, and thermal degree day tracking for {location.formatted}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-agri-dark bg-agri-bg px-4 py-2.5 rounded-2xl border border-agri-soft/50 shadow-xs">
          <MapPin className="w-4 h-4 text-earth-terracotta" /> {agroRegion?.agroZone || "Agro-Climatic Zone"}
        </div>
      </div>

      {/* CROP SELECTOR TABS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {crops.map((crop) => {
          const isSelected = crop.id === activeCrop.id;
          return (
            <button
              key={crop.id}
              onClick={() => {
                setSelectedCropId(crop.id);
                setActiveStageIdx(2);
              }}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all text-xs font-black whitespace-nowrap cursor-pointer ${
                isSelected 
                  ? 'bg-agri-dark text-white border-agri-dark shadow-agri scale-102 border-gov-gold/40' 
                  : 'bg-white text-gray-700 hover:bg-agri-bg border-gray-200'
              }`}
            >
              <Sprout className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-agri-primary'}`} />
              <span>{getCropTranslation(crop.name, t)} ({crop.variety})</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-100 text-gray-600'
              }`}>
                {crop.currentStage?.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* CROP JOURNEY ROADMAP HERO */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl space-y-8">
        
        {/* Top Summary Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-agri-primary uppercase tracking-wider mb-1">
              <span>{activeCrop.variety}</span> • <span>{activeCrop.areaAcres} Acres</span>
            </div>
            <h2 className="text-2xl font-black text-agri-dark tracking-tight">
              {getCropTranslation(activeCrop.name, t)} Growth Roadmap
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium mt-1">
              <span>🌱 Sowing Date: <strong className="text-gray-800">{activeCrop.sowingDate}</strong></span>
              <span>🌾 Expected Harvest: <strong className="text-gray-800">{activeCrop.expectedHarvest}</strong></span>
              <span>⏱️ Total Crop Duration: <strong className="text-gray-800">145 - 160 Days</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200">
            <ThermometerSun className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-gray-500 font-black uppercase">THERMAL HEAT ACCUMULATION</div>
              <div className="text-lg font-black text-emerald-950">840 / 1280 GDD</div>
              <span className="text-[10px] text-emerald-700 font-bold">Growing Degree Days on schedule</span>
            </div>
          </div>
        </div>

        {/* 5-STAGE INTERACTIVE PROGRESSION NODES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
              5-Stage Phenological Milestones (Click to Inspect Any Stage)
            </span>
            <span className="text-xs font-bold text-agri-primary">
              Active Stage: {getStageTranslation(activeCrop.currentStage, t)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {activeCrop.stages?.map((stg, idx) => {
              const isSelected = idx === activeStageIdx;
              const isCurrent = stg.status === 'current';
              const isCompleted = stg.status === 'completed';

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-2 cursor-pointer ${
                    isSelected 
                      ? 'bg-agri-dark text-white border-agri-dark shadow-agri ring-2 ring-emerald-400/50' 
                      : isCompleted 
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 hover:bg-emerald-100' 
                        : isCurrent 
                          ? 'bg-gradient-to-br from-agri-bg to-emerald-50 border-agri-primary text-agri-dark' 
                          : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      isSelected ? 'text-emerald-300' : isCompleted ? 'text-emerald-700' : 'text-gray-400'
                    }`}>
                      Stage {idx + 1}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-gray-300" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className={`text-xs font-black line-clamp-1 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                      {getStageTranslation(stg.name, t)}
                    </div>
                    <div className={`text-[10px] font-medium ${isSelected ? 'text-emerald-200' : 'text-gray-500'}`}>
                      {stg.dates}
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase bg-emerald-600 text-white rounded-full self-start">
                      In Progress
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED STAGE DETAILED TASK MATRIX */}
        <div className="bg-agri-bg rounded-3xl p-6 border border-agri-soft/50 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-agri-soft/40 pb-4">
            <div>
              <span className="text-[10px] font-black text-agri-primary uppercase tracking-wider block">
                Detailed Agronomic Protocol for Stage {activeStageIdx + 1}
              </span>
              <h3 className="text-xl font-black text-agri-dark">
                {getStageTranslation(selectedStageData.name, t)} ({selectedStageData.dates})
              </h3>
              <p className="text-xs text-gray-600 font-medium mt-0.5">{selectedStageData.description}</p>
            </div>

            <button
              onClick={() => setActiveTab('ai')}
              className="flex items-center gap-1.5 px-4 py-2 bg-white text-ai-plum hover:bg-purple-50 font-extrabold text-xs rounded-xl shadow-xs border border-purple-200 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-ai-purple" />
              <span>Ask AI About This Stage</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Fertigation & Nutrition */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 font-black text-emerald-950 uppercase tracking-wide">
                <Droplets className="w-4 h-4 text-emerald-600" />
                <span>Fertigation & Nutrition</span>
              </div>
              <ul className="space-y-1.5 text-gray-700 font-medium pl-4 list-disc">
                <li>Apply <strong>13:0:45 (Potassium Nitrate) @ 5g/L</strong> to support floral retention.</li>
                <li>Foliar spray of <strong>Boron 20% @ 1g/L</strong> during cool evening hours.</li>
                <li>Avoid excessive nitrogen at this stage to prevent vegetative lodging.</li>
              </ul>
            </div>

            {/* Crop Protection & Pest Scouting */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 font-black text-rose-950 uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Pest & Disease Scouting</span>
              </div>
              <ul className="space-y-1.5 text-gray-700 font-medium pl-4 list-disc">
                <li>Install <strong>8 Pheromone Traps/Acre</strong> for early Pink Bollworm detection.</li>
                <li>Scout lower leaves for fungal spot lesions; maintain row spacing.</li>
                <li>Use yellow sticky traps (10/acre) for whitefly & aphid control.</li>
              </ul>
            </div>

            {/* Moisture & Irrigation Management */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 font-black text-sky-950 uppercase tracking-wide">
                <Activity className="w-4 h-4 text-sky-600" />
                <span>Water & Soil Moisture</span>
              </div>
              <ul className="space-y-1.5 text-gray-700 font-medium pl-4 list-disc">
                <li>Maintain <strong>65% to 75%</strong> root zone soil moisture.</li>
                <li>Schedule drip cycle every 3rd day for 90 minutes.</li>
                <li>Ensure proper field drainage if heavy rainfall occurs.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* FIELD ACTIVITY LOG RECORDER */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-agri-dark flex items-center gap-2">
              <FileText className="w-5 h-5 text-earth-terracotta" /> Field Observation & Activity Log
            </h3>
            <span className="text-xs text-gray-500 font-medium">Recorded Timeline ({logNotes.length} Entries)</span>
          </div>

          {/* Quick Input Bar */}
          <form onSubmit={handleAddLog} className="flex gap-2">
            <input
              type="text"
              placeholder={`Log field activity or observation for ${activeCrop.name} (e.g. "Completed boron foliar spray today")...`}
              value={newLogText}
              onChange={(e) => setNewLogText(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary focus:bg-white"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs rounded-2xl shadow-agri transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Log Action</span>
            </button>
          </form>

          {/* Log Entries List */}
          <div className="space-y-2.5 pt-2">
            {logNotes.map((entry) => (
              <div key={entry.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-agri-dark">{entry.stage}</span>
                    <span className="text-[10px] text-gray-400 font-bold">• {entry.date}</span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{entry.text}</p>
                </div>
                <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">By {entry.author}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
