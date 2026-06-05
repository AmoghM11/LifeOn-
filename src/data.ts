import { ProductItem, B2BTrack, FAQItem, TeamMember } from './types';

export const productsList: ProductItem[] = [
  {
    id: 'gdhsc',
    title: 'Global Digital Health Smart Card (GDHSC)',
    description: 'Equipped with a secure QR code and NFC tap action, this card serves as a portable life insurance of medical records. In an emergency, first-responders access critical information instantly.',
    features: [
      'Panic Button instantly notifies preferred hospitals and emergency contacts with precise live geolocation.',
      'Stores allergy lists, blood groups, pre-existing conditions, and emergency instructions securely.',
      'Up to 30% medical treatment and pharmacy discounts at accredited member clinics and diagnostic nodes.',
      'Fully encrypted cloud backup with immediate contactless synchronization.'
    ],
    badge: 'Flagship Lifeline',
    pricing: {
      india: '₹999 / year',
      international: '$29 / year'
    }
  },
  {
    id: 'ambulance-response',
    title: 'Digital Emergency Ambulance Hub',
    description: 'A responsive automated triage dispatch network connecting your smart card to over 15,000 certified ambulance squads globally.',
    features: [
      'Automatic dispatcher matching within 120 seconds of Panic trigger.',
      'Real-time transit tracker sent via SMS and WhatsApp to family members.',
      'Telemetry feed of vital diagnostics transmitted directly to arriving ER teams.'
    ],
    pricing: {
      india: 'Included with GDHSC',
      international: 'Included with GDHSC'
    }
  },
  {
    id: 'body-recharge',
    title: 'Body Recharge Station (B2S Hub)',
    description: 'Non-invasive, bio-electric recharging stations designed for restorative therapy, cellular cleansing, and energy revitalization.',
    features: [
      'AcuGraph Bio-Electric Screening: Instant computerized visualization of diagnostic meridians.',
      'Ionic Foot Detox: Non-invasive cellular purifications to draw out metallic residues and systemic impurities.',
      'Bio Energy Chamber: Targeted low-frequency resonance therapies to accelerate native oxygen absorption.'
    ],
    badge: 'Wellness Franchise Highlight',
    pricing: {
      india: '₹450 / session',
      international: '$15 / session'
    }
  },
  {
    id: 'medicine-refiller',
    title: 'Smart Pharmacy Medicine Refills',
    description: 'A digital pharmacy module linking custom IoT medicine dispenser boxes directly to the central cloud distribution hubs for effortless repeat order setups.',
    features: [
      '24/7 Prescription Scanning: Upload hand-written notes or digital PDFs for rapid OCR validation.',
      'Smart Auto Refill loops coordinated with accredited retail pharmacies.',
      'Custom dosage vibration reminders via active mobile push companion app.'
    ],
    badge: 'Pure Integration',
    pricing: {
      india: 'Free subscription + medicine cost',
      international: 'Free subscription + medicine cost'
    }
  }
];

export const b2bTracksList: B2BTrack[] = [
  {
    id: 'vendor',
    title: 'E-Commerce Vendors',
    description: 'Enroll as an eligible provider to retail advanced physical or bio-health medical products inside of the comprehensive LifeOnPlus digital marketplace.',
    tagline: 'Expand your reach to millions looking for high-quality certified clinical equipment and wellness boosters.'
  },
  {
    id: 'provider',
    title: 'Service Providers',
    description: 'Connect your private clinics, emergency transport fleets, diagnostic nodes, or testing laboratories to the central LifeOnPlus SOS routing grid.',
    tagline: 'Become a life-saving response node, receive priority ambulance trip alerts, and attract digital-smart physical patients.'
  },
  {
    id: 'franchise',
    title: 'Franchise Operators',
    description: "Secure localized territory rights to establish a branded brick-and-mortar 'Body Recharge Station' equipped with AcuGraph & bio-stimulators.",
    tagline: 'Leverage our proven high-margin turn-key wellness setup, complete equipment bundle supply, and continuous digital bookings stream.'
  },
  {
    id: 'referral',
    title: 'Referral Affiliates',
    description: 'Promote global medical safety by sharing LifeOnPlus Smart Cards with your localized community network, patients, or corporate clients.',
    tagline: 'Earn attractive recurring commissions while contributing to a globally accessible emergency healthcare net.'
  }
];

