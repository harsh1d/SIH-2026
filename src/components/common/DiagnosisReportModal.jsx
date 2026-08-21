import React from 'react';
import { generateAgronomyPdfReport } from '../../services/pdfReportService';
import { 
  FileText, 
  X, 
  Download, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  Droplet, 
  Sun, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  DollarSign
} from 'lucide-react';

export const DiagnosisReportModal = ({
  isOpen,
  onClose,
  scanResult,
  farmerProfile,
  location,
  weatherData,
  previewImage
}) => {
  if (!isOpen || !scanResult) return null;

  const handlePrint = () => {
    generateAgronomyPdfReport({
      scanResult,
      farmerProfile,
      location,
      weatherData,
      previewImage
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[92vh] flex flex-col animate-scale-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-dark via-emerald-950 to-teal-950 text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0 border-b border-gov-gold/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl text-emerald-200 backdrop-blur-md border border-white/20 shadow-xs">
              <FileText className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-sans">Clinical Agronomy Diagnostic Summary</h3>
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-gov-gold text-agri-dark rounded-full">
                  PDF Export
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                Official certified pathology prescription & telemetry report
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content: High-Fidelity Graphical Preview */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Action Bar */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-bold text-emerald-950 text-xs">
                Complete A4 Graphical Report generated for {farmerProfile.name}'s farm ({location.formatted}).
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-agri transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Download / Print PDF</span>
            </button>
          </div>

          {/* Leaf Visual & Neural Segmentation Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
            
            {/* Scanned Image with Bounding Boxes */}
            <div className="sm:col-span-5 relative rounded-2xl overflow-hidden border border-gray-300 shadow-xs aspect-square bg-black">
              <img src={previewImage} alt="Diagnosed leaf" className="w-full h-full object-cover" />
              
              {scanResult.boundingBoxes?.map((box, bIdx) => (
                <div 
                  key={bIdx}
                  className={`absolute border-2 ${box.color} rounded pointer-events-none animate-pulse`}
                  style={{ top: box.y, left: box.x, width: box.width, height: box.height }}
                >
                  <span className="absolute -top-5 left-0 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                    {box.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Pathology Scores */}
            <div className="sm:col-span-7 space-y-3">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">DIAGNOSED PATHOLOGY</span>
                <h4 className="text-base font-black text-agri-dark">{scanResult.issue}</h4>
                <div className="text-[11px] text-gray-500 font-semibold">Crop: {scanResult.crop} • Category: {scanResult.category}</div>
              </div>

              {/* Progress Gauges */}
              <div className="space-y-2 font-bold text-[11px]">
                <div>
                  <div className="flex justify-between text-gray-700 mb-0.5">
                    <span>AI Model Confidence</span>
                    <span className="text-emerald-700 font-extrabold">{scanResult.confidence}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${scanResult.confidence}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-700 mb-0.5">
                    <span>Affected Foliage Tissue Surface</span>
                    <span className="text-rose-700 font-extrabold">{scanResult.affectedAreaPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: `${scanResult.affectedAreaPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-rose-50 text-rose-900 font-black rounded-xl border border-rose-200 text-center">
                SEVERITY LEVEL: {scanResult.severity}
              </div>
            </div>

          </div>

          {/* Actionable Dual Chemical & Organic Prescription Comparison Table */}
          <div className="space-y-3">
            <span className="font-black text-agri-dark uppercase tracking-wider block text-xs">
              🧪 Actionable Agronomic Prescription Protocols:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
                <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wide block">
                  🧪 Chemical Formulation & Exact Dosage
                </span>
                <p className="text-emerald-900 leading-relaxed font-bold whitespace-pre-line text-xs">
                  {scanResult.chemicalTreatment}
                </p>
                <div className="text-[10px] font-black text-emerald-800 pt-1 border-t border-emerald-200">
                  Estimated Cost: {scanResult.treatmentCostPerAcre}
                </div>
              </div>

              <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-200 space-y-2">
                <span className="text-[10px] font-black text-purple-950 uppercase tracking-wide block">
                  🌿 Organic & Bio-Control Alternative
                </span>
                <p className="text-purple-900 leading-relaxed font-bold whitespace-pre-line text-xs">
                  {scanResult.organicTreatment}
                </p>
                <div className="text-[10px] font-black text-ai-plum pt-1 border-t border-purple-200">
                  Eco-Safe / Organic Certified
                </div>
              </div>
            </div>
          </div>

          {/* Safe Spraying Window & Weather Impact */}
          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
            <span className="font-black text-sky-950 flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
              <Sun className="w-4 h-4 text-sky-600" /> 🌤️ Agro-Weather Safe Spraying Window ({location.formatted})
            </span>
            <p className="text-sky-900 font-medium">{scanResult.safeSprayingWindow}</p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="text-[10px] text-gray-500 font-medium">
            Grounded with ICAR Agricultural Guidelines • Digital Ref Verified
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-agri-dark hover:bg-agri-primary text-white font-black text-xs rounded-xl shadow-agri transition-all flex items-center gap-2 cursor-pointer border border-gov-gold/30"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Export High-Res PDF Report</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
