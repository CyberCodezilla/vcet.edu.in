import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import PageBanner from '../components/PageBanner';
import texasGallery01Fallback from '../assets/texas-instruments-gallery-01.png';
import texasGallery02Fallback from '../assets/texas-instruments-gallery-02.png';
import texasGallery03Fallback from '../assets/texas-instruments-gallery-03.png';
import texasGallery04Fallback from '../assets/texas-instruments-gallery-04.png';
import texasGallery05Fallback from '../assets/texas-instruments-gallery-05.png';
import texasGallery06Fallback from '../assets/texas-instruments-gallery-06.png';
import texasGallery07Fallback from '../assets/texas-instruments-gallery-07.png';
import texasGallery08Fallback from '../assets/texas-instruments-gallery-08.png';
import texasGallery09Fallback from '../assets/texas-instruments-gallery-09.png';
import texasCommitteeVikasFallback from '../assets/texas-instruments-committee-vikas-gupta.png';
import texasCommitteeShaistaFallback from '../assets/texas-instruments-committee-shaista-khanam.png';

const sidebarLinks = [
  { id: 'about',      label: 'About',      icon: 'ph-info' },
  { id: 'objectives', label: 'Objectives', icon: 'ph-target' },
  { id: 'benefits',   label: 'Benefits',   icon: 'ph-trend-up' },
  { id: 'activities', label: 'Activities', icon: 'ph-activity' },
  { id: 'gallery',    label: 'Gallery',    icon: 'ph-image' },
  { id: 'committee',  label: 'Committee',  icon: 'ph-users-three' },
];

const withBaseUrl = (relativePath: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = relativePath.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
};

const TEXAS_GALLERY_IMAGES = [
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-01.png'),
    fallback: texasGallery01Fallback,
    alt: 'Texas Instruments Lab gallery image 1',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-02.png'),
    fallback: texasGallery02Fallback,
    alt: 'Texas Instruments Lab gallery image 2',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-03.png'),
    fallback: texasGallery03Fallback,
    alt: 'Texas Instruments Lab gallery image 3',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-04.png'),
    fallback: texasGallery04Fallback,
    alt: 'Texas Instruments Lab gallery image 4',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-05.png'),
    fallback: texasGallery05Fallback,
    alt: 'Texas Instruments Lab gallery image 5',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-06.png'),
    fallback: texasGallery06Fallback,
    alt: 'Texas Instruments Lab gallery image 6',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-07.png'),
    fallback: texasGallery07Fallback,
    alt: 'Texas Instruments Lab gallery image 7',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-08.png'),
    fallback: texasGallery08Fallback,
    alt: 'Texas Instruments Lab gallery image 8',
  },
  {
    primary: withBaseUrl('uploads/images/texas-instruments-gallery-09.png'),
    fallback: texasGallery09Fallback,
    alt: 'Texas Instruments Lab gallery image 9',
  },
];

const TEXAS_COMMITTEE_IMAGES = {
  vikas: {
    primary: withBaseUrl('uploads/images/texas-instruments-committee-vikas-gupta.png'),
    fallback: texasCommitteeVikasFallback,
    alt: 'Dr. Vikas Gupta portrait',
  },
  shaista: {
    primary: withBaseUrl('uploads/images/texas-instruments-committee-shaista-khanam.png'),
    fallback: texasCommitteeShaistaFallback,
    alt: 'Ms. Shaista Khanam portrait',
  },
};

