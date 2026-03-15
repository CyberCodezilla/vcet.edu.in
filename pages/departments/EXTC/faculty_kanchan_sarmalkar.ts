import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Kanchan Sarmalkar',
  designation: 'Asst. Prof.',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '01/05/1979',
  dateOfJoining: '25/07/2001',
  email: 'kanchan.sarmalkar@vcet.edu.in',
  experienceYears: '23',
  papersPublished: '02',
  photo: '/Images/departments/extc/faculty/kanchan-sarmalkar.jpg',
  qualifications: ['M.E. (Instrumentation and Control)'],
  specialization: ['Embedded Systems', 'Automation'],
  memberships: [{ label: 'ISTE' }, { label: 'ISOI' }],
  websites: [{ href: 'https://developmentprogram.code.blog', name: 'Website', sub: 'developmentprogram.code.blog' }],
  eResources: [
    { title: 'Electronics Instruments & Measurements', url: 'https://classroom.google.com/c/Njg0OTgwNDk2MDYw/' },
    { title: 'Sensor Technology', url: 'https://classroom.google.com/c/NjkxNTI4NjA4MTI0' },
    { title: 'Electronic Instruments & Control Systems', url: 'https://classroom.google.com/c/NzAxMzc3NTA5NjUy' },
  ],
};

export default faculty;
