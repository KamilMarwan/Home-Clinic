import { Clinician, ClinicService, VitalRecord, LabResult, Prescription, Appointment, PatientUser } from '../types';

export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: 'doctor-home-visit',
    title: 'Specialist Doctor Home Visit',
    subtitle: 'Comprehensive bedside physician evaluation and treatment',
    category: 'doctor',
    description: 'Our board-certified physicians come equipped with full clinical diagnostic tools directly to your residence. Ideal for acute medical concerns, chronic illness flare-ups, and thorough physical examinations.',
    price: '$120 - $180',
    duration: '45 - 60 mins',
    features: [
      'Comprehensive head-to-toe clinical assessment',
      'Bedside diagnostic tests & vital sign monitoring',
      'Electronic prescriptions & medication delivery arrangement',
      'Care plan summary documented in your Patient Portal'
    ],
    badge: 'Most Requested',
    iconName: 'Stethoscope',
    rapidAvailable: true
  },
  {
    id: 'registered-home-nursing',
    title: 'Quality Home Nursing & Wound Care',
    subtitle: 'Dedicated bedside clinical care by licensed registered nurses',
    category: 'nursing',
    description: 'Skilled nursing visits for patients recuperating from surgery or illness, requiring sterile dressing changes, catheter care, post-op monitoring, injectable medications, or daily health assistance.',
    price: '$75 - $110 / visit',
    duration: '60 mins',
    features: [
      'Advanced sterile wound management & dressing change',
      'Vital signs tracking & clinical medication administration',
      'Post-surgical drain & catheter monitoring',
      'Companion care & elder recovery support'
    ],
    iconName: 'HeartPulse',
    rapidAvailable: true
  },
  {
    id: 'mobile-lab-diagnostics',
    title: 'Mobile Laboratory & Blood Draws',
    subtitle: 'At-home sterile phlebotomy and rapid lab testing',
    category: 'diagnostics',
    description: 'No waiting rooms or travel hassle. Our certified phlebotomists collect blood, urine, or swab samples comfortably in your home with rapid turnaround certified lab results sent straight to your portal.',
    price: '$50 + Lab panel',
    duration: '20 - 30 mins',
    features: [
      'Complete blood count (CBC), lipid profile & metabolic panels',
      'HbA1c diabetes monitoring & liver/kidney function tests',
      'Rapid infectious screening & urine analysis',
      'Secure results delivered to your portal within 12 - 24 hours'
    ],
    iconName: 'FlaskConical',
    rapidAvailable: false
  },
  {
    id: 'iv-infusion-therapy',
    title: 'IV Hydration & Wellness Infusions',
    subtitle: 'Physician-supervised intravenous vitamin and hydration therapy',
    category: 'therapy',
    description: 'Custom intravenous formulations for rapid clinical recovery, dehydration, immune reinforcement, fatigue alleviation, and post-illness rejuvenation administered by registered nurses in your home.',
    price: '$140 - $220',
    duration: '45 - 75 mins',
    features: [
      'Myers Cocktail & Immunity Shield formulations',
      'Electrolyte rehydration & migraine relief protocols',
      'Vitamin B12, Glutathione & Vitamin C replenishment',
      'Continuous vital signs monitoring during infusion'
    ],
    badge: 'Popular Wellness',
    iconName: 'Syringe',
    rapidAvailable: true
  },
  {
    id: 'palliative-elder-care',
    title: 'Hospice, Palliative & Elder Home Care',
    subtitle: 'Compassionate, dignified clinical care and comfort management',
    category: 'palliative',
    description: 'Specialized comfort care designed for seniors, individuals with life-limiting illnesses, and deconditioned patients. We prioritize dignity, effective symptom management, pain relief, and family emotional support.',
    price: 'Custom Care Plan',
    duration: 'Scheduled or Daily',
    features: [
      'Multidisciplinary symptom & pain control',
      'Fall prevention assessment & mobility assistance',
      'Caregiver respite guidance & 24/7 clinical hotline support',
      'Holistic physical, emotional & palliative oversight'
    ],
    iconName: 'HandHeart',
    rapidAvailable: true
  },
  {
    id: 'telemedicine-consultation',
    title: 'Telemedicine & Digital Consults',
    subtitle: 'Direct high-definition video consultation with our physicians',
    category: 'telehealth',
    description: 'Connect securely from your phone, tablet, or computer with our board-certified medical doctors for follow-up reviews, lab interpretations, prescription renewals, and non-emergency health concerns.',
    price: '$65 / session',
    duration: '25 mins',
    features: [
      'Encrypted HIPAA-compliant video examination',
      'Instant digital prescriptions sent to your pharmacy',
      'Lab work requisition orders',
      'Same-day scheduling with minimal waiting'
    ],
    iconName: 'Video',
    rapidAvailable: true
  }
];

