import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bot, 
  Sparkles, 
  Camera, 
  TrendingUp, 
  CloudSun, 
  Landmark, 
  BookOpen, 
  UserCheck, 
  Sprout, 
  MapPin, 
  FileText, 
  ArrowRight, 
  X,
  Zap,
  Globe
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const { setActiveTab, farmerProfile, location, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const commandItems = [
    // Direct Actions & Navigation
    { id: 'ai-ask', label: 'Ask AI Agricultural Specialist', category: 'AI Intelligence', icon: Bot, badge: 'Smart AI', action: () => { setActiveTab('ai'); onClose(); } },
    { id: 'crop-doc', label: 'Scan Leaf with Crop Doctor', category: 'Diagnostics', icon: Camera, badge: 'Computer Vision', action: () => { setActiveTab('cropDoctor'); onClose(); } },
    { id: 'my-farm', label: 'My Farm Telemetry & Crop Stages', category: 'Farm Management', icon: Sprout, badge: `${farmerProfile.farmSizeAcres} Acres`, action: () => { setActiveTab('myFarm'); onClose(); } },
    { id: 'mandi', label: 'APMC Mandi Rates & Arbitrage', category: 'Market', icon: TrendingUp, badge: 'Cotton ₹7,410', action: () => { setActiveTab('market'); onClose(); } },
    { id: 'weather', label: 'Agro-Weather Radar & Rain Advisory', category: 'Weather', icon: CloudSun, badge: location.formatted?.split(',')[0] || 'Halol', action: () => { setActiveTab('weather'); onClose(); } },
    { id: 'schemes', label: 'Government Subsidies & Eligibility', category: 'Gov Schemes', icon: Landmark, badge: 'PM-Kisan & GGRC', action: () => { setActiveTab('schemes'); onClose(); } },
    { id: 'expert', label: 'Escalate Case to KVK Agronomist', category: 'Expert Support', icon: UserCheck, badge: 'ICAR Scientists', action: () => { setActiveTab('expert'); onClose(); } },
    { id: 'knowledge', label: 'Agronomy Knowledge Base & Wikipedia', category: 'Library', icon: BookOpen, badge: 'Live Guides', action: () => { setActiveTab('knowledge'); onClose(); } },
    { id: 'profile', label: 'Farmer Profile & Soil Configuration', category: 'Settings', icon: FileText, badge: farmerProfile.soilType?.split(' ')[0] || 'Soil', action: () => { setActiveTab('profile'); onClose(); } },
  ];

  // Filter items based on user search query
  const filteredItems = commandItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      } else if (searchQuery.trim()) {
        // Submit directly to AI Assistant
        setActiveTab('ai');
        onClose();
        showToast(`Routing query "${searchQuery}" to AI Assistant...`, 'info');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[80vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, query, crop disease, or ask AI... (Press Esc to exit)" 
            className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-gray-900 focus:outline-none placeholder-gray-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[10px] font-black uppercase text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-xs">
            ESC
          </span>
        </div>

        {/* Dynamic Context Header */}
        <div className="px-6 py-2 bg-gradient-to-r from-purple-50 to-emerald-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-600 font-medium">
          <span className="flex items-center gap-1.5 text-ai-plum font-bold">
            <Sparkles className="w-3.5 h-3.5 text-ai-purple" />
            Active: {farmerProfile.name} • {location.formatted?.split(',')[0]} ({farmerProfile.soilType})
          </span>
          <span className="text-[10px] text-gray-400">↑↓ to navigate, ↵ to select</span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-gray-50 flex-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const IconComp = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all ${
                    isSelected 
                      ? 'bg-agri-dark text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/10 text-emerald-300' : 'bg-gray-100 text-gray-600'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {item.label}
                      </div>
                      <div className={`text-[10px] font-medium ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg ${
                      isSelected 
                        ? 'bg-white/20 text-emerald-200' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-gray-300'}`} />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-ai-light text-ai-plum flex items-center justify-center mx-auto">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Ask AI: "{searchQuery}"</h4>
                <p className="text-xs text-gray-500 font-medium mt-1">Press Enter to route this question to AgriSaathi AI with live Wikipedia grounding.</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('ai');
                  onClose();
                }}
                className="px-4 py-2 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-xl shadow-ai inline-flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> Submit Query to AI
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-agri-primary" />
            <span>Grounded with live Wikipedia & Agronomy Telemetry</span>
          </div>
          <span className="font-extrabold text-agri-dark">AgriSaathi AI OS v2.0</span>
        </div>
      </div>
    </div>
  );
};
