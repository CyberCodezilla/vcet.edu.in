import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { PageTitleUpdater } from './components/PageTitleUpdater';
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
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

const CAREER_AT_VCET_PDF_URL =
  'https://drive.google.com/file/d/1grwZ4_QIjC23c4HHFCM4xPJuFywsWtgw/view?usp=sharing';

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
const HonoursMinor = lazy(() => import('./pages/academics/HonoursMinor'));
const ExamCell = lazy(() => import('./pages/academics/ExamCell'));

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
const CulturalCommittee = lazy(() => import('./pages/student-life/CulturalCommittee'));
const SportsCommittee = lazy(() => import('./pages/student-life/SportsCommittee'));
const Literati = lazy(() => import('./pages/student-life/Literati'));
const NSS = lazy(() => import('./pages/student-life/NSS'));
const EBSB = lazy(() => import('./pages/student-life/EBSB'));
const StudentsClub = lazy(() => import('./pages/student-life/StudentsClub'));
const Hackathon = lazy(() => import('./pages/student-life/Hackathon'));
const NSDC = lazy(() => import('./pages/student-life/NSDC'));
const Training = lazy(() => import('./pages/student-life/Training'));
const Placement = lazy(() => import('./pages/student-life/Placement'));
const ECell = lazy(() => import('./pages/student-life/ECell'));
const IIIC = lazy(() => import('./pages/student-life/IIIC'));
const Parents = lazy(() => import('./pages/student-life/Parents'));

// pages/clubs
const IEEE = lazy(() => import('./pages/clubs/IEEE'));
const CSI = lazy(() => import('./pages/clubs/CSI'));
const IETE = lazy(() => import('./pages/clubs/IETE'));
const ISHRAE = lazy(() => import('./pages/clubs/ISHRAE'));
const VMEA = lazy(() => import('./pages/clubs/VMEA'));
const IGBC = lazy(() => import('./pages/clubs/IGBC'));

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
const Developers = lazy(() => import('./pages/committees/Developers'));

// pages/naac
const SSS = lazy(() => import('./pages/naac/SSS'));
const SSSReport = lazy(() => import('./pages/naac/SSSReportPage'));
// const SSRCycle1 = lazy(() => import('./pages/naac/SSRCycle1'));
// const SSRCycle2 = lazy(() => import('./pages/naac/SSRCycle2'));
const BestPractices = lazy(() => import('./pages/naac/BestPractices'));
const NAACScore = lazy(() => import('./pages/naac/NAACScore'));
const NaacPage = lazy(() => import('./pages/naac/NAACPage'));

// pages/contact
const ContactUs = lazy(() => import('./pages/contact/ContactUs'));

// pages/footer
const GermanLanguageClubLayout = lazy(() => import('./pages/footer/german-language-club/GermanLanguageClubLayout'));
const GermanClubAbout = lazy(() => import('./pages/footer/german-language-club/GermanClubAbout'));
const GermanClubCourseObjectives = lazy(() => import('./pages/footer/german-language-club/GermanClubCourseObjectives'));
const GermanClubCourseContent = lazy(() => import('./pages/footer/german-language-club/GermanClubCourseContent'));
const GermanClubActivities = lazy(() => import('./pages/footer/german-language-club/GermanClubActivities'));
const GermanClubGallery = lazy(() => import('./pages/footer/german-language-club/GermanClubGallery'));
const GermanClubFaculty = lazy(() => import('./pages/footer/german-language-club/GermanClubFaculty'));
const HelplineForDivyangjan = lazy(() => import('./pages/footer/HelplineForDivyangjan'));

