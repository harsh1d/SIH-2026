import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  PhoneCall, 
  ShieldCheck, 
  Globe, 
  ExternalLink, 
  Heart,
  Landmark
} from 'lucide-react';

export const Footer = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-gradient-to-b from-agri-dark via-gov-green to-ai-plum text-white pt-12 pb-8 border-t-2 border-gov-gold/40 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Emergency Helpline Banner */}
        <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-gov-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gov-gold text-agri-dark flex items-center justify-center flex-shrink-0 shadow-md">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-gov-gold uppercase tracking-wider block">
                Kisan Call Centre Toll-Free Helpline
              </span>
              <span className="text-xl font-black text-white tracking-tight">1800-180-1551</span>
              <span className="text-xs text-emerald-200 block font-medium">Free 24/7 Agro-Expert Voice Advice Across India</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('expert')}
              className="px-5 py-2.5 bg-gov-gold hover:bg-yellow-400 text-agri-dark font-extrabold text-xs rounded-2xl shadow-md transition-all"
            >
              Consult KVK Agronomists →
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gov-gold text-agri-dark flex items-center justify-center font-bold shadow-md">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">AgriSaathi</span>
            </div>

            <p className="text-gray-300 leading-relaxed font-medium">
              AI-Powered Agricultural Query Support & Advisory System. Designed to empower farmers across the crop lifecycle with hyper-local computer vision, weather telemetry, mandi prices, and government schemes.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-gov-gold" />
              <span>Smart India Hackathon SIH25076 Platform</span>
            </div>
          </div>

          {/* Core Modules */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-sm text-gov-gold uppercase tracking-wider">Platform Modules</h4>
            <ul className="space-y-2 text-gray-300 font-medium">
              <li>
                <button onClick={() => setActiveTab('ai')} className="hover:text-emerald-300 transition-colors">
                  🤖 AI Farmer Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cropDoctor')} className="hover:text-emerald-300 transition-colors">
                  📸 Crop Doctor Leaf Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('myFarm')} className="hover:text-emerald-300 transition-colors">
                  🌱 My Farm Telemetry & Lifecycle
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('market')} className="hover:text-emerald-300 transition-colors">
                  💰 APMC Mandi Price Trends
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('weather')} className="hover:text-emerald-300 transition-colors">
                  🌦️ Agro-Weather Forecast
                </button>
              </li>
            </ul>
          </div>

          {/* Government Programs & Portals */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-sm text-gov-gold uppercase tracking-wider">Government Portals</h4>
            <ul className="space-y-2 text-gray-300 font-medium">
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-gov-gold" /> PM-KISAN Samman Nidhi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-gov-gold" /> Pradhan Mantri Fasal Bima (PMFBY)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-gov-gold" /> Soil Health Card Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-gov-gold" /> e-NAM National Agriculture Market
                </button>
              </li>
            </ul>
          </div>

          {/* Accessibility & Legal */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-extrabold text-sm text-gov-gold uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-2 text-gray-300 font-medium">
              <li className="hover:text-white cursor-pointer">Accessibility Statement</li>
              <li className="hover:text-white cursor-pointer">Privacy & Data Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">KVK Directory</li>
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-300 font-medium">
          <div>
            © 2026 AgriSaathi • Ministry of Agriculture & Farmers Welfare Digital Platform
          </div>
          <div className="flex items-center gap-1 text-emerald-200">
            Built with care for <strong className="text-white">Smart India Hackathon (SIH25076)</strong>
          </div>
        </div>

      </div>
    </footer>
  );
};
