import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Vishwas Palve',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '09/06/1988',
  dateOfJoining: '03/08/2012',
  email: 'vishwas.palve@vcet.edu.in',
  experienceYears: '9',
  papersPublished: '03',
  photo: '/Images/departments/mech/faculty/vishwas-palve.jpg',
  qualifications: ['Ph.D. (Pursuing)', 'M.E. (Heat Power)'],
  specialization: ['Heat Transfer', 'CFD'],
  memberships: [{ label: 'ISTE' }, { label: 'ISHRAE' }],
  websites: [
    { href: 'https://vmpalve.wordpress.com', name: 'ICT Link', sub: 'vmpalve.wordpress.com' },
    { href: 'https://orcid.org/0000-0002-0869-7821', name: 'ORCID', sub: '0000-0002-0869-7821' },
  ],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCQumA0qFNVoNtNpPDSj8Mug?view_as=subscriber', name: 'Mr. Vishwas Palve', sub: 'YouTube Channel' },
  ],
  eResources: [
    { title: '2EG (FE A) - Google Classroom Code', url: 'https://classroom.google.com', code: 'qholzso' },
    { title: 'PM - Google Classroom Code', url: 'https://classroom.google.com', code: '2cppitd' },
  ],
};

export default faculty;
