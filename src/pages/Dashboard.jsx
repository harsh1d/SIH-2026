import React from 'react';
import { useApp } from '../context/AppContext';
import { mockCrops, mockWeatherData, mockMandiRates } from '../data/mockData';
import { 
  Sparkles, 
  MapPin, 
  Bot, 
  Camera, 
  CloudSun, 
  TrendingUp, 
  Bell, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Droplet,
  ChevronRight,
  Sprout,
  Calendar,
  Layers
} from 'lucide-react';

export const Dashboard = () => {
  const { farmerProfile, location, setActiveTab, alerts, t } = useApp();

  const primaryCrop = mockCrops[0]; // Cotton
  const topAlert = alerts[0];
  const cottonMandi = mockMandiRates[0];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* GREETING & LOCATION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-agri-soft/40 shadow-gov">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-earth-terracotta uppercase tracking-widest mb-1">
            <Sprout className="w-4 h-4 text-agri-primary" /> Official Agriculture Portal • Halol Station
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.dashboard.greeting}, {farmerProfile.name} 🌱
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            {t.dashboard.subGreeting || "Here is your agricultural overview & daily advisory."}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-agri-bg px-4 py-3 rounded-2xl border border-agri-soft/50 shadow-xs">
          <MapPin className="w-5 h-5 text-earth-terracotta flex-shrink-0" />
          <div className="text-xs">
            <div className="font-extrabold text-agri-dark">{location.formatted}</div>
            <div className="text-gray-500 font-medium">4.5 Acres • Black Cotton Soil</div>
          </div>
        </div>
      </div>

      {/* PROMINENT AI FARM ADVISORY BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 text-white p-6 sm:p-8 shadow-ai border border-ai-mauve/40">
        
        {/* Glowing AI particle blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-ai-purple/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-extrabold text-purple-200 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
              <span>✨ AI FARM ADVISORY</span>
            </div>
            <span className="text-xs text-purple-200/80 font-medium">Updated 30 mins ago</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight">
              🌧️ Rain Forecast Advisory for {primaryCrop.name} ({primaryCrop.currentStage})
            </h3>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-3xl font-medium">
              "{mockWeatherData.agroImpact.summary} Soil moisture is currently optimal (68%). Holding off chemical fertigation today saves ₹850 in fertilizer runoff."
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('ai')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-ai-plum font-extrabold text-xs rounded-2xl hover:bg-purple-50 transition-colors shadow-md"
            >
              <Bot className="w-4 h-4 text-ai-purple" />
              <span>Ask AI Follow-Up Query</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('weather')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition-colors"
            >
              <CloudSun className="w-4 h-4 text-emerald-300" />
              <span>Detailed Weather Impact</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <button
          onClick={() => setActiveTab('ai')}
          className="p-5 bg-white hover:bg-ai-light/50 border border-gray-100 hover:border-ai-mauve/40 rounded-3xl shadow-sm text-left transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-ai-plum text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
            <Bot className="w-5 h-5 text-purple-200" />
          </div>
          <div className="text-xs font-black text-agri-dark">🤖 Ask AI Assistant</div>
          <div className="text-[11px] text-gray-500 font-medium">Query in voice / text</div>
        </button>

        <button
          onClick={() => setActiveTab('cropDoctor')}
          className="p-5 bg-white hover:bg-agri-light/60 border border-gray-100 hover:border-agri-soft rounded-3xl shadow-sm text-left transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-agri-dark text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
            <Camera className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="text-xs font-black text-agri-dark">📸 Scan Crop Doctor</div>
          <div className="text-[11px] text-gray-500 font-medium">Pest & leaf scan</div>
        </button>

        <button
          onClick={() => setActiveTab('market')}
          className="p-5 bg-white hover:bg-earth-cream/60 border border-gray-100 hover:border-earth-wheat/50 rounded-3xl shadow-sm text-left transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-earth-walnut text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
            <TrendingUp className="w-5 h-5 text-earth-wheat" />
          </div>
          <div className="text-xs font-black text-agri-dark">💰 Mandi Prices</div>
          <div className="text-[11px] text-gray-500 font-medium">Cotton ₹7,250/qtnl</div>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className="p-5 bg-white hover:bg-emerald-50/60 border border-gray-100 hover:border-emerald-200 rounded-3xl shadow-sm text-left transition-all group"
        >
          <div className="w-11 h-11 rounded-2xl bg-agri-primary text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
            <CloudSun className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="text-xs font-black text-agri-dark">🌦️ Agro-Weather</div>
          <div className="text-[11px] text-gray-500 font-medium">28°C • 85% Rain</div>
        </button>

      </div>

      {/* DASHBOARD CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Crops Overview & Recommended Action */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Crops Summary Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-base text-agri-dark flex items-center gap-2">
                <Sprout className="w-5 h-5 text-agri-primary" /> Active Crop Lifecycle Status
              </h3>
              <button 
                onClick={() => setActiveTab('myFarm')}
                className="text-xs font-bold text-agri-primary hover:underline flex items-center gap-1"
              >
                View My Farm <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockCrops.map((crop) => (
                <div 
                  key={crop.id}
                  onClick={() => setActiveTab('myFarm')}
                  className="p-4 rounded-2xl border border-gray-100 hover:border-agri-soft/60 bg-agri-bg/40 hover:bg-agri-bg transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-agri-dark">{crop.name}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {crop.healthScore}/100
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] text-gray-400 font-extrabold uppercase">Stage</div>
                    <div className="text-xs font-bold text-earth-walnut line-clamp-1">{crop.currentStage}</div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-semibold">
                      <span>Progress</span>
                      <span>{crop.stageProgressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-agri-primary rounded-full" 
                        style={{ width: `${crop.stageProgressPercent}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Recommended Action Checklist */}
          <div className="bg-earth-cream/70 p-6 rounded-3xl border border-earth-wheat/40 shadow-sm space-y-4">
            <h3 className="font-black text-base text-earth-soil flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-earth-terracotta" /> Today's Recommended Actions
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-earth-wheat/20 shadow-xs">
                <input type="checkbox" defaultChecked className="mt-1 accent-agri-primary w-4 h-4 rounded" />
                <div className="text-xs">
                  <span className="font-extrabold text-agri-dark block">Inspect lower Cotton leaves for Pink Bollworm larvae</span>
                  <span className="text-gray-600 font-medium">KVK Panchmahal alert recommends checking 10 random plants near field edges.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-earth-wheat/20 shadow-xs">
                <input type="checkbox" className="mt-1 accent-agri-primary w-4 h-4 rounded" />
                <div className="text-xs">
                  <span className="font-extrabold text-agri-dark block">Postpone fertigation until tomorrow afternoon</span>
                  <span className="text-gray-600 font-medium">Rain probability 85% at 3:00 PM. Avoid nitrogen leaching into subsoil.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Mandi & Active Alert Highlights */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Alert Widget */}
          {topAlert && (
            <div className="p-5 bg-rose-50 border border-rose-200 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white rounded-full">
                  {topAlert.severity}
                </span>
                <span className="text-[11px] text-rose-700 font-bold">{topAlert.time}</span>
              </div>

              <h4 className="font-black text-sm text-rose-950 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" /> {topAlert.title}
              </h4>
              <p className="text-xs text-rose-900/90 leading-snug font-medium">{topAlert.description}</p>

              <button 
                onClick={() => setActiveTab('alerts')}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-xs"
              >
                {topAlert.actionText} →
              </button>
            </div>
          )}

          {/* Mandi Price Highlight Card */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="font-black text-sm text-agri-dark flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-earth-walnut" /> Nearby Mandi Rates
              </h4>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {cottonMandi.trend}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-agri-dark">{cottonMandi.crop}</div>
                  <div className="text-[11px] text-gray-500 font-medium">{cottonMandi.markets[0].name} (4 km)</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-earth-walnut">₹{cottonMandi.markets[0].price}</div>
                  <div className="text-[10px] text-emerald-600 font-bold">{cottonMandi.markets[0].change}</div>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('market')}
                className="w-full py-2.5 text-center text-xs font-bold text-agri-primary bg-agri-bg hover:bg-agri-light rounded-2xl transition-colors border border-agri-soft/30"
              >
                Compare All Mandis →
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
