import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  UserCheck, 
  Send, 
  Paperclip, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  PhoneCall, 
  FileText,
  User
} from 'lucide-react';

export const ExpertPage = () => {
  const { 
    expertCases, 
    addExpertCase, 
    resolveExpertCase, 
    farmerProfile, 
    activeRole, 
    setActiveRole, 
    t, 
    showToast 
  } = useApp();

  const [cropInput, setCropInput] = useState('Cotton (Hybrid BG-II)');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [agronomistResponseInput, setAgronomistResponseInput] = useState('');

  const handleFarmerSubmit = (e) => {
    e.preventDefault();
    if (!symptomsInput.trim()) return;

    const newTicket = {
      id: `TICKET-KVK-${Math.floor(100 + Math.random() * 900)}`,
      farmerName: farmerProfile.name,
      farmerPhone: farmerProfile.phone,
      location: farmerProfile.location.formatted,
      crop: cropInput,
      dateSubmitted: new Date().toLocaleString(),
      issueSummary: symptomsInput,
      aiConfidence: "81% (Moderate)",
      aiInitialDiagnosis: "Suspected Fungal Spore Spot",
      status: "Under Review",
      statusColor: "amber",
      expertName: "Assigned to KVK Field Agronomist",
      expertResponse: "Under active investigation by agricultural scientist.",
      resolvedDate: "Pending",
      image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80"
    };

    addExpertCase(newTicket);
    setSymptomsInput('');
  };

  const handleResolveSubmit = (caseId) => {
    if (!agronomistResponseInput.trim()) return;
    resolveExpertCase(caseId, agronomistResponseInput, "Dr. S. K. Sharma (Senior Agronomist, KVK Panchmahal)");
    setAgronomistResponseInput('');
    setSelectedCaseId(null);

    // Celebratory confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER & ROLE TOGGLE BANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-agri-primary uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4 text-agri-dark" /> Certified KVK Agronomist Consultation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark font-sans">
              {t.expert.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {t.expert.subtitle}
            </p>
          </div>

          {/* Role Toggle Switch for Demo Judging */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveRole('farmer')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeRole === 'farmer' ? 'bg-agri-dark text-white shadow-agri' : 'text-gray-600'
              }`}
            >
              👨‍🌾 Farmer View
            </button>
            <button
              onClick={() => setActiveRole('expert')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeRole === 'expert' ? 'bg-ai-plum text-white shadow-ai' : 'text-gray-600'
              }`}
            >
              👨‍🔬 KVK Agronomist View
            </button>
          </div>
        </div>

        <div className="p-3 bg-agri-bg rounded-2xl border border-agri-soft/40 flex items-center justify-between text-xs font-semibold text-agri-dark">
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-agri-primary" /> KVK Panchmahal Direct Helpline: 1800-180-1551
          </span>
          <span className="text-earth-walnut">Mon–Sat (09:00 AM – 05:30 PM)</span>
        </div>
      </div>

      {/* FARMER SUBMISSION MODE */}
      {activeRole === 'farmer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Submit New Ticket Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-agri-dark flex items-center gap-2">
              <Send className="w-4 h-4 text-agri-primary" /> {t.expert.submitCase}
            </h3>

            <form onSubmit={handleFarmerSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Select Affected Crop</label>
                <select 
                  value={cropInput}
                  onChange={(e) => setCropInput(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
                >
                  <option value="Cotton (Hybrid BG-II)">Cotton (Hybrid BG-II)</option>
                  <option value="Wheat (GW-496)">Wheat (GW-496)</option>
                  <option value="Tomato (Pusa Ruby)">Tomato (Pusa Ruby)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Describe Crop Symptoms & Issue</label>
                <textarea
                  rows={4}
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder="Describe leaf spots, pest activity, or unexpected wilting..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-agri-primary"
                />
              </div>

              <div className="p-3 bg-ai-light/40 rounded-xl border border-ai-mauve/30 text-[11px] text-ai-plum flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-ai-purple flex-shrink-0" />
                <span>AI telemetry (location, weather, recent Leaf Scans) will be attached automatically.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-agri-dark hover:bg-agri-primary text-white font-bold rounded-2xl shadow-agri transition-all text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-emerald-300" /> Submit Ticket to KVK Scientists
              </button>
            </form>
          </div>

          {/* Submitted Tickets Tracker */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-extrabold text-base text-agri-dark">{t.expert.myCases} ({expertCases.length})</h3>

            <div className="space-y-4">
              {expertCases.map((cItem) => (
                <div key={cItem.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 block">{cItem.id}</span>
                      <h4 className="font-bold text-sm text-agri-dark">{cItem.crop}</h4>
                    </div>

                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${
                      cItem.status === 'Resolved' 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {cItem.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-snug">{cItem.issueSummary}</p>

                  {/* Expert Response Box */}
                  <div className="p-4 bg-agri-bg rounded-2xl border border-agri-soft/40 text-xs space-y-1">
                    <span className="font-bold text-agri-dark flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-agri-primary" /> {cItem.expertName}
                    </span>
                    <p className="text-gray-700 leading-relaxed font-medium">{cItem.expertResponse}</p>
                    {cItem.resolvedDate !== 'Pending' && (
                      <span className="text-[10px] text-emerald-700 block font-semibold pt-1">
                        Resolved on {cItem.resolvedDate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* KVK AGRONOMIST DEMO PORTAL VIEW */}
      {activeRole === 'expert' && (
        <div className="space-y-6">
          <div className="p-4 bg-ai-plum text-white rounded-2xl flex items-center justify-between text-xs font-bold">
            <span>👨‍🔬 KVK Agronomist Portal Demo View (SIH Judge Inspection Mode)</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">Panchmahal District Station</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertCases.map((cItem) => (
              <div key={cItem.id} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-earth-walnut">{cItem.farmerName} • {cItem.location}</span>
                    <h3 className="font-extrabold text-base text-agri-dark">{cItem.crop}</h3>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                    {cItem.status}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <span className="font-bold text-gray-500 block">Farmer Query:</span>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-xl">{cItem.issueSummary}</p>
                </div>

                <div className="text-xs space-y-1">
                  <span className="font-bold text-ai-purple block">AI Telemetry Initial Diagnosis:</span>
                  <p className="text-ai-plum bg-ai-light/40 p-2.5 rounded-xl border border-ai-mauve/20 font-medium">
                    {cItem.aiInitialDiagnosis} ({cItem.aiConfidence})
                  </p>
                </div>

                {/* Respond Input Form */}
                {cItem.status !== 'Resolved' ? (
                  <div className="space-y-3 pt-2">
                    <textarea
                      rows={3}
                      placeholder="Write official agronomist recommendation and chemical/organic spray schedule..."
                      value={selectedCaseId === cItem.id ? agronomistResponseInput : ''}
                      onChange={(e) => {
                        setSelectedCaseId(cItem.id);
                        setAgronomistResponseInput(e.target.value);
                      }}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ai-purple"
                    />

                    <button
                      onClick={() => handleResolveSubmit(cItem.id)}
                      className="w-full py-2.5 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-xl transition-all shadow-ai flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-200" /> Issue Official Agronomist Response
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 text-emerald-900 text-xs rounded-xl border border-emerald-200 font-medium">
                    Resolved by Agronomist: "{cItem.expertResponse}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
