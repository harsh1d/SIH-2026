import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Sprout, 
  Camera, 
  Calendar, 
  Activity, 
  Bot, 
  CloudSun, 
  TrendingUp, 
  Landmark, 
  Bell, 
  UserCheck, 
  BookOpen, 
  BarChart3, 
  User, 
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { activeTab, setActiveTab, t, alerts, location, setIsLocationModalOpen } = useApp();

  const navSections = [
    {
      title: t.nav?.overview || "OVERVIEW",
      items: [
        { id: "dashboard", label: t.nav?.dashboard || "Dashboard", icon: Home }
      ]
    },
    {
      title: t.nav?.myFarmSection || "MY FARM",
      items: [
        { id: "myFarm", label: t.nav?.myFarm || "My Farm", icon: Sprout },
        { id: "cropDoctor", label: t.nav?.cropDoctor || "Crop Doctor", icon: Camera, badge: "AI Scan" },
        { id: "cropJourney", label: t.nav?.cropJourney || "Crop Journey", icon: Calendar },
        { id: "cropHealth", label: t.nav?.cropHealth || "Crop Health", icon: Activity }
      ]
    },
    {
      title: t.nav?.toolsSection || "SMART TOOLS",
      items: [
        { id: "ai", label: t.nav?.aiAssistant || "AI Assistant", icon: Bot, isAi: true },
        { id: "weather", label: t.nav?.weather || "Weather Radar", icon: CloudSun },
        { id: "market", label: t.nav?.market || "Mandi Rates", icon: TrendingUp },
        { id: "schemes", label: t.nav?.schemes || "Schemes & News", icon: Landmark }
      ]
    },
    {
      title: t.nav?.supportSection || "SUPPORT & SERVICES",
      items: [
        { id: "alerts", label: t.nav?.alerts || "Smart Alerts", icon: Bell, count: alerts.length },
        { id: "expert", label: t.nav?.expertHelp || "Expert Consultation", icon: UserCheck },
        { id: "knowledge", label: t.nav?.knowledge || "Knowledge Hub", icon: BookOpen }
      ]
    },
    {
      title: t.nav?.systemSection || "SYSTEM & ADMIN",
      items: [
        { id: "admin", label: t.nav?.admin || "Agronomist Portal", icon: BarChart3 },
        { id: "profile", label: t.nav?.profile || "Farmer Profile", icon: User }
      ]
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-28 left-0 z-40
        w-64 h-[calc(100vh-7rem)] 
        bg-white border-r border-agri-soft/40
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Scrollable Area */}
        <div className="p-4 space-y-6 overflow-y-auto flex-1">

          {/* Location Indicator for Mobile Sidebar Header */}
          <div className="md:hidden p-3.5 bg-agri-bg rounded-2xl border border-agri-soft/50 mb-2">
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{t.location?.current || "Farm Location"}</div>
            <button 
              onClick={() => {
                setIsLocationModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 mt-1 text-xs font-bold text-agri-dark text-left"
            >
              <MapPin className="w-4 h-4 text-earth-terracotta flex-shrink-0" />
              <span className="truncate">{location.formatted}</span>
            </button>
          </div>

          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-black tracking-widest text-earth-walnut/70 uppercase">
                {sec.title}
              </div>

              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                let itemClass = "w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 cursor-pointer ";

                if (isActive) {
                  if (item.isAi) {
                    itemClass += "bg-ai-plum text-white shadow-ai border border-ai-mauve/40";
                  } else {
                    itemClass += "bg-agri-dark text-white shadow-agri border border-gov-gold/30";
                  }
                } else {
                  if (item.isAi) {
                    itemClass += "text-ai-plum hover:bg-ai-light/70";
                  } else {
                    itemClass += "text-gray-700 hover:bg-agri-bg hover:text-agri-dark";
                  }
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={itemClass}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                        isActive 
                          ? 'text-emerald-200' 
                          : item.isAi ? 'text-ai-purple' : 'text-agri-primary'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    {/* Badges */}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-ai-purple text-white uppercase tracking-wider shadow-xs">
                        {item.badge}
                      </span>
                    )}

                    {item.count > 0 && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-rose-600 text-white">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* AI Quick Banner Bottom */}
        <div className="p-4 border-t border-agri-soft/40 bg-gradient-to-br from-agri-bg to-ai-light/40">
          <button 
            onClick={() => handleNavClick('ai')}
            className="w-full flex items-center gap-3 p-3 bg-white hover:bg-ai-light border border-ai-mauve/30 rounded-2xl shadow-xs text-left group transition-all cursor-pointer"
          >
            <div className="p-2 rounded-xl bg-ai-plum text-white group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 text-purple-200" />
            </div>
            <div>
              <div className="text-xs font-black text-ai-plum flex items-center gap-1">
                {t.dashboard?.askAi || "Ask AI Assistant"}
              </div>
              <div className="text-[11px] text-gray-500 font-medium">24/7 Crop advisory</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
