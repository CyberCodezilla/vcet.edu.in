import React, { useEffect, useState } from 'react';
import ExamPDFPage, { PDFGroup } from './ExamPDFPage';
import { pagesApi } from '../../../admin/api/pagesApi';
import { ExamData } from '../../../admin/types';

const defaultSamplePaperGroups: PDFGroup[] = [
  {
    groupName: 'Even Semester',
    subTitle: 'FE II Semester,SE IV Semester, TE VI Semester & BE VIII Semester',
    pdfs: [
      { name: 'FE II Semester', url: '' },
      { name: 'Civil Engineering (SE IV)', url: 'https://drive.google.com/drive/folders/136bjGwvMsCN1AG2rr3o6q06JfgjeqMEq?usp=sharing' },
      { name: 'Computer Engineering (SE IV)', url: 'https://drive.google.com/drive/folders/1oga1XUIjUHucG9zXy_IvqrYpsUJBZjCH?usp=sharing' },
      { name: 'Computer Science and Engineering (Data Science) (SE IV)', url: 'https://drive.google.com/drive/folders/1BaEnUY0mL-6HknaQSMyBJJ2SSOtMibou?usp=sharing' },
      { name: 'Electronics and Telecommunication Engineering (SE IV)', url: 'https://drive.google.com/drive/folders/1qWj5sW68HJCKeIzObyfz6siN9LvtJzdM?usp=sharing' },
      { name: 'Instrumentation Engineering (SE IV)', url: 'https://drive.google.com/drive/folders/1arFTYMBh5Auxg83KUA8ttYihZOKInStZ?usp=sharing' },
      { name: 'Information Technology (SE IV)', url: 'https://drive.google.com/drive/folders/1TKj1H_pOkpCCRVwVuz40wi_4JEOjmWOq?usp=sharing' },
      { name: 'Artificial Intelligence and Data Science (SE IV)', url: 'https://drive.google.com/drive/folders/1vhayJTfrL-m23OFq0EF_MTSRPmpjfMdL?usp=sharing' },
      { name: 'Mechanical Engineering (SE IV)', url: '' },
      { name: 'Civil Engineering (TE VI)', url: 'https://drive.google.com/drive/folders/1tRToP39Dc3Gl0RZ_gOmbITf_BrJEKPfV?usp=sharing' },
     
      { name: 'Computer Engineering (TE VI)', url: 'https://drive.google.com/drive/folders/1tSjRom4PBgA_4U64TOOEvc90tJFJA-S0?usp=sharing' },
      { name: 'Electronics and Telecommunication Engineering (TE VI)', url: 'https://drive.google.com/drive/folders/1Uz8PJ_Y-w1ILVjjbJpqwuby1NMg-acFC?usp=sharing' },
      { name: 'Instrumentation Engineering (TE VI)', url: 'https://drive.google.com/drive/folders/1ats35MNE8n6bqdIYdKDhT7x43YndqLPQ?usp=sharing' },
      { name: 'Information Technology (TE VI)', url: 'https://drive.google.com/drive/folders/18QU0XdnmLQQEkKy_2BG4-M_AeWG201tA?usp=sharing' },
      { name: 'Mechanical Engineering (TE VI)', url: '' },
       { name: 'Civil Engineering (BE VIII)', url: 'https://drive.google.com/drive/folders/1IhyVSOVHDibq9VoDywb3zmbU8hRGvh8U?usp=sharing' },
     
      { name: 'Computer Engineering (BE VIII)', url: 'https://drive.google.com/drive/folders/1sSaF7m8Zaz_DKbgejHzibhUUIOR4sxmC?usp=sharing' },
      { name: 'Electronics and Telecommunication Engineering (BE VIII)', url: 'https://drive.google.com/drive/folders/1XUyegJ_v3OZRBeYXL8yJgr98Dp1R1HQz?usp=sharing' },
      { name: 'Instrumentation Engineering (BE VIII)', url: 'https://drive.google.com/drive/folders/1ay8_6UxzugUdJM6v8IvCh9Rx-fiAmIy1?usp=sharing' },
      { name: 'Information Technology (BE VIII)', url: 'https://drive.google.com/drive/folders/1oE1h0eDCEVkZgRTBcTZKUsfF77FqTb5j?usp=sharing' },
      { name: 'Mechanical Engineering (BE VIII)', url: '' }
     
    ]
  },
  {
    groupName: 'Old Semester',
    pdfs: []
  }
];

const ExamSamplePapers: React.FC = () => {
  const [samplePaperGroups, setSamplePaperGroups] = useState<PDFGroup[]>(defaultSamplePaperGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pagesApi.exam.get()
      .then((res: any) => {
        const data = res?.data || res;
        if (data && data.samplePapers && data.samplePapers.length > 0) {
          const baseUrl = (import.meta.env.VITE_API_URL as string || 'http://127.0.0.1:8000').replace(/\/+$/, '');
          const uploadedPdfs = data.samplePapers.map(doc => ({
            name: doc.title,
            url: doc.fileUrl ? `${baseUrl}${doc.fileUrl}` : ''
          })).filter(doc => doc.url !== '');

          if (uploadedPdfs.length > 0) {
             setSamplePaperGroups([
               {
                 groupName: 'Latest Uploads',
                 pdfs: uploadedPdfs
               },
               ...defaultSamplePaperGroups
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

  return (    <ExamPDFPage
      title="Sample Papers"      subtitle="Practice with sample papers and mock tests for examinations."
      breadcrumbLabel="Sample Papers"
      groups={samplePaperGroups}
    />
  );
};

export default ExamSamplePapers;
