import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  BulletList,
  ContentSection,
  DataTable,
  EventGrid,
  GalleryGrid,
  IntroSection,
  ProfileHighlight,
} from './studentLifeShared';
import { getStudentCareerSection } from '../../services/studentCareer';
import { resolveApiUrl } from '../../services/api';

const objectiveItems = [
  'Foster leadership, represent student interests, and enhance the sense of community.',
  'Promote physical fitness, sportsmanship, and teamwork among students.',
  'Cultivate social responsibility, volunteerism, and community service.',
  'Nourish literary and creative talents, enhance language skills, and encourage critical thinking.',
  "Promote cultural exchange, unity, and celebrate India's cultural diversity.",
  'These committees collectively contribute to the overall development of students, offering them opportunities for personal growth, community engagement, and cultural enrichment.',
];

const events = [
  {
    title: 'FE Orientation:',
    description:
      "A formal meet is arranged for the FE students where in the convoluted domains pertaining to academics by means of an elaborate overview of the engineering curriculum. An informal orientation is organized by Students' Council where the freshers are imparted with few tips and tricks to tackle both academics as well as extra-curricular. The students are informed about the various clubs and committees within the college and the events that they participate in and conduct. They are also made familiar with the nearby places of visit and acquainted with the basic rules and regulations of the college. A booklet is also provided to the students which includes the details about the college premises and other information.",
  },
  {
    title: "Fresher's Party:",
    description:
      "Fresher's Party' the first event for the first-year students is hosted by Students' Council at its apex grandeur and elaboration. The day is marked with pulsating enthusiasm, excitement, and anticipation among all the FE Students. Every year a theme is decided and title for Mr. and Ms. Freshers are announced too. Various games and activities are organized wherein the first-year students participate and enjoy to their fullest.",
  },
  {
    title: "Teacher's Day :",
    description:
      "5th September marks the Birth Anniversary of our former President and renowed teacher Dr. Sarwapalli Radhakrishnan. On this occasion Students' Council hosts Teacher's Day celebration keeping up with tradition of VCET, the teachers are welcomed with a rose and a card along with countless number of wishes. The celebration is scheduled in the evening and all the teaching and non-teaching staff are cordially invited for the same. The teachers enjoy the event and eventually engage into quirky and captivating fun games planned for them. The day ends in high spirits and appreciation from Teachers for Councils' efforts.",
  },
  {
    title: 'Garba Night :',
    description:
      'The auspicious festival of Navratri is celebrated by the staffs and students of VCET with great fever and enthusiasm. The event begins with worshipping of Goddess Durga by our Principal, after which the students and teachers dance to the upbeat and traditional Garba tunes played by the DJ. Students dress up beautifully and enjoy the beats with their synchronous and energetic Garba moves. There are prizes for energetic Garba moves and colourful costumes.',
  },
  {
    title: 'CL MEET :',
    description:
      'The Contingent Leaders (CL) Meet is a pre-event gathering conducted before the annual college cultural fest, Zeal. During this meet, contingent leaders from various colleges across Mumbai come together to foster collaboration and camaraderie. The primary aim of the CL Meet is to publicize Zeal, ensuring wide participation and generating excitement for the upcoming cultural fest. Additionally, it facilitates the exchange of ideas and participation strategies among the leaders, enhancing the overall experience of the fest. While the CL Meet happens around the cultural fest, its impact and objectives extend throughout the entire year, continually promoting engagement and involvement in Zeal.',
  },
  {
    title: 'Zeal :',
    description:
      "The Students' Council then begins preparing for the most anticipated cultural fest, that is ZEAL. When it comes to cultural uplifting, Zeal is certainly one of the highlights of our college. From brainstorming ideas to watching the live streams of ZEAL is an experience that every Students' Council member will never forget. All in all, the Students' Council takes immense pride and gratitude for achieving everything that is planned every year with great success and joy.",
  },
  {
    title: 'BE Farewell :',
    description:
      'With Zeal being on extravaganza of energy, enthusiasm, and electrifying aura to be in, the cherry on the cake for the Students Council is the BE Farewell. The BE Farewell witnesses an over enthusiastic crowd who with their presence make the atmosphere a heavenly space. The BEs dance and groove their hearts out to the electrifying beats of the DJ and enjoy to their fullest.',
  },
];

