import type { FacultyData } from '../csds/FacultyProfileView';

const faculty: FacultyData = {
  name: "Dr. Tatwadarshi Nagarhalli",
  designation: "Associate Professor & Head of Department",
  department: "Artificial Intelligence and Data Science",
  dateOfJoining: "15 February 2021",
  email: "tatwadarshi.nagarhalli@vcet.edu.in",
  experienceYears: "12",
  papersPublished: "55",
  photo: "/Images/departments/aids/faculty/dr-tatwadarshi-nagarhalli.jpg",
  qualifications: [
    "Ph.D. (Computer Engineering)",
    "Ph.D. (Sanskrit)",
    "M.E. (Computer Engineering)",
    "M.A. (Sanskrit)",
    "PGDBA (E-Business)",
  ],
  specialization: [
    "Machine Learning",
    "Natural Language Processing",
    "Artificial Intelligence",
    "Data Science",
    "Data Security",
  ],
  roles: [
    { icon: "fa-crown", label: "Head of Department (HOD)" },
  ],
  books: [
    { title: "Cyber Security Threats and Challenges Facing Human Life", subtitle: "Edited Book - Chapman & Hall CRC Press, Taylor & Francis Group, UK" },
    { title: "Intelligent Approaches to Cyber Security", subtitle: "Edited Book - Chapman & Hall CRC Press, Taylor & Francis Group, UK (Scopus Indexed)" },
    { title: "Natural Language Processing - Sem VII, B.E. Computer Engineering, University of Mumbai", subtitle: "Authored Book" },
    { title: "Natural Language Processing - Sem VIII, B.E. Electronics & Telecommunication / Electronics & Computer Science, University of Mumbai", subtitle: "Authored Book" },
    { title: "Natural Language Processing - Sem VIII, B.E. Computer Engineering, Savitribai Phule Pune University", subtitle: "Authored Book" },
    { title: "Cyber Security - Sem VII, B.E. Artificial Intelligence and Data Science, SPPU", subtitle: "Authored Book" },
    { title: "Introduction and Importance of ML Techniques in Cyber Security", subtitle: "Book Chapter - CRC Press" },
    { title: "Evaluation of Learning Techniques in Intrusion Detection System", subtitle: "Book Chapter - CRC Press" },
    { title: "Analysis of RNN and CNN Techniques in Blood Cell Classification", subtitle: "Book Chapter - CRC Press" },
    { title: "Evaluating the Effectiveness of CNN in Detecting Brain Tumour", subtitle: "Book Chapter - CRC Press" },
    { title: "Fundamental Models in Machine Learning and Deep Learning", subtitle: "Book Chapter - CRC Press" },
    { title: "A Deep Learning-based Approach for Fruit Gradation in the Post-Harvesting Phase", subtitle: "Book Chapter - CRC Press" },
    { title: "Significance of Intelligent Learning Techniques in IoT Applications", subtitle: "Book Chapter - CRC Press" },
    { title: "A Review of Security Challenges and Solutions for Healthcare IoT-based Systems", subtitle: "Book Chapter - CRC Press" },
  ],
  isbnNumbers: [
    "9781032111285",
    "9781003218555",
    "9781032521619",
    "9789355830913",
    "9789389926798",
    "9789389926781",
  ],
  publications: [
    {
      title: "Security Threats to Machine Learning Systems - https://www.analyticsvidhya.com/",
      journal: "Analytics Vidhya",
    },
    {
      title: "Role of Machine Learning in Natural Language Processing - https://www.analyticsvidhya.com/",
      journal: "Analytics Vidhya",
    },
  ],
  patents: [
    { title: "Patents published: 02 (Deep Learning, NLP, Data Security)" },
    { title: "Copyrights registered: 09" },
  ],
  awards: [
    {
      icon: "fa-award",
      title: "Best Paper Award",
      subtitle: "2nd IEEE International Conference on Engineering and Technology (ICETECH) - 17-18 March 2016 - Coimbatore, India - Paper: \"A New Approach to Hindi Text Steganography using Modified Vedic Numeric Code\"",
    },
  ],
  memberships: [
    { label: "IEEE" },
    { label: "ISTE" },
    { label: "NSDC" },
  ],
  websites: [
    { href: "https://www.linkedin.com/in/tatwadarshipn/",                                        icon: "fa-linkedin",      name: "LinkedIn",        sub: "linkedin.com/in/tatwadarshipn" },
    { href: "https://www.scopus.com/authid/detail.uri?authorId=57202110143",                     icon: "fa-search",        name: "Scopus Profile",  sub: "Author ID: 57202110143" },
    { href: "https://scholar.google.com/citations?user=SAVvoPgAAAAJ&hl=en",                      icon: "fa-user-graduate", name: "Google Scholar",  sub: "Citation Profile" },
    { href: "https://orcid.org/0000-0002-8282-6273",                                             icon: "fa-orcid",         name: "ORCID",           sub: "0000-0002-8282-6273" },
  ],
};

export default faculty;
