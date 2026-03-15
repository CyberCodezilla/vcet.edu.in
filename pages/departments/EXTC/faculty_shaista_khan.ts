import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Shaista Khan',
  designation: 'Asst. Prof.',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '26/12/1981',
  dateOfJoining: '11/07/2005',
  email: 'shaista.khan@vcet.edu.in',
  experienceYears: '19',
  papersPublished: '13',
  photo: '/Images/departments/extc/faculty/shaista-khan.jpg',
  qualifications: ['M.E. Electronics - First class with distinction', 'Ph.D. pursuing (Mumbai University)'],
  specialization: ['Embedded System', 'IoT and VLSI', 'Machine Vision'],
  publications: [{ title: 'Conference papers presented: 13' }],
  patents: [{ title: 'Patent published on "Smart Attendance System" in 2023-24' }],
  consultancy: [
    { title: 'Website Development and Inventory Management System for Arbee Aqua India Pvt Ltd.' },
    { title: 'Product development: Railway Rakshak' },
    { title: 'Photo Cropping Deep Learning Model project with Frugal Solutions' },
  ],
  awards: [
    { title: 'Best paper award in VNC 2020 - Smart Solar Tracker and Energy Measuring System' },
    { title: 'Research grant (2019-20) - Smart Solar Tracker and IoT based Energy Monitoring System - Rs. 30,000' },
  ],
  memberships: [{ label: 'ISTE' }, { label: 'IETE' }, { label: 'IEEE - SIGHT' }],
  websites: [{ href: 'https://shaistakhanamvcet.wordpress.com/', name: 'Website', sub: 'shaistakhanamvcet.wordpress.com' }],
  youtube: [{ href: 'https://www.youtube.com/channel/UCCGIXJ5TzwJZoILUFKMICIw', name: 'Ms. Shaista Khan', sub: 'YouTube Channel' }],
  eResources: [
    { title: 'EDC', url: 'https://classroom.google.com/u/0/c/MzQ1OTQ1Njg1ODM1' },
    { title: 'Microcontroller', url: 'https://classroom.google.com/u/0/c/MjYyMzkyMjg2MTA1' },
    { title: 'Year 2023-24', url: 'https://classroom.google.com/u/0/c/NjUzMjQ0NjgzMjI5' },
    { title: 'Year 2022-23', url: 'https://classroom.google.com/u/0/c/NTc5NTU3Mzg2NDY4' },
    { title: 'Year 2021-22', url: 'https://classroom.google.com/u/0/c/NDUyMDkxMzg3MjQ2' },
    { title: 'Year 2020-21', url: 'https://classroom.google.com/u/0/c/MjYyMzkyMjg2MTA1' },
    { title: 'Digital VLSI', url: 'https://classroom.google.com/u/0/c/MjYyMzk0NTQ0NTk4' },
  ],
};

export default faculty;
