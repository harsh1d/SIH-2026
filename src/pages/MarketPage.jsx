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
  Info,
  Bot,
  Truck,
  ArrowRight
} from 'lucide-react';

export const MarketPage = () => {
  const { location, t, setActiveTab, farmerProfile } = useApp();

  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [sortBy, setSortBy] = useState('highest'); // 'highest' | 'distance'

  const activeMandiData = mockMandiRates[selectedCropIndex] || mockMandiRates[0];

  const sortedMarkets = [...activeMandiData.markets].sort((a, b) => {
    if (sortBy === 'highest') return b.price - a.price;
    return a.distanceKm - b.distanceKm;
  });

  const bestMarket = sortedMarkets.reduce((prev, curr) => (prev.price > curr.price) ? prev : curr, sortedMarkets[0]);
  const nearestMarket = sortedMarkets.reduce((prev, curr) => (prev.distanceKm < curr.distanceKm) ? prev : curr, sortedMarkets[0]);
  const arbitrageDifference = bestMarket.price - nearestMarket.price;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-earth-walnut uppercase tracking-widest mb-1">
            <TrendingUp className="w-4 h-4 text-earth-terracotta" /> APMC Mandi Intelligence & Price Arbitrage
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.market?.title || "Market Mandi Prices & Trends"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            {t.market?.subtitle || "Track modal prices across nearby APMC markets with 30-day price trend graphs."}
          </p>
        </div>

        {/* Commodity Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {mockMandiRates.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCropIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCropIndex === idx 
                  ? 'bg-earth-walnut text-white shadow-earth border border-earth-wheat/40' 
                  : 'bg-gray-100 text-gray-700 hover:bg-earth-sand/50'
              }`}
            >
              🌾 {item.crop}
            </button>
          ))}
        </div>
      </div>

      {/* HIGHLIGHT STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Commodity Selected</span>
          <div className="text-2xl font-black text-agri-dark">{activeMandiData.crop}</div>
          <span className="text-xs font-bold text-gray-500">{activeMandiData.variety}</span>
        </div>

        <div className="p-5 bg-emerald-50/80 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Highest APMC Price</span>
            <span className="px-2 py-0.5 text-[9px] font-extrabold bg-emerald-600 text-white rounded-full uppercase">Best Rate</span>
          </div>
          <div className="text-2xl font-black text-emerald-950">₹{activeMandiData.highestPrice} <span className="text-xs font-normal text-gray-500">/ qtnl</span></div>
          <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> {activeMandiData.trend} 30-Day Rise
          </span>
        </div>

        <div className="p-5 bg-earth-cream rounded-3xl border border-earth-wheat/40 shadow-sm space-y-1">
          <span className="text-[10px] font-black text-earth-soil uppercase tracking-widest">District Average Modal Rate</span>
          <div className="text-2xl font-black text-earth-walnut">₹{activeMandiData.lowestPrice} <span className="text-xs font-normal text-gray-500">/ qtnl</span></div>
          <span className="text-xs font-semibold text-gray-500">Panchmahal APMC District Index</span>
        </div>

      </div>

      {/* AI ARBITRAGE & SELLING ADVISORY BANNER */}
      <div className="bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-ai border border-ai-mauve/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-purple-200 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Price Arbitrage Recommendation for {farmerProfile.name}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {arbitrageDifference > 0 ? (
              <>Transporting to <strong>{bestMarket.name} ({bestMarket.distanceKm} km)</strong> yields <span className="text-emerald-300 font-extrabold">+₹{arbitrageDifference} / quintal extra</span> over {nearestMarket.name}.</>
            ) : (
              <>Local Mandi {nearestMarket.name} offers the top regional rate today at ₹{nearestMarket.price}/qtnl.</>
            )}
          </h3>
          <p className="text-xs text-purple-200/80 font-medium">
            AI Projection: Hold harvest stock for 7-10 days if storage is available; regional demand index is up +4.2%.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ai')}
          className="self-start md:self-auto px-5 py-3 bg-white text-ai-plum hover:bg-purple-50 font-black text-xs rounded-2xl shadow-md transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <Bot className="w-4 h-4 text-ai-plum" />
          <span>Ask AI Price Predictor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* PRICE TREND RECHARTS GRAPH */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-base text-agri-dark">{activeMandiData.crop} 30-Day Mandi Price Trend</h3>
            <p className="text-xs text-gray-500 font-medium">Historical daily modal prices across Panchmahal APMC mandis</p>
          </div>
          <span className="text-xs font-extrabold text-earth-walnut bg-earth-sand/60 px-3.5 py-1 rounded-full border border-earth-wheat/30">
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
                contentStyle={{ background: '#143D20', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
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
          <h3 className="font-black text-base text-agri-dark flex items-center gap-2">
            <MapPin className="w-5 h-5 text-earth-terracotta" /> Nearby APMC Mandis ({sortedMarkets.length})
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">{t.market?.sortBy || "Sort by"}:</span>
            <button
              onClick={() => setSortBy('highest')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                sortBy === 'highest' ? 'bg-agri-dark text-white shadow-agri' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t.market?.highestPrice || "Highest Price"}
            </button>
            <button
              onClick={() => setSortBy('distance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                sortBy === 'distance' ? 'bg-agri-dark text-white shadow-agri' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t.market?.distance || "Nearest Distance"}
            </button>
          </div>
        </div>

        {/* Mandi Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedMarkets.map((mkt, idx) => (
            <div key={idx} className="p-4 sm:p-5 bg-agri-bg rounded-2xl border border-agri-soft/40 hover:border-agri-primary transition-all flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <div className="text-sm font-black text-agri-dark">{mkt.name}</div>
                <div className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-earth-terracotta" /> {mkt.district} • <strong className="text-agri-dark font-bold">{mkt.distanceKm} km away</strong>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">Updated: {mkt.updated}</div>
              </div>

              <div className="text-right">
                <div className="text-xl font-black text-earth-walnut">₹{mkt.price}</div>
                <span className={`text-xs font-extrabold inline-block px-2.5 py-0.5 rounded-full ${
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
