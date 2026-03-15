import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Kamlesh Bachkar',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '16/08/1990',
  dateOfJoining: '08/08/2016',
  email: 'kamlesh.bachkar@vcet.edu.in',
  experienceYears: '6',
  papersPublished: '03',
  photo: '/Images/departments/mech/faculty/kamlesh-bachkar.jpg',
  qualifications: ['M.Tech. (Automobile)'],
  specialization: ['Heat Transfer', 'Automation', 'AI & Machine Learning'],
  memberships: [{ label: 'ISTE' }],
  websites: [{ href: 'https://allaboutlesh.school.blog/industrial-automation/', name: 'ICT Link', sub: 'allaboutlesh.school.blog' }],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCYEjdD7NTv1_xaXRLjQXzUg', name: 'Mr. Kamlesh Bachkar', sub: 'YouTube Channel' },
  ],
  eResources: [
    { title: 'Industrial Automation - Google Classroom Code', url: 'https://classroom.google.com', code: 'wkvpwll' },
    { title: 'Industrial Automation Link', url: 'https://allaboutlesh.school.blog/industrial-automation/' },
  ],
};

export default faculty;
