import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SITE_PAGE_TABS } from './sitePagesConfig';
import AdmissionForm from '../admission/AdmissionForm';
import ScholarshipForm from '../admission/ScholarshipForm';
import AcademicsForm from '../academics/AcademicsForm';
import ExamsForm from '../exams/ExamsForm';
import CommitteesForm from '../committees/CommitteesForm';
import ResearchForm from '../research/ResearchForm';
import FacilitiesForm from '../facilities/FacilitiesForm';
import AboutUsForm from '../about/AboutUsForm';
import NaacForm from '../naac/NaacForm';
import TrainingPlacementForm from '../training-placement/TrainingPlacementForm';
import StudentCareerForm from '../student-career/StudentCareerForm';

const homeEditables = [
  {
    title: 'Placements Stats',
    description: 'Manage placement records and yearly placement statistics shown on the homepage.',
    links: [{ label: 'Edit Placement Stats', to: '/admin/home/placement-stats' }],
  },
  {
    title: 'Where Our Alumni Thrive',
    description: 'Update alumni stories and partner logos for the alumni/recruiter section.',
    links: [
      { label: 'Edit Testimonials', to: '/admin/testimonials' },
      { label: 'Edit Placement Partners', to: '/admin/placement-partners' },
    ],
  },
  {
    title: 'Remarkable Achievements',
    description: 'Add, edit, or reorder achievement highlights displayed on the homepage.',
    links: [{ label: 'Edit Achievements', to: '/admin/achievements' }],
  },
  {
    title: 'Gallery and Labs',
    description: 'Upload and manage homepage gallery/lab images and captions.',
    links: [{ label: 'Edit Gallery', to: '/admin/gallery' }],
  },
];

const admissionEditables = [
  {
    title: 'Intake & Information',
    description: 'Manage yearly intake seats and general admission information.',
    links: [{ label: 'Edit Intake Details', section: 'intake' }],
  },
  {
    title: 'Financials & Verification',
    description: 'Update fees structure and the list of required documents for students.',
    links: [
      { label: 'Edit Fees Structure', section: 'fees' },
      { label: 'Edit Required Documents', section: 'documents' },
    ],
  },
  {
    title: 'Admission Cutoffs',
    description: 'Manage historical and current year cutoff trends for various branches.',
    links: [{ label: 'Edit Cutoffs', section: 'cutoffs' }],
  },
  {
    title: 'Promotional Materials',
    description: 'Update the official college brochure and other admission assets.',
    links: [{ label: 'Edit Brochure', section: 'brochure' }],
  },
  {
    title: 'Scholarships',
    description: 'Manage institutional and government scholarship details and application forms.',
    links: [{ label: 'Edit Scholarships', section: 'scholarships' }],
  },
];

const academicsEditables = [
  {
    title: 'Academic Calendars',
    description: 'Manage and upload yearly academic calendars and session schedules.',
    links: [{ label: 'Edit Calendars', section: 'calendars' }],
  },
  {
    title: 'Program Booklets',
    description: 'Update institutional booklets for various degree programs and syllabus.',
    links: [{ label: 'Edit Booklets', section: 'booklets' }],
  },
  
];


const examEditables = [
  {
    title: 'University Materials',
    description: 'Manage institutional syllabus records and program structures.',
    links: [{ label: 'Edit Syllabus', section: 'syllabus' }],
  },
  {
    title: 'Exam Logistics',
    description: 'Update examination schedules and yearly timetables.',
    links: [{ label: 'Edit Timetables', section: 'timetable' }],
  },
  {
    title: 'Academic Resources',
    description: 'Manage previous years question papers and sample mock tests.',
    links: [
      { label: 'Edit Question Papers', section: 'questionPapers' },
      { label: 'Edit Sample Papers', section: 'samplePapers' },
    ],
  },
  {
    title: 'Results & Exam Notices',
    description: 'Manage university results and important examination related notices.',
    links: [
      { label: 'Edit Results', section: 'results' },
      { label: 'Edit Exam Notices', section: 'notices' },
    ],
  },
];

