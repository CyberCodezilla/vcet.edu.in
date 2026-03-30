import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
    Users,
    Award,
    Zap,
    ChevronRight,
    Info,
    Calendar,
    Image as ImageIcon,
    Users2,
    Mail,
    Phone,
    Eye,
    Target,
    Trophy,
    MessageSquare,
    Check,
    Instagram,
    Youtube,
    Globe,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'objective' | 'competition' | 'sponsors' | 'team' | 'contact' | 'gallery';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
    { id: 'about', label: 'About', icon: Info, desc: 'Our story & mission' },
    { id: 'objective', label: 'Objective', icon: Target, desc: 'Key focus areas' },
    { id: 'competition', label: 'About Competition', icon: Trophy, desc: 'Events & history' },
    { id: 'sponsors', label: 'Our Sponsors', icon: Award, desc: 'Our partners' },
    { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
    { id: 'contact', label: 'Contact', icon: MessageSquare, desc: 'Get in touch' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
];

const team2023_24 = [
    { sr: 1, name: 'Krish Vaity', branch: 'Mechanical-BE', post: 'Captain' },
    { sr: 2, name: 'Naman Annadate', branch: 'Mechanical-BE', post: 'Vice – Captain' },
    { sr: 3, name: 'Prashant Dubey', branch: 'Mechanical-BE', post: 'PT member' },
    { sr: 4, name: 'Priyanshu Pawar', branch: 'Mechanical-FE', post: 'PT member' },
    { sr: 5, name: 'Preeti Gupta', branch: 'Mechanical-FE', post: 'PT member' },
    { sr: 6, name: 'Atharva Vaidya', branch: 'Mechanical-BE', post: 'Suspension member' },
    { sr: 7, name: 'Ayush Shinde', branch: 'Mechanical-FE', post: 'Suspension member' },
    { sr: 8, name: 'Maitreya Hole', branch: 'Mechanical-SE', post: 'Brakes member' },
    { sr: 9, name: 'Vivekkumar Gaud', branch: 'Mechanical-BE', post: 'Brakes member' },
    { sr: 10, name: 'Nilesh Pal', branch: 'Mechanical-BE', post: 'Brakes member' },
    { sr: 11, name: 'Aditya Sahani', branch: 'Mechanical-FE', post: 'Brakes member' },
    { sr: 12, name: 'Ronak Patel', branch: 'Mechanical-BE', post: 'Chassis member' },
    { sr: 13, name: 'Sachin Pal', branch: 'Mechanical-BE', post: 'Chassis member' },
    { sr: 14, name: 'Nikhil Solanke', branch: 'Comps-FE', post: 'Chassis member' },
    { sr: 15, name: 'Sumit Metkari', branch: 'Comps-FE', post: 'PR member' },
    { sr: 16, name: 'Bhavya Damani', branch: 'AI&DS-FE', post: 'PR member' },
    { sr: 17, name: 'Hiren Vyas', branch: 'AI&DS-BE', post: 'Self-balancing member' },
    { sr: 18, name: 'Yash Padhen', branch: 'IT-FE', post: 'Self-balancing member' },
    { sr: 19, name: 'Tejas Wani', branch: 'CSE/DS-BE', post: 'Sponsorship member' },
];

const team2019_20 = [
    { sr: 1, name: 'Mahendra Solanki', branch: 'Mechanical', post: 'Captain' },
    { sr: 2, name: 'Harshal Joshi', branch: 'Mechanical', post: 'Vice – Captain' },
    { sr: 3, name: 'Heramb Karpe', branch: 'Mechanical', post: 'Team member' },
    { sr: 4, name: 'Omkar Devrukhkar', branch: 'Mechanical', post: 'Team member' },
    { sr: 5, name: 'Nishant Bhilare', branch: 'Mechanical', post: 'Team member' },
    { sr: 6, name: 'Suman Biswas', branch: 'Mechanical', post: 'Team member' },
    { sr: 7, name: 'Navneet Prajapati', branch: 'EXTC', post: 'Team member' },
    { sr: 8, name: 'Hiren Goti', branch: 'EXTC', post: 'Team member' },
    { sr: 9, name: 'Swapnesh Karle', branch: 'EXTC', post: 'Team member' },
];

/* ─────────────────────────────────────────────
   HOOKS & UTILS
───────────────────────────────────────────── */
function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return inView;
}

function useCountUp(target: number, inView: boolean, duration = 1800) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);
    return count;
}

const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#082b64] mb-3 tracking-tight">{title}</h2>
        {subtitle && <p className="text-[#475569] text-base mb-4">{subtitle}</p>}
        <div className="flex gap-1.5 items-center">
            <div className="h-1 w-10 bg-[#ffb100] rounded-full" />
            <div className="h-1 w-6 bg-[#082b64] rounded-full" />
            <div className="h-1 w-3 bg-[#082b64]/30 rounded-full" />
        </div>
    </div>
);

