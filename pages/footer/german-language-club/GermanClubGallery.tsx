import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const GermanClubGallery: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-brand-blue/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-brand-blue text-white">
          <ImageIcon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-navy">Gallery</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2].map((index) => (
          <article key={index} className="group border border-brand-blue/20 bg-white p-3 shadow-sm">
            <div className="border-2 border-brand-gold/60 bg-gradient-to-br from-brand-light to-white p-2">
              <div className="flex aspect-[4/3] items-center justify-center border border-brand-blue/15 bg-white">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-brand-blue/10 text-brand-blue">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-brand-navy">German Club Image Holder {index}</p>
                  <p className="mt-1 text-xs text-slate-500">Add image here</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default GermanClubGallery;
