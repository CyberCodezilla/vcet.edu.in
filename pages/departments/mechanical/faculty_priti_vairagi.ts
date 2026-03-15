import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Priti Vairagi',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '01/01/1989',
  dateOfJoining: '03/08/2012',
  email: 'priti.vairagi@vcet.edu.in',
  experienceYears: '9',
  papersPublished: '03',
  photo: '/Images/departments/mech/faculty/priti-vairagi.jpg',
  qualifications: ['M.E. (Machine Design)'],
  memberships: [{ label: 'ISTE' }],
  websites: [{ href: 'https://pvairagi.wordpress.com/', name: 'ICT Link', sub: 'pvairagi.wordpress.com' }],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCXD8G27S1L6ERW7XKKGey4Q', name: 'Ms. Priti Vairagi', sub: 'YouTube Channel' },
  ],
  eResources: [
    { title: 'MD-I - Google Classroom Code', url: 'https://classroom.google.com', code: '4xi5np4' },
    { title: 'SEM VIII - DMS', url: 'https://pvairagi.wordpress.com/module-2/' },
  ],
};

export default faculty;
