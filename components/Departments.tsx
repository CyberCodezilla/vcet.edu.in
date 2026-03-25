import React from 'react';
import SectionHeader from './SectionHeader';
import { FocusCards } from '../ui/focus-cards';
import type { Card } from '../ui/focus-cards';

const departments: Card[] = [
  {
    title: 'Computer Engineering',
    description: 'Software Systems & Core Computing',
    src: '',
    href: '/computer-engineering',
  },
  {
    title: 'Computer Science & Engineering (Data Science)',
    description: 'Data Science, AI & Applied Analytics',
    src: '',
    href: '/cs-data-science',
  },
  {
    title: 'Information Technology',
    description: 'Cloud, Security & Enterprise Computing',
    src: '',
    href: '/information-technology',
  },
  {
    title: 'Artificial Intelligence & Data Science',
    description: 'Machine Learning & Intelligent Systems',
    src: '',
    href: '/ai-data-science',
  },
  {
    title: 'Mechanical Engineering',
    description: 'Robotics, Design & Manufacturing',
    src: '',
    href: '/mechanical-engineering',
  },
  {
    title: 'Electronics & Telecommunication Engineering',
    description: 'Embedded Systems, IoT & Communication',
    src: '',
    href: '/electronics-telecomm',
  },
  {
    title: 'Civil Engineering',
    description: 'Infrastructure, Planning & Sustainability',
    src: '',
    href: '/civil-engineering',
  },
  {
    title: 'Master of Management Studies (MBA)',
    description: 'Management Studies, Strategy & Leadership',
    src: '',
    href: '/mms',
  },
];

const Departments: React.FC = () => {
  return (
    <section id="departments" className="py-20 md:py-28 bg-brand-light text-brand-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] md:w-[500px] md:h-[500px] bg-brand-blue/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] bg-brand-gold/8 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      {/* Top edge accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          title="Academic Departments"
          theme="light"
          subtitle="World-class programs designed for the industry leaders of tomorrow. Hover to explore."
        />

        <FocusCards cards={departments} />
      </div>
    </section>
  );
};

export default Departments;
