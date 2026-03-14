import React from 'react';
import { Crown, Home, ChevronRight } from 'lucide-react';
import PageLayout from '../../components/PageLayout';

const chairman = {
  id: 1,
  role: 'Chairman',
  name: 'Sri. Vikas Vartak',
  description: 'Chairman Vidyavardhini',
  image: 'https://picsum.photos/seed/vikas/400/400',
};

const members = [
  { id: 2,  role: 'Member',           name: 'Sri. M.N. alias Bhausaheb Mohol',         description: 'Industrialist',                                  image: 'https://picsum.photos/seed/mohol/400/400'  },
  { id: 3,  role: 'Member',           name: 'Sri. Pandurang alias Babansheth Naik',    description: 'Educationist',                                   image: 'https://picsum.photos/seed/naik/400/400'   },
  { id: 4,  role: 'Member',           name: 'Sri. Hasmukh Shah',                       description: 'Industrialist',                                  image: 'https://picsum.photos/seed/shah/400/400'   },
  { id: 5,  role: 'Member',           name: 'Sri. Madhurkar B. Parekh',                description: 'Industrialist, Chairman of Pidilite Industries', image: 'https://picsum.photos/seed/parekh/400/400' },
  { id: 6,  role: 'Member',           name: 'Director of Technical Education (M.S.)', description: 'Ex-Officio',                                     image: 'https://picsum.photos/seed/dte/400/400'    },
  { id: 7,  role: 'Member',           name: 'Nominee of the University',              description: 'Ex-Officio',                                     image: 'https://picsum.photos/seed/uni/400/400'    },
  { id: 8,  role: 'Member',           name: 'Director, WRO AICTE',                   description: 'Ex-Officio',                                     image: 'https://picsum.photos/seed/aicte/400/400'  },
  { id: 9,  role: 'Member',           name: 'Educationalist / Industrialist',         description: 'Nominated by AICTE',                             image: 'https://picsum.photos/seed/edu/400/400'    },
  { id: 10, role: 'Member Secretary', name: 'Dr. Rakesh Himte',                       description: 'Principal',                                      image: 'https://picsum.photos/seed/himte/400/400'  },
  { id: 11, role: 'Member',           name: 'Dr. Uday Aswalekar',                     description: 'Staff Representative, Professor — Mechanical Engg.', image: 'https://picsum.photos/seed/aswalekar/400/400' },
  { id: 12, role: 'Member',           name: 'Dr. Archana Ekbote',                     description: 'Staff Representative, Assistant Professor — IT',  image: 'https://picsum.photos/seed/ekbote/400/400' },
];

export default function GoverningCouncil() {
  return (
    <PageLayout>
      <div className="w-full bg-white min-h-screen font-sans">

        {/* Blue Hero Header */}
        <div className="bg-[#1a4b7c] pt-4 pb-16 md:pb-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

          {/* Breadcrumb — top left */}
          <div className="relative z-10 flex items-center text-sm text-blue-200/80 gap-2 font-medium mb-10">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#fdb813]">Governing Council</span>
          </div>

          <div className="max-w-5xl mx-auto text-left relative z-10">

            {/* Eyebrow */}
            <div className="flex items-center justify-start gap-3 mb-6">
              <div className="w-12 h-px bg-[#fdb813]" />
              <p className="font-sans text-xs tracking-[0.3em] text-[#fdb813] font-bold uppercase">
                Leadership &amp; Governance
              </p>
              <div className="w-12 h-px bg-[#fdb813]" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              The Governing Council
            </h1>
            <p className="font-display text-lg text-blue-100 max-w-2xl leading-relaxed italic">
              A distinguished assembly of educators, industrialists, and visionaries
              dedicated to shaping the future of our academic community.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          <div className="space-y-16">

            {/* Chairman featured card */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-[#f8fafc] p-8 md:p-12 rounded-tr-[4rem] rounded-bl-[4rem] border border-gray-100 shadow-sm">
              {/* Photo with Crown badge */}
              <div className="relative shrink-0">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#fdb813] shadow-lg">
                  <img
                    src={chairman.image}
                    alt={chairman.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1a4b7c] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <Crown className="w-5 h-5 text-[#fdb813]" />
                </div>
              </div>

              {/* Text */}
              <div className="text-center md:text-left">
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fdb813]/60 mb-1">01</p>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fdb813] mb-2">
                  {chairman.role}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a4b7c] mb-3">
                  {chairman.name}
                </h2>
                <p className="text-slate-500 italic leading-relaxed text-lg">
                  {chairman.description}
                </p>
                <div className="mt-5 w-16 h-1 bg-[#fdb813] rounded-full md:mx-0 mx-auto" />
              </div>
            </div>

            {/* Remaining members grid */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-[#fdb813]" />
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fdb813]">
                  Council Members
                </p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="flex flex-col gap-6">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center gap-5 group">
                    {/* Serial number */}
                    {/* Circular photo */}
                    <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#fdb813] transition-all duration-300 shadow-sm">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#fdb813]/50 leading-none mb-1">{String(member.id).padStart(2, '0')}</p>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#fdb813] leading-none mb-1">
                        {member.role}
                      </p>
                      <h3 className="font-display font-bold text-[#1a4b7c] text-base leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </PageLayout>
  );
}
