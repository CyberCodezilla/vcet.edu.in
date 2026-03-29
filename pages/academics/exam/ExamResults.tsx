import React, { useEffect, useState } from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';
import { pagesApi } from '../../../admin/api/pagesApi';
import { ExamData } from '../../../admin/types';

const defaultResultGroups: PDFGroup[] = [
  {
    groupName: 'December 2021',
    subTitle: 'First Year Engineering (F.E.)',
    pdfs: [
      { name: 'AIDS-FE-Sem1-Winter2021', url: '/pdfs/exam/466-AIDS-FE-Sem1-Winter2021.pdf' },
      { name: 'CSEDS-FE-Sem1-Winter2021', url: '/pdfs/exam/466-CSEDS-FE-Sem1-Winter2021.pdf' },
      { name: 'COMP-FE-Sem1-Winter2021', url: '/pdfs/exam/466-COMP-FE-Sem1-Winter2021.pdf' },
      { name: 'CIVIL-FE-Sem1-Winter2021', url: '/pdfs/exam/466-CIVIL-FE-Sem1-Winter2021.pdf' },
      { name: 'EXTC-FE-Sem1-Winter2021', url: '/pdfs/exam/466-EXTC-FE-Sem1-Winter2021.pdf' },
      { name: 'IT-FE-Sem1-Winter2021', url: '/pdfs/exam/466-IT-FE-Sem1-Winter2021.pdf' },
      { name: 'MECH-FE-Sem1-Winter2021', url: '/pdfs/exam/466-MECH-FE-Sem1-Winter2021.pdf' }
    ]
  },
  {
    groupName: 'December 2021',
    subTitle: 'Artificial Intelligence and Data Science',
    pdfs: [
      { name: 'SEM-III_Rev-2019_AIDSC-Scheme', url: '/pdfs/exam/SEM-III_Rev-2019_AIDSC-Scheme.pdf' },
      { name: 'SEM III_Rev 2019_AIDS_DSE(C-Scheme)', url: '/pdfs/exam/SEM-III_Rev-2019_AIDS_DSEC-Scheme.pdf' }
    ]
  },
  {
    groupName: 'December 2021',
    subTitle: 'Computer Science and Engineering (Data Science)',
    pdfs: [
      { name: 'SEM III_Rev 2019_CSEDS(C-Scheme)', url: '/pdfs/exam/SEM-III_Rev-2019_CSEDSC-Scheme.pdf' },
      { name: 'SEM III DSE_(C-Scheme) _FEB 2022', url: '/pdfs/exam/bac.pdf' }
    ]
  },
  {
    groupName: 'December 2021',
    subTitle: 'Civil Engineering',
    pdfs: [
      { name: 'SEM VII_Rev 2016_Civil(CBCGS)', url: '/pdfs/exam/SEM-VII_Rev-2016_CivilCBCGS.pdf' },
      { name: 'SEM III_Rev 2019_ Civil (C-Scheme)', url: '/pdfs/exam/SEM-III_Rev-2019_-Civil-C-Scheme.pdf' },
      { name: 'SEM III (DSE) CIVIL FEB 2022', url: '/pdfs/exam/SEM-III-DSE-CIVIL.pdf' },
      { name: 'SEM V_Rev 2019_Civil (C-Scheme)', url: '/pdfs/exam/SEM-V_Rev-2019_Civil-C-Scheme.pdf' }
    ]
  },
  {
    groupName: 'December 2021',
    subTitle: 'Computer Engineering',
    pdfs: [
      { name: 'SEM III_Rev 2019_Comp(C-Scheme)', url: '/pdfs/exam/SEM-III_Rev-2019_CompC-Scheme.pdf' },
      { name: 'SEM V_Rev 2019_Comp(C-Scheme)', url: '/pdfs/exam/SEM-V_Rev-2019_CompC-Scheme.pdf' },
      { name: 'SEM VII_Rev 2016_Comp(CBCGS)', url: '/pdfs/exam/SEM-VII_Rev-2016_CompCBCGS.pdf' },
      { name: 'SEM III_Rev 2019_Comp_DSE(C-Scheme)', url: '/pdfs/exam/SEM-III_Rev-2019_Comp_DSEC-Scheme.pdf' }
    ]
  },
  {
    groupName: 'December 2021',
    subTitle: 'Electronics and Telecommunication Engineering',
    pdfs: [
      { name: 'SEM VII_Rev 2016_Extc(CBCGS)', url: '/pdfs/exam/SEM-VII_Rev-2016_ExtcCBCGS.pdf' },
      { name: 'SEM III_Rev 2019_Extc (C-Scheme)', url: '/pdfs/exam/SEM-III_Rev-2019_Extc-C-Scheme.pdf' },
      { name: 'SEM III(DSE) EXTC FEB 2022', url: '/pdfs/exam/SEM-IIIDSE-EXTC.pdf' },
      { name: 'SEM V_Rev 2019_Extc (C-Scheme)', url: '/pdfs/exam/SEM-V_Rev-2019_Extc-C-Scheme.pdf' }
    ]
  },
  {
    groupName: 'December 2021',
    subTitle: 'Instrumentation Engineering',
    pdfs: [
      { name: 'SEM VII_Rev 2016_Instru(CBCGS)', url: '/pdfs/exam/SEM-VII_Rev-2016_InstruCBCGS.pdf' },
      { name: 'SEM V_Rev 2019_Instru(C-SCHEME)', url: '/pdfs/exam/SEM-V_Rev-2019_InstruC-SCHEME.pdf' },
      { name: 'SEM III_Rev 2019_Instru(C-SCHEME)', url: '/pdfs/exam/SEM-III_Rev-2019_InstruC-SCHEME.pdf' },
      { name: 'SEM III_Rev 2019_Instru_DSE(C-SCHEME)', url: '/pdfs/exam/SEM-III_Rev-2019_Instru_DSEC-SCHEME.pdf' }
    ]
  },
  {
    groupName: 'May 2021',
    pdfs: [
      { name: 'Civil Engineering Sem IV (May 2021)', url: '/pdfs/exam/466_VCET_CIVIL_Rev2019_Sem-IV-C-SCHEME.pdf' }
    ]
  }
];

const ExamResults: React.FC = () => {
  const [resultGroups, setResultGroups] = useState<PDFGroup[]>(defaultResultGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesApi.exam.get()
      .then((res: any) => {
        const data = res?.data || res;
        if (data && data.results && data.results.length > 0) {
          const baseUrl = (import.meta.env.VITE_API_URL as string || 'http://127.0.0.1:8000').replace(/\/+$/, '');
          
          const newGroups: PDFGroup[] = data.results.map(section => ({
            groupName: section.title || 'Latest Results',
            subTitle: section.department,
            pdfs: (section.documents || [])
              .map(doc => ({
                name: doc.title || '',
                url: doc.fileUrl ? `${baseUrl}${doc.fileUrl}` : ''
              }))
              .filter(doc => doc.url !== '')
          })).filter(group => group.pdfs.length > 0);

          if (newGroups.length > 0) {
            const mergedGroups = [...defaultResultGroups];
            newGroups.forEach(newGroup => {
              const existingIndex = mergedGroups.findIndex(
                g => 
                  g.groupName.trim().toLowerCase() === newGroup.groupName.trim().toLowerCase() && 
                  (g.subTitle || '').trim().toLowerCase() === (newGroup.subTitle || '').trim().toLowerCase()
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
            setResultGroups(mergedGroups);
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
      title="University Result"
      subtitle="Check the latest semester graduation and internal examination results."
      breadcrumbLabel="Results"
      groups={resultGroups}
    />
  );
};

export default ExamResults;
