import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Building2, Handshake, Users, GraduationCap, Briefcase, BookOpen, MapPin, Award } from 'lucide-react';

const activities = [
  {
    icon: Handshake,
    title: 'MoUs with Industries',
    description: 'Signing memoranda of understanding with leading companies for collaborative research, internships, and placement opportunities.',
  },
  {
    icon: Users,
    title: 'Guest Lectures',
    description: 'Inviting industry experts and practitioners to deliver guest lectures on current trends and technologies.',
  },
  {
    icon: MapPin,
    title: 'Industrial Visits',
    description: 'Organizing visits to manufacturing plants, IT companies, and research labs to provide students real-world exposure.',
  },
  {
    icon: Briefcase,
    title: 'Internship Facilitation',
    description: 'Connecting students with industry partners for summer and full-time internships aligned with their specializations.',
  },
  {
    icon: BookOpen,
    title: 'Curriculum Advisory',
    description: 'Industry advisory boards provide inputs on curriculum design to ensure relevance and employability of graduates.',
  },
  {
    icon: Building2,
    title: 'Collaborative Projects',
    description: 'Facilitating joint projects between faculty-student teams and industry partners on real-world challenges.',
  },
];

const stats = [
  { icon: Handshake, value: '30+', label: 'Active MoUs' },
  { icon: Users, value: '100+', label: 'Guest Lectures/Year' },
  { icon: MapPin, value: '50+', label: 'Industrial Visits' },
  { icon: Briefcase, value: '500+', label: 'Internships Facilitated' },
];

const highlights = [
  'Regular industry interaction meets with HR heads and technical leaders',
  'Industry-sponsored labs and equipment for hands-on learning',
  'Faculty internships and sabbaticals in industry for knowledge updation',
  'Joint workshops and hackathons with corporate partners',
  'Industry mentorship programs for final year project guidance',
  'Collaborative research projects addressing real-world problems',
  'Corporate social responsibility initiatives in partnership with companies',
  'Alumni in industry acting as ambassadors for IIIC activities',
];

const sidebarLinks = [
  { id: 'about',    label: 'About Industry-Institute Interaction Cell', icon: 'ph-info' },
  { id: 'roles',    label: 'Roles of Industry-Institute Interaction Cell', icon: 'ph-briefcase' },
  { id: 'mou',      label: 'MOU', icon: 'ph-handshake' },
  { id: 'projects', label: 'Collaborative Projects', icon: 'ph-buildings' },
  { id: 'events',   label: 'Events', icon: 'ph-calendar-star' },
];

const IIIC: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>
      <PageBanner
        title="IIIC"
        breadcrumbs={[
          { label: 'IIIC' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 lg:px-12 py-12 bg-[#F7F9FC]">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="lg:sticky lg:top-28 bg-white border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB] overflow-hidden">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-6 py-4 text-[15px] text-left transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#1a4b7c] text-[#fdb813] font-semibold'
                          : 'text-[#1a4b7c] font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <i className={`ph ${link.icon} text-xl ${ isActive ? '' : 'opacity-70'}`} />
                      {link.label}
                    </span>
                    {isActive && (
                      <i className="ph ph-arrow-right text-sm transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          
          {/* About Tab */}
          {activeId === 'about' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-justify md:text-left text-[15px]">
                <p>
                  In today&apos;s world, Engineering Institutions need to interact with the corresponding Industries for improving the quality of the Engineers by understanding their expectations. VCET has started Industry Institute Interaction Cell with this objective to have more Companies involved and our students will get benefit from the MOU&apos;s done with these companies. We facilitate students for interacting with the Company by organizing events and activities. We want to help students to improve their knowledge and skills and for getting them job in good Companies. This III Cell tries to provide internship, Industrial visit, Guest Lectures &amp; workshops for the students under MOU signed with the industries.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#1a4b7c] mb-4">Objectives</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>To bridge the gap between Industry and Institute.</li>
                    <li>To establish convergence with industrial and research organizations from various fields through MOUs as a form of interaction.</li>
                    <li>To establish Centre of Excellence by industry/ corporate to provide real time exposure on technologies.</li>
                    <li>To share the experience and expertise between Institutions and Industry for mutual benefit.</li>
                  </ol>
                </div>
              </div>
            </section>
          )}

          {/* Roles Tab */}
          {activeId === 'roles' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Roles of Industry-Institute Interaction Cell</h3>
                <ul className="list-disc pl-5 space-y-3">
                  <li>To give industrial exposure to Faculty members and students, thus enabling them to tune their knowledge to cope with the industrial culture.</li>
                  <li>Continuing Education and Training for Faculty.</li>
                  <li>Training &amp; Internship for Students.</li>
                  <li>B.E. Project work in industries under joint guidance of the faculty and experts from industry.</li>
                  <li>To assist the Departments in organizing workshops, conferences and symposia with joint participation of the industries.</li>
                  <li>Encouraging Engineers from industries to visit institution to deliver lectures.</li>
                  <li>To organize industrial visits for Faculty members and students.</li>
                  <li>To coordinate/ identify industrial partners for proposing &apos;Centre for Excellence&apos;.</li>
                  <li>To assist the Training and Placement Cell.</li>
                  <li>Visit of industry executives and practicing engineers to the institute for seeing research work and laboratories.</li>
                  <li>Memorandum of Understanding between the institute and industries to bring the two sides emotionally and strategically closer.</li>
                  <li>Visits of faculty to industry for study and discussions or delivering lectures on subjects of mutual interest.</li>
                  <li>Visiting faculty/professors from industries.</li>
                  <li>Practical training of students in industries.</li>
                </ul>
              </div>
            </section>
          )}

          {/* Events Tab */}
          {activeId === 'events' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Events</h3>
                <p>
                  Successfully completed Internship Program organized by IIIC, VCET and IETE, Mumbai centre. Students from VJTI, DBIT, Datta Meghe COE, Atharva COE, VIVA IT along with VCET participated.
                </p>
              </div>
            </section>
          )}

          {/* Placeholders for other tabs */}
          {activeId !== 'about' && activeId !== 'roles' && activeId !== 'events' && (
            <section className="reveal bg-white p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB] flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                <i className={`ph ${activeLink?.icon ?? 'ph-folder'} text-3xl text-[#1a4b7c]`} />
              </div>
              <h3 className="text-xl font-bold text-[#1a4b7c] mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">Content for this section is coming soon.</p>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default IIIC;

