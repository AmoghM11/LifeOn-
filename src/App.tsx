import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  AlertOctagon, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Activity, 
  Award, 
  Shield, 
  Send,
  Zap,
  Info,
  Calendar,
  Layers,
  FlameKindling
} from 'lucide-react';

import { Region, ProductGroup } from './types';
import { productsList, advisoryTeam, faqList } from './data';

// Custom Modules
import SplashGateway from './components/SplashGateway';
import CardScannerDemo from './components/CardScannerDemo';
import PrescriptionRefillDemo from './components/PrescriptionRefillDemo';
import PartnerRegistrationPortal from './components/PartnerRegistrationPortal';

export default function App() {
  const [region, setRegion] = useState<Region | null>(null);
  const [activeGroup, setActiveGroup] = useState<ProductGroup>('digital-emergency');
  
  // Navigation states
  const [activeSegment, setActiveSegment] = useState<'home' | 'products' | 'about' | 'partner' | 'faq' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ state
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<'all' | 'general' | 'records' | 'card' | 'partner'>('all');
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({ q1: true });

  // Contact Form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false
  });

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) return;
    setContactData(prev => ({ ...prev, submitted: true }));
    setTimeout(() => {
      setContactData({
        name: '',
        email: '',
        subject: '',
        message: '',
        submitted: false
      });
      alert('Message sent successfully! Our clinical coordination board will address your inquiry shortly.');
    }, 1200);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqList.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
                          item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = selectedFaqCategory === 'all' || item.group === selectedFaqCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter products by selected toggle
  const getProductsForActiveGroup = () => {
    if (activeGroup === 'digital-emergency') {
      return productsList.filter(p => p.id === 'gdhsc' || p.id === 'ambulance-response');
    } else {
      return productsList.filter(p => p.id === 'body-recharge' || p.id === 'medicine-refiller');
    }
  };

  // Switch regions dynamically
  const switchRegion = (next: Region) => {
    setRegion(next);
  };

  // Jump smoothly to partner registration section with franchise preselected
  const triggerFranchiseJump = () => {
    const el = document.getElementById('b2b-registration-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-800 font-sans selection:bg-brand-blue/10 selection:text-brand-blue relative">
      <AnimatePresence>
        {!region && (
          <SplashGateway onSelectRegion={(selected) => setRegion(selected)} />
        )}
      </AnimatePresence>

      {region && (
        <div className="flex flex-col min-h-screen">
          {/* TOP ANNOUNCEMENT BAR */}
          <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 flex justify-between items-center z-40 relative">
            <div className="flex items-center gap-1.5 font-medium truncate">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Collaborating with Paxykop Technologies research board</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => switchRegion(region === 'india' ? 'international' : 'india')}
                className="hover:text-white transition-colors cursor-pointer text-[11px] font-bold flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded"
              >
                Region: <span className="text-brand-accent uppercase font-extrabold">{region === 'india' ? 'INSIDE INDIA 🇮🇳' : 'OUTSIDE INDIA 🌐'}</span> (Switch)
              </button>
            </div>
          </div>

          {/* MAIN FLOATING NAV BAR */}
          <header className="sticky top-0 z-40 bg-white border-b border-slate-200 transition-all">
            <div className="max-w-7xl mx-auto px-8">
              <div className="flex justify-between items-center h-16">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0B4A8F] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm italic">L+</div>
                  <div>
                    <h1 className="text-sm font-bold leading-none text-[#0B4A8F] tracking-tight">LifeOnPlus</h1>
                    <p className="text-[9px] tracking-[0.05em] text-slate-400 font-semibold uppercase">In collaboration with Paxykop</p>
                  </div>
                </div>

                {/* Desktop Nav Actions */}
                <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
                  <a href="#home-dashboard" className="text-[#0B4A8F] hover:opacity-80 transition-opacity">Home</a>
                  <a href="#product-showcase" className="hover:text-[#0B4A8F] transition-colors">Products</a>
                  <a href="#b2b-registration-portal" className="hover:text-[#0B4A8F] transition-colors">Partnership</a>
                  <a href="#about-section" className="hover:text-[#0B4A8F] transition-colors">About Us</a>
                  <a href="#contact-section" className="hover:text-[#0B4A8F] transition-colors">Contact</a>
                </nav>

                <div className="hidden md:flex items-center gap-3">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('b2b-registration-portal');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#0B4A8F] text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-800 transition-all cursor-pointer"
                  >
                    Emergency Access
                  </button>
                </div>

                {/* Mobile Menu Burger Tag */}
                <div className="md:hidden">
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {mobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Expanded Menu Block */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white border-b border-slate-150 p-4 space-y-2 animate-fadeIn font-semibold">
                <a href="#home-dashboard" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-slate-105 text-sm">Dashboard</a>
                <a href="#product-showcase" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-slate-105 text-sm">Products Highlight</a>
                <a href="#about-section" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-slate-105 text-sm">About Founder</a>
                <a href="#b2b-registration-portal" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-slate-105 text-sm">Join Program</a>
                <a href="#faq-section" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-slate-105 text-sm">Support FAQ</a>
                <a href="#contact-section" onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-slate-105 text-sm">Submit Query</a>
                <div className="pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const el = document.getElementById('b2b-registration-portal');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-center block bg-[#0B4A8F] py-3 rounded-lg text-white font-bold text-xs uppercase tracking-tight"
                  >
                    Emergency Access
                  </button>
                </div>
              </div>
            )}
          </header>

          {/* MAIN BODY LAYOUT AREA */}
          <main className="flex-grow">
            
            {/* HERO / CALL TO ACTION HERO CARD SECTION */}
            <section className="bg-white border-b border-slate-100 flex flex-col lg:flex-row relative overflow-hidden min-h-[380px]">
              <div className="w-full lg:w-1/2 p-8 sm:p-12 z-10 flex flex-col justify-center">
                <div className="inline-block self-start px-3 py-1 bg-cyan-100 text-cyan-700 text-[10px] font-bold rounded-full uppercase mb-4 tracking-wider">
                  Global Lifeline
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4A8F] leading-[1.1] mb-4">
                  The Future of <span className="text-cyan-500 underline decoration-cyan-200 underline-offset-4 font-extrabold">Digital Health</span>
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
                  Your one-stop digital healthcare marketplace. Accessible, affordable, and world-class medical technological products at your fingertips. Now serving you in <span className="text-[#0B4A8F] font-bold uppercase">{region === 'india' ? 'India 🇮🇳' : 'Global Markets 🌐'}</span> environments.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => switchRegion('india')}
                    className={`px-8 py-3 rounded-lg font-bold text-xs uppercase flex flex-col items-center leading-tight shadow-md transition-all cursor-pointer ${
                      region === 'india' 
                        ? 'bg-[#0B4A8F] text-white border-b-4 border-blue-900' 
                        : 'bg-white border-2 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>GATEWAY</span>
                    <span className="text-[9px] opacity-80 uppercase font-mono">Inside India</span>
                  </button>
                  <button 
                    onClick={() => switchRegion('international')}
                    className={`px-8 py-3 rounded-lg font-bold text-xs uppercase flex flex-col items-center leading-tight transition-all cursor-pointer ${
                      region === 'international' 
                        ? 'bg-[#0B4A8F] text-white border-b-4 border-blue-900' 
                        : 'bg-white border-2 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>GATEWAY</span>
                    <span className="text-[9px] opacity-80 uppercase font-mono">Outside India</span>
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-[#0B4A8F] relative min-h-[280px] lg:min-h-auto flex items-center justify-center p-8">
                 <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                   <svg className="w-64 h-64 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                   </svg>
                 </div>
                 <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white max-w-[320px] shadow-lg">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                     <span className="text-[10px] uppercase font-bold tracking-widest">Panic Button Active</span>
                   </div>
                   <p className="text-xs font-medium leading-relaxed italic opacity-90">"Our mission is to bridge the gap between emergency response and affordable wellness."</p>
                   <p className="text-[10px] mt-2 font-bold uppercase text-cyan-300">— Founder, Shri. Rajesh Paxykop</p>
                 </div>
              </div>
            </section>

            {/* DYNAMIC TOGGLE OVERVIEW: DIGITAL EMERGENCY vs PREVENTIVE */}
            <section id="home-dashboard" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-blue">
                  Comprehensive Care Options
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                  Filter Our Core Medical Ecosystems
                </h3>
                <p className="text-slate-500 text-sm">
                  We specialize in digital emergency insurance overlays as well as modern, non-invasive physical therapeutic diagnostics. Use the toggles below to view core catalogs.
                </p>
              </div>

              {/* Main Filtering Dynamic Switcher */}
              <div className="flex justify-center mb-12">
                <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex gap-1.5 border border-slate-200">
                  <button
                    onClick={() => setActiveGroup('digital-emergency')}
                    className={`py-3 px-6 rounded-xl font-bold font-heading text-xs sm:text-sm uppercase tracking-tight transition-all cursor-pointer ${
                      activeGroup === 'digital-emergency'
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Digital Emergency Health Package
                  </button>
                  <button
                    onClick={() => setActiveGroup('preventive')}
                    className={`py-3 px-6 rounded-xl font-bold font-heading text-xs sm:text-sm uppercase tracking-tight transition-all cursor-pointer ${
                      activeGroup === 'preventive'
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Preventive Healthcare
                  </button>
                </div>
              </div>

              {/* Staggered Dynamic Grid render */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {getProductsForActiveGroup().map((prod) => (
                  <motion.div
                    key={prod.id}
                    layoutId={prod.id}
                    className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-lg hover:shadow-xl hover:border-slate-200 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                          {prod.title}
                        </h4>
                        {prod.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 border border-teal-150 text-brand-teal px-2.5 py-0.5 rounded-full shrink-0">
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {prod.description}
                      </p>

                      <ul className="space-y-2 pt-2">
                        {prod.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex gap-2 text-xs text-slate-500 leading-normal">
                            <span className="text-brand-blue font-bold">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-100 mt-6 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block uppercase font-mono text-[9px] tracking-wide">INDICATIVE ENROLLMENT</span>
                        <strong className="text-slate-700 text-sm">
                          {region === 'india' ? prod.pricing?.india : prod.pricing?.international}
                        </strong>
                      </div>
                      <a 
                        href="#product-showcase" 
                        className="text-brand-blue font-extrabold flex items-center gap-1 hover:underline"
                      >
                        Explore Active Demo <span>→</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PRODUCT LIVE FEATURE SHOWCASE WITH SCANNER AND DISPENSARY */}
            <section id="product-showcase" className="py-16 bg-slate-50 border-y border-slate-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {/* Feature Page 1: GDHSC Scanner Live Action Mockup */}
                <div>
                  <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-blue block">
                      PRODUCT HIGH-POLY SHOWCASE
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
                      1. Global Digital Health Smart Card (GDHSC)
                    </h3>
                  </div>
                  <CardScannerDemo />
                </div>

                {/* Feature Page 2: Body Recharge Station Details & Franchise */}
                <div id="body-recharge-section" className="bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden p-6 md:p-10 font-sans">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Visual energy restoration cell graphics */}
                    <div className="lg:col-span-5 order-2 lg:order-1 relative">
                      <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-6 max-w-[340px] mx-auto border border-slate-800">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">AcuGraph Meridians</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                        </div>
                        
                        {/* Simulated computerized biometric chart */}
                        <div className="h-32 flex items-end justify-between gap-1.5 px-2 bg-slate-950 p-2 rounded-xl relative border border-slate-800">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-0"></div>
                          <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-500">VITAL BIO-ENERGY FREQUENCIES</div>
                          <div className="w-1/6 bg-emerald-500 rounded h-14 animate-pulse relative z-10"><span className="absolute -top-4 left-0 text-[8px] font-mono text-emerald-400">LU</span></div>
                          <div className="w-1/6 bg-teal-500 rounded h-24 animate-pulse relative z-10"><span className="absolute -top-4 left-0 text-[8px] font-mono text-teal-400">LI</span></div>
                          <div className="w-1/6 bg-blue-500 rounded h-16 animate-pulse relative z-10"><span className="absolute -top-4 left-0 text-[8px] font-mono text-blue-400">ST</span></div>
                          <div className="w-1/6 bg-indigo-500 rounded h-28 animate-pulse relative z-10"><span className="absolute -top-4 left-0 text-[8px] font-mono text-indigo-400">SP</span></div>
                          <div className="w-1/6 bg-purple-500 rounded h-20 animate-pulse relative z-10"><span className="absolute -top-4 left-0 text-[8px] font-mono text-purple-400">HT</span></div>
                        </div>

                        {/* Interactive stimulation counter */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Restoration Hub Status:</span>
                            <span className="text-emerald-400 font-bold">READY TO STIMULATE</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Collaborating Lab Track:</span>
                            <span className="text-slate-200 font-mono">Paxykop Bio-Research</span>
                          </div>
                        </div>

                        {/* Direct action jump */}
                        <button 
                          onClick={triggerFranchiseJump}
                          className="w-full py-3 px-4 rounded-xl bg-brand-blue hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-tight transition-all cursor-pointer text-center"
                        >
                          Franchise Business Inquiry
                        </button>
                      </div>
                    </div>

                    {/* Explanatory restoration descriptions details column */}
                    <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                      <span className="text-xs font-mono font-bold tracking-wider text-brand-blue uppercase bg-blue-50 py-1 px-3 rounded-full">
                        Non-Invasive Diagnostic Nodes
                      </span>
                      
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                        2. Body Recharge Station (B2S Hub)
                      </h3>

                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        The physical <strong>Body Recharge Stations</strong> enable rapid systemic recovery. Harnessing advanced biophysical screening, patients visualize their electrical skin blockages and receive target bio-charged restoration loops immediately.
                      </p>

                      {/* Therapies List grid item cards */}
                      <div className="space-y-4 text-xs sm:text-sm">
                        <div className="flex gap-3">
                          <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold font-mono">1</span>
                          <div>
                            <p className="font-extrabold text-slate-800 font-heading">AcuGraph Meridian Diagnostics</p>
                            <p className="text-slate-500 text-xs mt-0.5">Computerized, painless skin micro-resistance evaluation charts your systemic meridian blockages in real time.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="h-6 w-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold font-mono">2</span>
                          <div>
                            <p className="font-extrabold text-slate-800 font-heading">Ionic Negative-Ion Foot Detox</p>
                            <p className="text-slate-500 text-xs mt-0.5">Assists systemic release of metallic blockages, uric residues, and cellular free-radicals via targeted hydro-electric ionization baths.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="h-6 w-6 rounded-full bg-brand-accent-100 text-brand-accent flex items-center justify-center font-bold font-mono bg-cyan-100 text-cyan-600">3</span>
                          <div>
                            <p className="font-extrabold text-slate-800 font-heading">PEMF Bio Energy Resonances</p>
                            <p className="text-slate-500 text-xs mt-0.5">Mild frequency current induction targeting cellular mitochondria to facilitate native oxygenation.</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Feature Page 3: App pharmacy module details */}
                <div>
                  <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
                      3. Digital Smart Pharmacy &amp; Companion App
                    </h3>
                  </div>
                  <PrescriptionRefillDemo />
                </div>

              </div>
            </section>

            {/* ABOUT US SECTION AND FOUNDER'S BIOGRAPHY */}
            <section id="about-section" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-2 max-w-2xl mx-auto mb-6">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-blue">
                  Our Legacy &amp; Leadership
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                  About LifeOnPlus
                </h3>
              </div>

              {/* Story mission vision grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow transition-all space-y-3">
                  <h4 className="font-heading font-extrabold text-lg text-slate-900">Our Story</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    LifeOnPlus was conceived inside our collaborative research hubs alongside <strong>Paxykop Technologies</strong> to address systemic trauma delays. We recognized that critical first responders needed immediate access to user records without lockscreen latency, while populations deserved accessible non-invasive preventive restoration platforms.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow transition-all space-y-3">
                  <h4 className="font-heading font-extrabold text-lg text-slate-900">Our Mission</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    To deliver premium, real-time safety nets for patients globally by combining intelligent IoT-connected credentials with responsive ambulatory meshes, ensuring nobody faces a clinic emergency unguided.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow transition-all space-y-3">
                  <h4 className="font-heading font-extrabold text-lg text-slate-900">Our Vision</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    A fully connected hybrid marketplace model where physical emergency squads, local commercial pharmacies, and restoration franchises communicate seamlessly to protect human vitality.
                  </p>
                </div>
              </div>

              {/* Founder quote message card banner */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-blue/90 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-slate-800">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-bold font-heading text-8xl pointer-events-none font-serif">
                  “
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                  <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-extrabold">
                    Featured Founder's Message Quote
                  </h4>
                  
                  <blockquote className="text-lg md:text-xl font-medium leading-relaxed tracking-tight text-slate-200">
                    "Our technology is built to rewire, not just advise. By merging portable EMR access via smart-credential chips with localized Body Recharge stations, LifeOnPlus establishes an affordable safety framework that meets critical moments with dignity and accurate medical validation."
                  </blockquote>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/85">
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center font-black font-heading text-base">
                      RP
                    </div>
                    <div>
                      <p className="font-bold text-slate-100 tracking-tight font-heading">Shri. Rajesh Paxykop</p>
                      <p className="text-xs text-slate-400">Managing Director, LifeOnPlus &amp; Paxykop Technologies research board</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advisory board lists details */}
              <div className="space-y-6 pt-10">
                <h4 className="text-xl font-bold font-heading text-slate-900 text-center tracking-tight">Advisory Board &amp; Expert Team</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {advisoryTeam.map((team, index) => (
                    <div key={index} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow transition-all hover:border-slate-200">
                      <div className="space-y-2">
                        <div className="h-10 w-10 text-xs font-bold rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-heading">
                          {team.initials}
                        </div>
                        <h5 className="font-bold font-heading text-slate-900 mt-2 text-sm sm:text-base leading-tight">{team.name}</h5>
                        <p className="text-xs text-brand-blue font-semibold uppercase">{team.role}</p>
                        <p className="text-[11px] text-slate-500 leading-normal pt-1.5">{team.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* B2B COLLABORATION PARTNER TRACK MODEL INTRO AND INTERACTIVE INPUT INTEGRATION */}
            <section id="b2b-registration-portal" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-slate-100/50 to-white border-y border-slate-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Headers */}
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <span className="text-xs font-mono font-bold tracking-wider text-brand-blue uppercase bg-blue-50 py-1 px-4 rounded-full">
                    Global Business Integration Grid
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 font-heading pt-2">
                    Dynamic B2B Collaborative Models
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Select your appropriate role track below to trigger the intelligent coordinator intake. Build real life-saving frameworks as E-commerce, clinical services, or franchised Nodes.
                  </p>
                </div>

                {/* Self-contained partner portal intake form */}
                <PartnerRegistrationPortal />

              </div>
            </section>

            {/* FAQ ACCORDION PAGE COMPONENT */}
            <section id="faq-section" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              
              {/* Header block with search filter */}
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-teal">
                  Help Center Catalog
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                  Interactive Help &amp; FAQs
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Search or select thematic questions mapped dynamically across general informatics, partner options, and medical record safety triggers.
                </p>

                {/* Instant Search Bar */}
                <div className="pt-4 max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="🔍 Search diagnostic rules, Smart card NFC specs..."
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    className="w-full p-3.5 px-5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white shadow-inner font-sans"
                  />
                </div>
              </div>

              {/* Segment Toggle Badges */}
              <div className="flex flex-wrap justify-center gap-2">
                {(['all', 'general', 'records', 'card', 'partner'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFaqCategory(cat)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-bold font-mono tracking-tight capitalize transition-all cursor-pointer ${
                      selectedFaqCategory === cat
                        ? 'bg-slate-900 text-white border border-slate-950'
                        : 'bg-slate-100 hover:bg-slate-200 hover:text-slate-900 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat === 'records' ? 'Medical Records' : cat === 'partner' ? 'B2B Partner' : cat === 'card' ? 'Smart Card' : cat}
                  </button>
                ))}
              </div>

              {/* Accordions container */}
              <div className="space-y-4 max-w-3xl mx-auto">
                <AnimatePresence>
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => {
                      const isExpanded = expandedFaqs[faq.id];
                      return (
                        <motion.div
                          key={faq.id}
                          layout
                          className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow transition-all"
                        >
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full p-5 text-left flex justify-between items-center gap-4 text-slate-800 hover:text-slate-900 cursor-pointer focus:outline-none"
                          >
                            <span className="font-extrabold font-heading text-sm sm:text-base leading-snug">
                              {faq.question}
                            </span>
                            <span className="p-1 rounded-lg bg-slate-50 text-slate-400 shrink-0">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="border-t border-slate-100 bg-slate-50/50"
                              >
                                <p className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10 font-mono text-slate-400 text-xs">
                      No FAQs matched search constraints. Enter broad criteria like "NFC" or "Franchise".
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </section>

            {/* CONVERSION DRIVES AND DOWNLOAD STORE APP PROMOTIONS BADGES */}
            <section className="bg-brand-blue text-white py-16 p-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Download banner descriptions column */}
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-[10px] tracking-widest font-bold uppercase py-0.5 px-3 rounded-full bg-white/10 text-emerald-400 border border-white/10 inline-block font-mono">
                    Companion Application Launch
                  </span>
                  
                  <h3 className="text-xl sm:text-3xl font-extrabold font-heading tracking-tight leading-tight">
                    Carry Your Global Digital Health Profile Companion on Mobile
                  </h3>

                  <p className="text-slate-300 text-sm max-w-2xl">
                    Scan prescription slips immediately, configure panic trigger fallback coordinates, and visualize diagnostic AcuGraph meridians on the go. Available for safe iOS and Android nodes.
                  </p>
                </div>

                {/* Badges trigger column */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-end">
                  
                  {/* Mock Play store badge */}
                  <a 
                    href="#companion-app-appstore"
                    onClick={(e) => { e.preventDefault(); alert('Redirecting to Google Play Store companion page.'); }}
                    className="bg-slate-900 border border-slate-800 hover:bg-black transition-colors rounded-xl px-5 py-3.5 flex items-center gap-3 w-full sm:w-auto text-left shadow-md cursor-pointer"
                  >
                    <Smartphone className="w-6 h-6 text-brand-accent shrink-0" />
                    <div>
                      <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono">Download Android</span>
                      <strong className="block text-xs text-white font-heading tracking-tight">Google Play Store</strong>
                    </div>
                  </a>

                  {/* Mock Apple Store badge */}
                  <a 
                    href="#companion-app-playstore"
                    onClick={(e) => { e.preventDefault(); alert('Redirecting to Apple App Store companion page.'); }}
                    className="bg-slate-900 border border-slate-800 hover:bg-black transition-colors rounded-xl px-5 py-3.5 flex items-center gap-3 w-full sm:w-auto text-left shadow-md cursor-pointer"
                  >
                    <Smartphone className="w-6 h-6 text-pink-400 shrink-0" />
                    <div>
                      <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono">Download iOS App</span>
                      <strong className="block text-xs text-white font-heading tracking-tight">Apple App Store</strong>
                    </div>
                  </a>

                </div>

              </div>
            </section>

            {/* CONTACT US MESSAGING LEAD INTAKE AND SUPPORT ENDPOINTS */}
            <section id="contact-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left column info */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs font-mono font-bold tracking-wider text-brand-blue uppercase bg-blue-50 py-1 px-3 rounded-full">
                    Support Endpoints
                  </span>
                  
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                    Contact Our Support Hub
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    Have diagnostic hardware questions or corporate employee card requirements? Submit queries directly below. Our clinical board provides support within 12 business hours.
                  </p>

                  <div className="space-y-4 pt-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 rounded bg-slate-100">
                        <Mail className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span className="font-mono">support@lifeonplus.com</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 rounded bg-slate-100">
                        <Phone className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span className="font-mono">+91 (11) 4567 8910 / (UK) +44 20 7946 0192</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 rounded bg-slate-100">
                        <MapPin className="w-4 h-4 text-brand-blue" />
                      </div>
                      <span className="leading-snug">
                        <strong>LifeOnPlus Corp HQ:</strong> Third Floor, Paxykop Tech Campus, Sector 62, New Delhi CR Area
                      </span>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-150 text-amber-800 text-xs leading-normal flex gap-2">
                    <span className="text-base">🚒</span>
                    <p>
                      <strong>Ambulance Crew SOS:</strong> For active road casualties found under unconscious states, leverage our 24/7 priority line directly via diagnostic credentials.
                    </p>
                  </div>
                </div>

                {/* Right column form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-lg">
                  <h4 className="font-bold text-slate-800 text-base font-heading mb-4 pb-2 border-b border-slate-100">
                    Submit Message Query Tag Link
                  </h4>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700 font-heading">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          placeholder="e.g. Amogh Sharma"
                          className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-700 font-heading">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          placeholder="e.g. contact@paxykop.com"
                          className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 font-heading">Inquiry Subject</label>
                      <input
                        type="text"
                        value={contactData.subject}
                        onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                        placeholder="e.g. Global Card Wholesale Order, AcuGraph Franchise"
                        className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 font-heading">Detailed Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        placeholder="Write details of query..."
                        className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none font-sans"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-slate-900 text-white font-extrabold text-xs tracking-tight uppercase cursor-pointer transition-all shadow-md active:scale-98"
                      >
                        SEND SUPPORT MESSAGE
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </section>

          </main>

          {/* DUST INTEGRATED VISUAL TRUST BADGES */}
          <section className="bg-slate-50 border-t border-slate-150 py-8 p-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="text-center md:text-left space-y-1">
                <p className="text-xs font-bold text-slate-800 tracking-tight font-heading">Integrated Clinical Payment Frameworks</p>
                <p className="text-[10px] text-slate-400 font-mono">Secure micro-billing compatible throughout broad localized digital networks.</p>
              </div>

              {/* Trusted payment provider layout */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-400 font-mono">
                <span className="px-3.5 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-500">
                  UPI Pro
                </span>
                <span className="px-3.5 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-500">
                  PhonePe
                </span>
                <span className="px-3.5 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-500">
                  GPay Secure
                </span>
                <span className="px-3.5 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-500 font-sans tracking-tight">
                  VISA / MasterCard
                </span>
              </div>

            </div>
          </section>

          {/* CORE SYSTEM FOUR-COLUMN CLEAN UTILITY FOOTER */}
          <footer className="bg-slate-900 text-slate-300 py-16 p-4 border-t-2 border-slate-950">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
              
              {/* Brand and Description Info block */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-lg">
                    L+
                  </div>
                  <span className="text-lg font-black font-heading text-slate-100 tracking-tight">
                    LifeOnPlus
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  Your One-Stop Digital Healthcare &amp; Wellness Marketplace. Co-developed under the medical research boards of Paxykop Technologies. Affordable, accessible medical telemetry lifeline frameworks.
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  © 2026 LifeOnPlus Technologies Corp. <br />
                  Company Registration Node ID: LOPH-08149394
                </p>
              </div>

              {/* Column 1 Quick Links */}
              <div className="lg:col-span-2 space-y-3">
                <h5 className="text-xs uppercase tracking-widest font-extrabold text-slate-100 font-heading">Ecosystem Links</h5>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><a href="#home-dashboard" className="hover:text-white transition-colors">Emergency Packages</a></li>
                  <li><a href="#product-showcase" className="hover:text-white transition-colors">NFC Card Profile</a></li>
                  <li><a href="#body-recharge-section" className="hover:text-white transition-colors">Recharge Station</a></li>
                  <li><a href="#pharmacy-demo" className="hover:text-white transition-colors">Pharmacy refills</a></li>
                </ul>
              </div>

              {/* Column 2 Partner Track links */}
              <div className="lg:col-span-2 space-y-3">
                <h5 className="text-xs uppercase tracking-widest font-extrabold text-slate-100 font-heading">Partner Program</h5>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><a href="#b2b-registration-portal" className="hover:text-white transition-colors">E-Commerce Vendors</a></li>
                  <li><a href="#b2b-registration-portal" className="hover:text-white transition-colors">Ambulance Service Provider</a></li>
                  <li><a href="#b2b-registration-portal" className="hover:text-white transition-colors">Restorative Franchise</a></li>
                  <li><a href="#b2b-registration-portal" className="hover:text-white transition-colors">Referral Affiliation</a></li>
                </ul>
              </div>

              {/* Column 3 Help & support policies */}
              <div className="lg:col-span-2 space-y-3">
                <h5 className="text-xs uppercase tracking-widest font-extrabold text-slate-100 font-heading">Support</h5>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li><a href="#faq-section" className="hover:text-white transition-colors">FAQs Help Center</a></li>
                  <li><a href="#contact-section" className="hover:text-white transition-colors">Clinical Coordinator</a></li>
                  <li><a href="#about-section" className="hover:text-white transition-colors">Scientific Board</a></li>
                  <li><a href="#about-section" className="hover:text-white transition-colors">Rajesh Paxykop Message</a></li>
                </ul>
              </div>

              {/* Column 4 Corporate addresses info */}
              <div className="lg:col-span-2 space-y-3">
                <h5 className="text-xs uppercase tracking-widest font-extrabold text-slate-100 font-heading">Corporate HQ</h5>
                <address className="text-[11px] text-slate-400 not-italic leading-relaxed">
                  Paxykop Tech Campus,<br />
                  Sector 62, New Delhi CR Area,<br />
                  110062, India<br />
                  <span className="block mt-2 font-mono text-slate-500">TEL: +91 11 4567 8910</span>
                </address>
              </div>

            </div>

            {/* Bottom corporate terms policy bar */}
            <div className="pt-8 border-t border-slate-800 text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#privacy-notice" onClick={(e) => { e.preventDefault(); alert('Displaying Privacy Notice under Medical Safety Act.'); }} className="hover:text-xs hover:text-slate-300">Privacy Notice</a>
                <span>•</span>
                <a href="#service-level" onClick={(e) => { e.preventDefault(); alert('Displaying Service Level Agreement node parameters.'); }} className="hover:text-xs hover:text-slate-300">Service Level Agreement</a>
                <span>•</span>
                <a href="#conduct" onClick={(e) => { e.preventDefault(); alert('Displaying Supplier Code of Conduct.'); }} className="hover:text-xs hover:text-slate-300">Supplier Code of Conduct</a>
                <span>•</span>
                <a href="#accessibility" onClick={(e) => { e.preventDefault(); alert(' HIPAA & Accessibility Statement.'); }} className="hover:text-xs hover:text-slate-300">Accessibility Statement</a>
              </div>
              <p className="font-mono text-[9px] text-slate-600 block">
                Approved by Paxykop Technologies System Quality Control Board 2026.
              </p>
            </div>

          </footer>

        </div>
      )}
    </div>
  );
}
