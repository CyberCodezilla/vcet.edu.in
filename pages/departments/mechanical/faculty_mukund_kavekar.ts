import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Mukund Kavekar',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '17/05/1979',
  dateOfJoining: '08/08/2016',
  email: 'mukund.kavekar@vcet.edu.in',
  experienceYears: '8',
  industryYears: '8',
  papersPublished: '04',
  photo: '/Images/departments/mech/faculty/mukund-kavekar.jpg',
  qualifications: ['Ph.D. (Pursuing - Pillai College, Panvel)', 'M.E. (CAD/CAM / Robotics)'],
  specialization: ['Machine Design', 'CAE', 'Automobile Engineering'],
  memberships: [{ label: 'ISTE' }],
  websites: [{ href: 'https://mkavekar.wordpress.com', name: 'ICT Link', sub: 'mkavekar.wordpress.com' }],
  eResources: [
    { title: 'MQE - Google Classroom Code', url: 'https://classroom.google.com', code: 'r3svn5w' },
  ],
};

export default faculty;
