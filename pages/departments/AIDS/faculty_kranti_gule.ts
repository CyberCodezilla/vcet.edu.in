import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Kranti Gule',
  designation: 'Assistant Professor',
  department: 'Artificial Intelligence and Data Science',
  dateOfJoining: '01 February 2021',
  email: 'kranti.gule@vcet.edu.in',
  experienceYears: '5',
  papersPublished: '6',
  photo: '/Images/departments/aids/faculty/kranti-gule.jpg',
  qualifications: [
    'M.E. (Information Technology)',
  ],
  specialization: ['Network and Security'],
  publications: [
    { title: 'Conference papers presented: 02' },
  ],
  memberships: [
    { label: 'ISTE', fullName: 'Life Membership - LM132968' },
  ],
  websites: [
    {
      href: 'https://www.linkedin.com/in/kranti-gule-a26b0b103/',
      icon: 'fa-linkedin',
      name: 'LinkedIn',
      sub: 'linkedin.com/in/kranti-gule-a26b0b103',
    },
  ],
};

export default faculty;
