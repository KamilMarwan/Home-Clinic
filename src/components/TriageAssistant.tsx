import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TriageAssistantProps {
  onSelectService: (serviceId: string) => void;
}

export const TriageAssistant: React.FC<TriageAssistantProps> = ({ onSelectService }) => {
  const [selectedNeed, setSelectedNeed] = useState<string>('acute-illness');
  const [patientType, setPatientType] = useState<string>('adult');

  const recommendations: Record<string, { serviceId: string; title: string; reason: string; badge: string }> = {
    'acute-illness': {
      serviceId: 'doctor-home-visit',
      title: 'Specialist Doctor Home Visit',
      reason: 'A board-certified physician will conduct a full physical examination, listen to chest/lungs, provide immediate medication, and issue prescriptions.',
      badge: 'Physician Recommended'
    },
    'wound-post-op': {
      serviceId: 'registered-home-nursing',
      title: 'Quality Home Nursing & Wound Care',
      reason: 'A registered wound-certified nurse will perform sterile dressing change, check surgical healing, and manage catheter or post-operative drains.',
      badge: 'Skilled Nursing'
    },
    'blood-test': {
      serviceId: 'mobile-lab-diagnostics',
      title: 'Mobile Laboratory & Blood Draws',
      reason: 'A phlebotomist arrives with sterile vacutainers and portable centrifuge. Results uploaded directly to your patient portal within 12-24 hours.',
      badge: 'Diagnostics'
    },
    'fatigue-dehydration': {
      serviceId: 'iv-infusion-therapy',
      title: 'IV Hydration & Wellness Infusions',
      reason: 'Rapid replenishment with isotonic fluids, electrolytes, Vitamin C, and B-complex vitamins to restore hydration and vitality at home.',
      badge: 'Wellness & Infusion'
    },
    'elder-chronic': {
      serviceId: 'palliative-elder-care',
      title: 'Hospice, Palliative & Elder Home Care',
      reason: 'Continuous compassionate care focusing on pain relief, mobility assistance, medication scheduling, and dignified companionship.',
      badge: 'Compassionate Care'
    }
  };

  const currentRec = recommendations[selectedNeed] || recommendations['acute-illness'];

  return (
    <section id="triage" className="py-20 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase mb-2">
            In-Home Clinical Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Not Sure Which Service You Need?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tell us about the patient's symptoms or requirements and our clinical triage guidelines will match you with the appropriate care team.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Questions column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Question 1: Patient type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                1. Who is receiving care?
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'adult', label: 'Adult Patient' },
                  { id: 'senior', label: 'Senior / Elderly (65+)' },
                  { id: 'postop', label: 'Post-Surgical' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setPatientType(opt.id)}
                    className={`p-3 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all ${
                      patientType === opt.id
                        ? 'border-[#b91c1c] bg-red-50/50 text-[#b91c1c] font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Primary care need */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                2. What is the primary clinical requirement?
              </label>
              <div className="space-y-2">
                {[
                  { id: 'acute-illness', label: 'Fever, cough, abdominal pain, sudden illness, or doctor evaluation' },
                  { id: 'wound-post-op', label: 'Surgical wound care, sterile dressing changes, injection or catheter' },
                  { id: 'blood-test', label: 'Blood work, routine lab panels, diabetic checkup or lipid test at home' },
                  { id: 'fatigue-dehydration', label: 'Severe dehydration, exhaustion, recovery or IV vitamin infusion' },
                  { id: 'elder-chronic', label: 'Dignified elder support, daily assistance, pain relief or palliative care' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNeed(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedNeed === item.id
                        ? 'border-[#b91c1c] bg-red-50/40 text-slate-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                      selectedNeed === item.id
                        ? 'border-[#b91c1c] bg-[#b91c1c] text-white'
                        : 'border-slate-300'
                    }`}>
                      {selectedNeed === item.id && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Emergency Notice:</strong> If the patient is experiencing chest pain, severe shortness of breath, sudden loss of consciousness, or profuse hemorrhaging, please call local emergency services (911/112) immediately.
              </span>
            </div>

          </div>

          {/* Recommendation card column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
                  Triage Match
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  {currentRec.badge}
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-white mb-3">
                {currentRec.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {currentRec.reason}
              </p>

              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2 mb-6">
                <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  What is included in this visit:
                </div>
                <div className="text-xs text-slate-300 list-disc space-y-1 pl-4">
                  <li>In-person clinical assessment by licensed professional</li>
                  <li>Point-of-care vital signs diagnostic checks</li>
                  <li>Detailed electronic chart report in your patient portal</li>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectService(currentRec.serviceId)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#b91c1c] hover:bg-[#a11616] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-red-900/40"
            >
              <span>Book This Recommended Care</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
