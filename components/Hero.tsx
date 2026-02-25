import React, { useState } from 'react';
import { ArrowDown, Send, ChevronDown } from 'lucide-react';

const departments = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecom',
  'Mechanical Engineering',
  'Civil Engineering',
  'AI & Data Science',
  'Computer Science & DS',
];

const courses = ['B.E.', 'M.E.', 'MBA', 'MCA'];
const specializations = ['General', 'Cyber Security', 'Data Science', 'VLSI', 'Structural'];

const AdmissionForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', state: '', city: '',
    department: '', course: '', specialization: '', consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputCls = "w-full bg-white/[0.06] border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/45 focus:outline-none focus:border-brand-gold/70 focus:bg-white/[0.10] transition-all duration-200";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;
  const labelCls = "block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1";

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative mb-4 rounded-xl overflow-hidden flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #1a2a4a 0%, #0f1e38 60%, #7a5c00 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 9px)' }} />
        <div className="relative px-4 py-3 text-center">
          <span className="inline-block bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1.5">
            Now Accepting Applications
          </span>
          <h2 className="text-sm font-extrabold text-white tracking-tight leading-tight">
            Admissions Open<br />
            <span className="text-brand-gold text-base">2026 – 27</span>
          </h2>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5">
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-2">
            <div className="w-14 h-14 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center">
              <Send className="w-6 h-6 text-brand-gold" />
            </div>
            <p className="text-sm font-bold text-white">Thank you!</p>
            <p className="text-xs text-white/50">Our admissions team will reach out to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            {/* Name */}
            <div>
              <label className={labelCls}>Full Name</label>
              <input name="name" value={form.name} onChange={handle} required
                placeholder="Enter your full name"
                className={inputCls} />
            </div>

            {/* Email */}
            <div>
              <label className={labelCls}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} required
                placeholder="you@example.com"
                className={inputCls} />
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Mobile Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-2.5 bg-white/[0.06] border border-white/20 rounded-lg text-sm text-white/60 font-semibold flex-shrink-0">+91</span>
                <input name="phone" type="tel" value={form.phone} onChange={handle} required
                  placeholder="10-digit number"
                  className={`${inputCls} flex-1`} />
              </div>
            </div>

            {/* State + City */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>State</label>
                <input name="state" value={form.state} onChange={handle}
                  placeholder="State"
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input name="city" value={form.city} onChange={handle}
                  placeholder="City"
                  className={inputCls} />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className={labelCls}>Department</label>
              <div className="relative">
                <select name="department" value={form.department} onChange={handle} required className={selectCls}>
                  <option value="" disabled className="bg-brand-dark">Select Department</option>
                  {departments.map(d => <option key={d} value={d} className="bg-brand-dark">{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
              </div>
            </div>

            {/* Course + Specialization */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Course</label>
                <div className="relative">
                  <select name="course" value={form.course} onChange={handle} required className={selectCls}>
                    <option value="" disabled className="bg-brand-dark">Select</option>
                    {courses.map(c => <option key={c} value={c} className="bg-brand-dark">{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Specialization</label>
                <div className="relative">
                  <select name="specialization" value={form.specialization} onChange={handle} className={selectCls}>
                    <option value="" disabled className="bg-brand-dark">Select</option>
                    {specializations.map(s => <option key={s} value={s} className="bg-brand-dark">{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2 cursor-pointer group">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handle} required
                className="mt-0.5 w-3.5 h-3.5 accent-brand-gold flex-shrink-0 cursor-pointer" />
              <span className="text-[10px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors">
                I agree to be contacted by VCET regarding admissions via call, SMS or email.
              </span>
            </label>

            {/* Submit */}
            <button type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-yellow-400 text-brand-dark font-extrabold text-sm uppercase tracking-widest py-3 rounded-xl shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
              Submit Application
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center overflow-hidden bg-brand-dark text-white -mt-12 pt-12">

      {/* ── Static Background ──────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Static campus image — no animations, no overlay */}
        <img
          src="/Images/Home%20background/VCET-Home-1-scaled.jpg"
          alt="VCET Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 h-full w-full flex">
        {/* Left panel */}
        <div className="w-full md:w-[27.5%] h-full flex flex-col bg-brand-dark/[0.70] backdrop-blur-sm pt-16 pb-4 relative overflow-hidden" style={{ paddingLeft: 'clamp(1rem, 2vw, 1.75rem)', paddingRight: 'clamp(1rem, 2vw, 1.75rem)', maxWidth: '420px' }}>

          {/* Admission form — scrolls internally if content overflows */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
            <AdmissionForm />
          </div>

          {/* Quick Stats — always pinned at bottom inside the panel */}
          <div className="hero-anim flex-shrink-0 pt-3" style={{animationDelay: '0.65s'}}>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: '30+', label: 'Years' },
                { value: '5000+', label: 'Students' },
                { value: '96%', label: 'Placements' },
                { value: 'B++', label: 'NAAC' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="stat-glow text-center py-2.5 px-1 rounded-xl border border-brand-gold/30 bg-brand-dark/70 backdrop-blur-md cursor-default group transition-all duration-300 hover:bg-brand-dark/80 hover:border-brand-gold/50"
                >
                  <div className="text-base sm:text-lg md:text-xl font-bold text-brand-gold group-hover:scale-110 transition-transform duration-300 inline-block leading-tight whitespace-nowrap">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Scroll</span>
        <ArrowDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
