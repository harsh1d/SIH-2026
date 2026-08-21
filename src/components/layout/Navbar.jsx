import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GovTopBar } from './GovTopBar';
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
  ShieldCheck,
  ChevronDown,
  Search,
  Command
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
    resetDemoData,
    setIsCommandPaletteOpen
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-agri-soft/40 shadow-gov">
      
      {/* Official Government Top Bar */}
      <GovTopBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu & Official Brand Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-agri-dark hover:bg-agri-light rounded-2xl transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Government-Style Emblem Logo Container */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-agri-dark via-emerald-900 to-agri-primary text-white flex items-center justify-center shadow-agri group-hover:scale-105 transition-transform border border-gov-gold/40">
              <Sprout className="w-6 h-6 text-emerald-200" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-sans text-agri-dark tracking-tight">AgriSaathi</span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-earth-cream text-earth-walnut border border-earth-wheat/40 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  SIH25076
                </span>
              </div>
              <span className="hidden sm:block text-xs text-gray-500 font-medium leading-none mt-0.5">
                {t.tagline || "AI-Powered Farmer Query & Advisory Portal"}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Quick Command Palette Trigger & Location Bar */}
        <div className="flex-1 max-w-lg hidden md:flex items-center gap-2.5">
          {/* Command Palette Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex-1 flex items-center justify-between px-3.5 py-2 bg-gray-100/80 hover:bg-gray-200/70 border border-gray-200 rounded-2xl text-gray-500 text-xs font-semibold transition-all group"
            title="Press Ctrl+K or Cmd+K to search"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-agri-dark transition-colors" />
              <span>Search crops, mandis, schemes, or ask AI...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-extrabold bg-white border border-gray-200 rounded-md text-gray-400 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Location Badge */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-agri-bg hover:bg-agri-light border border-agri-soft/40 rounded-2xl transition-all text-xs font-bold text-agri-dark truncate max-w-[190px] cursor-pointer group"
            title="Click to change farm location or detect GPS"
          >
            <MapPin className="w-3.5 h-3.5 text-earth-terracotta flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">
              {location?.district ? `${location?.village ? location.village + ', ' : ''}${location.district}` : (location?.formatted?.split(',')[0] || "Halol")}
            </span>
            {location?.isGpsVerified && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-ping" />
            )}
          </button>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-agri-dark bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors"
            title="Search & Ask AI (Ctrl+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile Location Trigger */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="md:hidden p-2 text-earth-terracotta bg-earth-sand/40 hover:bg-earth-sand rounded-2xl transition-colors"
            title="Change Farm Location"
          >
            <MapPin className="w-5 h-5" />
          </button>

          {/* Multilingual Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold rounded-2xl transition-colors"
            >
              <Globe className="w-4 h-4 text-agri-primary" />
              <span className="uppercase font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-3xl shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1 text-[10px] font-extrabold text-gray-400 uppercase border-b border-gray-100 mb-1">
                  Select Language
                </div>
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

          {/* Alerts Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-gray-600 hover:text-agri-dark hover:bg-agri-light rounded-2xl transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-600 rounded-full ring-2 ring-white animate-ping" />
              )}
              {alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-100 rounded-3xl shadow-2xl p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                  <h4 className="font-extrabold text-sm text-agri-dark flex items-center gap-2">
                    <Bell className="w-4 h-4 text-agri-primary" /> Active Alerts ({alerts.length})
                  </h4>
                  <button 
                    onClick={() => {
                      setActiveTab('alerts');
                      setIsNotificationsOpen(false);
                    }}
                    className="text-xs text-agri-primary font-bold hover:underline"
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
                        className="p-3 bg-agri-bg rounded-2xl border border-agri-soft/50 hover:border-agri-primary transition-colors cursor-pointer"
                        onClick={() => {
                          setActiveTab('alerts');
                          setIsNotificationsOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-agri-dark mb-1">
                          <span className="text-earth-terracotta">{alt.type}</span>
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
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold border transition-all ${
              activeRole === 'expert' 
                ? 'bg-ai-plum text-white border-ai-purple shadow-ai' 
                : 'bg-emerald-50 text-agri-dark border-agri-soft hover:bg-emerald-100'
            }`}
            title="Toggle between Farmer View and KVK Expert View"
          >
            {activeRole === 'expert' ? (
              <>
                <ShieldCheck className="w-4 h-4 text-purple-200" />
                <span>KVK Expert Mode</span>
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
            className="hidden sm:block p-2 text-gray-500 hover:text-earth-walnut hover:bg-earth-sand/40 rounded-2xl transition-colors"
            title="Reset Hackathon Demo Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
};
