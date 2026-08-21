import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/common/Toast';
import { LocationModal } from './components/common/LocationModal';
import { CommandPalette } from './components/common/CommandPalette';

import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { CropDoctorPage } from './pages/CropDoctorPage';
import { MyFarmPage } from './pages/MyFarmPage';
import { CropJourneyPage } from './pages/CropJourneyPage';
import { CropHealthPage } from './pages/CropHealthPage';
import { WeatherPage } from './pages/WeatherPage';
import { MarketPage } from './pages/MarketPage';
import { SchemesPage } from './pages/SchemesPage';
import { AlertsPage } from './pages/AlertsPage';
import { ExpertPage } from './pages/ExpertPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';

const MainContent = () => {
  const { activeTab, isCommandPaletteOpen, setIsCommandPaletteOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'ai':
        return <AIAssistantPage />;
      case 'cropDoctor':
        return <CropDoctorPage />;
      case 'myFarm':
        return <MyFarmPage />;
      case 'cropJourney':
        return <CropJourneyPage />;
      case 'cropHealth':
        return <CropHealthPage />;
      case 'weather':
        return <WeatherPage />;
      case 'market':
        return <MarketPage />;
      case 'schemes':
        return <SchemesPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'expert':
        return <ExpertPage />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'admin':
        return <AdminDashboard />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-agri-bg flex flex-col justify-between selection:bg-agri-primary selection:text-white">
      
      {/* Header */}
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Main Shell */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Sidebar */}
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />

        {/* Page Content Viewport */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-hidden">
          {renderPage()}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Shared Modals & Micro-interactions */}
      <LocationModal />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
