import type { Faculty, FacultyPayload } from '../types';
import { mockFacultyApi } from './mockStore';

/**
 * Faculty API service - Strictly using Mock Data (localStorage)
 * The real backend support has been removed as per user request.
 */
export const facultyApi = mockFacultyApi;
