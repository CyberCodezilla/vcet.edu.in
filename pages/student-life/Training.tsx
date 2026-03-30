import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { BookOpen, Users, Monitor, Briefcase, Target, Award, Lightbulb, Wrench, Check } from 'lucide-react';

const trainingPrograms = [
  {
    icon: Users,
    title: 'Soft Skills Development',
    description: 'Communication skills, presentation techniques, group discussions, team building, and leadership training to enhance professional competence.',
  },
  {
    icon: Monitor,
    title: 'Aptitude Training',
    description: 'Comprehensive aptitude training covering quantitative ability, logical reasoning, verbal ability, and data interpretation for placement readiness.',
  },
  {
    icon: Wrench,
    title: 'Technical Workshops',
    description: 'Hands-on technical workshops on emerging technologies, programming languages, tools, and frameworks relevant to industry requirements.',
  },
  {
    icon: Briefcase,
    title: 'Mock Interviews',
    description: 'Regular mock interview sessions with industry professionals to prepare students for actual placement interviews.',
  },
  {
    icon: BookOpen,
    title: 'Resume Building',
    description: 'Guidance on crafting effective resumes, cover letters, and LinkedIn profiles that stand out to recruiters.',
  },
  {
    icon: Target,
    title: 'Industry Certifications',
    description: 'Facilitating industry-recognized certifications from Google, AWS, Microsoft, Cisco, and other leading technology companies.',
  },
];

const stats = [
  { icon: Users, value: '1000+', label: 'Students Trained Annually' },
  { icon: Briefcase, value: '50+', label: 'Training Sessions' },
  { icon: Award, value: '20+', label: 'Industry Partners' },
  { icon: Lightbulb, value: '15+', label: 'Certification Programs' },
];

const trainingHighlights = [
  'Year-round training calendar aligned with placement cycles',
  'Dedicated training team with industry-experienced trainers',
  'Training needs assessment based on industry trends and feedback',
  'Personalized training tracks for different career aspirations',
  'Assessment and feedback mechanism for continuous improvement',
  'Bridge courses for students from diverse academic backgrounds',
  'Online resources and practice platforms for self-paced learning',
  'Guest sessions by industry leaders and successful alumni',
];

const sidebarLinks = [
  { id: 'training',  label: 'Training', icon: 'ph-chalkboard-teacher' },
  { id: 'events',    label: 'Events', icon: 'ph-calendar-star' },
  { id: 'career',    label: 'Career Guidance', icon: 'ph-compass' },
  { id: 'internship',label: 'Internship', icon: 'ph-briefcase' },
  { id: 'gallery',   label: 'Gallery', icon: 'ph-image' },
];

