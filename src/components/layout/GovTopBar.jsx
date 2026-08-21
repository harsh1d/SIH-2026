import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Eye, Sparkles } from 'lucide-react';

export const GovTopBar = () => {
  const { language, setLanguage } = useApp();
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large'

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'ml', label: 'മലയാളം' }
  ];

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;

    return () => {
      delete document.documentElement.dataset.fontSize;
    };
  }, [fontSize]);

  return (
    <div className="bg-agri-dark text-white text-[11px] font-sans border-b border-gov-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-2">
        
        {/* Left: Indian Government & Ministry Identification */}
        <div className="flex items-center gap-2.5 truncate">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-emerald-200">
            <span className="inline-block w-2 h-2 rounded-full bg-gov-gold animate-pulse" />
            <span>भारत सरकार</span>
            <span className="text-emerald-400/60 font-normal">|</span>
            <span className="hidden sm:inline">Government of India</span>
          </div>
          <span className="text-emerald-400/40 hidden md:inline">•</span>
          <span className="hidden md:inline text-gray-300 font-medium truncate">
            कृषि एवं किसान कल्याण मंत्रालय | Ministry of Agriculture & Farmers Welfare
          </span>
        </div>

        {/* Right: Accessibility Options & Quick Language Pills */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* Accessibility Font Resizer */}
          <div className="hidden lg:flex items-center gap-1 text-[10px] text-emerald-200 font-bold bg-white/10 px-2 py-0.5 rounded">
            <button 
              onClick={() => setFontSize('small')}
              className={`hover:text-white px-1 ${fontSize === 'small' ? 'text-gov-gold font-black' : ''}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <span>|</span>
            <button 
              onClick={() => setFontSize('normal')}
              className={`hover:text-white px-1 ${fontSize === 'normal' ? 'text-gov-gold font-black' : ''}`}
              title="Standard Font Size"
            >
              A
            </button>
            <span>|</span>
            <button 
              onClick={() => setFontSize('large')}
              className={`hover:text-white px-1 ${fontSize === 'large' ? 'text-gov-gold font-black' : ''}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Skip to Content */}
          <a 
            href="#main-content" 
            className="hidden sm:inline-block text-emerald-200 hover:text-white underline decoration-emerald-500/50"
          >
            Skip to main content
          </a>

          {/* Quick Language Pills */}
          <div className="flex items-center gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  language === lang.code
                    ? 'bg-gov-gold text-agri-dark font-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
