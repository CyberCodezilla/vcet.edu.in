import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Github, Linkedin, Globe, Code2, Users } from 'lucide-react';

interface DevProfile {
  name: string;
  githubUser: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  role: string;
}

const coreTeam: DevProfile[] = [
  {
    name: 'Shubham Pawar',
    githubUser: 'frag2win',
    githubUrl: 'https://github.com/frag2win',
    linkedinUrl: '#',
    portfolioUrl: '#',
    role: 'Lead Developer'
  },
  {
    name: 'ivory-26',
    githubUser: 'ivory-26',
    githubUrl: 'https://github.com/ivory-26',
    linkedinUrl: '#',
    portfolioUrl: '#',
    role: 'Backend Developer'
  },
  {
    name: 'CyberCodezilla',
    githubUser: 'CyberCodezilla',
    githubUrl: 'https://github.com/CyberCodezilla',
    linkedinUrl: '#',
    portfolioUrl: '#',
    role: 'Frontend Developer'
   
  },
  {
    name: 'yashhh-23',
    githubUser: 'yashhh-23',
    githubUrl: 'https://github.com/yashhh-23',
    linkedinUrl: '#',
    portfolioUrl: '#',
    role: 'Frontend Developer'
  },
  {
    name: 'RedRex101',
    githubUser: 'RedRex101',
    githubUrl: 'https://github.com/RedRex101',
    linkedinUrl: '#',
    portfolioUrl: '#',
    role: 'Frontend Developer'
  }
];

const fellowship: DevProfile[] = [
  { name: 'Sahil2802-coder', githubUser: 'Sahil2802-coder', githubUrl: 'https://github.com/Sahil2802-coder', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'sawantshreya008', githubUser: 'sawantshreya008', githubUrl: 'https://github.com/sawantshreya008', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'sumritasawant101-droid', githubUser: 'sumritasawant101-droid', githubUrl: 'https://github.com/sumritasawant101-droid', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'dakshata2405956201-svg', githubUser: 'dakshata2405956201-svg', githubUrl: 'https://github.com/dakshata2405956201-svg', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'shweta1909patil-maker', githubUser: 'shweta1909patil-maker', githubUrl: 'https://github.com/shweta1909patil-maker', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'Sumit Vishwakarma', githubUser: 'Sumitc0de', githubUrl: 'https://github.com/Sumitc0de', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'antarikshsingh', githubUser: 'antarikshsingh', githubUrl: 'https://github.com/antarikshsingh', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'PratikRaval24', githubUser: 'PratikRavale24', githubUrl: 'https://github.com/PratikRavale24', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'Pranish Harish Shetty', githubUser: 'pranishshetty', githubUrl: 'https://share.google/b5ZkgP5lON5wfUw4y', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'Rehan Pinjari', githubUser: 'rehanw1', githubUrl: 'https://github.com/rehanw1', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
  { name: 'Pritiyadav', githubUser: 'Pritiyadav6', githubUrl: 'https://github.com/Pritiyadav6', linkedinUrl: '#', portfolioUrl: '#', role: 'Student Fellowship' },
];

const mentors = [
  {
    name: 'Dr. Yogesh Pingle',
    roles: ['Deputy HOD & Assistant Professor, CSE(DS)', 'Website In-Charge, VCET'],
    imageUrl: 'https://ui-avatars.com/api/?name=Dr+Yogesh+Pingle&background=0D8ABC&color=fff&size=150'
  },
  {
    name: 'Mr. Nitin Shingane',
    roles: ['System Administrator, VCET'],
    imageUrl: 'https://ui-avatars.com/api/?name=Mr+Nitin+Shingane&background=0D8ABC&color=fff&size=150'
  },
  {
    name: 'Mr. Ashish Gosavi',
    roles: ['Technical Expert'],
    imageUrl: 'https://ui-avatars.com/api/?name=Mr+Ashish+Gosavi&background=0D8ABC&color=fff&size=150'
  }
];

const DevCard: React.FC<{ profile: DevProfile }> = ({ profile }) => (
  <div className="group relative flex flex-col items-center bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2563EB]/20 transition-all duration-300">
    <div className="relative w-24 h-24 mb-4">
      <div className="absolute inset-0 bg-[#2563EB]/10 rounded-full blur group-hover:bg-[#2563EB]/20 transition-all" />
      <img
        src={`https://github.com/${profile.githubUser}.png?size=150`}
        alt={profile.name}
        className="relative w-full h-full object-cover rounded-full border-2 border-white shadow-md relative z-10 bg-white"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0D8ABC&color=fff`;
        }}
      />
    </div>

    <h3 className="text-lg font-bold text-slate-800 text-center">{profile.name}</h3>
    <p className="text-sm text-[#2563EB] font-semibold mb-4 text-center">{profile.role}</p>

    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 w-full justify-center">
      <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors" title="GitHub Profile">
        <Github className="w-5 h-5" />
      </a>
      <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-colors" title="LinkedIn Profile">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-slate-400 hover:bg-amber-500/10 hover:text-amber-500 transition-colors" title="Portfolio Website">
        <Globe className="w-5 h-5" />
      </a>
    </div>
  </div>
);

const MentorCard: React.FC<{ profile: typeof mentors[0] }> = ({ profile }) => (
  <div className="group relative flex flex-col items-center bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2563EB]/20 transition-all duration-300 h-full">
    <div className="relative w-24 h-24 mb-4">
      <div className="absolute inset-0 bg-[#2563EB]/10 rounded-full blur group-hover:bg-[#2563EB]/20 transition-all" />
      <img
        src={profile.imageUrl}
        alt={profile.name}
        className="relative w-full h-full object-cover rounded-full border-2 border-white shadow-md relative z-10 bg-white"
        loading="lazy"
      />
    </div>

    <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{profile.name}</h3>
    {profile.roles.map((role, idx) => (
      <p key={idx} className="text-sm text-[#2563EB] font-medium text-center">{role}</p>
    ))}
  </div>
);

const Developers: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="VCET Dev Team"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Developers' }
        ]}
      />

      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl animate-fade-in">
          
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-[0.2em] uppercase mb-2">Guidance & Support</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-[#111827] flex items-center justify-center gap-4">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-[#2563EB]" />
              Mentors
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              The project was guided and supported by our faculty, ensuring alignment with institutional goals.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mb-24 justify-center">
             {mentors.map((mentor, i) => (
               <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                 <MentorCard profile={mentor} />
               </div>
             ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-[0.2em] uppercase mb-2">The architects</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-[#111827] flex items-center justify-center gap-4">
              <Code2 className="w-8 h-8 md:w-10 md:h-10 text-[#2563EB]" />
              Core Development Team
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              The driving force and vision behind the complete redevelopment of the VCET digital presence.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mb-24 justify-center">
             {coreTeam.map((dev, i) => (
               <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                 <DevCard profile={dev} />
               </div>
             ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-500 tracking-[0.2em] uppercase mb-2">Contributors</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-[#111827] flex items-center justify-center gap-4">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-[#2563EB]" />
               These are Devlophers how collaborated with the lead team
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              A dedicated team of students who collaborated to build features, manage data, and bring the platform to life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {fellowship.map((dev, i) => <DevCard key={i} profile={dev} />)}
          </div>

        </div>
      </section>
      
      <style>{`
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(15px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </PageLayout>
  );
};

export default Developers;
