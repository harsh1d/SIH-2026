import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Bot, 
  Camera, 
  MapPin, 
  CloudSun, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Users,
  Award,
  Zap,
  Activity,
  Landmark
} from 'lucide-react';

export const LandingPage = () => {
  const { setActiveTab, location, setIsLocationModalOpen, useBrowserGeolocation, t } = useApp();

  return (
    <div className="space-y-16 py-4 animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-agri-dark via-emerald-950 to-agri-dark rounded-4xl p-8 sm:p-14 text-white border border-gov-gold/30 shadow-2xl">
        
        {/* Layered Background Glows & Organic Blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-ai-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gov-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Government Official Emblem Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-gov-gold/40 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gov-gold animate-ping" />
              <span className="text-xs font-black text-gov-gold tracking-wider uppercase">
                Government of India • SIH25076 Platform
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans text-white leading-tight tracking-tight">
              Smarter Insights for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-gov-gold to-purple-300">
                Every Indian Farm.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl font-medium">
              AI-powered agricultural intelligence for better decisions, healthier crops and smarter farming across Gujarat & all Indian agro-climatic zones.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('ai')}
                className="flex items-center gap-2.5 px-7 py-4 bg-ai-plum hover:bg-ai-purple text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-ai border border-ai-mauve/40 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <Bot className="w-5 h-5 text-purple-200" />
                <span>Ask AI Assistant</span>
                <ArrowRight className="w-4 h-4 ml-1 text-purple-200" />
              </button>

              <button
                onClick={() => setActiveTab('cropDoctor')}
                className="flex items-center gap-2.5 px-7 py-4 bg-gov-gold hover:bg-yellow-400 text-agri-dark font-extrabold text-xs sm:text-sm rounded-2xl shadow-agri transition-all transform hover:-translate-y-0.5"
              >
                <Camera className="w-5 h-5 text-agri-dark" />
                <span>Scan Crop Health</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/60 text-xs text-emerald-200 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gov-gold flex-shrink-0" />
                <span>24/7 Context LLM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gov-gold flex-shrink-0" />
                <span>7-Day Follow-Up Scan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gov-gold flex-shrink-0" />
                <span>KVK Agronomist Portal</span>
              </div>
            </div>
          </div>

          {/* Right Visual AI Telemetry Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/95 backdrop-blur-md text-gray-800 rounded-3xl p-6 sm:p-7 border border-gov-gold/40 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-agri-dark uppercase tracking-wide">Live Farm Telemetry</span>
                </div>
                <span className="text-[11px] font-extrabold text-earth-walnut bg-earth-sand/60 px-3 py-1 rounded-full border border-earth-wheat/30">
                  📍 {location.formatted || "Halol, Gujarat"}
                </span>
              </div>

              {/* Sample AI Advisory Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-ai-light/80 via-purple-50 to-white border border-ai-mauve/30 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-ai-plum">
                    <Sparkles className="w-4 h-4 text-ai-purple animate-spin" />
                    AI Daily Advisory
                  </div>
                  <span className="text-[10px] font-bold text-ai-purple bg-ai-light px-2 py-0.5 rounded-full">High Rain Risk</span>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed font-medium">
                  "Rain expected tomorrow (85% probability). Cotton flowering stage requires holding off nitrogen fertigation today to prevent ₹850 fertilizer runoff."
                </p>
              </div>

              {/* Quick Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-agri-bg rounded-2xl border border-agri-soft/40 text-center space-y-0.5">
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase block">COTTON HEALTH</span>
                  <span className="text-2xl font-black text-agri-dark">84/100</span>
                  <span className="text-[10px] text-emerald-700 block font-bold">Optimal Stage</span>
                </div>
                <div className="p-3.5 bg-earth-cream rounded-2xl border border-earth-wheat/40 text-center space-y-0.5">
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase block">TODAY'S MANDI</span>
                  <span className="text-2xl font-black text-earth-walnut">₹7,250</span>
                  <span className="text-[10px] text-emerald-700 block font-bold">+4.2% Bodeli Yard</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('dashboard')}
                className="w-full py-3 text-center text-xs font-extrabold text-agri-dark bg-agri-light hover:bg-emerald-100 rounded-2xl transition-colors shadow-xs border border-agri-soft/30 flex items-center justify-center gap-2"
              >
                <span>Explore Official Dashboard</span>
                <ArrowRight className="w-4 h-4 text-agri-primary" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* LOCATION INTELLIGENCE BANNER */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-agri-soft/40 shadow-agri flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-earth-sand/60 text-earth-terracotta flex items-center justify-center flex-shrink-0 shadow-xs border border-earth-wheat/40">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-agri-dark">Personalized Agro-Climatic Intelligence</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
              Currently set to: <strong className="text-agri-primary font-bold">{location.formatted}</strong>. Location powers localized weather forecasts, APMC mandi rates, regional advisories, and alert warnings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
          <button
            onClick={useBrowserGeolocation}
            className="flex-1 sm:flex-none px-5 py-3.5 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs rounded-2xl transition-colors shadow-agri"
          >
            Use My Location
          </button>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex-1 sm:flex-none px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs rounded-2xl transition-colors"
          >
            Select Manually
          </button>
        </div>
      </section>

      {/* CORE PRODUCT CYCLE */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-earth-terracotta uppercase tracking-widest">End-To-End Platform</span>
          <h2 className="text-2xl sm:text-3xl font-black text-agri-dark">The AgriSaathi Intelligence Lifecycle</h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            Connecting location, crop stage, weather, computer vision diagnostics, and mandi rates into one continuous government advisory system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div 
            onClick={() => setActiveTab('ai')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-ai-mauve/50 shadow-sm hover:shadow-ai transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-ai-light text-ai-plum flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-ai-purple" />
            </div>
            <h3 className="font-extrabold text-base text-agri-dark">1. Ask & Understand</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Query in voice or text. AI contextualizes responses with your farm profile, crop stage & local weather.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('cropDoctor')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-agri-soft shadow-sm hover:shadow-agri transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-agri-light text-agri-dark flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-agri-primary" />
            </div>
            <h3 className="font-extrabold text-base text-agri-dark">2. Diagnose & Advise</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Upload leaf images for ML computer vision classification with actionable steps & pesticide safety rules.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('cropDoctor')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-earth-wheat shadow-sm hover:shadow-earth transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-earth-cream text-earth-walnut flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-earth-terracotta" />
            </div>
            <h3 className="font-extrabold text-base text-agri-dark">3. 7-Day Follow-Up</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Upload a follow-up image on Day 7 to compare side-by-side photo progress & verify treatment recovery.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('market')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-300 shadow-sm hover:shadow-agri transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-base text-agri-dark">4. Sell at Peak Mandi</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Track real-time prices across nearby APMC markets with 30-day historical trend graphs.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
