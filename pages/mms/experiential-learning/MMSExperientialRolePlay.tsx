import React, { useEffect, useState } from 'react';
import { get, resolveApiUrl } from '../../../services/api';
import MMSLayout from '../../../components/mms/MMSLayout';
import { ExperientialImageHolder, ExperientialSectionCard, ExperientialSkeletonHolder } from './ExperientialLearningShared';

export default function MMSExperientialRolePlay() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-experiential-learning')
      .then((res: any) => {
        if (res.data?.rolePlay) {
          setItems(res.data.rolePlay);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MMSLayout title="Role Play">
      <div className="space-y-6">
        <ExperientialSectionCard title="Role Play">
          <p className="text-[17px] leading-8 text-slate-700">
            Role play in an MBA course is crucial for fostering practical learning and enhancing essential managerial competencies, such as leadership, communication, and problem-solving skills. By simulating real-world business scenarios, students can apply theoretical concepts, explore various strategies, and receive immediate feedback. This experiential learning methodology not only builds confidence but also equips students to navigate complex business challenges effectively in their professional careers. Students of MMS have explored the role plays under multiple courses throughout the journey at the Department of MMS.
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
                  label={item.label || `rolePlay ${idx + 1}`}
                  imageSrc={item.image ? resolveApiUrl(typeof item.image === 'string' ? item.image : (item.image as any).url) || undefined : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExperientialImageHolder 
              label="Role Play Session 01" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/Role Play/Experential_Learning_-_Role_Play_IMG1.jpeg"
            />
            <ExperientialImageHolder 
              label="Role Play Session 02" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/Role Play/Experential_Learning_-_Role_Play_IMG2.jpeg"
            />
          </div>
          )}
      
        </ExperientialSectionCard>
      </div>
    </MMSLayout>
  );
}
