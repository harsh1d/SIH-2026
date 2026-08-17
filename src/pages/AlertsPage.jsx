import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  X,
  MapPin
} from 'lucide-react';

export const AlertsPage = () => {
  const { alerts, markAlertAsRead, setActiveTab, t } = useApp();

  const [severityFilter, setSeverityFilter] = useState('all'); // 'all' | 'critical' | 'important' | 'advisory'

  const filteredAlerts = alerts.filter(a => 
    severityFilter === 'all' ? true : a.severity === severityFilter
  );

  const getSeverityBadge = (sev) => {
    switch(sev) {
      case 'critical':
        return <span className="px-3 py-1 text-[10px] font-black uppercase bg-rose-600 text-white rounded-full shadow-xs">🔴 Critical Warning</span>;
      case 'important':
        return <span className="px-3 py-1 text-[10px] font-black uppercase bg-amber-600 text-white rounded-full shadow-xs">🟠 Important Alert</span>;
      default:
        return <span className="px-3 py-1 text-[10px] font-black uppercase bg-emerald-600 text-white rounded-full shadow-xs">🟡 Regional Advisory</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-rose-700 uppercase tracking-widest mb-1">
            <Bell className="w-4 h-4 text-rose-600" /> Smart Farm Emergency & Alert Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            Active Farm Alerts ({alerts.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Automated weather forecasts, pest outbreak telemetry, and APMC mandi rate movement warnings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-2 rounded-xl transition-all ${severityFilter === 'all' ? 'bg-agri-dark text-white shadow-agri' : 'text-gray-600'}`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setSeverityFilter('critical')}
            className={`px-3 py-2 rounded-xl transition-all ${severityFilter === 'critical' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600'}`}
          >
            Critical
          </button>
          <button
            onClick={() => setSeverityFilter('important')}
            className={`px-3 py-2 rounded-xl transition-all ${severityFilter === 'important' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600'}`}
          >
            Important
          </button>
        </div>
      </div>

      {/* ALERTS LIST */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-black text-base text-agri-dark">No Active Warnings</h3>
            <p className="text-xs text-gray-400 font-medium">All weather, pest, and market indicators are clear in your location.</p>
          </div>
        ) : (
          filteredAlerts.map((alt) => (
            <div 
              key={alt.id}
              className={`p-6 rounded-3xl border shadow-sm space-y-4 relative transition-all ${
                alt.severity === 'critical'
                  ? 'bg-rose-50/80 border-rose-200'
                  : alt.severity === 'important'
                    ? 'bg-amber-50/80 border-amber-200'
                    : 'bg-emerald-50/80 border-emerald-200'
              }`}
            >
              <button 
                onClick={() => markAlertAsRead(alt.id)}
                className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white/80 transition-colors"
                title="Dismiss Alert"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3">
                {getSeverityBadge(alt.severity)}
                <span className="text-xs font-black text-gray-700">{alt.type}</span>
                <span className="text-xs text-gray-400 font-medium">• {alt.time}</span>
              </div>

              <div>
                <h3 className="text-base font-black text-agri-dark">{alt.title}</h3>
                <p className="text-xs text-gray-700 leading-relaxed mt-1 font-medium">{alt.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/5">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-earth-terracotta" /> Location: {alt.location}
                </span>
                <button
                  onClick={() => {
                    if (alt.type.includes('Weather')) setActiveTab('weather');
                    else if (alt.type.includes('Pest')) setActiveTab('cropDoctor');
                    else setActiveTab('market');
                  }}
                  className="px-4 py-2 bg-white text-agri-dark font-extrabold text-xs rounded-2xl shadow-xs border border-gray-200 hover:bg-agri-bg transition-colors"
                >
                  {alt.actionText} →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
