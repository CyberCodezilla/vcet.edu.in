// commit test
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './admin/context/AuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';

/* ── Homepage Components ── */
import Header from './components/Header';
import Hero from './components/Hero';
import TopBanner from './components/TopBanner';
import About from './components/About';
import Departments from './components/Departments';
import Placements from './components/Placements';
import Recruiters from './components/Recruiters';
import Achievements from './components/Achievements';
import ExploreUs from './components/ExploreUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Facilities from './components/Facilities';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

/* ── Lazy-loaded Pages ── */

// pages/about
const AboutVCET = lazy(() => import('./pages/about/AboutVCET'));
const PresidentsDesk = lazy(() => import('./pages/about/PresidentsDesk'));
const PrincipalsDesk = lazy(() => import('./pages/about/PrincipalsDesk'));
const GoverningCouncil = lazy(() => import('./pages/about/GoverningCouncil'));
const OrganizationalStructure = lazy(() => import('./pages/about/OrganizationalStructure'));
const Administration = lazy(() => import('./pages/about/Administration'));
const StrategicPlan = lazy(() => import('./pages/about/StrategicPlan'));
const CodeOfConduct = lazy(() => import('./pages/about/CodeOfConduct'));

// pages/admissions
const CoursesIntake = lazy(() => import('./pages/admissions/CoursesIntake'));
const FeesStructure = lazy(() => import('./pages/admissions/FeesStructure'));
const Scholarships = lazy(() => import('./pages/admissions/Scholarships'));
const Brochure = lazy(() => import('./pages/admissions/Brochure'));
const DocumentsRequired = lazy(() => import('./pages/admissions/DocumentsRequired'));
const CutOff = lazy(() => import('./pages/admissions/CutOff'));

// pages/departments
const DeptComputerEngg = lazy(() => import('./pages/departments/DeptComputerEngg'));
const DeptCSDS = lazy(() => import('./pages/departments/DeptCSDS'));
const CSDSFacultyProfile = lazy(() => import('./pages/departments/csds/FacultyProfilePage'));
const DeptIT = lazy(() => import('./pages/departments/DeptIT'));
const DeptAIDS = lazy(() => import('./pages/departments/DeptAIDS'));
const DeptMech = lazy(() => import('./pages/departments/DeptMech'));
const DeptENTC = lazy(() => import('./pages/departments/DeptENTC'));
const DeptCivil = lazy(() => import('./pages/departments/DeptCivil'));
const DeptFE = lazy(() => import('./pages/departments/DeptFE'));

// pages/academics
const DeanAcademics = lazy(() => import('./pages/academics/DeanAcademics'));
const AcademicCalendar = lazy(() => import('./pages/academics/AcademicCalendar'));
const TeachingLearning = lazy(() => import('./pages/academics/TeachingLearning'));
const SwayamNPTEL = lazy(() => import('./pages/academics/SwayamNPTEL'));
const HonoursMinor = lazy(() => import('./pages/academics/HonoursMinor'));
const ExamCell = lazy(() => import('./pages/academics/ExamCell'));
const Downloads = lazy(() => import('./pages/academics/Downloads'));

// pages/research
const ResearchIntro = lazy(() => import('./pages/research/ResearchIntro'));
const FundedResearch = lazy(() => import('./pages/research/FundedResearch'));
const Publications = lazy(() => import('./pages/research/Publications'));
const ConsultancyProjects = lazy(() => import('./pages/research/ConsultancyProjects'));
const ResearchFacility = lazy(() => import('./pages/research/ResearchFacility'));
const ResearchConventions = lazy(() => import('./pages/research/ResearchConventions'));
const ResearchPolicy = lazy(() => import('./pages/research/ResearchPolicy'));
const NIRF = lazy(() => import('./pages/research/NIRF'));
const ResearchPatents = lazy(() => import('./pages/research/Patents'));
const ResearchIIC = lazy(() => import('./pages/research/IIC'));
const ResearchDownloads = lazy(() => import('./pages/research/ResearchDownloads'));

