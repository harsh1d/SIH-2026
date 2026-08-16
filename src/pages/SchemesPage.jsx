import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockSchemes, mockNews } from '../data/mockData';
import { 
  Landmark, 
  Newspaper, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const SchemesPage = () => {
  const { farmerProfile, t } = useApp();

  const [activeTabSub, setActiveTabSub] = useState('schemes'); // 'schemes' | 'news'

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-earth-walnut uppercase tracking-wider mb-1">
            <Landmark className="w-4 h-4 text-earth-terracotta" /> Government Welfare & Information
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark font-sans">
            {t.schemes.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {t.schemes.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setActiveTabSub('schemes')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTabSub === 'schemes' 
                ? 'bg-earth-walnut text-white shadow-earth' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏛️ Government Schemes
          </button>
          <button
            onClick={() => setActiveTabSub('news')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
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
          {mockSchemes.map((scm) => (
            <div key={scm.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5 hover:border-earth-wheat/50 transition-all">
              
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-earth-cream text-earth-walnut border border-earth-wheat/30">
                      {scm.category}
                    </span>
                    {scm.isEligibleForUser && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {t.schemes.eligible}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold text-agri-dark">{scm.title}</h3>
                  <div className="text-xs text-gray-500">{scm.dept}</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400">{t.schemes.deadline}</div>
                  <div className="text-xs font-bold text-rose-600">{scm.deadline}</div>
                </div>
              </div>

              {/* Benefit Highlights */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs">
                <span className="font-bold text-emerald-950 block mb-1">Financial Benefit / Subsidy:</span>
                <span className="font-extrabold text-emerald-900 text-sm">{scm.benefitAmount}</span>
              </div>

              {/* Eligibility & Application */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                  <span className="font-bold text-agri-dark block">Eligibility Criteria</span>
                  <p className="text-gray-700 leading-relaxed">{scm.eligibility}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                  <span className="font-bold text-agri-dark block">{t.schemes.documents}</span>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    {scm.documentsRequired.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">{scm.applicationProcess}</span>
                <a
                  href={scm.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-earth-walnut hover:bg-earth-soil text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  <span>{t.schemes.applyNow}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
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
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-earth-terracotta uppercase">{article.category}</span>
                    <span className="text-gray-400">{article.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-agri-dark leading-snug line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{article.summary}</p>
                </div>
              </div>

              <div className="p-5 pt-0 text-xs font-semibold text-agri-primary flex items-center justify-between border-t border-gray-50 mt-2">
                <span>Source: {article.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
