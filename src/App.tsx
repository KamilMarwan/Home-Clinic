import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { TriageAssistant } from './components/TriageAssistant';
import { DoctorsSection } from './components/DoctorsSection';
import { FaqAndProof } from './components/FaqAndProof';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { Appointment, PatientUser } from './types';
import { DEMO_APPOINTMENTS, DEMO_PATIENT } from './data/mockData';
import { Calendar, PhoneCall, ShieldAlert, CheckCircle, Bell } from 'lucide-react';

export default function App() {
  // Booking state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedClinicianId, setSelectedClinicianId] = useState<string | undefined>();

  // Patient Portal state
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<PatientUser | null>(() => {
    const saved = localStorage.getItem('first_response_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Appointments list with localStorage persistence
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('first_response_appointments');
    return saved ? JSON.parse(saved) : DEMO_APPOINTMENTS;
  });

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('first_response_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('first_response_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('first_response_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleOpenBooking = (serviceId?: string, clinicianId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedClinicianId(clinicianId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newAppointment: Appointment) => {
    setAppointments([newAppointment, ...appointments]);
    setToastMessage(`In-Home visit ${newAppointment.id} confirmed! Clinician dispatched.`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const handleLogin = (user: PatientUser) => {
    setCurrentUser(user);
    setToastMessage(`Welcome back, ${user.fullName}. Patient portal active.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToastMessage('Signed out of Patient Portal.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-slate-800 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm animate-fade-in max-w-md">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={() => setIsPortalOpen(true)}
        isLoggedIn={!!currentUser}
        patientName={currentUser?.fullName}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Services Section */}
        <ServicesSection
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* How It Works */}
        <HowItWorks
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Clinical Care Selector / Triage Assistant */}
        <TriageAssistant
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* Medical Clinicians & Leadership */}
        <DoctorsSection
          onBookWithDoctor={(clinicianId) => handleOpenBooking(undefined, clinicianId)}
        />

        {/* Testimonials & FAQ */}
        <FaqAndProof />

      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Interactive Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
        preselectedClinicianId={selectedClinicianId}
        onBookingSuccess={handleBookingSuccess}
        onOpenPortal={() => {
          setIsBookingOpen(false);
          setIsPortalOpen(true);
        }}
      />

      {/* Interactive Patient Login & Health Portal Modal */}
      <PatientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        appointments={appointments}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