const gallery = [
  { src: '/images/student-life/cultural-committee/gallery-01.jpg', alt: 'Cultural Committee gallery image 1', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-02.jpg', alt: 'Cultural Committee gallery image 2', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-03.jpg', alt: 'Cultural Committee gallery image 3', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-04.jpg', alt: 'Cultural Committee gallery image 4', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-05.jpg', alt: 'Cultural Committee gallery image 5', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-06.jpg', alt: 'Cultural Committee gallery image 6', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-07.jpg', alt: 'Cultural Committee gallery image 7', placeholder: true },
  { src: '/images/student-life/cultural-committee/gallery-08.jpg', alt: 'Cultural Committee gallery image 8', placeholder: true },
];

const teamRows = [
  ['General Secretary', 'Mr. Jayesh Solminde', 'COMPS'],
  ['Treasurer', 'Mr. Rutwoj Acharya', 'IT'],
  ['Deputy General Secretary', 'Mr. Manav Nivate', 'MECH'],
  ['Cultural Secretary', 'Ms. Arya Sable', 'IT'],
  ['Joint Cultural Secretary', 'Ms. Tanvi Prabhudesai', 'COMPS'],
  ['Joint Cultural Secretary', 'Mr. Aditya Bawane', 'IT'],
  ['Joint Cultural Secretary', 'Ms. Shreya Wankhede', 'AIDS'],
  ['Joint Cultural Secretary', 'Mr. Kashyap Jethwa', 'COMPS'],
  ['Technical Head', 'Mr. Vishal Mane', 'COMPS'],
  ['Technical Head', 'Mr. Kartik Sangle', 'COMPS'],
  ['Technical Head', 'Mr. Aman Mishra', 'MECH'],
  ['Sponsorship Head', 'Mr. Saurabhsingh Pardeshi', 'AIDS'],
  ['Sponsorship Head', 'Mr. Akhilesh Patil', 'AIDS'],
  ['Creative Head', 'Mr. Pranav Rewale', 'COMPS'],
  ['Creative Head', 'Ms. Ishika Bhate', 'CIVIL'],
  ['Creative Head', 'Ms. Siddhi Chavan', 'IT'],
  ['Creative Head', 'Ms. Akansha Chaudhari', 'COMPS'],
  ['Creative Head', 'Mr. Tanmay Narayankar', 'COMPS'],
  ['Taskforce Head', 'Mr. Yogesh Dhangar', 'EXTC'],
  ['Taskforce Head', 'Mr. Sumit Mali', 'COMPS'],
  ['Taskforce Head', 'Mr. Anuj Newalkar', 'CIVIL'],
  ['Taskforce Head', 'Mr. Nihal Deshmukh', 'IT'],
  ['PR & Publicity Head', 'Mr. Hardik Sanap', 'CSE DS'],
  ['PR & Publicity Head', 'Mr. Ashirwad Kothavate', 'COMPS'],
  ['PR & Publicity Head', 'Mr. Gargi Betawadkar', 'COMPS'],
  ['Social Media Head', 'Mr. Prathamesh Pandey', 'COMPS'],
  ['Social Media Head', 'Ms. Arya Jadhav', 'CIVIL'],
  ['Social Media Head', 'Mr. Ankita Yadav', 'COMPS'],
];

