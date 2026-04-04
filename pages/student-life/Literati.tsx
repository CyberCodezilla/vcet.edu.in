import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  ContentSection,
  DataTable,
  EventGrid,
  GalleryGrid,
  IntroSection,
  ProfileHighlight,
  ResourceGrid,
} from './studentLifeShared';

const events = [
  {
    title: "Inauguration Of 'VISTA' :",
    description:
      'We start our year with publishing our annual college magazine VISTA which is inaugurated by our Principal. VISTA is our annual college magazine, which consists of articles, letters, poems written by our very own college students which motivate our young talent. The magazine is inaugurated by our Principal, followed by a small competition for the students to kick start their year. These magazines are then distributed to the entire college.',
  },
  {
    title: 'VCET Podcast Powered By LITERATI :',
    description:
      'VCET Podcast powered by Literati is the latest venture by the team of Literati 2019. Famous personalities from different walks of life are invited to share their life experience which are inspiring and informative. Sharing their advice and life lessons and entertaining us with their fun life experiences, we invite over 12 guests.',
  },
  {
    title: 'Unscripted - Extempore :',
    description:
      'Extempore is a speech competition where the topics are given on the spot so the students have to give their best in a limited period of time. This event never fails to leave the audience speechless as they witness the great speakers unleash themselves to bring out the artist in them. This event brings out some of the most creative people from the students of VCET.',
  },
  {
    title: 'Marathi and Hindi Kavi Sammelan :',
    description:
      'Marathi and Hindi Kavi Sammelan are two poetry recitation competition which are hosted consecutively. These competitions motivate our young and skilled poets to express their self written or other famous poems on stage. This helps them in facing the crowd and builds their confidence. The competition brings out some of the finest poets in the college and their creations are music to ears.',
  },
  {
    title: 'Faceoff :',
    description:
      'The college hosts an interdepartmental debate competition, elevating the debate discourse to new heights and marking a proud achievement for the institution. Teams from all departments compete, with representatives chosen based on their abilities by departmental judges from the winners of internal debates. This event promises to be grand and captivating, showcasing the best of collegiate debate talent.',
  },
  {
    title: 'Faceoff - Intercollegiate :',
    description:
      'Taking the debate to another level, an intercollegiate debate competition is held which is a proud success for the college. Debate enthusiasts from over 10 colleges participate. The team represented by our very own college are selected based on their abilities by the judges of departmental debate competition from the winners of the debate. This event is truly grand and worth watching.',
  },
  {
    title: 'Lit Fest :',
    description:
      'Lit Fest is an one week literature festival. The event consist of many subevents namely : Writing Prompt, Literature Quiz, Dialogue writing, Look into the book & Choose your anime. Students actively take part through online submissions. The committee keeps on adding new competition and games every year to make it more fascinating. All the events Organized in the Lit fest clearly depicts the importance of literature. The fest is worth adoring and is a remarkable one',
  },
  {
    title: 'Marathi Bhasha Diwas :',
    description:
      'This propitious event is organized for the teaching as well as non teaching staff of VCET to celebrate the glory of our beautiful Maharashtrian culture. The inter-departmental teams vigorously show their competitive spirits to win the various competition in marathi language like extempore, guess the marathi word for the given english word and many such fun games. Best dressed departmental competition is also held on this day. It is always a memorable event for both staff as well as students working in the committee.',
  },
  {
    title: 'Seminar :',
    description:
      "The Literati Club at VCET hosted the captivating seminar at the Academic Year in seminar hall, drawing literature enthusiasts, academics, and students for a dynamic exchange. Featuring renowned speakers covering diverse literary topics and fostering interactive sessions, the event provided a platform for learning, networking, and showcasing emerging talents. Attendees left with renewed enthusiasm for literature, highlighting the seminar's success in fostering intellectual discourse and community engagement, celebrating the profound impact of literature and ideas.",
  },
];

const gallery = [
  { src: '/images/student-life/literati/gallery-01.jpg', alt: 'Literati gallery image 1',  placeholder: true },
  { src: '/images/student-life/literati/gallery-02.jpg', alt: 'Literati gallery image 2',  placeholder: true },
  { src: '/images/student-life/literati/gallery-03.jpg', alt: 'Literati gallery image 3',  placeholder: true },
  { src: '/images/student-life/literati/gallery-04.jpg', alt: 'Literati gallery image 4',  placeholder: true },
  { src: '/images/student-life/literati/gallery-05.jpg', alt: 'Literati gallery image 5',  placeholder: true },
  { src: '/images/student-life/literati/gallery-06.jpg', alt: 'Literati gallery image 6',  placeholder: true },
  { src: '/images/student-life/literati/gallery-07.jpg', alt: 'Literati gallery image 7',  placeholder: true },
  { src: '/images/student-life/literati/gallery-08.jpg', alt: 'Literati gallery image 8',  placeholder: true },
  { src: '/images/student-life/literati/gallery-09.jpg', alt: 'Literati gallery image 9',  placeholder: true },
];

