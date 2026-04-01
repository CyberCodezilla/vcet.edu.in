import React, { useEffect, useState } from 'react';
import { get, resolveApiUrl } from '../../../services/api';
import MMSLayout from '../../../components/mms/MMSLayout';
import { ExperientialImageHolder, ExperientialSectionCard, ExperientialSkeletonHolder } from './ExperientialLearningShared';

export default function MMSExperientialNesco() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-experiential-learning')
      .then((res: any) => {
        if (res.data?.nescoVisit) {
          setItems(res.data.nescoVisit);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MMSLayout title="NESCO Bombay Exhibition Centre">
      <div className="space-y-6">
        <ExperientialSectionCard title="NESCO Bombay Exhibition Centre">
          <p className="text-[17px] leading-8 text-slate-700">
            MMS students visited the Bombay Exhibition Centre, where they explored two major international exhibitions: the International Sourcing Exposition for Elevators & Escalators (ISEE) and the International Exhibition for the Complete Value Chain of the Dairy Industry. The ISEE exhibition focused on the latest advancements in the elevator and escalator industry, showcasing cutting-edge technologies such as energy-efficient systems, smart automation, and advanced safety solutions. Students gained valuable insights into how vertical transportation is evolving with trends like sustainability and smart technologies.
          </p>
          <p className="text-[17px] leading-8 text-slate-700">
            Meanwhile, the Dairy Industry Exhibition covered the entire supply chain of the dairy sector, from milk production to processing, packaging, and distribution. The event highlighted innovations in dairy technology, supply chain management, and sustainability practices, along with the role of automation and food safety in the industry. Both events provided MMS students with a comprehensive understanding of two diverse industries, elevators & escalators and dairy. The field visit enriched their knowledge by connecting academic concepts to real-world applications, especially in areas like supply chain management, operations, and technological advancements across sectors.
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
                  label={item.label || `nescoVisit ${idx + 1}`}
                  imageSrc={item.image ? resolveApiUrl(typeof item.image === 'string' ? item.image : (item.image as any).url) || undefined : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExperientialImageHolder 
              label="NESCO Visit 01" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/NESCO Bombay Exhibition Centre/Experential_Learning_-_NESCO_Bombay_Exhibition_Centre_IMG1.jpeg"
            />
            <ExperientialImageHolder 
              label="NESCO Visit 02" 
              imageSrc="/images/Departments/MMS(MBA)/Experential Learning/NESCO Bombay Exhibition Centre/Experential_Learning_-_NESCO_Bombay_Exhibition_Centre_IMG2.jpeg"
            />
          </div>
          )}
      
        </ExperientialSectionCard>
      </div>
    </MMSLayout>
  );
}