// pages/facilities
const CentralComputing = lazy(() => import('./pages/facilities/CentralComputing'));
const LibraryPage = lazy(() => import('./pages/facilities/Library'));
const CounselingCell = lazy(() => import('./pages/facilities/CounselingCell'));
const LadiesCommonRoom = lazy(() => import('./pages/facilities/LadiesCommonRoom'));
const SportsGymkhana = lazy(() => import('./pages/facilities/SportsGymkhana'));
const HealthFacilities = lazy(() => import('./pages/facilities/HealthFacilities'));
const DifferentlyAbled = lazy(() => import('./pages/facilities/DifferentlyAbled'));

// pages/student-life
const CareerAtVCET = lazy(() => import('./pages/student-life/CareerAtVCET'));
const StudentsCouncil = lazy(() => import('./pages/student-life/StudentsCouncil'));
const CulturalCommittee = lazy(() => import('./pages/student-life/CulturalCommittee'));
const SportsCommittee = lazy(() => import('./pages/student-life/SportsCommittee'));
const Literati = lazy(() => import('./pages/student-life/Literati'));
const NSS = lazy(() => import('./pages/student-life/NSS'));
const EBSB = lazy(() => import('./pages/student-life/EBSB'));
const StudentsClub = lazy(() => import('./pages/student-life/StudentsClub'));
const Hackathon = lazy(() => import('./pages/student-life/Hackathon'));
const NSDC = lazy(() => import('./pages/student-life/NSDC'));
const Training = lazy(() => import('./pages/student-life/Training'));
const ECell = lazy(() => import('./pages/student-life/ECell'));
const IIIC = lazy(() => import('./pages/student-life/IIIC'));
const Patents = lazy(() => import('./pages/student-life/Parents'));

// pages/clubs
const IEEE = lazy(() => import('./pages/clubs/IEEE'));
const CSI = lazy(() => import('./pages/clubs/CSI'));
const IETE = lazy(() => import('./pages/clubs/IETE'));
const ISHRAE = lazy(() => import('./pages/clubs/ISHRAE'));
const VMEA = lazy(() => import('./pages/clubs/VMEA'));
const IGBC = lazy(() => import('./pages/clubs/IGBC'));
const IIC = lazy(() => import('./pages/clubs/IIC'));

// pages/committees
const CollegeDevelopmentCommittee = lazy(() => import('./pages/committees/CollegeDevelopmentCommittee'));
const IQAC = lazy(() => import('./pages/committees/IQAC'));
const GrievanceRedressal = lazy(() => import('./pages/committees/GrievanceRedressal'));
const SRGCCommittee = lazy(() => import('./pages/committees/SRGCCommittee'));
const AntiRagging = lazy(() => import('./pages/committees/AntiRagging'));
const SCSTCommittee = lazy(() => import('./pages/committees/SCSTCommittee'));
const InternalComplaint = lazy(() => import('./pages/committees/InternalComplaint'));
const EqualOpportunity = lazy(() => import('./pages/committees/EqualOpportunity'));
const SEDGCell = lazy(() => import('./pages/committees/SEDGCell'));

// pages/naac
const SSS = lazy(() => import('./pages/naac/SSS'));
const SSSReport = lazy(() => import('./pages/naac/SSSReport'));
const SSRCycle1 = lazy(() => import('./pages/naac/SSRCycle1'));
const SSRCycle2 = lazy(() => import('./pages/naac/SSRCycle2'));
const BestPractices = lazy(() => import('./pages/naac/BestPractices'));
const NAACScore = lazy(() => import('./pages/naac/NAACScore'));

// pages/contact
const ContactUs = lazy(() => import('./pages/contact/ContactUs'));

