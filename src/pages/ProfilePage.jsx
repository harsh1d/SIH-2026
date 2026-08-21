import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { User, MapPin, Sprout, Save, ShieldCheck, Check, Droplets, Sparkles, Compass } from 'lucide-react';

export const ProfilePage = () => {
  const { farmerProfile, updateFarmerProfile, location, agroRegion, setIsLocationModalOpen, showToast } = useApp();

  const [name, setName] = useState(farmerProfile.name || '');
  const [phone, setPhone] = useState(farmerProfile.phone || '');
  const [farmSize, setFarmSize] = useState(farmerProfile.farmSizeAcres || 4.5);
  const [soil, setSoil] = useState(farmerProfile.soilType || 'Black Cotton Soil (Regur)');
  const [irrigation, setIrrigation] = useState(farmerProfile.irrigationType || 'Drip Irrigation + Tube Well');
  const [selectedCrops, setSelectedCrops] = useState(farmerProfile.primaryCrops || ['Cotton', 'Wheat', 'Tomato']);

  // Sync form state when farmerProfile or location changes in AppContext
  useEffect(() => {
    setName(farmerProfile.name || '');
    setPhone(farmerProfile.phone || '');
    setFarmSize(farmerProfile.farmSizeAcres || 4.5);
    setSoil(farmerProfile.soilType || 'Black Cotton Soil (Regur)');
    setIrrigation(farmerProfile.irrigationType || 'Drip Irrigation + Tube Well');
    setSelectedCrops(farmerProfile.primaryCrops || ['Cotton', 'Wheat', 'Tomato']);
  }, [farmerProfile]);

  const cropOptions = ['Cotton', 'Wheat', 'Tomato', 'Paddy', 'Mustard', 'Soybean', 'Sugarcane', 'Maize'];
  const soilOptions = [
    'Black Cotton Soil (Regur)',
    'Indo-Gangetic Fertile Alluvial Loam',
    'Alluvial Soil',
    'Medium Black Calcareous Soil',
    'Red & Yellow Sandy Soil',
    'Laterite Clay Soil',
    'Brown Mountain Loamy Soil'
  ];

  const toggleCrop = (crop) => {
    if (selectedCrops.includes(crop)) {
      if (selectedCrops.length > 1) {
        setSelectedCrops(selectedCrops.filter(c => c !== crop));
      } else {
        showToast('Please keep at least one registered crop.', 'error');
      }
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateFarmerProfile({
      name,
      phone,
      farmSizeAcres: Number(farmSize),
      soilType: soil,
      irrigationType: irrigation,
      primaryCrops: selectedCrops
    });
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-agri-dark text-white flex items-center justify-center font-bold text-xl shadow-md border border-gov-gold/40">
              <User className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-agri-dark font-sans tracking-tight">Farmer Profile & Telemetry</h1>
                <span className="px-2.5 py-0.5 bg-purple-100 text-ai-plum font-extrabold text-[10px] rounded-full uppercase">
                  AI Grounding Baseline
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Configure your farm parameters for hyper-personalized AI advisories and subsidy matching.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-agri-bg hover:bg-agri-light text-agri-dark text-xs font-black rounded-xl border border-agri-soft/50 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-earth-terracotta" />
            <span>Change Location / GPS</span>
          </button>
        </div>

        {/* Location & Agro-Zone Badge */}
        <div className="p-4 bg-gradient-to-r from-agri-bg to-emerald-50 rounded-2xl border border-agri-soft/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-black text-agri-dark uppercase tracking-wider text-[10px]">Active Farm Location</span>
            <div className="font-extrabold text-sm text-agri-dark flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-earth-terracotta" /> {location.formatted}
            </div>
            <div className="text-[11px] text-gray-600 font-medium">
              Agro-Climatic Zone: <strong className="text-earth-walnut">{agroRegion?.agroZone || "National Agricultural Zone"}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="self-start sm:self-auto text-xs font-bold text-agri-primary hover:underline"
          >
            Switch District →
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div>
            <label className="font-extrabold text-gray-700 block mb-1">Farmer Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div>
            <label className="font-extrabold text-gray-700 block mb-1">Contact Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-extrabold text-gray-700 block mb-1">Total Farm Land Area (Acres)</label>
              <input 
                type="number" 
                step="0.1" 
                value={farmSize} 
                onChange={(e) => setFarmSize(e.target.value)} 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
              />
            </div>

            <div>
              <label className="font-extrabold text-gray-700 block mb-1">Primary Soil Type</label>
              <select 
                value={soil} 
                onChange={(e) => setSoil(e.target.value)} 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
              >
                {soilOptions.map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-extrabold text-gray-700 block mb-1">Irrigation System Infrastructure</label>
            <select 
              value={irrigation} 
              onChange={(e) => setIrrigation(e.target.value)} 
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
            >
              <option value="Drip Irrigation + Tube Well">Drip Irrigation + Tube Well</option>
              <option value="Canal Gravity + Submersible Deep Tube Well">Canal Gravity + Submersible Deep Tube Well</option>
              <option value="Narmada Canal Lift + Drip Irrigation">Narmada Canal Lift + Drip Irrigation</option>
              <option value="Drip Irrigation + Farm Pond (Shettale) + Well">Drip Irrigation + Farm Pond (Shettale) + Well</option>
              <option value="Tube Well + Sprinkler & Check Dam Lift">Tube Well + Sprinkler & Check Dam Lift</option>
              <option value="Borewell Drip + River Lift Irrigation">Borewell Drip + River Lift Irrigation</option>
              <option value="Monsoon Rainfed + River Lift & Micro-Sprinkler">Monsoon Rainfed + River Lift & Micro-Sprinkler</option>
              <option value="Rainfed (Non-irrigated)">Rainfed (Non-irrigated)</option>
            </select>
          </div>

          <div>
            <label className="font-extrabold text-gray-700 block mb-2">Registered Primary Crops for Farm Telemetry</label>
            <div className="flex flex-wrap gap-2">
              {cropOptions.map((crop) => {
                const isSelected = selectedCrops.includes(crop);
                return (
                  <button
                    type="button"
                    key={crop}
                    onClick={() => toggleCrop(crop)}
                    className={`px-3.5 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-agri-dark text-white shadow-xs border border-gov-gold/30' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🌾 {crop} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-agri-dark hover:bg-agri-primary text-white font-extrabold rounded-2xl shadow-agri transition-all text-xs flex items-center justify-center gap-2 border border-gov-gold/30 cursor-pointer"
          >
            <Save className="w-4 h-4 text-emerald-300" /> Save Profile Preferences & Update AI Baseline
          </button>
        </form>
      </div>

    </div>
  );
};
