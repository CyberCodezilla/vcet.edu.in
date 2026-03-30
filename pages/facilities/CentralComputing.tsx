import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  Monitor,
  Server,
  Network,
  HardDrive,
  Cpu,
  Shield,
  Database,
  Layers,
} from 'lucide-react';

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const stats = [
  { icon: Layers,  value: '3',   label: 'Total Labs' },
  { icon: Monitor, value: '119', label: 'Total Computers' },
  { icon: Server,  value: '6',   label: 'Servers' },
];

/* ─── Staff ──────────────────────────────────────────────────────────────── */
const staff = [
  { role: 'Lab Incharge',  name: 'Mr. Amol Patil' },
  { role: 'Lab Assistant', name: 'Mr. Nilesh Patil' },
];

/* ─── Labs ───────────────────────────────────────────────────────────────── */
const labs = [
  {
    name: 'Lab 1',
    total: 30,
    image: '/images\Faculities\Central Computing Faculity\Central Computing Facilities\c1-1024x766.png',
    configs: [
      {
        heading: 'Configuration (30 PCs)',
        specs: [
          'HP Desktop 280 G3',
          'Core i3 – 7th Generation',
          '8 GB Memory',
          '1 TB SATA HDD',
          '18.5″ LED Monitor',
          'OS: Windows 10',
        ],
      },
    ],
  },
  {
    name: 'Lab 2',
    total: 26,
    image: '/images\Faculities\Central Computing Faculity\Central Computing Facilities\c2-1024x767.png',
    configs: [
      {
        heading: '20 PCs — 1 Server + 19 Clients',
        specs: [
          'HP Pro 3330 MT',
          'Core i3 – 3rd Generation',
          '4 GB Memory',
          '500 GB SATA HDD',
          '18.5″ LED Monitor',
          'OS: Windows 10',
          'Server OS: Windows Server 2008',
        ],
      },
      {
        heading: '6 Additional PCs',
        specs: [
          'HP Desktop 280 G2',
          'Core i3 – 6th Generation',
          '8 GB Memory',
          '1 TB SATA HDD',
          '18.5″ LED Monitor',
          'OS: Windows 10',
        ],
      },
    ],
  },
  {
    name: 'Lab 3',
    total: 63,
    image: '/images\Faculities\Central Computing Faculity\Central Computing Facilities\c3-1024x758.png',
    configs: [
      {
        heading: 'Configuration (63 PCs)',
        specs: [
          'HP Desktop 280 G3',
          'Core i3 – 7th Generation',
          '8 GB Memory',
          '1 TB SATA HDD',
          '18.5″ LED Monitor',
          'OS: Windows 10',
        ],
      },
    ],
  },
];

