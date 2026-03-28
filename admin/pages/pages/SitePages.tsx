import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SITE_PAGE_TABS } from './sitePagesConfig';
import AdmissionForm from '../admission/AdmissionForm';
import AcademicsForm from '../academics/AcademicsForm';
import ExamsForm from '../exams/ExamsForm';

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
    return <AdmissionForm activeSection={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'academics' && activeSection) {
    return <AcademicsForm activeSection={activeSection} onBack={() => setActiveSection(null)} />;
  }

  if (activeTab.key === 'exam' && activeSection) {
    return <ExamsForm activeSection={activeSection} onBack={() => setActiveSection(null)} />;
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
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {academicsEditables.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm max-w-2xl">
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