const StatCard: React.FC<{ icon: any; value: number; suffix: string; label: string; delay: number; inView: boolean }> =
    ({ icon: Icon, value, suffix, label, delay, inView }) => {
        const count = useCountUp(value, inView, 1500);
        return (
            <div
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${delay}ms` }}
            >
                <div className="w-12 h-12 rounded-xl bg-[#ffb100]/20 flex items-center justify-center mb-4 text-[#ffb100]">
                    <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-extrabold text-white tabular-nums">
                    {count}{suffix}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">{label}</p>
            </div>
        );
    };

const StatsBanner: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>, 0.2);

    const stats = [
        { icon: Calendar, value: 5, suffix: '+', label: 'Years of Legacy', delay: 0 },
        { icon: Zap, value: 2, suffix: '+', label: 'E-Bike Prototypes', delay: 100 },
        { icon: Users, value: 50, suffix: '+', label: 'Team Members', delay: 200 },
        { icon: Trophy, value: 2, suffix: '', label: 'Major Events', delay: 300 },
    ];

    return (
        <div ref={ref} className="relative bg-[#1a2b4b] py-16 px-6 overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
                backgroundSize: '32px 32px',
            }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/30 to-transparent" />
            <div className="container mx-auto max-w-4xl relative z-10">
                <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8 italic">EMECHTO By The Numbers</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => <StatCard key={i} {...s} inView={inView} />)}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   PANELS
───────────────────────────────────────────── */

const AboutPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="VCET EMECHTO" subtitle="The Official E-bike team of Vidyavardhini's College of Engineering & Technology" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
                <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
                    <p>
                        Born in 2019, VCET EMECHTO revs up the future of sustainable mobility. With boundless innovation, we conquer national and international events, leading the revolution in sustainable mobility on two wheels.
                    </p>
                    <div className="bg-[#082b64]/5 border-l-4 border-[#ffb100] p-6 rounded-r-2xl italic text-[#1a2b4b]">
                        "Innovating to improve the landscape of electric mobility since 2019."
                    </div>
                </div>

                <div className="lg:col-span-2 flex justify-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffb100]/20 to-[#0056b3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-4 text-center">
                            <Zap className="w-12 h-12 text-[#ffb100] mb-2" />
                            <h4 className="font-bold text-[#1a2b4b]">Driving Innovation</h4>
                            <p className="text-xs text-[#64748b]">Fostering a culture of sustainable engineering and electric power.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ObjectivePanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    const objectives = [
        "To design and manufacture an E-Bike that has all the features of a high-class motorcycle delivered at an affordable price.",
        "To 'Innovate to improve' by introducing unique features like SELF BALANCING and DRIVERLESS PARKING.",
        "The team plans to achieve a 100% dynamically active self balancing bike that not only cutbacks accident rates but also provides better riding experience for the physically challenged or handicap persons.",
        "Future plans for advanced prototypes include elements such as gearbox, ABS braking, modified suspension system and much more."
    ];

    return (
        <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="Objectives :" />
            <div className="grid grid-cols-1 gap-4">
                {objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-[#1a2b4b]/5 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-[#082b64]" />
                        </div>
                        <p className="text-[#475569] text-[15px] leading-relaxed">{obj}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CompetitionPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="About Competition" />

            <div className="space-y-10">
                <div className="relative pl-8 border-l-2 border-[#ffb100]/30 space-y-4">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#ffb100] border-4 border-white shadow-sm" />
                    <h4 className="text-xl font-bold text-[#1a2b4b]">2023-24 EMechto 2.0</h4>
                    <p className="text-[#475569] text-[15px] leading-relaxed">
                        Established in 2019, VCET EMECHTO participated in the LUMINOUS SIEP E-BIKE CHALLENGE 2024 organized by Imperial Society of Innovative Engineers (ISIEINDIA) at IES University Bhopal from January 24th to 28th.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <div className="px-4 py-2 bg-[#eaf3ff] text-[#082b64] text-xs font-bold rounded-full">15th Rank Overall</div>
                        <div className="px-4 py-2 bg-[#fffaeb] text-[#b45309] text-xs font-bold rounded-full">1st Place : Business Plan & Cost</div>
                        <div className="px-4 py-2 bg-[#f0f9ff] text-[#0369a1] text-xs font-bold rounded-full">3rd Place : Design</div>
                    </div>
                </div>

                <div className="relative pl-8 border-l-2 border-slate-200/50 space-y-4">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm" />
                    <h4 className="text-xl font-bold text-[#1a2b4b]">2019-20 EMechto 1.0</h4>
                    <p className="text-[#475569] text-[15px] leading-relaxed">
                        The Asian E-Bike Challenge 2019 was held at Raghu Educational Institutions, Visakhapatnam on 25th to 29th September 2019. Team Emechto had secured an All India Rank of 12 in the championship.
                    </p>
                    <div className="inline-block px-4 py-2 bg-slate-100 text-[#475569] text-xs font-bold rounded-full">12th Rank Overall (AIR)</div>
                </div>
            </div>
        </div>
    );
};

const SponsorsPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="Our Sponsors" />
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col items-center text-center max-w-lg mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-[#fffaeb] flex items-center justify-center mb-6">
                    <Award className="w-10 h-10 text-[#ffb100]" />
                </div>
                <h4 className="text-xl font-bold text-[#1a2b4b] mb-4">Sponsorship Support</h4>
                <p className="text-[#64748b] leading-relaxed mb-6">
                    Team received sponsorship of <span className="text-[#082b64] font-black italic">Rs. 26,500</span> in the academic year 2023-24.
                </p>
                <p className="text-sm text-slate-400">Grateful for the support that makes our innovation possible.</p>
            </div>
        </div>
    );
};

const TeamPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {/* Faculty */}
            <div>
                <SectionHeading title="Faculty In Charge" />
                <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#082b64]/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center text-slate-400">
                            {/* Image Placeholder logic: if we had the actual image path, we'd use it here */}
                            <img
                                src="\images\StudentLife\CO-Curricular-activities\Student_clubs\EMECHTO\Mr.-RISHABH-Melwanki.jpg"
                                alt="Mr.Rishabh Melwanki"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <div>
                            <h4 className="text-2xl font-extrabold text-[#082b64]">Mr. Rishabh Melwanki</h4>
                            <p className="text-[#ffb100] font-black uppercase tracking-widest text-xs mt-1 italic">Faculty In-Charge</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 justify-center md:justify-start text-[#475569]">
                                <div className="w-8 h-8 rounded-full bg-[#eaf3ff] flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4 text-[#082b64]" /></div>
                                <p className="text-sm font-medium">rishabh.melwanki@vcet.edu.in</p>
                            </div>
                            <div className="flex items-center gap-3 justify-center md:justify-start text-[#475569]">
                                <div className="w-8 h-8 rounded-full bg-[#fff8e7] flex items-center justify-center flex-shrink-0"><Phone className="w-4 h-4 text-[#ffb100]" /></div>
                                <p className="text-sm font-medium">+91 9029353539</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team 2.0 */}
            <div>
                <SectionHeading title="EMechto 2.0 : Academic Year 2023-24" />
                <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                    <table className="w-full text-left bg-white min-w-[700px]">
                        <thead className="bg-[#f8fafc] border-b border-slate-100">
                            <tr>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60 w-16">Sr.</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Name</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Branch-Year</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Post</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {team2023_24.map((m, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-sm text-[#64748b]">{m.sr}.</td>
                                    <td className="p-4 text-sm font-bold text-[#1a2b4b]">{m.name}</td>
                                    <td className="p-4 text-sm text-[#64748b]">{m.branch}</td>
                                    <td className="p-4 text-sm text-[#082b64] font-medium">{m.post}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Team 1.0 */}
            <div>
                <SectionHeading title="EMechto 1.0 : Academic Year 2019-20" />
                <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                    <table className="w-full text-left bg-white min-w-[700px]">
                        <thead className="bg-[#f8fafc] border-b border-slate-100">
                            <tr>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60 w-16">Sr.</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Name</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Branch</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Post</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {team2019_20.map((m, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-sm text-[#64748b]">{m.sr}.</td>
                                    <td className="p-4 text-sm font-bold text-[#1a2b4b]">{m.name}</td>
                                    <td className="p-4 text-sm text-[#64748b]">{m.branch}</td>
                                    <td className="p-4 text-sm text-[#082b64] font-medium">{m.post}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const GalleryPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="Gallery" subtitle="Memorable moments from our journey" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="group relative rounded-3xl overflow-hidden aspect-video shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                            <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                            <span className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Image Holder {i}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ContactPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="Address" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <p className="text-[#475569] text-[15px] leading-relaxed">
                        Vidyavardhini's College of Engineering and Technology (VCET)<br />
                        K.T. Marg Vasai West. 401202
                    </p>
                    <div className="pt-8 space-y-8 border-t border-slate-100">
                        <div className="space-y-1">
                            <h5 className="text-sm font-black uppercase tracking-widest text-[#1a2b4b]">Mr. Rishabh Melwanki</h5>
                            <p className="text-sm text-[#64748b]">+91 9029353539</p>
                        </div>
                        <div className="space-y-1">
                            <h5 className="text-sm font-black uppercase tracking-widest text-[#1a2b4b]">Mr. Maitreya Hole</h5>
                            <p className="text-sm text-[#64748b]">+91 9028299869</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:items-end w-full lg:pt-0">
                    <a href="mailto:teamemechto@vcet.edu.in" className="flex items-center gap-4 group">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#64748b] opacity-50">Email</p>
                            <p className="text-[15px] font-bold text-[#1a2b4b] group-hover:text-[#ffb100] transition-colors break-all">teamemechto@vcet.edu.in</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#082b64]/5 flex items-center justify-center group-hover:bg-[#082b64] group-hover:text-white transition-all"><Mail className="w-5 h-5" /></div>
                    </a>
                    <a href="https://www.instagram.com/team_emechto/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#64748b] opacity-50">Instagram</p>
                            <p className="text-[15px] font-bold text-[#1a2b4b] group-hover:text-[#ffb100] transition-colors break-all">@team_emechto</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#082b64]/5 flex items-center justify-center group-hover:bg-[#e1306c] group-hover:text-white transition-all"><Instagram className="w-5 h-5" /></div>
                    </a>
                    <a href="https://www.youtube.com/@TEAMVCETEMECHTO" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#64748b] opacity-50">YouTube</p>
                            <p className="text-[15px] font-bold text-[#1a2b4b] group-hover:text-[#ffb100] transition-colors break-all">TEAMVCETEMECHTO</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#082b64]/5 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all"><Youtube className="w-5 h-5" /></div>
                    </a>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   PAGE WRAPPER
───────────────────────────────────────────── */
const EmechtoPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('about');

    const handleTabChange = (id: TabId) => {
        setActiveTab(id);
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                document.getElementById('emechto-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    };

    return (
        <PageLayout>
            <PageBanner
                title="EMECHTO"
                subtitle="The Official E-bike team of Vidyavardhini's College of Engineering & Technology."
                breadcrumbs={[
                    { label: 'Students Club', href: '/students-club' },
                    { label: 'EMECHTO' }
                ]}
            />

            <StatsBanner />

            <section className="py-16 md:py-24 bg-[#f8fafc]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
                        <aside className="lg:col-span-1">
                            <div className="sticky top-28 space-y-4">
                                <nav className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/40 italic">Navigation</p>
                                    </div>
                                    <div className="p-2.5 space-y-1">
                                        {tabs.map((tab) => {
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => handleTabChange(tab.id)}
                                                    className={`w-full text-left flex items-center gap-4 px-4 py-4 transition-all duration-300 group relative rounded-xl ${isActive ? 'bg-[#1a2b4b] text-white shadow-lg' : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                                                        }`}
                                                >
                                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#ffb100] rounded-r-full" />}
                                                    <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-xl transition-all ${isActive ? 'bg-white/10 ring-1 ring-white/20' : 'bg-slate-100'}`}>
                                                        <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#ffb100]' : 'text-[#64748b]'}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-[14px] font-bold leading-tight ${isActive ? 'text-white' : 'text-[#1a2b4b]'}`}>{tab.label}</p>
                                                        <p className={`text-[10px] mt-0.5 tracking-wide ${isActive ? 'text-white/50' : 'text-[#94a3b8]'}`}>{tab.desc}</p>
                                                    </div>
                                                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${isActive ? 'text-[#ffb100] translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </nav>

                                {/* EMECHTO Highlights card */}
                                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative rounded-2xl shadow-md">
                                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-[#1a2b4b]" />
                                            </div>
                                            <h5 className="text-sm font-extrabold text-[#ffb100]">EMECHTO Highlights</h5>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { icon: Users, val: '50+', label: 'Team Members' },
                                                { icon: Zap, val: '2+', label: 'E-Bike Prototypes' },
                                                { icon: Trophy, val: '2', label: 'Major Events' },
                                                { icon: Calendar, val: '5+', label: 'Years of Legacy' },
                                            ].map(({ icon: Icon, val, label }) => (
                                                <div key={label} className="flex items-center gap-3">
                                                    <Icon className="w-3.5 h-3.5 text-[#ffb100]/80 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-base font-extrabold leading-none">{val}</p>
                                                        <p className="text-[9px] uppercase font-black tracking-widest text-white/40">{label}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-5 pt-5 border-t border-white/10">
                                            <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                                                Innovating for sustainable mobility
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div id="emechto-content" className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] overflow-hidden min-h-[600px]">
                            {activeTab === 'about' && <AboutPanel />}
                            {activeTab === 'objective' && <ObjectivePanel />}
                            {activeTab === 'competition' && <CompetitionPanel />}
                            {activeTab === 'sponsors' && <SponsorsPanel />}
                            {activeTab === 'team' && <TeamPanel />}
                            {activeTab === 'gallery' && <GalleryPanel />}
                            {activeTab === 'contact' && <ContactPanel />}
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default EmechtoPage;
