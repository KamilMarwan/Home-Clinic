import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Clock } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPortal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-3.5 rounded-2xl inline-block shadow-sm">
              <BrandLogo variant="horizontal" size="md" />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              1st Response Home Clinic Limited brings board-certified physicians, licensed home nurses, mobile laboratory diagnostics, and IV therapy directly into the comfort and dignity of your home.
            </p>

            <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
              <Clock className="w-4 h-4" />
              <span>24/7 Clinical Emergency Home Dispatch Active</span>
            </div>
          </div>

          {/* Clinical Services links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Specialist Doctor Visits</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Quality Home Nursing</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Mobile Lab & Blood Draws</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">IV Hydration Therapy</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Hospice & Palliative Care</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Telemedicine Consultations</a>
              </li>
            </ul>
          </div>

          {/* Patient Portal & Booking */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Patient Access
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenPortal} className="hover:text-white text-left transition-colors">
                  Patient Login Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white text-left transition-colors">
                  Book In-Home Appointment
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-white text-left transition-colors">
                  View Certified Lab Results
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-white text-left transition-colors">
                  Medication Refill Delivery
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How Home Visits Work
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">+1 (215) 876-5703</div>
                  <div className="text-[11px] text-slate-500">24/7 Home Triage Dispatch</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">digitalclinic@1stresponseclinic.com</div>
                  <div className="text-[11px] text-slate-500">Encrypted Inquiries</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Greater Accra Region & Outskirts</div>
                  <div className="text-[11px] text-slate-500">Mobile units stationed across city zones</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} 1st Response Home Clinic Limited. All rights reserved. Bring The Clinic To Your Home.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy & HIPAA Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Patient Bill of Rights</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Clinical Consent</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
