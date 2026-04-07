import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { facultyApi } from '../admin/api/faculty';
import type { Faculty } from '../admin/types';
import fallbackFacultyData from './fallbackFaculty.json';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

interface DepartmentFacultySectionProps {
  departmentName: string;
}

const FALLBACK_FACULTY = (
  Array.isArray(fallbackFacultyData)
    ? fallbackFacultyData
    : ((fallbackFacultyData as unknown) as { data?: Faculty[] })?.data
) as Faculty[];

const DEPARTMENT_ALIASES: Record<string, string> = {
  aids: 'artificial intelligence and data science',
  'artificial intelligence and data science': 'artificial intelligence and data science',
  civil: 'civil engineering',
  'civil engineering': 'civil engineering',
  computerengg: 'computer engineering',
  'computer engineering': 'computer engineering',
  csds: 'computer science and data science',
  'computer science and data science': 'computer science and data science',
  'computer science and engineering data science': 'computer science and data science',
  entc: 'electronics and telecommunication engineering',
  'electronics and telecommunication': 'electronics and telecommunication engineering',
  'electronics and telecommunication engineering': 'electronics and telecommunication engineering',
  fe: 'first year engineering',
  'first year engineering': 'first year engineering',
  it: 'information technology',
  'information technology': 'information technology',
  mech: 'mechanical engineering',
  'mechanical engineering': 'mechanical engineering',
};

const CE_IMAGE_BASE = '/images/Departments/Computer Engineering';
const CE_FACULTY_IMAGE_BY_KEY: Record<string, string> = {
  anilhingmire: 'facultycompsMr.-Anil-Hingmire.jpg',
  atharva: 'facultycompsAtharva.jpeg',
  awantika: 'facultycompsAwantika-pic.jpeg',
  bhaktijadhav: 'facultycompsMs.Bhakti-Jadhav.png',
  brinal: 'facultycompsBrinal.jpeg',
  dineshpatil: 'facultycompsDinesh-Patil.jpg',
  joyce: 'facultycompsJoyce.jpg',
  manali: 'Ms.facultycompsManali.jpg',
  meghatrivedi: 'facultycompsDr.-Megha-Trivedi.jpg',
  nehasurti: 'facultycompsNeha-Surti1.jpg',
  sanketpatil: 'facultycompsMr.-Sanket-Patil.jpg',
  shilpa: 'facultycompsShilpa-J.jpeg',
  smitajawale: 'facultycompsMrs.-Smita-Jawale.jpg',
  snehamhatre: 'facultycompsMrs.-Sneha-Mhatre.jpg',
  soniya: 'facultycompsSoniya-R-Khatu.jpg',
  sridhar: 'facultycompsSridhar.jpeg',
  sunilkatkar: 'facultycompsMr.-Sunil-Katkar.jpg',
  swapnaborde: 'facultycompsDr.-Swapna-Borde.jpg',
  sweetypatil: 'facultycompsMs.Sweety-Patil.jpg',
  swativarma: 'facultycompsSwati-Varma.jpg',
  vanashree: 'facultycompsvanashree.jpg',
  vinal: 'facultycompsVinal-photo.jpeg',
  vishalpande: 'facultycompsMr.Vishal-Pande.jpg',
};

const normalizeDepartmentName = (value: string): string => {
  const normalized = value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[().]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return DEPARTMENT_ALIASES[normalized] || normalized;
};

const normalizeFacultyKey = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\b(dr|mr|mrs|ms|prof)\.?\s*/g, '')
    .replace(/[^a-z]/g, '');
};

const getComputerFacultyImage = (name: string): string | undefined => {
  const key = normalizeFacultyKey(name);
  const entry = Object.entries(CE_FACULTY_IMAGE_BY_KEY).find(([matchKey]) => key.includes(matchKey));
  return entry ? `${CE_IMAGE_BASE}/${entry[1]}` : undefined;
};

const isFacultyActive = (faculty: Faculty): boolean => {
  const basicInfoActive = faculty?.basicInfo?.isActive;
  const rootActive = (faculty as Faculty & { is_active?: boolean }).is_active;

  if (typeof basicInfoActive === 'boolean') return basicInfoActive;
  if (typeof rootActive === 'boolean') return rootActive;
  return true;
};

const filterFacultyByDepartment = (allFaculty: Faculty[], departmentName: string): Faculty[] => {
  const target = normalizeDepartmentName(departmentName);

  return allFaculty.filter((faculty) => {
    const facultyDepartment = normalizeDepartmentName(faculty?.basicInfo?.department || '');
    return facultyDepartment === target && isFacultyActive(faculty);
  });
};

const getInitials = (name: string) => {
  const cleanName = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s*/i, '').trim();
  const parts = cleanName.split(' ').filter(Boolean);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || parts[0]?.[1] || '').toUpperCase();
};

const ImageWithFallback: React.FC<{ url?: string; name: string }> = ({ url, name }) => {
  const [error, setError] = useState(false);
  const resolvedUrl = url ? resolveUploadedAssetUrl(url) ?? url : undefined;

  if (resolvedUrl && !error) {
    return (
      <img
        src={resolvedUrl}
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
  const isComputerDepartment = normalizeDepartmentName(departmentName) === 'computer engineering';

  useEffect(() => {
    setLoading(true);
    facultyApi.publicList()
      .then(r => {
        const all = Array.isArray(r.data) ? r.data : [];
        const filtered = filterFacultyByDepartment(all, departmentName);

        if (filtered.length > 0) {
          setFaculty(filtered);
          return;
        }

        const fallbackFiltered = filterFacultyByDepartment(FALLBACK_FACULTY, departmentName);
        setFaculty(fallbackFiltered);
      })
      .catch((e) => {
        console.warn('Failed to fetch faculty from backend API', e);
        const fallbackFiltered = filterFacultyByDepartment(FALLBACK_FACULTY, departmentName);
        setFaculty(fallbackFiltered);
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
            { icon: 'ph-graduation-cap', value: `${faculty.filter(f => f.qualifications?.degrees?.some(d => d && typeof d === 'string' && (d.toLowerCase().includes('ph.d') || d.toLowerCase().includes('doctor')))).length}`, label: 'PhD' },
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
                  <ImageWithFallback
                    url={f.profileImage?.url || (isComputerDepartment ? getComputerFacultyImage(f.basicInfo.fullName) : undefined)}
                    name={f.basicInfo.fullName}
                  />
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
