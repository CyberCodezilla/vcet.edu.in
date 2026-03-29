import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import {
  Heart, TreePine, Droplets, Users, HandHeart, Tent, Leaf, Shield,
  ChevronRight, ChevronLeft, ArrowRight, ArrowDown, Target,
  MapPin, Calendar, Mail, Phone, Facebook, Instagram, Twitter, Home,
  Linkedin, ArrowUpRight,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const nssEvents = [
  {
    id: 1,
    title: 'Walkathon',
    subtitle: 'Road Safety Awareness',
    date: 'Sep 2023',
    location: 'Vasai',
    description:
      "Participated in a walkathon organized by Brahma Kumaris for road safety awareness. Volunteers joined people of all ages chanting 'Sadak Suraksha, Jeevan Raksha', concluding with refreshments.",
    bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Blood Donation',
    subtitle: 'Mega Donation Camp',
    date: 'Oct 11, 2023',
    location: 'VCET Campus',
    description:
      'In collaboration with the Leo Club of Vasai, organized a successful Blood Donation Camp. The event gathered 152 units of blood, thanks to enthusiastic volunteers who managed hospitality and donor care.',
    bgImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2083&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Mega Donation',
    subtitle: 'Clothes & Essentials',
    date: 'Sep – Oct 2023',
    location: 'Maratha Life Foundation',
    description:
      'A week-long drive to promote social responsibility. Students collected clothing, blankets, and food items which were donated to the underprivileged in the community.',
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Shramdaan',
    subtitle: 'Civic Responsibility',
    date: 'Oct 1, 2023',
    location: 'Vasai West Station',
    description:
      'Participated in a Shramdaan event organized by VVMC Municipality. Students joined others to clean nearby roads, parks, and public spaces, fostering pride and unity.',
    bgImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?q=80&w=2070&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Fit India Run',
    subtitle: 'Swachhata Freedom Run',
    date: 'Oct 5, 2023',
    location: 'Campus Surroundings',
    description:
      'Joined the Fit India Swachhata Freedom Run promoting fitness and citizen awareness. Volunteers ran two kilometers around campus, picking up litter to support a clean environment.',
    bgImage: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1925&auto=format&fit=crop',
    thumbImage: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=500&auto=format&fit=crop',
  },
];

const teamMembers = [
  {
    name: 'Dr. Pradip Gulbhile',
    role: 'NSS Co-ordinator',
    department: 'Humanity Department',
    email: 'pradip.gulbhile@vcet.edu.in',
    phone: '+91 9970042379',
    image: '/Images/NSS/dr-pradip-gulbhile.jpg',
  },
  {
    name: 'Mr. Suryanarayan Choudhury',
    role: 'NSS Leader',
    department: 'Core Committee 2024-25',
    email: null as string | null,
    phone: null as string | null,
    image: null as string | null,
  },
  {
    name: 'Ms. Divya Desai',
    role: 'Udaan President',
    department: 'Core Committee 2024-25',
    email: null as string | null,
    phone: null as string | null,
    image: null as string | null,
  },
];

const objectives = [
  {
    icon: Target,
    title: 'Understand Community',
    description:
      'To understand the community in which we work and to understand ourselves in relation to our community.',
  },
  {
    icon: HandHeart,
    title: 'Identify Needs',
    description:
      'Identify the needs and problems of the community and involve them in problem-solving processes.',
  },
  {
    icon: Users,
    title: 'Social Responsibility',
    description:
      'Develop among ourselves a sense of social and civic responsibility while utilizing our knowledge for practical solutions.',
  },
];

const stats = [
  { icon: Users, value: '300+', label: 'NSS Volunteers' },
  { icon: Heart, value: '50+', label: 'Blood Drives' },
  { icon: TreePine, value: '1000+', label: 'Trees Planted' },
  { icon: Tent, value: 'Annual', label: 'Village Camp' },
];

const activities = [
  {
    icon: Droplets,
    title: 'Blood Donation Drives',
    description:
      'Regular blood donation camps organized in association with local hospitals, saving countless lives and promoting the spirit of selfless service.',
  },
  {
    icon: Tent,
    title: 'Village Camps',
    description:
      'Annual residential camps in adopted villages where volunteers engage in community development, health awareness, and infrastructure improvement.',
  },
  {
    icon: Leaf,
    title: 'Environment Awareness',
    description:
      'Tree plantation drives, cleanliness campaigns, waste management initiatives, and awareness programs to protect and preserve the environment.',
  },
  {
    icon: HandHeart,
    title: 'Community Service',
    description:
      'Volunteering at old age homes, orphanages, and community centers to spread joy and provide support to those in need.',
  },
  {
    icon: Shield,
    title: 'Health & Hygiene Campaigns',
    description:
      'Organizing health check-up camps, hygiene awareness drives, and first aid training sessions for students and surrounding communities.',
  },
  {
    icon: Users,
    title: 'National Integration',
    description:
      'Participating in national-level NSS events, Republic Day and Independence Day celebrations, promoting unity and patriotism.',
  },
];

const milestones = [
  {
    title: 'Best NSS Unit Award',
    description:
      'Recognized as one of the best NSS units at the university level for outstanding community service and volunteer engagement.',
  },
  {
    title: 'Mega Blood Donation Camp',
    description:
      'Successfully organized a mega blood donation camp with over 200 units collected, making a significant contribution to the blood bank.',
  },
  {
    title: 'Swachh Bharat Initiative',
    description:
      'Active participation in the Swachh Bharat Mission with cleanliness drives across the campus and surrounding areas.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const NSS: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeEvent = nssEvents[activeIndex];

  const go = (next: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(next);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => go(activeIndex === 0 ? nssEvents.length - 1 : activeIndex - 1);
  const handleNext = () => go(activeIndex === nssEvents.length - 1 ? 0 : activeIndex + 1);
  const handleSelect = (i: number) => { if (i !== activeIndex) go(i); };

  return (
    <PageLayout>
      {/* ── Cinematic Hero / Overview ── */}
      <section className="relative w-full min-h-[100svh] bg-brand-dark overflow-hidden flex flex-col">

        {/* Background image + overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1593113563332-e14b5138ed2e?q=80&w=2070&auto=format&fit=crop"
            alt="NSS Volunteers"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/50 to-transparent" />
          <div className="absolute inset-0 bg-brand-dark/20" />
        </div>

        {/* Breadcrumb */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 pt-8">
          <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <a href="/" className="text-white/40 hover:text-brand-gold transition-colors">
              <Home className="w-3.5 h-3.5" />
            </a>
            <span className="text-white/20">/</span>
            <span className="text-brand-gold">NSS</span>
          </nav>
        </div>

        {/* Main content */}
        <main className="relative z-10 flex-grow flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-3xl">

            {/* Pill tag */}
            <div className="inline-flex items-center border border-white/25 rounded-full px-5 py-2 mb-8 bg-white/5 backdrop-blur-sm">
              <span className="text-white text-xs tracking-[0.25em] font-semibold uppercase">
                Not Me But You
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.05] mb-8 tracking-tight drop-shadow-lg">
              National <br /> Service <br />
              <span className="text-brand-gold">Scheme</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-12 leading-relaxed font-light drop-shadow">
              Instilling the values of community service, social responsibility, and selfless
              contribution in students — join us to make a positive impact on society.
            </p>

            {/* CTA */}
            <a
              href="#nss-events"
              className="inline-flex items-center gap-3 bg-white text-brand-navy px-8 py-4 rounded-full font-bold hover:bg-brand-gold hover:scale-105 transition-all duration-300 shadow-xl group"
            >
              <span className="tracking-widest text-sm uppercase">Explore Initiatives</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </main>

        {/* Right sidebar — socials + scroll */}
        <aside className="absolute right-8 md:right-12 top-0 h-full z-20 hidden lg:flex flex-col justify-center items-center gap-0">
          <div className="flex flex-col gap-6 mb-6">
            <a href="https://www.facebook.com/vcet.vasai.50/" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-brand-gold transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/official.vcet/" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-brand-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
          <div className="w-px h-20 bg-white/20" />
          <span className="text-white/40 text-[9px] tracking-[0.4em] font-bold -rotate-90 my-8 uppercase">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-white/40 animate-bounce" />
        </aside>

        {/* Stats bar pinned to hero bottom */}
        <div className="relative z-10 w-full border-t border-white/10 bg-brand-dark/60 backdrop-blur-md">
          <div className="container mx-auto px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center md:flex-row gap-4 py-6 px-6 md:px-8">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-display font-bold text-white leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Objectives ── */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Our Purpose
              </span>
              <div className="w-8 h-0.5 bg-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Our Objectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="reveal group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="w-14 h-14 bg-brand-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-gold/15 transition-colors duration-300">
                  <obj.icon className="w-7 h-7 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors duration-300">
                  {obj.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events Carousel ── */}
      <section id="nss-events" className="relative w-full min-h-[90vh] bg-brand-dark text-white overflow-hidden">
        {/* Crossfading background images */}
        {nssEvents.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${event.bgImage})`,
                transform: index === activeIndex ? 'scale(1)' : 'scale(1.05)',
                transition: 'transform 10s linear',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
          </div>
        ))}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full min-h-[90vh] flex flex-col md:flex-row gap-10 py-16 md:py-20">

          {/* Left: active event info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div
              className={`transition-all duration-700 ${
                isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  {activeEvent.subtitle}
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight uppercase tracking-tight">
                {activeEvent.title}
              </h2>

              <div className="flex flex-wrap gap-5 mb-6 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  {activeEvent.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  {activeEvent.location}
                </span>
              </div>

              <p className="text-base text-white/80 leading-relaxed border-l-4 border-brand-gold pl-4 bg-white/5 p-4 rounded-r-xl mb-8 backdrop-blur-sm">
                {activeEvent.description}
              </p>

              <button className="inline-flex items-center gap-3 bg-brand-gold text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-all duration-300 shadow-lg group w-fit">
                View Gallery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: clickable thumbnail strip */}
          <div className="w-full md:w-1/2 flex flex-col justify-end md:justify-center">
            {/* Strip header & controls */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold border-b border-white/20 pb-2 flex-grow mr-6">
                Event Highlights
              </h3>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-light text-white/50">
                  <span className="text-white font-bold">0{activeIndex + 1}</span> / 0{nssEvents.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable thumbnail cards */}
            <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 w-max">
                {nssEvents.map((event, index) => (
                  <div
                    key={event.id}
                    onClick={() => handleSelect(index)}
                    className={`relative cursor-pointer transition-all duration-500 ease-out flex-shrink-0 overflow-hidden rounded-2xl ${
                      index === activeIndex
                        ? 'w-56 h-72 ring-2 ring-brand-gold shadow-[0_0_28px_rgba(0,0,0,0.5)]'
                        : 'w-40 h-56 opacity-50 hover:opacity-80 hover:w-44 mt-8'
                    }`}
                  >
                    <img
                      src={event.thumbImage}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        index === activeIndex
                          ? 'bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent'
                          : 'bg-brand-dark/60'
                      }`}
                    />
                    <div
                      className={`absolute bottom-0 left-0 w-full p-4 transition-transform duration-300 ${
                        index === activeIndex ? 'translate-y-0' : 'translate-y-1'
                      }`}
                    >
                      <p className={`text-[10px] font-bold mb-1 uppercase tracking-wider ${
                        index === activeIndex ? 'text-brand-gold' : 'text-white/60'
                      }`}>
                        {event.date.split(',')[0]}
                      </p>
                      <h4 className="text-base font-display font-bold leading-tight uppercase text-white">
                        {event.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Activities ── */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Our Activities
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Serving the community through meaningful and impactful initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="reveal group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
                style={{ transitionDelay: `${0.05 * idx}s` }}
              >
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <activity.icon className="w-6 h-6 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership & Core Team ── */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                The People Behind It
              </span>
              <div className="w-8 h-0.5 bg-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Leadership &amp; Core Team
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Meet the dedicated individuals who guide and lead the NSS initiatives at VCET.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="reveal group relative bg-brand-dark rounded-[2rem] p-8 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-3"
                style={{
                  transitionDelay: `${0.1 * idx}s`,
                  boxShadow: "0 0 0 transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 20px 60px rgba(255,193,7,0.25)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 transparent")}
              >
                {/* Hover glow blob */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-gold blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                {/* Spinning dashed avatar ring */}
                <div className="relative mb-6 flex-shrink-0">
                  <div className="w-28 h-28 rounded-full border-2 border-dashed border-brand-gold/30 group-hover:rotate-180 transition-transform duration-700 absolute inset-0" />
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center border-2 border-white/10">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-3xl font-display font-bold text-brand-gold">
                        {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name / role / dept */}
                <h3 className="text-lg font-display font-bold text-white group-hover:text-brand-gold transition-colors duration-300 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">{member.role}</p>
                <p className="text-sm text-slate-400">{member.department}</p>

                {/* Contact — slide up on hover */}
                <div className="w-full overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 mt-0 group-hover:mt-8">
                  <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-xs"
                      >
                        <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-brand-gold flex-shrink-0">
                          <Mail className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{member.email}</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-3 text-slate-300 text-xs">
                        <span className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-brand-gold flex-shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                        </span>
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Milestones &amp; Recognition
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Achievements that reflect our commitment to service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="reveal group bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NSS;
