import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  ContentSection,
  DataTable,
  EventGrid,
  GalleryGrid,
} from './studentLifeShared';
import { Mail, Phone } from 'lucide-react';

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
  { src: '/images/student-life/nss/gallery-01.jpg', alt: 'NSS gallery image 1', placeholder: true },
  { src: '/images/student-life/nss/gallery-02.jpg', alt: 'NSS gallery image 2', placeholder: true },
  { src: '/images/student-life/nss/gallery-03.jpg', alt: 'NSS gallery image 3', placeholder: true },
  { src: '/images/student-life/nss/gallery-04.jpg', alt: 'NSS gallery image 4', placeholder: true },
  { src: '/images/student-life/nss/gallery-05.jpg', alt: 'NSS gallery image 5', placeholder: true },
  { src: '/images/student-life/nss/gallery-06.jpg', alt: 'NSS gallery image 6', placeholder: true },
  { src: '/images/student-life/nss/gallery-07.jpg', alt: 'NSS gallery image 7', placeholder: true },
  { src: '/images/student-life/nss/gallery-08.jpg', alt: 'NSS gallery image 8', placeholder: true },
  { src: '/images/student-life/nss/gallery-09.jpg', alt: 'NSS gallery image 9', placeholder: true },
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
        <div className="reveal rounded-[28px] border border-brand-blue/10 bg-white p-8 md:p-10 shadow-sm">
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
          <EventGrid items={events} />

          <div className="reveal">
            <a href="https://www.instagram.com/nss_vcet?igsh=MWx3YzIyZTBuenZxcw==" target="_blank" rel="noreferrer">
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-navy hover:text-brand-blue transition-colors">
                CONTACT Us Instagram Click here:
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
        <GalleryGrid items={gallery} />
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
                src="/images/student-life/nss/pradip-gulbhile.jpg"
                alt="Dr. Pradip Gulbhile"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <h4 className="text-lg md:text-xl font-bold text-brand-gold mb-6">
              Dr. Pradip Gulbhile (Humanity Department)
            </h4>

            <div className="flex flex-col gap-3 text-slate-500 font-medium text-sm md:text-base">
              <a href="mailto:pradip.gulbhile@vcet.edu.in" className="flex items-center justify-center gap-2 hover:text-brand-blue transition-colors">
                <span className="text-brand-gold">✉</span> pradip.gulbhile@vcet.edu.in
              </a>
              <a href="tel:9970042379" className="flex items-center justify-center gap-2 hover:text-brand-blue transition-colors">
                <span className="text-brand-gold">✆</span> 9970042379
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
                  rows={staffRows}
                />
              </div>
            </div>

            <div className="reveal">
              <div className="mb-6 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-brand-blue">
                  NSS Students Core committee: 2024-25 :
                </h3>
              </div>
              <div className="w-full">
                <DataTable
                  columns={['Post', 'Name']}
                  rows={studentRows}
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