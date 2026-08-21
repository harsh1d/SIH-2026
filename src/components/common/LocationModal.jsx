import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { searchIndianLocations } from '../../services/geoService';
import { 
  MapPin, 
  Navigation, 
  Search, 
  X, 
  Check, 
  Sparkles, 
  Sprout, 
  Globe, 
  Loader2, 
  Compass,
  Building2,
  TreePine
} from 'lucide-react';

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
  const [liveSearchResults, setLiveSearchResults] = useState([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  const searchTimeoutRef = useRef(null);

  // Debounced live searching across all Indian villages & cities
  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setLiveSearchResults([]);
      setIsSearchingLive(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearchingLive(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchIndianLocations(searchTerm);
        setLiveSearchResults(results);
      } catch (e) {
        console.warn('Live search error:', e);
      } finally {
        setIsSearchingLive(false);
      }
    }, 350);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  if (!isLocationModalOpen) return null;

  const statesList = [
    'All',
    'Gujarat',
    'Punjab',
    'Haryana',
    'Maharashtra',
    'Madhya Pradesh',
    'Uttar Pradesh',
    'Rajasthan',
    'Karnataka',
    'Kerala',
    'Tamil Nadu',
    'Andhra Pradesh',
    'West Bengal',
    'Bihar',
    'Himachal Pradesh'
  ];

  // Filter curated database
  const localFiltered = (locationDatabase || []).filter(loc => {
    if (!loc) return false;
    const term = (searchTerm || '').toLowerCase();
    const formatted = (loc.formatted || '').toLowerCase();
    const district = (loc.district || '').toLowerCase();
    const state = (loc.state || '').toLowerCase();
    const village = (loc.village || '').toLowerCase();

    const matchesSearch = 
      formatted.includes(term) ||
      district.includes(term) ||
      state.includes(term) ||
      village.includes(term) ||
      (Array.isArray(loc.primaryCrops) && loc.primaryCrops.some(c => c && c.toLowerCase().includes(term)));

    const matchesState = selectedStateFilter === 'All' || state.includes(selectedStateFilter.toLowerCase());

    return matchesSearch && matchesState;
  });

  // Combine curated database + live OpenStreetMap geocoded Indian villages/cities
  const combinedResults = [...localFiltered];

  if (Array.isArray(liveSearchResults) && liveSearchResults.length > 0) {
    liveSearchResults.forEach(liveLoc => {
      if (!liveLoc) return;
      const liveFormatted = (liveLoc.formatted || '').toLowerCase();
      const liveDistrict = (liveLoc.district || '').toLowerCase();
      const liveVillage = (liveLoc.village || '').toLowerCase();

      const alreadyPresent = combinedResults.some(c => {
        if (!c) return false;
        const cFormatted = (c.formatted || '').toLowerCase();
        const cDistrict = (c.district || '').toLowerCase();
        const cVillage = (c.village || '').toLowerCase();
        return cFormatted === liveFormatted || (cDistrict && cDistrict === liveDistrict && cVillage && cVillage === liveVillage);
      });

      if (!alreadyPresent) {
        combinedResults.push(liveLoc);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-agri-soft/40 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-dark via-emerald-900 to-gov-green text-white p-6 relative flex-shrink-0">
          <button 
            onClick={() => {
              setIsLocationModalOpen(false);
              setSearchTerm('');
              setLiveSearchResults([]);
            }}
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
                <h3 className="text-xl font-black font-sans">Pan-India Farm Location Finder</h3>
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-gov-gold/20 text-gov-gold border border-gov-gold/30 rounded-full">
                  All Villages & Cities
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                Search any village, taluka, city, or district across all 28 Indian States & UTs
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
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Search Any Location Across India</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search any village, taluka, city, district, or pin code in India..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary focus:bg-white font-medium transition-all"
            />
            {isSearchingLive ? (
              <Loader2 className="w-4 h-4 text-agri-primary absolute right-3.5 top-4 animate-spin" />
            ) : searchTerm ? (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setLiveSearchResults([]);
                }}
                className="p-1 text-gray-400 hover:text-gray-600 absolute right-3 top-3"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {/* State Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {statesList.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
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
            {combinedResults.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs space-y-2">
                <Globe className="w-8 h-8 mx-auto text-gray-300" />
                <p>No matching locations found for "{searchTerm}".</p>
                <p className="text-[11px] text-gray-400">Try typing another village, district, or state name.</p>
              </div>
            ) : (
              combinedResults.map((loc, idx) => {
                if (!loc) return null;
                const isSelected = 
                  (location?.formatted && loc.formatted && location.formatted === loc.formatted) || 
                  (location?.district && loc.district && location.district.toLowerCase() === loc.district.toLowerCase() && location?.village === loc.village);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      updateLocation(loc, true);
                      setIsLocationModalOpen(false);
                      setSearchTerm('');
                      setLiveSearchResults([]);
                    }}
                    className={`w-full flex items-start justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-agri-dark text-white border-agri-dark shadow-md'
                        : 'bg-white hover:bg-agri-bg border-gray-100 text-gray-700 hover:border-agri-soft/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-emerald-300' : 'text-earth-terracotta'}`} />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold">{loc.formatted}</span>
                          {loc.state && (
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {loc.state}
                            </span>
                          )}
                          {loc.isLiveResult && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                              isSelected ? 'bg-purple-900/60 text-purple-200' : 'bg-purple-50 text-ai-plum border border-purple-200'
                            }`}>
                              Live Match
                            </span>
                          )}
                        </div>

                        <div className={`text-[11px] ${isSelected ? 'text-emerald-200 font-medium' : 'text-gray-500 font-medium'}`}>
                          {loc.agroZone ? `${loc.agroZone} • Rainfall: ${loc.avgRainfall}` : `GPS: ${loc.lat?.toFixed(3)}°N, ${loc.lng?.toFixed(3)}°E`}
                        </div>

                        {/* Crops & Soil Preview */}
                        {loc.primaryCrops && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-100' : 'text-gray-600'}`}>
                              🌾 Crops: {loc.primaryCrops?.join(', ')}
                            </span>
                            <span className={`text-[10px] ${isSelected ? 'text-emerald-300' : 'text-earth-walnut font-semibold'}`}>
                              • Soil: {loc.soilType?.split(' ')[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="p-1 rounded-full bg-emerald-500/30 text-emerald-300 flex-shrink-0">
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
            <span>Any selected Indian village or city automatically maps to its regional agro-climatic zone, soil type, and crops.</span>
          </div>

        </div>
      </div>
    </div>
  );
};
