import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Vinay Patel',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '17/07/1974',
  dateOfJoining: '03/09/2003',
  email: 'vinay.patel@vcet.edu.in',
  experienceYears: '17',
  papersPublished: '08',
  photo: '/Images/departments/mech/faculty/vinay-patel.jpg',
  qualifications: ['Ph.D. (Pursuing - SPCE, Andheri)', 'M.E. (Thermal Engineering)'],
  specialization: ['Solar Thermal Energy', 'CFD', 'Wind Energy'],
  awards: [{ title: 'Best Paper Award at NCAME, NIT Delhi' }, { title: 'Grants fetched: Rs. 32,000' }],
  memberships: [{ label: 'ISTE' }, { label: 'ISHMT' }, { label: 'FMFP' }, { label: 'ISHRAE' }, { label: 'IME' }, { label: 'ISME' }],
  websites: [
    { href: 'https://www.vdpatelres.wordpress.com', name: 'Research Website', sub: 'vdpatelres.wordpress.com' },
    { href: 'https://www.vinaypateledu.wordpress.com', name: 'Website', sub: 'vinaypateledu.wordpress.com' },
    { href: 'https://orcid.org/0000-0001-8620-8774', name: 'ORCID', sub: '0000-0001-8620-8774' },
  ],
  youtube: [
    { href: 'https://www.youtube.com/channel/UC2D6fEBeaonJDFxfNXydGpg', name: 'Mr. Vinay Patel', sub: 'YouTube Channel' },
  ],
  eResources: [
    { title: 'PE - Google Classroom Code', url: 'https://classroom.google.com', code: 'xhwmfot' },
    { title: 'RES', url: 'https://www.vdpatelres.wordpress.com' },
  ],
};

export default faculty;
