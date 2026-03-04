import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Quote } from 'lucide-react';

const PrincipalsDesk: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Principal's Desk"
        breadcrumbs={[
          { label: 'About Us', href: '/about-us' },
          { label: "Principal's Desk" },
        ]}
      />

      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-light/30 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">

              {/* Profile Card */}
              <div className="reveal">
                <div className="sticky top-32">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="aspect-[3/4] bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-3xl font-display font-bold text-brand-blue/30">RH</span>
                        </div>
                        <p className="text-xs text-slate-400">principal-dr-rakesh-himte.jpg</p>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-display font-bold text-brand-navy">Dr. Rakesh Himte</h3>
                      <p className="text-sm text-brand-gold font-semibold mt-1">Principal</p>
                      <p className="text-xs text-slate-400 mt-0.5">VCET, Vasai</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="md:col-span-2 space-y-6 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="reveal flex items-start gap-4">
                  <Quote className="w-10 h-10 text-brand-gold/30 flex-shrink-0 rotate-180" />
                  <p className="text-xl md:text-2xl font-display font-semibold text-brand-navy leading-snug italic">
                    Our cherished motto is the 'overall empowerment of students' for their all-round development.
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-brand-gold/30 to-transparent my-6" />

                <div className="space-y-5 reveal" style={{ transitionDelay: '0.1s' }}>
                  <p className="text-slate-600 leading-relaxed">
                    As a proud VCETite, our cherished motto is the 'overall empowerment of students'
                    for their all-round development. Today, education means much more than merely
                    acquiring knowledge. Our focus has been on the acquisition of knowledge and
                    skills, building character and improving employability of our young talent. I am sure
                    that VCET's culture, and an inherent strong foundation that the institution has
                    provided to our students, has assisted them to march ahead and achieve
                    their educational objectives ensuring a stronger and brighter future.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    This year on the academic front, we were able to maintain the same reputation
                    and promised ourselves to remain consistent throughout the coming years. At the
                    infrastructure level, we have renovated Ground and 1st Floors and renovation of
                    other floors is in progress. In addition to that there are many more changes that
                    surely added a class in the ambience of VCET.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    I am also proud to share that this year we wholeheartedly responded to the
                    appeal from the government to contribute to the society with open arms and in turn
                    started a community services wing <strong className="text-brand-blue">'UDAAN'</strong>. Throughout the year we followed the
                    'Swachha Bhaarat Abhiyaan' by maintaining personal hygiene, spreading awareness and
                    taking extra efforts to keep our surroundings clean and green.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    A clothes donation campaign resulted in a great success and trusts like Anand Ashram-Vasai and
                    Dadasaheb Tatke Ashram-Thane benefited a lot. Also our volunteers started teaching
                    Maths and English to students from Swagat Ashram Orphanage, Malad. We also
                    organized a street play under the title "#RespectHer" in college premises. This
                    helped us realize our social responsibilities and the true meaning of being an 'Indian'.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    An excellent track record to mention as part of this year's achievement was the
                    Training and Placement Committee's performance. This year, with the whole
                    hearted support from Management and members of teaching and non teaching staff
                    including the students, we were able to set a high placement record. This effort was
                    acknowledged by the stalwarts from various companies through their positive
                    feedbacks praising the P.A.T. committee's hard work and sincere efforts.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    The measures initiated by the management, the steps taken by college
                    administration, the willing contribution of the teaching and non-teaching staff and the
                    overwhelming response of students and the college activities in the past all vouch
                    for this grand success. With such a steady stream of initiatives taken, it makes
                    me proud to be the principal of this wonderful institution.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    At this point I would like to appeal to all of you one more time to give your
                    best and make this institution one of the best learning centers among its peers. I
                    wish you all, good luck and greater success in your future endeavors. Proud
                    VCETites, keep that energy and spirit alive as we write more and more of our success
                    stories together.
                  </p>
                </div>

                {/* Signature */}
                <div className="reveal pt-6 border-t border-gray-100" style={{ transitionDelay: '0.2s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-brand-gold" />
                    <div>
                      <p className="font-display font-bold text-brand-navy">Dr. Rakesh Himte</p>
                      <p className="text-sm text-brand-gold">Principal, VCET Vasai</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrincipalsDesk;