export const CLINICIANS: Clinician[] = [
  {
    id: 'dr-grace-totoe',
    name: 'Dr. Grace Totoe, MD',
    role: 'Medical Director & Managing Partner',
    specialty: 'Internal Medicine & Hospital Care',
    credentials: 'Board-Certified Internist (14+ yrs experience)',
    experience: 'Credentialed with leading healthcare systems in Minneapolis and Accra. Expert in geriatric medicine, chronic disease management, and in-home acute care.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    rating: 4.98,
    reviewCount: 342
  },
  {
    id: 'dr-marcus-adams',
    name: 'Dr. Marcus Adams, MD',
    role: 'Senior Attending Physician',
    specialty: 'Emergency Medicine & Home Triage',
    credentials: 'MD, Emergency Medicine & Critical Triage',
    experience: 'Over 11 years managing acute care, urgent home assessments, post-discharge transitions, and cardiovascular monitoring.',
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sun'],
    rating: 4.94,
    reviewCount: 218
  },
  {
    id: 'nurse-sarah-jenkins',
    name: 'Sarah Jenkins, BSN, RN',
    role: 'Lead Clinical Nurse Specialist',
    specialty: 'Advanced Wound Care & IV Infusion Therapy',
    credentials: 'Registered Nurse (BSN, WCC, CRNI)',
    experience: 'Specialized in intravenous wellness infusions, complex post-surgical wound dressings, and restorative elder companion care.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    rating: 4.99,
    reviewCount: 410
  },
  {
    id: 'nurse-david-mensah',
    name: 'David Mensah, RN',
    role: 'Palliative & Rehabilitation Nurse',
    specialty: 'Geriatric & Palliative Home Support',
    credentials: 'Certified Hospice & Palliative Care Nurse (CHPN)',
    experience: '8 years providing compassionate comfort care, pain management protocols, and rehabilitation support in private homes.',
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.96,
    reviewCount: 185
  }
];

export const DEMO_PATIENT: PatientUser = {
  id: 'pt-10928',
  fullName: 'Eleanor Vance',
  email: 'eleanor.vance@example.com',
  phone: '+1 (555) 234-8921',
  dob: '1954-08-14',
  address: '742 Evergreen Terrace, Apt 3B, Downtown',
  emergencyContact: {
    name: 'Robert Vance (Son)',
    relationship: 'Son / Primary Proxy',
    phone: '+1 (555) 890-4412'
  },
  bloodType: 'A+',
  allergies: ['Penicillin', 'Sulfa drugs'],
  primaryDoctor: 'Dr. Grace Totoe, MD'
};

export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-7821',
    patientName: 'Eleanor Vance',
    patientPhone: '+1 (555) 234-8921',
    patientEmail: 'eleanor.vance@example.com',
    serviceId: 'registered-home-nursing',
    serviceTitle: 'Quality Home Nursing & Wound Care',
    serviceCategory: 'Nursing',
    address: '742 Evergreen Terrace, Apt 3B',
    apartmentOrGate: 'Gate Code #4491, Ring Bell 3B',
    date: 'Tomorrow, Sep 25, 2026',
    timeSlot: '10:00 AM - 11:00 AM',
    clinicianId: 'nurse-sarah-jenkins',
    clinicianName: 'Sarah Jenkins, BSN, RN',
    notes: 'Weekly sterile dressing change for right lower leg incision. Check healing progress.',
    urgency: 'routine',
    status: 'Confirmed',
    estimatedCost: '$85.00',
    createdAt: '2026-09-23T14:30:00Z'
  },
  {
    id: 'APT-7410',
    patientName: 'Eleanor Vance',
    patientPhone: '+1 (555) 234-8921',
    patientEmail: 'eleanor.vance@example.com',
    serviceId: 'doctor-home-visit',
    serviceTitle: 'Specialist Doctor Home Visit',
    serviceCategory: 'Doctor',
    address: '742 Evergreen Terrace, Apt 3B',
    apartmentOrGate: 'Ring Bell 3B',
    date: 'Sep 18, 2026',
    timeSlot: '02:00 PM - 03:00 PM',
    clinicianId: 'dr-grace-totoe',
    clinicianName: 'Dr. Grace Totoe, MD',
    notes: 'Monthly chronic hypertension evaluation, adjustment of Lisinopril dosage.',
    urgency: 'routine',
    status: 'Completed',
    estimatedCost: '$140.00',
    createdAt: '2026-09-15T09:12:00Z'
  }
];