// pages/mms
const MMSHome = lazy(() => import('./pages/mms/MMSHome'));
const MMSAbout = lazy(() => import('./pages/mms/about/MMSAbout'));
const MMSPrincipalsDesk = lazy(() => import('./pages/mms/about/MMSPrincipalsDesk'));
const MMSHODsDesk = lazy(() => import('./pages/mms/about/MMSHODsDesk'));
const MMSFaculty = lazy(() => import('./pages/mms/about/MMSFaculty'));
const MMSVisionMission = lazy(() => import('./pages/mms/about/MMSVisionMission'));
const MMSDAB = lazy(() => import('./pages/mms/about/MMSDAB'));
const MMSProgramOutcomes = lazy(() => import('./pages/mms/about/MMSProgramOutcomes'));
const MMSAdmission = lazy(() => import('./pages/mms/admission/MMSAdmission'));
const MMSScholarship = lazy(() => import('./pages/mms/admission/MMSScholarship.tsx'));
const MMSDocumentsRequired = lazy(() => import('./pages/mms/admission/MMSDocumentsRequired'));
const MMSFeesStructure = lazy(() => import('./pages/mms/admission/MMSFeesStructure'));
const MMSExperientialLearning = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialLearning'));
const MMSExperientialRolePlay = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialRolePlay'));
const MMSExperientialGroupDiscussion = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialGroupDiscussion'));
const MMSExperientialEntrepreneurialDrive = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialEntrepreneurialDrive'));
const MMSExperientialFinancialLiteracy = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialFinancialLiteracy'));
const MMSExperientialNesco = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialNesco'));
const MMSExperientialModelMaking = lazy(() => import('./pages/mms/experiential-learning/MMSExperientialModelMaking'));
const MMSTraining = lazy(() => import('./pages/mms/training-placement/MMSTraining'));
const MMSTrainingEvents = lazy(() => import('./pages/mms/training-placement/MMSTrainingEvents'));
const MMSTrainingCareerGuidance = lazy(() => import('./pages/mms/training-placement/MMSTrainingCareerGuidance'));
const MMSTrainingInternship = lazy(() => import('./pages/mms/training-placement/MMSTrainingInternship'));
const MMSTrainingGallery = lazy(() => import('./pages/mms/training-placement/MMSTrainingGallery'));
const MMSPlacement = lazy(() => import('./pages/mms/training-placement/MMSPlacement'));
const MMSPlacementSoftSkillTraining = lazy(() => import('./pages/mms/training-placement/MMSPlacementSoftSkillTraining'));
const MMSPlacementPsycometricTest = lazy(() => import('./pages/mms/training-placement/MMSPlacementPsycometricTest'));
const MMSPlacementCell = lazy(() => import('./pages/mms/training-placement/MMSPlacementCell'));
const MMSPlacementGallery = lazy(() => import('./pages/mms/training-placement/MMSPlacementGallery'));
const MMSPlacementRecruiters = lazy(() => import('./pages/mms/training-placement/MMSPlacementRecruiters'));
const MMSPlacementStudentsPlacements = lazy(() => import('./pages/mms/training-placement/MMSPlacementStudentsPlacements'));
const MMSPlacementInternships = lazy(() => import('./pages/mms/training-placement/MMSPlacementInternships'));
const MMSStudentsLife = lazy(() => import('./pages/mms/students-life/MMSStudentsLife'));
const MMSStudentsLifeVEcstatic = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeVEcstatic'));
const MMSStudentsLifeDLLE = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeDLLE'));
const MMSStudentsLifeBookReview = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeBookReview'));
const MMSStudentsLifeAboutAddOnCourses = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeAboutAddOnCourses'));
const MMSStudentsLifePowerBi = lazy(() => import('./pages/mms/students-life/MMSStudentsLifePowerBi'));
const MMSStudentsLifeAdavanceExcel = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeAdavanceExcel'));
const MMSStudentsLifeIndustryExpertSessions = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeIndustryExpertSessions'));
const MMSStudentsLifeNSIMTraining = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeNSIMTraining'));
const MMSStudentsLifeOscillations = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeOscillations'));
const MMSStudentsLifeIdeathon = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeIdeathon'));
const MMSStudentsLifeRankers = lazy(() => import('./pages/mms/students-life/MMSStudentsLifeRankers'));
const MMSFacilities = lazy(() => import('./pages/mms/facilities/MMSFacilities'));
const MMSFacilitiesLibrary = lazy(() => import('./pages/mms/facilities/MMSFacilitiesLibrary'));
const MMSFacilitiesSeminarHall = lazy(() => import('./pages/mms/facilities/MMSFacilitiesSeminarHall'));
const MMSFacilitiesClassroom = lazy(() => import('./pages/mms/facilities/MMSFacilitiesClassroom'));
const MMSFacilitiesGymkhana = lazy(() => import('./pages/mms/facilities/MMSFacilitiesGymkhana'));
const MMSFAQs = lazy(() => import('./pages/mms/faqs/MMSFAQs'));

