import React from 'react';
import SectionHeader from './SectionHeader';
import { FocusCards } from '../ui/focus-cards';
import type { Card } from '../ui/focus-cards';

const departments: Card[] = [
  {
    title: 'Computer Science',
    description: 'AI, Machine Learning & Data Science — shaping the future of computing.',
    tag: 'Engineering',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Mechanical Engineering',
    description: 'Robotics, Automation & Thermal Systems — precision engineering at its best.',
    tag: 'Engineering',
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Electronics & Comm.',
    description: 'IoT, Embedded Systems & VLSI — connecting the intelligent world.',
    tag: 'Engineering',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Civil Engineering',
    description: 'Sustainable Infrastructure & Smart Urban Design for tomorrow\'s cities.',
    tag: 'Engineering',
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Information Technology',
    description: 'Cloud Computing, Cyber Security & Full-Stack Development.',
    tag: 'Engineering',
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Electrical Engineering',
    description: 'Renewable Energy Systems, Power Electronics & Smart Grids.',
    tag: 'Engineering',
    src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop',
  },
];

const Departments: React.FC = () => {
  return (
    <section id="departments" className="py-20 md:py-28 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-gold/5 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          title="Academic Departments"
          theme="dark"
          subtitle="World-class programs designed for the industry leaders of tomorrow. Hover to explore."
        />

        <FocusCards cards={departments} />
      </div>
    </section>
  );
};

export default Departments;
