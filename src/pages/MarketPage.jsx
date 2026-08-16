import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockMandiRates } from '../data/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  TrendingUp, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  IndianRupee, 
  Sparkles,
  Info
} from 'lucide-react';

export const MarketPage = () => {
  const { location, t } = useApp();

  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [sortBy, setSortBy] = useState('highest'); // 'highest' | 'distance'

  const activeMandiData = mockMandiRates[selectedCropIndex] || mockMandiRates[0];

  const sortedMarkets = [...activeMandiData.markets].sort((a, b) => {
    if (sortBy === 'highest') return b.price - a.price;
    return a.distanceKm - b.distanceKm;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-earth-walnut uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-earth-terracotta" /> Mandi Intelligence & Prices
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark font-sans">
            {t.market.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {t.market.subtitle}
          </p>
        </div>

        {/* Commodity Selector Dropdown */}
        <div className="flex items-center gap-2">
          {mockMandiRates.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCropIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedCropIndex === idx 
                  ? 'bg-earth-walnut text-white shadow-earth' 
                  : 'bg-gray-100 text-gray-700 hover:bg-earth-sand/50'
              }`}
            >
              {item.crop}
            </button>
          ))}
        </div>
      </div>

      {/* HIGHLIGHT STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Commodity Selected</span>
          <div className="text-xl font-extrabold text-agri-dark">{activeMandiData.crop}</div>
          <span className="text-xs font-semibold text-gray-500">{activeMandiData.variety}</span>
        </div>

        <div className="p-5 bg-emerald-50/80 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Highest Nearby Price</span>
          <div className="text-2xl font-extrabold text-emerald-950">₹{activeMandiData.highestPrice} <span className="text-xs font-normal">/ qtnl</span></div>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> {activeMandiData.trend} 30-Day Rise
          </span>
        </div>

        <div className="p-5 bg-earth-cream rounded-3xl border border-earth-wheat/30 shadow-sm space-y-1">
          <span className="text-xs font-bold text-earth-soil uppercase tracking-wider">Lowest Nearby Price</span>
          <div className="text-2xl font-extrabold text-earth-walnut">₹{activeMandiData.lowestPrice} <span className="text-xs font-normal">/ qtnl</span></div>
          <span className="text-xs font-semibold text-gray-500">Halol District Average</span>
        </div>

      </div>

      {/* PRICE TREND RECHARTS GRAPH */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-agri-dark">{activeMandiData.crop} 30-Day Mandi Price Trend</h3>
            <p className="text-xs text-gray-500">Historical daily modal prices across Panchmahal APMC mandis</p>
          </div>
          <span className="text-xs font-bold text-earth-terracotta bg-earth-sand/40 px-3 py-1 rounded-full">
            ₹ / Quintal
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeMandiData.chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D7A41" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2D7A41" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} tickLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ background: '#1E4D2B', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                itemStyle={{ color: '#83B77C' }}
              />
              <Area type="monotone" dataKey="price" stroke="#2D7A41" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MANDI LIST WITH SORTING */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <h3 className="font-extrabold text-base text-agri-dark flex items-center gap-2">
            <MapPin className="w-5 h-5 text-earth-terracotta" /> Nearby APMC Mandis ({sortedMarkets.length})
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">{t.market.sortBy}:</span>
            <button
              onClick={() => setSortBy('highest')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sortBy === 'highest' ? 'bg-agri-dark text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t.market.highestPrice}
            </button>
            <button
              onClick={() => setSortBy('distance')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sortBy === 'distance' ? 'bg-agri-dark text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t.market.distance}
            </button>
          </div>
        </div>

        {/* Mandi Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedMarkets.map((mkt, idx) => (
            <div key={idx} className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/40 hover:border-agri-primary transition-all flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-agri-dark">{mkt.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-earth-terracotta" /> {mkt.district} • <strong className="text-agri-dark">{mkt.distanceKm} km away</strong>
                </div>
                <div className="text-[10px] text-gray-400">Updated: {mkt.updated}</div>
              </div>

              <div className="text-right">
                <div className="text-xl font-extrabold text-earth-walnut">₹{mkt.price}</div>
                <span className={`text-xs font-bold inline-block px-2 py-0.5 rounded-full ${
                  mkt.change.startsWith('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {mkt.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
