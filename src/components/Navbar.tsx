import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { User, Calendar, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  isLoggedIn: boolean;
  patientName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPortal,
  isLoggedIn,
  patientName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Zone */}
          <div className="flex items-center shrink-0">
            <BrandLogo
              variant="horizontal"
              size="md"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a
              href="#services"
              className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
            >
              How It Works
            </a>
            <a
              href="#clinicians"
              className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
            >
              Medical Team
            </a>
            <a
              href="#triage"
              className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
            >
              Care Selector
            </a>
            <a
              href="#faq"
              className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={onOpenPortal}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-all whitespace-nowrap ${
                isLoggedIn
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >
              <User className="w-4 h-4 text-slate-600" />
              <span>{isLoggedIn ? (patientName ? patientName.split(' ')[0] : 'Portal') : 'Patient Portal'}</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#b91c1c] text-white hover:bg-[#a01616] active:scale-[0.98] transition-all shadow-sm shadow-red-700/20 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Home Visit</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#b91c1c]"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#b91c1c]"
              >
                How It Works
              </a>
              <a
                href="#clinicians"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#b91c1c]"
              >
                Medical Team
              </a>
              <a
                href="#triage"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#b91c1c]"
              >
                Care Selector
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#b91c1c]"
              >
                FAQ
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#b91c1c]" />
                24/7 Hotline: +1 (800) 592-HOME
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
