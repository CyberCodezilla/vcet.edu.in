import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../components/Button';
import MMSLayout from '../../components/mms/MMSLayout';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { mmsHomeContent } from './mmsHomeContent';
import { get, resolveApiUrl } from '../../services/api';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const sectionTitleClass = 'text-2xl md:text-3xl font-display font-bold text-brand-blue';
const sectionKickerClass = 'text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold';

export default function MMSHome() {
  const [activeHero, setActiveHero] = useState(0);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    get<any>('/pages/mms-home')
      .then((res) => {
        if (res?.data) setData(res.data);
      })
      .catch((e) => console.error('Failed to fetch mms home page data:', e));
  }, []);

const toArray = (obj: any): any[] => {
    if (!obj) return [];
    if (Array.isArray(obj)) return obj;
    if (typeof obj === 'object') return Object.values(obj);
    return [];
  };

  const slidersList = toArray(data?.sliders);
  const heroImages = slidersList.some((s:any)=> s.title || s.subtitle || s.image || s.desktopImage || s.mobileImage)
    ? slidersList.filter((s:any)=> s.title || s.subtitle || s.image || s.desktopImage || s.mobileImage).map((s:any, i:number) => ({
      id: `hero-${i}`,
      title: s.title || '',
      subtitle: s.subtitle || '',
      imageUrl: resolveApiUrl(s.desktopImage || s.image || s.mobileImage) || '' 
    }))
    : mmsHomeContent.heroSlides;

  const getFallback = (id: string) => mmsHomeContent.sections.find((s) => s.id === id);

  const admissionSection = {
    id: 'admission',
    title: 'Admission',
    items: [{
       heading: data?.admission?.heading || (getFallback('admission') as any)?.items?.[0]?.heading || 'Admission Highlight',
       body: data?.admission?.description || (getFallback('admission') as any)?.items?.[0]?.body || 'Explore admission details.',
       ctaText: 'Apply Now',
       ctaPath: '/mms/admission',
       imageUrl: resolveApiUrl(data?.admission?.banner) || (getFallback('admission') as any)?.items?.[0]?.imageUrl || ''
    }]
  };

  const internshipsList = toArray(data?.internships);
  const internshipsSection = internshipsList.some((i:any)=> i.logo || i.title)
    ? { id: 'internships', title: "Summer Internship's", items: internshipsList.filter((i:any)=> i.logo || i.title).map((i:any, idx:number) => ({ id: String(idx), imageUrl: resolveApiUrl(i.logo), alt: i.altText || i.title })) }
    : getFallback('internships');

  const eventsList = toArray(data?.events);
  const eventsSection = eventsList.some((e:any)=> e.image || e.title)
    ? { id: 'events', title: 'Our Events', items: eventsList.filter((e:any)=> e.image || e.title).map((e:any, idx:number) => ({ id: String(idx), imageUrl: resolveApiUrl(e.image), title: e.title || e.eventTitle || '' })) }
    : getFallback('events');

  const testimonialsList = toArray(data?.testimonials);
  const testimonialSection = testimonialsList.some((t:any)=> t.name || t.quote)
    ? { id: 'testimonials', title: testimonialsList[0]?.sectionTitle || 'What Our Learners Say', items: testimonialsList.filter((t:any)=> t.name || t.quote).map((t:any, idx:number) => ({ id: String(idx), name: t.name, role: t.role, quote: t.quote })) }
    : getFallback('testimonials');

  const videosList = toArray(data?.videos);
  const videosSection = videosList.some((v:any)=> v.videoUrl || v.videoFile)
    ? { id: 'experiential-videos', title: videosList[0]?.sectionTitle || 'Experiential Learning Videos', items: videosList.filter((v:any)=> v.videoUrl || v.videoFile).map((v:any, idx:number) => ({ id: String(idx), title: v.videoTitle, videoUrl: v.videoUrl, fileUrl: resolveApiUrl(v.videoFile), poster: resolveApiUrl(v.poster) || '' })) }
    : getFallback('experiential-videos');

  const documentsList = toArray(data?.documents);
  const docsSection = documentsList.some((d:any)=> d.url || d.pdfFile)
    ? { id: 'pdf-docs', title: 'Documents', items: documentsList.filter((d:any)=> d.url || d.pdfFile).map((d:any, idx:number) => ({ id: String(idx), label: d.label || d.pdfFile?.name || 'Document', url: resolveApiUrl(d.pdfFile) || d.url })) }
    : getFallback('pdf-docs');

  const noticesList = toArray(data?.notices);
  const noticesData = noticesList.some((n:any)=> n.label || n.text)
    ? { title: 'Notices', items: noticesList.filter((n:any)=> n.label || n.text).map((n:any, idx:number) => ({ id: String(idx), label: n.label || '', content: n.text || '' })) }
    : mmsHomeContent.notices;

  const notificationsList = toArray(data?.notifications);
  const notificationsData = notificationsList.some((n:any)=> n.title || n.text)
    ? { title: 'Latest Notifications', items: notificationsList.filter((n:any)=> n.title || n.text).map((n:any, idx:number) => ({ id: String(idx), title: n.title || n.text || '' })) }
    : mmsHomeContent.latestNotifications;

  const activeHeroSlide = useMemo(() => heroImages[activeHero] || { title: '', subtitle: '', imageUrl: '' }, [activeHero, heroImages]);

  useEffect(() => {
    if (!heroImages || heroImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  const previousHero = () => {
    setActiveHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextHero = () => {
    setActiveHero((prev) => (prev + 1) % heroImages.length);
  };

  const Holder = ({ label }: { label: string }) => (
    <div className="flex h-full min-h-[150px] w-full items-center justify-center rounded-lg border-2 border-dashed border-brand-blue/20 bg-brand-light/40 px-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue/70">
      {label}
    </div>
  );

  const getVideoSource = (video: Record<string, unknown>): string => {
    const candidates = [video.videoUrl, video.videoFileUrl, video.fileUrl, video.url];
    for (const candidate of candidates) {
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate.trim();
      }
    }
    return '';
  };

  return (
    <MMSLayout>
      <div className="space-y-12 md:space-y-16">
        <section className="animate-fade-in-up space-y-4">
          <div className="rounded-2xl border border-brand-blue/15 bg-gradient-to-r from-brand-dark to-brand-blue px-5 py-5 shadow-[0_24px_60px_-36px_rgba(13,45,86,0.55)] sm:px-8 sm:py-7">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">
              Vidyavardhini&apos;s College Of Engineering & Technology
            </p>
            <h1 className="max-w-3xl text-3xl font-display font-bold leading-tight text-white sm:text-5xl">
              {activeHeroSlide.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
              {activeHeroSlide.subtitle}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-blue/15 bg-white shadow-[0_20px_45px_-30px_rgba(13,45,86,0.45)]">
            {activeHeroSlide.imageUrl ? (
              <img
                src={resolveUploadedAssetUrl(activeHeroSlide.imageUrl) ?? activeHeroSlide.imageUrl}
                alt="MMS campus hero"
                className="block h-auto w-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Holder label="MMS Hero Banner" />
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-blue/10 bg-white px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveHero(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${index === activeHero ? 'bg-brand-gold' : 'bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Go to hero image ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousHero}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-brand-blue transition hover:border-brand-blue hover:bg-brand-light"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextHero}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-brand-blue transition hover:border-brand-blue hover:bg-brand-light"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="animate-fade-in-up grid gap-6 rounded-2xl border border-brand-blue/10 bg-gradient-to-r from-brand-blue to-brand-dark p-5 md:grid-cols-2 md:p-8" style={{ animationDelay: '0.1s' }}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">Admission</p>
            <h2 className="mt-2 text-2xl font-display font-bold text-white sm:text-3xl">{admissionSection?.items?.[0]?.heading || 'Admissions Open For MMS'}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
              {admissionSection?.items?.[0]?.body || 'Start your management journey with VCET MMS and build future-ready skills.'}
            </p>
            <Button
              className="mt-5"
              onClick={() => {
                window.location.href = (admissionSection?.items?.[0]?.ctaPath as string) || '/mms/admission';
              }}
              variant="gold"
            >
              {(admissionSection?.items?.[0]?.ctaText as string) || 'Apply Now'}
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/25 bg-white/5">
            {(admissionSection?.items?.[0]?.imageUrl as string) ? (
              <img
                src={resolveUploadedAssetUrl(admissionSection?.items?.[0]?.imageUrl as string) ?? (admissionSection?.items?.[0]?.imageUrl as string)}
                alt="MMS Admission Banner"
                className="block h-auto w-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Holder label="Admission Banner" />
            )}
          </div>
        </section>

        <section className="animate-fade-in-up grid gap-4 lg:grid-cols-2" style={{ animationDelay: '0.15s' }}>
            <article className="rounded-xl border border-brand-blue/10 bg-white p-5 shadow-sm flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">Notice Board</p>
              <h3 className="mt-1 text-xl font-semibold text-brand-blue">{noticesData.title}</h3>
              <div className="mt-4 space-y-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar flex-1">
                {noticesData.items.map((notice, idx) => (
                  <div key={notice.id || idx} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-gold">{notice.label}</p>
                    <p className="text-sm text-slate-700">{notice.content}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-brand-blue/10 bg-white p-5 shadow-sm flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">Updates</p>
              <h3 className="mt-1 text-xl font-semibold text-brand-blue">{notificationsData.title}</h3>
              <ul className="mt-4 space-y-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar flex-1">
                {notificationsData.items.map((notification, idx) => (
                  <li key={notification.id || idx} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {notification.title}
                  </li>
                ))}
              </ul>
            </article>
          </section>

        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="mb-6">
            <p className={sectionKickerClass}>Industry Connect</p>
            <h2 className={sectionTitleClass}>{internshipsSection?.title || "Summer Internship's"}</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {internshipsSection?.items.map((item, index) => (
              <article
                key={(item.id as string) || index}
                className="group flex min-h-[150px] items-center justify-center rounded-xl border border-brand-blue/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-md"
              >
                {(item.imageUrl as string) ? (
                  <img
                    src={resolveUploadedAssetUrl(item.imageUrl as string) ?? (item.imageUrl as string)}
                    alt={`Internship logo ${index + 1}`}
                    className="max-h-20 w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Holder label={`Image Holder ${index + 1}`} />
                )}
              </article>
            )) || null}
          </div>
        </section>

        <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <div className="mb-6">
            <p className={sectionKickerClass}>Campus Engagement</p>
            <h2 className={sectionTitleClass}>{eventsSection?.title || 'Our Events'}</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {eventsSection?.items.map((item, index) => (
              <article
                key={(item.id as string) || index}
                className="overflow-hidden rounded-xl border border-brand-blue/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {(item.imageUrl as string) ? (
                  <img
                    src={resolveUploadedAssetUrl(item.imageUrl as string) ?? (item.imageUrl as string)}
                    alt={`MMS event ${index + 1}`}
                    className="block h-auto w-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Holder label={`Event Holder ${index + 1}`} />
                )}
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-gold">Event Highlight</p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-blue">{(item.title as string) || `MMS Event Showcase ${index + 1}`}</h3>
                </div>
              </article>
            )) || null}
          </div>
        </section>

        <section className="animate-fade-in-up rounded-2xl border border-brand-blue/10 bg-white p-5 md:p-8" style={{ animationDelay: '0.3s' }}>
          <div className="mb-6">
            <p className={sectionKickerClass}>Testimonials</p>
            <h2 className={sectionTitleClass}>{testimonialSection?.title || 'What Our Learners Say'}</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {testimonialSection?.items.map((item) => (
              <article key={(item.id as string) || (item.name as string)} className="rounded-xl border border-brand-blue/10 bg-brand-light/30 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex items-center gap-1 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{item.quote as string}</p>
                <p className="mt-4 text-sm font-bold text-brand-blue">{item.name as string}</p>
                <p className="text-xs uppercase tracking-[0.13em] text-slate-500">{item.role as string}</p>
              </article>
            )) || null}
          </div>
        </section>

        <section className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <div className="mb-6">
            <p className={sectionKickerClass}>Applied Learning</p>
            <h2 className={sectionTitleClass}>{videosSection?.title || 'Experiential Learning Videos'}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {videosSection?.items.map((video) => (
              <article key={(video.id as string) || (video.title as string)} className="overflow-hidden rounded-xl border border-brand-blue/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                {(() => {
                  const source = getVideoSource(video as Record<string, unknown>);
                  const poster = (video.poster as string) || '';

                  if (source) {
                      const isYouTube = source.includes('youtube.com') || source.includes('youtu.be');
                      if (isYouTube) {
                        const videoId = source.split('v=')[1]?.split('&')[0] || source.split('/').pop()?.split('?')[0];
                        return (
                          <iframe
                            className="block w-full aspect-video bg-black"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.title as string || 'Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        );
                      }

                      return (
                        <video
                          controls
                          preload="metadata"
                          className="block w-full aspect-video bg-black object-cover"
                        poster={poster || undefined}
                        playsInline
                      >
                        <source src={resolveUploadedAssetUrl(source) ?? source} />
                        Your browser does not support the video tag.
                      </video>
                    );
                  }

                  if (poster) {
                    return (
                      <img
                        src={resolveUploadedAssetUrl(poster) ?? poster}
                        alt={video.title as string}
                        className="block h-auto w-full"
                        referrerPolicy="no-referrer"
                      />
                    );
                  }

                  return <Holder label="Video Holder" />;
                })()}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-brand-blue">{video.title as string}</h3>
                  <p className="mt-1 text-xs text-slate-500">Video source can be attached from backend using URL or uploaded file path.</p>
                </div>
              </article>
            )) || null}
          </div>
        </section>

        <section className="animate-fade-in-up rounded-2xl border border-brand-blue/10 bg-white p-5 md:p-7" style={{ animationDelay: '0.4s' }}>
          <div className="mb-5">
            <p className={sectionKickerClass}>Resources</p>
            <h2 className={sectionTitleClass}>{docsSection?.title || 'PDF / Documents'}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {docsSection?.items.map((doc) => (
              <a
                key={doc.id as string}
                href={doc.url as string}
                className="rounded-lg border border-brand-blue/15 bg-slate-50 px-4 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-light"
                target="_blank"
                rel="noreferrer"
              >
                {doc.label as string}
              </a>
            )) || null}
          </div>
        </section>
      </div>
    </MMSLayout>
  );
}
