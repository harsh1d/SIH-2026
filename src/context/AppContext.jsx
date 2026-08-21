import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  defaultFarmerProfile, 
  mockAlerts, 
  mockExpertTickets, 
  locationDatabase,
  getAgroRegionForLocation,
  generateCropsForRegion,
  generateMandiRatesForRegion,
  generateWeatherDataForRegion,
  generateAlertsForRegion,
  generateSchemesForLocation
} from '../data/mockData';
import { translations } from '../data/translations';
import { reverseGeocodeCoords, fetchLiveAgroWeather } from '../services/geoService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agrisaathi_lang') || 'en';
  });

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('agrisaathi_profile');
    return saved ? JSON.parse(saved) : defaultFarmerProfile;
  });

  const [location, setLocation] = useState(() => {
    return farmerProfile.location || defaultFarmerProfile.location;
  });

  // Matched Agro-Climatic Zone
  const [agroRegion, setAgroRegion] = useState(() => {
    return getAgroRegionForLocation(farmerProfile.location);
  });

  // Dynamic Reactive State across all modules
  const [crops, setCrops] = useState(() => {
    const matched = getAgroRegionForLocation(farmerProfile.location);
    return generateCropsForRegion(matched, farmerProfile.primaryCrops);
  });

  const [weatherData, setWeatherData] = useState(() => {
    const matched = getAgroRegionForLocation(farmerProfile.location);
    return generateWeatherDataForRegion(farmerProfile.location, matched);
  });

  const [mandiRates, setMandiRates] = useState(() => {
    const matched = getAgroRegionForLocation(farmerProfile.location);
    const initialCrops = generateCropsForRegion(matched, farmerProfile.primaryCrops);
    return generateMandiRatesForRegion(matched, initialCrops);
  });

  const [alerts, setAlerts] = useState(() => {
    const matched = getAgroRegionForLocation(farmerProfile.location);
    return generateAlertsForRegion(farmerProfile.location, matched, weatherData);
  });

  const [schemes, setSchemes] = useState(() => {
    const matched = getAgroRegionForLocation(farmerProfile.location);
    return generateSchemesForLocation(farmerProfile.location, matched);
  });

  const [activeRole, setActiveRole] = useState('farmer'); // 'farmer' | 'expert' | 'admin'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expertCases, setExpertCases] = useState(mockExpertTickets);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // GPS Live Locating State
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [gpsStatusText, setGpsStatusText] = useState('');

  useEffect(() => {
    localStorage.setItem('agrisaathi_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('agrisaathi_profile', JSON.stringify(farmerProfile));
  }, [farmerProfile]);

  // Global Keyboard Shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const t = translations[language] || translations.en;

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  /**
   * Updates Location & Synchronizes Agro-Climatic Zone, Crops, Soil, Weather, Mandis & Alerts
   */
  const updateLocation = useCallback(async (newLoc, shouldSyncAgro = true, profileOverrides = {}) => {
    const resolvedRegion = getAgroRegionForLocation(newLoc);
    setAgroRegion(resolvedRegion);
    setLocation(newLoc);

    let updatedCropsList = crops;

    if (shouldSyncAgro) {
      const newSoilType = profileOverrides.soilType || resolvedRegion.soilType || "Black Cotton Soil (Regur)";
      const newIrrigation = profileOverrides.irrigationType || resolvedRegion.irrigationType || "Drip Irrigation + Tube Well";
      const newAgriType = resolvedRegion.agricultureType || "Commercial Multi-Cropping";
      const newPrimaryCrops = profileOverrides.primaryCrops || resolvedRegion.primaryCrops || ["Cotton", "Wheat", "Tomato"];

      // 1. Update Farmer Profile
      setFarmerProfile(prev => ({
        ...prev,
        location: newLoc,
        soilType: newSoilType,
        irrigationType: newIrrigation,
        agricultureType: newAgriType,
        primaryCrops: newPrimaryCrops,
        ...profileOverrides
      }));

      // 2. Generate Dynamic Crops
      updatedCropsList = generateCropsForRegion(resolvedRegion, newPrimaryCrops);
      setCrops(updatedCropsList);

      // 3. Generate Dynamic Mandi Rates
      const newMandis = generateMandiRatesForRegion(resolvedRegion, updatedCropsList);
      setMandiRates(newMandis);

      // 4. Generate Initial Weather & Alerts
      const newWeather = generateWeatherDataForRegion(newLoc, resolvedRegion);
      setWeatherData(newWeather);

      const newAlerts = generateAlertsForRegion(newLoc, resolvedRegion, newWeather);
      setAlerts(newAlerts);

      // 5. Generate State & Central Schemes
      const newSchemes = generateSchemesForLocation(newLoc, resolvedRegion);
      setSchemes(newSchemes);

      // 6. Asynchronously fetch live Open-Meteo weather if coordinates exist
      if (typeof newLoc.lat === 'number' && typeof newLoc.lng === 'number') {
        fetchLiveAgroWeather(newLoc.lat, newLoc.lng).then(liveData => {
          if (liveData) {
            const enrichedWeather = generateWeatherDataForRegion(newLoc, resolvedRegion, liveData);
            setWeatherData(enrichedWeather);
          }
        }).catch(err => {
          console.warn('Live weather async fetch:', err);
        });
      }

      showToast(
        `Location updated to ${newLoc.formatted} • Synchronized with ${resolvedRegion.agroZone}!`,
        'success'
      );
    } else {
      setFarmerProfile(prev => ({
        ...prev,
        location: newLoc,
        ...profileOverrides
      }));
      showToast(`Location set to ${newLoc.formatted}`, 'info');
    }
  }, [crops]);

  /**
   * Farmer Profile Manual Updates (e.g. from Profile Page)
   */
  const updateFarmerProfile = (updates) => {
    setFarmerProfile(prev => {
      const updated = { ...prev, ...updates };
      if (updates.location) {
        setLocation(updates.location);
      }
      return updated;
    });

    // If crops or location were updated, re-sync crop models and mandis
    if (updates.primaryCrops) {
      const matchedRegion = getAgroRegionForLocation(updates.location || location);
      const newCrops = generateCropsForRegion(matchedRegion, updates.primaryCrops);
      setCrops(newCrops);
      const newMandis = generateMandiRatesForRegion(matchedRegion, newCrops);
      setMandiRates(newMandis);
    }

    showToast('Farmer Profile updated across all AI telemetry modules!', 'success');
  };

  /**
   * Browser GPS Geolocation with Real Reverse Geocoding and Agro-Sync
   */
  const useBrowserGeolocation = () => {
    if (!('geolocation' in navigator)) {
      showToast('Geolocation is not supported by your browser. Please select district manually.', 'error');
      setIsLocationModalOpen(true);
      return;
    }

    setIsLocatingGPS(true);
    setGpsStatusText('Requesting GPS sensor permission...');
    showToast('Acquiring high-accuracy GPS coordinates...', 'info');

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setGpsStatusText(`GPS Locked (${latitude.toFixed(3)}°N, ${longitude.toFixed(3)}°E). Reverse geocoding location...`);

        try {
          // Perform real reverse geocoding via OpenStreetMap / BigDataCloud
          const geocoded = await reverseGeocodeCoords(latitude, longitude);
          
          setGpsStatusText(`Identified: ${geocoded.formatted}. Matching agro-climatic zone...`);

          const detectedLoc = {
            village: geocoded.village,
            district: geocoded.district,
            state: geocoded.state,
            pincode: geocoded.pincode,
            lat: latitude,
            lng: longitude,
            formatted: geocoded.formatted,
            isGpsVerified: true
          };

          await updateLocation(detectedLoc, true);
          setIsLocatingGPS(false);
          setGpsStatusText('');
          setIsLocationModalOpen(false);
        } catch (err) {
          console.warn('Geocoding processing fallback:', err);
          // Fallback nearest region by coords
          const nearestAgro = getAgroRegionForLocation({ lat: latitude, lng: longitude });
          const detectedLoc = {
            village: `${nearestAgro.village} (GPS Verified)`,
            district: nearestAgro.district,
            state: nearestAgro.state,
            pincode: nearestAgro.pincode,
            lat: latitude,
            lng: longitude,
            formatted: `${nearestAgro.village}, ${nearestAgro.district}, ${nearestAgro.state} (GPS: ${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
            isGpsVerified: true
          };

          await updateLocation(detectedLoc, true);
          setIsLocatingGPS(false);
          setGpsStatusText('');
          setIsLocationModalOpen(false);
        }
      },
      (error) => {
        setIsLocatingGPS(false);
        setGpsStatusText('');
        let errorMsg = 'GPS location unavailable. Please select your district from the list.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'GPS location permission denied. Please select your district manually.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'GPS request timed out. Switched to manual district selector.';
        }
        showToast(errorMsg, 'error');
        setIsLocationModalOpen(true);
      },
      geoOptions
    );
  };

  const markAlertAsRead = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    showToast('Alert dismissed');
  };

  const addExpertCase = (newCase) => {
    setExpertCases(prev => [newCase, ...prev]);
    showToast('Case successfully submitted to KVK Agronomist team!');
  };

  const resolveExpertCase = (caseId, responseText, expertName) => {
    setExpertCases(prev => prev.map(item => {
      if (item.id === caseId) {
        return {
          ...item,
          status: 'Resolved',
          statusColor: 'emerald',
          expertName: expertName || 'Dr. S. K. Sharma (KVK Senior Agronomist)',
          expertResponse: responseText,
          resolvedDate: new Date().toLocaleString()
        };
      }
      return item;
    }));
    showToast('Expert response issued and case marked as resolved!', 'success');
  };

  const resetDemoData = () => {
    setFarmerProfile(defaultFarmerProfile);
    setLocation(defaultFarmerProfile.location);
    const baseRegion = getAgroRegionForLocation(defaultFarmerProfile.location);
    setAgroRegion(baseRegion);
    const baseCrops = generateCropsForRegion(baseRegion, defaultFarmerProfile.primaryCrops);
    setCrops(baseCrops);
    const baseWeather = generateWeatherDataForRegion(defaultFarmerProfile.location, baseRegion);
    setWeatherData(baseWeather);
    setMandiRates(generateMandiRatesForRegion(baseRegion, baseCrops));
    setAlerts(generateAlertsForRegion(defaultFarmerProfile.location, baseRegion, baseWeather));
    setSchemes(generateSchemesForLocation(defaultFarmerProfile.location, baseRegion));
    setLanguage('en');
    setActiveRole('farmer');
    setActiveTab('dashboard');
    showToast('Demo data reset to initial presentation state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        farmerProfile,
        setFarmerProfile,
        updateFarmerProfile,
        location,
        updateLocation,
        agroRegion,
        crops,
        weatherData,
        mandiRates,
        schemes,
        useBrowserGeolocation,
        isLocatingGPS,
        gpsStatusText,
        locationDatabase,
        activeRole,
        setActiveRole,
        activeTab,
        setActiveTab,
        alerts,
        markAlertAsRead,
        expertCases,
        addExpertCase,
        resolveExpertCase,
        toastMessage,
        showToast,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
