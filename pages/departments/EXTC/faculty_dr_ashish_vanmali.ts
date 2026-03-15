import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: 'Dr. Ashish Vanmali',
  designation: 'Associate Professor',
  department: 'Electronics and Telecommunication Engineering',
  dateOfBirth: '14/01/1980',
  dateOfJoining: '12/09/2003',
  email: 'ashish.vanmali@vcet.edu.in',
  experienceYears: '19 Years 10 Months',
  papersPublished: '12',
  photo: '/Images/departments/extc/faculty/dr-ashish-vanmali.jpg',
  qualifications: ['Ph.D. (IIT Bombay)', 'M.Tech. (IIT Bombay)', 'B.E. (University of Mumbai)'],
  books: [{ title: 'Digital Communications, Mahalaxmi Publishing House, Kolhapur, August 2002' }],
  awards: [
    { title: '4 Best Paper Awards' },
    { title: 'Prof. Y. K. Bhushan Most Influential Professors and EduTech Leadership Award' },
    { title: 'Best Paper Award at 14th Esri India User Conference 2013, New Delhi' },
    { title: 'Best Paper Award at 17th Esri India User Conference 2017, New Delhi' },
    { title: 'Best Paper Award at Vidyavardhini National Conference 2020, Vasai' },
  ],
  memberships: [{ label: 'ISTE', fullName: 'Life Member - LM 35653' }],
  websites: [{ href: 'https://ashishvanmali.wordpress.com', name: 'Website', sub: 'ashishvanmali.wordpress.com' }],
  youtube: [{ href: 'https://www.youtube.com/channel/UC3mqQE0DcOXzWFj9nYxXF4w', name: 'Dr. Ashish Vanmali', sub: 'YouTube Channel' }],
  eResources: [{ title: 'E-Resources', url: 'https://ashishvanmali.wordpress.com' }],
};

export default faculty;