export const advisoryTeam: TeamMember[] = [
  {
    name: 'Shri. Rajesh Paxykop',
    role: 'Founder & Managing Director',
    bio: 'Pioneered digital emergency systems and non-invasive restorative therapies in collaboration with Paxykop Technologies. Committed to making emergency health accessible at a national and global scale.',
    initials: 'RP',
    tag: 'Founder'
  },
  {
    name: 'Dr. Ananya Iyer',
    role: 'Chief of Medical Advisory Board',
    bio: 'Over 20 years of emergency medicine oversight and trauma division research. Leading medical validation and standards protocols for our digital triaging pipeline.',
    initials: 'AI'
  },
  {
    name: 'Mr. David Vance',
    role: 'VP Corporate Relations (International)',
    bio: 'Oversees network expansion and emergency dispatch partnerships throughout Southeast Asia, the UK, and Europe, scaling our global response logistics.',
    initials: 'DV'
  },
  {
    name: 'Prof. Ramesh Gupta',
    role: 'Lead Wellness Research Consultant',
    bio: 'Academic authority on non-invasive meridian analysis. Advises on clinical bio-electricity models driving the AcuGraph Body Recharge Stations.',
    initials: 'RG'
  }
];

export const faqList: FAQItem[] = [
  {
    id: 'q1',
    question: 'How does the emergency GDHSC Smart Card save lives during critical situations?',
    answer: 'The card has an offline-compatible physical QR code and integrated NFC microchips. If an individual is found unconscious or severely injured, first responders simply scan the QR card using any smartphone. Instantly, all priority medical conditions, blood types, allergen lists, and authorized contacts appear, bypassing lockscreens safely while triggering an SMS location alert to listed relatives.',
    group: 'card'
  },
  {
    id: 'q2',
    question: 'How do the non-invasive Body Recharge therapies (Meridian Detox/AcuGraph) work?',
    answer: 'They rely on non-invasive modern sensors. AcuGraph measures bio-electric skin resistance at specific meridian nodes to compute a localized meridian energetic map. The Ionic foot detox utilizes subtle low-voltage water currents to gently stimulate cellular ion channels and assist waste release, while the Bio Energy chamber uses low-frequency pulsating electro-magnetic fields (PEMF) to stimulate native cellular energy.',
    group: 'general'
  },
  {
    id: 'q3',
    question: 'What happens when I trigger the dynamic Emergency panic button?',
    answer: 'Triggers fired via the card portal or NFC scan initiate an SOS payload. The server calculates your exact coordinate parameters and dispatches a critical priority booking to the nearest available ambulance node. Relatives are automatically updated with tracking credentials.',
    group: 'card'
  },
  {
    id: 'q4',
    question: 'How is medical record privacy maintained on the platform?',
    answer: 'We leverage strict end-to-end industry tokenization. Accessing records requires tapping the physical card or scanning its unique QR. General search queries or standard users cannot look up profiles without physical ownership tags. All communications comply with global health informatics protection policies.',
    group: 'records'
  },
  {
    id: 'q5',
    question: 'What are the criteria to set up a Body Recharge Station franchise?',
    answer: 'You need an absolute physical space of at least 250 Sq. Ft. directly on high-footfall routes or clinics, and an initial investment capacity to support the biometric sensory hardware. Complete training, software integration licenses, and equipment configurations are bundled in our hybrid franchise-onboarding package.',
    group: 'partner'
  },
  {
    id: 'q6',
    question: 'Can organizations distribute the emergency smart cards to employees?',
    answer: 'Yes! E-Commerce partners, Referral affiliates, and Corporate HR groups can order dynamic co-branded card stacks at deep wholesale scales to protect their staff and fulfill global emergency backup mandates seamlessly.',
    group: 'partner'
  }
];
