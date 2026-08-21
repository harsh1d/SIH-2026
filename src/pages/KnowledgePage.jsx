import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fetchWikipediaAgriculturalSummary } from '../services/aiKnowledgeEngine';
import { 
  BookOpen, 
  Search, 
  Sprout, 
  Droplet, 
  ShieldCheck, 
  Layers, 
  Sun,
  ChevronRight,
  Globe,
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';

export const KnowledgePage = () => {
  const { t, setActiveTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Live Wikipedia Explorer State
  const [wikiQuery, setWikiQuery] = useState('');
  const [wikiResult, setWikiResult] = useState(null);
  const [isWikiSearching, setIsWikiSearching] = useState(false);

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
    },
    {
      id: 5,
      title: "Tomato Early Blight & Staking Protocol",
      category: "Pest & Disease",
      readTime: "4 min read",
      summary: "Best fungicide rotation strategies (Mancozeb, Azoxystrobin) and drip fertigation to prevent Alternaria fungal spots in hybrid tomato.",
      icon: ShieldCheck,
      color: "bg-rose-50 text-rose-800 border-rose-200"
    },
    {
      id: 6,
      title: "Balanced N-P-K & Micronutrient Schedule for Black Cotton Soil",
      category: "Soil Health",
      readTime: "5 min read",
      summary: "Understanding zinc and sulphur replenishment in clay-rich soils for maximizing Kharif cotton and Rabi wheat yields.",
      icon: Layers,
      color: "bg-amber-50 text-amber-900 border-amber-200"
    }
  ];

  const handleWikiSearch = async (e) => {
    e.preventDefault();
    if (!wikiQuery.trim()) return;
    setIsWikiSearching(true);
    setWikiResult(null);

    const result = await fetchWikipediaAgriculturalSummary(wikiQuery);
    setIsWikiSearching(false);
    setWikiResult(result);
  };

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
            <BookOpen className="w-4 h-4 text-agri-primary" /> Agricultural Knowledge Library & Wikipedia
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.nav?.knowledge || "Knowledge Hub"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            ICAR scientific best practices, irrigation manuals, and live Wikipedia agronomic research explorer.
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

      {/* LIVE WIKIPEDIA EXPLORER BANNER */}
      <div className="bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-ai border border-ai-mauve/40 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
            <Globe className="w-6 h-6 text-purple-200" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black">Live Wikipedia Agronomy Knowledge Explorer</h2>
            <p className="text-xs text-purple-200/90 font-medium">Search any scientific crop species, fertilizer formulation, or botanical disease in real-time.</p>
          </div>
        </div>

        <form onSubmit={handleWikiSearch} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <input
            type="text"
            value={wikiQuery}
            onChange={(e) => setWikiQuery(e.target.value)}
            placeholder="e.g. Cotton bollworm, Vertisol, Neem oil, Drip fertigation, Alternaria..."
            className="flex-1 w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-purple-200/60 text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white/20"
          />
          <button
            type="submit"
            disabled={isWikiSearching || !wikiQuery.trim()}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-ai-plum hover:bg-purple-50 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isWikiSearching ? <Loader2 className="w-4 h-4 animate-spin text-ai-plum" /> : <Search className="w-4 h-4 text-ai-plum" />}
            <span>Fetch Live Data</span>
          </button>
        </form>

        {/* Result Container */}
        {wikiResult && (
          <div className="mt-4 p-5 bg-white text-gray-900 rounded-2xl shadow-lg border border-purple-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-ai-plum" />
                <h4 className="text-base font-black text-agri-dark">{wikiResult.title}</h4>
              </div>
              <a 
                href={wikiResult.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-ai-plum font-bold text-xs rounded-xl flex items-center gap-1 border border-purple-200"
              >
                Open on Wikipedia <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              {wikiResult.extract}
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-[11px] text-gray-400 font-semibold">Source: Wikipedia Live Knowledge API (en.wikipedia.org)</span>
              <button
                onClick={() => setActiveTab('ai')}
                className="text-xs font-bold text-ai-plum hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-ai-purple" /> Ask AI to apply this to my farm
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <button 
                onClick={() => {
                  setWikiQuery(art.title.split(' ')[0]);
                  fetchWikipediaAgriculturalSummary(art.title).then(res => setWikiResult(res));
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 text-xs font-extrabold text-agri-primary hover:underline pt-3 border-t border-gray-50"
              >
                Inspect Live Research <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
