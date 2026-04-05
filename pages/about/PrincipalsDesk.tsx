import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Quote, GraduationCap, Briefcase, Users, Star } from 'lucide-react';
import { getAboutSection } from '../../services/about';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface PrincipalData {
  intro?: {
    name?: string;
    role?: string;
    highlightQuote?: string;
    closingQuote?: string;
    image?: string | null;
  };
  messageParagraphs?: string[];
  profileDetails?: { qualification?: string; experience?: string; affiliation?: string }[];
  highlightsCards?: { value?: string; label?: string }[];
}

const icons = [GraduationCap, Briefcase, Users, Star];

const PrincipalsDesk: React.FC = () => {
  const [data, setData] = useState<PrincipalData | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAboutSection<PrincipalData>('principal-desk')
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
  const name = intro.name || 'Dr. Rakesh Himte';
  const role = intro.role || 'Principal';
  const highlightQuote = intro.highlightQuote || "Our cherished motto is the 'overall empowerment of students' for their all-round development.";
  const closingQuote = intro.closingQuote || 'I appeal to all of you one more time — give your best and make VCET one of the finest learning centres among its peers.';
  const profileImage = resolveUploadedAssetUrl(intro.image ?? null) || '/images/About Us/Principal_sDesk/Dr.Rakesh-Himte.jpg';

  const messageParagraphs = useMemo(() => {
    if (Array.isArray(data?.messageParagraphs) && data.messageParagraphs.length) {
      return data.messageParagraphs;
    }
    return [
      "As a proud VCETite, our cherished motto is the 'overall empowerment of students' for their all-round development. Today, education means much more than merely acquiring knowledge.",
      'On the academic front, we maintained our reputation and renewed our commitment to consistency in the years ahead. The campus ambience and infrastructure have steadily improved.',
      "We responded to community service appeals through UDAAN and outreach efforts, helping students understand social responsibilities and active citizenship.",
      'On the placement front, the Training and Placement Committee set a high placement record this year. The collective effort of management, staff, and students has been the backbone of this success.',
    ];
  }, [data]);

  const details = data?.profileDetails?.length ? data.profileDetails[0] : undefined;
  const highlights = (data?.highlightsCards?.length ? data.highlightsCards : [
    { value: 'Ph.D.', label: 'Doctorate Holder' },
    { value: '20+', label: 'Years of Experience' },
    { value: '3000+', label: 'Students Guided' },
    { value: 'NAAC B++', label: 'Accredited Institution' },
  ]).slice(0, 4);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="Principal's Desk" breadcrumbs={[{ label: "Principal's Desk" }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="Principal's Desk" breadcrumbs={[{ label: "Principal's Desk" }]} />

      <section className="relative py-8 md:py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="reveal flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Message from the Principal</span>
            </div>

            <div className="reveal flex flex-col lg:block">
              <div className="w-full sm:w-72 lg:float-left lg:mr-8 mb-6 flex-shrink-0 mx-auto">
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
                          <span className="text-[11px] font-black text-brand-navy uppercase tracking-[0.22em]">Principal</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold text-center mb-3 leading-snug">{details?.affiliation || "Vidyavardhini's College of Engineering & Technology, Vasai"}</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-white border border-brand-gold/25 rounded-xl p-3 shadow-sm">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Qualification</p>
                          <p className="text-base font-extrabold text-brand-navy">{details?.qualification || 'Ph.D.'}</p>
                        </div>
                        <div className="bg-white border border-brand-gold/25 rounded-xl p-3 shadow-sm">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Experience</p>
                          <p className="text-base font-extrabold text-brand-navy">{details?.experience || '20+ Yrs'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-6 overflow-hidden shadow-lg mb-6">
                <Quote className="w-6 h-6 text-brand-gold mb-3" />
                <p className="text-lg md:text-xl font-display font-semibold text-white leading-relaxed">{highlightQuote}</p>
              </div>

              <div className="space-y-4 text-slate-700 leading-[1.85] text-[15px]">
                {messageParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>

              <div className="clear-both mt-6">
                <div className="bg-brand-light border border-brand-gold/20 rounded-2xl px-7 py-5 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-brand-gold to-brand-blue" />
                  <p className="text-slate-700 leading-[1.85] text-[15px] italic">"{closingQuote}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-navy">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {highlights.map((h, i) => {
                const Icon = icons[i] ?? Star;
                return (
                  <div key={`${h.label}-${i}`} className="reveal flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center mb-3 ring-1 ring-white/10">
                      <Icon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <p className="text-white font-display font-bold text-2xl">{h.value}</p>
                    <p className="text-white/60 text-sm mt-1 tracking-wide">{h.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrincipalsDesk;
