import React, { useEffect, useState } from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';
import { pagesApi } from '../../../admin/api/pagesApi';
import { ExamData } from '../../../admin/types';

const defaultNoticeGroups: PDFGroup[] = [
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
  const [noticeGroups, setNoticeGroups] = useState<PDFGroup[]>(defaultNoticeGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesApi.exam.get()
      .then((res: any) => {
        const data = res?.data || res;
        if (data && data.notices && data.notices.length > 0) {
          const baseUrl = (import.meta.env.VITE_API_URL as string || 'http://127.0.0.1:8000').replace(/\/+$/, '');
          const uploadedPdfs = data.notices.map(doc => ({
            name: doc.title,
            url: doc.fileUrl ? `${baseUrl}${doc.fileUrl}` : ''
          })).filter(doc => doc.url !== '');

          if (uploadedPdfs.length > 0) {
             setNoticeGroups([
               {
                 groupName: 'Latest Uploads',
                 pdfs: uploadedPdfs
               },
               ...defaultNoticeGroups
             ]);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch exam data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
