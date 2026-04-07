import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import HorizontalTableShell from '../../../components/mms/HorizontalTableShell';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData, TrainingEvent } from '../../../admin/types';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

export default function MMSTrainingEvents() {
  const [data, setData] = useState<TrainingPlacementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/pages/mms-training-placement');
        setData((response as any).data);
      } catch (err) {
        console.error('Failed to fetch training placement data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fallbackEvents: TrainingEvent[] = [
    {
      srNo: '1',
      eventName: 'AMCAT Test',
      resourcePerson: 'AMCAT (Aspiring Minds Computer Adaptive Assessment) is India\'s largest Employability Assessment and is recognized by over many companies. AMCAT gives candidates detailed feedback of their employability (even stroke feedback) and helps connect them to over 4000 entry level jobs every year. Duration of test - 03 hours',
      conductionDate: 'Since 2019',
      image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Events/Training_Events_-_AMCAT_Test.webp'
    },
    {
      srNo: '2',
      eventName: 'Refresher Course on Technical interview Preparation.',
      resourcePerson: 'â–ª Refresher courses for enhancing basic programming skills and skills pertaining to the program are organized by the â€œTraining & Placement Cell.â€ These courses focus on reviewing and updating knowledge and skills required for clearing the aptitude\nâ–ª VCET Faculties conducts refreshers course for students of all the branches',
      conductionDate: '',
      image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Events/Training_Events_-_Refresher_Course_on_Technical_Interview_Preparation.webp'
    }
  ];

  const events = data?.events?.length ? data.events : fallbackEvents;

  return (
    <MMSLayout title="Events">
      <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_36px_-26px_rgba(11,61,145,0.6)]">
        <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-5">
          <HorizontalTableShell storageKey="mms-table-hint-events" scrollerClassName="border border-brand-navy/20 bg-white">
            <table className="w-full min-w-[980px] snap-start border-collapse"> 
            <thead>
              <tr className="text-white">
                <th className="sticky top-0 z-20 w-[70px] border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-base font-bold uppercase">SR.</th>        
                <th className="sticky top-0 z-20 w-[260px] border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-base font-bold">Name of the Event</th>   
                <th className="sticky top-0 z-20 border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-xl font-bold">Company Name / Resource Person</th>
                <th className="sticky top-0 z-20 w-[190px] border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-xl font-bold">Date of conduction</th>  
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="align-top animate-pulse">
                    <td className="border border-slate-700/80 px-3 py-3"><div className="h-5 w-5 bg-slate-200"></div></td>
                    <td className="border border-slate-700/80 px-3 py-3">
                      <div className="space-y-3">
                        <div className="h-32 w-full bg-slate-200"></div>
                        <div className="h-6 w-3/4 bg-slate-200"></div>
                      </div>
                    </td>
                    <td className="border border-slate-700/80 px-3 py-3">
                      <div className="space-y-2">
                        <div className="h-5 w-full bg-slate-200"></div>
                        <div className="h-5 w-full bg-slate-200"></div>
                        <div className="h-5 w-2/3 bg-slate-200"></div>
                      </div>
                    </td>
                    <td className="border border-slate-700/80 px-3 py-3"><div className="h-5 w-24 bg-slate-200"></div></td>
                  </tr>
                ))
              ) : (
                events.map((event, idx) => (
                  <tr key={idx} className="align-top hover:bg-slate-50">        
                    <td className="border border-slate-700/80 px-3 py-3 text-base text-slate-900">{+idx + 1}</td>
                    <td className="border border-slate-700/80 px-3 py-3 text-slate-900">
                      <div className="space-y-3">
                        {event.image ? (
                          <div className="flex h-32 items-center justify-center rounded-none border border-brand-blue/25 bg-slate-50 overflow-hidden">
                            <img src={resolveUploadedAssetUrl(event.image) ?? resolveApiUrl(event.image)} alt={event.eventName} className="h-full w-full object-cover" />
                          </div>
                        ) : null}
                        <p className="text-2xl leading-tight">{event.eventName}</p>        
                      </div>
                    </td>
                    <td className="border border-slate-700/80 px-3 py-3 text-lg leading-[1.6] text-slate-900">
                      {event.resourcePerson.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </td>
                    <td className="border border-slate-700/80 px-3 py-3 text-xl leading-[1.45] text-slate-900">{event.conductionDate}</td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </HorizontalTableShell>
        </div>
      </section>
    </MMSLayout>
  );
}
