import React, { useState, Component } from 'react';
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
import { RotateCcw, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("AgriSaathi Render Error Caught:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('agrisaathi_profile');
      localStorage.removeItem('agrisaathi_lang');
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-agri-bg flex items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl border border-rose-200 shadow-2xl max-w-lg space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-agri-dark">AgriSaathi Session Recovery</h2>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              We encountered a temporary interface state issue. Click below to reset the cache and restore live agricultural telemetry.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3.5 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs rounded-2xl shadow-agri transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-300" />
              <span>Reset & Reload Platform</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
