import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockNews } from '../data/mockData';
import { 
  Landmark, 
  Newspaper, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Sparkles,
  ShieldCheck,
  Building,
  Filter,
  Check,
  X,
  MapPin
} from 'lucide-react';

export const SchemesPage = () => {
  const { farmerProfile, location, agroRegion, schemes, t, showToast } = useApp();

  const [activeTabSub, setActiveTabSub] = useState('schemes'); // 'schemes' | 'news'
  const [filterCategory, setFilterCategory] = useState('All');
  const [applyingScheme, setApplyingScheme] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  const filteredSchemes = (schemes || []).filter(scm => {
    if (filterCategory === 'All') return true;
    return scm.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const handleSimulateApply = (scm) => {
    setApplyingScheme(scm);
    setApplicationSubmitted(false);
  };

  const handleConfirmApplication = () => {
    const genId = `AGRI-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(genId);
    setApplicationSubmitted(true);
    showToast(`Application successfully generated! Tracking ID: ${genId}`, 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-earth-walnut uppercase tracking-widest mb-1">
            <Landmark className="w-4 h-4 text-earth-terracotta" /> Government Welfare & Subsidy Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.schemes?.title || "Government Schemes & Subsidies"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Personalized eligibility calculations for {farmerProfile.name}'s {farmerProfile.farmSizeAcres} Acre farm in {location.formatted}.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setActiveTabSub('schemes')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTabSub === 'schemes' 
                ? 'bg-earth-walnut text-white shadow-earth border border-earth-wheat/40' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏛️ Subsidies & Schemes
          </button>
          <button
            onClick={() => setActiveTabSub('news')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTabSub === 'news' 
                ? 'bg-agri-dark text-white shadow-agri' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📰 Regional Agri News
          </button>
        </div>
      </div>

      {/* SCHEMES VIEW */}
      {activeTabSub === 'schemes' && (
        <div className="space-y-6">
          
          {/* ELIGIBILITY FILTER BAR */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-gray-700">
              <Filter className="w-4 h-4 text-agri-primary" />
              <span>Filter Scheme Category:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['All', 'Direct Income', 'Insurance', 'Subsidies', 'Credit'].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-agri-dark text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* SCHEMES CARDS LIST */}
          <div className="space-y-6">
            {filteredSchemes.map((scm) => (
              <div key={scm.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5 hover:border-earth-wheat/50 transition-all">
                
                {/* Top Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-earth-cream text-earth-walnut border border-earth-wheat/40">
                        {scm.category}
                      </span>
                      {scm.isEligibleForUser && (
                        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Eligible for Your Farm ({farmerProfile.farmSizeAcres} Acres)
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-agri-dark tracking-tight">{scm.title}</h3>
                    <div className="text-xs text-gray-500 font-medium">{scm.dept}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.schemes?.deadline || "Deadline"}</div>
                    <div className="text-xs font-extrabold text-rose-600">{scm.deadline}</div>
                  </div>
                </div>

                {/* Benefit Highlights */}
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs">
                  <span className="font-extrabold text-emerald-950 block text-[10px] uppercase tracking-wider mb-0.5">Financial Benefit / Subsidy Highlight:</span>
                  <span className="font-black text-emerald-900 text-base">{scm.benefitAmount}</span>
                </div>

                {/* Eligibility & Application */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                    <span className="font-black text-agri-dark block text-xs uppercase tracking-wide">👨‍🌾 Eligibility Criteria</span>
                    <p className="text-gray-700 leading-relaxed font-medium">{scm.eligibility}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                    <span className="font-black text-agri-dark block text-xs uppercase tracking-wide">📄 {t.schemes?.documents || "Required Documents"}</span>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
                      {scm.documentsRequired?.map((doc, idx) => (
                        <li key={idx}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Link & Simulator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">{scm.applicationProcess}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSimulateApply(scm)}
                      className="px-4 py-2.5 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs rounded-2xl transition-colors shadow-agri flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> Simulate Direct Apply
                    </button>
                    <a
                      href={scm.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs rounded-2xl transition-colors"
                    >
                      <span>Govt Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* NEWS VIEW */}
      {activeTabSub === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.map((article) => (
            <div key={article.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <img src={article.imageUrl} alt={article.title} className="w-full h-44 object-cover" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black text-earth-terracotta uppercase tracking-wider">{article.category}</span>
                    <span className="text-gray-400 font-medium">{article.date}</span>
                  </div>

                  <h3 className="text-sm font-black text-agri-dark leading-snug line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-medium">{article.summary}</p>
                </div>
              </div>

              <div className="p-5 pt-0 text-xs font-bold text-agri-primary flex items-center justify-between border-t border-gray-50 mt-2">
                <span>Source: {article.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* APPLICATION SIMULATOR MODAL */}
      {applyingScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 animate-scale-up">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-black text-agri-primary uppercase tracking-wider block">
                  Direct Subsidy Application Simulator
                </span>
                <h3 className="text-lg font-black text-agri-dark">{applyingScheme.title}</h3>
              </div>
              <button 
                onClick={() => setApplyingScheme(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!applicationSubmitted ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/40 space-y-1">
                  <span className="font-black text-agri-dark block text-[11px] uppercase">Applicant Telemetry Verification:</span>
                  <p className="text-gray-700"><strong>Farmer:</strong> {farmerProfile.name} ({farmerProfile.phone})</p>
                  <p className="text-gray-700"><strong>Land Holding:</strong> {farmerProfile.farmSizeAcres} Acres • {farmerProfile.soilType}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {location.formatted}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-gray-700 block">Verified Digital Locker Documents:</span>
                  {applyingScheme.documentsRequired?.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-semibold">{doc} (DigiLocker Verified)</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleConfirmApplication}
                  className="w-full py-3.5 bg-agri-dark hover:bg-agri-primary text-white font-extrabold rounded-2xl shadow-agri transition-all text-xs flex items-center justify-center gap-2 border border-gov-gold/30 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Submit Application & Generate DBT Request
                </button>
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-emerald-950">Application Submitted Successfully!</h4>
                <p className="text-xs text-emerald-900 font-medium">
                  Your application has been routed to the District Agriculture Officer ({location.district || location.state}).
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs font-black text-agri-dark">
                  Tracking ID: <span className="text-emerald-700 font-mono text-sm">{trackingId}</span>
                </div>
                <button
                  onClick={() => setApplyingScheme(null)}
                  className="px-6 py-2 bg-agri-dark text-white font-bold text-xs rounded-xl mt-2 cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
