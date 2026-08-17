import React from 'react';
import { useApp } from '../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { 
  BarChart3, 
  Users, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  MapPin,
  TrendingUp,
  Award,
  Landmark
} from 'lucide-react';

export const AdminDashboard = () => {
  const { t } = useApp();

  const queryBreakdownData = [
    { category: 'Cotton Pests', queries: 420 },
    { category: 'Wheat Irrigation', queries: 310 },
    { category: 'Tomato Blight', queries: 280 },
    { category: 'Mandi Rates', queries: 540 },
    { category: 'Govt Schemes', queries: 390 }
  ];

  const diseaseHeatmapData = [
    { name: 'Panchmahal', value: 45 },
    { name: 'Vadodara', value: 30 },
    { name: 'Anand', value: 15 },
    { name: 'Chhota Udepur', value: 10 }
  ];

  const COLORS = ['#143D20', '#2D7A41', '#4E9F5B', '#DA9C4B'];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-agri-dark via-emerald-950 to-gov-green text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-2 border border-gov-gold/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
              <BarChart3 className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight">KVK Regional Disease Analytics & Telemetry</h1>
              <p className="text-xs text-emerald-200 font-medium">District Station Overseer View • Smart India Hackathon Portal</p>
            </div>
          </div>
          <span className="px-3.5 py-1 bg-white/10 rounded-full text-xs font-black text-gov-gold border border-gov-gold/40 uppercase tracking-wider">
            Live SIH Portal
          </span>
        </div>
      </div>

      {/* EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registered Farmers</span>
          <div className="text-2xl font-black text-agri-dark">14,820</div>
          <span className="text-[10px] font-bold text-emerald-600">+12% this month</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Telemetry Queries</span>
          <div className="text-2xl font-black text-ai-plum">1,940</div>
          <span className="text-[10px] font-bold text-ai-purple">94.2% AI resolution</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Outbreaks</span>
          <div className="text-2xl font-black text-amber-600">3 Regional</div>
          <span className="text-[10px] font-bold text-amber-700">Pink Bollworm Alert</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">KVK Tickets Resolved</span>
          <div className="text-2xl font-black text-emerald-800">412</div>
          <span className="text-[10px] font-bold text-emerald-600">Avg 2.4h response</span>
        </div>

      </div>

      {/* ANALYTICS CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Most Frequent Farmer Queries */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-agri-dark uppercase tracking-wider">Farmer Query Category Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queryBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="category" stroke="#9CA3AF" fontSize={10} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ background: '#143D20', color: '#fff', borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="queries" fill="#2D7A41" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Disease Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-agri-dark uppercase tracking-wider">Regional Leaf Outbreak Heatmap</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseHeatmapData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {diseaseHeatmapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
