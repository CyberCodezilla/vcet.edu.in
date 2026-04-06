import { client } from "./client";
import type { User } from "../types";

export interface LoginPayload {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface AuthUserResponse {
  success: boolean;
  user: User;
}

// Keep auth mode aligned with the rest of admin APIs.
const USE_MOCK = import.meta.env.VITE_MOCK_AUTH === 'true';

const MOCK_USER: User = {
  id: 1,
  username: 'admin',
  full_name: 'System Administrator',
  role: 'super',
};

export const authApi = {
  /** POST /api/auth/login — returns { success, message, user } */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    if (USE_MOCK) {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 500));
      return {
        success: true,
        message: 'Login successful (Mock)',
        user: MOCK_USER,
      };
    }
    return client.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** GET /api/auth/me — returns the authenticated user */
  me: async (): Promise<AuthUserResponse> => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 200));
      return {
        success: true,
        user: MOCK_USER,
      };
    }
    return client.request<AuthUserResponse>("/auth/me", {
      method: "GET",
    });
  },

  /** POST /api/auth/logout — ends the authenticated session */
  logout: async (): Promise<{ success: boolean; message: string }> => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 300));
      return { success: true, message: 'Logged out (Mock)' };
    }
    return client.request<{ success: boolean; message: string }>("/auth/logout", {
      method: "POST",
    });
  },
};

