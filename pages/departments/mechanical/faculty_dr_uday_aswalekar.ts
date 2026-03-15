import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Dr. Uday Aswalekar',
  designation: 'Professor & Head of Department',
  department: 'Mechanical Engineering',
  dateOfBirth: '22/09/1976',
  dateOfJoining: '19/01/1999',
  email: 'hod_mech@vcet.edu.in, uday.aswalekar@vcet.edu.in',
  experienceYears: '21',
  papersPublished: '04',
  photo: '/Images/departments/mech/faculty/dr-uday-aswalekar.jpg',
  qualifications: ['Ph.D. (Mechanical)', 'M.E. (Machine Design)'],
  publications: [{ title: 'Conference papers presented: 09' }],
  books: [{ title: 'Books published: 01' }],
  awards: [{ title: 'Grants fetched: Rs. 70,000' }],
  memberships: [{ label: 'ISTE' }],
  websites: [
    { href: 'https://www.komanddomatvcet.wordpress.com', name: 'ICT Link', sub: 'komanddomatvcet.wordpress.com' },
    { href: 'https://www.komatvcet.wordpress.com', name: 'E-Resources', sub: 'komatvcet.wordpress.com' },
  ],
};

export default faculty;
