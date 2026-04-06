import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  ContentSection,
  DataTable,
  EventGrid,
  GalleryGrid,
} from './studentLifeShared';
import { Mail, Phone } from 'lucide-react';
import { getStudentCareerSection } from '../../services/studentCareer';
import { resolveApiUrl } from '../../services/api';

// ── Data ─────────────────────────────────────────────────────────────────────

const events = [
  {
    title: 'Mega Donation :',
    description: "The NSS-Udaan Committee of Vidyavardhini's College organized a week-long clothes donation drive between September 27th and October 6th. Students, faculty, and staff generously donated clothes, exceeding the drive's goal of providing for the underprivileged in the community. The success of the drive motivated the NSS-Udaan Committee to organize similar events in the future.",
  },
  {
    title: 'WALKATHON :',
    description: "The NSS Unit of Vidyavardhini's College of Engineering and Technology, Vasai(W), participated in a walkathon organized by Brahma Kumaris for road safety awareness. Starting from Swaminarayan Mandir in Vasai, the event featured speeches by chief guests and a police officer. Volunteers, including those dressed as Bharat Mata and Rawan, joined people of all ages in chanting slogan 'Sadak Suraksha, Jeevan Raksha' and carrying posters. The walkathon, supervised by Maharashtra State Police, concluded with refreshments and a temple visit.",
  },
  {
    title: 'BLOOD DONATION :',
    description: "NSS Committee of Vidyavardhini's College of Engineering and Technology, in collaboration with the Leo Club of Vasai, organized a successful Blood Donation Camp on October 11th, 2023, at the college campus. The event gathered 152 units of blood, thanks to enthusiastic volunteers who efficiently managed hospitality, registration, and donor care.",
  },
  {
    title: 'Mega Donation Distribution :',
    description: "The NSS unit of Vidyavardhini's College organized a Mega Donation Drive to promote social responsibility and help the underprivileged. Students collected clothing, blankets, and food items which were donated to Maratha Life Foundation. A retired military officer spoke to the volunteers about discipline, compassion, and service, inspiring them and enriching the experience.",
  },
  {
    title: 'Water Conservation Rally :',
    description: 'The NSS Unit of VCET participated in a \'Water Conservation Rally\' on August 11, 2023, organized by the Vasai-Virar Municipal Corporation as part of the "Jal Shakti Abhiyan." The rally aimed to raise awareness about rainwater conservation. Participants marched with banners and posters, engaging with local residents to promote rainwater harvesting. Expert speeches emphasized the importance of water conservation, culminating in NSS students taking a pledge to support and promote water conservation efforts.',
  },
  {
    title: 'Jignyasa & Aakaar :',
    description: "The Ek Bharat Shreshta Bharat Committee hosted a Ganesh Idol Making Competition with Odishian influences, followed by Jignyasa 2.0, a Cultural Quiz Event. Mr. Narendra Kadam judged the entries for cultural authenticity, concluding with a prize ceremony and the principal's commendation on September 13, 2023.",
  },
  {
    title: 'Unity Day :',
    description: 'The NSS Unit of VCET celebrated Unity Day on October 31, 2023, honoring Sardar Vallabhbhai Patel\'s birth anniversary. Volunteers took the "Rashtriya Ekta Diwas Pledge" emphasizing unity, integrity, and India\'s cultural diversity. The pledge ceremony concluded with a renewed commitment to national unity, leaving everyone with a sense of togetherness and purpose.',
  },
  {
    title: 'Yoga Day :',
    description: "On June 21, 2023, VCET celebrated International Yoga Day with enthusiasm, aiming to promote physical and mental well-being. Led by experienced instructors, participants engaged in invigorating asanas and breathing exercises, fostering inner peace and unity. The event highlighted yoga's benefits, including improved focus, flexibility, and overall wellness, inspiring a commitment to incorporating yoga into daily routines for a healthier, balanced life.",
  },
  {
    title: 'REPUBLIC DAY :',
    description: 'The Republic Day celebration at Vidyavardhini College Of Engineering And Technology featured Dr. Harish Vankudre Sir as chief guest. The event began with flag hoisting and the national anthem sung by Dr. Yogesh Pingle Sir. An NSS-organized street play addressed societal discriminations, followed by a march past showcasing commitment to the national flag. The celebration emphasized responsibilities in a democratic nation and inspired youth to contribute to social change.',
  },
  {
    title: 'Digital survey :',
    description: 'NSS volunteers conducted a Digital Survey in Golani Naka, Vasai East, assessing voter ID registration awareness. Results showed 75% possessed voter IDs, 90% had Aadhaar cards, yet only 45% understood the importance of voter ID registration, indicating a need for increased awareness.',
  },
  {
    title: 'SHRAMDAAN :',
    description: "The NSS Unit of Vidyavardhini's College of Engineering and Technology participated in a Shramdaan event on October 1, 2023, organized by VVMC Municipality. Students joined others at Vasai West Station to clean nearby roads, parks, and public spaces, promoting civic responsibility and environmental care. The event received community praise, fostering pride and unity among participants while promoting a sense of responsibility.",
  },
  {
    title: 'Electoral Literacy Club :',
    description: "The NSS Unit of Vidyavardhini's College of Engineering and Technology organized an Electoral Literacy Program to raise awareness about citizens' electoral rights. Students showcased their dedication through a traditional Marathi ballad performance, emphasizing the importance of voting and inspiring others to cherish their electoral rights as active citizens.",
  },
  {
    title: 'Cycle Rally :',
    description: "The NSS unit of Vidyavardhini's College Of Engineering and Technology in Vasai organized an Energy Conservation Cycle Rally on 12th of January. The rally, which started at 3:30 P.M. and concluded safely by 5:30 P.M, saw participants including faculty members and NSS volunteers. The route covered 100ft Road to Suncity and back, promoting energy conservation through cycling. The successful event was supported by NSS Program Officer, Dr. Pradip Gulbhile Sir.",
  },
  {
    title: 'Leadership Training Program :',
    description: "The NSS Leadership Training Program organised by Viva College emphasized leadership and social responsibility for Vidyavardhini's College of Engineering and Technology students. They gained insights through talks, activities, and NGO visits, fostering teamwork and creativity with sports, blood stem cell registration, and a street play.",
  },
  {
    title: 'CONSTITUTION DAY :',
    description: "VCET's NSS Committee organized a Constitution Day event to promote patriotism and awareness about the Indian Constitution among students. The event featured a reading of Constitution excerpts and a quiz covering its key aspects. Students participated enthusiastically, with prizes awarded to top performers and certificates for all participants.",
  },
  {
    title: 'ANTI-HUMAN TRAFFICKING :',
    description: 'On January 11th, 2024, the NSS Team organized an Anti-Human Trafficking Seminar. Speakers including Mr. Vikas Gaikwad and Mr. Kalidas Rote provided insights on combating human trafficking. Inspector Sir shared ongoing cases, adding a practical dimension to the seminar. The event concluded with a question and answer session and a vote of thanks, emphasizing collective responsibility in the fight against human trafficking.',
  },
  {
    title: 'FE Orientation :',
    description: "NSS organized an orientation program at Vidyavardhini's College of Engineering and Technology on August 8, 2023, for first-year engineering students, with two sessions from 2pm to 4pm. Discussions on committee events, skill development, and college life led by NSS leaders and the Program Officer concluded with expressions of gratitude and best wishes for the freshers' academic journey.",
  },
  {
    title: 'Fit India Freedom Run :',
    description: "Vidyavardhini's College of Engineering and Technology's NSS Unit joined the Fit India Swachhata Freedom Run on October 5, 2023, promoting fitness, cleanliness, and citizen awareness. Volunteers ran two kilometers around campus, picking up litter to support these goals. The event ended with a litter-free environment and self-applause for our collective success.",
  },
  {
    title: 'Drug Abuse Seminar :',
    description: "The VCET NSS seminar on International Day Against Drug Abuse and Illicit Trafficking educated students about the consequences of drug abuse and global impacts of illicit trafficking. It empowered students to combat drug abuse actively through awareness and preventive measures. The dedication of VCET NSS volunteers was commendable, aiming for a responsible student community and a drug-free society. All contributors were appreciated for their role in the event's success.",
  },
];