const TexasInstrumentsLab: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const [galleryImageSrcs, setGalleryImageSrcs] = useState<string[]>(() =>
    TEXAS_GALLERY_IMAGES.map((image) => image.primary),
  );
  const [vikasCommitteeImageSrc, setVikasCommitteeImageSrc] = useState(
    TEXAS_COMMITTEE_IMAGES.vikas.primary,
  );
  const [shaistaCommitteeImageSrc, setShaistaCommitteeImageSrc] = useState(
    TEXAS_COMMITTEE_IMAGES.shaista.primary,
  );

  const handleGalleryImageError = (index: number) => {
    setGalleryImageSrcs((prev) => {
      if (prev[index] === TEXAS_GALLERY_IMAGES[index].fallback) {
        return prev;
      }

      const next = [...prev];
      next[index] = TEXAS_GALLERY_IMAGES[index].fallback;
      return next;
    });
  };

  const handleVikasCommitteeImageError = () => {
    setVikasCommitteeImageSrc((prev) =>
      prev === TEXAS_COMMITTEE_IMAGES.vikas.fallback
        ? prev
        : TEXAS_COMMITTEE_IMAGES.vikas.fallback,
    );
  };

  const handleShaistaCommitteeImageError = () => {
    setShaistaCommitteeImageSrc((prev) =>
      prev === TEXAS_COMMITTEE_IMAGES.shaista.fallback
        ? prev
        : TEXAS_COMMITTEE_IMAGES.shaista.fallback,
    );
  };

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
        title="Texas Instruments Lab" 
        breadcrumbs={[{ label: 'Texas Instruments Lab' }]} 
      />

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
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Texas Instruments Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                About
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-4 text-slate-600 leading-8">
                <p>
                  Texas Instruments Innovation Lab is dedicated to supporting educators, researchers and students in facilitating the inclusion of TI analog and embedded processing in engineering classrooms, teaching and research labs, textbooks, design projects and course curriculum.
                </p>
                <p>
                  It organizes seminars, exams and workshops for the students to make them industry ready. Industries prefer students having more practical knowledge along with theoretical knowledge. TI Innovative Lab assist students to come up with their own new project ideas and build them using TI kits.
                </p>
                <p>
                  TI lab is equipped with various kits of Texas Instruments. TI kits are available under three sections which are as follows:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ultra low power embedded kits (set of 21)</li>
                  <li>DSP Kit (Set of 4)</li>
                  <li>Robotics kits (set of 31)</li>
                </ul>
                <p>Students can have hands on practice on these kits and learn about it.</p>
              </div>
            </section>
          )}

          {activeId === 'objectives' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Texas Instruments Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Objectives
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-3 text-slate-600 leading-8">
                <p className="font-semibold text-brand-navy">The main objective of TexasInstruments Innovative Lab is</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To bridge the gap between industry and academics.</li>
                  <li>
                    To provide a competitive edge by helping students to learn, analyze and apply theoretical concepts and develop Industry level technology.
                  </li>
                  <li>
                    To provide experiential learning where students can solve real world problems using state of the art technical material.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activeId === 'benefits' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Texas Instruments Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Benefits
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-slate-600 leading-8">
                <li>Exposure to real industrial products.</li>
                <li>Hand on training on Siemens products &amp; certification with Siemens instruments University program logo.</li>
                <li>Shortened start-up times and faster troubleshooting for actual project development.</li>
                <li>Employability for students will increase.</li>
              </ul>
            </section>
          )}

          {activeId === 'activities' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Texas Instruments Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Activities
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-4">
                <p className="text-slate-600 leading-8">
                  Explore activity documents and annual summaries from the Texas Instruments Lab.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="/pdfs/homepage/TEXASInstruments/Activities/Summary.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>Summary</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="/pdfs/homepage/TEXASInstruments/Activities/2023-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>2023-24</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="/pdfs/homepage/TEXASInstruments/Activities/2022-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>2022-23</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="/pdfs/homepage/TEXASInstruments/Activities/2021-22.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors"
                  >
                    <span>2021-22</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                  <a
                    href="/pdfs/homepage/TEXASInstruments/Activities/2018-2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-navylight transition-colors sm:col-span-2"
                  >
                    <span>2018-21</span>
                    <i className="ph ph-arrow-square-out" />
                  </a>
                </div>
              </div>
            </section>
          )}

          {activeId === 'gallery' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Texas Instruments Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Gallery
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {TEXAS_GALLERY_IMAGES.map((image, idx) => (
                  <div
                    key={image.alt}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50"
                  >
                    <img
                      src={galleryImageSrcs[idx]}
                      alt={image.alt}
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                      onError={() => handleGalleryImageError(idx)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeId === 'committee' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                  Texas Instruments Lab
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">
                Committee
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
              </h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <article className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                    <img
                      src={vikasCommitteeImageSrc}
                      alt={TEXAS_COMMITTEE_IMAGES.vikas.alt}
                      className="aspect-square w-full object-cover bg-slate-100"
                      loading="lazy"
                      onError={handleVikasCommitteeImageError}
                    />
                    <div className="p-5 space-y-2 text-slate-700">
                      <h4 className="font-semibold text-brand-navy">Dr. Vikas Gupta, Professor &amp; Dean Academics</h4>
                      <p className="text-sm">9892251610</p>
                      <p className="text-sm break-all">vikas.gupta@vcet.edu.in</p>
                    </div>
                  </article>

                  <article className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                    <img
                      src={shaistaCommitteeImageSrc}
                      alt={TEXAS_COMMITTEE_IMAGES.shaista.alt}
                      className="aspect-square w-full object-cover bg-slate-100"
                      loading="lazy"
                      onError={handleShaistaCommitteeImageError}
                    />
                    <div className="p-5 space-y-2 text-slate-700">
                      <h4 className="font-semibold text-brand-navy">Ms. Shaista Khanam, Co-ordinator</h4>
                      <p className="text-sm">9321562213</p>
                      <p className="text-sm break-all">shaista.khanam@vcet.edu.in</p>
                    </div>
                  </article>
                </div>

                <div className="space-y-6 text-slate-700">
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-3">Members:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Dr. Archana Ekbote</li>
                      <li>Ms. Kanchan Sarmalkar</li>
                      <li>Ms. Trupti Shah</li>
                      <li>Mr. Mukund Kavekar</li>
                      <li>Ms. Krunali Vartak</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-navy mb-3">Lab Assistant:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Ms. Diksha Save</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-brand-navy mb-3">STUDENT COMMITTEE MEMBERS BE:</h4>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Kimaya Shejwalkar,Chairperson</li>
                      <li>Vaidehi Gohil,Secretary</li>
                      <li>Shikhar Mehta,Treasurer</li>
                      <li>Sarvesh Sant / Saurabh Chavan,Committee Coordinator</li>
                      <li>Nikhil Kargatia,Managing Head</li>
                      <li>Vaibhav Mishra / Rohit Arnalkar</li>
                      <li>Dhanashree Tandel,Publicity Head</li>
                      <li>Srushti Rane / Ankit Pandey,Social Media Head</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default TexasInstrumentsLab;
