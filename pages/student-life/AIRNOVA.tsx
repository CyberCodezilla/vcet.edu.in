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
    Facebook,
    Instagram,
    Trophy,
    MessageSquare,
    Check,
    Linkedin,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'vision' | 'objective' | 'competition' | 'sponsors' | 'team' | 'contact' | 'gallery';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
    { id: 'about', label: 'About', icon: Info, desc: 'Our story & mission' },
    { id: 'vision', label: 'Vision and Mission', icon: Eye, desc: 'Aims & future goals' },
    { id: 'objective', label: 'Objective', icon: Target, desc: 'Key focus areas' },
    { id: 'competition', label: 'About Competition', icon: Trophy, desc: 'Events & history' },
    { id: 'sponsors', label: 'Our Sponsors', icon: Award, desc: 'Our partners' },
    { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
    { id: 'contact', label: 'Contact', icon: MessageSquare, desc: 'Get in touch' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
];

const teamMembers = [
    { name: 'Rishabh Tripathi', contact: '9369744734', position: 'Captain' },
    { name: 'Prajjwal Vishwakarma', contact: '8108269351', position: 'Vice - Captain' },
    { name: 'Atharva Vaidya', contact: '7507094765', position: 'Team Manager' },
    { name: 'Kshitij Shetty', contact: '9284294433', position: 'Head of Aerodynamics' },
    { name: 'Umesh Mourya', contact: '9021379849', position: 'Head of Structure' },
    { name: 'Kunal Sharma', contact: '8605902057', position: 'Head of Propulsion' },
    { name: 'Gautham Kuckian', contact: '8369483349', position: 'Head of R&D' },
    { name: 'Ved Patil', contact: '7776093444', position: 'Head of Documentation' },
    { name: 'Pranay Gore', contact: '9619220898', position: 'Head of Finance' },
    { name: 'Raj Sutar', contact: '9004720324', position: 'Head of Social Media' },
    { name: 'Mitali Salve', contact: '8425914589', position: 'Member of Aerodynamics' },
    { name: 'Taher Barwaniwala', contact: '8238544856', position: 'Member of Aerodynamics' },
    { name: 'Anant Rai', contact: '7400399737', position: 'Member of Aerodynamics' },
    { name: 'Abhigya Hazra', contact: '9604297830', position: 'Member of Aerodynamics' },
    { name: 'Advait Tembvalkar', contact: '9273152409', position: 'Member of Structure' },
    { name: 'Ved Patil', contact: '7776093444', position: 'Member of Structure' },
    { name: 'Shreeyash Dadhekar', contact: '9834825779', position: 'Member of Structure' },
    { name: 'Ojas Sawant', contact: '7304540939', position: 'Member of Structure' },
    { name: 'Rahul Shah', contact: '8554807653', position: 'Member of Propulsion' },
    { name: 'Mihir Hakani', contact: '7888250785', position: 'Member of Propulsion' },
    { name: 'Vishal Sahani', contact: '9819107789', position: 'Member of Propulsion' },
    { name: 'Tushar Gawali', contact: '7028610722', position: 'Member of Propulsion' },
    { name: 'Onkar Suryavanshi', contact: '9834791693', position: 'Member of Propulsion' },
    { name: 'Hirenkumar Vyas', contact: '7400142387', position: 'Member of R&D' },
    { name: 'Pratham Ingawale', contact: '8104339869', position: 'Member of R&D' },
    { name: 'Harshkumar Devmurari', contact: '8793702047', position: 'Member of R&D' },
    { name: 'Kshitij Sonawane', contact: '9766028021', position: 'Member of R&D' },
    { name: 'Harshal Bhamare', contact: '9970536201', position: 'Member of R&D' },
    { name: 'Saurabh Rana', contact: '9881614757', position: 'Member of R&D' },
    { name: 'Mihir Gosavi', contact: '8806675142', position: 'Member of R&D' },
    { name: 'Pradip Pal', contact: '8928998530', position: 'Member of R&D' },
    { name: 'Prathamesh Thakare', contact: '9665515996', position: 'Member of R&D' },
    { name: 'Saurabh Shukla', contact: '7021621470', position: 'Member of R&D' },
    { name: 'Sanika Patil', contact: '8806056269', position: 'Member of Finance & Marketing' },
    { name: 'Richa Patel', contact: '9372929636', position: 'Member of Finance & Marketing' },
    { name: 'Nikita Mundaye', contact: '9326450374', position: 'Member of Finance & Marketing' },
    { name: 'Shreenand Pandere', contact: '7977854715', position: 'Member of Finance & Marketing' },
    { name: 'Pranay Gore', contact: '9619220898', position: 'Member of Finance & Marketing' },
    { name: 'Siddhesh Jalgaonkar', contact: '9370322818', position: 'Member of Finance & Marketing' },
    { name: 'Raj Sutar', contact: '9004720324', position: 'Member of Finance & Marketing' },
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
        { icon: Zap, value: 6, suffix: '+', label: 'Built Aircrafts', delay: 100 },
        { icon: Users, value: 150, suffix: '+', label: 'Team Members', delay: 200 },
        { icon: Trophy, value: 10, suffix: '+', label: 'National Events', delay: 300 },
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
                <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8 italic">Airnova By The Numbers</p>
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
            <SectionHeading title="About" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
                <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
                    <p>
                        Team Airnova is the official Aeronautics & Aerospace team of Vidyavardhini's College of Engineering & Technology; the main motto of the team is to spread awareness about Technological advancements in the Aviation and Spacecraft sector. The team was established in 2019 and made an official part of the college in 2020. Since then, despite the lockdown, Team Airnova has been conducting research on RC Aircrafts, UAVs and Spacecrafts. The team functions under the guidance of our faculty in-charge Prof. Apurva Pendbhaje and along with them has had support from our other college faculties.
                    </p>
                    <p>
                        The team provides a platform for all engineering students to come together and design, manufacture RC Aircrafts and UAVs to participate in competitions regarding the designing of UAVs & Aircrafts that can be implemented in the industry with regards to recent developments. Despite having a lockdown imposed post the formation, the team has participated in several competitions in this time.
                    </p>
                </div>

                <div className="lg:col-span-2 flex justify-center">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffb100]/20 to-[#0056b3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-4">
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.instagram.com/team_airnova"
                                alt="Scan to follow Team Airnova"
                                className="w-40 h-40 rounded-xl"
                            />
                            <div className="text-center">
                                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Scan to Follow</p>
                                <p className="text-[11px] text-[#94a3b8] mt-0.5">@team_airnova</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VisionPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="Vision and Mission" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1 flex flex-col items-center text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/3067/3067860.png" alt="Vision" className="w-24 h-24 mb-4 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md" style={{ filter: 'invert(75%) sepia(85%) saturate(3048%) hue-rotate(352deg) brightness(105%) contrast(106%)' }} />
                    <h4 className="text-2xl font-extrabold text-[#1a2b4b] mb-4">Vision</h4>
                    <p className="text-[#64748b] text-[15px] leading-relaxed">
                        To provide an opportunity to learn more about Aeronautics, Aerospace industrial aspects and apply them to provide industrial solutions at national and international events.
                    </p>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1 flex flex-col items-center text-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/4331/4331307.png" alt="Mission" className="w-24 h-24 mb-4 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md" style={{ filter: 'invert(75%) sepia(85%) saturate(3048%) hue-rotate(352deg) brightness(105%) contrast(106%)' }} />
                    <h4 className="text-2xl font-extrabold text-[#1a2b4b] mb-4">Mission</h4>
                    <ul className="text-[#64748b] text-[15px] leading-relaxed flex flex-col gap-2 items-center">
                        <li className="flex gap-2 text-left"><span className="text-[#082b64] font-bold mt-0.5">✔</span> To research and learn about different technological developments in the aeronautics and aerospace industry.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ObjectivePanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="Objectives :" />
            <div className="bg-white rounded-2xl p-4">
                <ul className="space-y-4 text-[#64748b] text-[15px] leading-relaxed">
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>To design aerodynamically efficient, structurally agile UAVs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>To innovate and experiment new methods of fabricating UAVs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>To design an electrically sound propulsion system to lessen the impact on the environment.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const CompetitionPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SectionHeading title="About Competition" />
            <div className="space-y-8">
                <div className="space-y-6 text-[#475569] leading-relaxed text-[15px]">
                    <p>
                        <strong className="text-[#1a2b4b]">Aerodominator 7.0 2020:</strong> Aerodominator 7.0 is a national level aero design competition brought to you by SAE-VIT. This micro class aero design competition has the main aim of designing and manufacturing an aircraft capable of carrying high payloads within a set of constraints.
                    </p>
                    <p>
                        <strong className="text-[#1a2b4b]">MSSA's IPASC 2021:</strong> The International Planetary Aerial Systems (IPAS) Challenge is a competition for university students to design a Mars Aerial System (Vehicle) which shall be fully equipped and mission ready for Operation on Mars. Teams are supposed to carefully plan each subsystem of the Aerial System considering various extra-terrestrial parameters in design (Exceptions if any shall be mentioned). This competition is designed for students to explore their mind and spark the innovative design thinking of Individuals without putting any constraints on available physical resources. Students are encouraged to be as imaginative, creative and insightful as possible within practical implementable limits for the human race.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-8">
                    <table className="w-full text-center divide-y divide-slate-200">
                        <thead className="bg-[#f8fafc]">
                            <tr>
                                <th className="p-4 text-sm font-bold text-[#1a2b4b] border-r border-slate-200 w-1/3">Airnova</th>
                                <th className="p-4 text-sm font-bold text-[#1a2b4b] border-r border-slate-200 w-1/3">Airnova</th>
                                <th className="p-4 text-sm font-bold text-[#1a2b4b] w-1/3">Airnova</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            <tr>
                                <td className="p-4 text-sm text-[#475569] border-r border-slate-200">Aerodominator 7.0 (virtual) 2020</td>
                                <td className="p-4 text-sm text-[#475569] border-r border-slate-200">MSSA's Interplanetary Aerial Systems Challenge 2021 (virtual)</td>
                                <td className="p-4 text-sm text-[#475569]">Gesture Controlled drone project</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-sm text-[#475569] border-r border-slate-200">16th (AIR)</td>
                                <td className="p-4 text-sm text-[#475569] border-r border-slate-200">Rank 21 Worldwide</td>
                                <td className="p-4 text-sm text-[#475569]">Research Project</td>
                            </tr>
                            <tr>
                                <td className="p-4 border-r border-slate-200">
                                    <div className="flex flex-col items-center">
                                        <img src="\images\StudentLife\CO-Curricular-activities\Student_clubs\Airnova\About_competion\Vaayuvaidya.png" alt="Vaayuvaidya" className="w-[80%] rounded-md object-cover mb-2" />
                                        <span className="text-sm text-[#475569] mt-2 block">Vaayuvaidya</span>
                                    </div>
                                </td>
                                <td className="p-4 border-r border-slate-200">
                                    <div className="flex flex-col items-center">
                                        <img src="\images\StudentLife\CO-Curricular-activities\Student_clubs\Airnova\About_competion\Dhairya.png" alt="Dhairya" className="w-[60%] rounded-md object-cover mb-2" />
                                        <span className="text-sm text-[#475569] mt-2 block">Dhairya</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-[#475569] flex justify-center items-center">
                                    <span className="mt-8 block">Coming soon</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            <div className="bg-white rounded-2xl p-4">
                <p className="text-[#64748b] text-[15px] leading-relaxed">
                    All of the events were financially managed by members of the team with support from our college providing reimbursements.
                </p>
            </div>
        </div>
    );
};

/* --- Full Panel Implementations --- */
const TeamPanel: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref as React.RefObject<Element>);
    return (
        <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

            {/* Faculty In Charge */}
            <div>
                <SectionHeading title="Faculty In Charge" />
                <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#082b64]/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                        <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center">
                            <img
                                src="\images\StudentLife\CO-Curricular-activities\Student_clubs\Airnova\Team\Vishwas_palve.jpg"
                                alt="Prof. Vishwas Palve"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <div>
                            <h4 className="text-2xl font-extrabold text-[#082b64]">Prof. -Vishwas Palve</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 justify-center md:justify-start text-[#475569]">
                                <div className="w-8 h-8 rounded-full bg-[#eaf3ff] flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-[#082b64]" />
                                </div>
                                <p className="text-sm font-medium">-Vishwas Palve @vcet.edu.in</p>
                            </div>
                            <div className="flex items-center gap-3 justify-center md:justify-start text-[#475569]">
                                <div className="w-8 h-8 rounded-full bg-[#fff8e7] flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-[#ffb100]" />
                                </div>
                                <p className="text-sm font-medium">+91 9870300102</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <SectionHeading title="Team Airnova 3.0 :" />
                <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
                    <table className="w-full text-left bg-white min-w-[600px]">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Sr. no.</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Name</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Contact</th>
                                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Post</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {teamMembers.map((member, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                                    <td className="p-4 text-sm text-[#64748b]">{idx + 1}.</td>
                                    <td className="p-4 text-sm font-bold text-[#1a2b4b]">{member.name}</td>
                                    <td className="p-4 text-sm text-[#64748b]">{member.contact}</td>
                                    <td className="p-4 text-sm text-[#64748b]">{member.position}</td>
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
            <SectionHeading title="Gallery" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl overflow-hidden aspect-video border border-slate-100 shadow-sm bg-slate-50 flex flex-col items-center justify-center text-[#94a3b8]">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-medium italic">Image Placeholder {i}</span>
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
            <div>
                <SectionHeading title="Contact Us" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-[#1a2b4b] mb-4">Address</h4>
                        <p className="text-[#475569] text-[15px] leading-relaxed max-w-sm">
                            Vidyavardhini's College of Engineering and Technology (VCET) K.T. Marg Vasai West. 401202
                        </p>
                        <div className="pt-6 space-y-6 border-t border-slate-100">
                            {[
                                { name: 'Prof. Vishwas Palve', phone: '+91 9870300102' },
                                { name: 'Ayush Panchal', phone: '+91 84229 89037' },
                                { name: 'Aditya Patane', phone: '+91 88792 13394' },
                            ].map((p, i) => (
                                <div key={i} className="space-y-1 text-left">
                                    <h5 className="text-sm font-bold text-[#1a2b4b]">{p.name}</h5>
                                    <p className="text-sm text-[#64748b]">{p.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 lg:items-end w-full lg:pt-12">
                        <div className="flex items-center gap-3 text-[#1a2b4b]/80 group">
                            <Mail className="w-5 h-5 text-[#475569] group-hover:text-[#ffb100] transition-colors" />
                            <a href="mailto:team.airnova.vcetofficial@gmail.com" className="text-[15px] font-medium hover:underline break-all">team.airnova.vcetofficial@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3 text-[#1a2b4b]/80 group">
                            <Instagram className="w-5 h-5 text-[#475569] group-hover:text-[#ffb100] transition-colors" />
                            <a href="https://www.instagram.com/team_airnova/" target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium hover:underline break-all">www.instagram.com/team_airnova/</a>
                        </div>
                        <div className="flex items-center gap-3 text-[#1a2b4b]/80 group">
                            <Linkedin className="w-5 h-5 text-[#475569] group-hover:text-[#ffb100] transition-colors" />
                            <a href="https://www.linkedin.com/company/team-airnova-1" target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium hover:underline break-all">www.linkedin.com/company/team-airnova-1</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   PAGE WRAPPER
───────────────────────────────────────────── */
const AirnovaPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('about');

    const handleTabChange = (id: TabId) => {
        setActiveTab(id);
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                document.getElementById('airnova-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    };

    return (
        <PageLayout>
            <PageBanner
                title="AIRNOVA"
                subtitle="Vidyavardhini's College of Engineering and Technology's official Aeronautics & Aerospace team."
                breadcrumbs={[
                    { label: 'Students Club', href: '/students-club' },
                    { label: 'AIRNOVA' }
                ]}
            />

            <StatsBanner />

            <section className="py-16 md:py-24 bg-[#f8fafc]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
                        <aside className="lg:col-span-1">
                            <div className="sticky top-28 space-y-4">
                                <nav className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-xl">
                                    <div className="px-5 py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50 italic">Navigation</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        {tabs.map((tab) => {
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => handleTabChange(tab.id)}
                                                    className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all duration-250 group relative ${isActive ? 'bg-[#1a2b4b] text-white shadow-md' : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                                                        }`}
                                                >
                                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100]" />}
                                                    <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-100'}`}>
                                                        <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#ffb100]' : 'text-[#64748b]'}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-[13px] font-bold leading-tight ${isActive ? 'text-white' : 'text-[#1a2b4b]'}`}>{tab.label}</p>
                                                        <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/50' : 'text-[#94a3b8]'}`}>{tab.desc}</p>
                                                    </div>
                                                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${isActive ? 'text-[#ffb100]' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </nav>

                                {/* AIRNOVA Highlights card */}
                                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative rounded-2xl shadow-md">
                                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-[#1a2b4b]" />
                                            </div>
                                            <h5 className="text-sm font-extrabold text-[#ffb100]">AIRNOVA Highlights</h5>
                                        </div>

                                        <div className="space-y-4">
                                            {[
                                                { icon: Users, val: '150+', label: 'Team Members' },
                                                { icon: Zap, val: '6+', label: 'Built Aircrafts' },
                                                { icon: Trophy, val: '10+', label: 'National Events' },
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
                                                Aiming high with innovation
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div id="airnova-content" className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[500px]">
                            {activeTab === 'about' && <AboutPanel />}
                            {activeTab === 'vision' && <VisionPanel />}
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

export default AirnovaPage;
