import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  BulletList,
  ContentSection,
  DataTable,
  EventGrid,
  GalleryGrid,
  IntroSection,
  ResourceGrid,
} from './studentLifeShared';

const objectiveItems = [
  'To foster a culture of inclusivity, excellence, and sportsmanship that inspires every student to actively engage in sports and wellness activities,',
  'Promoting both physical and mental well-being within the college community.',
];

const events = [
  {
    title: 'FE Induction Program :',
    description:
      "The Sports Committee leads the Induction program, promoting personal growth through sports. The primary goal of this program is to inspire newcomers to actively participate in various activities, fostering vital life skills like communication, leadership, and teamwork. In essence, this program not only introduces students to sports but also enhances qualities valuable in personal and professional life, highlighting the committee's commitment to holistic development. In addition to the Induction program, the Sports Committee organizes regular training sessions and workshops to hone skills and foster a spirit of healthy competition among students. Through these initiatives, we aim to instill a sense of camaraderie and sportsmanship, laying the foundation for lifelong passion and active engagement in sports.",
  },
  {
    title: 'AVAHAN :',
    description:
      'Our annual inter-college sports festival, AVAHAN, embodies sportsmanship, enthusiasm, and skill.Every year, the sports committee hosts its annual Sports Festival called "Avahan- #NextGenChamps". It is an intra and inter collegiate sports event which lasts for 15 days where all the students get to bring up their inner sportsmanship and showcase their talent. The atmosphere is filled with zest and cheers. This event includes sports activities like tug of war, box cricket, football, chess, carrom, table tennis, volleyball, throwball, badminton and many more igniting excitement among VCET students and participants from colleges across Mumbai. AVAHAN 2024 marked a triumphant return after COVID-19 disruptions, fueled by the spirit of the VCET Sports Committee. Beyond being an event, AVAHAN - "#NextGenChamps" instills teamwork, sportsmanship, and respect. Sports are about more than winning; they promote fair play, equality, and justice. Participation builds skills, experience, and confidence, shaping our personalities positively. We look forward to growing and continuing this legacy in the coming years.',
  },
];

const gallery = [
  { src: '/images/student-life/sports-committee/gallery-01.jpg', alt: 'Sports Committee gallery image 1', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-02.jpg', alt: 'Sports Committee gallery image 2', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-03.jpg', alt: 'Sports Committee gallery image 3', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-04.jpg', alt: 'Sports Committee gallery image 4', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-05.jpg', alt: 'Sports Committee gallery image 5', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-06.jpg', alt: 'Sports Committee gallery image 6', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-07.jpg', alt: 'Sports Committee gallery image 7', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-08.jpg', alt: 'Sports Committee gallery image 8', placeholder: true },
  { src: '/images/student-life/sports-committee/gallery-09.jpg', alt: 'Sports Committee gallery image 9', placeholder: true },
];

const teamRows = [
  ['Sports Secretary', 'Dhruv Gharat'],
  ['Joint Sports Secretary', 'Paras Jadhav'],
  ['Treasurer', 'Aditya Shete'],
  ['Deputy Sports Secretary', 'Arya Vartak\nYash Patil\nGargi Betawadkar\nAditi Rasal'],
  ['Organizing Head', 'Atharva Chavan\nOmkar Atre\nAnkita Yadav\nDhruv Save\nSheyas Pathe'],
  ['Sponsorship Head', 'Disha Pote\nPratham Shetty\nAnuj Newalkar\nSoham Pandere'],
  ['PR & Publicity Head', 'Siddhi Chavan\nVedika Pawar\nHardik Sanap\nVinayak Kokkul\nGanesh Joshi'],
  ['Creative Head', 'Anirudha Jadhav\nIshika Bhate'],
  ['Technical Head', 'Chaitnya Waingankarl\nAtharva Sane'],
  ['Social Media Head', 'Arya Raul\nArya Jadhav\nShreya Dhadhekar'],
];

const SportsCommittee: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner title="Sports Committee" breadcrumbs={[{ label: 'Sports Committee' }]} />

      <IntroSection
        id="about"
        title="Sports Committee"
        description="The VCET Sports Committee is the driving force behind the vibrant sports culture at Vidyavardhini's College of Engineering and Technology. Committed to promoting athleticism, teamwork, and sportsmanship, we organize a wide array of sporting events throughout the academic year, culminating in our flagship annual sports festival, Avahan. With a dedicated team of passionate individuals, we aim to inspire and empower students to excel in sports while fostering a sense of camaraderie and healthy competition within the college community."
        image="/images/student-life/sports-committee/hero.jpg"
        imageAlt="Sports Committee"
        hideImage
        imagePlaceholderLabel="Sports Committee Hero Image"
        chips={[
          { label: 'About', href: '#about' },
          { label: 'Objective', href: '#objective' },
          { label: 'Events', href: '#events' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Team', href: '#team' },
        ]}
        links={[
          {
            label: 'Avahan Instagram',
            href: 'https://www.instagram.com/avahan_vcet/',
            icon: 'instagram',
          },
          {
            label: 'Committee PDF',
            href: 'https://vcet.edu.in/wp-content/uploads/2024/04/Avahan-List.pdf',
            icon: 'file',
          },
        ]}
      />

      <ContentSection
        id="objective"
        title="Objective"
        subtitle="Official objectives published on the VCET Sports Committee page."
        backgroundClassName="bg-brand-light"
      >
        <BulletList items={objectiveItems} />
      </ContentSection>

      <ContentSection
        id="events"
        title="Events"
        subtitle="Key Sports Committee activities published on the official VCET website."
        backgroundClassName="bg-white"
      >
        <EventGrid items={events} />
      </ContentSection>

      <ContentSection
        id="gallery"
        title="Gallery"
        subtitle="Official VCET Sports Committee gallery images."
        backgroundClassName="bg-brand-light"
      >
        <GalleryGrid items={gallery} />
      </ContentSection>

      <ContentSection
        id="team"
        title="Team"
        subtitle="SPORTS CORE COMMITTEE (BE) FOR A.Y. 2025-26 :"
        backgroundClassName="bg-white"
      >
        <div className="space-y-8">
          <ResourceGrid
            items={[
              {
                title: 'Sports Student Committee',
                href: 'https://vcet.edu.in/wp-content/uploads/2024/04/Avahan-List.pdf',
                description: 'Committee document linked from the official Sports Committee page.',
                icon: 'file',
              },
            ]}
          />
          <DataTable columns={['Designation', 'Name']} rows={teamRows} />
        </div>
      </ContentSection>
    </PageLayout>
  );
};

export default SportsCommittee;
