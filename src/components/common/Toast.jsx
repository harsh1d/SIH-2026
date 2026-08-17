import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    error: <XCircle className="w-5 h-5 text-rose-600" />,
    info: <Info className="w-5 h-5 text-sky-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600" />
  };

  const bgStyles = {
    success: "bg-emerald-50 border-emerald-300 text-emerald-950",
    error: "bg-rose-50 border-rose-300 text-rose-950",
    info: "bg-sky-50 border-sky-300 text-sky-950",
    warning: "bg-amber-50 border-amber-300 text-amber-950"
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl ${bgStyles[toastMessage.type] || bgStyles.info}`}>
        {icons[toastMessage.type] || icons.info}
        <span className="text-xs sm:text-sm font-bold">{toastMessage.message}</span>
      </div>
    </div>
  );
};
