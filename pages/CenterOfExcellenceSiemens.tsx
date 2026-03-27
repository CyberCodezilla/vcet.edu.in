import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const sidebarLinks = [
  { id: 'about',      label: 'About',      icon: 'ph-info' },
  { id: 'objectives', label: 'Objectives', icon: 'ph-target' },
  { id: 'benefits',   label: 'Benefits',   icon: 'ph-trend-up' },
  { id: 'activities', label: 'Activities', icon: 'ph-activity' },
  { id: 'gallery',    label: 'Gallery',    icon: 'ph-image' },
  { id: 'committee',  label: 'Committee',  icon: 'ph-users-three' },
];

const CenterOfExcellenceSiemens: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

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
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></Link>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold text-xs sm:text-sm">Center of Excellence - SIEMENS</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl">Center of Excellence - SIEMENS</span>
          </h1>
        </div>
      </header>

      {/* ── Page Body ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* ── Sticky Sidebar ───────────────────────────────────── */}
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

        {/* ── Main Content ─────────────────────────────────────── */}
        <main className="w-full flex-1 space-y-14 md:space-y-16 min-w-0">

          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Siemens CoE</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">About<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="space-y-6 text-slate-600 leading-8">
                <p>
                  The Center of Excellence - SIEMENS provides state-of-the-art facilities for research and training in industrial automation and digitalization.
                </p>
                <div className="bg-brand-navylight/30 p-6 rounded-2xl border border-brand-navylight">
                  <h4 className="text-xl font-bold text-brand-navy mb-2">PLC Automation and Drives :</h4>
                  <p>At VCET, we understand the importance of elevating student’s skills in adapting to newer challenges and value the returns of investing in technical skill enhancement. Since last year, Siemens Centre of excellence at VCET is established to provide training for our students in the field of Automation & Drives. The training module encompasses a wide range of courses designed for PLCs, Drives, Controls, HMI, Networks, Process Control, and more. Which subsequently translates into effective, flexible, and value based training and real results in productivity, cost reductions and process optimization. Through specific courses designed for students, each course schedule consists of well balanced theory and provides hands-on training to optimize the knowledge about the products. Our fleet of experienced trainers ensures that each participant makes a contribution towards productivity and performance improvement in this organization.
This centre assist students to come up with their own new project ideas and implement them. Center is equipped with various kits of Siemens. kits are available under three sections which are as follows:

