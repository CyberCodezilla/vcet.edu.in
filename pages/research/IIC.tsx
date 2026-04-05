import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  ArrowRight,
  Binoculars,
  CheckCircle2,
  Crown,
  ExternalLink,
  FileText,
  Image,
  Lightbulb,
  Target,
} from 'lucide-react';
import { getResearchSection } from '../../services/research';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const sectionTabs = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'vision-mission', label: 'Vision & Mission', href: '#vision-mission' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'team', label: 'Team', href: '#team' },
];

const focusItems = [
  'To create a vibrant local innovation ecosystem.',
  'Start-up supporting mechanism in the institute.',
  'Prepare institute for Atal Ranking of Institutions on Innovation Achievements Framework.',
  'Establish function ecosystem for scouting ideas and pre-incubation of ideas.',
  'Develop better cognitive ability for technology students.',
];

const functionItems = [
  'To conduct various innovation, start up, entrepreneurship-related activities prescribed by Central MIC in time bound fashion.',
  'Identify and reward innovations and share success stories.',
  'Organize periodic workshops, seminars, interactions with entrepreneurs, investors, professionals and create a mentor pool for student innovators.',
  'Network with peers and national entrepreneurship development organizations.',
  "Create an Institution's Innovation portal to highlight innovative projects carried out by institution's faculty and students.",
  'Organize hackathons, idea competitions, mini challenges and allied activities with industry involvement.',
];

const stakeholderItems = [
  {
    title: 'Students',
    description: 'Enhance learning through hands-on experience, fostering a spirit of entrepreneurship and leadership.',
  },
  {
    title: 'Faculty and Researchers',
    description: 'Encourage interdisciplinary collaboration and provide avenues for translating research into impactful innovations.',
  },
  {
    title: 'Institute',
    description: 'Strengthen reputation as a hub for innovation and entrepreneurship, attracting top talent and industry partnerships.',
  },
];

const defaultAchievementHolders = [
  { title: 'IIC Achievement 1', image: '/Images/Research/IIC/IIC-achievement1-1024x576.jpg' },
  { title: 'IIC Achievement 2', image: '/Images/Research/IIC/IIC-achievement2-1024x576.jpg' },
];

const defaultGalleryHolders = Array.from({ length: 10 }, (_, index) => `IIC Gallery ${String(index + 1).padStart(2, '0')}`);

const defaultReportPdfs = [
  { label: '2022-2023', href: 'https://vcet.edu.in/wp-content/uploads/2024/07/IIC-REPORT5.0_22-23-_final.pdf' },
  { label: '2020-2021', href: 'https://vcet.edu.in/wp-content/uploads/2024/07/IIC-Annual-Report-2020-21.pdf' },
];

const defaultStaffCommitteeRows = [
  { left: 'President', right: 'Dr. Ashish J. Chaudhari' },
  { left: 'Vice President', right: 'Mr. Abhimanyu Raja, Director, M/s. Janyu-Tech Technologies, Vasai' },
  { left: 'Convenor', right: 'Dr. Madhavi Waghmare' },
  { left: 'Innovation Activity Coordinator', right: 'Mr. Viren Chandanshive' },
  { left: 'Start-up Activity Coordinator', right: 'Mr. Swapnil Mane' },
  { left: 'Internship Coordinator', right: 'Mr. Sanket Patil' },
  { left: 'IPR Activity Coordinator', right: 'Mr. Vinay D. Patel' },
  { left: 'Social Media Coordinator', right: 'Ms. Shaista Khan' },
  { left: 'ARIIA Coordinator (Optional) / NIRF Coordinator (Optional)', right: 'Dr. Ashish Chaudhari' },
  { left: 'Members (Faculty)', right: 'Mr. Yogesh Pingle; Mrs. Poonam Surange, Counselling Psychologist' },
];

const defaultExpertRows = [
  { left: 'IP Expert/Patent Expert', right: 'Mr. Parvez Kudrolli, IPR Attorney, Khurana and Khurana IPR Advocates, Mumbai' },
  { left: 'Start-up / Alumni Entrepreneur', right: 'Mr. Hemant Isai, M/s. Genesis Engineering Solutions Pvt. Ltd., Vasai' },
  {
    left: 'Expert from nearby Industry / Industry Association / Ecosystem Enablers',
    right: "Mr. Shirish Nadkarni, General Manager, D'Decor Home Fabrics Pvt. Ltd., Tarapur Boisar",
  },
  { left: 'FI/Bank/Investor/Angel Investor/VC', right: 'Mr. Gaurav Mishra, Navyuvak Entrepreneurs, Goregaon Mumbai' },
  {
    left: 'Nearby Incubation Centre',
    right: "Mr. Aadesh Suryarao, CEO, MUIDEAS (University of Mumbai's Incubation Centre), University of Mumbai",
  },
];

