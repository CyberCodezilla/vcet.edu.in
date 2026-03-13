import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../../../components/PageLayout';
import { csdsfaculty } from './facultyProfiles';
import FacultyProfileView, { FacultyData } from './FacultyProfileView';
import ceFacultyMap from '../ComputerEngineering/ceFacultyMap';
import itFacultyMap from '../IT/itFacultyMap';
import aidsFacultyMap from '../AIDS/aidsFacultyMap';
import { basicFacultyMaps } from '../basicFacultyMaps';

const toList = (value?: string): string[] =>
  (value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const toLinks = (value?: string) =>
  toList(value)
    .filter((line) => /^https?:\/\//i.test(line) || /^www\./i.test(line))
    .map((line) => ({
      href: /^https?:\/\//i.test(line) ? line : `https://${line}`,
      name: line,
      sub: '',
    }));

const toFacultyData = (profile: (typeof csdsfaculty)[number]): FacultyData => ({
  name: profile.name,
  designation: profile.designation,
  department: profile.department,
  dateOfBirth: profile.dob,
  dateOfJoining: profile.doj,
  email: profile.email,
  experienceYears: profile.experience,
  papersPublished: profile.papersPublished,
  photo: profile.photo,
  qualifications: toList(profile.qualifications),
  specialization: toList(profile.specialization),
  pgProjects: profile.pgProjectsGuided ? [{ label: 'PG Projects Guided', detail: profile.pgProjectsGuided }] : [],
  consultancy: toList(profile.consultancy).map((title) => ({ title })),
  books: toList(profile.booksPatents).map((title, index) => ({ count: index + 1, title })),
  patents: toList(profile.patent).map((title) => ({ title })),
  awards: toList(profile.awards).map((title) => ({ title })),
  websites: toLinks(profile.websiteLink),
  memberships: toList(profile.professionalMemberships).map((label) => ({ label })),
  eResources: toLinks(profile.eResources).map((item) => ({ title: item.name, url: item.href })),
});

export default function FacultyProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const facultyRouteConfig = [
    { prefix: '/computer-engineering/faculty/', backPath: '/computer-engineering', map: ceFacultyMap },
    { prefix: '/information-technology/faculty/', backPath: '/information-technology', map: itFacultyMap },
    { prefix: '/ai-data-science/faculty/', backPath: '/ai-data-science', map: aidsFacultyMap },
    { prefix: '/mechanical-engineering/faculty/', backPath: '/mechanical-engineering', map: basicFacultyMaps['mechanical-engineering'] ?? {} },
    { prefix: '/electronics-telecommunication/faculty/', backPath: '/electronics-telecomm', map: basicFacultyMaps['electronics-telecommunication'] ?? {} },
    { prefix: '/civil-engineering/faculty/', backPath: '/civil-engineering', map: basicFacultyMaps['civil-engineering'] ?? {} },
    { prefix: '/first-year-engineering/faculty/', backPath: '/first-year-engineering', map: basicFacultyMaps['first-year-engineering'] ?? {} },
  ] as const;

  const matchedRoute = facultyRouteConfig.find((route) => location.pathname.startsWith(route.prefix));
  const isComputerEngineering = matchedRoute?.prefix === '/computer-engineering/faculty/';
  const backPath = matchedRoute?.backPath ?? '/cs-data-science';
  const csdsProfile = csdsfaculty.find((f) => f.slug === slug);
  const mappedProfile = slug && matchedRoute ? matchedRoute.map[slug] : undefined;

  const profileData = matchedRoute
    ? (mappedProfile
        ? {
            ...mappedProfile,
            photo: mappedProfile.photo.startsWith('/')
              ? mappedProfile.photo
              : `/Images/departments/comp/faculty/${slug}.jpg`,
          }
        : undefined)
    : (csdsProfile ? toFacultyData(csdsProfile) : undefined);

  if (!profileData) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-2xl font-bold text-[#1a4b7c] mb-4">Faculty profile not found.</h2>
          <button
            onClick={() => navigate(backPath)}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#1a4b7c] hover:text-[#fdb813] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Department
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <FacultyProfileView faculty={profileData} />
    </PageLayout>
  );
}