/* ── Admin Panel Pages (lazy) ── */
const AdminLogin      = lazy(() => import('./admin/pages/Login'));
const AdminDashboard  = lazy(() => import('./admin/pages/Dashboard'));
const NoticesList     = lazy(() => import('./admin/pages/notices/NoticesList'));
const NoticeForm      = lazy(() => import('./admin/pages/notices/NoticeForm'));
const EventsList      = lazy(() => import('./admin/pages/events/EventsList'));
const EventForm       = lazy(() => import('./admin/pages/events/EventForm'));
const PlacementsList  = lazy(() => import('./admin/pages/placements/PlacementsList'));
const PlacementForm   = lazy(() => import('./admin/pages/placements/PlacementForm'));
const HeroSlidesList       = lazy(() => import('./admin/pages/hero-slides/HeroSlidesList'));
const HeroSlideForm        = lazy(() => import('./admin/pages/hero-slides/HeroSlideForm'));
const NewsTickerList       = lazy(() => import('./admin/pages/news-ticker/NewsTickerList'));
const NewsTickerForm       = lazy(() => import('./admin/pages/news-ticker/NewsTickerForm'));
const AchievementsList     = lazy(() => import('./admin/pages/achievements/AchievementsList'));
const AchievementsForm     = lazy(() => import('./admin/pages/achievements/AchievementsForm'));
const TestimonialsList     = lazy(() => import('./admin/pages/testimonials/TestimonialsList'));
const TestimonialsForm     = lazy(() => import('./admin/pages/testimonials/TestimonialsForm'));
const GalleryPage          = lazy(() => import('./admin/pages/gallery/GalleryPage'));
const PlacementPartnersList = lazy(() => import('./admin/pages/placement-partners/PlacementPartnersList'));
const PlacementPartnersForm = lazy(() => import('./admin/pages/placement-partners/PlacementPartnersForm'));
const EnquiriesList        = lazy(() => import('./admin/pages/enquiries/EnquiriesList'));

/* ── Loading Spinner ── */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-10 h-10 border-3 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
      <p className="text-sm text-slate-400 font-medium">Loading…</p>
    </div>
  </div>
);

/* ── Homepage Component ── */
const HomePage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-800">
      <SplashScreen />
      <div className="sticky top-0 z-[100] md:contents">
        <TopBanner />
        <Header />
      </div>
      <main>
        <Hero />
        <About />
        <Placements />
        <Recruiters />
        <Departments />
        <Achievements />
        <ExploreUs />
        <Gallery />
        <Testimonials />
        <Facilities />
      </main>
      <Footer />
    </div>
  );
};

