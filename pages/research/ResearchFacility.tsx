import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Image as ImageIcon } from 'lucide-react';
import { getResearchSection } from '../../services/research';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

type ResearchFacilityItem = {
  id: number;
  title: string;
  description: string;
  image: string | null;
};

const fallbackItems: ResearchFacilityItem[] = [
  {
    id: 1,
    title: 'Computational Facility',
    description:
      'Licensed simulation and design platforms such as ANSYS, MATLAB, SolidWorks, and COMSOL are used for analysis, modeling, and problem-solving across engineering domains.',
    image: '/images/Research/Research Faculity/research-faculity3.jpg',
  },
  {
    id: 2,
    title: 'Experimental Research Setups',
    description:
      'The department supports hands-on experimentation through facilities including subsonic wind tunnel testing, bomb calorimeter, optical microscope, rotor bench, VCR bench, and CNG test bench.',
    image: '/images/Research/Research Faculity/research-faculity2.jpg',
  },
  {
    id: 3,
    title: 'Research and Innovation Outcomes',
    description:
      'Student and faculty teams regularly present project outcomes in competitions such as Avishkar, with participations, rankings, and award-winning prototypes demonstrating applied research impact.',
    image: '/images/Research/Research Faculity/research-facility1.png',
  },
];

const ResearchFacility: React.FC = () => {
  const [items, setItems] = useState<ResearchFacilityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFacilities() {
      try {
        const data = await getResearchSection<any>('research-facility');
        const facilities = Array.isArray(data?.facilities) ? data.facilities : [];
        const mapped = facilities
          .map((facility: any, index: number): ResearchFacilityItem => ({
            id: index + 1,
            title: String(facility?.title ?? '').trim() || `Research Facility ${index + 1}`,
            description: String(facility?.description ?? '').trim() || 'Description will be updated soon.',
            image: resolveUploadedAssetUrl(facility?.imageUrl ?? null),
          }));

        setItems(mapped);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadFacilities();
  }, []);

  const facilities = useMemo(() => {
    if (items.length > 0) return items;
    return fallbackItems;
  }, [items]);

  if (loading) {
    return (
      <PageLayout>
        <PageBanner
          title="Research Facilities"
          breadcrumbs={[
            { label: 'Research', href: '/research' },
            { label: 'Research Facilities' },
          ]}
        />
        <section className="py-14 md:py-20 bg-[#F7F9FC]">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] text-center text-slate-500">Loading facilities...</div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner
        title="Research Facilities"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Research Facilities' },
        ]}
      />

      <section className="py-14 md:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="max-w-4xl reveal">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.24em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1 mb-5">
              Informative Visuals
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1a4b7c] tracking-tight leading-[1.15] mb-4">
              Facility Highlights and Outcomes
            </h2>
            <p className="text-[#1A1A1A]/70 leading-[1.8] text-[16px] md:text-[17px] max-w-3xl">
              Explore computational resources, experimental setups, and innovation highlights presented with focused descriptions.
              These visuals reflect core research capabilities and outcomes across departments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {facilities.map((item, index) => (
              <article
                key={item.id}
                className="reveal group bg-white border border-[#E3E8EF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.10)] hover:-translate-y-0.5 transition-all duration-300"
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-[#EEF3F9] to-[#E8EDF5]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
                      <div className="w-16 h-16 rounded-2xl border border-dashed border-[#1a4b7c]/35 bg-white/80 backdrop-blur-sm flex items-center justify-center mb-3">
                        <ImageIcon className="w-6 h-6 text-[#1a4b7c]/50" />
                      </div>
                      <p className="text-[11px] text-[#5F6D82] font-semibold uppercase tracking-[0.14em]">
                        informative-image.jpg
                      </p>
                      <p className="text-[12px] text-[#7C8AA0] mt-1">
                        16:10 recommended
                      </p>
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/85 text-[#1a4b7c] text-[10px] font-bold uppercase tracking-[0.12em] border border-[#DCE3EE]">
                      Research Note {index + 1}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchFacility;
