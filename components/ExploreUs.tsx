import React from 'react';
import { Play, MonitorPlay, GraduationCap } from 'lucide-react';

const exploreItems = [
  {
    id: 1,
    title: 'Video',
    icon: Play,
    link: '#video',
    description: 'Campus Tour'
  },
  {
    id: 2,
    title: 'ERP Portal',
    icon: MonitorPlay,
    link: '#erp',
    description: 'Student Portal'
  },
  {
    id: 3,
    title: 'Convocation',
    icon: GraduationCap,
    link: '#convocation',
    description: 'Ceremony Gallery'
  }
];

const ExploreUs: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <div className="w-1 h-12 bg-yellow-400 mr-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Explore Us
          </h2>
        </div>

        {/* Explore Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exploreItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.link}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon with border */}
                  <div className="w-20 h-20 rounded-full border-2 border-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-yellow-300 transition-all duration-500">
                    <IconComponent className="w-10 h-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-500" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreUs;
