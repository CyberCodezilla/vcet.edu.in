import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const sidebarLinks = [
  { id: 'about',          label: 'About',          icon: 'ph-info' },
  { id: 'objectives',     label: 'Objectives',     icon: 'ph-target' },
  { id: 'benefits',       label: 'Benefits',       icon: 'ph-trend-up' },
  { id: 'specifications', label: 'Specifications', icon: 'ph-list-bullets' },
  { id: 'gallery',        label: 'Gallery',        icon: 'ph-image' },
];

const MachineryDiagnostics: React.FC = () => {
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
          <span className="text-brand-gold font-semibold">Machinery Diagnostics</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Machinery Diagnostics</span>
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
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Machinery Diagnostics</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">About<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-4">
                <p className="font-semibold">Industry Sponsored Lab by Performance Speciality Products India Pvt. Ltd.</p>
                <p>
                  The establishment of the Machinery Diagnostic Lab at VCET marks a significant advancement in engineering education and research capabilities. This state-of-the-art facility provides students with hands-on experience in diagnosing and monitoring the health of various machinery, fostering practical skills essential for modern engineering careers. By integrating advanced diagnostic tools and techniques, the lab enhances the curriculum, strengthens research, and prepares our graduates to excel in the rapidly evolving field of mechanical and industrial engineering. This initiative underscores VCET&apos;s commitment to offering a comprehensive and forward-thinking education, equipping students to meet the challenges of the future with confidence.
                </p>
                <p>
                  Machinery Diagnostic (MD) is an Industry 4.0 maintenance approach that predicts machine health and safety by means of sensors. It is carried out by the combination of machine sensor data that measures vibration and real-time parameters with state-of-the-art machine monitoring software. It is the latest technology and is gaining importance at a very fast rate. Every engineer, especially a mechanical engineer, is expected to have basic knowledge on health monitoring of industrial machines.
                </p>
              </div>
            </section>
          )}

          {activeId === 'objectives' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Machinery Diagnostics</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Objectives<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-3">
                <p className="font-semibold">Objectives :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>To anticipated well before failure the common defect in components and assembly in mechanical system.</li>
                  <li>To understand different forms of vibration signals generated by Industrial machines in real time to predict sudden failure.</li>
                  <li>To identify faults, reducing machine downtime, cost saving and optimizing the plant capacity.</li>
                  <li>To encourage and motivate students to undergo research, minor/major project.</li>
                </ul>
              </div>
            </section>
          )}

          {activeId === 'benefits' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Machinery Diagnostics</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Benefits<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Key benefits to the students</h4>
                  <p>
                    With the help of performing practical on the simulator, students will be able to know and understand how to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Increase process and system reliability.</li>
                    <li>Increase plant efficiency.</li>
                    <li>Decrease total cost of operation.</li>
                    <li>Reduce maintenance cost and increase total cost savings.</li>
                    <li>Prevent unplanned maintenance.</li>
                    <li>Improve the uptime / fault-free operation.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Key Benefits to Industry</h4>
                  <p>
                    With the required skills and exposure, the students can directly contribute to the industry in the following ways by:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Improving operator and machine productivity and performance.</li>
                    <li>Increasing job productivity and performance.</li>
                    <li>Enabling more informed Capex decisions.</li>
                    <li>Providing true root cause analysis.</li>
                    <li>Implementing automated data collection in an efficient way, avoiding time consumption.</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {activeId === 'specifications' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Machinery Diagnostics</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Specifications<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="text-slate-600 leading-8 space-y-8">
                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Data Acquisition Instrument</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Channels – 3 channels for eddy current sensors.</li>
                    <li>1 channel for IEPE accelerometer.</li>
                    <li>1 channel for velocity sensor.</li>
                    <li>1 channel for photoelectric speed sensor.</li>
                    <li>Resolution – 16 bits.</li>
                    <li>Max sample frequency – 100 k.</li>
                    <li>Interface – USB.</li>
                    <li>Power supply – 100 or 220 V AC.</li>
                    <li>Accessories: 1 USB cable, 1 power cable, 6 cables for sensors, 6 BNC cables.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Motor and Speed Adjusting Instruments</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Rotational speed – 12000 rpm.</li>
                    <li>Current – 2 A.</li>
                    <li>Voltage – 220 V.</li>
                    <li>Power – 300 VA.</li>
                    <li>5-bit LED to display rotation speed.</li>
                    <li>Power supply – 100 or 220 V AC.</li>
                    <li>Accessories: 1 power cable, 1 cable for motor connection.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Piezoelectric Speed Sensor</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Model – GDT-2.</li>
                    <li>Power supply – 5 to 15 V DC.</li>
                    <li>Support material – Aluminum.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-2">Eddy Current Sensor, Adapter and Support</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Model – 85811-01.</li>
                    <li>Measuring range – 2 mm.</li>
                    <li>Sensitivity – 4 mV/µm.</li>
                    <li>Resolution – 3 µm.</li>
                    <li>Frequency range – 0 to 2000 Hz.</li>
                    <li>Linearity – 2% FS.</li>
                    <li>Adapter power supply – 24 V DC.</li>
                    <li>Sensor temperature range – -30 to 120° C.</li>
                    <li>Adapter temperature range – -30 to 120° C.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-3">Equipment Highlights</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                        Image placeholder
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">Data Acquisition Instrument</p>
                        <p className="text-sm text-slate-600">High-speed multi-channel DAQ system for capturing vibration and speed signals.</p>
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                        Image placeholder
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">Motor and Speed Adjusting Instruments</p>
                        <p className="text-sm text-slate-600">Variable-speed motor setup for dynamic machinery diagnostics experiments.</p>
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                        Image placeholder
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">Piezoelectric Speed Sensor</p>
                        <p className="text-sm text-slate-600">High-sensitivity sensor for accurate rotational speed measurement.</p>
                      </div>
                    </div>
                    <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                        Image placeholder
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">Eddy Current Sensor, Adapter and Support</p>
                        <p className="text-sm text-slate-600">Non-contact displacement measurement system for shaft and component monitoring.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeId === 'gallery' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Machinery Diagnostics</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Gallery<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                    Image placeholder
                  </div>
                  <p className="text-sm text-slate-600">Machinery Diagnostics lab overview.</p>
                </div>
                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                    Image placeholder
                  </div>
                  <p className="text-sm text-slate-600">Students performing condition monitoring experiments.</p>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default MachineryDiagnostics;
