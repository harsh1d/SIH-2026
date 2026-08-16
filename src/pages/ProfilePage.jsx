import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, MapPin, Sprout, Save, ShieldCheck, Check } from 'lucide-react';

export const ProfilePage = () => {
  const { farmerProfile, setFarmerProfile, location, showToast } = useApp();

  const [name, setName] = useState(farmerProfile.name);
  const [phone, setPhone] = useState(farmerProfile.phone);
  const [farmSize, setFarmSize] = useState(farmerProfile.farmSizeAcres);
  const [soil, setSoil] = useState(farmerProfile.soilType);

  const handleSave = (e) => {
    e.preventDefault();
    setFarmerProfile(prev => ({
      ...prev,
      name,
      phone,
      farmSizeAcres: Number(farmSize),
      soilType: soil
    }));
    showToast('Farmer Profile updated successfully!');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-agri-dark text-white flex items-center justify-center font-bold text-xl shadow-md">
            <User className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-agri-dark font-sans">Farmer Profile Settings</h1>
            <p className="text-xs text-gray-500">Configure your farm parameters for hyper-personalized AI advisories.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Farmer Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Contact Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Total Farm Land Area (Acres)</label>
              <input 
                type="number" 
                step="0.1" 
                value={farmSize} 
                onChange={(e) => setFarmSize(e.target.value)} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Primary Soil Type</label>
              <select 
                value={soil} 
                onChange={(e) => setSoil(e.target.value)} 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
              >
                <option value="Black Cotton Soil (Regur)">Black Cotton Soil (Regur)</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Red & Yellow Sandy Soil">Red & Yellow Sandy Soil</option>
                <option value="Laterite Clay Soil">Laterite Clay Soil</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/40 space-y-1">
            <span className="font-bold text-agri-dark block">Active Location Preference</span>
            <span className="text-gray-600 font-medium">{location.formatted}</span>
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 bg-agri-dark hover:bg-agri-primary text-white font-bold rounded-2xl shadow-agri transition-all text-xs flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4 text-emerald-300" /> Save Profile Preferences
          </button>
        </form>
      </div>

    </div>
  );
};
