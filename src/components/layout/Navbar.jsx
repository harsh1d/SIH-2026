import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  MapPin, 
  Globe, 
  Bell, 
  UserCheck, 
  RotateCcw, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { 
    t, 
    language, 
    setLanguage, 
    location, 
    setIsLocationModalOpen, 
    alerts, 
    setActiveTab, 
    activeRole, 
    setActiveRole,
    resetDemoData 
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'ml', label: 'മലയാളം' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-agri-light/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo & SIH Tag */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-agri-dark hover:bg-agri-light rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-agri-dark to-agri-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-sans text-agri-dark tracking-tight">AgriSaathi</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-earth-wheat/20 text-earth-walnut border border-earth-wheat/40 rounded-full">
                  SIH25076
                </span>
              </div>
              <span className="hidden sm:block text-xs text-gray-500 font-medium">{t.tagline}</span>
            </div>
          </div>
        </div>

        {/* Center: Location Badge Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 bg-agri-bg hover:bg-agri-light/80 border border-agri-soft/30 rounded-full transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2 text-agri-dark font-medium text-sm truncate">
              <MapPin className="w-4 h-4 text-earth-terracotta flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">{location.formatted || "Halol, Panchmahal, Gujarat"}</span>
            </div>
            <span className="text-xs font-semibold text-agri-primary hover:underline flex-shrink-0 ml-2">
              {t.location.change}
            </span>
          </button>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2.5">
          {/* Location Trigger for Mobile */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="md:hidden p-2 text-earth-terracotta bg-earth-sand/30 hover:bg-earth-sand/60 rounded-xl transition-colors"
            title="Change Location"
          >
            <MapPin className="w-5 h-5" />
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-xl transition-colors"
            >
              <Globe className="w-4 h-4 text-agri-primary" />
              <span className="uppercase font-bold">{language}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50 animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-agri-light transition-colors ${
                      language === lang.code ? 'text-agri-primary font-bold bg-agri-bg' : 'text-gray-700'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Alerts Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-gray-600 hover:text-agri-dark hover:bg-agri-light rounded-xl transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-ping" />
              )}
              {alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-100 rounded-3xl shadow-2xl p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                  <h4 className="font-bold text-sm text-agri-dark flex items-center gap-2">
                    <Bell className="w-4 h-4 text-agri-primary" /> Active Alerts ({alerts.length})
                  </h4>
                  <button 
                    onClick={() => {
                      setActiveTab('alerts');
                      setIsNotificationsOpen(false);
                    }}
                    className="text-xs text-agri-primary font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {alerts.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-4">No active warnings right now.</p>
                  ) : (
                    alerts.slice(0, 3).map((alt) => (
                      <div 
                        key={alt.id}
                        className="p-3 bg-agri-bg rounded-2xl border border-agri-light/80 hover:border-agri-soft transition-colors cursor-pointer"
                        onClick={() => {
                          setActiveTab('alerts');
                          setIsNotificationsOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-agri-dark mb-1">
                          <span>{alt.type}</span>
                          <span className="text-[10px] text-gray-400">{alt.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{alt.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Button for SIH Demonstration */}
          <button
            onClick={() => {
              const nextRole = activeRole === 'farmer' ? 'expert' : 'farmer';
              setActiveRole(nextRole);
              if (nextRole === 'expert') setActiveTab('expert');
              else setActiveTab('dashboard');
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeRole === 'expert' 
                ? 'bg-ai-plum text-white border-ai-purple shadow-ai' 
                : 'bg-emerald-50 text-agri-dark border-agri-soft hover:bg-emerald-100'
            }`}
            title="Toggle between Farmer View and KVK Expert View"
          >
            {activeRole === 'expert' ? (
              <>
                <ShieldCheck className="w-4 h-4 text-purple-300" />
                <span>KVK Agronomist Mode</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-agri-primary" />
                <span>Farmer Mode</span>
              </>
            )}
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetDemoData}
            className="p-2 text-gray-500 hover:text-earth-walnut hover:bg-earth-sand/40 rounded-xl transition-colors"
            title="Reset Hackathon Demo Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
};
