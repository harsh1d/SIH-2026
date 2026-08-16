import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultFarmerProfile, mockAlerts, mockExpertTickets, locationDatabase } from '../data/mockData';
import { translations } from '../data/translations';

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
    return farmerProfile.location;
  });

  const [activeRole, setActiveRole] = useState('farmer'); // 'farmer' | 'expert' | 'admin'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState(mockAlerts);
  const [expertCases, setExpertCases] = useState(mockExpertTickets);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('agrisaathi_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('agrisaathi_profile', JSON.stringify(farmerProfile));
  }, [farmerProfile]);

  const t = translations[language] || translations.en;

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateLocation = (newLoc) => {
    setLocation(newLoc);
    setFarmerProfile(prev => ({
      ...prev,
      location: newLoc
    }));
    showToast(`Location updated to ${newLoc.formatted}`, 'info');
  };

  const useBrowserGeolocation = () => {
    if ('geolocation' in navigator) {
      showToast('Fetching browser GPS location...', 'info');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Nearest simulated district for demo accuracy
          const detectedLoc = {
            village: "Halol (GPS Verified)",
            district: "Panchmahal",
            state: "Gujarat",
            pincode: "389350",
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            formatted: `Halol, Panchmahal, Gujarat (GPS: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)})`
          };
          updateLocation(detectedLoc);
        },
        (error) => {
          showToast('GPS permission denied or unavailable. Fallback to manual selection.', 'error');
          setIsLocationModalOpen(true);
        }
      );
    } else {
      showToast('Geolocation not supported by browser. Select manually.', 'error');
      setIsLocationModalOpen(true);
    }
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
    setAlerts(mockAlerts);
    setExpertCases(mockExpertTickets);
    setLanguage('en');
    setActiveRole('farmer');
    setActiveTab('dashboard');
    showToast('Demo data reset to initial hackathon presentation state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        farmerProfile,
        setFarmerProfile,
        location,
        updateLocation,
        useBrowserGeolocation,
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
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