const committeesEditables = [
  { slug: 'cdc', title: 'College Development Committee', description: 'Institutional planning, governance, and development.' },
  { slug: 'iqac', title: 'IQAC', description: 'Quality assurance, AQAR reports, and academic standards.' },
  { slug: 'anti-ragging', title: 'Anti-Ragging Committee', description: 'Safe campus protocols and student welfare monitoring.' },
  { slug: 'grievance', title: 'Grievance Redressal Committee', description: 'Addressing institutional complaints and staff grievances.' },
  { slug: 'sgrc', title: 'Student Grievance Committee', description: 'Student-specific complaint handling and SGRC guidelines.' },
  { slug: 'sc-st', title: 'SC-ST Committee', description: 'Promoting inclusivity and welfare for SC/ST students.' },
  { slug: 'icc', title: 'Internal Complaint Committee', description: 'Prevention of harassment and internal redressal protocols.' },
  { slug: 'equal-opportunity', title: 'Equal Opportunity Cell', description: 'Inclusivity documents and non-discrimination cell.' },
  { slug: 'sedg', title: 'SEDG Cell', description: 'Socio-Economically Disadvantaged Groups welfare.' },
];

const researchEditables = [
  { slug: 'research-intro', title: 'Research Introduction', description: 'Institutional R&D Hub and PhD datasets.' },
  { slug: 'funded-research', title: 'Funded Research', description: 'External funding records and reports.' },
  { slug: 'publications', title: 'Publications', description: 'Books, Journals, and Conference papers.' },
  { slug: 'patents', title: 'Patents', description: 'Intellectual property and patent records.' },
  { slug: 'consultancy', title: 'Consultancy Projects', description: 'Industry projects and revenue datasets.' },
  { slug: 'research-facility', title: 'Research Facility', description: 'Infrastructure and specialized R&D labs.' },
  { slug: 'conventions', title: 'Research Conventions', description: 'Institutional research convention documents.' },
  { slug: 'research-policy', title: 'Research Policy', description: 'Institutional R&D policies and guidelines.' },
  { slug: 'iic', title: 'IIC', description: 'Innovation cell achievements and reports.' },
  { slug: 'nirf', title: 'NIRF', description: 'NIRF ranking documents and reports.' },
  { slug: 'downloads', title: 'Downloads', description: 'Research-related downloadable forms.' },
];

const facilitiesEditables = [
  { slug: 'central-computing', title: 'Central Computing', description: 'Institutional computing infrastructure, staff, and labs.' },
  { slug: 'counselling-cell', title: 'Counselling Cell', description: 'Student counselling, mentors, and general records.' },
  { slug: 'differently-abled', title: 'Differently Abled Facilities', description: 'Facilities for differently abled individuals.' },
  { slug: 'health-facilities', title: 'Health Facilities', description: 'Campus health and medical facilities.' },
  { slug: 'ladies-common-room', title: 'Ladies Common Room', description: 'Rest and recreation activities for female students.' },
  { slug: 'library', title: 'Library (VCET Library Page)', description: 'Library rules, memberships, contact info, and statistics.' },
  { slug: 'sports-gymkhana', title: 'Sports & Gymkhana', description: 'Sports facilities, event records, and operational rules.' }
];

const naacEditables = [
  { slug: 'sss-report', title: 'SSS Report', description: 'Year-wise SSS reports and overarching document collection.' },
  { slug: 'ssr-cycle-1', title: 'SSR Cycle 1', description: 'Basic details, QIF, Extended Profile, DVV standard verifications.' },
  { slug: 'ssr-cycle-2', title: 'SSR Cycle 2', description: 'Basic details, QIF, Extended Profile, DVV standard verifications.' },
  { slug: 'best-practices', title: 'Best Practices & Distinctiveness', description: 'Manage institutional unique best practices.' },
  { slug: 'naac-score', title: 'NAAC Accreditation Score', description: 'Score summary, validity, and official certification details.' },
];

const aboutEditables = [
  { slug: 'overview', title: 'Institute Overview', description: 'Institutional history, accreditation, and quick facts.' },
  { slug: 'president-desk', title: 'President\'s Desk', description: 'Leadership message and profile of the President.' },
  { slug: 'principal-desk', title: 'Principal\'s Desk', description: 'Leadership message and profile of the Principal.' },
  { slug: 'governing-council', title: 'Governing Council', description: 'Institutional board members and governance structure.' },
  { slug: 'org-structure', title: 'Organizational Structure', description: 'Institutional hierarchy and reporting lines.' },
  { slug: 'administration', title: 'Administration', description: 'Key administrative officers and contacts.' },
  { slug: 'strategic-plan', title: 'Strategic Plan', description: 'Institutional strategic planning and development documents.' },
  { slug: 'code-of-conduct', title: 'Code of Conduct', description: 'Rules and professional ethics for stakeholders.' },
];

