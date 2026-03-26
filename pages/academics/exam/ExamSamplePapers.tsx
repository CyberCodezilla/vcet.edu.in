import React from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';

const samplePaperGroups: PDFGroup[] = [
  {
    groupName: 'Even Semester',
    subTitle: 'FE II Semester & SE IV Semester',
    pdfs: [
      { name: 'FE II Semester', url: '/pdfs/exam/466-COMP-FE-Sem1-Winter2021.pdf' },
      { name: 'SE IV Semester', url: '/pdfs/exam/466_VCET_CIVIL_Rev2019_Sem-IV-C-SCHEME.pdf' }
    ]
  },
  {
    groupName: 'Odd Semester',
    subTitle: 'FE I Semester & SE III Semester',
    pdfs: [
      { name: 'Mechanical Engineering ICE (Sem V)', url: '/pdfs/exam/ICE_Sem_V_Sample_Question_Paper.pdf' },
      { name: 'Computer Engineering (SE III)', url: '/pdfs/exam/SEM-III_Rev-2019_CompC-Scheme.pdf' }
    ]
  }
];

const ExamSamplePapers: React.FC = () => {
  return (
    <ExamPDFPage
      title="Sample Papers"
      subtitle="Practice with sample papers and mock tests for examinations."
      breadcrumbLabel="Sample Papers"
      groups={samplePaperGroups}
    />
  );
};

export default ExamSamplePapers;
