import React, { useEffect, useMemo, useState } from 'react';
import { Quote } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getAboutSection } from '../../services/about';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface PresidentData {
  intro?: {
    name?: string;
    role?: string;
    highlightQuote?: string;
    closingQuote?: string;
    image?: string | null;
  };
  messageParagraphs?: string[];
}

const PresidentsDesk: React.FC = () => {
  const [data, setData] = useState<PresidentData | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAboutSection<PresidentData>('president-desk')
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const intro = data?.intro ?? {};
  const paragraphs = useMemo(() => {
    if (Array.isArray(data?.messageParagraphs) && data!.messageParagraphs!.length > 0) {
      return data!.messageParagraphs!;
    }
    return [
      "Vidyavardhini's College of Engineering and Technology is located in Vasai, just a short distance from Vasai Railway Station. Affiliated to the University of Mumbai, the college offers Bachelor's degree programmes in Engineering, combining strong academics with a vibrant campus culture.",
      'Our experienced and well-qualified faculty are always supportive, and our well-equipped laboratories ensure students gain hands-on practical knowledge. The college actively encourages participation in extracurricular and co-curricular activities through various student committees, helping every student develop holistically.',
      "Our Placement and Training Cell prepares students for the professional world through rigorous training and connects them with leading IT and core engineering companies. Alumni of VCET have secured positions at organisations such as TCS, Infosys, and Byju's, and continue to credit the institution for their growth and success.",
    ];
  }, [data]);

  const name = intro.name || 'Mr. Vikas Vartak';
  const role = intro.role || 'President, Vidyavardhini Education Society';
  const highlightQuote = intro.highlightQuote || 'The main aim of the college is to help students grow in all aspects of life.';
  const closingQuote = intro.closingQuote || "Vidyavardhini's College of Engineering and Technology is an excellent choice for your career and growth. We remain committed to shaping the engineers and leaders of tomorrow.";
  const profileImage = resolveUploadedAssetUrl(intro.image ?? null) || '/images/About Us/President_s Desk/Mr._Vikas_Vartak.jpg';

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="President's Desk" breadcrumbs={[{ label: "President's Desk" }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="President's Desk" breadcrumbs={[{ label: "President's Desk" }]} />

      <section className="relative py-8 md:py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="reveal flex items-center gap-3 mb-6 md:mb-10">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Message from the President</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">
              <div className="reveal w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-28">
                  <div className="rounded-3xl p-[2.5px] bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 shadow-[0_0_40px_6px_rgba(253,184,19,0.4)]">
                    <div className="bg-white rounded-[22px] overflow-hidden">
                      <div className="relative w-full overflow-hidden bg-brand-light" style={{ height: '280px' }}>
                        <img src={profileImage} alt={`${name} – ${role}`} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="px-5 py-4 bg-gradient-to-b from-white to-amber-50/40">
                        <div className="text-center mb-3">
                          <h3 className="text-xl font-display font-extrabold text-brand-navy leading-tight">{name}</h3>
                          <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400 px-4 py-1.5 rounded-full shadow-md shadow-brand-gold/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/60" />
                            <span className="text-[11px] font-black text-brand-navy uppercase tracking-[0.22em]">President</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold text-center mb-3 leading-snug">{role}</p>
                      </div>
                      <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="reveal relative bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-6 overflow-hidden shadow-lg mb-8">
                  <Quote className="w-6 h-6 text-brand-gold mb-3" />
                  <p className="text-lg md:text-xl font-display font-semibold text-white leading-relaxed">{highlightQuote}</p>
                </div>

                <div className="reveal space-y-4 text-slate-700 leading-[1.85] text-[15px]">
                  {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>

                <div className="reveal mt-8">
                  <div className="bg-brand-light border border-brand-gold/20 rounded-2xl px-7 py-5 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-brand-gold to-brand-blue" />
                    <p className="text-slate-700 leading-[1.85] text-[15px] italic">"{closingQuote}"</p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-0.5 bg-brand-gold" />
                      <div>
                        <p className="font-display font-bold text-brand-navy text-sm">{name}</p>
                        <p className="text-xs text-brand-gold font-semibold">{role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PresidentsDesk;
