import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const sidebarLinks = [
  { id: 'about', label: 'About', icon: 'ph-info' },
  { id: 'objectives', label: 'Objectives', icon: 'ph-target' },
  { id: 'impact-vision', label: 'Impact and Future Vision', icon: 'ph-lightbulb-filament' },
  { id: 'features', label: 'Features', icon: 'ph-list-checks' },
  { id: 'specifications', label: 'Specifications', icon: 'ph-gear-six' },
];

const RoboticsLab: React.FC = () => {
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
          <span className="text-brand-gold font-semibold text-xs sm:text-sm">Robotics Lab</span>
        </nav>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl">Robotics Lab</span>
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
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Robotics Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                About
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-5 text-slate-600 leading-8">
                <article className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                  <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                    Image Placeholder
                  </div>
                  <div className="p-5">
                    <p className="font-semibold text-brand-navy">
                      Industry Sponsored Lab by Performance Speciality Products India Pvt. Ltd.
                    </p>
                  </div>
                </article>

                <p>
                  Industry sponsored Robotics Lab designated as a Centre of Excellence (CoE) at Vidyavardhinis College of Engineering &amp; Technology serves as a pivotal hub for pioneering advancements in robotics and automation. It symbolizes a commitment to pushing the boundaries of technology, fostering a culture of innovation, and addressing complex challenges through cutting-edge research and development. The establishment of such a centre is not merely an institutional achievement but a transformative initiative that aims to shape the future of industries, healthcare, education, and beyond.
                </p>
              </div>
            </section>
          )}

          {activeId === 'objectives' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Robotics Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Objectives
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-3 text-slate-600 leading-8">
                <p className="font-semibold text-brand-navy">Objectives :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-brand-navy">Innovation and Research:</span> The primary goal of the Robotics Lab is to drive innovation through rigorous research and development. The lab focuses on creating groundbreaking technologies and solutions that can redefine various sectors, from manufacturing to healthcare.
                  </li>
                  <li>
                    <span className="font-medium text-brand-navy">Educational Excellence:</span> By integrating robotics with the curriculum, lab aims to equip students with the skills and knowledge necessary to excel in the evolving landscape of technology. It provides hands-on experience, fostering a deep understanding of robotics principles and applications.
                  </li>
                  <li>
                    <span className="font-medium text-brand-navy">Industry Collaboration:</span> Lab seeks to build strong partnerships with industry leaders, enabling the translation of academic research into practical, real-world applications. These collaborations facilitate the development of commercially viable products and solutions.
                  </li>
                  <li>
                    <span className="font-medium text-brand-navy">Societal Impact:</span> The lab is dedicated to leveraging robotics to address societal challenges, such as improving healthcare delivery, enhancing disaster response, and advancing environmental sustainability. Also strives to create solutions that have a meaningful impact on society.
                  </li>
                  <li>
                    <span className="font-medium text-brand-navy">Talent Development:</span> The lab is committed to nurturing the next generation of robotics experts and innovators. It provides a platform for students, researchers, and professionals to develop their skills and contribute to the field of robotics.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activeId === 'impact-vision' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Robotics Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Impact and Future Vision
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-4 text-slate-600 leading-8">
                <p>
                  The Robotics Lab CoE aims to have a profound impact on various sectors by developing technologies that enhance efficiency, productivity, and safety. It envisions a future where robotics plays a crucial role in solving global challenges, from improving healthcare and education to enhancing industrial automation and sustainability.
                </p>
                <p>
                  By establishing a Centre of Excellence in robotics, the institute demonstrate their commitment to leading the way in technological innovation and making significant contributions to society.
                </p>
              </div>
            </section>
          )}

          {activeId === 'features' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Robotics Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Features
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-slate-600 leading-8">
                <li>
                  <span className="font-medium text-brand-navy">State-of-the-Art Infrastructure:</span> The Robotics Lab CoE is equipped with cutting-edge facilities, including advanced robotic platforms, simulation tools, and testing environments. These resources enable researchers and students to conduct high-quality experiments and develop innovative solutions.
                </li>
                <li>
                  <span className="font-medium text-brand-navy">Interdisciplinary Approach:</span> The lab fosters collaboration across various disciplines, and this interdisciplinary approach is essential for addressing the complex and multifaceted challenges in robotics.
                </li>
                <li>
                  <span className="font-medium text-brand-navy">Advanced Research Programs:</span> The lab supports a wide range of research programs focusing on areas such as autonomous systems, human-robot interaction and machine learning. These programs aim to push the frontiers of knowledge and technology.
                </li>
                <li>
                  <span className="font-medium text-brand-navy">Innovation Hub:</span> The lab serves as an innovation hub, encouraging the development of startup companies and fostering an entrepreneurial spirit among researchers and students. It provides support for turning innovative ideas into successful ventures.
                </li>
              </ul>
            </section>
          )}

          {activeId === 'specifications' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Robotics Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Specifications
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-8 text-slate-600 leading-8">
                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-3">Yasaka Robotic Arm</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Model no. YS07-930</li>
                    <li>Number of axes 6</li>
                    <li>Max. Payload 7 kg</li>
                    <li>Max. Stroke 930 mm</li>
                    <li>Approx. weight 60 kg (without cabinet)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-brand-navy mb-3">Rotrics DexArm</h4>
                  <p>
                    DexArm is a 4-axis desktop robot arm with modular design and 0.05mm high repeatability. It can be easily turned into a desktop plotter, laser engraver, and 3D printer.
                  </p>
                  <p className="mt-3 font-medium text-brand-navy">Including:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>DexArm</li>
                    <li>3D Printing Module</li>
                    <li>Laser Engraving Module</li>
                    <li>Rotary Soft Gripper Module</li>
                    <li>Rotary Suction Cup Module</li>
                    <li>Pen Holder Module</li>
                    <li>3.5-inch Touchscreen</li>
                    <li>Rotrics Studio Software (All functions and Scratch programming included)</li>
                    <li>PLA Filament</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                    <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                      Image Placeholder 1
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-brand-navy">Yasaka Robotic Arm</p>
                    </div>
                  </article>

                  <article className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                    <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                      Image Placeholder 2
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-brand-navy">Rotrics DexArm</p>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default RoboticsLab;
