import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation, getSoilTranslation } from '../data/translations';
import { 
  Sprout, 
  MapPin, 
  Droplet, 
  Layers, 
  CheckCircle2, 
  ShieldCheck,
  Bot,
  Sparkles,
  ArrowRight,
  Compass,
  Cpu,
  Power,
  Package,
  Wrench,
  Thermometer,
  Gauge,
  Calendar,
  ChevronRight
} from 'lucide-react';

export const MyFarmPage = () => {
  const { farmerProfile, location, agroRegion, crops, setActiveTab, t } = useApp();

  const [selectedParcelIdx, setSelectedParcelIdx] = useState(0);
  const [pumpRunning, setPumpRunning] = useState(true);

  const farmSizeNum = Number(farmerProfile?.farmSizeAcres) || 4.5;
  const cropsList = Array.isArray(crops) && crops.length > 0 ? crops : [{ name: "Cotton", variety: "Hybrid BG-II" }];

  const parcels = [
    {
      id: "PARCEL-A",
      name: "North Field Parcel (Block 1)",
      areaAcres: (farmSizeNum * 0.6).toFixed(1),
      crop: cropsList[0]?.name || "Cotton",
      variety: cropsList[0]?.variety || "Bt Hybrid BG-II",
      soilMoisture: "68%",
      soilHealth: "Optimal",
      irrigationZone: "Zone 1 - Drip Line Active",
      lastFertigation: "3 Days ago (19:19:19 NPK)"
    },
    {
      id: "PARCEL-B",
      name: "Canal Side Parcel (Block 2)",
      areaAcres: (farmSizeNum * 0.4).toFixed(1),
      crop: cropsList[1]?.name || cropsList[0]?.name || "Wheat",
      variety: cropsList[1]?.variety || "GW-496",
      soilMoisture: "72%",
      soilHealth: "Good",
      irrigationZone: "Zone 2 - Micro-Sprinkler Standby",
      lastFertigation: "6 Days ago (Urea Top-dress)"
    }
  ];

  const activeParcel = parcels[selectedParcelIdx] || parcels[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-agri-dark uppercase tracking-widest mb-1">
            <Sprout className="w-4 h-4 text-agri-primary" /> Farm Infrastructure & Land Parcels
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {farmerProfile.name}'s Farm Management Hub
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            {farmerProfile.farmSizeAcres} Acre holding in {location.formatted} • {agroRegion?.agroZone || "Agro-Climatic Zone"}.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('profile')}
          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold rounded-2xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          {t.myFarm?.editProfile || "Edit Farm Parameters"}
        </button>
      </div>

      {/* FARM INFRASTRUCTURE KPI TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        
        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-gray-400 font-black uppercase text-[10px] tracking-wider block">
            {t.myFarm?.totalArea || "Total Farm Area"}
          </span>
          <div className="text-2xl font-black text-agri-dark">
            {farmerProfile.farmSizeAcres} <span className="text-xs font-normal text-gray-500">{t.dashboard?.acresUnit || "Acres"}</span>
          </div>
          <span className="text-[11px] font-extrabold text-agri-primary block">
            {parcels.length} Registered Land Parcels
          </span>
        </div>

        <div className="p-5 bg-earth-cream rounded-3xl border border-earth-wheat/40 shadow-sm space-y-1">
          <span className="text-earth-soil font-black uppercase text-[10px] tracking-wider block">
            {t.myFarm?.soilType || "Soil Classification"}
          </span>
          <div className="text-xs font-black text-earth-walnut line-clamp-1">
            {getSoilTranslation(farmerProfile.soilType, t)}
          </div>
          <span className="text-[11px] text-gray-600 font-semibold block">
            pH: 6.8 • Organic C: 0.72%
          </span>
        </div>

        <div className="p-5 bg-sky-50 rounded-3xl border border-sky-200 shadow-sm space-y-1">
          <span className="text-sky-900 font-black uppercase text-[10px] tracking-wider block">
            {t.myFarm?.irrigation || "Irrigation Network"}
          </span>
          <div className="text-xs font-black text-sky-950 flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-sky-600" />
            <span className="truncate">{farmerProfile.irrigationType?.split('+')[0] || "Drip System"}</span>
          </div>
          <span className="text-[11px] font-bold text-sky-700 block">
            Pump: {pumpRunning ? "🟢 Active (5.0 HP)" : "⚪ Idle"}
          </span>
        </div>

        <div className="p-5 bg-purple-50 rounded-3xl border border-purple-200 shadow-sm space-y-1">
          <span className="text-purple-900 font-black uppercase text-[10px] tracking-wider block">
            {t.myFarm?.activeCrops || "Registered Crops"}
          </span>
          <div className="text-2xl font-black text-purple-950">
            {crops.length} <span className="text-xs font-normal text-gray-500">Crops</span>
          </div>
          <span className="text-[11px] font-bold text-ai-plum block">
            {crops.map(c => c.name).join(', ')}
          </span>
        </div>

      </div>

      {/* REGISTERED LAND PARCELS SECTION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-black text-lg text-agri-dark flex items-center gap-2">
              <Layers className="w-5 h-5 text-agri-primary" /> Registered Field Parcels ({parcels.length})
            </h3>
            <p className="text-xs text-gray-500 font-medium">Select a parcel to inspect live irrigation lines and field telemetry.</p>
          </div>

          <div className="flex items-center gap-2">
            {parcels.map((pcl, idx) => (
              <button
                key={pcl.id}
                onClick={() => setSelectedParcelIdx(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedParcelIdx === idx
                    ? 'bg-agri-dark text-white shadow-agri'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {pcl.name.split(' ')[0]} {pcl.name.split(' ')[1]} ({pcl.areaAcres} Ac)
              </button>
            ))}
          </div>
        </div>

        {/* Selected Parcel Details Card */}
        <div className="p-6 bg-agri-bg rounded-3xl border border-agri-soft/50 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black text-agri-primary uppercase tracking-widest block">
                {activeParcel.id} • {activeParcel.areaAcres} ACRES
              </span>
              <h4 className="text-xl font-black text-agri-dark">{activeParcel.name}</h4>
              <p className="text-xs text-gray-600 font-medium mt-0.5">
                Active Crop: <strong>{activeParcel.crop}</strong> ({activeParcel.variety})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('cropJourney')}
                className="px-4 py-2 bg-white hover:bg-gray-50 text-agri-dark font-extrabold text-xs rounded-xl border border-gray-200 shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-agri-primary" />
                <span>Crop Roadmap</span>
              </button>
              <button
                onClick={() => setActiveTab('cropHealth')}
                className="px-4 py-2 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs rounded-xl shadow-agri cursor-pointer flex items-center gap-1.5"
              >
                <Gauge className="w-3.5 h-3.5 text-emerald-300" />
                <span>Health Index</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3.5 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] text-gray-400 font-black uppercase block">SOIL MOISTURE</span>
              <span className="font-extrabold text-emerald-800 text-sm">{activeParcel.soilMoisture}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] text-gray-400 font-black uppercase block">IRRIGATION ZONE</span>
              <span className="font-bold text-gray-800 text-xs truncate block">{activeParcel.irrigationZone}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] text-gray-400 font-black uppercase block">LAST FERTIGATION</span>
              <span className="font-bold text-gray-800 text-xs">{activeParcel.lastFertigation}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] text-gray-400 font-black uppercase block">SOIL HEALTH</span>
              <span className="font-extrabold text-emerald-700 text-sm">{activeParcel.soilHealth}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SOIL N-P-K & CHEMICAL NUTRIENT STATUS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-black text-lg text-agri-dark flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-earth-terracotta" /> Soil Health Card & N-P-K Telemetry
            </h3>
            <p className="text-xs text-gray-500 font-medium">Laboratory soil sample analysis for {farmerProfile.name}'s land.</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full border border-emerald-300">
            Soil Health: Grade A
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Nitrogen */}
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-emerald-950">Nitrogen (N)</span>
              <span className="font-extrabold text-emerald-800 bg-white px-2 py-0.5 rounded-md">240 kg/ha</span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: '65%' }} />
            </div>
            <span className="text-[10px] text-emerald-900 font-bold block">Status: Medium / Sufficient</span>
          </div>

          {/* Phosphorus */}
          <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-purple-950">Phosphorus (P)</span>
              <span className="font-extrabold text-purple-800 bg-white px-2 py-0.5 rounded-md">22 kg/ha</span>
            </div>
            <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '75%' }} />
            </div>
            <span className="text-[10px] text-purple-900 font-bold block">Status: Optimal</span>
          </div>

          {/* Potassium */}
          <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-amber-950">Potassium (K)</span>
              <span className="font-extrabold text-amber-800 bg-white px-2 py-0.5 rounded-md">310 kg/ha</span>
            </div>
            <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="text-[10px] text-amber-900 font-bold block">Status: High / Rich</span>
          </div>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-gray-400 font-black text-[10px] uppercase block">SOIL PH</span>
            <span className="font-black text-gray-800 text-sm">6.8 (Neutral)</span>
          </div>
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-gray-400 font-black text-[10px] uppercase block">ORGANIC CARBON</span>
            <span className="font-black text-gray-800 text-sm">0.72% (Good)</span>
          </div>
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-gray-400 font-black text-[10px] uppercase block">ELECTRICAL COND.</span>
            <span className="font-black text-gray-800 text-sm">0.45 dS/m</span>
          </div>
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-gray-400 font-black text-[10px] uppercase block">ZINC & MICRONUTRIENTS</span>
            <span className="font-black text-emerald-700 text-sm">0.82 ppm (Adequate)</span>
          </div>
        </div>
      </div>

      {/* FARM ASSETS & INPUTS INVENTORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Seeds & Fertilizers in Storage */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h4 className="font-black text-base text-agri-dark flex items-center gap-2">
            <Package className="w-5 h-5 text-agri-primary" /> Agri Inputs in Stock
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800">Bt Cotton Hybrid BG-II Seeds</span>
              <span className="font-extrabold text-agri-primary">3 Packets</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800">19:19:19 NPK Water Soluble</span>
              <span className="font-extrabold text-agri-primary">25 kg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800">Neem Oil (10,000 ppm)</span>
              <span className="font-extrabold text-agri-primary">5 Litres</span>
            </div>
          </div>
        </div>

        {/* Equipment & Farm Machinery */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h4 className="font-black text-base text-agri-dark flex items-center gap-2">
            <Wrench className="w-5 h-5 text-earth-walnut" /> Farm Machinery & Equipment
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800">45 HP Tractor with Cultivator</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">Operational</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800">Battery Knapsack Sprayer (16L)</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">Charged 95%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800">Automatic Drip Fertigation Venturi</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">Calibrated</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
