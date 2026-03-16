import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementDataTableCard } from './MMSPlacementShared';

type InternshipRow = {
  srNo: number;
  studentName: string;
  specialization: string;
  company: string;
};

const internshipRows: InternshipRow[] = [
  { srNo: 1, studentName: 'AKSARI ASANIN KITMA SAHEB', specialization: 'Finance', company: 'ASHIVERA ACADEMY' },
  { srNo: 2, studentName: 'BHABOWAI NCHA AJAY', specialization: 'Finance', company: 'SAMCO SECURITIES LIMITED' },
  { srNo: 3, studentName: 'BORKAR MOSHKADA DEEPAK', specialization: 'Finance', company: 'FIDUCIARY CAPITAL' },
  { srNo: 4, studentName: 'CHAVAN AAOITI RAVINDRA', specialization: 'Finance', company: 'DARKA MACHINOX LIMITED' },
  { srNo: 5, studentName: 'CHAVAN SATISH PRAKASH', specialization: 'Finance', company: 'DIAGEO' },
  { srNo: 6, studentName: 'DAVANE BHUMIRKA VIJAY', specialization: 'HR', company: 'SELF PLACED (IPCA)' },
  { srNo: 7, studentName: 'GIRANT KRUIK SUNIL', specialization: 'Finance', company: 'SYNERGY' },
  { srNo: 8, studentName: 'GOHLI PRIVARKA ABULIN', specialization: 'HR', company: 'WORKING' },
  { srNo: 9, studentName: 'GORAD AKSHAY SURESH', specialization: 'Finance', company: 'SARAI INFRA PVT LTD.' },
  { srNo: 10, studentName: 'JADHAV ADTI MAHENDRA', specialization: 'HR', company: 'JAMAYA TECH' },
  { srNo: 11, studentName: 'JAEIHWA SUHBANI DUTTATARY', specialization: 'Finance', company: 'ASPIRING MINDS' },
  { srNo: 12, studentName: 'HIA BIUPENDRA BIPIN', specialization: 'Marketing', company: 'SYNERGY' },
  { srNo: 13, studentName: 'KADAM SABRIJA DINESH', specialization: 'Marketing', company: 'WORKING' },
  { srNo: 14, studentName: 'KALE ASHWINI SADASHIY', specialization: 'Marketing', company: 'SELF PLACED' },
  { srNo: 15, studentName: 'KAMBLE DIKSHA GAUTAM', specialization: 'Finance', company: 'ASHIVERA ACADEMY' },
  { srNo: 16, studentName: 'KAMBLE FUHAN SHIVAI', specialization: 'Finance', company: 'S-K CONSTRUCTION' },
  { srNo: 17, studentName: 'KOTISH SHIVANI RAVI', specialization: 'Finance', company: 'PARLE' },
  { srNo: 18, studentName: 'KUMARI SHERYA ANIL KUMAR', specialization: 'Marketing', company: 'D B CORP. LIMITED- RADIO DIVISION' },
  { srNo: 19, studentName: 'MOHATE RIYA BAPUNOV', specialization: 'HR', company: 'PARLE' },
  { srNo: 21, studentName: 'PAGI DHIRAJ SUNIL', specialization: 'Finance', company: 'ASHIVERA ACADEMY' },
  { srNo: 22, studentName: 'PATEL SUSHANT KAMIJIHAI', specialization: 'Finance', company: 'MANGRUM MOTORS' },
  { srNo: 23, studentName: 'PATEL VASI JAYANTI', specialization: 'Finance', company: 'INTEGRATION' },
  { srNo: 24, studentName: 'PATIL AAYUHL KIRAN', specialization: 'Finance', company: 'SUJAN' },
  { srNo: 25, studentName: 'PATIL SRINISHI SHIRISH', specialization: 'HR', company: 'ASPER PACKAGING' },
  { srNo: 26, studentName: 'PETIL TUBA BUBANI', specialization: 'HR', company: 'IPCA' },
  { srNo: 27, studentName: 'PERERIA SHEHAL DABRYL', specialization: 'marketing', company: 'SELF ENTREPRENEUR' },
  { srNo: 28, studentName: 'RAUBUBA SACHIN MAHENDRA', specialization: 'Finance', company: 'ASPIRING MINDS' },
  { srNo: 29, studentName: 'RAUT AVANI BIUPENDRA', specialization: 'HR', company: 'PERFECT CONTAINERS' },
  { srNo: 30, studentName: 'RAUF PRANJAL SAHIZEHI', specialization: 'Finance', company: 'ASRI DUVAS' },
  { srNo: 30, studentName: 'NIKAM OMKAR MAGESH', specialization: 'Finance', company: 'SAMCO SECURITIES LIMITED' },
  { srNo: 31, studentName: 'RAUT RIVA RAKESH', specialization: 'Finance', company: 'KRUPA ENTERPRISES' },
  { srNo: 32, studentName: 'SAWANT SHRUTI BIGIETH', specialization: 'Marketing', company: 'INNOVATION SIGNALS ACADEMY' },
  { srNo: 33, studentName: 'SAVIANY UPDANT SAKHARA', specialization: 'Finance', company: 'SUNRISE PROCESS EQUIPMENT PVT. LTD.' },
  { srNo: 34, studentName: 'SINGH AARIT SUDAIMA', specialization: 'Finance', company: 'JABUAJ ENTERPRISES PVT. LTD.' },
  { srNo: 35, studentName: 'SINGH AYUSH KUNWAR', specialization: 'Marketing', company: 'SUJAN' },
  { srNo: 36, studentName: 'SINGH AYUSH SANJAY', specialization: 'Finance', company: 'ASPIRING MINDS' },
  { srNo: 37, studentName: 'SINGH KAREDNA ASHOK', specialization: 'Finance', company: 'VASS ENGINEERING SERVICE LLP' },
  { srNo: 38, studentName: 'SINGH KUPAI HEMANTKUMAR', specialization: 'Finance', company: 'SAMCO SECURITIES LIMITED' },
  { srNo: 39, studentName: 'SINGH ASHIKA SAKAR', specialization: 'HR', company: 'SUJAN' },
  { srNo: 40, studentName: 'SHAHD VAISHANKAR RAHUL', specialization: 'HR', company: 'PARLE' },
  { srNo: 41, studentName: 'TAKEKAR SANIKA MILIND', specialization: 'Finance', company: 'QIBITCON' },
  { srNo: 42, studentName: 'TEMKER SHAMIRKA SANJAY', specialization: 'Finance', company: 'PARLE' },
  { srNo: 43, studentName: 'THOPTE KANISHKA KIRAN', specialization: 'Finance', company: 'PATHAY SALZKARI PATPOSHI' },
  { srNo: 44, studentName: 'VISHWAKARMA JYOTI ONGRAKASH', specialization: 'IT', company: 'ASPIRING MINDS & SYNERGY' },
  { srNo: 45, studentName: 'VAGHDMARE ROHAN DNYANES', specialization: 'Marketing', company: 'SUNRISE EQUIPMENTS' },
];

