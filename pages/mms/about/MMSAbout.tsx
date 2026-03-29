import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { mmsAboutIntro } from './mmsAboutData';
import { useMmsImageHolder } from '../../../hooks/mms/useMmsImageHolder';

export default function MMSAbout() {
  const aboutImageUrl = useMmsImageHolder('about', 'MMS About Visual (img4.jpeg)');

  return (
    <MMSLayout title="About MMS">
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Master of Management Studies</span>
        </div>

        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <aside className="w-full max-w-[320px] lg:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-28">
              <div className="rounded-3xl bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 p-[2.5px] shadow-[0_0_36px_6px_rgba(253,184,19,0.3)]">
                <div className="overflow-hidden rounded-[22px] bg-white">
                  {aboutImageUrl ? (
                    <img
                      src={aboutImageUrl}
                      alt="MMS About Visual"
                      className="block h-[330px] w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-[330px] w-full items-center justify-center bg-brand-light">
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue/70">Image Holder</p>
                        <p className="mt-2 text-sm font-semibold text-brand-navy">MMS About Visual (img4.jpeg)</p>
                      </div>
                    </div>
                  )}
                  <div className="bg-gradient-to-b from-white to-amber-50/40 px-5 py-4 text-center">
                    <h3 className="text-xl font-display font-extrabold text-brand-navy">Master of Management Studies</h3>
                    <p className="mt-2 text-xs font-semibold text-slate-500">Vidyavardhini&apos;s College of Engineering &amp; Technology</p>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex-1 space-y-6 lg:pt-0.5">
              <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue p-6 text-white shadow-lg md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/90">Department Profile</p>
                <h2 className="mt-2 text-2xl font-display font-bold leading-tight md:text-3xl">About MMS Program</h2>
              </div>

              <div className="space-y-5 text-justify text-[17px] leading-[1.95] text-slate-700">
                {mmsAboutIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </MMSLayout>
  );
}
