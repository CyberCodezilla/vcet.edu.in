import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Raahul Krishna',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '14/12/1989',
  dateOfJoining: '14/09/2016',
  email: 'raahul.krishna@vcet.edu.in',
  experienceYears: '7',
  papersPublished: '05',
  photo: '/Images/departments/mech/faculty/raahul-krishna.jpg',
  qualifications: ['M.E. (Heat Power)'],
  specialization: ['Heat Power'],
  awards: [{ title: 'S. Shavak Nanavati Medal for Best Paper in Tata Search 2014' }],
  memberships: [
    { label: 'Institution of Engineers (India)', fullName: 'Associate Member No. AM1880112' },
    { label: 'SAE', fullName: 'Membership No. 7190510555' },
  ],
};

export default faculty;