const studentCareerEditables = [
  {
    title: "Extracurricular Activities (Student Council)",
    description: "Manage cultural, sports, and other committees.",
    links: [
      { label: "Cultural Committee", section: "cultural-committee" },
      { label: "Sports Committee", section: "sports-committee" },
      { label: "Literati", section: "literati" },
      { label: "NSS", section: "nss" },
      { label: "EBSB", section: "ebsb" }
    ]
  },
  {
    title: "Co-Curricular Activities",
    description: "Manage IEEE, CSI, IETE, ISHRAE, VMEA, Hackathon, NSDC, and IGBC.",
    links: [
      { label: "IEEE", section: "ieee" },
      { label: "CSI", section: "csi" },
      { label: "IETE", section: "iete" },
      { label: "ISHRAE", section: "ishrae" },
      { label: "VMEA", section: "vmea" },
      { label: "Hackathon", section: "hackathon-events" },
      { label: "NSDC", section: "nsdc" },
      { label: "IGBC", section: "igbc" }
    ]
  },
  {
    title: "Student Clubs",
    description: "Manage specialized projects like Ethan, Solecthon, Centurion, Airnova, and Emechto.",
    links: [
      { label: "Ethan / Solecthon", section: "external-projects" },
      { label: "Centurion", section: "centurion" },
      { label: "Airnova", section: "airnova" },
      { label: "Emechto", section: "emechto" }
    ]
  }
];
const trainingPlacementEditables = [
  { slug: 'placement', title: 'Placement', description: 'Manage Placement Cell profiles, statistics, gallery, and recruiters.' },
  { slug: 'training', title: 'Training', description: 'Manage training events, career guidance seminars, and gallery.' },
  { slug: 'e-cell', title: 'E-Cell', description: 'Manage Entrepreneurship Cell events, coordinators, and gallery.' },
  { slug: 'iiic', title: 'IIIC', description: 'Manage Industry Institute Interaction Cell guidelines.' },
];

