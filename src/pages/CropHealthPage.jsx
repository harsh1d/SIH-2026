import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getCropTranslation } from '../data/translations';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Droplet, 
  Sun, 
  Layers, 
  Camera, 
  Bot, 
  ArrowRight, 
  Flame, 
  MapPin, 
  CheckCircle2,
  HelpCircle,
  Eye,
  Sliders
} from 'lucide-react';

export const CropHealthPage = () => {
  const { crops, farmerProfile, location, weatherData, setActiveTab, t } = useApp();

  const [selectedCropId, setSelectedCropId] = useState(crops[0]?.id || 'crop-1');
  const [selectedSpectrum, setSelectedSpectrum] = useState('NDVI'); // 'NDVI' | 'Chlorophyll' | 'MoistureStress'

  const activeCrop = crops.find(c => c.id === selectedCropId) || crops[0] || {
    name: 'Cotton',
    variety: 'Bt Hybrid BG-II',
    healthScore: 88,
    soilMoisture: '64% VWC'
  };

  // 30-Day Historical NDVI Satellite Vegetation Data
  const ndviHistoryData = [
    { day: 'Day 1', ndvi: 0.38, benchmark: 0.35 },
    { day: 'Day 5', ndvi: 0.44, benchmark: 0.40 },
    { day: 'Day 10', ndvi: 0.52, benchmark: 0.48 },
    { day: 'Day 15', ndvi: 0.61, benchmark: 0.56 },
    { day: 'Day 20', ndvi: 0.69, benchmark: 0.64 },
    { day: 'Day 25', ndvi: 0.74, benchmark: 0.70 },
    { day: 'Day 30', ndvi: 0.79, benchmark: 0.73 }
  ];

  // Predictive Risk Matrix for next 7 days
  const predictiveRisks = [
    {
      id: 'risk-1',
      name: 'Sucking Pests (Aphids & Thrips)',
      riskPercent: 68,
      riskLevel: 'Elevated Threat',
      riskColor: 'text-amber-700 bg-amber-50 border-amber-300',
      barColor: 'bg-amber-500',
      trigger: `Warm temperature (${weatherData?.current?.temp ?? 29}°C) and dry canopy favoring sucking pest colonization.`,
      recommendation: 'Inspect underside of tender leaves. Install yellow sticky traps @ 10 traps/acre.'
    },
    {
      id: 'risk-2',
      name: 'Fungal Leaf Spot / Blight',
      riskPercent: 24,
      riskLevel: 'Low Risk',
      riskColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      barColor: 'bg-emerald-500',
      trigger: `Current rain probability is ${weatherData?.current?.rainProbability ?? 35}%; spore germination threshold is low.`,
      recommendation: 'Maintain optimal foliage aeration. Routine preventive bio-agent spray sufficient.'
    },
    {
      id: 'risk-3',
      name: 'Root Rot & Collar Rot',
      riskPercent: 14,
      riskLevel: 'Minimal Risk',
      riskColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
      barColor: 'bg-emerald-500',
      trigger: 'Well-drained soil structure and controlled drip irrigation prevent water stagnation.',
      recommendation: 'Ensure drip run time does not exceed scheduled 90-minute blocks.'
    },
    {
      id: 'risk-4',
      name: 'Thermal Canopy Heat Stress',
      riskPercent: 35,
      riskLevel: 'Moderate Watch',
      riskColor: 'text-sky-700 bg-sky-50 border-sky-300',
      barColor: 'bg-sky-500',
      trigger: 'Afternoon sun peaking above 32°C may cause slight midday wilting in younger foliage.',
      recommendation: 'Schedule early morning or evening irrigation to maintain root cooling.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-ai-plum uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4 text-ai-purple" /> Remote Sensing & Canopy Pathology Radar
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            Crop Health Radar & Predictive Pathology
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Satellite NDVI multispectral imagery, chlorophyll density, root-zone health, and 7-day machine learning risk forecasting.
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
                  ? 'bg-ai-plum text-white shadow-ai border border-ai-mauve/40'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌾 {getCropTranslation(crop.name, t)} ({crop.healthScore}/100)
            </button>
          ))}
        </div>
      </div>

      {/* HEALTH OVERVIEW HERO CARD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Overall Health Score Index */}
        <div className="md:col-span-4 bg-gradient-to-br from-agri-dark via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gov-gold/30 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-black text-gov-gold uppercase tracking-widest block mb-1">
              COMPOSITE HEALTH INDEX
            </span>
            <h3 className="text-xl font-black">{activeCrop.name} ({activeCrop.variety})</h3>
            <p className="text-xs text-emerald-200/90 font-medium mt-1">
              Synthesized from satellite multispectral bands and on-ground soil telemetry in {location.formatted}.
            </p>
          </div>

          <div className="text-center py-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
            <div className="text-5xl font-black text-white font-sans">{activeCrop.healthScore} <span className="text-xl text-emerald-300 font-semibold">/100</span></div>
            <span className="inline-block mt-2 px-3 py-1 bg-emerald-500 text-white font-black text-xs rounded-full uppercase shadow-xs">
              Optimal High Vigour
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-emerald-200 pt-2 border-t border-white/10">
            <span>Next Satellite Pass:</span>
            <span className="font-bold text-white">Tomorrow, 11:40 AM (Sentinel-2)</span>
          </div>
        </div>

        {/* Right: 4 Pillar Biomarker Gauges */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="text-base font-black text-agri-dark flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-agri-primary" /> Physiological Biomarkers & Stress Indices
            </h4>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              4 Pillars Monitored
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Pillar 1 */}
            <div className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/50 space-y-1.5">
              <div className="flex justify-between font-black">
                <span className="text-agri-dark">🌿 Foliage & Chlorophyll Vigor</span>
                <span className="text-emerald-700">92%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
              </div>
              <span className="text-[10px] text-gray-500 font-semibold block">Dense green canopy, high photosynthetic rate</span>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1.5">
              <div className="flex justify-between font-black">
                <span className="text-sky-950">💧 Root-Zone Moisture Balance</span>
                <span className="text-sky-700">85%</span>
              </div>
              <div className="w-full h-2 bg-sky-200 rounded-full overflow-hidden">
                <div className="h-full bg-sky-600 rounded-full" style={{ width: '85%' }} />
              </div>
              <span className="text-[10px] text-gray-500 font-semibold block">Volumetric water content: 64% (Optimal)</span>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
              <div className="flex justify-between font-black">
                <span className="text-amber-950">🛡️ Pest & Disease Resistance</span>
                <span className="text-amber-700">78%</span>
              </div>
              <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-600 rounded-full" style={{ width: '78%' }} />
              </div>
              <span className="text-[10px] text-gray-500 font-semibold block">Slight sucking pest pressure detected on lower leaves</span>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1.5">
              <div className="flex justify-between font-black">
                <span className="text-purple-950">🧪 Nutrient Assimilation Index</span>
                <span className="text-ai-plum">88%</span>
              </div>
              <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                <div className="h-full bg-ai-plum rounded-full" style={{ width: '88%' }} />
              </div>
              <span className="text-[10px] text-gray-500 font-semibold block">NPK uptake steady; trace Boron deficiency</span>
            </div>

          </div>

        </div>

      </div>

      {/* SATELLITE NDVI MULTISPECTRAL CANOPY HEATMAP */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-agri-dark">Satellite NDVI Canopy Vegetation Radar</h3>
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                10m Optical Resolution
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Tracks leaf chlorophyll concentration and biomass density across field sectors.</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-extrabold">
            {['NDVI', 'Chlorophyll', 'MoistureStress'].map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpectrum(spec)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedSpectrum === spec
                    ? 'bg-agri-dark text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {spec === 'NDVI' ? '🌿 NDVI Index' : spec === 'Chlorophyll' ? '🧪 Chlorophyll (SPAD)' : '💧 Moisture Heatmap'}
              </button>
            ))}
          </div>
        </div>

        {/* 30-Day Historical NDVI Trend Graph */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-700">30-Day Canopy Vigour Progression vs Regional ICAR Benchmark</span>
            <span className="text-emerald-700 font-black">Current NDVI: 0.79 (High)</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ndviHistoryData}>
                <defs>
                  <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1B5E20" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} domain={[0.2, 1.0]} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#143D20', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="ndvi" stroke="#1B5E20" strokeWidth={3} fillOpacity={1} fill="url(#ndviGrad)" name="Your Farm NDVI" />
                <Area type="monotone" dataKey="benchmark" stroke="#D97706" strokeWidth={2} strokeDasharray="4 4" fill="transparent" name="Regional Benchmark" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 7-DAY PREDICTIVE PATHOLOGY RISK FORECASTING MATRIX */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-agri-dark flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> 7-Day Machine Learning Disease & Pest Forecast
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              Predictive models cross-referencing live local humidity, temperatures, and KVK pest surveillance data.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('cropDoctor')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-agri-dark hover:bg-agri-primary text-white text-xs font-black rounded-2xl shadow-agri transition-colors cursor-pointer border border-gov-gold/30"
          >
            <Camera className="w-4 h-4 text-emerald-300" />
            <span>Scan Leaf with Crop Doctor →</span>
          </button>
        </div>

        {/* Risk Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {predictiveRisks.map((risk) => (
            <div key={risk.id} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white transition-all space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-agri-dark">{risk.name}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${risk.riskColor}`}>
                  {risk.riskLevel}
                </span>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1">
                  <span>Forecasted Outbreak Likelihood</span>
                  <span className="font-extrabold text-agri-dark">{risk.riskPercent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${risk.barColor} rounded-full`} style={{ width: `${risk.riskPercent}%` }} />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-gray-600 font-medium leading-relaxed">
                  <strong>Trigger:</strong> {risk.trigger}
                </p>
                <p className="text-agri-dark font-bold">
                  <strong>Action:</strong> {risk.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
