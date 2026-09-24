import React from 'react';
import { CLINICIANS } from '../data/mockData';
import { Award, Star, Calendar, ShieldCheck, Stethoscope } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (clinicianId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookWithDoctor }) => {
  return (
    <section id="clinicians" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase mb-2">
            Physician Leadership & Dedicated Clinicians
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Your Board-Certified In-Home Care Team
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Our medical staff brings decades of hospital and ambulatory clinical experience directly to your bedside, combining academic rigor with deep personal empathy.
          </p>
        </div>

        {/* Clinicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CLINICIANS.map((clinician) => (
            <div
              key={clinician.id}
              className="flex flex-col sm:flex-row gap-6 p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 transition-all"
            >
              {/* Avatar placeholder with clinical crest initials */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-red-100 flex flex-col items-center justify-center text-center p-2 shrink-0 shadow-xs">
                <span className="text-xl sm:text-2xl font-black text-[#b91c1c] font-serif">
                  {clinician.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Verified MD/RN
                </span>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {clinician.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{clinician.rating}</span>
                      <span className="text-slate-400 font-normal">({clinician.reviewCount})</span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-[#b91c1c] mt-0.5">
                    {clinician.role}
                  </div>
                  <div className="text-xs font-medium text-slate-600 mt-0.5">
                    {clinician.specialty}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                    {clinician.experience}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Days Available:</span>{' '}
                    {clinician.availableDays.join(', ')}
                  </div>
                  <button
                    onClick={() => onBookWithDoctor(clinician.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-[#b91c1c] text-white text-xs font-bold transition-colors whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Request Clinician</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