const StyledPointList: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered = false }) => (
  <div className="border-2 border-[#adb9c6] overflow-hidden bg-white shadow-none">
    <table className="w-full border-separate border-spacing-0">
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={`group transition-all duration-200 hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#d7e5f2]'
            }`}
          >
            <td className="px-4 md:px-5 py-4 border-b border-[#d4dbe3] transition-all duration-200 group-hover:py-[18px]">
              <div className="flex items-start gap-[14px] transition-transform duration-200 group-hover:translate-x-0.5">
                <span className="mt-0.5 inline-flex w-9 h-9 rounded-lg bg-[#fff7df] border border-[#ffe3a7] items-center justify-center text-[#1a4b7c] flex-shrink-0">
                  {ordered ? <span className="text-sm font-extrabold">{index + 1}</span> : <Check className="w-4 h-4" strokeWidth={2.5} />}
                </span>
                <p className="text-base md:text-lg leading-[1.7] text-[#333333]">{item}</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Training: React.FC = () => {
  const [activeId, setActiveId] = React.useState('training');
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
        title="Training"
        breadcrumbs={[
          { label: 'Training' },
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
          
          {/* Training Tab */}
          {activeId === 'training' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Training</h3>
                <p>
                  To gear-up the students for facing the recruitment process successfully, an extensive pre-placement training on aptitude, group discussions, interviews and presentation is offered to the students. The various measures taken in line with this are:
                </p>
                <div className="mt-8">
                  <StyledPointList
                    items={[
                      'Scheduling of pre-placement training programs in conjunction with academic schedule',
                      'Conducting Aptitude Development training sessions right from the third year of UG program',
                      'Collaborating with leading training agencies like IMS, Campus credential, Career Launcher for conduction of Aptitude Development training & Soft skills development to provide high-quality training by seasoned trainers experienced in corporate education.',
                      'Conducting technical and domain specific training sessions',
                      'Orientation of students on core companies opportunities and preparations required for placements.',
                      "Identification of students' soft skills and Aptitude development/training needs and provide additional sessions either through external/internal resources.",
                    ]}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Events Tab */}
          {activeId === 'events' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Events</h3>
                
                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 text-[#1a4b7c] border-b border-slate-200">
                        <th className="p-4 font-semibold w-16">SR.</th>
                        <th className="p-4 font-semibold w-1/4">Name of the Event</th>
                        <th className="p-4 font-semibold w-1/2">Company Name / Resource Person</th>
                        <th className="p-4 font-semibold w-32">Date of conduction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      
                      {/* Row 1 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">1</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          Aptitude Training
                          <img src="/Images/Trainging & Placement/Training/training-events1.png" alt="Aptitude Training" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span> 
                            Career Launcher (a part of CL Educate Ltd) focuses on diverse segments of learners across multiple age groups. Led by a team of highly qualified professionals, including IIT-IIM alumni, with a passion for excellence in education.
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span> 
                            Aptitude Training for students is arranged by Career Launcher team.
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">Since 2019</td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">2</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          AMCAT Test
                          <img src="/images/Trainging & Placement/Training/training-events2.png" alt="AMCAT Test" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            AMCAT (Aspiring Minds Computer Adaptive Assessment) is India&apos;s largest Employability Assessment and is recognized by over many companies. AMCAT gives candidates detailed feedback of their employability (seven stroke feedback) and helps connect them to over 40,000 entry level jobs every year.
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Duration of test &ndash; 03 hours
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">Since 2019</td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">3</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          Aptitude Test Series
                                  <img src="/images/Trainging & Placement/Training/training-events3.jpg" alt="Aptitude Test Series" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />

                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            CoCubes is India&apos;s leading assessment and hiring platform. They run assessments to measure employability across all domains &ndash; from programming to plumbing
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            CoCubes schedules regular aptitude exams and its assessments for our students allround the year
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">Since 2017</td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">4</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          MaTPO Aptitude Idol-2019
                           <img src="/images/Trainging & Placement/Training/training-events4.png" alt="MaTPO Aptitude Idol-2019" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Maharashtra Association of TPOs (MaTPO) organized the Online Aptitude Test to improve Employability of students so that these students can get better employability exposure.
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            MaTPO APTITUDE IDOL-2019 Round I was scheduled on 22nd July, 2019. Total 331 final year students from all branches of VCET participated in the round.
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">2019-20</td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">5</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          Refresher Course on Technical interview Preparation.
                             <img src="/images/Trainging & Placement/Training/training-events5.png" alt="Refresher Course on Technical interview Preparation" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />

                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Refresher courses for enhancing basic programming skills and skills pertaining to the program are organized by the &quot;Training &amp; Placement Cell.&quot; These courses focus on reviewing and updating knowledge and skills required for clearing the aptitude
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            VCET Faculties conducts refreshers course for students of all the branches
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">Every Year</td>
                      </tr>

                      {/* Row 6 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">6</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          Aptitude Training by Campus Credentials
                            <img src="/images/Trainging & Placement/Training/training-events6.png" alt="Aptitude Training by Campus Credentials" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Campus Credential is a training institute and has established itself as Forerunner in Competitive Exam training
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Students in the Year 2017-18 &amp; 2018-19 received aptitude training from this company.
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">2017 to 2019</td>
                      </tr>

                      {/* Row 7 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">7</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          Mock Interview
                           <img src="/images/Trainging & Placement/Training/training-events7.png" alt="Mock Interview" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Mock Interview sessions were organized at VCET for helping student getting hands on experience for facing the interviewers face to face and tackle difficult questions.
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Every year mock interviews are arranged in odd semesters to train students for interview process.
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">Every Year</td>
                      </tr>

                      {/* Row 8 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-top font-medium text-slate-500">8</td>
                        <td className="p-4 align-top font-semibold text-brand-navy">
                          IMS
                         <img src="/images/Trainging & Placement/Training/training-events8.png" alt="IMS" className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                        <td className="p-4 align-top space-y-3">
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            IMS is a training institute for Competitive Exam training.
                          </p>
                          <p>
                            <span className="text-brand-gold mr-2">❖</span>
                            Students in the Year 2014-15 &amp; 2016-17 received aptitude training from this company.
                          </p>
                        </td>
                        <td className="p-4 align-top whitespace-nowrap text-slate-500">2014 to 2017</td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>
            </section>
          )}

          {/* Career Guidance Tab */}
          {activeId === 'career' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Career Guidance</h3>
                <p>
                  In line with objectiveof helping in placing students in competitively good companies, apropos initiatives are taken to counsel the students with respect to career guidance and higher education. Some of them are:
                </p>
                <div className="mt-8">
                  <StyledPointList
                    items={[
                      'Seminars on Higher Studies',
                      'Talks on Career Guidance',
                      'Motivational lectures by Alumni, Entrepreneurs, Industry guests and Faculty.',
                      'Provision of books, magazines, periodicals on Competitive/Civil service/GATE/GRE/TOEFL etc. exams in the library',
                      'Subscription of newspapers related to career opportunities such as Rojgar Samachar',
                    ]}
                  />
                </div>

                {/* Seminars Table */}
                <div className="mt-12 overflow-x-auto">
                  <table className="w-full border-collapse min-w-[800px] border border-slate-200">
                    <thead>
                      <tr className="bg-[#0b1b3d]">
                        <th className="p-4 font-semibold w-16 text-center border border-slate-300 text-[#fdb813]">SR.</th>
                        <th className="p-4 font-semibold w-1/4 text-center border border-slate-300 text-[#fdb813]">Event</th>
                        <th className="p-4 font-semibold text-center border border-slate-300 text-[#fdb813]" colSpan={2}>Resource Person</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      
                      {/* Row 1 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">1</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on &quot;Recruitment Process&quot;
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c] mb-1">Mr. Swapnil Karvir</h4>
                          <p className="text-sm mb-1 text-slate-600">CEO, S S Dies Works Experience of 10 Years in Product Management and Service Delivery across Banking, Telecom and Manufacturing</p>
                          <p className="text-sm font-medium text-[#fdb813]">Experience &ndash; 15 Years</p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/careerguidance-mrswapnilkarvir.jpg" alt="Mr Swapnil Karvir" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">2</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on &quot;Career in Finance Management&quot;
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c] mb-1">Ms. Aishwarya Mohol</h4>
                          <p className="text-sm mb-1 text-slate-600">Treasury Deputy Manager in Forex at Axis Bank Mumbai</p>
                          <p className="text-sm font-medium text-[#fdb813]">Experience &ndash; 10 Years</p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/Aishwarya-Mohol.jpg" alt="Aishwarya Mohol" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">3</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on AI and Machine Learning
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c] mb-1">Mr. Hemant Tendolkar</h4>
                          <p className="text-sm mb-1 text-slate-600">Oracle ERP (Oracle Financials) + Siebel CRM + MDM (UCM &ndash; Customer Master). Customer Experience: Social, Mobile, IoT and AI in CRM-CX, Voice Assistants (Alexa, Google) + Chatbots (FB, Twitter, Telegram etc.) for CRM-CX! Specialties: Technical / Integration Architect</p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/careerguidanceHemant-Tendolkar.jpg" alt="Hemant Tendolkar" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">4</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on Higher Education
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c] mb-1">Dr Ben Baliga.</h4>
                          <p className="text-sm mb-1 text-slate-600">Treasury Deputy Manager in Forex at Axis Bank Mumbai</p>
                          <p className="text-sm font-medium text-[#fdb813]">Experience &ndash; 22 Years</p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/careerguidanceDr-Ben-Baliga.jpg" alt="Dr Ben Baliga" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">5</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on Machine Learning
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c] mb-1">Mr. Gejo Sreenivasan</h4>
                          <p className="text-sm mb-1 text-slate-600">Director, Career Launcher, Mumbai.</p>
                          <p className="text-sm font-medium text-[#fdb813]">Experience &ndash; 20 Years<span className="text-slate-600 font-normal"> in Education space. Specialties &ndash; Test-Prep &ndash; Up-Skilling &ndash; Product Management &ndash; All-things-Quant &ndash; eMarketing &amp; SE</span></p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/careerguidanceGejo-Srineevasan.jpg" alt="Gejo Sreenivasan" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 6 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">6</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on higher studies
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c] mb-1">Mr. Bhupesh Daheria</h4>
                          <p className="text-sm mb-1 text-slate-600">EdTech Futurist | Educator | CEO, Aegis School of Data Science, <span className="text-[#fdb813] font-medium">Experience &ndash; 24 Years</span> &amp; managing trustee of Aegis Knowledge Trust</p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/Bhupesh-Daheria.jpg" alt="Bhupesh Daheria" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 7 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">7</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Shaping Young Minds Programs
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <h4 className="font-bold text-[#1a4b7c]">Tarapur Management Association</h4>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/careerguidanceTarapur-Mgmt-Association.jpg" alt="Tarapur Management Association" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                      {/* Row 8 */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">8</td>
                        <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">
                          Seminar on Career Guidance
                        </td>
                        <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                          <p className="text-sm text-slate-600">Campus Credential is a training institute and has established itself as Forerunner in Competitive Exam training</p>
                        </td>
                        <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                          <img src="/images/Trainging & Placement/Training/careerguidanceCampusCredentials-logo.png" alt="Campus Credentials Logo" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>
            </section>
          )}

          {/* Internship Tab */}
          {activeId === 'internship' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Internship</h3>
                <p>
                  Gaining from course books, lectures and other investigation material doesn&apos;t get the job done for all encompassing learning. Down to earth and hands-on learning is fundamental for better comprehension of work forms. Industry internships are sorted out to uncover the students for industry condition which upgrades the down to earth comprehension of the ideas. The students are urged to take up internship programs during their semester break. Training and Placement cell give their guidelines, recommendations, scope and contact subtleties of industries. They additionally help the students by interacting with the industry persons, give them recommendation letters and other fundamental backings.
                </p>
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-[#1a4b7c] mb-4">Procedure:</h4>
                  <StyledPointList
                    ordered
                    items={[
                      'At first Training and Placement cell issue a letter for summer/winter internship for each student.',
                      'Students submit this letter to individual organization/industry from where they need to seek training as an intern.',
                      'After completion of training, industry gives a certificate or assessment letter.',
                      'Students submit Xerox copy of their training certificate issued by industry to training and placement cell.',
                      'Students submit feedback and training report for the completed internship.',
                    ]}
                  />
                </div>
                <p className="mt-6 pt-4 font-semibold text-[#1a4b7c]">
                  Some of the industries where students regularly go for Internships are:
                </p>
                <div className="mt-8">
                  <img src="/images/Trainging & Placement/Training/internship.png" alt="Industries for Internships" className="w-full max-w-4xl mx-auto rounded-xl border border-slate-200 shadow-lg" />
                </div>
                
              </div>
            </section>
          )}

          {/* Gallery Tab */}
          {activeId === 'gallery' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div key={idx} className="aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden hover:shadow-md transition-shadow">
                      <i className="ph ph-image text-4xl mb-3" />
                      <span className="text-sm font-medium">Image Placeholder {idx}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Placeholders for other tabs */}
          {activeId !== 'training' && activeId !== 'events' && activeId !== 'career' && activeId !== 'internship' && activeId !== 'gallery' && (
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

export default Training;

