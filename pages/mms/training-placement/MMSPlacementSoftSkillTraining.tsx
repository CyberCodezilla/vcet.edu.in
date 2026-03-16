import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';

export default function MMSPlacementSoftSkillTraining() {
  return (
    <MMSLayout title="Soft Skill Training">
      <PlacementSectionCard
        title="Soft Skill Training"
        subtitle="Training Session Organized by: Placement and Training Department"
      >
        <div className="space-y-4 text-[17px] leading-8 text-slate-700">
          <p>
            The five-day Soft Skills Development training program, organized by the Placement and Training Department in
            collaboration with Campus Credential, provided First Year MMS students with a holistic approach to career
            readiness. The program commenced with Mr. Sameer Shaikh introducing students to essential soft skills,
            effective group discussion strategies, and personal interview preparation techniques through interactive and
            practical exercises.
          </p>
          <p>
            Over the next three days, under the guidance of Prashant Sir, students enhanced their interpersonal and
            communication abilities through various team-based activities and simulations. They were also trained in
            professional resume writing and personal branding, including building strong LinkedIn profiles tailored for
            the job market. The sessions continued with the analysis of real-world case studies, helping students apply
            theoretical knowledge to practical business scenarios and strengthen their problem-solving skills.
          </p>
          <p>
            On the final day, Ms. Roopsy Sonkar conducted an intensive session on interview techniques and behavioral
            training, preparing students for various interview formats including HR, technical, and panel rounds. She
            also emphasized the importance of professional conduct and introduced effective writing skills essential for
            the corporate world, such as email and report writing. Overall, the program significantly boosted the
            students&apos; confidence, refined their communication and presentation skills, and equipped them with practical
            tools and strategies to excel in campus placements and future careers. These Seminar Served as Eye opener
            for many students and Gave them clear road map for preparation journey towards Corporate, 35 Students
            participated in this Session.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PlacementImageHolder label="Soft Skill Session 01" size="large" />
          <PlacementImageHolder label="Soft Skill Session 02" size="large" />
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
