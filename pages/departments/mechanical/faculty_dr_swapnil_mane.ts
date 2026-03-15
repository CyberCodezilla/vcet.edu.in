import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Dr. Swapnil Mane',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '18/07/1984',
  dateOfJoining: '15/07/2009',
  email: 'swapnil.mane@vcet.edu.in',
  experienceYears: '11',
  papersPublished: '06',
  photo: '/Images/departments/mech/faculty/dr-swapnil-mane.jpg',
  qualifications: ['Ph.D.', 'M.Tech. (IIT Bombay) - Energy Science & Engineering'],
  specialization: ['Energy Audit', 'Renewable Energy Sources'],
  memberships: [{ label: 'ISTE', fullName: 'Life Member' }],
  awards: [
    { title: 'Certified Energy Manager (BEE, Govt. of India)' },
    { title: 'GEM Certified Professional (ASSOCHAM, New Delhi)' },
  ],
  websites: [
    { href: 'https://maneswapnil.wordpress.com', name: 'ICT Link', sub: 'maneswapnil.wordpress.com' },
    { href: 'https://orcid.org/0000-0003-3144-0650', name: 'ORCID', sub: '0000-0003-3144-0650' },
  ],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCnxGQJyY6kMGaosjCnpdFhQ?view_as=subscriber', name: 'Dr. Swapnil Mane', sub: 'YouTube Channel' },
  ],
  eResources: [
    { title: 'EG (INST + Civil) - Google Classroom Code', url: 'https://classroom.google.com', code: 'ju3fhir' },
    { title: 'EAM (Dept El.) - Google Classroom Code', url: 'https://classroom.google.com', code: 'itsgzmj' },
  ],
};

export default faculty;
