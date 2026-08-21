import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation, getStageTranslation } from '../data/translations';
import { 
  Calendar, 
  Sprout, 
  Clock, 
  CheckCircle2, 
  Activity, 
  Droplet, 
  Sparkles, 
  ShieldAlert, 
  TrendingUp, 
  Plus, 
  Bot, 
  ArrowRight, 
  Award,
  Sun,
  Layers,
  FileCheck
} from 'lucide-react';

export const CropJourneyPage = () => {
  const { crops, farmerProfile, location, agroRegion, setActiveTab, t, showToast } = useApp();

  const [selectedCropId, setSelectedCropId] = useState(crops[0]?.id || 'crop-1');
  const [selectedStageIdx, setSelectedStageIdx] = useState(3); // Default to current flowering stage

  // Activity Diary Log State
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, date: 'Yesterday, 5:30 PM', title: 'Drip Fertigation Cycle (19:19:19 NPK)', plot: 'Plot A', author: 'Ramesh Patel', type: 'Fertigation' },
    { id: 2, date: '3 Days Ago', title: 'Pheromone Trap Inspection (0 bollworm moths caught)', plot: 'Plot A', author: 'Ramesh Patel', type: 'Scouting' },
    { id: 3, date: '1 Week Ago', title: 'Secondary Inter-cultivation & Manual Weeding', plot: 'All Plots', author: 'Farm Crew', type: 'Weeding' },
    { id: 4, date: '2 Weeks Ago', title: 'Basal Soil Application of Micronutrient Zinc Sulphate', plot: 'Plot A & B', author: 'Ramesh Patel', type: 'Nutrition' }
  ]);

  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogType, setNewLogType] = useState('Spraying');
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    if (crops.length > 0 && !crops.some(c => c.id === selectedCropId)) {
      setSelectedCropId(crops[0].id);
    }
  }, [crops, selectedCropId]);

  const activeCrop = crops.find(c => c.id === selectedCropId) || crops[0] || {
    name: 'Cotton',
    variety: 'Bt Hybrid BG-II',
    sowingDate: 'June 15, 2026',
    expectedHarvest: 'November 18, 2026',
    stageProgressPercent: 62,
    healthScore: 88,
    stages: []
  };

  // Comprehensive 6-Stage Lifecycle Blueprint
  const detailedStages = [
    {
      idx: 0,
      name: "Sowing & Seed Treatment",
      timeline: "Days 1 - 10",
      status: "completed",
      dates: "June 15 - June 25",
      gddRequired: "120 GDD",
      waterRequirement: "50 mm (Pre-soaking + Light Germination Irrigation)",
      fertigation: "Basal application: DAP 50 kg + MOP 25 kg + Neem cake 100 kg / acre",
      scouting: "Check for uniform emergence and seed rot / damping off in seedbed.",
      dos: "Treat seeds with Trichoderma viride @ 5g/kg seed before sowing.",
      donts: "Do not sow deeper than 3-4 cm in heavy black cotton soil."
    },
    {
      idx: 1,
      name: "Germination & Seedling Emergence",
      timeline: "Days 11 - 25",
      status: "completed",
      dates: "June 26 - July 10",
      gddRequired: "220 GDD",
      waterRequirement: "75 mm (Maintain moist soil top 10cm)",
      fertigation: "First light fertigation with 12:61:00 (Mono Ammonium Phosphate) @ 3 kg/acre",
      scouting: "Scout for cutworms and early sucking pests (thrips & aphids).",
      dos: "Perform gap filling within 10 days to ensure optimum plant population.",
      donts: "Avoid water stagnation around tender seedling collars."
    },
    {
      idx: 2,
      name: "Vegetative Branching & Monopodial Growth",
      timeline: "Days 26 - 50",
      status: "completed",
      dates: "July 11 - August 04",
      gddRequired: "380 GDD",
      waterRequirement: "140 mm (Regular drip intervals every 3-4 days)",
      fertigation: "Top dressing 1: Urea 35 kg + Magnesium Sulphate 10 kg / acre",
      scouting: "Monitor leaf lamina for jassid hopper burn and leaf curl signs.",
      dos: "Perform inter-cultivation weeding to aerate the root rhizosphere.",
      donts: "Avoid excessive nitrogen which causes lush leafy growth without squares."
    },
    {
      idx: 3,
      name: "Flowering, Squaring & Boll Initiation",
      timeline: "Days 51 - 80 (ACTIVE STAGE)",
      status: "current",
      dates: "August 05 - September 04",
      gddRequired: "490 GDD (Peak Thermal Requirement)",
      waterRequirement: "210 mm (Critical moisture stage - never allow water stress)",
      fertigation: "Top dressing 2: 13:00:45 (Potassium Nitrate) @ 4 kg/acre + Boron 20% @ 250g/acre foliar",
      scouting: "Check 20 green squares/bolls weekly for pink bollworm entry holes and rosette blooms.",
      dos: "Install 8 pheromone traps per acre with Gossyplure lures for mating disruption.",
      donts: "Do not spray broad-spectrum insecticides during peak morning pollinator bee activity (8-11 AM)."
    },
    {
      idx: 4,
      name: "Boll Maturation & Fiber Bulking",
      timeline: "Days 81 - 120",
      status: "upcoming",
      dates: "September 05 - October 15",
      gddRequired: "420 GDD",
      waterRequirement: "160 mm (Gradual reduction as bolls begin opening)",
      fertigation: "Foliar spray of 00:00:50 (Sulphate of Potash) @ 5g/L to maximize staple strength",
      scouting: "Monitor internal boll rot and whitefly sooty mold honeydew accumulations.",
      dos: "Ensure proper air circulation between rows by trimming overgrown lateral branches.",
      donts: "Stop nitrogen application completely to facilitate uniform boll burst."
    },
    {
      idx: 5,
      name: "Defoliation & Multi-Flush Harvesting",
      timeline: "Days 121 - 140",
      status: "upcoming",
      dates: "October 16 - November 18",
      gddRequired: "240 GDD",
      waterRequirement: "30 mm (Stop irrigation 10-14 days before harvest picking)",
      fertigation: "No chemical fertilizers. Clean field picking only.",
      scouting: "Inspect lint moisture (keep below 8% before storing in godown).",
      dos: "Pick opened bolls in dry sunny afternoon hours; store in dry cotton bags.",
      donts: "Do not mix stained or insect-damaged cotton with prime first-pick lint."
    }
  ];

  const activeStageDetail = detailedStages[selectedStageIdx] || detailedStages[3];

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: 'Just now',
      title: newLogTitle,
      plot: 'Plot A',
      author: farmerProfile.name || 'Farmer',
      type: newLogType
    };
    setActivityLogs([newEntry, ...activityLogs]);
    setNewLogTitle('');
    setShowLogModal(false);
    showToast('Farming activity recorded in crop journey diary!', 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-agri-dark uppercase tracking-widest mb-1">
            <Calendar className="w-4 h-4 text-agri-primary" /> Crop Phenology & Lifecycle Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            Crop Growth Journey & Operations
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Stage-by-stage agronomic roadmap, water requirements, nutrient windows, and harvest forecasting.
          </p>
        </div>

        {/* Multi-Crop Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCropId(crop.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCropId === crop.id
                  ? 'bg-agri-dark text-white shadow-agri border border-gov-gold/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌱 {getCropTranslation(crop.name, t)} ({crop.variety})
            </button>
          ))}
        </div>
      </div>

      {/* CROP LIFECYCLE SUMMARY HERO CARD */}
      <div className="bg-gradient-to-r from-agri-dark via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gov-gold/30 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-gov-gold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-gov-gold" /> Active Phenological Phase
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {getCropTranslation(activeCrop.name, t)} • {detailedStages[3].name}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
              Sown on {activeCrop.sowingDate} • Target Harvest Window: {activeCrop.expectedHarvest}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 px-5 py-3.5 rounded-2xl backdrop-blur-md border border-white/20">
            <Award className="w-8 h-8 text-gov-gold flex-shrink-0" />
            <div>
              <div className="text-[10px] text-emerald-200 uppercase font-black tracking-wider">HARVEST COUNTDOWN</div>
              <div className="text-xl font-black text-white">42 Days Left</div>
              <span className="text-[10px] text-emerald-300 font-semibold">Yield Est: 13.5 Qtnl/Acre</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-emerald-200">
            <span>Overall Lifecycle Progress (Day 58 of 140)</span>
            <span className="font-black text-white">{activeCrop.stageProgressPercent}% Completed</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-gov-gold rounded-full transition-all duration-500"
              style={{ width: `${activeCrop.stageProgressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* INTERACTIVE 6-STAGE TIMELINE TRACKER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="text-lg font-black text-agri-dark flex items-center gap-2">
            <Layers className="w-5 h-5 text-agri-primary" /> Growth Stage Roadmap (Click any stage to view protocol)
          </h3>
          <span className="text-xs font-bold text-gray-500">6 Stages Configured</span>
        </div>

        {/* Stage Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {detailedStages.map((stage) => {
            const isSelected = selectedStageIdx === stage.idx;
            const isCurrent = stage.status === 'current';
            const isCompleted = stage.status === 'completed';

            return (
              <button
                key={stage.idx}
                onClick={() => setSelectedStageIdx(stage.idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  isSelected
                    ? 'bg-agri-dark text-white border-agri-dark shadow-agri scale-102'
                    : isCurrent
                      ? 'bg-emerald-50 border-emerald-300 text-agri-dark shadow-xs'
                      : isCompleted
                        ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        : 'bg-gray-50/60 border-dashed border-gray-200 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase ${isSelected ? 'text-emerald-300' : 'text-gray-400'}`}>
                    Stage {stage.idx + 1}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />
                  ) : isCurrent ? (
                    <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>

                <div>
                  <div className={`text-xs font-black line-clamp-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {stage.name}
                  </div>
                  <div className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-gray-500'}`}>
                    {stage.timeline}
                  </div>
                </div>

                <div className={`text-[9px] font-bold uppercase pt-1 border-t ${
                  isSelected ? 'border-white/20 text-emerald-200' : 'border-gray-200 text-gray-400'
                }`}>
                  {stage.status}
                </div>
              </button>
            );
          })}
        </div>

        {/* SELECTED STAGE DETAILED AGRONOMIC PROTOCOL */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-agri-bg via-white to-earth-cream/40 border border-agri-soft/50 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-agri-soft/40 pb-4">
            <div>
              <span className="text-[10px] font-black text-agri-primary uppercase tracking-widest block">
                STAGE {activeStageDetail.idx + 1} PROTOCOL & ACTION ADVISORY
              </span>
              <h4 className="text-xl font-black text-agri-dark">{activeStageDetail.name} ({activeStageDetail.timeline})</h4>
              <span className="text-xs text-gray-500 font-medium">Estimated window: {activeStageDetail.dates} • Thermal Demand: {activeStageDetail.gddRequired}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('ai')}
                className="flex items-center gap-1.5 px-4 py-2 bg-ai-plum hover:bg-ai-purple text-white text-xs font-extrabold rounded-xl shadow-ai transition-colors cursor-pointer"
              >
                <Bot className="w-4 h-4 text-purple-200" />
                <span>Ask AI About This Stage</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Fertigation & Nutrients */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-1.5">
              <span className="font-black text-agri-dark flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-gov-gold" /> 🧪 Critical Fertigation & Nutrition
              </span>
              <p className="text-gray-700 leading-relaxed font-bold">{activeStageDetail.fertigation}</p>
            </div>

            {/* Water & Irrigation */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-1.5">
              <span className="font-black text-sky-950 flex items-center gap-1.5 uppercase tracking-wide">
                <Droplet className="w-4 h-4 text-sky-600" /> 💧 Water Requirement
              </span>
              <p className="text-gray-700 leading-relaxed font-bold">{activeStageDetail.waterRequirement}</p>
            </div>

            {/* Pest Scouting */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-1.5">
              <span className="font-black text-rose-950 flex items-center gap-1.5 uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-rose-600" /> 🔍 Pest & Disease Scouting Protocol
              </span>
              <p className="text-gray-700 leading-relaxed font-medium">{activeStageDetail.scouting}</p>
            </div>

            {/* Dos and Don'ts */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-1.5">
              <span className="font-black text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 🌾 Agronomist Recommendations
              </span>
              <p className="text-emerald-900 font-bold mb-1">Do: {activeStageDetail.dos}</p>
              <p className="text-rose-900 font-semibold">Avoid: {activeStageDetail.donts}</p>
            </div>

          </div>

        </div>

      </div>

      {/* DIGITAL FARMING ACTIVITY DIARY */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-agri-dark flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-earth-terracotta" /> Farming Operations Log & Crop Diary
            </h3>
            <p className="text-xs text-gray-500 font-medium">Record every spray, irrigation cycle, weeding, and nutrient application for audit and yield tracking.</p>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-agri-dark hover:bg-agri-primary text-white text-xs font-black rounded-2xl shadow-agri transition-colors cursor-pointer border border-gov-gold/30"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            <span>Log New Activity</span>
          </button>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div key={log.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-agri-bg text-agri-primary flex items-center justify-center font-bold flex-shrink-0 mt-0.5 border border-agri-soft">
                  ✓
                </div>
                <div>
                  <span className="font-black text-gray-900 block text-sm">{log.title}</span>
                  <span className="text-gray-500 font-medium">{log.plot} • Performed by {log.author}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 block mb-1">
                  {log.type}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold">{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD ACTIVITY MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <h3 className="text-lg font-black text-agri-dark">Record Farming Activity</h3>
            
            <form onSubmit={handleAddLog} className="space-y-4 text-xs">
              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Activity Title & Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Applied 2nd dose of Urea + Micronutrient zinc"
                  value={newLogTitle}
                  onChange={(e) => setNewLogTitle(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
                  required
                />
              </div>

              <div>
                <label className="font-extrabold text-gray-700 block mb-1">Operation Category</label>
                <select 
                  value={newLogType} 
                  onChange={(e) => setNewLogType(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
                >
                  <option value="Fertigation">Fertigation / Nutrient Feeding</option>
                  <option value="Spraying">Pesticide / Bio-control Spraying</option>
                  <option value="Irrigation">Irrigation Watering Cycle</option>
                  <option value="Weeding">Inter-cultivation & Weeding</option>
                  <option value="Scouting">Pest Scouting & Trap Check</option>
                  <option value="Harvesting">Picking / Harvesting</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-agri-dark hover:bg-agri-primary text-white font-black rounded-xl shadow-agri cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