/* ── App with Router ── */
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* About Us */}
          <Route path="/about-us" element={<AboutVCET />} />
          <Route path="/presidents-desk" element={<PresidentsDesk />} />
          <Route path="/principals-desk" element={<PrincipalsDesk />} />
          <Route path="/governing-council" element={<GoverningCouncil />} />
          <Route path="/organizational-structure" element={<OrganizationalStructure />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/strategic-plan" element={<StrategicPlan />} />
          <Route path="/code-of-conduct" element={<CodeOfConduct />} />

          {/* Admission */}
          <Route path="/courses-and-intake" element={<CoursesIntake />} />
          <Route path="/fees-structure" element={<FeesStructure />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/brochure" element={<Brochure />} />
          <Route path="/documents-required" element={<DocumentsRequired />} />
          <Route path="/cut-off" element={<CutOff />} />

          {/* Departments */}
          <Route path="/computer-engineering" element={<DeptComputerEngg />} />
          <Route path="/cs-data-science" element={<DeptCSDS />} />
          <Route path="/cs-data-science/faculty/:slug" element={<CSDSFacultyProfile />} />
          <Route path="/information-technology" element={<DeptIT />} />
          <Route path="/ai-data-science" element={<DeptAIDS />} />
          <Route path="/mechanical-engineering" element={<DeptMech />} />
          <Route path="/electronics-telecomm" element={<DeptENTC />} />
          <Route path="/civil-engineering" element={<DeptCivil />} />
          <Route path="/first-year-engineering" element={<DeptFE />} />

          {/* Academics */}
          <Route path="/dean-academics" element={<DeanAcademics />} />
          <Route path="/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/teaching-learning" element={<TeachingLearning />} />
          <Route path="/swayam-nptel" element={<SwayamNPTEL />} />
          <Route path="/honours-minor" element={<HonoursMinor />} />

          {/* Research */}
          <Route path="/research" element={<ResearchIntro />} />
          <Route path="/funded-research" element={<FundedResearch />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/patents" element={<ResearchPatents />} />
          <Route path="/parents" element={<Patents />} />
          <Route path="/consultancy-projects" element={<ConsultancyProjects />} />
          <Route path="/research-facility" element={<ResearchFacility />} />
          <Route path="/research-conventions" element={<ResearchConventions />} />
          <Route path="/research-policy" element={<ResearchPolicy />} />
          <Route path="/iic" element={<ResearchIIC />} />
          <Route path="/nirf" element={<NIRF />} />
          <Route path="/research-downloads" element={<ResearchDownloads />} />
          <Route path="/downloads" element={<Downloads />} />

          {/* Facilities */}
          <Route path="/central-computing" element={<CentralComputing />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/counseling-cell" element={<CounselingCell />} />
          <Route path="/ladies-common-room" element={<LadiesCommonRoom />} />
          <Route path="/sports-gymkhana" element={<SportsGymkhana />} />
          <Route path="/health-facilities" element={<HealthFacilities />} />
          <Route path="/differently-abled" element={<DifferentlyAbled />} />

          {/* Student Life */}
          <Route path="/career-at-vcet" element={<CareerAtVCET />} />
          <Route path="/students-council" element={<StudentsCouncil />} />
          <Route path="/cultural-committee" element={<CulturalCommittee />} />
          <Route path="/sports-committee" element={<SportsCommittee />} />
          <Route path="/literati" element={<Literati />} />
          <Route path="/nss" element={<NSS />} />
          <Route path="/ebsb" element={<EBSB />} />
          <Route path="/ieee" element={<IEEE />} />
          <Route path="/students-club" element={<StudentsClub />} />
          <Route path="/csi" element={<CSI />} />
          <Route path="/iete" element={<IETE />} />
          <Route path="/ishrae" element={<ISHRAE />} />
          <Route path="/vmea" element={<VMEA />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/nsdc" element={<NSDC />} />
          <Route path="/igbc" element={<IGBC />} />

          {/* Committees */}
          <Route path="/college-development-committee" element={<CollegeDevelopmentCommittee />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/grievance-redressal" element={<GrievanceRedressal />} />
          <Route path="/srgc-committee" element={<SRGCCommittee />} />
          <Route path="/anti-ragging" element={<AntiRagging />} />
          <Route path="/sc-st-committee" element={<SCSTCommittee />} />
          <Route path="/internal-complaint" element={<InternalComplaint />} />
          <Route path="/equal-opportunity" element={<EqualOpportunity />} />
          <Route path="/sedg-cell" element={<SEDGCell />} />

          {/* NAAC */}
          <Route path="/sss" element={<SSS />} />
          <Route path="/sss-report" element={<SSSReport />} />
          <Route path="/ssr-cycle-1" element={<SSRCycle1 />} />
          <Route path="/ssr-cycle-2" element={<SSRCycle2 />} />
          <Route path="/best-practices" element={<BestPractices />} />
          <Route path="/naac-score" element={<NAACScore />} />

          {/* Contact & Others */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/training" element={<Training />} />
          <Route path="/e-cell" element={<ECell />} />
          <Route path="/iiic" element={<IIIC />} />
          <Route path="/exam-cell" element={<ExamCell />} />

          {/* ─── Admin Panel ─── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="notices" element={<NoticesList />} />
            <Route path="notices/new" element={<NoticeForm />} />
            <Route path="notices/:id/edit" element={<NoticeForm />} />
            <Route path="events" element={<EventsList />} />
            <Route path="events/new" element={<EventForm />} />
            <Route path="events/:id/edit" element={<EventForm />} />
            <Route path="placements" element={<PlacementsList />} />
            <Route path="placements/new" element={<PlacementForm />} />
            <Route path="placements/:id/edit" element={<PlacementForm />} />
            <Route path="hero-slides" element={<HeroSlidesList />} />
            <Route path="hero-slides/new" element={<HeroSlideForm />} />
            <Route path="hero-slides/:id/edit" element={<HeroSlideForm />} />
            <Route path="news-ticker" element={<NewsTickerList />} />
            <Route path="news-ticker/new" element={<NewsTickerForm />} />
            <Route path="news-ticker/:id/edit" element={<NewsTickerForm />} />
            <Route path="achievements" element={<AchievementsList />} />
            <Route path="achievements/new" element={<AchievementsForm />} />
            <Route path="achievements/:id/edit" element={<AchievementsForm />} />
            <Route path="testimonials" element={<TestimonialsList />} />
            <Route path="testimonials/new" element={<TestimonialsForm />} />
            <Route path="testimonials/:id/edit" element={<TestimonialsForm />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="placement-partners" element={<PlacementPartnersList />} />
            <Route path="placement-partners/new" element={<PlacementPartnersForm />} />
            <Route path="placement-partners/:id/edit" element={<PlacementPartnersForm />} />
            <Route path="enquiries" element={<EnquiriesList />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