const mmsEditables = [
  {
    title: 'About',
    description: 'Manage the MMS department overview, vision, mission, program highlights, and general information.',
    links: [
      { label: 'About MMS', to: '/admin/pages/mms/about/overview/edit' },
      { label: "Principal's Desk", to: '/admin/pages/mms/about/principal/edit' },
      { label: "HOD's Desk", to: '/admin/pages/mms/about/hod/edit' },
      { label: 'MMS Faculty', to: '/admin/pages/mms/about/faculty/edit' },
      { label: 'DAB', to: '/admin/pages/mms/about/dab/edit' },
    ],
  },
  {
    title: 'Admission Details',
    description: 'Manage admission eligibility, entrance exams, scholarship programs, required documents, fee structure, and admission PDF resources.',
    links: [
      { label: 'Admission Info', to: '/admin/pages/mms/admission/edit' },
      { label: 'Scholarship', to: '/admin/pages/mms/scholarship/edit' },
      { label: 'Documents Required', to: '/admin/pages/mms/documents/edit' },
      { label: 'Fee Structure', to: '/admin/pages/mms/fees/edit' },
    ],
  },
  {
    title: 'Experiential Learning',
    description: 'Manage experiential learning activities including role play, group discussions, entrepreneurial drives, financial literacy programs, and 3D model making.',
    links: [
      { label: 'Role Play', to: '/admin/pages/mms/experiential-learning/role-play/edit' },
      { label: 'Group Discussion', to: '/admin/pages/mms/experiential-learning/group-discussion/edit' },
      { label: 'Entrepreneurial Drive', to: '/admin/pages/mms/experiential-learning/entrepreneurial-drive/edit' },
      { label: 'Financial Literacy', to: '/admin/pages/mms/experiential-learning/financial-literacy/edit' },
      { label: 'NESCO Visit', to: '/admin/pages/mms/experiential-learning/nesco-visit/edit' },
      { label: '3D Model Making', to: '/admin/pages/mms/experiential-learning/model-making/edit' },
    ],
  },
  {
    title: 'Training & Placements',
    description: 'Manage placement objectives, events, training modules, placement galleries, and recruiter list for MMS.',
    links: [
      { label: 'Training', to: '/admin/pages/mms/training/edit' },
      { label: 'Placement Info', to: '/admin/pages/mms/placement-info/edit' },
      { label: 'OJT & Internships', to: '/admin/pages/mms/ojt-internships/edit' },
      { label: 'Student Placements', to: '/admin/pages/mms/student-placements/edit' },
    ],
  },
  {
    title: "Student's Life",
    description: 'Manage student activities, cultural events, sports, clubs, and campus life content for MMS students.',
    links: [
      { label: 'Overview', to: '/admin/pages/mms/students-life/overview/edit' },
      { label: 'V-Ecstatic (Fest)', to: '/admin/pages/mms/students-life/v-ecstatic/edit' },
      { label: 'DLLE', to: '/admin/pages/mms/students-life/dlle/edit' },
      { label: 'Book Review', to: '/admin/pages/mms/students-life/book-review/edit' },
      { label: 'Add-On Courses', to: '/admin/pages/mms/students-life/add-on-courses/edit' },
        { label: 'Add-On Courses on Powerbi', to: '/admin/pages/mms/students-life/add-on-courses-powerbi/edit' },
        { label: 'ADD ON COURSES ON ADVANCE EXCEL', to: '/admin/pages/mms/students-life/advance-excel/edit' },
      { label: 'Industry Sessions', to: '/admin/pages/mms/students-life/industry-sessions/edit' },
      { label: 'Ideation', to: '/admin/pages/mms/students-life/ideation/edit' },
      { label: 'Oscillations', to: '/admin/pages/mms/students-life/oscillations/edit' },
      { label: 'NSIM Training', to: '/admin/pages/mms/students-life/nsimTraining/edit' },
      { label: 'Rankers & Achievements', to: '/admin/pages/mms/students-life/rankers/edit' },
      { label: 'PDF Resources', to: '/admin/pages/mms/students-life/pdfs/edit' },
      { label: 'Custom Events Builder', to: '/admin/pages/mms/students-life/custom-events/edit' },
    ],
  },
  {
    title: 'Syllabus',
    description: 'Manage MMS syllabus documents, semester-wise course structure, and curriculum downloads.',
    links: [
      { label: 'First Year', to: '/admin/pages/mms/syllabus/first-year/edit' },
      { label: 'Second Year', to: '/admin/pages/mms/syllabus/second-year/edit' },
    ],
  },
  {
    title: 'Facilities',
    description: 'Manage MMS department facilities including classrooms, labs, library, computer center, and infrastructure details.',
    links: [
      { label: 'Computer Labs', to: '/admin/pages/mms/facilities/computer-labs/edit' },
      { label: 'Library', to: '/admin/pages/mms/facilities/library/edit' },
      { label: 'Seminar Hall', to: '/admin/pages/mms/facilities/seminar-hall/edit' },
      { label: 'Classroom', to: '/admin/pages/mms/facilities/classroom/edit' },
      { label: 'Gymkhana', to: '/admin/pages/mms/facilities/gymkhana/edit' },
    ],
  },
  {
    title: "FAQ's (Information Hub)",
    description: 'Manage frequently asked questions and their answers.',
    links: [
      { label: 'Manage FAQs', to: '/admin/pages/mms/faqs/edit' },
    ],
  },
];

