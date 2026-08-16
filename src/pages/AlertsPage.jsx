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
        return <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-rose-600 text-white rounded-full">Critical Warning</span>;
      case 'important':
        return <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-amber-600 text-white rounded-full">Important Alert</span>;
      default:
        return <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-emerald-600 text-white rounded-full">Advisory</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-rose-600" /> Smart Farm Emergency Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark font-sans">
            Active Farm Alerts ({alerts.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Automated weather, pest outbreak, and mandi rate movement warnings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${severityFilter === 'all' ? 'bg-agri-dark text-white' : 'text-gray-600'}`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setSeverityFilter('critical')}
            className={`px-3 py-1.5 rounded-xl transition-all ${severityFilter === 'critical' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}
          >
            Critical
          </button>
          <button
            onClick={() => setSeverityFilter('important')}
            className={`px-3 py-1.5 rounded-xl transition-all ${severityFilter === 'important' ? 'bg-amber-600 text-white' : 'text-gray-600'}`}
          >
            Important
          </button>
        </div>
      </div>

      {/* ALERTS LIST */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-base text-agri-dark">No Active Warnings</h3>
            <p className="text-xs text-gray-400">All weather & pest indicators are clear in your location.</p>
          </div>
        ) : (
          filteredAlerts.map((alt) => (
            <div 
              key={alt.id}
              className={`p-6 rounded-3xl border shadow-sm space-y-4 relative transition-all ${
                alt.severity === 'critical'
                  ? 'bg-rose-50/70 border-rose-200'
                  : alt.severity === 'important'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <button 
                onClick={() => markAlertAsRead(alt.id)}
                className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-white/60 transition-colors"
                title="Dismiss Alert"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-3">
                {getSeverityBadge(alt.severity)}
                <span className="text-xs font-bold text-gray-600">{alt.type}</span>
                <span className="text-xs text-gray-400">• {alt.time}</span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-agri-dark">{alt.title}</h3>
                <p className="text-xs text-gray-700 leading-relaxed mt-1">{alt.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/5">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-earth-terracotta" /> Location: {alt.location}
                </span>
                <button
                  onClick={() => {
                    if (alt.type.includes('Weather')) setActiveTab('weather');
                    else if (alt.type.includes('Pest')) setActiveTab('cropDoctor');
                    else setActiveTab('market');
                  }}
                  className="px-4 py-2 bg-white text-agri-dark font-bold text-xs rounded-xl shadow-xs border border-gray-200 hover:bg-agri-bg transition-colors"
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
