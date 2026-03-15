import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Neha Gharat',
  designation: 'Asst. Prof.',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '28/10/1980',
  dateOfJoining: '16/07/2007',
  email: 'neha.gharat@vcet.edu.in',
  experienceYears: '16 Years 9 Months',
  papersPublished: '09',
  photo: '/Images/departments/extc/faculty/neha-gharat.jpg',
  qualifications: ['Ph.D. (Pursuing)', 'M.E. (First Class with Distinction)'],
  specialization: ['Network Security', 'Microwave Communication', 'Computer Communication Networks'],
  publications: [{ title: 'Conference papers presented: 09' }],
  awards: [{ title: 'Minor Research Grant of Rs. 30,000 (2016-17)' }],
  memberships: [{ label: 'LM-ISTE' }, { label: 'AM-IETE' }],
  websites: [{ href: 'https://nehagharat.wordpress.com', name: 'Website', sub: 'nehagharat.wordpress.com' }],
  youtube: [
    { href: 'https://www.youtube.com/watch?v=cYdyZJokRwU', name: 'Ms. Neha Gharat', sub: 'YouTube Link 1' },
    { href: 'https://www.youtube.com/watch?v=e9skePNuq_A', name: 'Ms. Neha Gharat', sub: 'YouTube Link 2' },
  ],
  eResources: [
    { title: 'Microwave Engineering / Sem VII', url: 'https://drive.google.com/drive/folders/1ZvdIUSAzE8dDBvIbOFZCBj5G1ZUC4IkWlryppshJLIGP1KA3Vj13P_E61ktPEyHvdduPq8Zz' },
    { title: 'TNM / Sem VIII', url: 'https://drive.google.com/drive/folders/1FO3GvTJQgd4HM_rJnaDLMkNsy6Xh5F2UapJFmG0i72p8kTeFiY9owTJWmbr_IWb-xJYP1FKQ' },
  ],
};

export default faculty;