/* ─── Servers ────────────────────────────────────────────────────────────── */
const servers = [
  {
    id: 'Server 1',
    icon: Server,
    name: 'HP ProLiant 360e (Gen 8)',
    specs: [
      '16 GB Memory',
      '3 × 600 GB SAS HDD',
      'RAID 5 — Usable: 1.2 TB',
    ],
    software: ['Windows Server 2012 R2', 'Hyper-V', 'Active Directory'],
  },
  {
    id: 'Server 3',
    icon: Database,
    name: 'Tally ERP 9 Server',
    specs: [],
    software: ['Windows 8.1 Professional'],
  },
  {
    id: 'Server 4',
    icon: Shield,
    name: 'Seqrite 7.1 EPS Enterprise',
    specs: ['License Capacity: 1000 CAL'],
    software: [],
  },
  {
    id: 'Server 5',
    icon: Cpu,
    name: 'MATLAB Server',
    specs: [],
    software: ['Windows 7 Professional'],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
const CentralComputing: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Central Computing Facility"
        breadcrumbs={[
          { label: 'Central Computing Facility' },
        ]}
      />

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 bg-brand-navy overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(253,184,19,0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 28%), linear-gradient(135deg, #163a61 0%, #1a4b7c 48%, #10253e 100%)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="reveal max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 h-full"
                  style={{
                    borderRadius: '18px 34px 18px 34px',
                    transitionDelay: `${0.1 * idx}s`,
                  }}
                >
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/10 to-transparent" />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/65 font-bold mb-1">
                        {stat.label}
                      </div>
                      <div className="text-3xl md:text-4xl font-display font-bold text-white">
                        {stat.value}
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/20 flex items-center justify-center shrink-0">
                      <stat.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Computer Centre Details ───────────────────────────────────────── */}
      <section className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section heading */}
            <div className="text-center mb-12 reveal">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Computer Centre
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Computer Centre Details
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="reveal mb-8">
                <div className="rounded-2xl bg-gradient-to-r from-brand-blue to-brand-gold p-1 shadow-lg">
                  <div className="rounded-[14px] bg-brand-navy/80 backdrop-blur-sm px-5 py-3.5 text-center">
                    <p
                      className="text-lg text-white leading-snug"
                      style={{ fontFamily: 'Times New Roman, Times, serif' }}
                    >
                      Total Labs under Computer Centre: <span className="font-bold">3 Labs</span> - Lab 1, Lab 2, Lab 3
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff cards */}
              <div className="reveal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {staff.map((member, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 h-full min-h-[138px] flex flex-col justify-center"
                      style={{ transitionDelay: `${0.1 * idx}s` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1.5">
                        <div className="h-full bg-gradient-to-r from-brand-blue to-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1.5">
                          {member.role}
                        </div>
                        <div className="text-xl font-display font-bold text-brand-navy">
                          {member.name}
                        </div>
                        <div className="mt-4 h-px w-16 bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Computer Laboratories ─────────────────────────────────────────── */}
      <section className="py-12 md:py-14 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 reveal">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Infrastructure
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Computer Laboratories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {labs.map((lab, idx) => (
                <div
                  key={idx}
                  className="reveal group relative bg-white rounded-3xl border border-brand-blue/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ transitionDelay: `${0.08 * idx}s` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-brand-light to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full border border-brand-gold/30 bg-white/50 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-brand-navy group-hover:bg-white/80 transition-colors duration-300">
                    0{idx + 1}
                  </div>
                  <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />

                  {/* Lab image placeholder */}
                  <div
                    className="relative aspect-video flex items-center justify-center border-b border-brand-blue/10"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, rgba(26,75,124,0.08), rgba(253,184,19,0.07))',
                    }}
                  >
                    <span className="text-sm font-semibold text-brand-blue/40 tracking-wide">
                      {lab.image}
                    </span>
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                  </div>

                  <div className="relative p-5 md:p-6">
                    {/* Lab name + count */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] text-brand-gold font-bold mb-1">
                          Computer Laboratory
                        </div>
                        <h3 className="text-2xl font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                          {lab.name}
                        </h3>
                      </div>
                      <span className="bg-brand-gold/15 border border-brand-gold/35 text-brand-gold text-sm font-bold px-3 py-1 rounded-full shrink-0 mt-1">
                        {lab.total} PCs
                      </span>
                    </div>

                    <div className="space-y-4">
                    {lab.configs.map((cfg, cIdx) => (
                      <div
                        key={cIdx}
                        className={cIdx > 0 ? 'rounded-xl border border-brand-blue/10 bg-white/50 px-4 py-4' : ''}
                      >
                        <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-gold mb-3">
                          {cfg.heading}
                        </div>
                        <ul className="space-y-2.5">
                          {cfg.specs.map((s, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 font-medium">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Network Infrastructure ────────────────────────────────────────── */}
      <section
        className="py-12 md:py-14"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 15%, rgba(26,75,124,0.06), transparent 28%), radial-gradient(circle at 88% 82%, rgba(253,184,19,0.12), transparent 24%), linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 reveal">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Connectivity
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Network Infrastructure
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Structured network components that keep all computing labs and servers connected reliably.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="reveal mb-6" style={{ transitionDelay: '0.04s' }}>
                <div className="relative overflow-hidden rounded-3xl border border-brand-blue/20 bg-gradient-to-br from-brand-navy via-brand-blue to-brand-dark px-6 py-5 md:px-7 md:py-6 shadow-xl">
                  <div className="absolute -top-10 -right-6 h-24 w-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-brand-gold/15" />
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                      <Network className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brand-gold font-bold mb-1">
                        Network Backbone
                      </div>
                      <p className="text-sm md:text-base text-white/85 leading-relaxed font-medium">
                        CAT 6 structured cabling, managed gigabit switches, and rack-mounted patch systems provide stable, campus-ready connectivity for all computer laboratories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ transitionDelay: '0.08s' }}>
                {[
                  {
                    icon: Network,
                    title: 'Cabling',
                    detail: 'CAT 6 UTP Cable (D-Link)',
                  },
                  {
                    icon: Layers,
                    title: 'Switches',
                    detail: 'Cisco SG-300 52-Port Manageable Gigabit Switch with 3 cascaded switches',
                  },
                  {
                    icon: HardDrive,
                    title: 'Rack System',
                    detail: 'Installed in D-Link 27U Rack with Patch Panels',
                  },
                  {
                    icon: Server,
                    title: 'Server Link',
                    detail: 'Server Room connected directly to the Computer Centre',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden border border-brand-blue/10 bg-white p-5 shadow-sm hover:shadow-xl hover:border-brand-gold/35 transition-all duration-300"
                    style={{ borderRadius: '18px 34px 18px 34px', transitionDelay: `${0.06 * idx}s` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-light border border-brand-blue/10 flex items-center justify-center text-[10px] font-bold text-brand-blue/80">
                      {`0${idx + 1}`}
                    </div>
                    <div
                      className="w-11 h-11 bg-brand-light border border-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300"
                      style={{ borderRadius: '12px 18px 12px 18px' }}
                    >
                      <item.icon className="w-5 h-5 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-2">
                      {item.title}
                    </div>
                    <div className="text-sm text-[#333333] leading-relaxed font-medium min-h-[64px]">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Server Room ───────────────────────────────────────────────────── */}
      <section className="py-12 md:py-14 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 reveal">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Infrastructure
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Server Room Details
              </h2>
              <p className="mt-3 text-slate-500 text-sm md:text-base">
                One 42U Server Rack — 6 Servers
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 items-start">
              {/* Server cards */}
              <div className="reveal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {servers.map((srv, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 p-6 overflow-hidden h-full"
                      style={{ transitionDelay: `${0.05 * idx}s` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-gold opacity-80" />
                      <div className="absolute top-1 left-0 w-full h-full bg-gradient-to-b from-white via-slate-50 to-slate-100 opacity-60" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 border border-slate-200/90 shadow-inner">
                            <srv.icon className="w-6 h-6 text-brand-blue" />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                              {srv.id}
                            </div>
                            <div
                              className="text-lg font-semibold text-brand-navy leading-snug"
                              style={{ fontFamily: 'Times New Roman, Times, serif' }}
                            >
                              {srv.name}
                            </div>
                          </div>
                        </div>

                        {srv.specs.length > 0 && (
                          <ul className="mb-4 space-y-2 pl-1">
                            {srv.specs.map((s, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold/80 shrink-0" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}

                        {srv.software.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {srv.software.map((sw, swIdx) => (
                              <span
                                key={swIdx}
                                className="bg-slate-200/70 text-slate-800 text-xs font-medium px-3 py-1 rounded-full border border-slate-300/80"
                              >
                                {sw}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Note ──────────────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-center">
              <p className="text-base text-slate-600">
                <span className="font-semibold text-brand-navy">Need Access?</span> Students can
                access the Central Computing Facility during college hours. Contact the Lab
                Incharge, <span className="font-semibold text-brand-navy">Mr. Amol Patil</span>,
                for lab bookings or technical support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CentralComputing;
