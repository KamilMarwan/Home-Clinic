import React from 'react';
import { CalendarCheck, Car, FileText, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      icon: <CalendarCheck className="w-6 h-6 text-[#b91c1c]" />,
      title: 'Request or Schedule In-Home Visit',
      desc: 'Select your required medical service online, enter your address, and choose an immediate rapid dispatch window (under 45 minutes) or a scheduled date.'
    },
    {
      num: '02',
      icon: <Car className="w-6 h-6 text-[#b91c1c]" />,
      title: 'Licensed Clinician Dispatched To Your Door',
      desc: 'Our credentialed physician or registered nurse arrives with complete sterile medical kits, point-of-care diagnostics, and essential medications.'
    },
    {
      num: '03',
      icon: <FileText className="w-6 h-6 text-[#b91c1c]" />,
      title: 'Immediate Care & Live Portal Records',
      desc: 'Receive examination, blood draws, or IV therapy in comfort. Encounter summaries, vitals history, and prescriptions instantly update in your Patient Portal.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase mb-2">
            The In-Home Clinical Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How 1st Response Brings The Clinic To You
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A frictionless, dignified healthcare experience engineered for elderly individuals, busy families, and patients recuperating at home.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative flex flex-col p-8 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-red-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
                <span className="text-2xl font-mono font-extrabold text-slate-300 group-hover:text-red-300 transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Clinical Quality Standards banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#111827] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Rigorous Medical Governance</span>
            </div>
            <h4 className="text-xl font-bold tracking-tight text-white">
              Every clinician is vetted, licensed, insured, and hospital-affiliated.
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Strict cold-chain specimen handling for lab blood draws, autoclave sterile packaging, and encrypted digital medical charting.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3 text-sm font-bold text-white bg-[#b91c1c] hover:bg-[#a01616] rounded-xl whitespace-nowrap transition-colors shrink-0"
          >
            Book An In-Home Clinician
          </button>
        </div>

      </div>
    </section>
  );
};
