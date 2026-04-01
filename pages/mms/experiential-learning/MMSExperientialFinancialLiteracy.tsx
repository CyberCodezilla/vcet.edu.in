import React, { useEffect, useState } from 'react';
import { get, resolveApiUrl } from '../../../services/api';
import MMSLayout from '../../../components/mms/MMSLayout';
import { ExperientialImageHolder, ExperientialSectionCard, ExperientialSkeletonHolder } from './ExperientialLearningShared';

export default function MMSExperientialFinancialLiteracy() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-experiential-learning')
      .then((res: any) => {
        if (res.data?.financialLiteracy) {
          setItems(res.data.financialLiteracy);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MMSLayout title="Financial Literacy Program">
      <div className="space-y-6">
        <ExperientialSectionCard title="Financial Literacy Program">
          <p className="text-[17px] leading-8 text-slate-700">
            As part of the Financial Management subject, MMS students organized a comprehensive Financial Literacy Program aimed at empowering a local self-help group (SHG) with essential financial knowledge and skills. This initiative was designed to foster financial independence and enhance the economic well-being of the SHG members.
          </p>
          <p className="text-[17px] leading-8 text-slate-700">
            This initiative not only enhanced the financial well-being of the participants but also provided MMS students with valuable teaching and leadership experience. The program exemplifies the positive impact of community-oriented educational efforts and the importance of financial literacy in fostering economic empowerment.
          </p>

          
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ExperientialSkeletonHolder />
              <ExperientialSkeletonHolder />
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {items.map((item, idx) => (
                <ExperientialImageHolder
                  key={idx}
                  label={item.label || `financialLiteracy ${idx + 1}`}
                  imageSrc={item.image ? resolveApiUrl(typeof item.image === 'string' ? item.image : (item.image as any).url) || undefined : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExperientialImageHolder 
              label="Financial Literacy Program 01" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/FINANCIAL LITERARCY PROGRAM/Experential_Learning_-_Financial_Literarcy_Program_IMG_1.jpeg"
            />
            <ExperientialImageHolder 
              label="Financial Literacy Program 02" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/FINANCIAL LITERARCY PROGRAM/Experential_Learning_-_Financial_LIterarcy_Program_IMG_2.jpeg"
            />
          </div>
          )}
      
        </ExperientialSectionCard>
      </div>
    </MMSLayout>
  );
}
