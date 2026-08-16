import React from 'react';
import { Sprout, Heart, Shield, PhoneCall, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-agri-dark text-emerald-100/90 border-t border-emerald-900/60 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-800/40">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-agri-primary text-white">
                <Sprout className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-xl font-bold font-sans text-white">AgriSaathi</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              AI-Based Farmer Query Support & Advisory System. Empowering Indian agriculture with hyper-localized crop lifecycle intelligence, leaf disease diagnostics, and mandi price trends.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/60 border border-emerald-700/50 rounded-full text-[11px] font-semibold text-emerald-300">
              <Shield className="w-3.5 h-3.5" /> SIH25076 Hackathon Project
            </div>
          </div>

          {/* Quick Modules */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white cursor-pointer">AI Farmer Assistant</span></li>
              <li><span className="hover:text-white cursor-pointer">Crop Doctor Leaf Scanner</span></li>
              <li><span className="hover:text-white cursor-pointer">7-Day Follow-Up Crop Monitor</span></li>
              <li><span className="hover:text-white cursor-pointer">Crop Lifecycle Journey</span></li>
              <li><span className="hover:text-white cursor-pointer">Mandi Price Trend Analytics</span></li>
            </ul>
          </div>

          {/* Helpline & KVK Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Farmer Helplines</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-emerald-200">
                <PhoneCall className="w-4 h-4 text-emerald-400" /> Kisan Call Centre: 1800-180-1551
              </li>
              <li className="flex items-center gap-2 text-emerald-200">
                <PhoneCall className="w-4 h-4 text-emerald-400" /> KVK Panchmahal: +91 2676 220 120
              </li>
              <li className="flex items-center gap-2 text-emerald-200">
                <Globe className="w-4 h-4 text-emerald-400" /> Agricoop Portal: pmkisan.gov.in
              </li>
            </ul>
          </div>

          {/* Trust & Safety Disclaimer */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">AI Safety Notice</h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              AgriSaathi AI provides probabilistic advisory based on regional agro-data. High-risk pesticide applications should be verified with your nearest Krishi Vigyan Kendra (KVK) agronomist.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-3">
          <p>© 2026 AgriSaathi Platform — Smart India Hackathon Problem SIH25076</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> for Indian Farmers
          </p>
        </div>
      </div>
    </footer>
  );
};
