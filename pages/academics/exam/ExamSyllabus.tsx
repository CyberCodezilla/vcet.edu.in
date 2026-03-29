import React, { useEffect, useState } from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';
import { pagesApi } from '../../../admin/api/pagesApi';
import { ExamData } from '../../../admin/types';

const defaultSyllabusGroups: PDFGroup[] = [
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
      { name: 'COMP_TE_2019C', url: '/pdfs/exam/T.E._AI_ML_DS_DE_R2019 (1).pdf' },
      { name: 'COMP_TE_BE_2019C', url: '/pdfs/exam/COMP_TE-BE_2016 (1).pdf' }
    ]
  },
  {
    groupName: 'Computer Science and Engineering (Data Science)',

    pdfs: [
      { name: 'CSE_SE_Revised 2019-20', url: '/pdfs/exam/Computer_SE_New_8_Branch_R2019_1.7.2021 (1).pdf' },
      { name: 'CSE_TE_Revised 2019-20', url: '/pdfs/exam/Final-Syllabus-1.pdf' },
      { name: 'CSE_BE_Revised 2019-20', url: '/pdfs/exam/BE_CSE_AIML__CSE_DS__AI_DS_AI_ML_DE (1).pdf' }
    ]
  },
   {
    groupName: 'Electronics and Telecommunication Engineering',
    pdfs: [
      { name: 'E&TC_SE_2019C', url: '/pdfs/exam/EXTC_SE_2019C.pdf' },
      { name: 'E&TC_TE_2019C', url: '/pdfs/exam/EXTC_TE_2019C.pdf' },
      { name: 'E&TC_BE_2019C', url: '/pdfs/exam/EXTC_TE-BE_2016.pdf' }
    ]
  },
   {
    groupName: 'Information Technology',
    pdfs: [
      { name: 'IT_SE_2019C', url: '/pdfs/exam/IT_SE_2019C.pdf' },
      { name: 'IT_TE_2019C', url: '/pdfs/exam/IT_TE_2019C.pdf' },
      { name: 'IT_BE_2019C', url: '/pdfs/exam/IT_SE-BE_2016.pdf' }
    ]
  },
   {
    groupName: 'Mechanical Engineering',
    pdfs: [
      { name: 'MECH_BE_2016', url: '/pdfs/exam/MECH_SE-BE_2016.pdf' },
      { name: 'MECH_SE_2019C', url: '/pdfs/exam/MECH_SE_2019C.pdf' },
      { name: 'MECH_TE_2019C', url: '/pdfs/exam/MECH_TE_2019C.pdf' }
    ]
  },
  {
    groupName: 'First Year Engineering',
    pdfs: [
      { name: 'FE_ALL BRANCHES_NEP 2020 Scheme', url: '/pdfs/exam/First-Year-Engineering-All-Branches-Scheme-Syllabus-Sem-I-and-Sem-II-Final-1-July-2024-25.pdf' }
    ]
  }
];

const ExamSyllabus: React.FC = () => {
  const [syllabusGroups, setSyllabusGroups] = useState<PDFGroup[]>(defaultSyllabusGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesApi.exam.get()
      .then((res: any) => {
        const data = res?.data || res;
        if (data && data.syllabus && data.syllabus.length > 0) {
          const baseUrl = (import.meta.env.VITE_API_URL as string || 'http://127.0.0.1:8000').replace(/\/+$/, '');
          
          const newGroups: PDFGroup[] = data.syllabus.map(section => ({
            groupName: section.department,
            pdfs: (section.documents || [])
              .map(doc => ({
                name: doc.title || '',
                url: doc.fileUrl ? `${baseUrl}${doc.fileUrl}` : ''
              }))
              .filter(doc => doc.url !== '')
          })).filter(group => group.pdfs.length > 0);

          if (newGroups.length > 0) {
            const mergedGroups = [...defaultSyllabusGroups];
            newGroups.forEach(newGroup => {
              const existingIndex = mergedGroups.findIndex(
                g => g.groupName.trim().toLowerCase() === newGroup.groupName.trim().toLowerCase()
              );
              if (existingIndex !== -1) {
                mergedGroups[existingIndex] = {
                  ...mergedGroups[existingIndex],
                  pdfs: [...newGroup.pdfs, ...mergedGroups[existingIndex].pdfs]
                };
              } else {
                mergedGroups.unshift(newGroup);
              }
            });
            setSyllabusGroups(mergedGroups);
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
      title="University Syllabus"
      subtitle="Download comprehensive course syllabi and subject structures for all departments."
      breadcrumbLabel="Syllabus"
      groups={syllabusGroups}
    />
  );
};

export default ExamSyllabus;
