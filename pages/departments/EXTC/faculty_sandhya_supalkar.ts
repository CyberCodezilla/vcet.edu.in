import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Sandhya Supalkar',
  designation: 'Asst. Prof.',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '20/06/1975',
  dateOfJoining: '10/07/2007',
  email: 'sandhya.supalkar@vcet.edu.in',
  experienceYears: '21',
  papersPublished: '04',
  photo: '/Images/departments/extc/faculty/sandhya-supalkar.jpg',
  qualifications: ['M.Tech (First Class)'],
  specialization: ['Electronics Engineering'],
  publications: [{ title: 'Conference papers presented: 04' }],
  memberships: [
    { label: 'IEEE SIGHT', fullName: '97918857' },
    { label: 'IETE', fullName: 'M-217118' },
    { label: 'ISTE', fullName: 'LM 91146' },
  ],
  eResources: [
    { title: 'EMA/EXTC/VI SEM-2023-24' },
    { title: 'EDC/EXTC/III SEM-2023-24' },
  ],
};

export default faculty;
