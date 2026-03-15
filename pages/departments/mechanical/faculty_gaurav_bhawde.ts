import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Gaurav Bhawde',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '14/06/1988',
  dateOfJoining: '24/08/2022',
  email: 'gaurav.bhawde@vcet.edu.in',
  experienceYears: '10.6',
  papersPublished: '03',
  photo: '/Images/departments/mech/faculty/gaurav-bhawde.jpg',
  qualifications: ['M.E. (Thermal Engineering)'],
  specialization: ['Refrigeration and Air Conditioning', 'Heat Exchangers'],
  memberships: [
    { label: 'IAENG' },
    { label: 'ORCID', fullName: '0009-0001-7154-1627' },
  ],
  websites: [
    { href: 'https://orcid.org/0009-0001-7154-1627', name: 'ORCID', sub: '0009-0001-7154-1627' },
  ],
  youtube: [
    { href: 'https://www.youtube.com/@gauravbhawde1707', name: 'Mr. Gaurav Bhawde', sub: 'YouTube Channel' },
  ],
};

export default faculty;
