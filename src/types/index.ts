export interface Clinician {
  id: string;
  name: string;
  role: string;
  specialty: string;
  credentials: string;
  experience: string;
  avatarUrl?: string;
  availableDays: string[];
  rating: number;
  reviewCount: number;
}

export interface ClinicService {
  id: string;
  title: string;
  subtitle: string;
  category: 'doctor' | 'nursing' | 'diagnostics' | 'therapy' | 'palliative' | 'telehealth';
  description: string;
  price: string;
  duration: string;
  features: string[];
  badge?: string;
  iconName: string;
  rapidAvailable: boolean;
}

export interface VitalRecord {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: number;
  oxygenSaturation: number;
  temperature: string;
  bloodGlucose?: string;
  recordedBy: string;
  notes: string;
}

export interface LabResult {
  id: string;
  testName: string;
  category: string;
  date: string;
  orderedBy: string;
  status: 'Normal' | 'Follow-up Needed' | 'Pending';
  sampleType: string;
  summary: string;
  items: {
    parameter: string;
    value: string;
    referenceRange: string;
    flag?: 'normal' | 'high' | 'low';
  }[];
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  datePrescribed: string;
  refillsRemaining: number;
  instructions: string;
  status: 'Active' | 'Completed' | 'Refill Requested';
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  serviceId: string;
  serviceTitle: string;
  serviceCategory: string;
  address: string;
  apartmentOrGate?: string;
  date: string;
  timeSlot: string;
  clinicianId?: string;
  clinicianName?: string;
  notes?: string;
  urgency: 'routine' | 'urgent' | 'emergency-dispatch';
  status: 'Confirmed' | 'Clinician En Route' | 'In Progress' | 'Completed' | 'Cancelled';
  estimatedCost: string;
  createdAt: string;
}

export interface PatientUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodType: string;
  allergies: string[];
  primaryDoctor: string;
}
