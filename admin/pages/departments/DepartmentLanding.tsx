import React from 'react';
import { Link } from 'react-router-dom';

const departmentEditables = [
  {
    title: 'Department CMS',
    description: 'Create, edit, and manage comprehensive department pages including vision, mission, outcomes, syllabus, and news.',
    links: [{ label: 'Edit Departments', to: '/admin/pages/departments/list' }],
  },
  {
    title: 'Faculty Directory',
    description: 'Manage faculty profiles across all departments. Assign roles, qualifications, and keep information up to date.',
    links: [{ label: 'Manage Faculty', to: '/admin/pages/faculty' }],
  },
  {
    title: 'Newsletters',
    description: 'Manage department-specific newsletters and magazines, upload PDFs, and set custom visual thumbnails.',
    links: [{ label: 'Manage Newsletters', to: '/admin/pages/departments/newsletter' }],
  },
];

const DepartmentLanding: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Departments Hub</h1>
        <p className="text-sm text-slate-500 mt-1">
          Choose a section below to manage academic departments and faculty profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departmentEditables.map((item) => (
          <div key={item.title} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm flex flex-col h-full">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="text-sm text-slate-500 mt-2 flex-1">
              {item.description}
            </p>
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

      {/* Navigation Tip matching the subtle info box style if desired, or kept as is but styled like cards */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
             <h4 className="text-sm font-semibold text-slate-900">Navigation Tip</h4>
             <p className="text-xs text-slate-500 mt-1">Faculty are now managed exclusively through this hub to keep the sidebar streamlined. Ensure you select the correct department when adding new staff.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentLanding;
