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
  Activity
} from 'lucide-react';

export const LandingPage = () => {
  const { setActiveTab, location, setIsLocationModalOpen, useBrowserGeolocation, t } = useApp();

  return (
    <div className="space-y-16 py-4 animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-agri-light/60 via-agri-bg to-white rounded-4xl p-8 sm:p-12 border border-agri-soft/40 shadow-sm">
        
        {/* Decorative Background Leaves */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-agri-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-ai-purple/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-agri-soft/50 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-agri-primary animate-ping" />
              <span className="text-xs font-bold text-agri-dark tracking-wide uppercase">
                SIH Problem SIH25076 Platform
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-agri-dark leading-tight">
              Your AI-Powered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-dark via-agri-primary to-earth-terracotta">
                Farming Companion
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              Empowering farmers across the entire crop lifecycle: ask AI crop queries, detect leaf diseases with instant computer vision, check mandi prices, track weather impacts, and receive smart local alerts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('ai')}
                className="flex items-center gap-2.5 px-6 py-4 bg-ai-plum hover:bg-ai-purple text-white font-bold text-sm rounded-2xl shadow-ai hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Bot className="w-5 h-5 text-purple-200" />
                <span>Ask AI Assistant</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('cropDoctor')}
                className="flex items-center gap-2.5 px-6 py-4 bg-agri-dark hover:bg-agri-primary text-white font-bold text-sm rounded-2xl shadow-agri hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Camera className="w-5 h-5 text-emerald-300" />
                <span>Check Crop Health</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-agri-soft/30 text-xs">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-agri-primary" />
                <span>24/7 Context Advisory</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-agri-primary" />
                <span>7-Day Follow-Up Scan</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-agri-primary" />
                <span>KVK Expert Escalation</span>
              </div>
            </div>
          </div>

          {/* Right Visual Dashboard Preview */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-agri-soft/40 shadow-floating space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-agri-dark">Live Farm Telemetry</span>
                </div>
                <span className="text-[11px] font-bold text-earth-terracotta bg-earth-sand/50 px-2.5 py-1 rounded-full">
                  Halol, Gujarat
                </span>
              </div>

              {/* Sample AI Insight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-ai-light/70 to-purple-50 border border-ai-mauve/30">
                <div className="flex items-center gap-2 text-xs font-bold text-ai-plum mb-1">
                  <Sparkles className="w-4 h-4 text-ai-purple" />
                  AI Daily Farm Advisory
                </div>
                <p className="text-xs text-gray-700 leading-snug font-medium">
                  "Rain expected tomorrow (85% prob). Cotton flowering stage requires holding off nitrogen spray today."
                </p>
              </div>

              {/* Quick Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-agri-bg rounded-xl border border-agri-soft/30 text-center">
                  <span className="text-[10px] text-gray-500 font-bold block">COTTON HEALTH</span>
                  <span className="text-xl font-extrabold text-agri-dark">84%</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">Optimal Stage</span>
                </div>
                <div className="p-3 bg-earth-cream rounded-xl border border-earth-wheat/30 text-center">
                  <span className="text-[10px] text-gray-500 font-bold block">TODAY'S MANDI</span>
                  <span className="text-xl font-extrabold text-earth-walnut">₹7,250</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">+4.2% Bodeli Yard</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('dashboard')}
                className="w-full py-2.5 text-center text-xs font-bold text-agri-primary bg-agri-light hover:bg-emerald-100 rounded-xl transition-colors"
              >
                Explore Full Dashboard →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* LOCATION INTELLIGENCE BANNER */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-agri flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-earth-sand/50 text-earth-terracotta flex items-center justify-center flex-shrink-0">
            <MapPin className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-agri-dark">Get Personalized Insights for Your Farm</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Currently set to: <strong className="text-agri-primary">{location.formatted}</strong>. Location powers localized weather forecasts, mandi prices, news, and crop advisories.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={useBrowserGeolocation}
            className="flex-1 sm:flex-none px-4 py-3 bg-agri-primary hover:bg-agri-dark text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
          >
            Use My Location
          </button>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-colors"
          >
            Select Manually
          </button>
        </div>
      </section>

      {/* CORE PRODUCT CYCLE: ASK -> UNDERSTAND -> ADVISE -> MONITOR -> INFORM -> SELL -> IMPROVE */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-earth-terracotta uppercase tracking-wider">End-To-End Companion</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-agri-dark">The AgriSaathi Intelligence Lifecycle</h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Unlike fragmented apps, AgriSaathi connects location, crop stage, weather, visual diagnostics, and mandi prices into one continuous advisory system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div 
            onClick={() => setActiveTab('ai')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-ai-mauve/50 shadow-sm hover:shadow-ai transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-ai-light text-ai-plum flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-ai-purple" />
            </div>
            <h3 className="font-bold text-sm text-agri-dark mb-1">1. Ask & Understand</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Query in text or voice. AI contextualizes responses with your location, crop stage & weather.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('cropDoctor')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-agri-soft shadow-sm hover:shadow-agri transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-agri-light text-agri-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-agri-primary" />
            </div>
            <h3 className="font-bold text-sm text-agri-dark mb-1">2. Diagnose & Advise</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upload leaf images for computer vision classification with actionable steps & pesticide safety rules.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('cropDoctor')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-earth-wheat shadow-sm hover:shadow-earth transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-earth-cream text-earth-walnut flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-earth-terracotta" />
            </div>
            <h3 className="font-bold text-sm text-agri-dark mb-1">3. 7-Day Follow-Up</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upload a follow-up image on Day 7 to compare side-by-side photo progress & verify treatment recovery.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('market')}
            className="p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-300 shadow-sm hover:shadow-agri transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-sm text-agri-dark mb-1">4. Sell at Peak Mandi</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Track real-time prices across nearby APMC markets with 30-day historical trend graphs.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
