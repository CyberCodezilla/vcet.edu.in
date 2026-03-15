import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Javed Shaikh',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '08/12/1992',
  dateOfJoining: '07/08/2023',
  email: 'javed.shaikh@vcet.edu.in',
  experienceYears: '2',
  papersPublished: '06',
  photo: '/Images/departments/mech/faculty/javed-shaikh.jpg',
  qualifications: ['M.Tech.', 'Ph.D. (NIT Calicut, Kerala) Pursuing'],
  specialization: ['Water-energy nexus', 'Solar energy', 'Desalination', 'Distillation', 'Wastewater treatment', 'Multigeneration', 'ZLD'],
  websites: [
    { href: 'https://orcid.org/0000-0002-5470-5001', name: 'ORCID', sub: '0000-0002-5470-5001' },
    { href: 'https://scholar.google.com/citations?user=sfh2xXYAAAAJ&hl=en', name: 'Google Scholar', sub: 'Javed Sikandar Shaikh' },
  ],
};

export default faculty;
