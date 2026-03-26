import React from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';

const questionPaperGroups: PDFGroup[] = [
  {
    groupName: 'May 2021',
    subTitle: 'FE II Semester & SE IV Semester',
    pdfs: [
      { name: 'FE II Semester', url: '/pdfs/exam/466-COMP-FE-Sem1-Winter2021.pdf' },
      { name: 'SE IV Semester', url: '/pdfs/exam/466_VCET_CIVIL_Rev2019_Sem-IV-C-SCHEME.pdf' },
      { name: 'Civil Engineering (SE IV)', url: '/pdfs/exam/SEM-III_Rev-2019_-Civil-C-Scheme.pdf' },
      { name: 'Computer Engineering (SE IV)', url: '/pdfs/exam/SEM-III_Rev-2019_CompC-Scheme.pdf' }
    ]
  },
  {
    groupName: 'May 2022',
    subTitle: 'FE II Semester & SE IV Semester',
    pdfs: [
      { name: 'FE II Semester (May 2022)', url: '/pdfs/exam/466-COMP-FE-Sem1-Winter2021.pdf' },
      { name: 'SE IV Semester (May 2022)', url: '/pdfs/exam/466-IT-FE-Sem1-Winter2021.pdf' }
    ]
  }
];

const ExamQuestionPaper: React.FC = () => {
  return (
    <ExamPDFPage
      title="University Question Papers"
      subtitle="Access previous years' university examination question papers."
      breadcrumbLabel="Question Papers"
      groups={questionPaperGroups}
    />
  );
};

export default ExamQuestionPaper;
