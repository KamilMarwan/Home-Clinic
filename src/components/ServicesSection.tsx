import React, { useState } from 'react';
import { CLINIC_SERVICES } from '../data/mockData';
import { ClinicService } from '../types';
import { 
  Stethoscope, 
  HeartPulse, 
  FlaskConical, 
  Syringe, 
  HandHeart, 
  Video, 
  Check, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? CLINIC_SERVICES
    : CLINIC_SERVICES.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5" />;
      case 'Syringe':
        return <Syringe className="w-5 h-5" />;
      case 'HandHeart':
        return <HandHeart className="w-5 h-5" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      default:
        return <Stethoscope className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50/60 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-[#b91c1c] uppercase mb-2">
            Comprehensive Clinical Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Specialized Medical & Nursing Care Delivered Directly To Your Door
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From routine checkups and chronic illness monitoring to acute triage, sterile mobile phlebotomy, and compassionate palliative elder care.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control compliant with constitution) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl overflow-x-auto mb-10 max-w-2xl">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'doctor', label: 'Doctor Visits' },
            { id: 'nursing', label: 'Home Nursing' },
            { id: 'diagnostics', label: 'Mobile Lab' },
            { id: 'therapy', label: 'IV Infusions' },
            { id: 'palliative', label: 'Palliative & Elder' },
            { id: 'telehealth', label: 'Telemedicine' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const isMarquee = service.id === 'doctor-home-visit' || service.id === 'iv-infusion-therapy';
            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                  isMarquee
                    ? 'border-red-200/90 ring-1 ring-red-100'
                    : 'border-slate-200/90'
                } p-6 sm:p-7`}
              >
                <div>
                  {/* Top line: Editorial Index & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{index + 1}.
                    </span>
                    {service.badge && (
                      <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-[#b91c1c] border border-red-200/80">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-red-50 text-[#b91c1c] shrink-0 border border-red-100">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed my-4">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 py-3 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Clinical Inclusions
                    </div>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of card: Duration, Price & CTA */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 tracking-tight mt-0.5">
                      {service.price}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-[#b91c1c] transition-colors whitespace-nowrap"
                  >
                    <span>Book Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
