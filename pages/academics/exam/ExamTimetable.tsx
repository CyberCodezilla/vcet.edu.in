import React from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';

const timetableGroups: PDFGroup[] = [
  {
    groupName: 'Current Exam Timetables',
    pdfs: [
      { name: 'TIME-TABLE_SEM-VIII_C-SCHEME_AUG-2025', url: '/pdfs/exam/TIME-TABLE_SEM-VIII_C-SCHEME_AUG-2025.pdf' },
      { name: 'TIME TABLE_SEM V_C-SCHEME_NOV 2025', url: '/pdfs/exam/TIME-TABLE_SEM-V_C-SCHEME_NOV-2025.pdf' },
      { name: 'TIME TABLE_SEM III_C-SCHEME_NOV 2025', url: '/pdfs/exam/TIME-TABLE_SEM-III_C-SCHEME_NOV-2025.pdf' },
      { name: 'TIME TABLE_SEM I_C-SCHEME_NOV 2025', url: '/pdfs/exam/TIME-TABLE_SEM-I-_C-SCHEME_-NOV-2025.pdf' },
      { name: 'TIME TABLE _SEM VII_C-SCHEME_MAY 2025', url: '/pdfs/exam/TIME-TABLE-_SEM-VII_C-SCHEME_MAY-2025.pdf' },
      { name: 'TIME TABLE _SEM V_C-SCHEME_MAY 2025', url: '/pdfs/exam/TIME-TABLE-_SEM-V_C-SCHEME_MAY-2025.pdf' },
      { name: 'TIME TABLE _SEM III_C-SCHEME_MAY 2025', url: '/pdfs/exam/TIME-TABLE-_SEM-III_C-SCHEME_MAY-2025.pdf' }
    ]
  }
];

const ExamTimetable: React.FC = () => {
  return (
    <ExamPDFPage
      title="University Exam Timetable"
      subtitle="View current and upcoming semester examination schedules."
      breadcrumbLabel="Timetable"
      groups={timetableGroups}
    />
  );
};

export default ExamTimetable;
