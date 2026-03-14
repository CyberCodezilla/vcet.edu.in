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

const parseExperience = (value?: string): { teaching?: string; industry?: string } => {
  const text = value ?? '';
  const teachingRaw = text.match(/Teaching\s*:\s*([^,\n]+)/i)?.[1]?.trim();
  const industryRaw = text.match(/Industry\s*:\s*([^,\n]+)/i)?.[1]?.trim();
  const teaching = teachingRaw?.replace(/\s*years?\b/i, '').trim();
  const industry = industryRaw?.replace(/\s*years?\b/i, '').trim();
  return { teaching, industry };
};

const toConsultancy = (value?: string) =>
  toList(value).map((line) => {
    const clean = line.replace(/^\d+\.\s*/, '').trim();
    const urlMatch = clean.match(/(https?:\/\/\S+|www\.\S+)/i);
    if (!urlMatch) return { title: clean };

    const rawUrl = urlMatch[1];
    const href = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
    const title = clean.replace(rawUrl, '').replace(/[\s()\-:]+$/g, '').trim();
    return {
      title: title || clean,
      url: href,
      urlLabel: 'Open Link',
    };
  });

const extractIsbns = (value?: string): string[] => {
  const text = value ?? '';
  const matches = text.match(/(?:97[89][- ]?)?\d[-\d]{8,20}\d/g) ?? [];
  const normalized = matches
    .map((m) => m.replace(/\s+/g, ''))
    .filter((m) => m.length >= 10);
  return [...new Set(normalized)];
};

const toMemberships = (value?: string) =>
  toList(value)
    .flatMap((line) => line.split(/\s+and\s+/i))
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label) => ({ label }));

const toBooks = (value?: string) => {
  const lines = toList(value)
    .filter((line) => !/^Total\s+\d+\s+Books\s+Published:?$/i.test(line))
    .filter((line) => !/^ISBN Numbers:?$/i.test(line))
    .filter((line) => !/^(?:97[89][- ]?)?\d[-\d]{8,20}\d(?:\s*,\s*(?:97[89][- ]?)?\d[-\d]{8,20}\d)*$/i.test(line));
  return lines.map((title, index) => ({ count: index + 1, title }));
};

const toLinks = (value?: string) =>
  toList(value)
    .map((line) => {
      const urlMatch = line.match(/(https?:\/\/\S+|www\.\S+)/i);
      if (!urlMatch) return null;

      const rawUrl = urlMatch[1];
      const href = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
      const before = line.slice(0, urlMatch.index ?? 0).replace(/[\s:()\-]+$/g, '').trim();
      const after = line.slice((urlMatch.index ?? 0) + rawUrl.length).replace(/^[\s:()\-]+/g, '').trim();
      const name = before || after || rawUrl;

      return { href, name, sub: '' };
    })
    .filter((item): item is { href: string; name: string; sub: string } => Boolean(item));

const toFacultyData = (profile: (typeof csdsfaculty)[number]): FacultyData => ({
  ...(() => {
    const exp = parseExperience(profile.experience);
    return {
      experienceYears: exp.teaching ?? profile.experience,
      industryYears: exp.industry,
    };
  })(),
  name: profile.name,
  designation: profile.designation,
  department: profile.department,
  dateOfBirth: profile.dob,
  dateOfJoining: profile.doj,
  email: profile.email,
  papersPublished: profile.papersPublished,
  photo: profile.photo,
  qualifications: toList(profile.qualifications),
  specialization: toList(profile.specialization),
  researchDomains:
    profile.slug === 'dr-yogesh-pingle'
      ? [
          { title: 'Internet of Things', subtitle: 'Research Area' },
          { title: 'Computer Networks', subtitle: 'Research Area' },
          { title: 'Web Technology', subtitle: 'Research Area' },
          { title: 'Data Science', subtitle: 'Research Area' },
        ]
      : [],
  pgProjects: profile.pgProjectsGuided ? [{ label: 'PG Projects Guided', detail: profile.pgProjectsGuided }] : [],
  consultancy: toConsultancy(profile.consultancy),
  books: toBooks(profile.booksPatents),
  isbnNumbers: extractIsbns(profile.booksPatents),
  patents: toList(profile.patent).map((title) => ({ title })),
  roles: [...toList(profile.inCharge), ...toList(profile.interactionWithInstitution)].map((label) => ({ label })),
  awards: [...toList(profile.awards), ...toList(profile.grants)].map((title) => ({ title })),
  websites: [...toLinks(profile.websiteLink), ...toLinks(profile.researchLink)],
  youtube: toLinks(profile.youtubeChannel).map((item) => ({
    href: item.href,
    name: item.name,
    sub: 'Educational Channel',
  })),
  memberships: toMemberships(profile.professionalMemberships),
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
