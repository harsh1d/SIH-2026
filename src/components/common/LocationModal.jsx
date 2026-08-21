import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Search, X, Check, Sparkles, Sprout, Globe, Loader2, Compass } from 'lucide-react';

export const LocationModal = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    location, 
    updateLocation, 
    useBrowserGeolocation, 
    isLocatingGPS,
    gpsStatusText,
    locationDatabase,
    t 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');

  if (!isLocationModalOpen) return null;

  const statesList = ['All', 'Gujarat', 'Punjab', 'Haryana', 'Maharashtra', 'Madhya Pradesh', 'Uttar Pradesh', 'Rajasthan', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'West Bengal', 'Himachal Pradesh'];

  const filteredLocations = locationDatabase.filter(loc => {
    const matchesSearch = 
      loc.formatted.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loc.village && loc.village.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (loc.primaryCrops && loc.primaryCrops.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesState = selectedStateFilter === 'All' || loc.state.toLowerCase().includes(selectedStateFilter.toLowerCase());

    return matchesSearch && matchesState;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-agri-soft/40 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-dark via-emerald-900 to-gov-green text-white p-6 relative flex-shrink-0">
          <button 
            onClick={() => setIsLocationModalOpen(false)}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-white/10 rounded-2xl text-emerald-200 backdrop-blur-md border border-white/20">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-sans">Farm Location & Agro-Zone Selector</h3>
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-gov-gold/20 text-gov-gold border border-gov-gold/30 rounded-full">
                  GPS & Agro-Sync
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                Auto-syncs soil types, crop lifecycles, APMC mandi rates, and local weather radar
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* GPS Auto-Detect Button */}
          <div className="space-y-2">
            <button
              onClick={() => useBrowserGeolocation()}
              disabled={isLocatingGPS}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gradient-to-r from-agri-dark via-emerald-900 to-agri-primary text-white hover:opacity-95 rounded-2xl font-black border border-gov-gold/30 transition-all shadow-agri group text-xs sm:text-sm cursor-pointer disabled:opacity-75"
            >
              {isLocatingGPS ? (
                <Loader2 className="w-5 h-5 text-emerald-300 animate-spin" />
              ) : (
                <Navigation className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
              )}
              <span>{isLocatingGPS ? 'Detecting Precise GPS Location...' : (t.location?.useGPS || "Use GPS Geolocation (Auto-Detect Farm)")}</span>
            </button>

            {/* GPS Locating Status Readout */}
            {isLocatingGPS && gpsStatusText && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{gpsStatusText}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-1">
            <hr className="flex-1 border-gray-200" />
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Or Select Any District / State in India</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t.location?.searchPlaceholder || "Search district, village, state, or crop (e.g. Ludhiana, Wheat, Nashik)..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary focus:bg-white font-medium transition-all"
            />
          </div>

          {/* State Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {statesList.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedStateFilter === st 
                    ? 'bg-agri-dark text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Location List Cards */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {filteredLocations.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No matching agricultural districts found. Try searching for state or crop name.
              </div>
            ) : (
              filteredLocations.map((loc, idx) => {
                const isSelected = location.formatted === loc.formatted || location.district === loc.district;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      updateLocation(loc, true);
                      setIsLocationModalOpen(false);
                    }}
                    className={`w-full flex items-start justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-agri-dark text-white border-agri-dark shadow-md'
                        : 'bg-white hover:bg-agri-bg border-gray-100 text-gray-700 hover:border-agri-soft/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-emerald-300' : 'text-earth-terracotta'}`} />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold">{loc.formatted}</span>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {loc.state}
                          </span>
                        </div>

                        <div className={`text-[11px] ${isSelected ? 'text-emerald-200 font-medium' : 'text-gray-500 font-medium'}`}>
                          {loc.agroZone || "Agro-Climatic Zone"} • Rainfall: {loc.avgRainfall}
                        </div>

                        {/* Crops & Soil Preview */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-100' : 'text-gray-600'}`}>
                            🌾 Crops: {loc.primaryCrops?.join(', ')}
                          </span>
                          <span className={`text-[10px] ${isSelected ? 'text-emerald-300' : 'text-earth-walnut font-semibold'}`}>
                            • Soil: {loc.soilType?.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="p-1 rounded-full bg-emerald-500/30 text-emerald-300">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Note */}
          <div className="p-3 bg-earth-cream rounded-2xl border border-earth-wheat/30 text-[11px] text-earth-walnut flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-earth-terracotta flex-shrink-0" />
            <span>Selecting any location automatically configures precision soil models, crop cycles, and local APMC market feeds.</span>
          </div>

        </div>
      </div>
    </div>
  );
};