const CulturalCommittee: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('cultural-committee')
      .then((res) => {
        if (mounted) setApiData(res);
      })
      .catch(() => {
        if (mounted) setApiData(null);
      })
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

    const apiEvents = Array.isArray(apiData?.events)
    ? apiData.events
      .map((event: Record<string, unknown>) => ({
        title: String(event.title ?? ''),
        description: String(event.desc ?? ''),
      }))
      .filter((event: { title: string; description: string }) => event.title || event.description)
    : [];
  const resolvedEvents = apiEvents.length > 0 ? apiEvents : events;

  const apiTeamRows = Array.isArray(apiData?.team)
    ? apiData.team
      .map((member: Record<string, unknown>) => [
        String(member.pos ?? ''),
        String(member.name ?? ''),
        String(member.dept ?? ''),
      ])
      .filter((row: string[]) => row[0] || row[1] || row[2])
    : [];
  const resolvedTeamRows = apiTeamRows.length > 0 ? apiTeamRows : teamRows;
  const teamYear = typeof apiData?.teamYear === 'string' && apiData.teamYear.trim() ? apiData.teamYear : '2025-26';

  const apiGallery = Array.isArray(apiData?.gallery)
    ? apiData.gallery
      .map((item: Record<string, unknown>, index: number) => {
        const raw = String(item.img ?? item.imageUrl ?? item.image ?? '');
        const src = resolveApiUrl(raw) || raw;
        if (!src) return null;
        return {
          src,
          alt: `Cultural Committee gallery image ${index + 1}`,
        };
      })
      .filter((item): item is { src: string; alt: string } => !!item)
    : [];
  const resolvedGallery = apiGallery.length > 0 ? apiGallery : gallery;

  const bos = Array.isArray(apiData?.bos) && apiData.bos.length > 0 ? apiData.bos[0] : null;
  const bosName = String(bos?.name ?? 'Rishabh Tripathi');
  const bosDept = String(bos?.dept ?? 'Computer Engineering Department');
  const bosBatch = String(bos?.batch ?? '2023 - 2024');
  const bosImgRaw = String(bos?.img ?? '');
  const bosImg = resolveApiUrl(bosImgRaw) || bosImgRaw || '/images/student-life/cultural-committee/best-outgoing-student.png';

  const instagramUrl = String(apiData?.hInsta || 'https://www.instagram.com/vcetstudentscouncil?igsh=MTVjamlqaWNrbnIzbg==');
  const videoUrl = String(resolveApiUrl(apiData?.hVid) || apiData?.hVid || 'https://youtu.be/-O0TexTnwJ8?si=3oPGI5pT0jiduJ6P');

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="Cultural Committee" breadcrumbs={[{ label: 'Cultural Committee' }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="Cultural Committee" breadcrumbs={[{ label: 'Cultural Committee' }]} />

      <IntroSection
        id="intro"
        title="Cultural Committee"
        image="/images/student-life/cultural-committee/hero.jpeg"
        imageAlt="Cultural Committee"
        hideImage
        imagePlaceholderLabel="Cultural Committee Hero Image"
        chips={[
          { label: 'Objectives', href: '#objectives' },
          { label: 'Events', href: '#events' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Team', href: '#team' },
        ]}
        imageFit="contain"
        links={[
          {
            label: "Students' Council Instagram",
            href: instagramUrl,
            icon: 'instagram',
          },
          {
            label: 'Watch Highlight Video',
            href: videoUrl,
            icon: 'video',
          },
        ]}
        aside={
          <div className="rounded-2xl border border-brand-gold/20 bg-brand-light p-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
              Best Outgoing Student
            </p>
            <p className="text-lg font-display font-bold text-brand-navy">{bosName}</p>
            <p className="mt-2 text-sm text-slate-500">{bosDept}</p>
            <p className="text-sm text-slate-500">Batch : {bosBatch}</p>
          </div>
        }
      />

      <ContentSection
        id="objectives"
        title="Objectives"
        subtitle="Objectives of Extracurricular Activities Committees."
        backgroundClassName="bg-brand-light"
      >
        <BulletList items={objectiveItems} />
      </ContentSection>

      <ContentSection
        title="Best Outgoing Student"
        subtitle="Source highlight published on the official VCET Cultural Committee page."
        backgroundClassName="bg-white"
      >
        <ProfileHighlight
          title="Best Outgoing Student"
          image={bosImg}
          imageAlt="Best Outgoing Student"
          hideImage
          imagePlaceholderLabel="Best Outgoing Student Image"
          heading={bosName}
          lines={[bosDept, `Batch : ${bosBatch}`]}
          actions={[
            {
              label: 'Watch Highlight Video',
              href: videoUrl,
              icon: 'video',
            },
          ]}
        />
      </ContentSection>

      <ContentSection
        id="events"
        title="Events"
        subtitle="Published activities and celebrations featured on the official Cultural Committee page."
        backgroundClassName="bg-brand-light"
      >
        <EventGrid items={resolvedEvents} />
      </ContentSection>

      <ContentSection
        id="gallery"
        title="Gallery"
        subtitle="Official VCET Cultural Committee gallery images."
        backgroundClassName="bg-white"
      >
        <GalleryGrid items={resolvedGallery} />
      </ContentSection>

      <ContentSection
        id="team"
        title="Team"
        subtitle={`B.E. Students Council Core Committee (A.Y. ${teamYear}) :`}
        backgroundClassName="bg-brand-light"
      >
        <DataTable columns={['Position', 'Name', 'Department']} rows={resolvedTeamRows} />
      </ContentSection>
    </PageLayout>
  );
};

export default CulturalCommittee;
