import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import HorizontalTableShell from '../../../components/mms/HorizontalTableShell';

const feeRows = [
  {
    srNo: '1',
    category: 'OPEN (MAHARASHTRA BOARD STUDENT)',
    collegeFees: 'Rs 27,748/-',
  },
  {
    srNo: '3',
    category: 'OBC*, SEBC*, EBC*, EWS * (MALE)',
    collegeFees: 'Rs 15,903/-',
  },
  {
    srNo: '4',
    category: 'OBC*, SEBC*, EBC*, EWS * (FEMALE)',
    collegeFees: 'Rs 4,057/-',
  },
  {
    srNo: '5',
    category: 'SBC*, NT1*, NT2*, NT3*, DT*, VJ * / TFWS*',
    collegeFees: 'Rs 4,057/-',
  },
  {
    srNo: '6',
    category: 'SC*, ST*,',
    collegeFees: 'Rs 859/-',
  },
];

const paymentDetails = [
  { label: 'Bank Account Name', value: "Vidyavardhini's College of Engg & Tech" },
  { label: 'Bank Name', value: 'HDFC BANK LTD.' },
  { label: 'Account No.', value: '99900005081970' },
  { label: 'Account Type', value: 'Saving A/c' },
  { label: 'IFSC Code', value: 'HDFC0008922' },
];

export default function MMSFeesStructure() {
  return (
    <MMSLayout title="Fees Structure">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-none border border-[#21466f]/20 bg-gradient-to-b from-[#f8fbff] to-white shadow-[0_16px_34px_-24px_rgba(11,61,145,0.45)]">
          <div>
            <HorizontalTableShell storageKey="mms-table-hint-fees" scrollerClassName="rounded-none border border-[#2c4f7c]/55 bg-white [scrollbar-gutter:auto]" showEdgeFades={false}>
              <table className="w-full min-w-full table-auto border-collapse text-slate-900">
              <thead>
                <tr className="text-left text-white">
                  <th className="sticky top-0 z-20 w-[12%] border border-[#25466f] bg-[#2f5887] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.05em] sm:text-base">SR. NO.</th>
                  <th className="sticky top-0 z-20 border border-[#25466f] bg-[#2f5887] px-4 py-3 text-sm font-semibold uppercase tracking-[0.05em] sm:text-base">CATEGORY</th>
                  <th className="sticky top-0 z-20 w-[26%] border border-[#25466f] bg-[#2f5887] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.05em] sm:text-base">COLLEGE FEES</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr key={row.srNo} className="bg-white align-middle odd:bg-white even:bg-slate-50/35">
                    <td className="border border-slate-400/75 px-4 py-4 text-center text-[21px] font-semibold leading-none sm:text-[22px]">{row.srNo}</td>
                    <td className="border border-slate-400/75 px-4 py-4 text-[18px] font-medium leading-snug sm:text-[20px]">{row.category}</td>
                    <td className="border border-slate-400/75 px-4 py-4 text-center text-[20px] font-semibold leading-none sm:text-[21px]">{row.collegeFees}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </HorizontalTableShell>
          </div>
        </section>

        <section className="space-y-4 border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-[16px] font-semibold uppercase leading-8 tracking-[0.02em] text-[#1c3554] sm:text-[17px]">
            ALL CASTE CATEGORY STUDENTS MUST HAVE RELEVANT DOCUMENTS TO AVAIL CATEGORY CONCESSIONAL FEES BENEFIT AND MUST FILLED ONLINE SCHOLERSHIP/FREESHIP FORM ON WEBSITE
          </p>
          <a
            href="https://mahadbt.maharashtra.gov.in/Login/Login"
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-[#1a4b7c]/30 bg-[#edf4ff] px-4 py-2 text-[16px] font-bold text-[#0d2d56] transition hover:bg-[#dbe9ff]"
          >
            https://mahadbt.maharashtra.gov.in/Login/Login
          </a>
        </section>

        <section className="relative overflow-hidden border border-brand-gold/60 bg-gradient-to-br from-[#0d2d56] via-[#123963] to-[#194978] p-5 text-white shadow-[0_18px_40px_-22px_rgba(13,45,86,0.8)] sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-gold/15" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative z-10 space-y-6">
            <div className="border-l-4 border-brand-gold pl-4">
              <h3 className="text-2xl font-display font-bold text-brand-gold sm:text-3xl">College Payment Details</h3>
              <p className="mt-2 text-[16px] font-semibold leading-7 text-white/95">
                DEMAND DRAFT/ PAY ORDER SHOULD BE IN FAVOUR OF VIDYAVARDHINI'S COLLEGE OF ENGINEERING & TECHNOLOGY AND PAYABLE MUMBAI
              </p>
            </div>

            <p className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-[16px] leading-7 text-white/95">
              Those students who desire to pay Fees through RTGS/NEFT (ONLINE PAYMENT) note the following bank details.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {paymentDetails.map((item) => (
                <article key={item.label} className="border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-[2px]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-gold/90">{item.label}</p>
                  <p className="mt-1 text-[17px] font-semibold leading-7 text-white">{item.value}</p>
                </article>
              ))}
            </div>

            <p className="border border-brand-gold/60 bg-brand-gold/15 px-4 py-3 text-[16px] font-semibold leading-7 text-white">
              Those students who are avail this facility compulsory write Transaction details (UTR No.) on admission form.
            </p>
          </div>
        </section>
      </div>
    </MMSLayout>
  );
}
