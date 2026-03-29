// Central MMS API endpoint map.
// Keep every MMS URL segment here so backend alignment is easy to maintain.
export const MMS_ENDPOINTS = {
  home: '/mms/home',
  homeImages: '/mms/home/images',
  about: '/mms/about',
  aboutImages: '/mms/about/images',
  principalsDesk: '/mms/about/principals-desk',
  hodsDesk: '/mms/about/hods-desk',
  faculty: '/mms/about/faculty',
  visionMission: '/mms/about/vision-mission',
  dab: '/mms/about/dab',
  programOutcomes: '/mms/about/program-outcomes',
  admission: '/mms/admission',
  experientialLearning: '/mms/experiential-learning',
  experientialImages: '/mms/experiential-learning/images',
  training: '/mms/training-placement/training',
  trainingImages: '/mms/training-placement/training/images',
  placement: '/mms/training-placement/placement',
  placementImages: '/mms/training-placement/placement/images',
  studentsLife: '/mms/students-life',
  studentsLifeImages: '/mms/students-life/images',
  facilities: '/mms/facilities',
  facilitiesImages: '/mms/facilities/images',
  faqs: '/mms/faqs',
  enquiries: '/enquiries',
} as const;

export type MmsEndpointKey = keyof typeof MMS_ENDPOINTS;
