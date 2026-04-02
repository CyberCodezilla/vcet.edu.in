import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getFacilitiesSection } from '../../services/facilities';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const firstRow = [
  'Ramp for Wheelchair',
  'Railing for Climbing Stairs',
];

const secondRow = [
  'Accessible Toilet (Image 1)',
  'Accessible Toilet (Image 2)',
];

const thirdRow = [
  'Lift 1 and Lift 2',
  'Lift 3',
];

const placeholderRows = {
  first: [null, null],
  second: [null, null],
  third: [null, null],
} as const;

const DifferentlyAbled: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    getFacilitiesSection<any>('differently-abled')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const displayRows = useMemo(() => {
    const items = Array.isArray(apiData?.items)
      ? apiData.items
          .map((item: any) => ({
            name: String(item?.name ?? '').trim(),
            imageUrl: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
          .filter((item: any) => item.name.length > 0)
      : [];
    if (items.length >= 6) {
      return {
        first: items.slice(0, 2),
        second: items.slice(2, 4),
        third: items.slice(4, 6),
      };
    }
    return {
      first: firstRow.map((name, idx) => ({ name, imageUrl: placeholderRows.first[idx] })),
      second: secondRow.map((name, idx) => ({ name, imageUrl: placeholderRows.second[idx] })),
      third: thirdRow.map((name, idx) => ({ name, imageUrl: placeholderRows.third[idx] })),
    };
  }, [apiData]);

  return (
    <PageLayout>
      <PageBanner
        title="Differently-Abled Facilities"
        breadcrumbs={[
          { label: 'Differently-Abled Facilities' },
        ]}
      />

      {/* Image Placeholder Gallery */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center mb-12 reveal">
            <div className="bg-brand-blue border-2 border-brand-blue border-l-[10px] border-l-brand-gold px-6 py-5 md:py-6 shadow-[0_16px_34px_rgba(234,179,8,0.58)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(234,179,8,0.72)]">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-gold">
                Barrier-Free Built Environment For Disabled And Elderly Persons
              </h2>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            <div className="reveal border-2 border-[#8ea2b8] bg-brand-gold/20 p-6 md:p-8 shadow-[0_14px_30px_rgba(14,56,112,0.45)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayRows.first.map((tag, idx) => (
                <div key={idx}>
                  <div className="aspect-[4/3] bg-[#eef2f7] border-2 border-black flex items-center justify-center overflow-hidden">
                    {tag.imageUrl ? (
                      <img src={tag.imageUrl} alt={tag.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-slate-400 text-xl font-semibold">Image Placeholder</span>
                    )}
                  </div>
                  <p className="mt-3 text-center text-3xl font-display font-bold text-brand-blue underline underline-offset-4">
                    {tag.name}
                  </p>
                </div>
              ))}
              </div>
            </div>

            <div className="reveal border-2 border-[#8ea2b8] bg-brand-gold/20 p-6 md:p-8 shadow-[0_14px_30px_rgba(14,56,112,0.45)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayRows.second.map((tag, idx) => (
                  <div key={idx}>
                    <div className="aspect-[4/3] bg-[#eef2f7] border-2 border-black flex items-center justify-center overflow-hidden">
                      {tag.imageUrl ? (
                        <img src={tag.imageUrl} alt={tag.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-slate-400 text-xl font-semibold">Image Placeholder</span>
                      )}
                    </div>
                    <p className="sr-only">{tag.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-3xl font-display font-bold text-brand-blue underline underline-offset-4">
                Accessible Toilet For Disabled
              </p>
            </div>

            <div className="reveal border-2 border-[#8ea2b8] bg-brand-gold/20 p-6 md:p-8 shadow-[0_14px_30px_rgba(14,56,112,0.45)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayRows.third.map((tag, idx) => (
                  <div key={idx}>
                    <div className="aspect-[4/3] bg-[#eef2f7] border-2 border-black flex items-center justify-center overflow-hidden">
                      {tag.imageUrl ? (
                        <img src={tag.imageUrl} alt={tag.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-slate-400 text-xl font-semibold">Image Placeholder</span>
                      )}
                    </div>
                    <p className="mt-3 text-center text-4xl font-display text-brand-blue">{tag.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-3xl font-display font-bold text-brand-blue underline underline-offset-4">
                Lift For Access
              </p>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default DifferentlyAbled;
