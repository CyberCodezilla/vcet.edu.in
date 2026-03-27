import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../services/api';
import type { Faculty } from '../admin/types';
import fallbackFacultyData from './fallbackFaculty.json';

interface DepartmentFacultySectionProps {
  departmentName: string;
}

const getInitials = (name: string) => {
  const cleanName = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s*/i, '').trim();
  const parts = cleanName.split(' ').filter(Boolean);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || parts[0]?.[1] || '').toUpperCase();
};

const ImageWithFallback: React.FC<{ url?: string; name: string }> = ({ url, name }) => {
  const [error, setError] = useState(false);

  if (url && !error) {
    return (
      <img
        src={url}
        alt={name}
        onError={() => setError(true)}
        className="w-full h-full object-cover object-top"
      />
    );
  }

  return (
    <div className="w-full h-full bg-[#1a4b7c] flex items-center justify-center text-white font-bold text-3xl uppercase tracking-wider">
      {getInitials(name)}
    </div>
  );
};

const DepartmentFacultySection: React.FC<DepartmentFacultySectionProps> = ({ departmentName }) => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    get<{ data: Faculty[] }>('/faculty')
      .then(r => {
        const all = Array.isArray(r.data) ? r.data : [];
        if (all.length > 0) {
          const filtered = all.filter(f => f.basicInfo.department === departmentName);
          setFaculty(filtered);
        } else {
          throw new Error("Empty data from backend");
        }
      })
      .catch((e) => {
        console.warn("Failed to fetch from backend, using fallback data...", e);
        const allFallback = Array.isArray(fallbackFacultyData) 
          ? fallbackFacultyData as unknown as Faculty[] 
          : ((fallbackFacultyData as any).data as Faculty[]) || [];
          
        const filtered = allFallback.filter(f => f?.basicInfo?.department === departmentName);
        setFaculty(filtered);
      })
      .finally(() => setLoading(false));
  }, [departmentName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-8 h-8 border-4 border-slate-100 border-t-brand-navy rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center">Loading Faculty...</p>
      </div>
    );
  }

  if (faculty.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-400 font-bold text-sm">No faculty members found for this department.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Section header — compact bar */}
      <div className="reveal flex items-center justify-between flex-wrap gap-4 pb-5 border-b-2 border-brand-gold/30">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60 flex items-center gap-2 mb-1">
            <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" /> {departmentName}
          </span>
          <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
        </div>
        <div className="flex items-center divide-x divide-slate-200">
          {[
            { icon: 'ph-users-three',    value: `${faculty.length}`, label: 'Members' },
            { icon: 'ph-graduation-cap', value: `${faculty.filter(f => f.qualifications?.degrees?.some(d => d.toLowerCase().includes('ph.d') || d.toLowerCase().includes('doctor'))).length}`, label: 'PhD' },
            { icon: 'ph-trophy',         value: `${faculty.reduce((s, f) => s + (f.experience?.teachingYears || 0), 0)}+`, label: 'Yrs Exp.' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2.5 px-5">
              <i className={`ph-fill ${stat.icon} text-lg text-brand-navy`} />
              <div>
                <span className="text-lg font-bold text-brand-navy leading-none">{stat.value}</span>
                <span className="block text-[11px] text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
        {faculty.map((f) => (
          <article
            key={f.id}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 border-t-[3px] border-b-[3px] border-t-[#1a4b7c] border-b-[#fdb813] flex flex-col items-center px-6 pt-6 pb-5 h-full"
          >
            <Link
              to={`/faculty/${f.slug || f.id}`}
              className="flex w-full flex-col items-center no-underline h-full"
            >
              {/* Photo with gold badge at bottom-right */}
              <div className="relative w-32 h-36 mb-4 shrink-0">
                <div className="w-full h-full overflow-hidden rounded-t-sm shadow-sm border border-slate-100">
                  <ImageWithFallback url={f.profileImage?.url} name={f.basicInfo.fullName} />
                </div>
                {/* Gold accent square */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#fdb813] shadow-sm" />
              </div>

              {/* Name */}
              <h3 className="text-base font-bold text-[#1a4b7c] text-center leading-snug">
                {f.basicInfo.fullName}
              </h3>

              {/* Designation pill */}
              <span className="mt-2 px-3 py-0.5 bg-gray-100 text-gray-500 text-xs rounded font-medium text-center">
                {f.basicInfo.designation}
              </span>

              {/* Divider */}
              <div className="w-10 h-0.5 bg-gray-300 my-3 mt-auto" />
            </Link>

            {/* Email */}
            <div 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `mailto:${f.basicInfo.email}`; }} 
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1a4b7c] transition-colors w-full cursor-pointer mt-auto"
            >
              <i className="ph-fill ph-envelope text-sm shrink-0 text-gray-400" />
              <span className="truncate">{f.basicInfo.email}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFacultySection;
