import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, CalendarRange, Trash2, Eye, ShieldCheck, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

interface MockMedicine {
  name: string;
  dosage: string;
  schedule: string;
  quantity: number;
}

const mockParsedMedicines: Record<string, MockMedicine[]> = {
  prescription_chronic: [
    { name: 'Metformin Hydrochloride', dosage: '500mg', schedule: 'Twice daily with meals', quantity: 60 },
    { name: 'Atorvastatin (Lipitor)', dosage: '20mg', schedule: 'Once daily at bedtime', quantity: 30 },
    { name: 'Amlodipine Besylate', dosage: '5mg', schedule: 'Once daily in the morning', quantity: 30 }
  ],
  prescription_acute: [
    { name: 'Amoxicillin Trihydrate', dosage: '500mg', schedule: 'Three times daily with water', quantity: 21 },
    { name: 'Paracetamol (Acetaminophen)', dosage: '650mg', schedule: 'Every 6 hours as needed for discomfort', quantity: 15 }
  ]
};

export default function PrescriptionRefillDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'completed'>('idle');
  const [parsedMeds, setParsedMeds] = useState<MockMedicine[]>([]);
  const [enableRefill, setEnableRefill] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateOCR = (medsTypeKey: string) => {
    setScanStatus('scanning');
    setParsedMeds([]);
    
    setTimeout(() => {
      setParsedMeds(mockParsedMedicines[medsTypeKey] || []);
      setScanStatus('completed');
    }, 2500);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setupFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setupFile(e.target.files[0]);
    }
  };

  const setupFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    setImagePreview(URL.createObjectURL(uploadedFile));
    simulateOCR('prescription_chronic');
  };

  const loadSamplePrescription = (type: 'chronic' | 'acute') => {
    setFile(new File(['sample'], `prescription_${type}.png`, { type: 'image/png' }));
    setImagePreview(
      type === 'chronic' 
        ? 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200' 
        : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200'
    );
    simulateOCR(`prescription_${type}`);
  };

  const resetUploader = () => {
    setFile(null);
    setImagePreview(null);
    setScanStatus('idle');
    setParsedMeds([]);
  };

  return (
    <div id="pharmacy-demo" className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 md:p-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Upload Trigger Zone */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono tracking-wider text-brand-blue uppercase bg-blue-50 py-1 px-3 rounded-full">
              Automated Medicine Dispensation
            </span>
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
            24/7 Automated Refill System
          </h3>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Upload your handwritten prescription script or digital clinical PDF below. Our cloud OCR engine reads valid physician signatures and sets up auto-dosage records and smart pharmacy refill cycles seamlessly.
          </p>

          {/* DRAG AND DROP ZONE */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 py-12 text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 ${
              isDragging 
                ? 'border-brand-teal bg-teal-50/50' 
                : 'border-slate-200 hover:border-brand-blue hover:bg-slate-50/50'
            }`}
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*,application/pdf" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <UploadCloud className="w-8 h-8 text-brand-blue" />
            </div>

            <div className="space-y-1">
              <p className="text-slate-800 font-bold text-sm">
                Drag &amp; drop file here, or <span className="text-brand-blue font-extrabold">browse</span>
              </p>
              <p className="text-slate-400 text-xs font-mono">SUPPORTS JPG, PNG, PDF UP TO 10MB</p>
            </div>
          </div>

          {/* Sample quick-load prompts for immediate testing */}
          <div className="flex flex-col gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 font-bold tracking-tight">🧪 QUICK DEMO SAMPLES (CLICK TO TRIGGER):</p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => loadSamplePrescription('chronic')}
                className="text-xs bg-white hover:bg-brand-blue hover:text-white text-slate-700 font-bold py-2 px-3 rounded-lg border border-slate-200 transition-colors shadow-sm cursor-pointer"
              >
                📄 Sample Chronic Script (Diabetes/Heart)
              </button>
              <button 
                onClick={() => loadSamplePrescription('acute')}
                className="text-xs bg-white hover:bg-brand-blue hover:text-white text-slate-700 font-bold py-2 px-3 rounded-lg border border-slate-200 transition-colors shadow-sm cursor-pointer"
              >
                📄 Sample Acute Script (Amoxicillin)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Cloud OCR & Dispensary Feedback */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {scanStatus === 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[340px] bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center p-6 text-center text-slate-400"
              >
                <FileText className="w-12 h-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700 text-sm">Awaiting Prescription Document</p>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-xs">
                  Upload an image of a handwritten medical note, or choose a test sample on the left to see the smart dispensary pipeline go to work.
                </p>
              </motion.div>
            )}

            {scanStatus === 'scanning' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[340px] bg-slate-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
              >
                {/* Horizontal scanner beam animation */}
                <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500 blur-sm animate-[bounce_2s_infinite]"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                  <div className="space-y-1">
                    <p className="font-mono text-emerald-400 font-bold tracking-widest text-sm uppercase">ANALYZING PHARMACY PAYLOAD</p>
                    <p className="text-[10px] text-slate-400 font-mono">Running signature validator &amp; OCR translation nodes...</p>
                  </div>
                  {imagePreview && (
                    <img 
                      src={imagePreview} 
                      alt="scanning preview" 
                      className="h-16 w-32 object-cover rounded border border-slate-700 opacity-40 grayscale mt-2" 
                    />
                  )}
                </div>
              </motion.div>
            )}

            {scanStatus === 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-slate-950 text-white rounded-2xl p-5 md:p-6 border border-slate-800 flex flex-col justify-between"
              >
                {/* Results Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    OCR PARSING SUCCESSFUL
                  </div>
                  <button 
                    onClick={resetUploader}
                    className="text-slate-400 hover:text-white transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear / Reset
                  </button>
                </div>

                {/* Extracted medicines list */}
                <div className="space-y-4 my-4 max-h-[160px] overflow-y-auto pr-1">
                  {parsedMeds.map((med, index) => (
                    <div key={index} className="flex justify-between items-center gap-4 p-2.5 bg-slate-900/50 rounded-xl border border-slate-800/60 hover:bg-slate-900 transition-colors">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white font-heading">{med.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Dosage: {med.dosage} • {med.schedule}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">
                          QTY: {med.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Automated recurring loop toggle */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 flex justify-between items-center gap-4">
                  <div className="space-y-0.5 max-w-[70%]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-accent">
                      <CalendarRange className="w-3.5 h-3.5" />
                      Smart Medicine Refill Loop
                    </div>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Automatically request physician authorization &amp; deliver replacements 3 days before supply exhausts.
                    </p>
                  </div>
                  
                  {/* Styled Switch Check */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={enableRefill}
                      onChange={(e) => setEnableRefill(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* HIPAA compliance badge */}
                <p className="text-[9px] text-slate-500 font-mono text-center mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  EHR encrypted • HIPAA compliant transcription nodes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