export default function MMSPlacementInternships() {
  return (
    <MMSLayout title="List of Students placed For OJT and Summer Internship">
      <PlacementDataTableCard title="List of Students placed For OJT and Summer Internship">
        <div className="overflow-hidden border border-brand-navy/20 bg-white">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="text-white">
                <th className="w-[9%] border border-[#0a325f] bg-[#0d4888] px-2 py-2 text-left text-xs font-bold sm:text-sm">Sr.No</th>
                <th className="w-[40%] border border-[#0a325f] bg-[#0d4888] px-2 py-2 text-left text-xs font-bold sm:text-sm">Student Name</th>
                <th className="w-[18%] border border-[#0a325f] bg-[#0d4888] px-2 py-2 text-left text-xs font-bold sm:text-sm">Specialization</th>
                <th className="w-[33%] border border-[#0a325f] bg-[#0d4888] px-2 py-2 text-left text-xs font-bold sm:text-sm">Company</th>
              </tr>
            </thead>
            <tbody>
              {internshipRows.map((row, index) => (
                <tr key={`${row.srNo}-${row.studentName}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-brand-light/18'}>
                  <td className="border border-slate-700/80 px-2 py-2 text-[11px] text-slate-900 sm:text-xs">{row.srNo}</td>
                  <td className="border border-slate-700/80 px-2 py-2 text-[11px] text-slate-900 sm:text-xs">
                    <span className="block overflow-hidden whitespace-nowrap text-ellipsis">{row.studentName}</span>
                  </td>
                  <td className="border border-slate-700/80 px-2 py-2 text-[11px] text-slate-900 sm:text-xs">
                    <span className="block overflow-hidden whitespace-nowrap text-ellipsis">{row.specialization}</span>
                  </td>
                  <td className="border border-slate-700/80 px-2 py-2 text-[11px] text-slate-900 sm:text-xs">
                    <span className="block overflow-hidden whitespace-nowrap text-ellipsis">{row.company}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PlacementDataTableCard>
    </MMSLayout>
  );
}
