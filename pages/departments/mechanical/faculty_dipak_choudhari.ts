import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Dipak Choudhari',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '06/11/1973',
  dateOfJoining: '02/08/1999',
  email: 'dipak.choudhari@vcet.edu.in',
  experienceYears: '21',
  papersPublished: '02',
  photo: '/Images/departments/mech/faculty/dipak-choudhari.jpg',
  qualifications: ['Ph.D. (Pursuing)', 'M.E. (Machine Design)'],
  memberships: [{ label: 'ISTE' }],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCg9p7v-wcNO9sfV2CMhMMDA', name: 'Mr. Dipak Choudhari', sub: 'E-Resources Channel' },
  ],
};

export default faculty;