const defaultSupportStaffRows = [
  { left: 'Mr. Nilesh Patil', right: 'Internet Centre' },
  { left: 'Mr. Kalpak Patil', right: 'I.T.' },
  { left: 'Mr. Sashikant Patil', right: 'Mech' },
];

const defaultStudentRepresentationRows = [
  { left: 'Innovation Coordinator', right: 'Deeksha Shetty' },
  { left: 'Start-up Coordinator', right: 'Gaurang Thakur' },
  { left: 'Internship Coordinator', right: 'Kimaya Salunkhe' },
  { left: 'IPR Coordinator', right: 'Prerna Kasar' },
  { left: 'Social Media Coordinator', right: 'Aditya Kute' },
  {
    left: 'General Members',
    right:
      'Deepkumar Patel; Tanushka Gavit; Dikshant Suwa; Bikash Ghadei; Aarsh Thakur; Akshay Jadhav; Vishal Dhinde; Dhruv Purav; Sairaj Varavdekar; Dhruvit Chaudhari; Pranav Patil; Shravani Vartak; Mitali Salve; Pallavi Thakur; Nidhy Dhanal Chaudhari; Sahil G; Pooja Chafekar; Krutarth Deshpande; Arya Redji; Nisha; Anant Rai; Pooja Gupta; Omkar Bhoir; Parth Salvi; Raja Shah; Amit Bansod; Paresh Patil; Mayur Patil; Vignesh Parab; Aditya Jadhav; Om Kamat; Aftab Amiruddin Dafedar; Rohan Patil; Sahil Shah; Tanmay Narkar; Atulkumar Yadav; Vedant Salvi; Chaitanya Suryavanshi; Kaiwalya Rane; Vivek Yadav; Niraj Yadav; Anil Yadav; Vedant Ghanekar; Yash Negi; Ramprasad Dutta; Jayesh Bhagat; Sunny Gupta; Harsh Chandaliya; Shruti Manjrekar; Manoj Nivate; Shweta Desai',
  },
];

type TeamTableProps = {
  title: string;
  leftHeader: string;
  rightHeader: string;
  rows: Array<{ left: string; right: string }>;
};

