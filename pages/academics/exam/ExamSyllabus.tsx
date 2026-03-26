import React from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';

const syllabusGroups: PDFGroup[] = [
  {
    groupName: 'Artificial Intelligence and Data Science',
    pdfs: [
      { name: 'AI & DS_SE_Revised 2019-20', url: '/pdfs/exam/Computer_SE_New_8_Branch_R2019_1.7.2021-1.pdf' },
      { name: 'AI & DS_TE_Revised 2019-20', url: '/pdfs/exam/T.E._AI_ML_DS_DE_R2019.pdf' },
      { name: 'AI & DS_BE_Revised 2019-20', url: '/pdfs/exam/BE_CSE_AIML__CSE_DS__AI_DS_AI_ML_DE.pdf' }
    ]
  },
  {
    groupName: 'Civil Engineering',
    pdfs: [
      { name: 'CIVIL_BE_2016', url: '/pdfs/exam/CIVIL_BE_2016.pdf' },
      { name: 'CIVIL_SE_2019C', url: '/pdfs/exam/CIVIL_SE_2019C.pdf' },
      { name: 'CIVIL_TE_2019C', url: '/pdfs/exam/CIVIL_TE_2019C.pdf' }
    ]
  },
  {
    groupName: 'Computer Engineering',
    pdfs: [
      { name: 'COMP_SE_2019C', url: '/pdfs/exam/Computer_SE_New_8_Branch_R2019_1.7.2021-1 (1).pdf' },
      { name: 'COMP_TE_2019C', url: '/pdfs/exam/T.E._AI_ML_DS_DE_R2019 (1).pdf' }
    ]
  },
  {
    groupName: 'First Year Engineering',
    pdfs: [
      { name: 'FE_ALL BRANCHES_NEP 2020 Scheme', url: '/pdfs/exam/466-COMP-FE-Sem1-Winter2021.pdf' }
    ]
  }
];

const ExamSyllabus: React.FC = () => {
  return (
    <ExamPDFPage
      title="University Syllabus"
      subtitle="Download comprehensive course syllabi and subject structures for all departments."
      breadcrumbLabel="Syllabus"
      groups={syllabusGroups}
    />
  );
};

export default ExamSyllabus;
