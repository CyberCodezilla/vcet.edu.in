import React from 'react';
import { PhoneCall, HeartHandshake } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

const helplineContacts = [
  {
    name: 'Prof. Bharti Gondhalekar',
    phone: '9423365470',
    note: 'Primary support for guidance, campus access assistance, and immediate escalation support.',
  },
  {
    name: 'Prof. Swapnil Mane',
    phone: '9860170151',
    note: 'Alternative support contact for student wellbeing coordination and required facilitation.',
  },
];

const HelplineForDivyangjan: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Helpline For Divyangjan"
        breadcrumbs={[
          { label: 'Useful Links' },
          { label: 'Helpline For Divyangjan' },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="reveal mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5">
                <HeartHandshake className="h-4 w-4 text-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-navy">Support Desk</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-brand-navy md:text-4xl">HELPLINE FOR DIVYANGJAN</h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                VCET provides dedicated points of contact to support Divyangjan students with accessibility guidance,
                academic coordination, and immediate assistance whenever required.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {helplineContacts.map((contact) => (
                <article
                  key={contact.phone}
                  className="reveal rounded-2xl border border-brand-blue/10 bg-gradient-to-br from-white to-brand-light p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10">
                    <PhoneCall className="h-5 w-5 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-navy">{contact.name}</h3>
                  <a
                    href={`tel:${contact.phone}`}
                    className="mt-2 inline-block text-lg font-semibold tracking-wide text-brand-blue hover:text-brand-navy"
                  >
                    {contact.phone}
                  </a>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{contact.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelplineForDivyangjan;
