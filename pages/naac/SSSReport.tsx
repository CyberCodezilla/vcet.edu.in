import React from 'react';
import './SSSReport.css';

const sssReportLinks = [
  {
    label: 'SSS Report 2022-23',
    href: 'https://vcet.edu.in/wp-content/uploads/2024/03/SSS-2022-23_Report.pdf',
  },
  {
    label: 'SSS Report 2021-22',
    href: 'https://vcet.edu.in/wp-content/uploads/2024/03/SSS-2021-22_Report.pdf',
  },
  {
    label: 'SSS Report 2020-21',
    href: 'https://vcet.edu.in/wp-content/uploads/2024/03/SSS-2020-21_Report.pdf',
  },
  {
    label: 'SSS Report 2019-20',
    href: 'https://vcet.edu.in/wp-content/uploads/2024/03/SSS-2019-20_Report.pdf',
  },
  {
    label: 'SSS Report 2018-19',
    href: 'https://vcet.edu.in/wp-content/uploads/2024/03/SSS-2018-19_Report.pdf',
  },
];

const SSSReport: React.FC = () => {
  return (
    <div className="sssr-page">
      <header className="sssr-hero">
        <div className="sssr-hero-content">
          <h1 className="sssr-title">SSS Report</h1>
          <div className="sssr-breadcrumb">Home &raquo; SSS Report</div>
        </div>
      </header>

      <main className="sssr-content">
        <div className="sssr-grid">
          <div className="sssr-column">
            {sssReportLinks.slice(0, 3).map((item) => (
              <a
                key={item.label}
                className="sssr-tab"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="sssr-column">
            {sssReportLinks.slice(3).map((item) => (
              <a
                key={item.label}
                className="sssr-tab"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="sssr-footer">VCET NAAC SSS Report</footer>
    </div>
  );
};

export default SSSReport;
