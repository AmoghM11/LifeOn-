import { motion } from 'motion/react';
import { ShieldCheck, Globe, MapPin, AlertCircle } from 'lucide-react';
import { Region } from '../types';

interface SplashGatewayProps {
  onSelectRegion: (region: Region) => void;
}

export default function SplashGateway({ onSelectRegion }: SplashGatewayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-blue/90 font-sans overflow-y-auto">
      {/* Abstract Glowing Aura */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8 md:p-12 text-center"
      >
        {/* Brand Banner */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#0B4A8F] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm italic shrink-0">L+</div>
          <div className="text-left">
            <h1 className="text-lg font-bold leading-none text-[#0B4A8F]">LifeOnPlus</h1>
            <p className="text-[10px] tracking-[0.1em] text-slate-400 font-semibold uppercase">In collaboration with Paxykop</p>
          </div>
        </div>

        {/* Sub-Header Greeting */}
        <p className="text-xs uppercase tracking-widest font-extrabold text-brand-blue bg-blue-50 py-1.5 px-4 rounded-full inline-block mb-4">
          World-Class Medical Validation & Restoration
        </p>

        {/* Main Promoted Statement */}
        <h1 className="text-xl md:text-3xl font-extrabold font-heading text-slate-900 tracking-tight leading-snug mb-6 max-w-xl mx-auto">
          Welcome to the World's Most Advanced Medical & Digital Healthcare Technological Products & Services.
        </h1>

        <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Please select your current location to experience localized medical services, emergency response modules, and regional B2B healthcare partner opportunities.
        </p>

        {/* Dual Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          {/* Inside India Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRegion('india')}
            id="btn-inside-india"
            className="group relative flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-gradient-to-b hover:from-white hover:to-emerald-50/50 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 transition-all duration-300 text-center cursor-pointer shadow-sm hover:shadow-lg hover:shadow-emerald-100"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-lg font-bold text-slate-800 font-heading group-hover:text-emerald-700">
              INSIDE INDIA
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Explore dynamic emergency Ambulance grids, localized smart card pricing, and UPI verification nodes.
            </p>
            <div className="absolute top-3 right-3 text-xs font-semibold bg-emerald-500 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Fast Route
            </div>
          </motion.button>

          {/* Outside India Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRegion('international')}
            id="btn-outside-india"
            className="group relative flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-gradient-to-b hover:from-white hover:to-blue-50/50 rounded-2xl border-2 border-slate-100 hover:border-brand-blue transition-all duration-300 text-center cursor-pointer shadow-sm hover:shadow-lg hover:shadow-blue-100"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <p className="text-lg font-bold text-slate-800 font-heading group-hover:text-brand-blue">
              OUTSIDE INDIA
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Activate global lifeline corridors, multi-currency wallets, and international premium health hubs.
            </p>
            <div className="absolute top-3 right-3 text-xs font-semibold bg-brand-blue text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Global USD
            </div>
          </motion.button>
        </div>

        {/* Security / Partner Footnote Signifier */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-brand-blue" />
            EHR Privacy Assured
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-4 h-4 text-brand-teal" />
            International SOS Routing Enabled
          </span>
        </div>
      </motion.div>
    </div>
  );
}
