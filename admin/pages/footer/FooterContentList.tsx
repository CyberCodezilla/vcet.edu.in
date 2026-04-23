import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Audited Statement PDFs',
    description: 'Manage footer audited statement labels, descriptions, and attached PDFs.',
    to: '/admin/footer-pdfs/audited-statement',
  },
];

const FooterContentList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Footer PDF Forms</h1>
        <p className="text-sm text-slate-500 mt-1">Manage footer-linked PDF forms from Content Management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.to} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
            <p className="text-sm text-slate-500 mt-2">{card.description}</p>
            <div className="mt-4">
              <Link
                to={card.to}
                className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Open Form
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterContentList;
