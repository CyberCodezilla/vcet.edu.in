import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Bharati Gondhalekar',
  designation: 'Asst. Prof.',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '15/08/1975',
  dateOfJoining: '21/01/2003',
  email: 'bharati.gondhalekar@vcet.edu.in',
  experienceYears: '19',
  papersPublished: '05',
  photo: '/Images/departments/extc/faculty/bharati-gondhalekar.jpg',
  qualifications: ['M.E. (1st Class)'],
  roles: [{ label: 'Interaction with Professional Institution: YES' }],
  memberships: [
    { label: 'ISTE', fullName: 'Life Member of Indian Society for Technical Education' },
    { label: 'ISOI', fullName: 'Life Member of The Instrument Society of India' },
  ],
  eResources: [{ title: 'E-Resources', url: 'https://www.bharatigondhalekar.wordpress.com' }],
};

export default faculty;
