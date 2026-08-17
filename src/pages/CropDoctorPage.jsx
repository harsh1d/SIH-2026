import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockFollowUpScans } from '../data/mockData';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  UserCheck, 
  Activity, 
  TrendingUp, 
  FileText,
  ShieldAlert,
  Search,
  Calendar
} from 'lucide-react';

export const CropDoctorPage = () => {
  const { setActiveTab, showToast, t } = useApp();

  const [activeTabSub, setActiveTabSub] = useState('scanner'); // 'scanner' | 'followup'
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setIsScanning(true);
    showToast('AI Model inspecting leaf tissue cellular structure...', 'info');

    // Simulate ML Image Classification delay
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        crop: "Cotton (Hybrid BG-II)",
        issue: "Early Stage Pink Bollworm Infestation",
        confidence: 87,
        symptomsDetected: [
          "Small entrance hole near boll base",
          "Rosette petal flowering pattern on upper buds",
          "Slight leaf wilting around fruit clusters"
        ],
        cause: "High atmospheric humidity (>75%) coupled with night temperature 26°C encouraging moth egg laying.",
        treatment: "1. Install 5 Pheromone traps per acre immediately.\n2. Spray Profenophos 50% EC @ 2ml/L water if trap catch exceeds 8 moths/night.",
        whatToAvoid: "Do NOT use broad-spectrum synthetic pyrethroids which destroy beneficial predator insects.",
        expertRecommended: false
      });
      showToast('Diagnostic scan complete. 87% confidence.', 'success');
    }, 2200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-agri-dark uppercase tracking-widest mb-1">
            <Camera className="w-4 h-4 text-agri-primary" /> Visual Diagnostics & ML Monitoring
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-agri-dark font-sans tracking-tight">
            {t.cropDoctor.title || "Crop Doctor & Diagnostics"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            {t.cropDoctor.subtitle || "Instant computer vision leaf diagnosis and 7-day follow-up recovery monitoring."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setActiveTabSub('scanner')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
              activeTabSub === 'scanner' 
                ? 'bg-agri-dark text-white shadow-agri' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📸 Leaf Scanner
          </button>
          <button
            onClick={() => setActiveTabSub('followup')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
              activeTabSub === 'followup' 
                ? 'bg-ai-plum text-white shadow-ai' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔄 7-Day Follow-Up
          </button>
        </div>
      </div>

      {/* SCANNER VIEW */}
      {activeTabSub === 'scanner' && (
        <div className="space-y-6">
          
          {/* UPLOAD CONTAINER */}
          {!scanResult && (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-dashed border-agri-soft/60 hover:border-agri-primary transition-all text-center space-y-5 shadow-sm relative overflow-hidden">
              
              {/* Scanning Animated Beam Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center z-20 space-y-4">
                  <div className="w-64 h-64 border-2 border-emerald-400 rounded-3xl relative overflow-hidden shadow-2xl">
                    <img src={previewImage} alt="Scanning" className="w-full h-full object-cover" />
                    <div className="scan-beam animate-scan" />
                  </div>
                  <div className="text-white text-xs font-extrabold flex items-center gap-2 bg-agri-dark px-5 py-2.5 rounded-full border border-emerald-400/40 shadow-lg">
                    <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
                    <span>ANALYZING LEAF CELLULAR TISSUE...</span>
                  </div>
                </div>
              )}

              <div className="w-20 h-20 rounded-3xl bg-agri-light text-agri-dark flex items-center justify-center mx-auto shadow-sm border border-agri-soft/30">
                <Camera className="w-10 h-10 text-agri-primary" />
              </div>

              <div>
                <span className="text-[10px] font-black text-earth-terracotta uppercase tracking-widest block mb-1">
                  COMPUTER VISION DIAGNOSTIC
                </span>
                <h3 className="text-2xl font-black text-agri-dark tracking-tight">📸 SCAN YOUR CROP LEAF</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-1.5 font-medium leading-relaxed">
                  Upload a clear close-up image of your leaf, fruit, or plant stalk. AI will scan pest spots, lesions, and fungal spores.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <label className="flex items-center gap-2.5 px-7 py-4 bg-agri-dark hover:bg-agri-primary text-white font-extrabold text-xs sm:text-sm rounded-2xl cursor-pointer shadow-agri transition-all transform hover:-translate-y-0.5 border border-gov-gold/30">
                  <Upload className="w-4 h-4 text-emerald-300" />
                  <span>{t.cropDoctor.dragDrop || "Upload Leaf Photo"}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          )}

          {/* DIAGNOSTIC RESULTS DISPLAY */}
          {scanResult && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden space-y-6 animate-fade-in p-6 sm:p-8">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                  <img src={previewImage} alt="Scanned Crop" className="w-20 h-20 rounded-2xl object-cover border border-gray-200 shadow-xs" />
                  <div>
                    <span className="text-[10px] font-black text-agri-primary uppercase tracking-wider block">
                      🌱 CROP DETECTED: {scanResult.crop}
                    </span>
                    <h3 className="text-xl font-black text-agri-dark">{scanResult.issue}</h3>
                    <div className="text-xs text-gray-500 font-medium">Scanned Today • Halol Gujarat</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">AI CONFIDENCE</div>
                    <div className="text-lg font-black text-emerald-800">{scanResult.confidence}%</div>
                  </div>
                </div>
              </div>

              {/* Symptoms & Cause */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-agri-bg border border-agri-soft/40 space-y-2">
                  <span className="font-extrabold text-agri-dark flex items-center gap-1.5 text-sm uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-agri-primary" /> 🔍 Symptoms Detected
                  </span>
                  <ul className="space-y-1 text-gray-700 pl-5 list-disc font-medium">
                    {scanResult.symptomsDetected.map((sym, idx) => (
                      <li key={idx}>{sym}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-earth-cream border border-earth-wheat/30 space-y-2">
                  <span className="font-extrabold text-earth-soil flex items-center gap-1.5 text-sm uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-earth-terracotta" /> 🧠 AI Environmental Analysis
                  </span>
                  <p className="text-gray-700 leading-relaxed font-medium">{scanResult.cause}</p>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
                <span className="text-xs font-black text-emerald-950 uppercase tracking-wider block">
                  🌿 Recommended Treatment & Dosage
                </span>
                <p className="text-xs text-emerald-900 leading-relaxed whitespace-pre-line font-bold">
                  {scanResult.treatment}
                </p>
              </div>

              {/* Safety Rules */}
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1">
                <span className="font-black flex items-center gap-1 text-rose-700 uppercase tracking-wide">
                  <XCircle className="w-4 h-4 text-rose-600" /> 🚫 What to Avoid
                </span>
                <p className="font-medium">{scanResult.whatToAvoid}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setScanResult(null);
                    setPreviewImage(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-2xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Upload Another Image
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('ai')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-2xl transition-colors shadow-ai"
                  >
                    <Sparkles className="w-4 h-4 text-purple-200" /> Ask AI About This
                  </button>

                  <button
                    onClick={() => setActiveTab('expert')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-agri-dark hover:bg-agri-primary text-white text-xs font-bold rounded-2xl transition-colors shadow-agri border border-gov-gold/30"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-300" /> Escalate to KVK Expert
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* 7-DAY FOLLOW-UP MONITORING VIEW */}
      {activeTabSub === 'followup' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-ai-plum via-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-ai border border-ai-mauve/40">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-7 h-7 text-purple-300" />
              <div>
                <h2 className="text-xl font-bold font-sans">{t.cropDoctor.followUpTitle || "7-Day Photo Progress Monitoring"}</h2>
                <p className="text-xs text-purple-200/80 font-medium">{t.cropDoctor.followUpSubtitle || "Compare Day 1 before treatment with Day 7 recovery photo to verify health recovery."}</p>
              </div>
            </div>
          </div>

          {mockFollowUpScans.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6">
              
              {/* Header Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <span className="text-[10px] font-black text-ai-purple uppercase tracking-wider block">
                    Case #{caseItem.id} • {caseItem.crop}
                  </span>
                  <h3 className="text-lg font-black text-agri-dark">{caseItem.issueName}</h3>
                </div>

                <div className={`px-4 py-2 rounded-2xl border text-xs font-black flex items-center gap-2 ${caseItem.statusBadgeColor}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{caseItem.status}: {caseItem.improved}</span>
                </div>
              </div>

              {/* Side-by-Side Image Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Day 1 Photo Card */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                      📅 {caseItem.day1Date}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Health: {caseItem.day1HealthScore}/100
                    </span>
                  </div>

                  <div className="relative h-48 rounded-2xl overflow-hidden border border-gray-300 shadow-xs">
                    <img src={caseItem.day1Image} alt="Day 1" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-black rounded-xl">
                      BEFORE TREATMENT
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-snug font-medium">{caseItem.day1Symptoms}</p>
                </div>

                {/* Day 7 Photo Card */}
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                      📅 {caseItem.day7Date}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                      Health: {caseItem.day7HealthScore}/100 (+{caseItem.recoveryPercent}%)
                    </span>
                  </div>

                  <div className="relative h-48 rounded-2xl overflow-hidden border border-emerald-300 shadow-xs">
                    <img src={caseItem.day7Image} alt="Day 7" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 px-3 py-1 bg-agri-dark text-white text-[10px] font-black rounded-xl border border-gov-gold/30">
                      AFTER 7-DAY RECOVERY
                    </span>
                  </div>

                  <p className="text-xs text-emerald-950 leading-snug font-medium">{caseItem.day7Symptoms}</p>
                </div>

              </div>

              {/* AI Progress Analysis */}
              <div className="p-4 bg-ai-light/40 border border-ai-mauve/30 rounded-2xl space-y-2">
                <span className="text-xs font-black text-ai-plum flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-ai-purple" /> AI Treatment Evaluation & Note
                </span>
                <p className="text-xs text-gray-800 leading-relaxed font-semibold">{caseItem.aiAnalysisNote}</p>
                <div className="text-xs font-black text-agri-dark pt-1">
                  Next Step: <span className="font-semibold text-gray-700">{caseItem.recommendedNextStep}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setActiveTab('ai')}
                  className="px-4 py-2.5 bg-ai-plum hover:bg-ai-purple text-white text-xs font-bold rounded-2xl transition-colors shadow-ai"
                >
                  {t.cropDoctor.askAiAboutResult || "Ask AI About Results"} →
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
