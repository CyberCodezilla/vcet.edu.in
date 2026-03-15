import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Akshay Save',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '23/11/1996',
  dateOfJoining: '31/08/2023',
  email: 'akshay.save@vcet.edu.in',
  experienceYears: '1.8',
  papersPublished: '01',
  photo: '/Images/departments/mech/faculty/akshay-save.jpg',
  qualifications: ['M.Tech (Energy)', 'Ph.D. Pursuing'],
  specialization: ['Air Pollution', 'HVAC', 'Heat Exchanger Design'],
  websites: [
    { href: 'https://orcid.org/0000-0002-3665-0844', name: 'ORCID', sub: '0000-0002-3665-0844' },
  ],
};

export default faculty;