export const DEMO_VITALS: VitalRecord[] = [
  {
    id: 'vit-01',
    date: 'Sep 18, 2026 (Home Visit)',
    bloodPressure: '126/82 mmHg',
    heartRate: 72,
    oxygenSaturation: 98,
    temperature: '98.4 °F',
    bloodGlucose: '108 mg/dL',
    recordedBy: 'Dr. Grace Totoe, MD',
    notes: 'Blood pressure well controlled after dosage adjustment. Pulse regular.'
  },
  {
    id: 'vit-02',
    date: 'Sep 11, 2026 (Home Nursing)',
    bloodPressure: '134/86 mmHg',
    heartRate: 76,
    oxygenSaturation: 98,
    temperature: '98.6 °F',
    bloodGlucose: '114 mg/dL',
    recordedBy: 'Sarah Jenkins, BSN, RN',
    notes: 'Surgical wound showing clean granulation, no signs of erythema or exudate.'
  },
  {
    id: 'vit-03',
    date: 'Sep 04, 2026 (Home Visit)',
    bloodPressure: '142/90 mmHg',
    heartRate: 80,
    oxygenSaturation: 97,
    temperature: '98.7 °F',
    bloodGlucose: '119 mg/dL',
    recordedBy: 'Dr. Marcus Adams, MD',
    notes: 'Mild hypertension noted following surgical discharge. Hydration reinforced.'
  }
];

export const DEMO_LABS: LabResult[] = [
  {
    id: 'LAB-2026-891',
    testName: 'Comprehensive Metabolic Panel (CMP) + Lipid Panel',
    category: 'Blood Chemistry',
    date: 'Sep 18, 2026',
    orderedBy: 'Dr. Grace Totoe, MD',
    status: 'Normal',
    sampleType: 'Venous Blood Draw (In-Home Phlebotomy)',
    summary: 'Kidney and liver profiles within expected reference targets. Electrolyte balance restored.',
    items: [
      { parameter: 'Fasting Glucose', value: '98 mg/dL', referenceRange: '70 - 99 mg/dL', flag: 'normal' },
      { parameter: 'Blood Urea Nitrogen (BUN)', value: '14 mg/dL', referenceRange: '7 - 20 mg/dL', flag: 'normal' },
      { parameter: 'Creatinine', value: '0.85 mg/dL', referenceRange: '0.6 - 1.1 mg/dL', flag: 'normal' },
      { parameter: 'Potassium', value: '4.2 mmol/L', referenceRange: '3.5 - 5.0 mmol/L', flag: 'normal' },
      { parameter: 'Total Cholesterol', value: '182 mg/dL', referenceRange: '< 200 mg/dL', flag: 'normal' },
      { parameter: 'HDL (Good)', value: '56 mg/dL', referenceRange: '> 50 mg/dL', flag: 'normal' },
      { parameter: 'LDL (Calculated)', value: '106 mg/dL', referenceRange: '< 100 mg/dL', flag: 'normal' }
    ]
  },
  {
    id: 'LAB-2026-640',
    testName: 'Hemoglobin A1c (HbA1c) Glycemic Control',
    category: 'Endocrinology',
    date: 'Aug 22, 2026',
    orderedBy: 'Dr. Grace Totoe, MD',
    status: 'Normal',
    sampleType: 'Capillary Whole Blood',
    summary: 'Glycated hemoglobin reflects excellent 3-month glycemic stability.',
    items: [
      { parameter: 'Hemoglobin A1c', value: '5.6 %', referenceRange: '< 5.7 % (Normal)', flag: 'normal' },
      { parameter: 'Estimated Avg Glucose (eAG)', value: '114 mg/dL', referenceRange: '90 - 120 mg/dL', flag: 'normal' }
    ]
  }
];

export const DEMO_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-401',
    medication: 'Lisinopril 10mg Tablets',
    dosage: '10mg',
    frequency: 'Once daily in the morning with water',
    prescribedBy: 'Dr. Grace Totoe, MD',
    datePrescribed: 'Sep 18, 2026',
    refillsRemaining: 3,
    instructions: 'Monitor sitting blood pressure weekly via Home Clinic portal record.',
    status: 'Active'
  },
  {
    id: 'rx-388',
    medication: 'Silver Sulfadiazine 1% Topical Cream',
    dosage: '1 Tube (50g)',
    frequency: 'Apply thin layer during dressing changes',
    prescribedBy: 'Dr. Marcus Adams, MD',
    datePrescribed: 'Sep 04, 2026',
    refillsRemaining: 1,
    instructions: 'Apply following sterile saline wound irrigation.',
    status: 'Active'
  },
  {
    id: 'rx-290',
    medication: 'Vitamin D3 (Cholecalciferol) 2000 IU',
    dosage: '2000 IU capsule',
    frequency: 'Once daily with meal',
    prescribedBy: 'Dr. Grace Totoe, MD',
    datePrescribed: 'Aug 22, 2026',
    refillsRemaining: 5,
    instructions: 'Bone health maintenance.',
    status: 'Active'
  }
];
