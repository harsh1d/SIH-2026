import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation, getSoilTranslation } from '../data/translations';
import { 
  Sprout, 
  MapPin, 
  Droplets, 
  Layers, 
  Activity, 
  Compass, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge, 
  Cpu, 
  Thermometer, 
  Calendar, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Settings
} from 'lucide-react';

export const MyFarmPage = () => {
  const { farmerProfile, location, agroRegion, crops, setActiveTab, t, showToast } = useApp();

  const [selectedPlotId, setSelectedPlotId] = useState('plot-1');
  const [isPumpRunning, setIsPumpRunning] = useState(false);
  const [irrigationMode, setIrrigationMode] = useState('Auto-Telemetry'); // 'Auto-Telemetry' | 'Manual'

  // Simulated Multi-Plot Farm Cadastral GIS Data
  const [farmPlots, setFarmPlots] = useState([
    {
      id: 'plot-1',
      name: 'North Sector Plot A (Kharif Cash Crop)',
      crop: crops[0]?.name || farmerProfile.primaryCrops?.[0] || 'Cotton',
      variety: crops[0]?.variety || 'Bt Hybrid BG-II',
      areaAcres: 2.2,
      soilMoisture: '64% VWC',
      soilPh: 7.1,
      ecLevel: '0.78 dS/m',
      organicCarbon: '0.74% (Good)',
      temperature: '26.8°C',
      irrigationValve: 'Valve #1 (Drip Zone A)',
      valveStatus: 'Active',
      npkStatus: { n: 78, p: 85, k: 90 },
      healthScore: crops[0]?.healthScore || 88
    },
    {
      id: 'plot-2',
      name: 'South Sector Plot B (Food Grain & Rotational)',
      crop: crops[1]?.name || farmerProfile.primaryCrops?.[1] || 'Wheat',
      variety: crops[1]?.variety || 'GW-496 / HD-2967',
      areaAcres: 1.5,
      soilMoisture: '72% VWC',
      soilPh: 6.9,
      ecLevel: '0.82 dS/m',
      organicCarbon: '0.68% (Moderate)',
      temperature: '26.2°C',
      irrigationValve: 'Valve #2 (Drip Zone B)',
      valveStatus: 'Standby',
      npkStatus: { n: 82, p: 80, k: 88 },
      healthScore: crops[1]?.healthScore || 84
    },
    {
      id: 'plot-3',
      name: 'East Sector Plot C (Horticulture & Vegetables)',
      crop: crops[2]?.name || farmerProfile.primaryCrops?.[2] || 'Tomato',
      variety: crops[2]?.variety || 'Pusa Ruby High Yield',
      areaAcres: 0.8,
      soilMoisture: '68% VWC',
      soilPh: 7.0,
      ecLevel: '0.75 dS/m',
      organicCarbon: '0.81% (Rich)',
      temperature: '27.1°C',
      irrigationValve: 'Valve #3 (Micro-Sprinkler)',
      valveStatus: 'Standby',
      npkStatus: { n: 88, p: 92, k: 86 },
      healthScore: crops[2]?.healthScore || 90
    }
  ]);

  const activePlot = farmPlots.find(p => p.id === selectedPlotId) || farmPlots[0];

  const handleTogglePump = () => {
    setIsPumpRunning(prev => {
      const next = !prev;
      showToast(next ? 'Submersible Irrigation Pump turned ON (Drip Zone A flowing).' : 'Irrigation Pump stopped.', next ? 'success' : 'info');
      return next;
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-earth-walnut uppercase tracking-widest mb-1">
            <Sprout className="w-4 h-4 text-agri-primary" /> Cadastral Farm Land Holding & Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.myFarm?.title || "My Farm Land & Sensor Telemetry"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Real-time plot boundaries, multi-depth soil chemistry, groundwater levels, and drip automation for {farmerProfile.name}'s farm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold rounded-2xl transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-gray-600" />
            <span>Farm Settings</span>
          </button>
          <button
            onClick={() => setActiveTab('cropJourney')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-agri-dark hover:bg-agri-primary text-white text-xs font-black rounded-2xl shadow-agri transition-colors cursor-pointer border border-gov-gold/30"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>View Crop Journeys →</span>
          </button>
        </div>
      </div>

      {/* TOP METRICS SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Total Registered Land</span>
          <div className="text-2xl font-black text-agri-dark">{farmerProfile.farmSizeAcres} <span className="text-sm font-bold text-gray-500">{t.dashboard?.acresUnit || "Acres"}</span></div>
          <span className="text-[11px] font-bold text-emerald-700">{farmPlots.length} Cultivated Plots</span>
        </div>

        <div className="p-5 bg-earth-cream rounded-3xl border border-earth-wheat/40 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-earth-soil uppercase tracking-widest block">Soil Classification</span>
          <div className="text-sm font-black text-earth-walnut line-clamp-1">{getSoilTranslation(farmerProfile.soilType, t)}</div>
          <span className="text-[11px] font-semibold text-gray-600">Organic Carbon: 0.74%</span>
        </div>

        <div className="p-5 bg-sky-50/80 rounded-3xl border border-sky-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-sky-800 uppercase tracking-widest block">Irrigation System</span>
            <span className={`w-2 h-2 rounded-full ${isPumpRunning ? 'bg-emerald-500 animate-ping' : 'bg-sky-400'}`} />
          </div>
          <div className="text-xs font-black text-sky-950 line-clamp-1">{farmerProfile.irrigationType}</div>
          <span className="text-[11px] font-bold text-sky-700">{isPumpRunning ? 'Pump ON • 140 L/min' : 'Pump Standby'}</span>
        </div>

        <div className="p-5 bg-purple-50/80 rounded-3xl border border-purple-200 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-ai-plum uppercase tracking-widest block">Agro-Climatic Zone</span>
          <div className="text-xs font-black text-purple-950 line-clamp-1">{agroRegion?.agroZone || "Semi-Arid Zone"}</div>
          <span className="text-[11px] font-bold text-ai-purple">Rainfall: {agroRegion?.avgRainfall || "850mm"}</span>
        </div>

      </div>

      {/* CADASTRAL FIELD PLOT SELECTOR & GIS SCHEMATIC */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-agri-dark">Interactive Field Plot Management</h3>
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase bg-agri-bg text-agri-dark rounded-full border border-agri-soft/50">
                GPS Verified Boundaries
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Select a farm sector to view real-time soil moisture sensors, pH, and valve controls.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">Sector:</span>
            <div className="flex items-center gap-1.5">
              {farmPlots.map((plot, idx) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlotId(plot.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedPlotId === plot.id
                      ? 'bg-agri-dark text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Plot {String.fromCharCode(65 + idx)} ({plot.areaAcres} Ac)
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SELECTED PLOT DEEP TELEMETRY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Plot Overview Card */}
          <div className="md:col-span-7 p-6 rounded-3xl bg-gradient-to-br from-agri-bg via-white to-emerald-50/40 border border-agri-soft/50 space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-agri-primary uppercase tracking-wider block">
                  CROP ASSIGNED: {getCropTranslation(activePlot.crop, t)}
                </span>
                <h4 className="text-base font-black text-agri-dark">{activePlot.name}</h4>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-300">
                Health: {activePlot.healthScore}/100
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">AREA SIZE</span>
                <div className="text-sm font-black text-gray-900">{activePlot.areaAcres} Acres</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">SOIL MOISTURE</span>
                <div className="text-sm font-black text-emerald-700">{activePlot.soilMoisture}</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">SOIL PH</span>
                <div className="text-sm font-black text-earth-walnut">{activePlot.soilPh} (Neutral)</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">ELECTRICAL COND.</span>
                <div className="text-sm font-black text-gray-900">{activePlot.ecLevel}</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">ROOT TEMP</span>
                <div className="text-sm font-black text-gray-900">{activePlot.temperature}</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-0.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">ORGANIC CARBON</span>
                <div className="text-sm font-black text-gray-900">{activePlot.organicCarbon}</div>
              </div>
            </div>

            {/* NPK Availability Gauges */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-black text-gray-700 uppercase tracking-wider block">
                Primary Nutrient Availability (Soil Test Baseline)
              </span>
              
              <div className="space-y-2 text-[11px] font-bold">
                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Nitrogen (N) - Leaf & Vegetative Vigor</span>
                    <span className="text-agri-dark font-extrabold">{activePlot.npkStatus.n}% (Adequate)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${activePlot.npkStatus.n}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Phosphorus (P) - Root & Tillering Strength</span>
                    <span className="text-agri-dark font-extrabold">{activePlot.npkStatus.p}% (Optimal)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: `${activePlot.npkStatus.p}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Potassium (K) - Disease Resistance & Quality</span>
                    <span className="text-agri-dark font-extrabold">{activePlot.npkStatus.k}% (Rich)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${activePlot.npkStatus.k}%` }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Smart Irrigation Valve & Pump Controller */}
          <div className="md:col-span-5 space-y-4">
            
            <div className="p-6 bg-gradient-to-br from-sky-950 via-teal-950 to-agri-dark text-white rounded-3xl shadow-xl space-y-5 border border-sky-800/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <Droplets className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight">Drip Automation Controller</h4>
                    <span className="text-[10px] text-sky-300 font-semibold">{activePlot.irrigationValve}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase rounded-full ${
                  isPumpRunning ? 'bg-emerald-500 text-white animate-pulse' : 'bg-sky-800 text-sky-200'
                }`}>
                  {isPumpRunning ? 'ONLINE' : 'STANDBY'}
                </span>
              </div>

              <div className="space-y-2 text-xs text-sky-100">
                <div className="flex justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sky-300">Groundwater Depth:</span>
                  <span className="font-bold text-white">48 meters (Stable)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sky-300">Flow Rate:</span>
                  <span className="font-bold text-white">{isPumpRunning ? '140 Litres / Min' : '0 L/min'}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sky-300">Daily Water Budget:</span>
                  <span className="font-bold text-white">4,200 Litres (62% used)</span>
                </div>
              </div>

              {/* Pump Toggle Button */}
              <button
                onClick={handleTogglePump}
                className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isPumpRunning
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-agri'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isPumpRunning ? 'Stop Drip Irrigation Pump' : 'Start Drip Fertigation Cycle'}</span>
              </button>
            </div>

            {/* Quick Links to Crop Health & AI */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-purple-950 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-ai-purple" /> Crop Health Radar
                </span>
                <button
                  onClick={() => setActiveTab('cropHealth')}
                  className="font-bold text-ai-plum hover:underline"
                >
                  View NDVI Heatmap →
                </button>
              </div>
              <p className="text-purple-900/80 font-medium">
                Satellite NDVI indicates {activePlot.crop} canopy vigor is optimal across all sectors.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
