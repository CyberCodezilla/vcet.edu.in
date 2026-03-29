import React, { useState, useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';


const sidebarLinks = [
  { id: 'about',       label: 'Entrepreneurship Cell', icon: 'ph-info' },
  { id: 'events',      label: 'Events',                icon: 'ph-calendar-star' },
  { id: 'coordinator', label: 'Co-ordinator',          icon: 'ph-user' },
  { id: 'gallery',     label: 'Gallery',               icon: 'ph-image' },
];

const ECell: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

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
        title="E-Cell"
        breadcrumbs={[
          { label: 'E-Cell' },
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
          {activeId === 'about' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-justify md:text-left text-[15px]">
                <p>
                  The entrepreneurship cell of V.C.E.T., known as &apos;E-Cell&apos; is formed with an objective of fostering entrepreneurship skills amongst the students of V.C.E.T.
                </p>
                <p>
                  It is a student-driven and faculty-guided cell striving to channel the competencies of the budding engineers. It started in the year 2015 and now comprises an overwhelming strength of 50 students across various branches of V.C.E.T. Myriad of activities like seminars, talks &amp; prototype building of the ideas are conducted for the students to strengthen their 6 Ps of success comprising of Patience, Persistence, Perspiration, Passion, Perseverance, and Pragmatism.
                </p>
                <p>
                  With a variety of programs E-Cell plays a key role in the development of entrepreneurial skills and giving an opportunity to the deserving. At the same time, it has been invoking a sense of responsibility towards the nation in students by empowering social start-up&apos;s as well.
                </p>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-[#1a4b7c] mb-4">Objectives</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>To inculcate entrepreneurial mindset amongst our students.</li>
                    <li>To help students validate their ideas.</li>
                    <li>To help students get mentors who can handhold them.</li>
                    <li>To help students to find business ecosystem and funding opportunity. Over the years we have tried to meet our motto by hosting various entrepreneurial events such as the Bizmaster competition, the Esummit and the Internship fair. We also hold various talk sessions with our students wherein speakers and entrepreneurs from various business backgrounds share their experiences and motivate the students to build a business mindset and help them to come forward with their ideas to kick start their entrepreneurial journey.</li>
                  </ol>
                </div>
              </div>
            </section>
          )}

          {/* Events Tab */}
          {activeId === 'events' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-12 text-[#5b6574] leading-relaxed text-[15px]">
                
                {/* 2022-2023 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2022-2023</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Pitch Perfect</h4>
                    <p className="text-justify">
                      Elevate Your Startup Journey Through Pitch Perfect is a transformative event for aspiring entrepreneurs. Over two days, students immerse themselves in innovation, pitching creative business ideas to industry experts. With mentorship from seasoned professionals, they explore startup concepts and emerging trends, equipping them for success in the dynamic world of business.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Startup Street</h4>
                    <p className="italic text-slate-500 mb-2">“Discover Innovation at The Startup Street”</p>
                    <p className="text-justify">
                      Experience a showcase of entrepreneurial ingenuity at The Startup Street, where startups present their products and services to investors, industrialists, students, and customers. This exhibition offers a unique opportunity to network and engage directly with founders and co-founders, gaining insights into their journey and vision. With a diverse array of offerings spanning various fields, everyone can find something to learn from these innovative startups.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Etalk</h4>
                    <p className="italic text-slate-500 mb-2">“Past Event Recap: Emerging Technologies in Every Sector”</p>
                    <p className="text-justify">
                      This event provided invaluable insights from industry experts on their journey to building successful startups. Attendees had the opportunity to discover the pathways taken by professionals to cultivate thriving ventures. The event showcased the latest developments in technology across all domains, featuring speaker profiles including startup founders, ecosystem members, industry experts, entrepreneurs, finance institutions, government representatives, investors, and more. Stay tuned for future events!
                    </p>
                    <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h5 className="font-semibold text-[#1a4b7c] mb-3">Speakers:</h5>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Mr. Abdul Basit Saboowala (Founder &amp; CEO Holo Abdul, Holo Shiksha)</li>
                        <li>Ms. Hetal Kudecha (Founder &amp; Director Discidium Solutions)</li>
                        <li>Ms. Richa Maheshwari (Founder-Evision Training)</li>
                        <li>Ms. Radhika Bajoria (Founder-Radically Yours Inc USA, Building India&apos;s first prodcast with global women leaders - &apos;Wiping out the Norm&apos;)</li>
                        <li>Mr. Soumyadeep Mukerjee (Building Spice Story, India&apos;s next Consumer Food SuperBrand)</li>
                        <li>Mr. Pradipta Sahoo (CHRO; Board Member; Aligning Talent Capability, Change Mgt, Org Culture @ BFSI, ITES, Travel industries)</li>
                        <li>Mr. Zubin Mehta (Top 300 Economic Times Young Leaders, CFA, Mentor &amp; Financial Speaker, ICICI Prudential, Ex-Chegg Inc, Ex-Vedanta)</li>
                        <li>Mr. Vishal Rupani (Building Sprect, Ex Co-founder, mCanvas / VP, Affinity, Advisor, TripperWifi, LinkedIn CAP 2022, 40 under 40, Teacher)</li>
                        <li>Mr. Rammohan Bhave (CA 1980 CMA CS IFRS Faculty/advisor IFRS/Valuation/Strategy/Startup~Ind- Director~Alumna Reliance Mukesh Ambani, Foundsoft USA, Mittal London~President Asso of Valuation Prof, Limca record)</li>
                        <li>Mr. Atul Juvle (Consulting Gen. Counsel, TEDx speaker &amp; Independent Director)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2021-2022 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2021-2022</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Entrepreneur Desk</h4>
                    <p className="text-justify">
                      A platform for VCET&apos;s students &amp; professionals to support, guide and promote their business and startups. Faculty provides proper guidance to the Entrepreneurs of VCET.
                      This year 6 teams presented their startups, promoted it on this platform and shared the motivation, struggle, do&apos;s and don&apos;ts while starting their own startup.
                    </p>
                    <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h5 className="font-semibold text-[#1a4b7c] mb-3">Startups of VCET:</h5>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Coding Adda – Aditya Trivedi, SE-IT</li>
                        <li>Dice Bakes – Lavina Rathod, TE-COMPS</li>
                        <li>Cafe cineFX – Studios Sahil Patil, TE-IT</li>
                        <li>The Food Zest – Nidhi Mehta, TE-COMPS</li>
                        <li>Team Shavy Nutrition – Hritik Gavankar, BE-EXTC</li>
                        <li>Sharelelo – Kunal Patwa EXTC, Alumni, 2021 Graduate</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Lights Camera Startup</h4>
                    <p className="text-justify">
                      The E-cell committee organized lights camera startup for VCET&apos;s students. In this session, students got to know about the various steps required in product development. Students got to learn that before developing any product research is needed in that field. The speaker gave us various insights and shared his great knowledge about Product development. He gave a glimpse of all the processes required to start a career in the product development industry. The webinar was an interactive one with lots of Q&amp;A sessions from the audience. The webinar was a great success with splendid interactions. There were total 109 participants.
                    </p>
                    <p className="mt-2 text-sm font-semibold">Speaker: Mr. Sikandar Manihar (Technical Director of FOX DOMOTICS PVT LTD.)</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Startup Genesis: A kickstart to your start-up journey</h4>
                    <p className="text-justify">
                      Startup Genesis was a two-days long workshop program organized by Team E-CELL 2021-22 for young startups and entrepreneurs. Various experts with years of experience in their fields were invited to speak on a specific topic to guide young Entrepreneurs and Enthusiasts.
                    </p>
                    <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm">
                        <li><span className="font-semibold text-[#1a4b7c]">Ideation:</span> Mr. Arjun Panchal</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Company Formation:</span> Mr. Dipankar Verma</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Product Development:</span> Mr. Neil Sawant</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Marketing:</span> Mr. Brij Parekh</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Finance:</span> Mr. Charudatta Panda</li>
                      </ul>
                      <ul className="space-y-2 text-sm">
                        <li><span className="font-semibold text-[#1a4b7c]">Sales &amp; Advertisement:</span> Mr. Mohsin Sheikh</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Compliances:</span> Mr. Abhijit Barje</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Government Schemes:</span> Mr. Vishal Kumar</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Competitors:</span> Mr. Noorian Panjwani</li>
                        <li><span className="font-semibold text-[#1a4b7c]">Import/Export:</span> Ms. Trupti Shah</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2020-2021 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2020-2021</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Bizcharcha 20-21</h4>
                    <p className="text-justify mb-3">
                      Bizcharcha is an series of seminar, where in each episode we call various entrepreneurs from various fields to share their journey, help the students in understanding various aspects of Entrepreneurship. This year the number of registrations were 110.
                    </p>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>Mr. Rushi Shenghani (Founder of Earth Energy EV, Mumbai)</li>
                      <li>Mr. Zubin Damania (Co-Founder at Social Media Bundle, Mumbai)</li>
                      <li>Ms. Neha Agarwal (SEO Pioneer, Mompreneur)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">E-Summit 20-21</h4>
                    <p className="text-justify mb-3">
                      In this event various speakers and business personalities are invited for the event to mentor the youth, the ones who are aspiring to become entrepreneurs. The event is organized for exploring the startup ideas and the business nature to the students in the college and also to mentor the students regarding the trends in upcoming technology. This event takes place for two days.
                    </p>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>Ms. Ritu Malhotra (Founder of &apos;Anuja Center for learning&apos;)</li>
                      <li>Mr. Rushikesh Pandit (Founder of &apos;BitPandit&apos;)</li>
                      <li>Ms. Prachi Tehlan (Actress, Sportsperson, Entrepreneur)</li>
                      <li>Ms. Pallavi Mukherjee (Founder and CEO of &apos;Pop Diaries&apos;)</li>
                      <li>Mr. Anand Prabhudesai (Co-Founder of &apos;Turtlemint&apos;)</li>
                      <li>Mr. Praful Sharma (Entrepreneur in Finance and Renewable Energy)</li>
                      <li>Mr. Anurag Khurana (Co-Founder &amp; CEO of &apos;Newgen Gaming&apos;)</li>
                      <li>Ms. Saumya Iyer (Mobile Game Producer at &apos;Gear Inc.&apos;)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Internship Fair 20-21</h4>
                    <p className="text-justify">
                      It is a two-day program where various companies come to college and students get a chance to give an interview in their choice of company. The fair is held for students who require internships and helps them get a kick start to their careers. It helps students to inculcate skills that will be required in the corporate market. Held on 15th and 16th May 2021, with 13 companies and 119 student registrations.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      <span className="font-semibold text-[#1a4b7c]">Companies Visited:</span> Kraftpixel, Ryutek Technologies, Autocal, A-Dot Creation, Cerebro Spark, Abner Security, Navyuvak Enterprises, Booklustic, Fashion TV, Modern Innovative, Orena Solutions, Spicetech, Symphony Infotech.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Bizmaster 20-21</h4>
                    <p className="text-justify mb-3">
                      It is a business plan competition, students from various fields of interest present their ideas, business models, strategies. This was the fifth year of Bizmaster organized by E-CELL. We had 12 teams participating from all over Mumbai. This year few participants got an opportunity for funding. The total prize money distributed was Rs. 40,000/-.
                    </p>
                    <ul className="space-y-1 list-disc pl-5 text-sm">
                      <li>Rushi Shenghani (Founder of Earth Energy EV)</li>
                      <li>Gaurav Mishra (Founder of Navyuvak Enterprises)</li>
                      <li>Srijit Mondal (Founder of Pi-Paradox and Booklustic)</li>
                    </ul>
                  </div>
                </div>

                {/* 2019-2020 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2019-2020</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">E-Summit</h4>
                    <p className="text-justify mb-3">
                      E-Summit is an annual flagship event effectuated with the intention to foster entrepreneurial initiatives. Spanning two days with speakers from Business, Marketing, Technology and Content Creation, it helps students get motivated towards the business aspect of life.
                    </p>
                    <ul className="space-y-1 list-disc pl-5 text-sm">
                      <li>Gaurav Mishra (Product Manager at Rebel Foods)</li>
                      <li>Ravi Poddar (Executive Director, Kyndryl AWS Alliance leader)</li>
                      <li>Anmol (Food Entrepreneur)</li>
                      <li>Ankita Chawla (Influencer)</li>
                      <li>Divya (Owns start-up, raised up to 2 lakhs)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Internship Fair 19-20</h4>
                    <p className="text-justify">
                      Conducted over a span of 2 days with a number of companies providing opportunities to students of all branches and with over 400+ registrations. The interviews were profusely conducted, providing students with an opportunity to gain experience of interviews and test their knowledge and skills for the industry.
                    </p>
                  </div>
                </div>

                {/* 2018-2019 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2018-2019</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">E-SUMMIT 19</h4>
                    <p className="text-justify mb-3">
                      E-Summit &apos;19 conducted by E-CELL committee under the guidance of Prof. Chandan Kolvankar was a successful event. Plenty of speakers from the business background spoke at length on entrepreneurial skills across the two-day event.
                    </p>
                    <ul className="space-y-1 list-disc pl-5 text-sm">
                      <li>Mr. Subhash Talekar (President, Mumbai Dabbawalas Association)</li>
                      <li>Mr. Sumer Singh (Content Developer, Youtuber &apos;Last Moment Tuitions&apos;)</li>
                      <li>Mr. Gaurav Mishra (Founder, Navayuvak Entrepreneurs)</li>
                      <li>Mr. Varun Kodolikar (Creative Wedding Photographer, Kodoclicker)</li>
                      <li>Mr. Abhishek Gharat (Director, Kraftpixel)</li>
                      <li>Ms. Neha Joshi &amp; Ms. Gayatri Kale (Co-founders, Finden Godigital)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">BIZMASTER 19</h4>
                    <p className="text-justify">
                      This flagship business plan competition had 9 teams participating from all over Mumbai. Audiences witnessed a great battle among participants from the best colleges across the city. The winners were awarded cash prizes of ₹40,000, trophies, and certificates.
                    </p>
                  </div>
                </div>

                {/* 2017-2018 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2017-2018</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">Internship Fair 17-18</h4>
                    <p className="text-justify">
                      The team prepared the Internship Fair within a short period of time, approaching over fifty companies. Seven companies joined, conducting their interview processes within the college. There were 220 students who participated with 450 total form submissions. Participating companies included ImpactGuru, VPS Techub, RGM Technologies, Ebzaar, Seth Group Developers, Verdantis, and Tech Whizzers.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">BIZMASTER 2018</h4>
                    <p className="text-justify">
                      The Bizmaster 2018 saw maximum participation by students. Members worked hard to flourish the event very well. This time few participants showed up with patents of their business product or idea. Judges included industry personages and one judge from Google. Prize pool was Rs. 40,000/-.
                    </p>
                  </div>
                </div>

                {/* 2016-2017 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2016-2017</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">ESUMMIT EVENT 2017</h4>
                    <p className="text-justify mb-3">
                      Organized to explore startup ideas and mentor youth aspiring to become entrepreneurs. Featured speakers included Mr. Mukesh Jain (CTO, VP Insights &amp; Data at Capgemini India), Mr. Ishwar Jha (Founder &amp; CEO at appetals), Mr. Devdatta Mainkar (CA), and Mr. Nishant Patel (founder Raw Engineering).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">BIZMASTER 2017</h4>
                    <p className="text-justify">
                      The second year of Bizmaster received much more hype, with over 23 teams participating. With proper judging from business backgrounds and industry professionals (Mr. Mehul Khandedia &amp; Mr. Swapnil Karvir), winning teams were awarded a prize worth Rs. 40,000/-.
                    </p>
                  </div>
                </div>

                {/* 2015-2016 */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">2015-2016</h3>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">BIZMASTER 2016</h4>
                    <p className="text-justify">
                      This is the year when the Entrepreneurship Cell was established. Bizmaster was launched as a competitive event where budding entrepreneurs come up with new startup ideas and convince judges from the industry of their viability. Top three winners were awarded prizes worth Rs. 40,000/-.
                    </p>
                  </div>
                </div>
                
              </div>
            </section>
          )}

          {/* Co-ordinator Tab */}
          {activeId === 'coordinator' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-10 text-[#5b6574] leading-relaxed text-[15px]">
                
                <div>
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Faculty In Charge</h3>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="w-20 h-20 rounded-full bg-brand-navylight flex flex-shrink-0 items-center justify-center text-[#1a4b7c]">
                      <i className="ph ph-user text-4xl"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#1a4b7c] mb-1">Mr. Vikrant Agaskar</h4>
                      <p className="flex items-center gap-2 mb-1">
                        <i className="ph ph-envelope-simple text-[#1a4b7c]"></i>
                        <a href="mailto:vikrant.agaskar@vcet.edu.in" className="hover:text-brand-gold transition-colors">vikrant.agaskar@vcet.edu.in</a>
                      </p>
                      <p className="flex items-center gap-2">
                        <i className="ph ph-phone text-[#1a4b7c]"></i>
                        <a href="tel:+919822836508" className="hover:text-brand-gold transition-colors">+91 9822836508</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1a4b7c] mb-6">Faculty Members</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Mr. Vikrant Agaskar',
                      'Mrs. Mugdha Salvi',
                      'Mrs. Shaista Khanam',
                      'Mr. Viren Chandanshive',
                      'Mr. Mukund Kavekar'
                    ].map((member, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#1a4b7c]">
                          <i className="ph ph-identification-card text-xl"></i>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a4b7c]">{member}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Member</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* Placeholders for other tabs */}
          {activeId !== 'about' && activeId !== 'events' && activeId !== 'coordinator' && (
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

export default ECell;

