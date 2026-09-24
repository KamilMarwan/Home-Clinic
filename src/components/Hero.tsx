import React from 'react';
import { Calendar, ShieldCheck, Clock, MapPin, Activity, Stethoscope, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenPortal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/20 to-white pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-slate-200/70">
      
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency/Rapid Response Dispatch notification bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5 bg-white rounded-xl border border-red-200/80 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="font-semibold text-[#b91c1c]">Rapid Home Dispatch:</span>
            <span>Clinicians on call in your area for urgent home medical visits & IV therapy.</span>
          </div>
          <button
            onClick={() => onOpenBooking('doctor-home-visit')}
            className="text-xs font-semibold text-[#b91c1c] hover:text-[#991b1b] flex items-center gap-1 hover:underline underline-offset-2 whitespace-nowrap"
          >
            <span>Request Immediate Dispatch</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Proposition, Copy & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Metadata trust indicator (no pills, clean typographic separator) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
              <span className="text-[#b91c1c] font-semibold">1st Response Home Clinic</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span>Physician-Led In-Home Healthcare</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span>Licensed & Certified</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Hospital-Grade Medical Care in the Comfort of <span className="text-[#b91c1c]">Your Home.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Skip crowded waiting rooms and travel stress. Our board-certified physicians, licensed home nurses, and mobile laboratory technicians deliver comprehensive medical examinations, acute treatment, and IV wellness directly to your door.
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 text-base font-bold text-white bg-[#b91c1c] hover:bg-[#a11616] rounded-xl shadow-md shadow-red-700/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule a Home Visit</span>
              </button>

              <button
                onClick={onOpenPortal}
                className="px-6 py-3.5 text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Activity className="w-5 h-5 text-[#b91c1c]" />
                <span>Access Patient Portal</span>
              </button>
            </div>

            {/* Claim to Proof Adjacency */}
            <div className="pt-4 border-t border-slate-200/90 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">45 Mins</div>
                <div className="text-xs text-slate-500 mt-0.5">Average dispatch response time</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">4,800+</div>
                <div className="text-xs text-slate-500 mt-0.5">In-home clinical visits performed</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">99.4%</div>
                <div className="text-xs text-slate-500 mt-0.5">Verified patient satisfaction</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-fidelity clinical card & interactive visual container */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-7">
              
              {/* Header badge area with Brand Crest */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <BrandLogo variant="emblem" size="md" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      1st Response Clinical Unit
                    </h3>
                    <p className="text-xs text-slate-500">
                      Mobile Urgent & Preventive Care
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Dispatch Active
                  </span>
                  <span className="text-[11px] text-slate-400">Accra & Suburbs</span>
                </div>
              </div>

              {/* Service dispatch quick-picker preview */}
              <div className="py-5 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Popular Home Services
                </p>

                <div
                  onClick={() => onOpenBooking('doctor-home-visit')}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50/60 border border-slate-200/80 hover:border-red-200 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100 text-[#b91c1c]">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#b91c1c] transition-colors">
                        Doctor In-Home Consultation
                      </h4>
                      <p className="text-xs text-slate-500">Full physical, Rx & diagnosis</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">From $120</span>
                </div>

                <div
                  onClick={() => onOpenBooking('registered-home-nursing')}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50/60 border border-slate-200/80 hover:border-red-200 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#b91c1c] transition-colors">
                        Skilled Nursing & Wound Care
                      </h4>
                      <p className="text-xs text-slate-500">Dressing changes, vitals & injections</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">From $75</span>
                </div>

                <div
                  onClick={() => onOpenBooking('mobile-lab-diagnostics')}
                  className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50/60 border border-slate-200/80 hover:border-red-200 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#b91c1c] transition-colors">
                        Mobile Blood Draws & Lab Panel
                      </h4>
                      <p className="text-xs text-slate-500">Same-day sterile phlebotomy</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">From $50</span>
                </div>
              </div>

              {/* Bottom trust footer on card */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  HIPAA & Medical Board Compliant
                </span>
                <button
                  onClick={() => onOpenBooking()}
                  className="font-semibold text-[#b91c1c] hover:underline"
                >
                  Select Time &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
