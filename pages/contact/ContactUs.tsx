import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, Send, ExternalLink } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: [
      'K.T. Marg, Vartak College Campus,',
      'Vasai Road (W), Dist-Palghar,',
      'Vasai, Maharashtra 401202',
    ],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: [
      '+91 7972019446',
      '+91 7558351747',
      '0250 233 8234 (6 Lines)',
    ],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['vcet_inbox@vcet.edu.in'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: [
      'Monday - Saturday',
      '9:00 AM - 5:00 PM',
    ],
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/vcet.vasai.50/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/official.vcet/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/school/vcetvasai/' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/channel/UCjBw5a7WU00GwkxaTjF9jqg' },
];

const ContactUs: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: 'Contact Us' },
        ]}
      />

      {/* Contact Info + Form */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div className="reveal">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Get In Touch
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                  We'd Love to Hear From You
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  Have a question or need more information about VCET? Reach out to us through any
                  of the channels below, or fill out the contact form and we'll get back to you promptly.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4"
                      style={{ transitionDelay: `${idx * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-brand-blue/60" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-brand-navy mb-1 font-display">{item.title}</h3>
                        {item.details.map((detail, dIdx) => (
                          <p key={dIdx} className="text-sm text-slate-500">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-brand-navy mb-4 font-display">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center hover:bg-brand-gold/10 transition-colors duration-300 group"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4 text-brand-blue/60 group-hover:text-brand-gold transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="reveal" style={{ transitionDelay: '0.15s' }}>
                <div className="bg-brand-light rounded-2xl p-8 border border-brand-blue/5">
                  <h3 className="text-lg font-display font-bold text-brand-navy mb-6">Send us a Message</h3>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-brand-navy mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-brand-navy mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-brand-navy mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        placeholder="Enter subject"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-brand-navy mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Type your message here..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all duration-300 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-brand-navy transition-colors duration-300"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Location</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Find Us on the Map
              </h2>
            </div>

            <div className="reveal">
              <div className="bg-white rounded-2xl border border-gray-100 aspect-[16/7] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-brand-blue/20 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-brand-blue/40 tracking-wide">
                    Google Maps Embed - VCET Location
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    K.T. Marg, Vartak College Campus, Vasai Road (W)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactUs;
