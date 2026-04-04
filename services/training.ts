import { get } from './api';

export interface TrainingProgram {
  icon: string;
  title: string;
  description: string;
}

export interface TrainingStat {
  icon: string;
  value: string;
  label: string;
}

export interface TrainingData {
  slug: string;
  programs: TrainingProgram[];
  stats: TrainingStat[];
  highlights: string[];
  mainContent: string[];
  events: any[];
  careerGuidance: any[];
  internship: any[];
  gallery: any[];
}

/**
 * Fetch training section data from API
 */
export async function getTrainingSection(): Promise<TrainingData> {
  try {
    const response = await get<{ data: TrainingData }>('/pages/student-career/training');
    return response.data || {
      slug: 'training',
      programs: [],
      stats: [],
      highlights: [],
      mainContent: [],
      events: [],
      careerGuidance: [],
      internship: [],
      gallery: [],
    };
  } catch (error) {
    console.error('Error fetching training section:', error);
    return {
      slug: 'training',
      programs: [],
      stats: [],
      highlights: [],
      mainContent: [],
      events: [],
      careerGuidance: [],
      internship: [],
      gallery: [],
    };
  }
}
