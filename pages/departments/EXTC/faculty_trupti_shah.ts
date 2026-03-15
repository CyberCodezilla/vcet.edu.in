import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Trupti Shah',
  designation: 'Asst. Prof.',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '25/08/1979',
  dateOfJoining: '27/07/2009',
  email: 'trupti.shah@vcet.edu.in',
  experienceYears: '19',
  papersPublished: '05',
  photo: '/Images/departments/extc/faculty/trupti-shah.jpg',
  qualifications: ['M.E. (First Class)'],
  specialization: ['Embedded', 'DSP', 'Image Processing'],
  publications: [{ title: 'Conference papers presented: 05' }],
  consultancy: [{ title: 'Industry Project: Railway Rakshak' }],
  awards: [{ title: 'Minor Research Grant for Smart Solar Tracker with IoT based Energy Monitoring System - Rs. 30,000' }],
  memberships: [{ label: 'IETE' }, { label: 'ISTE' }],
  websites: [{ href: 'https://truptshahvcet.wordpress.com', name: 'Website', sub: 'truptshahvcet.wordpress.com' }],
  youtube: [{ href: 'https://www.youtube.com/channel/UCE96-EVC9YxBVTlLeBSbqDw', name: 'Ms. Trupti Shah', sub: 'YouTube Channel' }],
};

export default faculty;
