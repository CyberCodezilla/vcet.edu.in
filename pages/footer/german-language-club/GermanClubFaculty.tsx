import React from 'react';
import { UserRound } from 'lucide-react';

const GermanClubFaculty: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-brand-blue/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-brand-blue text-white">
          <UserRound className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-navy">Faculty In-Charge</h2>
      </div>

      <article className="max-w-2xl border border-brand-blue/20 bg-white p-5 shadow-sm">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">In-Charge :</p>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="border border-brand-gold/60 bg-gradient-to-br from-brand-light to-white p-2">
            <div className="flex h-44 w-36 items-center justify-center border border-brand-blue/15 bg-white">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center bg-brand-blue/10 text-brand-blue">
                  <UserRound className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-brand-navy">Image Holder</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-display font-bold text-brand-navy">Dr. Yogesh Pingle</h3>
            <p className="mt-2 text-sm font-medium text-slate-700 md:text-base">
              Grundstufe -II Certified (German Language)
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default GermanClubFaculty;
