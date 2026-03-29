import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { Quote } from 'lucide-react';
import { hodDeskContent } from './mmsAboutData';
import { useMmsImageHolder } from '../../../hooks/mms/useMmsImageHolder';

export default function MMSHODsDesk() {
  const hodImageUrl = useMmsImageHolder('about', 'HOD Photo');

  return (
    <MMSLayout title="HOD's Desk">
      <section className="relative rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Message from the HOD</span>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue p-6 text-white shadow-lg md:p-8">
            <Quote className="mb-3 h-6 w-6 text-brand-gold" />
            <p className="text-xl font-display font-semibold leading-relaxed md:text-3xl">Department Message</p>
          </div>

          <div className="min-w-0 text-justify text-[18px] leading-[2] text-slate-700">
            <aside className="mx-auto mb-6 w-full max-w-[320px] lg:float-left lg:mb-4 lg:mr-8 lg:w-[320px] lg:max-w-none">
            <div className="rounded-3xl bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 p-[2.5px] shadow-[0_0_34px_6px_rgba(253,184,19,0.34)]">
              <div className="overflow-hidden rounded-[22px] bg-white">
                {hodImageUrl ? (
                  <img
                    src={hodImageUrl}
                    alt="HOD Photo"
                    className="block h-[290px] w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-[290px] w-full items-center justify-center bg-brand-light">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue/70">Profile Holder</p>
                      <p className="mt-2 text-sm font-semibold text-brand-navy">HOD Photo</p>
                    </div>
                  </div>
                )}
                <div className="bg-gradient-to-b from-white to-amber-50/40 px-5 py-4 text-center">
                  <h3 className="text-2xl font-display font-extrabold text-brand-navy">Dr. Shital Nishank Patil</h3>
                  <div className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400 px-4 py-1.5">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-navy">HOD - MMS</span>
                  </div>
                  <p className="mt-3 text-xs font-semibold text-slate-500">Department of Master of Management Studies</p>
                </div>
                <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
              </div>
            </div>
          </aside>

            <div className="space-y-4">
              {hodDeskContent.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MMSLayout>
  );
}