const gallery = [
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS1.PNG', alt: 'NSS gallery image 1', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS2.PNG', alt: 'NSS gallery image 2', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS3.PNG', alt: 'NSS gallery image 3', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS4.PNG', alt: 'NSS gallery image 4', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS5.PNG', alt: 'NSS gallery image 5', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS6.PNG', alt: 'NSS gallery image 6', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS7.PNG', alt: 'NSS gallery image 7', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS8.PNG', alt: 'NSS gallery image 8', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS9.PNG', alt: 'NSS gallery image 9', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS10.PNG', alt: 'NSS gallery image 10', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS11.PNG', alt: 'NSS gallery image 11', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS12.PNG', alt: 'NSS gallery image 12', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS13.PNG', alt: 'NSS gallery image 13', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS14.PNG', alt: 'NSS gallery image 14', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS15.PNG', alt: 'NSS gallery image 15', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS16.PNG', alt: 'NSS gallery image 16', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS17.PNG', alt: 'NSS gallery image 17', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS18.PNG', alt: 'NSS gallery image 18', placeholder: false },
  { src: '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Gallery/NSS19.PNG', alt: 'NSS gallery image 19', placeholder: false },
];

const staffRows: string[][] = [
  ['Co-ordinator', 'Dr. Pradip Gulbhile', 'FE Engineering'],
  ['Member', 'Mr. Dipak Choudhari', 'Mechanical Engineering'],
  ['Member', 'Mr. Vikrant Agaskar', 'Computer Engineering'],
  ['Member', 'Mr. Yogesh Pingle', 'Computer Sci & Engg. (Data Science)'],
  ['Member', 'Mr. Sainath Patil', 'INFT Engineering'],
  ['Member', 'Mrs. Smita Jawale', 'Computer Engineering'],
  ['Member', 'Mrs. Sandhya Supalkar', 'EXTC Engineering'],
  ['Member', 'Mr. Arbaz Kazi', 'Civil Engineering'],
  ['Member', 'Ms. Komai Champanerkar', 'Computer Sci & Engg. (Data Science)'],
  ['Member', 'Mr. Prasad Thakur', 'Administration'],
];

