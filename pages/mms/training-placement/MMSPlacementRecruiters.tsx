import React from 'react';
import { ImageIcon } from 'lucide-react';
import MMSLayout from '../../../components/mms/MMSLayout';

export default function MMSPlacementRecruiters() {
  return (
    <MMSLayout title="Our Recruiters">
      <section className="bg-white px-1 py-2 sm:px-2">
        <div className="flex min-h-[420px] items-center justify-center bg-white text-center">
          <div className="space-y-3 px-4">
            <ImageIcon className="mx-auto h-12 w-12 text-brand-blue/55" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Holder</p>
            <p className="text-base font-semibold text-brand-navy">Our Recruiters Banner</p>
          </div>
        </div>
      </section>
    </MMSLayout>
  );
}
