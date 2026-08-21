import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, MapPin, Sprout, Save, ShieldCheck, Check, Droplets, Sparkles } from 'lucide-react';

export const ProfilePage = () => {
  const { farmerProfile, updateFarmerProfile, location, showToast } = useApp();

  const [name, setName] = useState(farmerProfile.name || '');
  const [phone, setPhone] = useState(farmerProfile.phone || '');
  const [farmSize, setFarmSize] = useState(farmerProfile.farmSizeAcres || 4.5);
  const [soil, setSoil] = useState(farmerProfile.soilType || 'Black Cotton Soil (Regur)');
  const [irrigation, setIrrigation] = useState(farmerProfile.irrigationType || 'Drip Irrigation + Tube Well');
  const [selectedCrops, setSelectedCrops] = useState(farmerProfile.primaryCrops || ['Cotton', 'Wheat', 'Tomato']);

  const cropOptions = ['Cotton', 'Wheat', 'Tomato', 'Maize', 'Soybean', 'Mustard', 'Sugarcane', 'Paddy'];

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
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
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
                <option value="Black Cotton Soil (Regur)">Black Cotton Soil (Regur)</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Red & Yellow Sandy Soil">Red & Yellow Sandy Soil</option>
                <option value="Laterite Clay Soil">Laterite Clay Soil</option>
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
              <option value="Micro-Sprinkler Irrigation">Micro-Sprinkler Irrigation</option>
              <option value="Canal Gravity Flow">Canal Gravity Flow</option>
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
                    className={`px-3.5 py-2 rounded-xl font-extrabold text-xs transition-all ${
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

          <div className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/40 space-y-1">
            <span className="font-extrabold text-agri-dark block text-[10px] uppercase tracking-wider">Active Location Telemetry</span>
            <span className="text-gray-700 font-bold">{location.formatted}</span>
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
