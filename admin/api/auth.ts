import { client } from './client';
import type { User } from '../types';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

// ── Dev / mock mode ──────────────────────────────────────────────────────────
// Set VITE_MOCK_AUTH=true in .env.local to skip the real API entirely.
const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';

const mockLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  // Simulate a small network delay
  await new Promise((r) => setTimeout(r, 400));
  return {
    success: true,
    message: 'Mock login successful',
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: 1,
      username: payload.username || 'admin',
      full_name: 'Dev Admin',
      role: 'super',
    } as User,
  };
};

const mockLogout = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise((r) => setTimeout(r, 200));
  return { success: true, message: 'Logged out' };
};
// ─────────────────────────────────────────────────────────────────────────────

export const authApi = {
  /** POST /api/auth/login — returns { success, message, token, user } */
  login: USE_MOCK
    ? mockLogin
    : (payload: LoginPayload) =>
        client.request<LoginResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),

  /** POST /api/auth/logout — invalidates the Bearer token */
  logout: USE_MOCK
    ? mockLogout
    : () =>
        client.request<{ success: boolean; message: string }>('/auth/logout', { method: 'POST' }),
};
