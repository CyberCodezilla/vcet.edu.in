import React from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';

const noticeGroups: PDFGroup[] = [
  {
    groupName: 'Important Examination Notices',
    pdfs: [
      { name: 'KT FORM NOTICE_SEM III TO VI _C-SCHEME May 2026', url: '/pdfs/exam/KT-FORM-NOTICE_SEM-III-TO-VI-_C-SCHEME.pdf' },
      { name: 'KT FORM NOTICE _SEM I & II_C-SCHEME May 2026', url: '/pdfs/exam/KT-FORM-NOTICE-_SEM-I-II_C-SCHEME.pdf' },
      { name: 'Notice_KT-_SEM-IV-VI_MAY-JUNE-2025', url: '/pdfs/exam/Notice_KT-_SEM-IV-VI_MAY-JUNE-2025.pdf' },
      { name: 'Notice_KT-_SEM-III-V_MAY-JUNE-2025', url: '/pdfs/exam/Notice_KT-_SEM-III-V_MAY-JUNE-2025.pdf' },
      { name: 'KT Exam form Notice for Sem VII & VIII May 2025', url: '/pdfs/exam/Notice_KT_SEM-VII-VIII_MAY-2025.pdf' },
      { name: 'KT Exam form Notice for Sem I & II May 2025', url: '/pdfs/exam/Notice_KT_SEM-I-II_MAY-2025_C-SCHEME.pdf' },
      { name: 'Notice_KT Exam Form_ME_SEM I & II_DEC 2024', url: '/pdfs/exam/Notice_KT-Exam-Form_ME_SEM-I-II_DEC-2024.pdf' },
      { name: 'Notice_Regular Exam Form_SEM V_NOV 2024', url: '/pdfs/exam/Notice_Regular-Exam-Form_SEM-V_NOV-2024.pdf' }
    ]
  }
];

const ExamNotices: React.FC = () => {
  return (
    <ExamPDFPage
      title="Exam Notices"
      subtitle="Important announcements regarding continuous evaluation and exams."
      breadcrumbLabel="Notices"
      groups={noticeGroups}
    />
  );
};

export default ExamNotices;
