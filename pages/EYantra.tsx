import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const sidebarLinks = [
  { id: 'about', label: 'About', icon: 'ph-info' },
  { id: 'objectives', label: 'Objectives', icon: 'ph-target' },
  { id: 'events', label: 'Events', icon: 'ph-calendar' },
  { id: 'equipments', label: 'Equipments', icon: 'ph-wrench' },
  { id: 'effectiveness', label: 'Effectiveness', icon: 'ph-chart-line-up' },
  { id: 'gallery', label: 'Gallery', icon: 'ph-image' },
  { id: 'team', label: 'Team', icon: 'ph-users-three' },
];

const EYantra: React.FC = () => {
  const [activeId, setActiveId] = useState('about');

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
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />

        <nav className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <Link
            to="/"
            className="hover:text-brand-gold transition-colors duration-200 flex items-center"
          >
            <i className="ph ph-house text-base" />
          </Link>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold text-xs sm:text-sm">e-Yantra</span>
        </nav>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl">e-Yantra</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
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

        <main className="w-full flex-1 space-y-14 md:space-y-16 min-w-0">
          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                About
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-4 text-slate-600 leading-8">
                <p>
                  e-Yantra Laboratory Setup is an initiative of the e-Yantra project – sponsored by the National Mission for Education through Information and Communication Technology (NMEICT) of the Ministry of Human Resource Development (MHRD), Government of India to promote robot enhanced education at engineering colleges.
                </p>
                <p>
                  Vidyavaardhni’s College of Engineering &amp; Technology has partnered in this venture by setting up e-Yantra laboratory by procuring robots and accessories to establish a robotics laboratory.
                </p>
              </div>
            </section>
          )}

          {activeId === 'objectives' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Objectives
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-3 text-slate-600 leading-8">
                <p className="font-semibold text-brand-navy">Objectives :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    To promote a multi-disciplinary approach encompassing Embedded Systems and Robotics for problem-solving with an emphasis on hands-on experiments.
                  </li>
                  <li>To create an infrastructure to execute robotics projects.</li>
                  <li>To create an ecosystem to engage students in Project-Based Learning.</li>
                </ul>
              </div>
            </section>
          )}

          {activeId === 'events' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Events
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-4">
                <p className="text-slate-600 leading-8">
                  Explore yearly activity reports for the e-Yantra laboratory.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://vcet.edu.in/wp-content/uploads/2024/04/eYantra-Activities-23-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>Year 23-24</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="https://vcet.edu.in/wp-content/uploads/2024/04/eYantra-Activities-22-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>Year 22-23</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="https://vcet.edu.in/wp-content/uploads/2024/04/eYantra-Activities21-22.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>Year 21-22</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="https://vcet.edu.in/wp-content/uploads/2024/04/eYantra-Activities-20-21.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>Year 20-21</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="https://vcet.edu.in/wp-content/uploads/2024/04/eYantra-Activities19-20.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors sm:col-span-2"
                  >
                    <span>Year 19-20</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                </div>
              </div>
            </section>
          )}

          {activeId === 'equipments' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Equipments
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-8">
                <li>FireBird V 2560</li>
                <li>Spark V Robot (5)</li>
                <li>P89V51RD2 Development Board</li>
                <li>Raspberry-Pi 3</li>
                <li>Zigbee Modules</li>
                <li>Metal-gear Servo Motors</li>
                <li>Servo Motor Based Gripper kit for the Fire Bird V Robot</li>
                <li>Sensor Sharp GP2Y0A21YK0F infrared range</li>
              </ul>
            </section>
          )}

          {activeId === 'effectiveness' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Effectiveness
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-8">
                <li>
                  Participation in intercollegiate and National level competitions like e-Yantra Robotics Competition organized by IIT Bombay.
                </li>
                <li>Peer learning during the workshop conducted under the initiative.</li>
                <li>Implementation of mini projects by students using the kits in the laboratory.</li>
              </ul>
            </section>
          )}

          {activeId === 'gallery' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Gallery
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50"
                  >
                    <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                      Image Placeholder {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeId === 'team' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">e-Yantra</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Team
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm text-slate-700">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b border-slate-200">Post</th>
                      <th className="px-4 py-3 font-semibold border-b border-slate-200">Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="odd:bg-white even:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium">Coordinator :</td>
                      <td className="px-4 py-3">Dr. Megha Trivedi, HOD Computer Engineering</td>
                    </tr>
                    <tr className="odd:bg-white even:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium">IIC Coordinator</td>
                      <td className="px-4 py-3">Mr. Prafulla Patil, Placement Manager</td>
                    </tr>
                    <tr className="odd:bg-white even:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium">Members:</td>
                      <td className="px-4 py-3">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Dr. Madhavi Waghmare (Information Technology)</li>
                          <li>Mrs. Trupti Shah (EXTC)</li>
                          <li>Mrs. Shaista Khan (EXTC)</li>
                          <li>Ms. Deepti Mahadeshwar (Instru)</li>
                          <li>Ms. Priti Loke</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default EYantra;
