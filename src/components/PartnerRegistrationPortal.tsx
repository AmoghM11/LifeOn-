import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Building, Truck, ShieldAlert, Award, Star, ArrowRight, ClipboardCheck, Sparkles } from 'lucide-react';
import { b2bTracksList } from '../data';

export default function PartnerRegistrationPortal() {
  const [selectedTrack, setSelectedTrack] = useState<'vendor' | 'provider' | 'franchise' | 'referral'>('vendor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form states mapping
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    taxId: '',
    specialization: '',
    estimatedCapacity: '100-500 patients/month',
    regionOfInterest: '',
    website: '',
    investmentCapacity: '₹10,50,000 - ₹20,00,000',
    availableSpace: '',
    regionalReach: '',
    acknowledgedTerms: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const trackKeys = b2bTracksList.map(t => t.id);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const targetErrors: Record<string, string> = {};
    if (!formData.contactPerson.trim()) targetErrors.contactPerson = 'Primary Contact Name is required.';
    if (!formData.contactEmail.includes('@')) targetErrors.contactEmail = 'Provide a valid business email.';
    if (!formData.contactPhone.trim()) targetErrors.contactPhone = 'Business contact number is required.';

    if (selectedTrack === 'vendor') {
      if (!formData.companyName.trim()) targetErrors.companyName = 'Vendor Company Name is required.';
      if (!formData.website.trim()) targetErrors.website = 'Active retail website is required.';
    } else if (selectedTrack === 'provider') {
      if (!formData.companyName.trim()) targetErrors.companyName = 'Clinical/Fleet Facility Name is required.';
      if (!formData.specialization.trim()) targetErrors.specialization = 'Please choose service specialization.';
    } else if (selectedTrack === 'franchise') {
      if (!formData.regionOfInterest.trim()) targetErrors.regionOfInterest = 'Specify city or town of interest.';
      if (!formData.availableSpace.trim()) targetErrors.availableSpace = 'Specify square footage.';
    } else if (selectedTrack === 'referral') {
      if (!formData.regionalReach.trim()) targetErrors.regionalReach = 'Provide geographic reach details.';
    }

    setErrors(targetErrors);
    return Object.keys(targetErrors).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      taxId: '',
      specialization: '',
      estimatedCapacity: '100-500 patients/month',
      regionOfInterest: '',
      website: '',
      investmentCapacity: '₹10,50,000 - ₹20,00,000',
      availableSpace: '',
      regionalReach: '',
      acknowledgedTerms: true
    });
    setErrors({});
    setIsCompleted(false);
  };

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'vendor': return <Building className="w-5 h-5 text-blue-600" />;
      case 'provider': return <Truck className="w-5 h-5 text-emerald-600" />;
      case 'franchise': return <Award className="w-5 h-5 text-amber-600" />;
      case 'referral': return <Star className="w-5 h-5 text-indigo-600" />;
      default: return <ClipboardCheck className="w-5 h-5" />;
    }
  };

  return (
    <div id="partner-portal" className="font-sans">
      {/* Track selection blocks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {b2bTracksList.map((track) => {
          const isSelected = selectedTrack === track.id;
          return (
            <motion.div
              key={track.id}
              onClick={() => {
                if (!isCompleted) {
                  setSelectedTrack(track.id);
                  setErrors({});
                }
              }}
              whileHover={{ scale: isCompleted ? 1 : 1.02 }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'border-brand-blue bg-blue-50/20 shadow-lg shadow-blue-100' 
                  : 'border-slate-150 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className={`p-2 rounded-xl ${
                    isSelected ? 'bg-brand-blue/10 text-brand-blue' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {getTrackIcon(track.id)}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-blue bg-blue-50 py-0.5 px-2 rounded-full border border-blue-150">
                      Chosen Track
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-800 text-base font-heading mb-1">{track.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{track.description}</p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span className="truncate">{track.id === selectedTrack ? 'Editing Intake Form' : 'Select Track'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic forms panel cards */}
      <div className="bg-white rounded-3xl border border-slate-150 shadow-xl overflow-hidden p-6 md:p-10">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.form
              key="form-entry"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              onSubmit={handleFormSubmit}
              className="space-y-6"
            >
              {/* Form Track Title Bar */}
              <div className="pb-4 border-b border-slate-100">
                <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand-blue">
                  B2B Onboarding Grid / Track: {selectedTrack.toUpperCase()}
                </p>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900 mt-1 font-heading">
                  {b2bTracksList.find(t => t.id === selectedTrack)?.tagline}
                </h3>
              </div>

              {/* Input Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Standard fields across all tracks */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700 font-heading">Primary Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder="e.g. Amogh Sharma"
                    className={`p-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-1 ${
                      errors.contactPerson ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 focus:ring-brand-blue'
                    }`}
                  />
                  {errors.contactPerson && <span className="text-[10px] font-mono text-red-500">{errors.contactPerson}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700 font-heading">Business E-mail Address *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. partner@paxykop.com"
                    className={`p-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-1 ${
                      errors.contactEmail ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 focus:ring-brand-blue'
                    }`}
                  />
                  {errors.contactEmail && <span className="text-[10px] font-mono text-red-500">{errors.contactEmail}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-700 font-heading">Business Telephone *</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 00000"
                    className={`p-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-1 ${
                      errors.contactPhone ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 focus:ring-brand-blue'
                    }`}
                  />
                  {errors.contactPhone && <span className="text-[10px] font-mono text-red-500">{errors.contactPhone}</span>}
                </div>

                {/* DYNAMIC TRACK-SPECIFIC CONTROLS */}
                
                {/* 1) Vendor-associated dynamic views */}
                {selectedTrack === 'vendor' && (
                  <>
                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">E-Commerce Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Paxykop Medical Supplies"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.companyName ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.companyName && <span className="text-[10px] font-mono text-red-500">{errors.companyName}</span>}
                    </div>

                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Product Retail Website *</label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="e.g. www.paxykop.com"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.website ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.website && <span className="text-[10px] font-mono text-red-500">{errors.website}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 font-heading">Tax ID / GST Details</label>
                      <input
                        type="text"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        placeholder="e.g. GSTIN99234A12B"
                        className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* 2) Service Providers dynamic views */}
                {selectedTrack === 'provider' && (
                  <>
                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Clinic / Laboratory Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. LifeCare Diagnostic Center"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.companyName ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.companyName && <span className="text-[10px] font-mono text-red-500">{errors.companyName}</span>}
                    </div>

                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Specialization / Facility Track *</label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="e.g. Critical Trauma Ambulance Support, Path Lab, MRI Centre"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.specialization ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.specialization && <span className="text-[10px] font-mono text-red-500">{errors.specialization}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 font-heading">Estimated Monthly Patient Capacity</label>
                      <select
                        name="estimatedCapacity"
                        value={formData.estimatedCapacity}
                        onChange={handleInputChange}
                        className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none bg-white"
                      >
                        <option value="Under 100 patient/m">Under 100 patient/month</option>
                        <option value="100-500 patients/month">100-500 patients/month</option>
                        <option value="500-2,000 patients/month">500-2,000 patients/month</option>
                        <option value="Over 2,000 patients/month">Over 2,000 patients/month</option>
                      </select>
                    </div>
                  </>
                )}

                {/* 3) Franchise operator dynamic views */}
                {selectedTrack === 'franchise' && (
                  <>
                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Target City of Interest *</label>
                      <input
                        type="text"
                        name="regionOfInterest"
                        value={formData.regionOfInterest}
                        onChange={handleInputChange}
                        placeholder="e.g. New Delhi / London Cluster"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.regionOfInterest ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.regionOfInterest && <span className="text-[10px] font-mono text-red-500">{errors.regionOfInterest}</span>}
                    </div>

                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Space Availability (Sq. Ft.) *</label>
                      <input
                        type="text"
                        name="availableSpace"
                        value={formData.availableSpace}
                        onChange={handleInputChange}
                        placeholder="e.g. 350 Sq. Ft. Commercial Space Available"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.availableSpace ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.availableSpace && <span className="text-[10px] font-mono text-red-500">{errors.availableSpace}</span>}
                    </div>

                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Franchise Investment Capacity</label>
                      <select
                        name="investmentCapacity"
                        value={formData.investmentCapacity}
                        onChange={handleInputChange}
                        className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none bg-white font-mono"
                      >
                        <option value="Under ₹5,000,000">Under ₹500,000</option>
                        <option value="₹5,00,000 - ₹10,00,000">₹500,000 - ₹1,000,000</option>
                        <option value="₹10,50,000 - ₹20,00,000">₹1,000,000 - ₹2,000,000</option>
                        <option value="Over ₹20,00,000">Over ₹2,000,000 (Multi-Hub Tier)</option>
                      </select>
                    </div>
                  </>
                )}

                {/* 4) Referral Affiliates dynamic views */}
                {selectedTrack === 'referral' && (
                  <>
                    <div className="flex flex-col gap-1 animate-fadeIn">
                      <label className="text-xs font-bold text-slate-700 font-heading">Primary Geographic Reach / Domain *</label>
                      <input
                        type="text"
                        name="regionalReach"
                        value={formData.regionalReach}
                        onChange={handleInputChange}
                        placeholder="e.g. Community Clinics in Bangalore, Corporate Wellness Networks"
                        className={`p-3 rounded-lg border text-sm transition-all focus:outline-none ${
                          errors.regionalReach ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.regionalReach && <span className="text-[10px] font-mono text-red-500">{errors.regionalReach}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-slate-700 font-heading">Target Marketing Approach</label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="e.g. Email Newsletters, Patient Consultations, Offline Fairs"
                        className="p-3 rounded-lg border border-slate-200 text-sm focus:outline-none"
                      />
                    </div>
                  </>
                )}

              </div>

              {/* Form submit logic and submission confirmation */}
              <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 max-w-sm">
                  By clicking Submit, your profile gets tokenized and queued into Paxykop Technologies research board matching systems securely.
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto py-3.5 px-8 rounded-xl bg-brand-blue hover:bg-slate-900 text-white font-extrabold text-sm tracking-tight cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Processing Intake...
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="w-4 h-4" />
                      SUBMIT b2b PARTNER INTAKE
                    </>
                  )}
                </motion.button>
              </div>

            </motion.form>
          ) : (
            <motion.div
              key="form-completion"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 px-4 text-center max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight mb-2">
                Onboarding Initiated!
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Excellent! The intake record has been indexed as a valid <strong>{selectedTrack.toUpperCase()}</strong> under local ticket payload. Shri. Rajesh Paxykop and our regional directors will reach out manually inside 24 business hours.
              </p>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-left font-mono text-xs text-slate-500 mb-6 space-y-1">
                <p><span className="font-bold text-slate-700">Client Code:</span> LOP-B2B-{Math.floor(1000 + Math.random() * 9000)}-PX</p>
                <p><span className="font-bold text-slate-700">Listed Contact:</span> {formData.contactPerson}</p>
                <p><span className="font-bold text-slate-700">Intake Status:</span> Assigned to Lead Dispatch Coordinator</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={resetForm}
                className="py-2.5 px-6 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold tracking-tight cursor-pointer"
              >
                Register Another Node/Track
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