const SitePages: React.FC = () => {
  const { pageKey = 'home' } = useParams<{ pageKey: string }>();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const activeTab = SITE_PAGE_TABS.find((tab) => tab.key === pageKey);

  // Reset active section when tab changes
  useEffect(() => {
    setActiveSection(null);
  }, [pageKey]);

  if (!activeTab) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="text-sm text-slate-500 mt-1">Please select a valid page from the Pages menu.</p>
        <Link to="/admin/pages/home" className="inline-flex mt-4 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-sm font-semibold">
          Go to Home Page Editor
        </Link>
      </div>
    );
  }

  // Handle Section-specific Editors
  if (activeTab.key === 'admission' && activeSection) {
    if (activeSection === 'scholarships') {
      return <ScholarshipForm onBack={() => setActiveSection(null)} />;
    }
    return <AdmissionForm activeSection={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'academics' && activeSection) {
    return <AcademicsForm activeSection={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'exam' && activeSection) {
    return <ExamsForm activeSection={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'committees' && activeSection) {
    return <CommitteesForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'research' && activeSection) {
    return <ResearchForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'facilities' && activeSection) {
    return <FacilitiesForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'naac' && activeSection) {
    return <NaacForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'about-us' && activeSection) {
    return <AboutUsForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'training-placement' && activeSection) {
    return <TrainingPlacementForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'student-career' && activeSection) {
    return <StudentCareerForm slug={activeSection} onBack={() => setActiveSection(null)} />;
  }

  // Handle Hub/Direct Views
  if (activeTab.key === 'admission') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admission Module</h1>
          <p className="text-sm text-slate-500 mt-1">Choose a section below to manage admission content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {admissionEditables.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.links.map((link) => (
                  <button
                    key={link.section}
                    onClick={() => setActiveSection(link.section)}
                    className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'academics') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academics Module</h1>
          <p className="text-sm text-slate-500 mt-1">Choose a section below to manage academic content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicsEditables.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.links.map((link) => (
                  <button
                    key={link.section}
                    onClick={() => setActiveSection(link.section)}
                    className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'exam') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Exams & Examination Cell</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage all examination records, materials, and internal resources here.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examEditables.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {item.links.map((link) => (
                  <button
                    key={link.section}
                    onClick={() => setActiveSection(link.section)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-[11px] uppercase tracking-wider font-extrabold hover:bg-blue-700 transition-all shadow-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'committees') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Committees Page Editor</h1>
          <p className="text-sm text-slate-500 mt-1">Manage institutional governance, quality assurance, and welfare committees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {committeesEditables.map((item) => (
            <div key={item.slug} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setActiveSection(item.slug)}
                  className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Edit Committee
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'research') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Research Page Editor</h1>
          <p className="text-sm text-slate-500 mt-1">Manage institutional research, publications, patents, and innovation cells.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {researchEditables.map((item) => (
            <div key={item.slug} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setActiveSection(item.slug)}
                  className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Edit Section
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'facilities') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facilities Page Editor</h1>
          <p className="text-sm text-slate-500 mt-1">Manage institutional facilities, central computing, library, and sports.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {facilitiesEditables.map((item) => (
            <div key={item.slug} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setActiveSection(item.slug)}
                  className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Edit Section
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'naac') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">NAAC Editor</h1>
          <p className="text-sm text-slate-500 mt-1">Manage institutional NAAC reports, cycles, and scores.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {naacEditables.map((item) => (
            <div key={item.slug} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setActiveSection(item.slug)}
                  className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Edit Section
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'about-us') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">About Us Page Editor</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage institutional overview, leadership messages, and governance details.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutEditables.map((item) => (
            <div key={item.slug} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  onClick={() => setActiveSection(item.slug)}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-[11px] uppercase tracking-wider font-extrabold hover:bg-blue-700 transition-all shadow-sm"
                >
                  Edit Section
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'training-placement') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Training & Placement</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage placements, training events, E-Cell activities, and IIIC content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingPlacementEditables.map((item) => (
            <div key={item.slug} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                <button
                  onClick={() => setActiveSection(item.slug)}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-[11px] uppercase tracking-wider font-extrabold hover:bg-blue-700 transition-all shadow-sm"
                >
                  Edit Section
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'student-career') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student & Career Module</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage student life clubs, technical bodies, events, gallery, metrics, and team records.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentCareerEditables.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {item.links.map((link) => (
                  <button
                    key={link.section}
                    onClick={() => setActiveSection(link.section)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-[11px] uppercase tracking-wider font-extrabold hover:bg-blue-700 transition-all shadow-sm"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab.key === 'mms') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">MMS Module</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage MMS department content, training, and placement statistics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mmsEditables.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</h2>
              <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {item.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-[11px] uppercase tracking-wider font-extrabold hover:bg-blue-700 transition-all shadow-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  if (activeTab.key !== 'home') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{activeTab.label}</h1>
          <p className="text-sm text-slate-500 mt-1">This section ({activeTab.key}) is ready in navigation and can be wired with custom editables next.</p>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-700 text-sm">
            The {activeTab.label} page management is being built. Use the Home tab to edit homepage blocks now.
          </p>
          <Link to="/admin/pages/home" className="inline-flex mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold">
            Open Home Editables
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Home Page</h1>
        <p className="text-sm text-slate-500 mt-1">Choose a section below to edit homepage content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homeEditables.map((item) => (
          <div key={item.title} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="text-sm text-slate-500 mt-2">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitePages;

