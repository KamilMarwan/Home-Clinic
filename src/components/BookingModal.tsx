import React, { useState } from 'react';
import { CLINIC_SERVICES, CLINICIANS } from '../data/mockData';
import { Appointment } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedClinicianId?: string;
  onBookingSuccess: (newAppointment: Appointment) => void;
  onOpenPortal: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedClinicianId,
  onBookingSuccess,
  onOpenPortal
}) => {
  const [step, setStep] = useState<number>(1);
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'doctor-home-visit');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'emergency-dispatch'>('routine');
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 11:30 AM');
  const [clinicianId, setClinicianId] = useState<string>(preselectedClinicianId || 'any');

  // Patient inputs
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [apartmentOrGate, setApartmentOrGate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const selectedService = CLINIC_SERVICES.find(s => s.id === serviceId) || CLINIC_SERVICES[0];
  const selectedClinician = CLINICIANS.find(c => c.id === clinicianId);

  const timeSlots = [
    '08:30 AM - 10:00 AM',
    '10:00 AM - 11:30 AM',
    '11:30 AM - 01:00 PM',
    '02:00 PM - 03:30 PM',
    '03:30 PM - 05:00 PM',
    '05:30 PM - 07:00 PM'
  ];

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full patient name is required';
    if (!phone.trim()) errs.phone = 'Contact phone number is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required for confirmation';
    if (!address.trim()) errs.address = 'Home address is required for clinician dispatch';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 2) {
      if (!validateStep2()) return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      setStep(2);
      return;
    }

    const bookingId = `1ST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      id: bookingId,
      patientName: fullName,
      patientPhone: phone,
      patientEmail: email,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      serviceCategory: selectedService.category,
      address,
      apartmentOrGate,
      date: urgency === 'emergency-dispatch' ? 'Today (Urgent Dispatch)' : date,
      timeSlot: urgency === 'emergency-dispatch' ? 'Within 45-60 Mins' : timeSlot,
      clinicianId: clinicianId !== 'any' ? clinicianId : undefined,
      clinicianName: clinicianId !== 'any' && selectedClinician ? selectedClinician.name : 'First Available Assigned Clinician',
      notes,
      urgency,
      status: urgency === 'emergency-dispatch' ? 'Clinician En Route' : 'Confirmed',
      estimatedCost: selectedService.price,
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newAppointment);
    onBookingSuccess(newAppointment);
    setStep(4); // Success step
  };

  const resetForm = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo variant="emblem" size="sm" />
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {step === 4 ? 'Appointment Dispatched' : 'Book In-Home Medical Visit'}
              </h3>
              <p className="text-xs text-slate-500">
                1st Response Home Clinic · Accredited Mobile Care
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator (only steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-slate-100/70 border-b border-slate-200/80 flex items-center justify-between text-xs">
            <span className={`font-semibold ${step >= 1 ? 'text-[#b91c1c]' : 'text-slate-400'}`}>
              1. Service & Urgency
            </span>
            <span className="text-slate-300">→</span>
            <span className={`font-semibold ${step >= 2 ? 'text-[#b91c1c]' : 'text-slate-400'}`}>
              2. Patient & Location
            </span>
            <span className="text-slate-300">→</span>
            <span className={`font-semibold ${step >= 3 ? 'text-[#b91c1c]' : 'text-slate-400'}`}>
              3. Review & Confirm
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Select Service, Urgency & Date */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Urgency selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Timing & Dispatch Speed
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setUrgency('routine')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      urgency === 'routine'
                        ? 'border-[#b91c1c] bg-red-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-bold text-slate-900">Scheduled Visit</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Pick a specific day & convenient arrival time window.
                    </p>
                  </div>

                  <div
                    onClick={() => setUrgency('emergency-dispatch')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      urgency === 'emergency-dispatch'
                        ? 'border-[#b91c1c] bg-red-50/40 shadow-xs ring-1 ring-red-200'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[#b91c1c]">
                      <Zap className="w-4 h-4 fill-red-500 text-red-500" />
                      <span className="text-sm font-bold text-[#b91c1c]">Urgent Home Dispatch</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Priority triage dispatch to arrive within 45-60 minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Clinical Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CLINIC_SERVICES.map(svc => (
                    <div
                      key={svc.id}
                      onClick={() => setServiceId(svc.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        serviceId === svc.id
                          ? 'border-[#b91c1c] bg-red-50/30 shadow-xs ring-1 ring-red-200'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">{svc.title}</span>
                          <span className="text-xs font-extrabold text-[#b91c1c]">{svc.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{svc.subtitle}</p>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{svc.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time (if scheduled) */}
              {urgency === 'routine' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Arrival Window
                    </label>
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                    >
                      {timeSlots.map(ts => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Preferred Clinician */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Clinician
                </label>
                <select
                  value={clinicianId}
                  onChange={e => setClinicianId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                >
                  <option value="any">First Available On-Duty Clinician (Fastest)</option>
                  {CLINICIANS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.role}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          )}

          {/* STEP 2: Patient and Location Details */}
          {step === 2 && (
            <div className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number (for arrival call) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-8921"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address (for portal access & receipts) *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. eleanor.vance@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Home / Residence Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace, Downtown"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Apartment, Suite, or Gate Entry Code
                </label>
                <input
                  type="text"
                  value={apartmentOrGate}
                  onChange={e => setApartmentOrGate(e.target.value)}
                  placeholder="e.g. Apt 3B, Gate Code #4491, Ring Buzzer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Symptoms, Medical Background or Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Briefly mention primary symptoms, allergies, or medication requests..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c]"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your residential data is encrypted and only shared with your assigned clinical unit.</span>
              </div>

            </div>
          )}

          {/* STEP 3: Review & Final Confirmation */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Summary of Requested Care
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{selectedService.title}</h4>
                    <p className="text-xs text-slate-500">{selectedService.subtitle}</p>
                  </div>
                  <span className="text-base font-extrabold text-[#b91c1c]">{selectedService.price}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Dispatch Speed:</span>
                    <span className="font-semibold text-slate-800">
                      {urgency === 'emergency-dispatch' ? 'Urgent (< 60 mins)' : 'Scheduled'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date & Time:</span>
                    <span className="font-semibold text-slate-800">
                      {urgency === 'emergency-dispatch' ? 'Today Immediate' : `${date} · ${timeSlot}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Patient:</span>
                    <span className="font-semibold text-slate-800">{fullName} ({phone})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Clinician Assigned:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedClinician ? selectedClinician.name : 'First Available Doctor/Nurse'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-400 block">Destination Address:</span>
                  <span className="font-semibold text-slate-800">
                    {address} {apartmentOrGate ? `(${apartmentOrGate})` : ''}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero dispatch travel fee promo applied. Fee payable in Ghana Cedis (GH₵) via Mobile Money (MTN/Telecel) or upon visit completion.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  BOOKING CODE: {confirmedBooking.id}
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-3">
                  In-Home Care Successfully Dispatched!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Our dispatch coordinator has assigned your clinical team. You will receive an SMS update when the clinician is en route.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.serviceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Cost:</span>
                  <span className="font-bold text-[#b91c1c]">{confirmedBooking.estimatedCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Arrival:</span>
                  <span className="font-semibold text-[#b91c1c]">{confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Clinician:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.clinicianName}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    resetForm();
                    onOpenPortal();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#b91c1c] hover:bg-[#a11616] text-white font-bold text-sm transition-colors"
                >
                  View In Patient Portal
                </button>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Done & Return Home
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (steps 1-3) */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">Step 1 of 3</span>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#a11616] transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold text-white bg-[#b91c1c] hover:bg-[#a11616] shadow-sm shadow-red-700/30 transition-colors"
              >
                <span>Confirm & Dispatch Visit</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
