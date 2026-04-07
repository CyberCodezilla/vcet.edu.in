import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageBanner from '../components/PageBanner';

const sidebarLinks = [{ id: 'team', label: 'Team', icon: 'ph-users-three' }];

const OracleAcademy: React.FC = () => {
  const [activeId, setActiveId] = useState('team');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    const t = setTimeout(() => {
      document
        .querySelectorAll('.reveal:not(.visible)')
        .forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [activeId]);

  return (
    <PageLayout>
      <PageBanner 
        title="Oracle Academy" 
        breadcrumbs={[{ label: 'Oracle Academy' }]} 
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-4 py-3 text-sm text-left transition-all flex items-center justify-between gap-3 group border-l-[3px] ${
                      isActive
                        ? 'bg-brand-navy text-brand-gold font-semibold border-brand-gold'
                        : 'text-brand-navy font-medium hover:bg-brand-navylight border-transparent hover:border-brand-gold'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <i className={`ph ${link.icon} text-lg ${isActive ? '' : 'opacity-70'}`} />
                      <span className="truncate">{link.label}</span>
                    </span>
                    {isActive && (
                      <i className="ph ph-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="w-full flex-1 min-w-0">
          {activeId === 'team' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Oracle Academy
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Team
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-sky-500">Oracle Academy Team:</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="min-w-full text-sm text-slate-700">
                    <thead className="bg-slate-50 text-left">
                      <tr>
                        <th className="px-4 py-3 font-semibold border-b border-slate-200">Name</th>
                        <th className="px-4 py-3 font-semibold border-b border-slate-200">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Dr. Satish S. Salunkhe</td>
                        <td className="px-4 py-3">Head of Oracle Academy</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Ms. Neha Gharat</td>
                        <td className="px-4 py-3">Industry Connect, Certification &amp; Training Coordinator</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Ms. Sneha Yadav</td>
                        <td className="px-4 py-3">Student Forum Coordinator</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Mr. Vishal Gangan</td>
                        <td className="px-4 py-3">Co- Coordinator</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Dr. Viren Chandanshive</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Mr. Sunil Katkar</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Dr. Yogita Shelar</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Ms. Kshitija Gharat</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Ms. Leena Raut</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Ms. Manali Payghan</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Mr. Rowland Lopes</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Mr. Akshay Save</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3">Ms. Saylee Susvilkar</td>
                        <td className="px-4 py-3">Member</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default OracleAcademy;
