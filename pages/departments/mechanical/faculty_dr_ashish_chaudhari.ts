import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Dr. Ashish Chaudhari',
  designation: 'Dean Research & Associate Professor',
  department: 'Mechanical Engineering',
  dateOfBirth: '26/09/1978',
  dateOfJoining: '10/09/2003',
  email: 'ashish.chaudhari@vcet.edu.in',
  experienceYears: '17 Years 3 Months',
  papersPublished: '12',
  photo: '/Images/departments/mech/faculty/dr-ashish-chaudhari.jpg',
  qualifications: ['Ph.D. (IIT Guwahati)', 'M.E. (Machine Design)'],
  specialization: ['Mechanical Design', 'CFD', 'Renewable Fuels', 'Solar Energy Extraction'],
  consultancy: [
    { title: 'Arihant Industrial Corporation Ltd., Vasai' },
    { title: 'Synergy Water Park Rides Pvt. Ltd., Vasai' },
    { title: 'Achievo Engineering Components Pvt. Ltd., Mumbai' },
  ],
  awards: [
    { title: 'Best Paper Award at IEEES-11, SRM University, Chennai' },
    { title: 'Grants fetched: Rs. 50,000' },
  ],
  memberships: [{ label: 'IME' }, { label: 'FMFP' }, { label: 'ISHRAE' }, { label: 'ISTE' }],
  websites: [
    { href: 'https://ashishmechblog.wordpress.com/', name: 'ICT Link', sub: 'ashishmechblog.wordpress.com' },
    { href: 'https://www.scopus.com/authid/detail.uri?authorId=56351604000', name: 'Scopus Profile', sub: 'Author ID: 56351604000' },
    { href: 'https://orcid.org/0000-0001-8856-0739', name: 'ORCID', sub: '0000-0001-8856-0739' },
  ],
  youtube: [
    { href: 'https://www.youtube.com/channel/UCr8J07nga1jPcoK9DhEYscg?view_as=subscriber', name: 'Dr. Ashish Chaudhari', sub: 'YouTube Channel' },
  ],
  eResources: [{ title: 'FM', url: 'https://ashishmechblog.wordpress.com/' }],
};

export default faculty;