const studentRows: string[][] = [
  ['NSS Leader', 'Mr. Suryanarayan Choudhury'],
  ['Udaan President', 'Ms. Divya Desai'],
  ['Secretary', 'Ms.Tejal Mendhe\nMs. Prachi Shah'],
  ['Treasurer', 'Ms. Paarth Baradia\nMs. Devharsh Jha'],
  ['Documentation Head', 'Mr.Sahil Kulabkar\nMr. Saurabh Patil'],
];

// ── Component ─────────────────────────────────────────────────────────────────

const NSS: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('nss')
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

  const apiGallery = Array.isArray(apiData?.gallery)
    ? apiData.gallery
      .map((item: Record<string, unknown>, index: number) => {
        const raw = String(item.img ?? item.imageUrl ?? item.image ?? '');
        const src = resolveApiUrl(raw) || raw;
        if (!src) return null;
        return {
          src,
          alt: `NSS gallery image ${index + 1}`,
        };
      })
      .filter((item): item is { src: string; alt: string } => !!item)
    : [];
  const resolvedGallery = apiGallery.length > 0 ? apiGallery : gallery;

  const apiStaffRows = Array.isArray(apiData?.staff)
    ? apiData.staff
      .map((member: Record<string, unknown>) => [
        String(member.pos ?? ''),
        String(member.name ?? ''),
        String(member.dept ?? ''),
      ])
      .filter((row: string[]) => row[0] || row[1] || row[2])
    : [];
  const resolvedStaffRows = apiStaffRows.length > 0 ? apiStaffRows : staffRows;

  const apiStudRows = Array.isArray(apiData?.studs)
    ? apiData.studs
      .map((member: Record<string, unknown>) => [String(member.pos ?? ''), String(member.name ?? '')])
      .filter((row: string[]) => row[0] || row[1])
    : [];
  const resolvedStudentRows = apiStudRows.length > 0 ? apiStudRows : studentRows;
  const teamYear = typeof apiData?.teamYear === 'string' && apiData.teamYear.trim() ? apiData.teamYear : '2024-25';

  const cImgRaw = String(apiData?.cImg ?? '');
  const cImg = resolveApiUrl(cImgRaw) || cImgRaw || '/images/StudentLife/Extra-curricular-activities/Student_council/NSS/Team/Pradip_Gulbhile.jpg';
  const cName = String(apiData?.cName ?? 'Dr. Pradip Gulbhile');
  const cDept = String(apiData?.cDept ?? 'Humanity Department');
  const cMail = String(apiData?.cMail ?? 'pradip.gulbhile@vcet.edu.in');
  const cPhone = String(apiData?.cPhone ?? '9970042379');
  const instaUrl = String(apiData?.instaUrl || 'https://www.instagram.com/nss_vcet?igsh=MWx3YzIyZTBuenZxcw==');
  const instaLabel = String(apiData?.instaLab || 'CONTACT Us Instagram Click here:');

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="NSS"
  breadcrumbs={[{ label: 'NSS' }]}
  />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner
        title="NSS"
        breadcrumbs={[{ label: 'NSS' }]}
      />

      <ContentSection
        id="objectives"
        title="Objectives"
        subtitle=""
        backgroundClassName="bg-brand-light"
      >
        <div className="reveal rounded-4xl border border-brand-blue/10 bg-white p-8 md:p-10 shadow-sm">
          <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-4">
            The National Service Scheme (NSS) Government of India, Ministry of Youth Affairs &amp;
            Sports provides an opportunity to the student youth of INDIA to take part in various
            government led community service activities &amp; programs. The sole aim of the NSS is
            to provide hands-on experience to young students in delivering community service.
          </p>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            UDAAN was founded in the academic year 2014-2015 at VCET. Now UDAAN comes under the
            NSS committee of VCET. The inception of UDAAN is a result of the responsibility of our
            institution and Students towards the social scenario of the society. We take great
            pride and honor in reporting the ascendancy of NSS every academic year. The Year begins
            with building our team where we find many interested and talented volunteers. All of
            them filled with great enthusiasm and zest started the journey of the change we
            believed in.
          </p>
        </div>
      </ContentSection>

      <ContentSection
        id="events"
        title="Events"
        subtitle=""
        backgroundClassName="bg-white"
      >
        <div className="space-y-12">
          <EventGrid items={resolvedEvents} />

          <div className="reveal">
            <a href={instaUrl} target="_blank" rel="noreferrer">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-navy hover:text-brand-blue transition-colors">
                {instaLabel}
              </h3>
            </a>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        id="gallery"
        title="Gallery"
        subtitle=""
        backgroundClassName="bg-brand-light"
      >
        <GalleryGrid items={resolvedGallery} />
      </ContentSection>

      <ContentSection
        id="team"
        title="Team"
        subtitle=""
        backgroundClassName="bg-white"
      >
        <div className="space-y-16 py-8">

          <div className="reveal flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-blue mb-8">
              Co-ordinator
            </h3>

            <div className="relative mb-6 w-48 h-56 rounded-2xl overflow-hidden shadow-lg border border-brand-blue/10">
              <img
                src={cImg}
                alt={cName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

              <h4 className="text-lg md:text-xl font-bold text-brand-gold mb-6">{cName} ({cDept})</h4>

            <div className="flex flex-col gap-3 text-slate-500 font-medium text-sm md:text-base">
              <a href={`mailto:${cMail}`} className="flex items-center justify-center gap-2 hover:text-brand-blue transition-colors">
                <span className="text-brand-gold">✉</span> {cMail}
              </a>
              <a href={`tel:${cPhone}`} className="flex items-center justify-center gap-2 hover:text-brand-blue transition-colors">
                <span className="text-brand-gold">✆</span> {cPhone}
              </a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col gap-16 bg-white rounded-3xl">
            <div className="reveal">
              <div className="mb-6 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-brand-blue">
                  Staff Committee :
                </h3>
              </div>
              <div className="w-full">
                <DataTable
                  columns={['Post', 'Name', 'Department']}
                  rows={resolvedStaffRows}
                />
              </div>
            </div>

            <div className="reveal">
              <div className="mb-6 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-brand-blue">
                  NSS Students Core committee: {teamYear} :
                </h3>
              </div>
              <div className="w-full">
                <DataTable
                  columns={['Post', 'Name']}
                  rows={resolvedStudentRows}
                />
              </div>
            </div>
          </div>

        </div>
      </ContentSection>
    </PageLayout>
  );
};

export default NSS;
