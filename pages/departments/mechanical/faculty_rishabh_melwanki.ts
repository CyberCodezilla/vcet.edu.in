import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Mr. Rishabh Melwanki',
  designation: 'Asst. Prof.',
  department: 'Mechanical Engineering',
  dateOfBirth: '20/12/1991',
  dateOfJoining: '29/07/2013',
  email: 'rishabh.melwanki@vcet.edu.in',
  experienceYears: '8',
  papersPublished: '05',
  photo: '/Images/departments/mech/faculty/rishabh-melwanki.jpg',
  qualifications: ['M.Tech. (Thermal Engineering)'],
  specialization: ['Refrigeration and Air Conditioning', 'Heat Exchangers'],
  awards: [{ title: 'First Position in Vaigyaniki (Thermal and Fluid) 2013, IIT Bombay' }],
  memberships: [{ label: 'ISTE' }],
  websites: [{ href: 'https://engineersworld.in', name: 'ICT Link', sub: 'HVAC - Engineersworld' }],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCH54leTN-vDZJcl10VcWh2A', name: 'Mr. Rishabh Melwanki', sub: 'YouTube Channel' },
  ],
  eResources: [
    { title: 'VCET website E Resources by Mr. Rishabh Melwanki', url: 'https://drive.google.com' },
  ],
};

export default faculty;
