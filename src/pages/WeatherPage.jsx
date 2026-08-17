import React from 'react';
import { useApp } from '../context/AppContext';
import { mockWeatherData } from '../data/mockData';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplet, 
  Thermometer, 
  MapPin, 
  Sparkles, 
  AlertTriangle,
  Info
} from 'lucide-react';

export const WeatherPage = () => {
  const { location, t } = useApp();
  const weather = mockWeatherData;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-agri-dark uppercase tracking-widest mb-1">
            <CloudSun className="w-4 h-4 text-agri-primary" /> Agro-Meteorological Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            Weather & Farming Impact
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Real-time weather forecast contextualized into crop irrigation & pesticide spraying advice.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-agri-dark bg-agri-bg px-4 py-2.5 rounded-2xl border border-agri-soft/50 shadow-xs">
          <MapPin className="w-4 h-4 text-earth-terracotta" /> {location.formatted}
        </div>
      </div>

      {/* CURRENT WEATHER HERO CARD - BOTANICAL SAGE GREEN */}
      <div className="bg-gradient-to-r from-agri-dark via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 border border-gov-gold/30">
        
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-emerald-800/60 pb-6">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-md">
              <CloudRain className="w-14 h-14 text-emerald-300 animate-pulse" />
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black font-sans tracking-tight">{weather.current.temp}°C</div>
              <div className="text-sm font-extrabold text-emerald-200 mt-1">{weather.current.condition} • {location.formatted}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md border border-white/10">
              <Droplet className="w-5 h-5 text-sky-300" />
              <div>
                <span className="text-[10px] text-emerald-200 font-extrabold uppercase block">HUMIDITY</span>
                <span className="font-extrabold text-sm">{weather.current.humidity}%</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md border border-white/10">
              <Wind className="w-5 h-5 text-teal-300" />
              <div>
                <span className="text-[10px] text-emerald-200 font-extrabold uppercase block">WIND SPEED</span>
                <span className="font-extrabold text-sm">{weather.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🌾 FARMING IMPACT ADVISORY BANNER */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-black text-gov-gold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-gov-gold" /> 🌾 FARMING IMPACT ADVISORY
          </div>
          
          <div className="space-y-2">
            {weather.agroImpact.recommendations.map((rec, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
                "{rec}"
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* HOURLY FORECAST SCROLL */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
        <h3 className="font-black text-sm text-agri-dark uppercase tracking-wider">Hourly Precipitation Forecast</h3>
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {weather.hourly.map((h, idx) => (
            <div key={idx} className="flex-shrink-0 w-28 p-3.5 bg-agri-bg rounded-2xl border border-agri-soft/40 text-center space-y-1">
              <span className="text-[11px] font-extrabold text-gray-500 block">{h.time}</span>
              <CloudRain className="w-7 h-7 text-agri-primary mx-auto my-1" />
              <span className="text-xs font-black text-agri-dark block">{h.temp}°C</span>
              <span className="text-[10px] font-bold text-sky-600 block">☔ {h.rainProb}% Rain</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7-DAY FORECAST CARDS */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-agri-dark uppercase tracking-wider">7-Day Agriculture Forecast</h3>
        <div className="space-y-2.5">
          {weather.daily.map((d, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-agri-bg rounded-2xl transition-colors text-xs border border-gray-100">
              <div className="flex items-center gap-3 w-36">
                <CloudRain className="w-5 h-5 text-agri-primary flex-shrink-0" />
                <div>
                  <span className="font-extrabold text-agri-dark block">{d.day}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{d.date}</span>
                </div>
              </div>

              <span className="text-gray-700 font-semibold hidden sm:inline-block">{d.condition}</span>

              <div className="flex items-center gap-4">
                <span className="font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full text-[11px]">
                  ☔ {d.rainProb}% Rain
                </span>
                <span className="font-black text-agri-dark">
                  {d.maxTemp}° / <span className="text-gray-400 font-normal">{d.minTemp}°C</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API INTEGRATION PLACEHOLDER */}
      <div className="p-4 bg-earth-cream rounded-2xl border border-earth-wheat/40 text-xs text-earth-walnut flex items-center gap-3 font-medium">
        <Info className="w-5 h-5 text-earth-terracotta flex-shrink-0" />
        <span>
          <strong>IMD API Integration:</strong> Live telemetry connects to Indian Meteorological Department (IMD) API or OpenWeatherMap with <code className="bg-white px-2 py-0.5 rounded text-earth-soil font-bold border border-earth-wheat/30">VITE_WEATHER_API_KEY</code>.
        </span>
      </div>

    </div>
  );
};
