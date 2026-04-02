import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getFacilitiesSection } from '../../services/facilities';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const HealthFacilities: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    getFacilitiesSection<any>('health-facilities')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const items = useMemo(() => {
    const rows = Array.isArray(apiData?.items)
      ? apiData.items
          .map((item: any, index: number) => ({
            name: String(item?.name ?? '').trim() || `Image ${index + 1}`,
            description: String(item?.description ?? '').trim() || 'Health Facility',
            imageUrl: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
          .filter((item: any) => item.name.length > 0)
      : [];
    if (rows.length > 0) return rows;
    return [1, 2, 3, 4].map((n) => ({ name: `Image ${n}`, description: 'Health Facility', imageUrl: null }));
  }, [apiData]);

  return (
    <PageLayout>
      <PageBanner
        title="Health Facilities"
        subtitle="Dedicated spaces designed to support student health, care, and emergency readiness."
        breadcrumbs={[
          { label: 'Health Facilities' },
        ]}
      />

      <section className="py-14 md:py-20 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center reveal">
              <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#2d5f9a]">
                Student Wellness
              </p>
              <h2
                className="mt-3 text-3xl md:text-[2.8rem] font-display font-semibold text-[#0f2d5c]"
              >
                Health Facilities
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#e5c76a]" />
                <span className="h-2.5 w-2.5 rotate-45 border border-[#c89f2e] bg-[#fff5d9]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#e5c76a]" />
              </div>
            </div>

            <div className="reveal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                {items.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="relative aspect-[4/3] rounded-xl bg-white border border-[#f3e7c4] shadow-[0_4px_24px_rgba(212,168,67,0.08)] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-[#e5c76a] group"
                  >
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="absolute inset-0 h-full w-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <div className="absolute top-5 left-5 flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#e5c76a]" />
                          <span className="text-xs font-semibold text-[#bfa13a] tracking-wider">Placeholder</span>
                        </div>
                        <span className="text-lg md:text-xl font-semibold text-[#244d82] mb-1 mt-2 group-hover:text-[#bfa13a] transition-colors duration-300">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#8a98b3]">{item.description}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#dbe7f8] to-transparent" />
          </div>
        </div>
      </section>

      <style>{`
        .reveal {
          animation: fadeInUp 0.65s ease both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PageLayout>
  );
};

export default HealthFacilities;
