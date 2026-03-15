import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Dr. Amrita Ruperee',
  designation: 'Professor & Head of Department',
  department: 'Electronics and Telecommunication Engineering',
  dateOfJoining: '31/07/2000',
  email: 'amrita.ruperee@vcet.edu.in',
  experienceYears: '30',
  papersPublished: '15',
  photo: '/Images/departments/extc/faculty/dr-amrita-ruperee.jpg',
  qualifications: ['Ph.D. (Wireless Communication)'],
  specialization: ['Wireless Communication'],
  publications: [{ title: 'Conference papers presented: 13' }],
  memberships: [{ label: 'IETE' }, { label: 'ISTE' }],
  eResources: [
    { title: 'Mobile Communication Systems', url: 'https://drive.google.com/drive/folders/1ZuN3s095EY54f2W4PGgUuEQGBdXxVI3R' },
    { title: 'Principles of Communication Engineering', url: 'https://drive.google.com/drive/folders/1zYCnj6pbax2Y4DBqguuOqAKhOZBhUEzv' },
  ],
};

export default faculty;