const teamRows = [
  ['Chairperson',       'Adithya Jayakumar'],
  ['Co - Chairperson',  'Siddharth Chakravarty\nPreeti Prajapati'],
  ['Treasurer',         'Krithik Pandey'],
  ['Secretary',         'Rutuja Pednekar'],
  ['Organising Head',   'Raj Mor\nJay Patil'],
  ['Admin Head',        'Sumit Mali\nTushar Rathod'],
  ['Editorial Head',    'Rutuja Gadhave\nWajiha Kulsum\nJyoti Dhangada'],
  ['Media Head',        'Meenakshi Kshirsagar\nShardul Brid'],
  ['Visual Media Head', 'Meet Mistry\nPranali Rane\nAbhishek Mishra'],
  ['Sponsorship Head',  'Ganesh Joshi'],
];

const magazineLinks = [
  {
    title: 'VISTA 2024',
    href: 'https://vcet.edu.in/wp-content/uploads/2025/02/VISTA24-PratibimbLow-Quality.pdf',
    description: 'Official magazine link published on the Literati page.',
    icon: 'file' as const,
  },
  {
    title: 'VISTA 2023',
    href: "http://vcet.edu.in/VISTA/Vista'23_Ekam(final).pdf",
    description: 'Official magazine link published on the Literati page.',
    icon: 'file' as const,
  },
  {
    title: 'VISTA 2022',
    href: "https://vcet.edu.in/VISTA/VISTA'22_Atraaf.pdf",
    description: 'Official magazine link published on the Literati page.',
    icon: 'file' as const,
  },
  {
    title: 'VISTA 2021',
    href: 'https://vcet.edu.in/wp-content/uploads/2022/02/Vista21-Allagi.pdf',
    description: 'Official magazine link published on the Literati page.',
    icon: 'file' as const,
  },
  {
    title: 'VISTA 2020',
    href: 'https://vcet.edu.in/wp-content/uploads/2022/02/VISTA-2020.pdf',
    description: 'Official magazine link published on the Literati page.',
    icon: 'file' as const,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Literati: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Literati"
        breadcrumbs={[{ label: 'Literati' }]}
      />

      <IntroSection
        id="intro"
        title="Literati"
        description="The magazine committee was remoulded and renamed and took its form as the LITERATI - THE LITERARY CLUB. The sole responsibility of this committee is to spread the light of knowledge about literature, art and display the outstanding work of our creative-minded vcetians through our annual college magazine 'VISTA'. We begin each year by welcoming new talented members for our committee who put their heart and enthusiasm into making the year an insightful one."
        image="/images/student-life/literati/hero.jpg"
        imageAlt="Literati"
        hideImage
        imagePlaceholderLabel="Literati Hero Image"
        chips={[
          { label: 'Objectives', href: '#objectives' },
          { label: 'Events',     href: '#events'     },
          { label: 'Gallery',    href: '#gallery'    },
          { label: 'Team',       href: '#team'       },
          { label: 'Magazine',   href: '#magazine'   },
        ]}
        links={[
          {
            label: 'Literati Instagram',
            href: 'https://www.instagram.com/literativcet?igsh=Ym9sZzU1NjI3eGZ4',
            icon: 'instagram',
          },
        ]}
      />

      <ContentSection
        id="objectives"
        title="Objectives"
        subtitle="Official objective published on the Literati page."
        backgroundClassName="bg-brand-light"
      >
        <div className="reveal rounded-4xl border border-brand-blue/10 bg-white p-8 md:p-10 shadow-sm">
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            The magazine committee was remoulded and renamed and took its form as the LITERATI - THE
            LITERARY CLUB. The sole responsibility of this committee is to spread the light of
            knowledge about literature, art and display the outstanding work of our creative-minded
            vcetians through our annual college magazine 'VISTA'. We begin each year by welcoming
            new talented members for our committee who put their heart and enthusiasm into making
            the year an insightful one.
          </p>
        </div>
      </ContentSection>

      <ContentSection
        id="events"
        title="Events"
        subtitle="Official Literati events and activities from the VCET website."
        backgroundClassName="bg-white"
      >
        <EventGrid items={events} />
      </ContentSection>

      <ContentSection
        id="gallery"
        title="Gallery"
        subtitle="Official VCET Literati gallery images."
        backgroundClassName="bg-brand-light"
      >
        <GalleryGrid items={gallery} />
      </ContentSection>

      <ContentSection
        id="team"
        title="Team"
        subtitle="Staff Incharge :"
        backgroundClassName="bg-white"
      >
        <div className="space-y-8">
          <ProfileHighlight
            title="Staff Incharge :"
            image="/images/student-life/literati/staff-incharge.jpg"
            imageAlt="Dr. Swati Varma"
            hideImage
            imagePlaceholderLabel="Staff Incharge Image"
            heading="Dr. Swati Varma"
            lines={['Computer Engineering', 'swati.saigaonkar@vcet.edu.in']}
          />
          <div>
            <div className="mb-6 reveal">
              <h3 className="text-2xl font-display font-bold text-brand-navy">
                Student Committee 2025-26 :
              </h3>
            </div>
            <DataTable columns={['Position', 'Name']} rows={teamRows} />
          </div>
        </div>
      </ContentSection>

      <ContentSection
        id="magazine"
        title="Magazine"
        subtitle="Vista Magazine :"
        backgroundClassName="bg-brand-light"
      >
        <ResourceGrid items={magazineLinks} />
      </ContentSection>
    </PageLayout>
  );
};

export default Literati;