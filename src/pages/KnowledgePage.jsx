import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Search, 
  Sprout, 
  Droplet, 
  ShieldCheck, 
  Layers, 
  Sun,
  ChevronRight
} from 'lucide-react';

export const KnowledgePage = () => {
  const { t } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const articles = [
    {
      id: 1,
      title: "Integrated Pest Management (IPM) in Bt Cotton",
      category: "Pest & Disease",
      readTime: "5 min read",
      summary: "Learn how to combine pheromone traps, yellow sticky cards, and botanical neem sprays to manage Pink Bollworm without destroying beneficial predators.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      id: 2,
      title: "Drip Irrigation Maintenance & Acid Washing Guide",
      category: "Irrigation",
      readTime: "4 min read",
      summary: "Prevent salt & emitter clogging in drip lines during peak summer. Step-by-step hydrochloric acid flushing instructions for Gujarat tube well water.",
      icon: Droplet,
      color: "bg-sky-50 text-sky-800 border-sky-200"
    },
    {
      id: 3,
      title: "Soil Health Improvement with Organic Compost & Jeevamrut",
      category: "Soil Health",
      readTime: "6 min read",
      summary: "How to prepare fermented Jeevamrut using indigenous cow dung & urine to enhance soil organic carbon (SOC) in black cotton soil.",
      icon: Layers,
      color: "bg-earth-cream text-earth-walnut border-earth-wheat/40"
    },
    {
      id: 4,
      title: "Wheat Crown Root Initiation (CRI) Water Management",
      category: "Crop Guides",
      readTime: "4 min read",
      summary: "Why irrigating at 21 days after sowing is critical for tiller density and grain weight in Sharbati Wheat strains.",
      icon: Sprout,
      color: "bg-agri-bg text-agri-dark border-agri-soft/40"
    }
  ];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' ? true : art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-agri-dark uppercase tracking-widest mb-1">
            <BookOpen className="w-4 h-4 text-agri-primary" /> Agricultural Knowledge Library
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.nav.knowledge || "Knowledge Hub"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Best practices, irrigation manuals, and sustainable farming guides created by agronomy scientists.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search guides by crop, pest, irrigation, or soil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-agri-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['All', 'Pest & Disease', 'Irrigation', 'Soil Health', 'Crop Guides'].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedCategory === cat ? 'bg-agri-dark text-white shadow-agri' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((art) => {
          const IconComponent = art.icon;
          return (
            <div key={art.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${art.color}`}>
                    {art.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-bold">{art.readTime}</span>
                </div>

                <h3 className="text-base font-black text-agri-dark leading-snug">{art.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">{art.summary}</p>
              </div>

              <button className="flex items-center gap-1 text-xs font-extrabold text-agri-primary hover:underline pt-3 border-t border-gray-50">
                Read Full Guide <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
