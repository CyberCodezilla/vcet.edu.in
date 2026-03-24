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
} from './studentLifeShared';

const ebsbEvents = [
  {
    title: "Quiz on India’s Culture",
    description:
      "For this competition students from different branches form a group. The questions asked for this competition were based on the geographical, cultural, historical and various other aspects of our nation. Event was of total 5 rounds where teams were ranked on the number of correct questions answered. Finally the winning team was awarded with exciting cash vouchers.",
  },
  {
    title: 'JAM',
    description:
      "JAM is an elocutionary competition where each contestant had a timer set for 1 min and had to speak on an unplanned given topic. The criteria of jam are no hesitation, no deviation, no repetition. College professors were invited as judges to boost the confidence of the participants on their performances.",
  },
  {
    title: 'Poster Making Competition',
    description:
      "An event organized by EBSB Committee which provided the participants with a chance to display their artistic skills by illustrating cultural, geographical and various facets of the Indian State through their handmade posters. Through this event the participants were able to provide information and emphasize the unique qualities of Indian States. This also indirectly encouraged people to seek more information about Indian States.",
  },
];

const gallery = [
  { src: '/images/student-life/ebsb/gallery-01.jpg', alt: 'EBSB gallery image 1', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-02.jpg', alt: 'EBSB gallery image 2', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-03.jpg', alt: 'EBSB gallery image 3', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-04.jpg', alt: 'EBSB gallery image 4', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-05.jpg', alt: 'EBSB gallery image 5', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-06.jpg', alt: 'EBSB gallery image 6', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-07.jpg', alt: 'EBSB gallery image 7', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-08.jpg', alt: 'EBSB gallery image 8', placeholder: true },
  { src: '/images/student-life/ebsb/gallery-09.jpg', alt: 'EBSB gallery image 9', placeholder: true },
];

const staffRows = [
  ['Member', 'Mr. Vikrant Agaskar', 'Computer Engineering'],
  ['Member', 'Ms. Shraddha Gosavi', 'First Year Engineering'],
  ['Member', 'Ms. Anagha Singh', 'Mechanical Engineering'],
  ['Member', 'Ms. Aishwarya Anil', 'Civil Engineering'],
  ['Member', 'Ms. Odilia Gonsalves', 'Computer Sci & Engg (Data Science)'],
  ['Member', 'Ms. Sweety Patil', 'AIDS'],
];

const studentRows = [
  ['President', 'Rohit Sachin Redekar', 'Computer Engineering'],
  ['Joint Secretary', 'Dhruv Kadam', 'Mechanical Engineering'],
  ['Member', 'Prajakta Borse', 'Civil Engineering'],
];

const EBSB: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="EBSB"
        subtitle="Ek Bharat Shreshtha Bharat"
        breadcrumbs={[{ label: 'EBSB' }]}
      />

      <IntroSection
        id="intro"
        title="Ek Bharat Shreshtha Bharat (EBSB)"
        description="The EBSB Committee of Vidyavardhini's College of Engineering and Technology fosters national integration, communication skills, and mutual understanding between students of different states/UTs through cultural exchange activities."
        image="/images/student-life/ebsb/hero.jpg"
        imageAlt="EBSB banner"
        hideImage
        imagePlaceholderLabel="EBSB Hero Image"
        chips={[
          { label: 'About', href: '#about' },
          { label: 'Objectives', href: '#objectives' },
          { label: 'Events', href: '#events' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Team', href: '#team' },
        ]}
      />

      <ContentSection
        id="about"
        title="About"
        subtitle="EBSB Committee overview"
        backgroundClassName="bg-white"
      >
        <div className="reveal rounded-[28px] border border-brand-blue/10 bg-white p-8 md:p-10 shadow-sm">
          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            The “Ek Bharat Shreshtha Bharat” (EBSB) Committee at Vidyavardhini’s College of
            Engineering and Technology is a flagship program of the Government of India that
            promotes unity-in-diversity and national integration. The committee organizes annual
            activities to help students understand cultural, geographical, historical, and social
            aspects of Indian States and Union Territories.
          </p>
        </div>
      </ContentSection>

      <ContentSection
        id="objectives"
        title="Objectives"
        subtitle="Goals from the existing page content"
        backgroundClassName="bg-brand-light"
      >
        <div className="reveal rounded-[28px] border border-brand-blue/10 bg-white p-8 md:p-10 shadow-sm">
          <ul className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg list-disc pl-5">
            <li>Enhance communication skills through inter-state activities.</li>
            <li>Promote mutual understanding between people of different states and UTs.</li>
            <li>Encourage cultural awareness using state pairing and exchange programs.</li>
          </ul>
        </div>
      </ContentSection>

      <ContentSection
        id="events"
        title="Events"
        subtitle="From the EBSB page screenshots"
        backgroundClassName="bg-white"
      >
        <EventGrid items={ebsbEvents} />
      </ContentSection>

      <ContentSection
        id="gallery"
        title="Gallery"
        subtitle="Image placeholders as per Literati style"
        backgroundClassName="bg-brand-light"
      >
        <GalleryGrid items={gallery} />
      </ContentSection>

      <ContentSection
        id="team"
        title="Team"
        subtitle="In-Charge, staff committee, and student committee"
        backgroundClassName="bg-white"
      >
        <div className="space-y-8">
          <ProfileHighlight
            title="In-Charge and Co-ordinator"
            image="/images/student-life/ebsb/staff-incharge.jpg"
            imageAlt="Dr. Archana Ekbote"
            hideImage
            imagePlaceholderLabel="Dr. Archana Ekbote"
            heading="Dr. Archana Ekbote"
            lines={['Department of Information Technology', 'archana.ekbote@vcet.edu.in']}
          />

          <div>
            <div className="mb-6 reveal">
              <h3 className="text-2xl font-display font-bold text-brand-navy">Staff Committee</h3>
            </div>
            <DataTable columns={['Role', 'Name', 'Department']} rows={staffRows} />
          </div>

          <div>
            <div className="mb-6 reveal">
              <h3 className="text-2xl font-display font-bold text-brand-navy">Student Committee</h3>
            </div>
            <DataTable columns={['Role', 'Name', 'Department']} rows={studentRows} />
          </div>
        </div>
      </ContentSection>
    </PageLayout>
  );
};

export default EBSB;

