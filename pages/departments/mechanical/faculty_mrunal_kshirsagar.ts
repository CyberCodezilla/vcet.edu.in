import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Ms. Mrunal Kshirsagar',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '19/08/1992',
  dateOfJoining: '18/12/2023',
  email: 'mrunal.gosavi@vcet.edu.in',
  experienceYears: '2',
  papersPublished: '06',
  photo: '/Images/departments/mech/faculty/mrunal-kshirsagar.jpg',
  qualifications: ['M.Tech (Automobile)', 'Pursuing Ph.D'],
  specialization: ['Design', 'Tribology', 'Vibration', 'Automotive Dynamic Systems'],
  awards: [
    { title: 'Idea selected and published in Niti Aayog\'s Thinking for our Planet, 2023' },
    { title: 'Best presentation award in NCMMM, VIIT Pune' },
    { title: 'Best Research Paper in Automobile stream at RIT, Sangli' },
  ],
  websites: [
    { href: 'https://www.researchgate.net/profile/Mrunal-Kshirsagar', name: 'ResearchGate', sub: 'Mrunal Kshirsagar' },
  ],
};

export default faculty;
