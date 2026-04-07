import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get, resolveApiUrl } from '../../../services/api';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

interface FacultyMember {
  name: string;
  designation: string;
  photo: any | null;
}

interface MMSAboutData {
  data: {
    faculty: FacultyMember[];
  };
}

export default function MMSFaculty() {
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get<MMSAboutData>('/pages/mms-about')
      .then((res) => {
        if (res.data?.faculty) {
          setFacultyList(res.data.faculty);
        }
      })
      .catch((err) => {
        console.error('Failed to load faculty:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalFaculty = facultyList.length;

  return (
    <MMSLayout title="MMS Faculty">
      <section className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-brand-gold/30 pb-5">
          <div>
            <span className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60">
              <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" />
              Master of Management Studies
            </span>
            <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
          </div>

          <div className="flex items-center divide-x divide-slate-200 rounded-xl border border-slate-100 bg-white shadow-sm">
            {[
              { icon: 'ph-users-three', value: String(totalFaculty), label: 'Members' },
              { icon: 'ph-graduation-cap', value: 'MMS', label: 'Department' }, 
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5 px-4 py-3">
                <i className={`ph-fill ${stat.icon} text-lg text-brand-navy`} />
                <div>
                  <span className="block text-base font-bold leading-none text-brand-navy">{stat.value}</span>
                  <span className="mt-0.5 block text-[11px] text-slate-500">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-navy/50">Loading faculty data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2 md:grid-cols-3">
            {facultyList.map((faculty, index) => {
              const rawImage = faculty.photo;
              const imageStr = rawImage && typeof rawImage === 'object' && 'url' in rawImage 
                ? (rawImage as any).url 
                : (typeof rawImage === 'string' ? rawImage : null);
              const imageUrl = imageStr ? resolveUploadedAssetUrl(imageStr) ?? resolveApiUrl(imageStr) : null;

              const initials = (faculty.name || 'F M')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join('');

              return (
                <article
                  key={index}
                  className="group flex flex-col items-center rounded-lg border border-gray-100 border-b-[3px] border-t-[3px] border-b-[#fdb813] border-t-[#1a4b7c] bg-white px-6 pb-5 pt-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="relative mb-5 flex h-36 w-36 items-center justify-center bg-gradient-to-br from-brand-gold via-yellow-300 to-yellow-500 p-[2.5px] shadow-[0_10px_28px_rgba(26,75,124,0.2)]">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-white/70 bg-gradient-to-br from-brand-navy via-brand-blue to-[#245f99] text-3xl font-extrabold text-white">
                      {imageUrl ? (
                        <img src={imageUrl} alt={faculty.name} className="h-full w-full object-cover object-top" referrerPolicy="no-referrer" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.3),transparent_42%)]" />
                          <span className="relative tracking-wide">{initials}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="text-center text-base font-bold leading-snug text-[#1a4b7c]">{faculty.name}</h3>
                  <span className="mt-2 rounded bg-gray-100 px-3 py-0.5 text-center text-xs font-medium text-gray-500">
                    {faculty.designation}
                  </span>
                  <div className="my-3 h-0.5 w-10 bg-gray-300" />
                  <span className="mt-2 text-[11px] font-semibold text-slate-400">#{String(index + 1).padStart(2, '0')}</span>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </MMSLayout>
  );
}