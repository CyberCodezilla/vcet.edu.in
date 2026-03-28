import React, { useEffect, useState } from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';
import { pagesApi } from '../../../admin/api/pagesApi';
import { ExamData } from '../../../admin/types';

const defaultTimetableGroups: PDFGroup[] = [
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
  const [timetableGroups, setTimetableGroups] = useState<PDFGroup[]>(defaultTimetableGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesApi.exam.get()
      .then((res: any) => {
        const data = res?.data || res;
        if (data && data.timetable && data.timetable.length > 0) {
          const baseUrl = (import.meta.env.VITE_API_URL as string || 'http://127.0.0.1:8000').replace(/\/+$/, '');
          const uploadedPdfs = data.timetable.map(doc => ({
            name: doc.title,
            url: doc.fileUrl ? `${baseUrl}${doc.fileUrl}` : ''
          })).filter(doc => doc.url !== '');

          if (uploadedPdfs.length > 0) {
             setTimetableGroups([
               {
                 groupName: 'Latest Uploads',
                 pdfs: uploadedPdfs
               },
               ...defaultTimetableGroups
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
      title="University Exam Timetable"
      subtitle="View current and upcoming semester examination schedules."
      breadcrumbLabel="Timetable"
      groups={timetableGroups}
    />
  );
};

export default ExamTimetable;