const TeamTable: React.FC<TeamTableProps> = ({ title, leftHeader, rightHeader, rows }) => {
  return (
    <article className="reveal border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
      <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
        <h4 className="text-white text-[16px] md:text-[18px] font-display font-bold tracking-tight">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse">
          <thead>
            <tr className="bg-[#F4F8FC] text-[#1A4B7C]">
              <th className="w-[36%] px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] font-extrabold border-r border-[#D8E2EE]">
                {leftHeader}
              </th>
              <th className="px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] font-extrabold">{rightHeader}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.left}-${index}`} className={`border-t border-[#E4EBF3] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFDFF]'}`}>
                <td className="px-4 py-3.5 align-top text-[14px] md:text-[15px] font-semibold text-[#1A4B7C] border-r border-[#E4EBF3]">
                  {row.left}
                </td>
                <td className="px-4 py-3.5 align-top text-[14px] md:text-[15px] text-[#374151] leading-[1.65]">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

const ResearchIIC: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getResearchSection<any>('iic')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

    useEffect(() => {
    const sectionIds = sectionTabs.map((tab) => tab.id);

    const updateActiveSection = () => {
      const activationOffset = 170;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        const top = element.getBoundingClientRect().top;
        if (top - activationOffset <= 0) {
          current = id;
        }
      });

      const isNearPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
      if (isNearPageBottom) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    window.addEventListener('hashchange', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, []);

  const achievementHolders = useMemo(() => {
    const rows = Array.isArray(apiData?.iicAchievementsDetailed)
      ? apiData.iicAchievementsDetailed
          .map((item: any, index: number) => ({
            title: String(item?.title ?? '').trim() || `IIC Achievement ${index + 1}`,
            image: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
          .filter((item: any) => item.title.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultAchievementHolders;
  }, [apiData]);

  const achievementGridClasses = achievementHolders.length <= 2
    ? 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px]'
    : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5';

  const achievementMediaClasses = achievementHolders.length <= 2
    ? 'bg-[#0E355C] border border-[#CFB46C]/35 h-[320px] md:h-[430px] flex flex-col items-center justify-center text-center overflow-hidden'
    : 'bg-[#0E355C] border border-[#CFB46C]/35 h-[240px] md:h-[300px] flex flex-col items-center justify-center text-center overflow-hidden';

  const galleryHolders = useMemo(() => {
    const rows = Array.isArray(apiData?.iicGalleryDetailed)
      ? apiData.iicGalleryDetailed
          .map((item: any, index: number) => ({
            label: String(item?.label ?? '').trim() || `IIC Gallery ${String(index + 1).padStart(2, '0')}`,
            image: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
      : [];
    return rows.length > 0
      ? rows
      : defaultGalleryHolders.map((label) => ({ label, image: null as string | null }));
  }, [apiData]);

  const reportPdfs = useMemo(() => {
    const rows = Array.isArray(apiData?.iicReportsDetailed)
      ? apiData.iicReportsDetailed
          .map((item: any) => ({
            label: String(item?.label ?? '').trim(),
            href: resolveUploadedAssetUrl(item?.fileUrl ?? item?.url ?? null) || '',
          }))
          .filter((item: { label: string; href: string }) => item.label.length > 0 && item.href.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultReportPdfs;
  }, [apiData]);

  const committeeGroups = apiData?.iicCommitteeGroups ?? {};
  const staffCommitteeRows = (Array.isArray(committeeGroups?.staff) && committeeGroups.staff.length > 0) ? committeeGroups.staff : defaultStaffCommitteeRows;
  const expertRows = (Array.isArray(committeeGroups?.expert) && committeeGroups.expert.length > 0) ? committeeGroups.expert : defaultExpertRows;
  const supportStaffRows = (Array.isArray(committeeGroups?.support) && committeeGroups.support.length > 0) ? committeeGroups.support : defaultSupportStaffRows;
  const studentRepresentationRows = (Array.isArray(committeeGroups?.student) && committeeGroups.student.length > 0) ? committeeGroups.student : defaultStudentRepresentationRows;

  if (!apiLoaded) {
    return (
      <PageLayout>
        <PageBanner
          title="Institution's Innovation Council (IIC)"
          breadcrumbs={[
            { label: 'Research', href: '/research' },
            { label: 'IIC' },
          ]}
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner
        title="Institution's Innovation Council (IIC)"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'IIC' },
        ]}
      />

      <section className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-sm border-b border-[#E4EAF2]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] py-2 md:py-3">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory pb-1 no-scrollbar">
            {sectionTabs.map((tab) => (
              <a
                key={tab.label}
                href={tab.href}
                className={`group inline-flex items-center gap-2 px-3 md:px-3.5 py-2 rounded-none border text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] transition-colors flex-shrink-0 snap-start min-h-[44px] ${
                  activeSection === tab.id
                    ? 'border-[#D4A017] bg-[#F4C84C] text-[#173C61] shadow-[0_0_0_1px_#D4A017_inset]'
                    : 'border-[#D7E1EC] bg-[#F8FBFF] text-[#1A4B7C] hover:bg-[#1A4B7C] hover:text-white'
                }`}
              >
                {tab.label}
                <ArrowRight className={`w-3.5 h-3.5 ${activeSection === tab.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-14 md:py-16 bg-white border-b border-[#E5E7EB] scroll-mt-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8">
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-4">
              About
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#1A4B7C] tracking-tight">Institution's Innovation Council (IIC)</h2>
          </div>

          <div className="reveal bg-[#F8FAFC] border border-[#E2E8F0] p-4 md:p-7 leading-[1.85] text-[#374151] text-[14px] md:text-[16px]">
            In today's rapidly evolving world, the ability to innovate and transform ideas into tangible solutions is crucial. Recognizing this imperative, Vidyavardhini's College of Engineering and Technology Vasai is proud to introduce its Innovation, Startup, and Intellectual Property Rights (IPR) Cell under umbrella of Institution's Innovation Council (IIC) in accordance with the guidelines of the Ministry of Education Innovation Cell that was established in year 2020. This initiative is designed to empower our students, faculty, and researchers to explore their entrepreneurial potential while protecting their innovative creations.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
            <article className="reveal border border-[#DEE8F3] bg-white p-5">
              <h3 className="font-display font-bold text-[#1A4B7C] text-xl mb-3">Focus of IIC</h3>
              <ul className="space-y-2.5">
                {focusItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#4B5563] leading-[1.7]">
                    <CheckCircle2 className="w-4 h-4 text-[#1A4B7C] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="reveal border border-[#DEE8F3] bg-white p-5" style={{ transitionDelay: '0.05s' }}>
              <h3 className="font-display font-bold text-[#1A4B7C] text-xl mb-3">Functions of IIC</h3>
              <ul className="space-y-2.5">
                {functionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#4B5563] leading-[1.7]">
                    <Lightbulb className="w-4 h-4 text-[#fdb813] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="reveal border border-[#DEE8F3] bg-[#0E355C] p-5" style={{ transitionDelay: '0.1s' }}>
              <h3 className="font-display font-bold text-white text-xl mb-3">Benefit to Stakeholders</h3>
              <ul className="space-y-3.5">
                {stakeholderItems.map((item) => (
                  <li key={item.title} className="text-[15px] text-white/90 leading-[1.75]">
                    <p className="font-bold text-[#fdb813] mb-0.5">{item.title}</p>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="vision-mission" className="py-14 md:py-16 bg-[#F7FAFD] border-b border-[#E5E7EB] scroll-mt-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8">
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-4">
              Vision & Mission
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#1A4B7C] tracking-tight">Strategic Direction of IIC</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="reveal relative border border-[#D9E6F2] bg-white p-6 md:p-8 overflow-hidden">
              <div className="absolute -top-24 -right-16 w-56 h-56 rounded-full bg-[#1A4B7C]/6" />
              <h3 className="text-3xl font-display font-bold text-[#56A9D8] mb-5 relative z-10">Vision</h3>
              <div className="flex justify-center mb-5 relative z-10">
                <div className="iic-float text-[#EAB308]">
                  <Binoculars className="w-24 h-24 md:w-28 md:h-28" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-[18px] text-[#4B5563] leading-[1.75] relative z-10">
                To be a premier institution of technical education, aiming at becoming a valuable resource for innovation, start-up and incubation.
              </p>
            </article>

            <article className="reveal relative border border-[#D9E6F2] bg-white p-6 md:p-8 overflow-hidden" style={{ transitionDelay: '0.06s' }}>
              <h3 className="text-3xl font-display font-bold text-[#56A9D8] mb-4">Mission</h3>
              <div className="absolute top-6 right-6 hidden md:block">
                <div className="relative iic-float-slow text-[#EAB308]">
                  <Target className="w-24 h-24" strokeWidth={1.9} />
                  <span className="absolute inset-0 rounded-full border border-[#EAB308]/30 iic-pulse" />
                </div>
              </div>
              <ul className="space-y-3 md:pr-28">
                <li className="flex items-start gap-2.5 text-[17px] text-[#374151] leading-[1.7]">
                  <CheckCircle2 className="w-4 h-4 text-[#56A9D8] mt-1 flex-shrink-0" />
                  <span>To provide technical innovation environment for learners and protection of it.</span>
                </li>
                <li className="flex items-start gap-2.5 text-[17px] text-[#374151] leading-[1.7]">
                  <CheckCircle2 className="w-4 h-4 text-[#56A9D8] mt-1 flex-shrink-0" />
                  <span>To promote start up, entrepreneurship activities.</span>
                </li>
                <li className="flex items-start gap-2.5 text-[17px] text-[#374151] leading-[1.7]">
                  <CheckCircle2 className="w-4 h-4 text-[#56A9D8] mt-1 flex-shrink-0" />
                  <span>To inculcate ethical and moral values.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-14 md:py-16 bg-white border-b border-[#E5E7EB] scroll-mt-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8">
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-4">
              Achievements
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#1A4B7C] tracking-tight">Achievements !</h2>
          </div>

          <div className={achievementGridClasses}>
            {achievementHolders.map((holder: { title: string; image: string | null }, index: number) => (
              <article key={holder.title} className="reveal group" style={{ transitionDelay: `${index * 0.04}s` }}>
                <div className="relative p-[2px] bg-gradient-to-br from-[#D8A215] via-[#F4C84C] to-[#9E7215] shadow-[0_8px_20px_rgba(23,42,79,0.18)]">
                  <div className={achievementMediaClasses}>
                    {holder.image ? (
                      <img src={holder.image} alt={holder.title} className="w-full h-full object-contain bg-[#F8FAFC] p-1" />
                    ) : (
                      <>
                        <Crown className="w-7 h-7 text-[#F4C84C] mb-2" />
                        <p className="text-[13px] uppercase tracking-[0.12em] text-[#F7D982] font-bold">Image Holder</p>
                        <p className="text-[14px] text-white/85 mt-1">{holder.title}</p>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-10 md:py-12 bg-[#F8FAFC] border-b border-[#E5E7EB] scroll-mt-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-6">
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-4">
              Gallery
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#1A4B7C] tracking-tight">IIC Events Visual Stream</h2>
          </div>

          <div className="relative overflow-hidden iic-marquee-shell">
            <div className="flex gap-3 md:gap-4 w-max iic-marquee">
              {[...galleryHolders, ...galleryHolders].map((item, index) => (
                <div key={`${item.label}-${index}`} className="w-[250px] md:w-[280px] bg-white border border-[#DCE6F2] shadow-[0_4px_14px_rgba(15,23,42,0.06)]">
                  <div className="aspect-[16/10] bg-[#EDF4FB] flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    ) : (
                      <Image className="w-8 h-8 text-[#1A4B7C]/35" />
                    )}
                  </div>
                  <div className="px-3 py-2 border-t border-[#E5ECF5]">
                    <p className="text-[13px] font-semibold text-[#1A4B7C] text-center">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-10 md:py-12 bg-white scroll-mt-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8">
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1 mb-4">
              Team
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#1A4B7C] tracking-tight">IIC Committee Structure</h2>
          </div>

          <div className="space-y-6">
            <TeamTable
              title="Staff Committee 2023-24"
              leftHeader="Position"
              rightHeader="Name"
              rows={staffCommitteeRows}
            />

            <TeamTable
              title="Expert Representation"
              leftHeader="Position"
              rightHeader="Name"
              rows={expertRows}
            />

            <TeamTable
              title="Support Staff Members"
              leftHeader="Name"
              rightHeader="Dept"
              rows={supportStaffRows}
            />

            <TeamTable
              title="Student Representation"
              leftHeader="Position"
              rightHeader="Name"
              rows={studentRepresentationRows}
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-[#F8FAFC] border-t border-[#E4EAF2]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#56A9D8] tracking-tight">
              Reports - Events and Committee Details :
            </h3>
            <p className="mt-2 text-[13px] md:text-[14px] text-[#5B6B7C]">Click any year button to open its PDF in a new tab.</p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {reportPdfs.map((item: { label: string; href: string }, idx: number) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal inline-flex items-center gap-3 px-4 py-2.5 border border-[#BCD2E8] bg-white text-[#1A4B7C] font-semibold text-[14px] hover:border-[#56A9D8] hover:bg-[#EDF6FD] transition-colors"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <span className="inline-flex items-center justify-center px-2 py-0.5 border border-[#56A9D8]/50 text-[11px] font-bold uppercase tracking-[0.08em] text-[#1A4B7C]">
                  <FileText className="w-3.5 h-3.5 mr-1 text-[#56A9D8]" />
                  PDF
                </span>
                <span>{item.label}</span>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] text-[#4F6B86]">
                  Open
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes iicFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          @keyframes iicPulse {
            0% { transform: scale(0.95); opacity: 0.65; }
            70% { transform: scale(1.05); opacity: 0; }
            100% { transform: scale(1.1); opacity: 0; }
          }

          @keyframes iicMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .iic-marquee-shell {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          }

          .iic-float {
            animation: iicFloat 4.2s ease-in-out infinite;
          }

          .iic-float-slow {
            animation: iicFloat 5.8s ease-in-out infinite;
          }

          .iic-pulse {
            animation: iicPulse 2.2s ease-out infinite;
          }

          .iic-marquee {
            animation: iicMarquee 52s linear infinite;
            will-change: transform;
          }

          .iic-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </PageLayout>
  );
};

export default ResearchIIC;
