import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Search, X, Check } from 'lucide-react';

export const LocationModal = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    location, 
    updateLocation, 
    useBrowserGeolocation, 
    locationDatabase,
    t 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredLocations = locationDatabase.filter(loc =>
    loc.formatted.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-agri-soft/40">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-dark via-emerald-900 to-gov-green text-white p-6 relative">
          <button 
            onClick={() => setIsLocationModalOpen(false)}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-white/10 rounded-2xl text-emerald-200 backdrop-blur-md border border-white/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-sans">Farm Location Selector</h3>
              <p className="text-xs text-emerald-200/90 font-medium">Powers local weather, APMC mandi rates & regional alerts</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* GPS Button */}
          <button
            onClick={() => {
              useBrowserGeolocation();
              setIsLocationModalOpen(false);
            }}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-agri-dark text-white hover:bg-agri-primary rounded-2xl font-bold border border-gov-gold/30 transition-all shadow-agri group text-xs sm:text-sm"
          >
            <Navigation className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
            <span>{t.location.useGPS}</span>
          </button>

          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Or Select District</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t.location.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary focus:bg-white font-medium transition-all"
            />
          </div>

          {/* Location List */}
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
            {filteredLocations.map((loc, idx) => {
              const isSelected = location.formatted === loc.formatted;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    updateLocation(loc);
                    setIsLocationModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-agri-dark text-white border-agri-dark font-bold shadow-md'
                      : 'bg-white hover:bg-agri-bg border-gray-100 text-gray-700 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-earth-terracotta'}`} />
                    <div>
                      <div className="text-xs sm:text-sm font-bold">{loc.formatted}</div>
                      <div className={`text-[11px] ${isSelected ? 'text-emerald-200 font-medium' : 'text-gray-400 font-medium'}`}>
                        Rainfall Avg: {loc.avgRainfall}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-5 h-5 text-emerald-300" />}
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <p className="text-[11px] text-center text-gray-400 font-medium">
            Location choices are encrypted locally and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};
