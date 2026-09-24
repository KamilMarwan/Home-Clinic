import React, { useState } from 'react';
import { ChevronDown, Star, Quote, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FaqAndProof: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Adwoa Mensah',
      role: 'Daughter of Senior Patient (Age 82)',
      location: 'Airport Residential Area',
      quote: 'When my mother developed a fever and mobility became too difficult to transport her through traffic to the hospital, 1st Response dispatched Dr. Grace Totoe within 50 minutes. The thoroughness of her bedside exam and having blood drawn right in our living room was a godsend.',
      treatment: 'Doctor Home Visit & In-Home Blood Work'
    },
    {
      name: 'Michael Osei-Bonsu',
      role: 'Post-Surgical Knee Replacement Patient',
      location: 'Cantonments',
      quote: 'The visiting nurse Sarah Jenkins handled my daily sterile wound dressings and checked my vitals every morning. Having professional hospital-standard care in my own bed accelerated my healing by weeks without the infection risks of waiting rooms.',
      treatment: 'Skilled Nursing & Surgical Wound Recovery'
    },
    {
      name: 'Kofi & Evelyn Asante',
      role: 'Family Caregivers',
      location: 'East Legon',
      quote: 'Their palliative care team provided extraordinary comfort, gentle bedside manner, and genuine dignity for our father during his final months. The 24/7 phone hotline gave our family calm and peace of mind.',
      treatment: 'Palliative & Comfort Home Care'
    }
  ];

  const faqs = [
    {
      q: 'How quickly can a doctor or nurse arrive at my home?',
      a: 'For urgent medical visits, our rapid dispatch team aims to arrive at your door within 45 to 60 minutes throughout our active coverage zones. For routine checkups, blood work, or scheduled nursing care, you can select exact morning or afternoon arrival windows that fit your schedule.'
    },
    {
      q: 'What equipment and medications do visiting clinicians carry?',
      a: 'Our clinicians arrive fully equipped with hospital-grade diagnostic gear: portable ultrasound, cardiac vitals monitors, automated blood pressure units, sterile suture and wound care dressings, nebulizers, rapid blood analyzers, and essential emergency therapeutics (antihypertensives, bronchodilators, antiemetics, and sterile IV fluids).'
    },
    {
      q: 'How do I receive my laboratory blood test results?',
      a: 'Specimens collected in your home by our certified phlebotomists are transported immediately in cold-chain containers to accredited reference laboratories. Results are typically finalized within 12 to 24 hours and uploaded directly to your secure 1st Response Patient Portal, accompanied by physician review notes.'
    },
    {
      q: 'Do you accept health insurance or provide medical reimbursement invoices?',
      a: 'We provide itemized clinical super-bills and diagnostic receipts with standardized medical billing codes after every visit. Most major private and corporate health plans reimburse home healthcare and telemedicine consultations under outpatient ambulatory benefits.'
    },
    {
      q: 'Can 1st Response arrange prescription delivery to my house?',
      a: 'Yes. Following your examination, your physician can electronically transmit your prescription directly to our partner pharmacy, dispatching delivery to your doorstep within hours.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50/60 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Verified Clinical Patient Reviews */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase mb-2">
              Patient Trust & Case Experiences
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Stories of Dignified In-Home Healing
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Read how our visiting doctors and nurses impact the lives of recuperating patients and their families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                  <div className="text-[11px] text-[#b91c1c] font-semibold mt-1">
                    {t.treatment} · {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase mb-2">
              Common Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know About In-Home Visits
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-slate-200/90 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:text-[#b91c1c] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#b91c1c]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
