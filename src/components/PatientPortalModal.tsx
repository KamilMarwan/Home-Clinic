import React, { useState } from 'react';
import { 
  PatientUser, 
  Appointment, 
  VitalRecord, 
  LabResult, 
  Prescription 
} from '../types';
import { 
  DEMO_PATIENT, 
  DEMO_APPOINTMENTS, 
  DEMO_VITALS, 
  DEMO_LABS, 
  DEMO_PRESCRIPTIONS 
} from '../data/mockData';
import { 
  X, 
  User, 
  Calendar, 
  Activity, 
  FileText, 
  Pill, 
  LogOut, 
  CheckCircle, 
  Clock, 
  Download, 
  Send, 
  PlusCircle, 
  AlertCircle, 
  Phone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: PatientUser | null;
  onLogin: (user: PatientUser) => void;
  onLogout: () => void;
  appointments: Appointment[];
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  appointments,
  onOpenBooking
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState<string>('eleanor.vance@example.com');
  const [passwordInput, setPasswordInput] = useState<string>('••••••••');
  const [regName, setRegName] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regAddress, setRegAddress] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'vitals' | 'labs' | 'prescriptions' | 'messages'>('overview');

  // Interactive vitals recording
  const [vitalsList, setVitalsList] = useState<VitalRecord[]>(DEMO_VITALS);
  const [showVitalForm, setShowVitalForm] = useState(false);
  const [newBP, setNewBP] = useState('122/80');
  const [newHR, setNewHR] = useState('72');
  const [newSpO2, setNewSpO2] = useState('99');
  const [newGlucose, setNewGlucose] = useState('102');

  // Interactive prescriptions
  const [prescriptionsList, setPrescriptionsList] = useState<Prescription[]>(DEMO_PRESCRIPTIONS);
  const [refillSuccessMsg, setRefillSuccessMsg] = useState<string | null>(null);
  const [labDownloadMsg, setLabDownloadMsg] = useState<string | null>(null);

  // Interactive messages
  const [chatMessages, setChatMessages] = useState<{ sender: 'patient' | 'doctor'; text: string; time: string }[]>([
    { sender: 'doctor', text: 'Hello Eleanor, Dr. Grace Totoe here. Your recent metabolic lab panel looks great. Please keep taking the Lisinopril in the mornings.', time: 'Sep 19, 09:15 AM' },
    { sender: 'patient', text: 'Thank you doctor! The visiting nurse changed the dressing yesterday and the incision is healing without pain.', time: 'Sep 19, 11:30 AM' }
  ]);
  const [messageInput, setMessageInput] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(DEMO_PATIENT);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: PatientUser = {
      id: `pt-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: regName || 'Valued Patient',
      email: emailInput,
      phone: regPhone || '+1 (555) 000-1122',
      dob: '1980-01-01',
      address: regAddress || 'Accra Residential Area',
      emergencyContact: {
        name: 'Emergency Contact',
        relationship: 'Family Member',
        phone: '+1 (555) 000-3344'
      },
      bloodType: 'O+',
      allergies: ['None recorded'],
      primaryDoctor: 'Dr. Grace Totoe, MD'
    };
    onLogin(newUser);
  };

  const handleQuickDemoLogin = () => {
    onLogin(DEMO_PATIENT);
  };

  const handleAddVital = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: VitalRecord = {
      id: `vit-${Date.now()}`,
      date: 'Today (Patient Recorded)',
      bloodPressure: `${newBP} mmHg`,
      heartRate: Number(newHR) || 72,
      oxygenSaturation: Number(newSpO2) || 98,
      temperature: '98.6 °F',
      bloodGlucose: newGlucose ? `${newGlucose} mg/dL` : undefined,
      recordedBy: 'Self / Home Monitor',
      notes: 'Logged directly via 1st Response Patient Portal.'
    };
    setVitalsList([newRecord, ...vitalsList]);
    setShowVitalForm(false);
  };

  const handleRequestRefill = (id: string, name: string) => {
    setPrescriptionsList(prev => prev.map(p => p.id === id ? { ...p, status: 'Refill Requested' } : p));
    setRefillSuccessMsg(`Refill dispatched for ${name}! In-home delivery will arrive within 24 hours.`);
    setTimeout(() => setRefillSuccessMsg(null), 5000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const newMsg = {
      sender: 'patient' as const,
      text: messageInput.trim(),
      time: 'Just now'
    };
    setChatMessages([...chatMessages, newMsg]);
    setMessageInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo variant="emblem" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-wide">
                  Patient Health Portal
                </span>
                <span className="text-[10px] bg-red-600/80 font-mono px-2 py-0.5 rounded text-white font-bold uppercase">
                  Secure Access
                </span>
              </div>
              <p className="text-xs text-slate-400">
                1st Response Home Clinic Limited · Digital Health & Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area: When NOT logged in -> Login/Register screen */}
        {!currentUser ? (
          <div className="p-6 sm:p-10 overflow-y-auto">
            <div className="max-w-md mx-auto">
              
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#b91c1c] flex items-center justify-center mx-auto mb-3 border border-red-100 shadow-xs">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {authMode === 'login' ? 'Patient Portal Sign In' : 'Register New Patient Account'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Access your in-home doctor visit history, lab test results, vital signs, and prescription refills.
                </p>
              </div>

              {/* Demo 1-Click Fast Access Banner */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50 via-rose-50 to-orange-50 border border-red-200/90 text-left">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">
                    Instant Demo Login
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    Preloaded Records
                  </span>
                </div>
                <p className="text-xs text-slate-700 mb-3">
                  Sign in immediately as <strong>Eleanor Vance</strong> (Hypertension & Post-Op Home Wound Care) to explore full features.
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3.5 rounded-lg bg-[#b91c1c] hover:bg-[#a01616] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In as Demo Patient (Eleanor Vance)</span>
                </button>
              </div>

              {/* Login/Register Form */}
              <form onSubmit={authMode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        placeholder="e.g. +1 (555) 234-8921"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <span className="text-xs text-[#b91c1c] cursor-pointer hover:underline">
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                  />
                </div>

                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Residential Home Address
                    </label>
                    <input
                      type="text"
                      required
                      value={regAddress}
                      onChange={e => setRegAddress(e.target.value)}
                      placeholder="Street, City, Postal Code"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors mt-2"
                >
                  {authMode === 'login' ? 'Sign In to Portal' : 'Create Patient Account'}
                </button>

                <div className="text-center pt-2">
                  {authMode === 'login' ? (
                    <p className="text-xs text-slate-600">
                      New to 1st Response Home Clinic?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('register')}
                        className="font-bold text-[#b91c1c] hover:underline"
                      >
                        Register an account
                      </button>
                    </p>
                  ) : (
                    <p className="text-xs text-slate-600">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="font-bold text-[#b91c1c] hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </form>

            </div>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Patient Info Bar */}
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#b91c1c] text-white flex items-center justify-center font-bold text-sm">
                  {currentUser.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{currentUser.fullName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Blood: {currentUser.bloodType}</span>
                    <span aria-hidden="true">·</span>
                    <span>Doctor: {currentUser.primaryDoctor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#b91c1c] hover:bg-[#a11616] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Home Visit</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-slate-200 bg-white flex gap-1 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
                { id: 'appointments', label: `Visits (${appointments.length})`, icon: <Calendar className="w-4 h-4" /> },
                { id: 'vitals', label: 'Vital Records', icon: <Activity className="w-4 h-4" /> },
                { id: 'labs', label: 'Lab Reports', icon: <FileText className="w-4 h-4" /> },
                { id: 'prescriptions', label: 'Prescriptions', icon: <Pill className="w-4 h-4" /> },
                { id: 'messages', label: 'Care Team Chat', icon: <Send className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#b91c1c] text-[#b91c1c]'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Next upcoming appointment banner */}
                  {appointments.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider">
                          Next Confirmed In-Home Visit
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {appointments[0].status}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{appointments[0].serviceTitle}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Assigned Clinician: <strong>{appointments[0].clinicianName}</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            📍 {appointments[0].address}
                          </p>
                        </div>
                        <div className="text-left sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-100 sm:bg-transparent sm:border-0 sm:p-0">
                          <div className="text-sm font-bold text-slate-900">{appointments[0].date}</div>
                          <div className="text-xs text-[#b91c1c] font-semibold">{appointments[0].timeSlot}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary Metric Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs text-slate-500 block">Latest Blood Pressure</span>
                      <div className="text-xl font-black text-slate-900 mt-1">{vitalsList[0]?.bloodPressure || '120/80'}</div>
                      <span className="text-[11px] text-emerald-600 font-medium">Within Target Range</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs text-slate-500 block">Active Prescriptions</span>
                      <div className="text-xl font-black text-slate-900 mt-1">{prescriptionsList.length} Medications</div>
                      <span className="text-[11px] text-slate-500 font-medium">All Refills Available</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs text-slate-500 block">Recent Lab Test</span>
                      <div className="text-xl font-black text-slate-900 mt-1">{DEMO_LABS[0]?.status || 'Normal'}</div>
                      <span className="text-[11px] text-slate-500 font-medium">{DEMO_LABS[0]?.date}</span>
                    </div>
                  </div>

                  {/* Quick actions row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('vitals')}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-left flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">Record Today's Home Vitals</h5>
                        <p className="text-xs text-slate-500">Log blood pressure, pulse, or blood sugar</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                    </button>

                    <button
                      onClick={() => setActiveTab('prescriptions')}
                      className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-left flex items-center justify-between group transition-all"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">Order Medication Refill Delivery</h5>
                        <p className="text-xs text-slate-500">Delivered directly to your residence</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900">In-Home Medical Visits</h4>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="text-xs font-bold text-[#b91c1c] hover:underline flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Book Another Visit</span>
                    </button>
                  </div>

                  {appointments.map(apt => (
                    <div key={apt.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-500">{apt.id}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          apt.status === 'Completed'
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <div className="text-sm font-bold text-slate-900">{apt.serviceTitle}</div>
                          <div className="text-xs text-slate-500">Clinician: {apt.clinicianName}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xs font-bold text-slate-800">{apt.date}</div>
                          <div className="text-xs text-[#b91c1c] font-semibold">{apt.timeSlot}</div>
                          {apt.estimatedCost && (
                            <div className="text-[11px] font-bold text-slate-700 mt-0.5">
                              Fee: {apt.estimatedCost}
                            </div>
                          )}
                        </div>
                      </div>
                      {apt.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <strong>Clinical Notes:</strong> {apt.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: VITALS */}
              {activeTab === 'vitals' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Clinical Vital Signs Log</h4>
                      <p className="text-xs text-slate-500">Recorded during in-home visits and patient self-checks</p>
                    </div>
                    <button
                      onClick={() => setShowVitalForm(!showVitalForm)}
                      className="px-3 py-1.5 rounded-lg bg-[#b91c1c] text-white text-xs font-bold hover:bg-[#a11616] flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{showVitalForm ? 'Cancel' : 'Log New Reading'}</span>
                    </button>
                  </div>

                  {/* New vital entry form */}
                  {showVitalForm && (
                    <form onSubmit={handleAddVital} className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-3">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Record Today's Reading
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Blood Pressure (mmHg)</label>
                          <input
                            type="text"
                            value={newBP}
                            onChange={e => setNewBP(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                            placeholder="120/80"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Heart Rate (BPM)</label>
                          <input
                            type="number"
                            value={newHR}
                            onChange={e => setNewHR(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                            placeholder="72"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Oxygen SpO2 (%)</label>
                          <input
                            type="number"
                            value={newSpO2}
                            onChange={e => setNewSpO2(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                            placeholder="98"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Glucose (mg/dL)</label>
                          <input
                            type="number"
                            value={newGlucose}
                            onChange={e => setNewGlucose(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                      >
                        Save Reading to Chart
                      </button>
                    </form>
                  )}

                  <div className="space-y-3">
                    {vitalsList.map(v => (
                      <div key={v.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{v.date}</span>
                          <span className="text-slate-500">Logged by: {v.recordedBy}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-400 block">BP:</span>
                            <span className="font-bold text-slate-900">{v.bloodPressure}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Pulse:</span>
                            <span className="font-bold text-slate-900">{v.heartRate} bpm</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Oxygen:</span>
                            <span className="font-bold text-slate-900">{v.oxygenSaturation}%</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Glucose:</span>
                            <span className="font-bold text-slate-900">{v.bloodGlucose || 'N/A'}</span>
                          </div>
                        </div>
                        {v.notes && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-1">
                            {v.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: LABS */}
              {activeTab === 'labs' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">In-Home Mobile Laboratory Reports</h4>
                    <p className="text-xs text-slate-500">Certified point-of-care specimen analysis</p>
                  </div>

                  {labDownloadMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{labDownloadMsg}</span>
                    </div>
                  )}

                  {DEMO_LABS.map(lab => (
                    <div key={lab.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#b91c1c]">{lab.id}</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                              {lab.status}
                            </span>
                          </div>
                          <h5 className="text-base font-bold text-slate-900 mt-1">{lab.testName}</h5>
                          <p className="text-xs text-slate-500">Sample: {lab.sampleType} · Ordered by: {lab.orderedBy}</p>
                        </div>
                        <button
                          onClick={() => {
                            setLabDownloadMsg(`Certified Lab Report ${lab.id} downloaded successfully.`);
                            setTimeout(() => setLabDownloadMsg(null), 4000);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 self-start sm:self-auto"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-400 font-medium">
                              <th className="pb-2">Biomarker</th>
                              <th className="pb-2">Result</th>
                              <th className="pb-2">Reference Target</th>
                              <th className="pb-2 text-right">Interpretation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                            {lab.items.map((it, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="py-2 font-sans font-medium text-slate-800">{it.parameter}</td>
                                <td className="py-2 font-bold text-slate-900">{it.value}</td>
                                <td className="py-2 text-slate-500">{it.referenceRange}</td>
                                <td className="py-2 text-right font-sans">
                                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                                    Normal
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <strong>Physician Summary:</strong> {lab.summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: PRESCRIPTIONS */}
              {activeTab === 'prescriptions' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Active Prescriptions & In-Home Delivery</h4>
                    <p className="text-xs text-slate-500">Order refill delivery directly to your home address</p>
                  </div>

                  {refillSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{refillSuccessMsg}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {prescriptionsList.map(rx => (
                      <div key={rx.id} className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{rx.medication}</span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              rx.status === 'Refill Requested'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {rx.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">
                            <strong>Dosage:</strong> {rx.dosage} · {rx.frequency}
                          </p>
                          <p className="text-xs text-slate-500">
                            Prescribed by {rx.prescribedBy} on {rx.datePrescribed} · {rx.refillsRemaining} refills remaining
                          </p>
                        </div>

                        <button
                          disabled={rx.status === 'Refill Requested'}
                          onClick={() => handleRequestRefill(rx.id, rx.medication)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                            rx.status === 'Refill Requested'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-[#b91c1c] text-white hover:bg-[#a11616]'
                          }`}
                        >
                          {rx.status === 'Refill Requested' ? 'Delivery En Route' : 'Request Home Delivery'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="flex flex-col h-[380px] bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Clinical Message Channel · Dr. Grace Totoe & Visiting Nurses</span>
                    <span className="text-emerald-700 flex items-center gap-1 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      Active Clinic Hours
                    </span>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md px-3.5 py-2.5 rounded-2xl text-xs ${
                            msg.sender === 'patient'
                              ? 'bg-[#b91c1c] text-white rounded-br-xs'
                              : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex gap-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      placeholder="Type a clinical question to your assigned doctor or nurse..."
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#b91c1c] hover:bg-[#a11616] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