// pages/academics/exam
const ExamDashboard = lazy(() => import('./pages/academics/exam/ExamDashboard'));
const ExamAbout = lazy(() => import('./pages/academics/exam/ExamAbout'));
const ExamSyllabus = lazy(() => import('./pages/academics/exam/ExamSyllabus'));
const ExamTimetable = lazy(() => import('./pages/academics/exam/ExamTimetable'));
const ExamQuestionPaper = lazy(() => import('./pages/academics/exam/ExamQuestionPaper'));
const ExamSamplePapers = lazy(() => import('./pages/academics/exam/ExamSamplePapers'));
const ExamResults = lazy(() => import('./pages/academics/exam/ExamResults'));
const ExamVerification = lazy(() => import('./pages/academics/exam/ExamVerification'));
const ExamNotices = lazy(() => import('./pages/academics/exam/ExamNotices'));

/* ── Admin Panel Pages (lazy) ── */
const AdminLogin = lazy(() => import('./admin/pages/Login'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard'));
const NoticesList = lazy(() => import('./admin/pages/notices/NoticesList'));
const NoticeForm = lazy(() => import('./admin/pages/notices/NoticeForm'));
const EventsList = lazy(() => import('./admin/pages/events/EventsList'));
const EventForm = lazy(() => import('./admin/pages/events/EventForm'));
const PlacementsList = lazy(() => import('./admin/pages/placements/PlacementsList'));
const PlacementForm = lazy(() => import('./admin/pages/placements/PlacementForm'));
const PlacementStats = lazy(() => import('./admin/pages/placements/PlacementStats'));
const HeroSlidesList = lazy(() => import('./admin/pages/hero-slides/HeroSlidesList'));
const HeroSlideForm = lazy(() => import('./admin/pages/hero-slides/HeroSlideForm'));
const GalleryList = lazy(() => import('./admin/pages/gallery/GalleryList'));
const GalleryForm = lazy(() => import('./admin/pages/gallery/GalleryForm'));
const NewsTickerList = lazy(() => import('./admin/pages/news-ticker/NewsTickerList'));
const NewsTickerForm = lazy(() => import('./admin/pages/news-ticker/NewsTickerForm'));
const AchievementsList = lazy(() => import('./admin/pages/achievements/AchievementsList'));
const AchievementsForm = lazy(() => import('./admin/pages/achievements/AchievementsForm'));
const TestimonialsList = lazy(() => import('./admin/pages/testimonials/TestimonialsList'));
const TestimonialsForm = lazy(() => import('./admin/pages/testimonials/TestimonialsForm'));
const GalleryPage = lazy(() => import('./admin/pages/gallery/GalleryPage'));
const PlacementPartnersList = lazy(() => import('./admin/pages/placement-partners/PlacementPartnersList'));
const PlacementPartnersForm = lazy(() => import('./admin/pages/placement-partners/PlacementPartnersForm'));
const EnquiriesList = lazy(() => import('./admin/pages/enquiries/EnquiriesList'));
const SitePages = lazy(() => import('./admin/pages/pages/SitePages'));
const FacultyList = lazy(() => import('./admin/pages/faculty/FacultyList'));
const FacultyForm = lazy(() => import('./admin/pages/faculty/FacultyForm'));
const DepartmentLanding = lazy(() => import('./admin/pages/departments/DepartmentLanding'));
const DepartmentList = lazy(() => import('./admin/pages/departments/DepartmentList'));
const DepartmentForm = lazy(() => import('./admin/pages/departments/DepartmentForm'));

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
const ExternalRedirect: React.FC<{ to: string }> = ({ to }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return <PageLoader />;
};

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
    <div className="home-page min-h-screen font-sans bg-white text-slate-800">
      <SplashScreen />
      <div className="relative z-[100]">
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
      <PageTitleUpdater />
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
            <Route path="/computer-engineering/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/cs-data-science" element={<DeptCSDS />} />
            <Route path="/cs-data-science/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/information-technology" element={<DeptIT />} />
            <Route path="/information-technology/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/ai-data-science" element={<DeptAIDS />} />
            <Route path="/ai-data-science/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/mechanical-engineering" element={<DeptMech />} />
            <Route path="/mechanical-engineering/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/electronics-telecomm" element={<DeptENTC />} />
            <Route path="/electronics-telecommunication/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/civil-engineering" element={<DeptCivil />} />
            <Route path="/civil-engineering/faculty/:slug" element={<CSDSFacultyProfile />} />
            <Route path="/first-year-engineering" element={<DeptFE />} />
            <Route path="/first-year-engineering/faculty/:slug" element={<CSDSFacultyProfile />} />

          {/* Academics */}
          <Route path="/dean-academics" element={<DeanAcademics />} />
          <Route path="/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/teaching-learning" element={<TeachingLearning />} />
          <Route path="/honours-minor" element={<HonoursMinor />} />

          {/* Research */}
          <Route path="/research" element={<ResearchIntro />} />
          <Route path="/funded-research" element={<FundedResearch />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/patents" element={<ResearchPatents />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/consultancy-projects" element={<ConsultancyProjects />} />
          <Route path="/research-facility" element={<ResearchFacility />} />
          <Route path="/research-conventions" element={<ResearchConventions />} />
          <Route path="/research-policy" element={<ResearchPolicy />} />
          <Route path="/iic" element={<ResearchIIC />} />
          <Route path="/nirf" element={<NIRF />} />
          <Route path="/research-downloads" element={<ResearchDownloads />} />
          <Route path="/downloads" element={<ResearchDownloads />} />

            {/* Facilities */}
            <Route path="/central-computing" element={<CentralComputing />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/counseling-cell" element={<CounselingCell />} />
            <Route path="/ladies-common-room" element={<LadiesCommonRoom />} />
            <Route path="/sports-gymkhana" element={<SportsGymkhana />} />
            <Route path="/health-facilities" element={<HealthFacilities />} />
            <Route path="/differently-abled" element={<DifferentlyAbled />} />

            {/* Student Life */}
            <Route path="/career-at-vcet" element={<ExternalRedirect to={CAREER_AT_VCET_PDF_URL} />} />
            <Route path="/students-council" element={<Navigate to="/" replace />} />
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
            <Route path="/developers" element={<Developers />} />

          {/* NAAC */}
          {/* <Route path="/naac-ssr-cycle-1" element={<NaacPage />} /> */}
          <Route path="/sss" element={<SSS />} />
          <Route path="/sss-report" element={<SSSReport />} />
          <Route path="/ssr-cycle-1" element={<NaacPage initialCycle="cycle1" />} />
          <Route path="/ssr-cycle-2" element={<NaacPage initialCycle="cycle2" />} />
          <Route path="/best-practices" element={<BestPractices />} />
          <Route path="/naac-score" element={<NAACScore />} />

            {/* Contact & Others */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/training" element={<Training />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/e-cell" element={<ECell />} />
            <Route path="/iiic" element={<IIIC />} />
            {/* Exam Section */}
            <Route path="/exam" element={<ExamDashboard />} />
            <Route path="/exam/about" element={<ExamAbout />} />
            <Route path="/exam/syllabus" element={<ExamSyllabus />} />
            <Route path="/exam/timetable" element={<ExamTimetable />} />
            <Route path="/exam/question-paper" element={<ExamQuestionPaper />} />
            <Route path="/exam/sample-papers" element={<ExamSamplePapers />} />
            <Route path="/exam/results" element={<ExamResults />} />
            <Route path="/exam/verification" element={<ExamVerification />} />
            <Route path="/exam/notices" element={<ExamNotices />} />
            <Route path="/exam-cell" element={<Navigate to="/exam" replace />} />
            <Route path="/helpline-for-divyangjan" element={<HelplineForDivyangjan />} />

            {/* Footer Pages */}
            <Route path="/german-language-club" element={<GermanLanguageClubLayout />}>
              <Route index element={<Navigate to="about" replace />} />
              <Route path="about" element={<GermanClubAbout />} />
              <Route path="course-objectives" element={<GermanClubCourseObjectives />} />
              <Route path="course-content" element={<GermanClubCourseContent />} />
              <Route path="activities" element={<GermanClubActivities />} />
              <Route path="gallery" element={<GermanClubGallery />} />
              <Route path="faculty" element={<GermanClubFaculty />} />
            </Route>

          {/* MMS mini-site */}
          <Route path="/mms" element={<MMSHome />} />
          <Route path="/mms/about" element={<MMSAbout />} />
          <Route path="/mms/about/principals-desk" element={<MMSPrincipalsDesk />} />
          <Route path="/mms/about/hods-desk" element={<MMSHODsDesk />} />
          <Route path="/mms/about/faculty" element={<MMSFaculty />} />
          <Route path="/mms/about/vision-mission" element={<MMSVisionMission />} />
          <Route path="/mms/about/dab" element={<MMSDAB />} />
          <Route path="/mms/about/program-outcomes" element={<MMSProgramOutcomes />} />
          <Route path="/mms/admission" element={<MMSAdmission />} />
          <Route path="/mms/admission/scholarship" element={<MMSScholarship />} />
          <Route path="/mms/admission/documents-required" element={<MMSDocumentsRequired />} />
          <Route path="/mms/admission/fees-structure" element={<MMSFeesStructure />} />
          <Route path="/mms/admission-details" element={<MMSAdmission />} />
          <Route path="/mms/admission-details/scholarship" element={<MMSScholarship />} />
          <Route path="/mms/admission-details/documents-required" element={<MMSDocumentsRequired />} />
          <Route path="/mms/admission-details/fees-structure" element={<MMSFeesStructure />} />
          <Route path="/mms/experiential-learning" element={<MMSExperientialLearning />} />
          <Route path="/mms/experiential-learning/role-play" element={<MMSExperientialRolePlay />} />
          <Route path="/mms/experiential-learning/group-discussion" element={<MMSExperientialGroupDiscussion />} />
          <Route path="/mms/experiential-learning/entrepreneurial-drive" element={<MMSExperientialEntrepreneurialDrive />} />
          <Route path="/mms/experiential-learning/financial-literacy-program" element={<MMSExperientialFinancialLiteracy />} />
          <Route path="/mms/experiential-learning/nesco-bombay-exhibition-centre" element={<MMSExperientialNesco />} />
          <Route path="/mms/experiential-learning/3d-model-making-presentation" element={<MMSExperientialModelMaking />} />
          <Route path="/mms/training-placement/training" element={<MMSTraining />} />
          <Route path="/mms/training-placement/training/events" element={<MMSTrainingEvents />} />
          <Route path="/mms/training-placement/training/career-guidance" element={<MMSTrainingCareerGuidance />} />
          <Route path="/mms/training-placement/training/internship" element={<MMSTrainingInternship />} />
          <Route path="/mms/training-placement/training/gallery" element={<MMSTrainingGallery />} />
          <Route path="/mms/training-placement/placement" element={<MMSPlacement />} />
          <Route path="/mms/training-placement/placement/soft-skill-training" element={<MMSPlacementSoftSkillTraining />} />
          <Route path="/mms/training-placement/placement/psycometric-test" element={<MMSPlacementPsycometricTest />} />
          <Route path="/mms/training-placement/placement/psychometric-test" element={<MMSPlacementPsycometricTest />} />
          <Route path="/mms/training-placement/placement/placement-cell" element={<MMSPlacementCell />} />
          <Route path="/mms/training-placement/placement/gallery" element={<MMSPlacementGallery />} />
          <Route path="/mms/training-placement/placement/our-recruiters" element={<MMSPlacementRecruiters />} />
          <Route path="/mms/training-placement/placement/students-placements" element={<MMSPlacementStudentsPlacements />} />
          <Route path="/mms/training-placement/placement/internships" element={<MMSPlacementInternships />} />
          <Route path="/mms/students-life" element={<MMSStudentsLife />} />
          <Route path="/mms/students-life/v-ecstatic" element={<MMSStudentsLifeVEcstatic />} />
          <Route path="/mms/students-life/dlle" element={<MMSStudentsLifeDLLE />} />
          <Route path="/mms/students-life/book-review" element={<MMSStudentsLifeBookReview />} />
          <Route path="/mms/students-life/about-add-on-courses" element={<MMSStudentsLifeAboutAddOnCourses />} />
          <Route path="/mms/students-life/add-on-courses-powerbi" element={<MMSStudentsLifePowerBi />} />
          <Route path="/mms/students-life/add-on-courses-advance-excel" element={<MMSStudentsLifeAdavanceExcel />} />
          <Route path="/mms/students-life/add-on-courses-adavance-excel" element={<MMSStudentsLifeAdavanceExcel />} />
          <Route path="/mms/students-life/industry-expert-sessions" element={<MMSStudentsLifeIndustryExpertSessions />} />
          <Route path="/mms/students-life/nsim-training" element={<MMSStudentsLifeNSIMTraining />} />
          <Route path="/mms/students-life/oscillations" element={<MMSStudentsLifeOscillations />} />
          <Route path="/mms/students-life/ideathon-1-0" element={<MMSStudentsLifeIdeathon />} />
          <Route path="/mms/students-life/rankers" element={<MMSStudentsLifeRankers />} />
          <Route path="/mms/facilities" element={<MMSFacilities />} />
          <Route path="/mms/facilities/library" element={<MMSFacilitiesLibrary />} />
          <Route path="/mms/facilities/seminar-hall" element={<MMSFacilitiesSeminarHall />} />
          <Route path="/mms/facilities/classroom" element={<MMSFacilitiesClassroom />} />
          <Route path="/mms/facilities/gymkhana" element={<MMSFacilitiesGymkhana />} />
          <Route path="/mms/faqs" element={<MMSFAQs />} />

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
            <Route path="home/placement-stats" element={<PlacementStats />} />
            <Route path="hero-slides" element={<HeroSlidesList />} />
            <Route path="hero-slides/new" element={<HeroSlideForm />} />
            <Route path="hero-slides/:id/edit" element={<HeroSlideForm />} />
            <Route path="galleries" element={<GalleryList />} />
            <Route path="galleries/new" element={<GalleryForm />} />
            <Route path="galleries/:id/edit" element={<GalleryForm />} />
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
            <Route path="pages" element={<Navigate to="home" replace />} />
            <Route path="pages/departments" element={<DepartmentLanding />} />
            <Route path="pages/departments/list" element={<DepartmentList />} />
            <Route path="pages/departments/list/create" element={<DepartmentForm />} />
            <Route path="pages/departments/list/:slug/edit" element={<DepartmentForm />} />
            <Route path="pages/faculty" element={<FacultyList />} />
            <Route path="pages/faculty/create" element={<FacultyForm />} />
            <Route path="pages/faculty/:id/edit" element={<FacultyForm />} />
            <Route path="pages/:pageKey" element={<SitePages />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;