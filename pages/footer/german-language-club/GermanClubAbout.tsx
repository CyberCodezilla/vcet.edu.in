import React from 'react';
import { BookOpenText } from 'lucide-react';

const GermanClubAbout: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-brand-blue/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-brand-blue text-white">
          <BookOpenText className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-brand-navy">Introduction</h2>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">German Language Club</p>
        </div>
      </div>

      <div className="space-y-4 text-justify text-[15px] leading-8 text-slate-700 md:text-base">
        <p>
          Nowadays, students with knowledge of multiple languages are considered to be one of the talented students.
          Such students are recommended for placements in good companies and this is the reason why college has
          started with the German Language Club which is welcomed by students of different department.
        </p>
        <p>
          By learning a foreign language, students can improve their skills which is more profitable for their
          personal development as well good for their career. As most of the core companies are located at Germany,
          it is a good chance for students to get a job over their by learning German language. Even if students are
          looking for higher education in foreign nations, this language can help them to get into any institute.
        </p>
        <p>
          After joining this club, students will get to learn German vocabulary which will later result in fluent
          German communication. Even German based companies look for individuals who possess this language.
        </p>
        <p>
          The course structure is designed in such a way that after successful completion, students can be able to
          attempt A1 certification. The other benefit of joining the course is that it is provided at affordable
          ranger. Where other training institutes cost this course at around Rs. 15,000, the students over here can
          take the same course for approximately Rs. 2,000.
        </p>
        <p>
          After successfully completion of this course, an individual can go for A1 Certification. It is an official
          certification exam for German language. With this certification, they can be able to apply for MS in foreign
          institutes by having perk of foreign language.
        </p>
      </div>
    </div>
  );
};

export default GermanClubAbout;
