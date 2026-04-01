import React, { useEffect, useState } from 'react';
import { get, resolveApiUrl } from '../../../services/api';
import MMSLayout from '../../../components/mms/MMSLayout';
import { ExperientialImageHolder, ExperientialSectionCard, ExperientialSkeletonHolder } from './ExperientialLearningShared';

export default function MMSExperientialModelMaking() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-experiential-learning')
      .then((res: any) => {
        if (res.data?.modelMaking) {
          setItems(res.data.modelMaking);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MMSLayout title="3D Model Making">
      <div className="space-y-6">
        <ExperientialSectionCard title="3D Model Making Presentation">
          <p className="text-[17px] leading-8 text-slate-700">
            Creating 3D models and presentations based on industrial visits in an operations management course is a powerful experiential learning tool. It allows students to visualize and understand complex processes, enhancing their practical knowledge. This hands-on approach fosters creativity, critical thinking, and problem-solving skills. By presenting their models, students also improve their communication and teamwork abilities, preparing them for real-world operational challenges.
          </p>

                    {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <ExperientialSkeletonHolder />
              <ExperientialSkeletonHolder />
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {items.map((item, idx) => (
                <ExperientialImageHolder
                  key={idx}
                  label={item.label || `modelMaking ${idx + 1}`}
                  imageSrc={item.image ? resolveApiUrl(typeof item.image === 'string' ? item.image : (item.image as any).url) || undefined : undefined}
                />
              ))}
            </div>
          ) : (
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ExperientialImageHolder 
              label="3D Model Presentation 01" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/3D MODEL MAKING PRESENTATION/Experential_Learning_-_3D_Model_Making_IMG1.jpeg"
            />
            <ExperientialImageHolder 
              label="3D Model Presentation 02" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/3D MODEL MAKING PRESENTATION/Experential_Learning_-_3D_Model_Making_IMG2.jpeg"
            />
            <ExperientialImageHolder 
              label="3D Model Presentation 03" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/3D MODEL MAKING PRESENTATION/Experential_Learning_-_3D_Model_Making_IMG3.jpeg"
            />
            <ExperientialImageHolder 
              label="3D Model Presentation 04" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/3D MODEL MAKING PRESENTATION/Experential_Learning_-_3D_Model_Making_IMG4.jpeg"
            />
          </div>
          )}
        </ExperientialSectionCard>
      </div>
    </MMSLayout>
  );
}