SIMATIC S7 1200 PLC kit with HMI (A set of 6 kits package)
SINAMICS G120 Trainer (set of 5 kits
SINAMICS DCM 6RA80 Trainer with DC Motors (A set of 2 kits)
Students can have hands on practice on these kits and learn about it.</p>
                </div>
              </div>
            </section>
          )}

          {activeId === 'objectives' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Siemens CoE</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Objectives<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold">Objectives :</p>
                  <p>The main objective of Siemens Centre of Excellence is:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>To bridge the gap between industry and academics.</li>
                    <li>To provide a competitive edge by helping students to learn, analyze and apply theoretical concepts and develop industry-level technology.</li>
                    <li>To provide experiential learning where students can solve real world problems using state-of-the-art technical material.</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-brand-navy mb-3">Training Programs Conducted under Siemens CoE</h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-slate-100 text-slate-800">
                        <tr>
                          <th className="px-4 py-3 border-b border-slate-200">Sr. No.</th>
                          <th className="px-4 py-3 border-b border-slate-200">Event</th>
                          <th className="px-4 py-3 border-b border-slate-200">No. of Participants</th>
                          <th className="px-4 py-3 border-b border-slate-200">Period</th>
                          <th className="px-4 py-3 border-b border-slate-200">No. of Days</th>
                          <th className="px-4 py-3 border-b border-slate-200">Description</th>
                          <th className="px-4 py-3 border-b border-slate-200">Resource Person</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">1</td>
                          <td className="px-4 py-3 align-top">TTT Program for COE on Basic Drives</td>
                          <td className="px-4 py-3 align-top">07</td>
                          <td className="px-4 py-3 align-top">01/07/2019 to 05/07/2019</td>
                          <td className="px-4 py-3 align-top">05</td>
                          <td className="px-4 py-3 align-top">Teachers training program</td>
                          <td className="px-4 py-3 align-top">Mr. Rohit Thakur, Trainer, SITRAIN, Siemens India Ltd.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">2</td>
                          <td className="px-4 py-3 align-top">TTT Program for COE on S7 1200</td>
                          <td className="px-4 py-3 align-top">07</td>
                          <td className="px-4 py-3 align-top">08/07/2019 to 12/07/2019</td>
                          <td className="px-4 py-3 align-top">05</td>
                          <td className="px-4 py-3 align-top">Teachers training program</td>
                          <td className="px-4 py-3 align-top">Mrs. Mangle, Trainer, SITRAIN, Siemens India Ltd.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">3</td>
                          <td className="px-4 py-3 align-top">Workshop on Basic Programming for PLC S7 1200</td>
                          <td className="px-4 py-3 align-top">52</td>
                          <td className="px-4 py-3 align-top">17/08/2019</td>
                          <td className="px-4 py-3 align-top">01</td>
                          <td className="px-4 py-3 align-top">One day workshop arranged for third year students of Instrumentation Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Prafulla Patil and Mr. Vishal Pande, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">4</td>
                          <td className="px-4 py-3 align-top">Workshop on PLC HMI Communication</td>
                          <td className="px-4 py-3 align-top">50</td>
                          <td className="px-4 py-3 align-top">31/08/2019</td>
                          <td className="px-4 py-3 align-top">01</td>
                          <td className="px-4 py-3 align-top">One day workshop is arranged for third year students of Instrumentation Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Prafulla Patil and Mr. Vishal Pande, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">5</td>
                          <td className="px-4 py-3 align-top">Workshop on Basic Programming for PLC S7 1200</td>
                          <td className="px-4 py-3 align-top">70</td>
                          <td className="px-4 py-3 align-top">21/09/2019</td>
                          <td className="px-4 py-3 align-top">01</td>
                          <td className="px-4 py-3 align-top">One day workshop is arranged for third year students of Mechanical Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Vishal Pande and Mr. Kamlesh Bachkar, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">6</td>
                          <td className="px-4 py-3 align-top">Workshop on PLC HMI Communication</td>
                          <td className="px-4 py-3 align-top">75</td>
                          <td className="px-4 py-3 align-top">28/09/2019</td>
                          <td className="px-4 py-3 align-top">01</td>
                          <td className="px-4 py-3 align-top">One day workshop is arranged for third year students of Mechanical Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Prafulla Patil and Mr. Kamlesh Bachkar, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">7</td>
                          <td className="px-4 py-3 align-top">Basic PLC S7 1200 + HMI</td>
                          <td className="px-4 py-3 align-top">25</td>
                          <td className="px-4 py-3 align-top">20/01/2020 to 30/01/2020</td>
                          <td className="px-4 py-3 align-top">10</td>
                          <td className="px-4 py-3 align-top">PLC and HMI Programming for students of final year Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Prafulla Patil and Mr. Vishal Pande, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">8</td>
                          <td className="px-4 py-3 align-top">Workshop on Basics of AC/DC Motors and Drives</td>
                          <td className="px-4 py-3 align-top">58</td>
                          <td className="px-4 py-3 align-top">05/10/2019</td>
                          <td className="px-4 py-3 align-top">01</td>
                          <td className="px-4 py-3 align-top">One day workshop is arranged for third year students of Instrumentation Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Prafulla Patil and Mr. Vishal Pande, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-slate-50/60">
                          <td className="px-4 py-3 align-top">9</td>
                          <td className="px-4 py-3 align-top">One day workshop for third year students of Mechanical Engineering</td>
                          <td className="px-4 py-3 align-top">73</td>
                          <td className="px-4 py-3 align-top">12/10/2019</td>
                          <td className="px-4 py-3 align-top">01</td>
                          <td className="px-4 py-3 align-top">One day workshop is arranged for third year students of Mechanical Engineering.</td>
                          <td className="px-4 py-3 align-top">Mr. Vishal Pande and Mr. Kamlesh Bachkar, Trainers, Siemens Centre of Excellence.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Team Coordinators</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Dr. Vikas Gupta</li>
                    <li>Mr. Prafulla Patil</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-brand-navy mt-5 mb-2">Members</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ms. Kanchan Sarmalkar</li>
                    <li>Mr. Vishal Pande</li>
                    <li>Ms. Ekta Naik</li>
                    <li>Mr. Kamlesh Bachkar</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {activeId === 'benefits' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Siemens CoE</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Benefits<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-3">
                <p className="font-semibold">Benefits :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Exposure to real industrial products.</li>
                  <li>Hands-on training on Siemens products &amp; certification with Siemens Instruments University Program logo.</li>
                  <li>Shortened start-up times and faster troubleshooting for actual project development.</li>
                  <li>Employability for students will increase.</li>
                </ul>
              </div>
            </section>
          )}

          {activeId === 'activities' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Siemens CoE</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Activities<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-3">
                <p>Click on the academic year below to view the detailed list of activities conducted under Siemens CoE.</p>
                <a
                  href="https://vcet.edu.in/wp-content/uploads/2024/04/List-of-Activities.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full border border-brand-gold text-brand-navy font-semibold hover:bg-brand-gold hover:text-brand-navy transition-colors duration-200 shadow-sm"
                >
                  2023-19
                  <i className="ph ph-arrow-square-out text-lg ml-2" />
                </a>
              </div>
            </section>
          )}

          {activeId === 'gallery' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Siemens CoE</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Gallery<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <p className="text-slate-500 italic">No images currently available.</p>
            </section>
          )}

          {activeId === 'committee' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Siemens CoE</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Committee<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-4">
                <p className="mb-2">The Siemens Center of Excellence committee comprises the following faculty members:</p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-800">
                      <tr>
                        <th className="px-4 py-3 border-b border-slate-200">Faculty</th>
                        <th className="px-4 py-3 border-b border-slate-200">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3 align-top">Dr. Vikas Gupta</td>
                        <td className="px-4 py-3 align-top">Electronics and Telecommunication Engineering</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3 align-top">Mr. Prafulla Patil</td>
                        <td className="px-4 py-3 align-top">Instrumentation Engineering</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3 align-top">Ms. Kanchan Sarmalkar</td>
                        <td className="px-4 py-3 align-top">Instrumentation Engineering</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3 align-top">Mr. Vishal Pande</td>
                        <td className="px-4 py-3 align-top">Instrumentation Engineering</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3 align-top">Ms. Ekta Naik</td>
                        <td className="px-4 py-3 align-top">Electronics and Telecommunication Engineering</td>
                      </tr>
                      <tr className="odd:bg-white even:bg-slate-50/60">
                        <td className="px-4 py-3 align-top">Mr. Kamlesh Bachkar</td>
                        <td className="px-4 py-3 align-top">Mechanical Engineering</td>
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

export default CenterOfExcellenceSiemens;
