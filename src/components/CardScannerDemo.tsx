import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CreditCard, HeartPulse, Send, CheckCircle2, User, Phone, MapPin, Eye, VolumeX, Volume2 } from 'lucide-react';

export default function CardScannerDemo() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [sosStep, setSosStep] = useState(0); // 0: idle, 1: counting, 2: dispatched
  const [countdown, setCountdown] = useState(3);
  const [showScanner, setShowScanner] = useState(false);
  const [cardOwner, setCardOwner] = useState({
    name: 'Amogh Sharma',
    bloodType: 'O_POSITIVE',
    allergies: 'Penicillin, Tree Nuts',
    primaryEmergency: '+91 98765 43210',
    conditions: 'Mild Asthma',
    cardId: 'LOPH-887E-89PX',
    region: 'Delhi, India'
  });

  const triggerSos = () => {
    if (sosActive) {
      // Cancel
      setSosActive(false);
      setSosStep(0);
      setCountdown(3);
      return;
    }
    setSosActive(true);
    setSosStep(1);
    setCountdown(3);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActive && sosStep === 1) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setSosStep(2);
      }
    }
    return () => clearTimeout(timer);
  }, [sosActive, sosStep, countdown]);

  return (
    <div id="gdhsc-demo" className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 md:p-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Explanatory copy & benefits with Interactive Card Flip */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono tracking-wider text-brand-blue uppercase bg-blue-50 py-1 px-3 rounded-full">
              IoT Medical Hardware Ecosystem
            </span>
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
            Meet the Global Lifeline Card
          </h3>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            The <strong>Global Digital Health Smart Card (GDHSC)</strong> consolidates emergency records, pre-existing history, and emergency response pipelines into a single high-durability smart wallet asset. First responders scan the physical card to access dynamic information, or tap it via NFC to trigger your customized care loop automatically.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-teal-100 text-brand-teal">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Dual NFC + QR Module</p>
                <p className="text-slate-500 text-xs mt-1">Natively compatible with all smartphone scanning cameras & NFC reader circuits instantly.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Panic Broadcasting</p>
                <p className="text-slate-500 text-xs mt-1">One physical button triggers auto-dispatch of closest paramedics with satellite live tracks.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-100 p-4 text-xs text-amber-800 leading-relaxed flex gap-2">
            <span className="text-base">🎁</span>
            <p>
              <strong>Global Benefits Badge:</strong> Owners receive up to <strong>30% direct diagnostic discounts</strong> and priority booking queue triggers across over 250 collaborating hospitals and laboratory testing systems.
            </p>
          </div>
        </div>

        {/* Right Column: Physical Card Interactive Widget & Scanner Simulation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          {/* Card Container block */}
          <div className="relative w-full max-w-[340px] h-[210px] [perspective:1000px] cursor-pointer group mb-4">
            <div 
              onClick={() => setIsFlipped(!isFlipped)} 
              className={`relative w-full h-full text-white transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
              {/* FRONT OF THE SMART CARD */}
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0B4A8F] via-slate-800 to-slate-900 border border-slate-700 p-5 shadow-xl [backface-visibility:hidden] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs font-bold">+</div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-100 font-heading">LifeOnPlus</span>
                    </div>
                    {/* Simulated hologram microchip */}
                    <div className="w-8 h-7 bg-amber-300/80 rounded-md border border-amber-200/50 flex flex-col justify-between p-1 bg-[radial-gradient(#d97706_1px,transparent_1px)] bg-[size:3px_3px]"></div>
                  </div>
                  
                  {/* Card ID Indicator */}
                  <p className="font-mono text-[10px] text-slate-400 mt-2 tracking-widest">{cardOwner.cardId}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 font-mono">PRIMARY HOLDER</p>
                    <p className="text-sm font-bold tracking-tight font-heading mt-0.5">{cardOwner.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      NFC ENABLED
                    </span>
                    <p className="text-xs text-slate-400 font-mono">BLOOD: <strong className="text-red-400">{cardOwner.bloodType.replace('_', ' ')}</strong></p>
                  </div>
                </div>
              </div>

              {/* BACK OF THE SMART CARD */}
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border border-slate-800 p-5 shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col gap-1 text-slate-200">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Allergies</p>
                    <p className="text-xs font-semibold text-rose-300">{cardOwner.allergies}</p>
                    
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Vitals & Conditions</p>
                    <p className="text-xs font-medium">{cardOwner.conditions}</p>
                  </div>
                  
                  {/* Generated QR Code placeholder */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-white p-1 rounded-md border border-slate-700 w-16 h-16 flex items-center justify-center">
                      <svg className="w-14 h-14 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 2h6v6H2V2zm1.5 1.5v3h3v-3h-3zM2 16h6v6H2v-6zm1.5 1.5v3h3v-3h-3zM16 2h6v6h-6V2zm1.5 1.5v3h3v-3h-3zM16 16h3v1.5h-3V16zm3 1.5h3V19h-3v-1.5zm-3 3h3V22h-3v-1.5zm3 1.5h3v-1.5h-3V22zm-3-3h1.5v-1.5H16V19zm1.5-4.5H19V16h-1.5v-1.5zM11.5 2h1v1h-1V2zm0 2h1v1h-1V4zm0 2h1v1h-1V6zm0 2h1v1h-1V8zm-2 0h1v1h-1V8zm2 2.5H11v1.5h1.5v-1.5zM10 11.5h1.5V13H10v-1.5zm3 0h1.5V13H13v-1.5zM13 14.5h1.5V16H13v-1.5z" />
                      </svg>
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono">SCAN MEDIC</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-mono">SOS Contact: {cardOwner.primaryEmergency}</span>
                  <span className="text-emerald-400 font-bold">LifeOnPlus Secure</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-6 font-mono text-center">
            💡 Click on the card to flip it and scan allergies & QR records!
          </p>

          {/* Interactive Trigger Center */}
          <div className="w-full max-w-[340px] flex flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={triggerSos}
              className={`w-full py-4 px-6 rounded-2xl font-bold font-heading text-sm shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer ${
                sosStep === 0
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-300'
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <ShieldAlert className="w-5 h-5 animate-bounce" />
              {sosStep === 0 ? 'SIMULATE EMERGENCY PANIC' : 'CANCEL EMERGENCY BROADCAST'}
            </motion.button>
          </div>

          {/* Dynamic Interactive SOS Console */}
          <AnimatePresence>
            {sosActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-[340px] mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono text-xs shadow-inner overflow-hidden"
              >
                {sosStep === 1 && (
                  <div className="flex flex-col items-center text-center gap-3 py-2">
                    <div className="relative flex justify-center items-center h-14 w-14 bg-red-600/20 text-red-500 rounded-full animate-pulse border border-red-500/30">
                      <CreditCard className="w-6 h-6 animate-spin text-red-400" />
                      <span className="absolute inset-0 rounded-full bg-red-500/10 animate-ping"></span>
                    </div>
                    <div>
                      <p className="text-red-400 font-bold text-sm tracking-widest">TRANSMITTING SOS PAYLOAD</p>
                      <p className="text-slate-400 text-[10px] mt-1">Satellite tracking coordinates broad-sweep</p>
                    </div>
                    <p className="text-3xl font-extrabold text-white mt-1">
                      {countdown}s
                    </p>
                    <p className="text-[10px] text-slate-400">Broadcasting Blood Group {cardOwner.bloodType} to coordinates...</p>
                  </div>
                )}

                {sosStep === 2 && (
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col gap-2.5"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 pb-1.5 border-b border-slate-800">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-wider">SECURE LINK DISPATCHED</span>
                    </div>
                    <div className="space-y-1.5 text-slate-300 text-[11px]">
                      <p><span className="text-slate-500">SOS Node:</span> New Delhi Ambulatory Grid</p>
                      <p><span className="text-slate-500">Status:</span> Emergency Squad En-route</p>
                      <p><span className="text-slate-500">Estimated Arrival:</span> 5 to 7 Minutes</p>
                      <p><span className="text-slate-500">Relative SMS Alerts:</span> Successfully broadcasted</p>
                    </div>
                    {/* Simulated live telemetry map */}
                    <div className="mt-2 h-14 bg-slate-950 rounded-xl relative overflow-hidden border border-slate-800 flex items-center justify-center">
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/20"></div>
                      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-emerald-500/20"></div>
                      <div className="absolute h-2 w-2 rounded-full bg-emerald-400 left-1/3 top-1/2 -translate-x-1 animate-ping"></div>
                      <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500 left-1/3 top-1/2 -translate-x-0.75"></div>
                      <div className="absolute h-2 w-2 rounded-full bg-rose-500 left-2/3 top-2/5 animate-pulse"></div>
                      <span className="absolute bottom-1 right-2 text-[8px] text-slate-500 font-semibold uppercase font-sans">
                        Telemetry GPS Grid Live
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
