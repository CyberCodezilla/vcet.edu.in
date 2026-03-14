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

export const authApi = {
  /** POST /api/auth/login — returns { success, message, user } */
  login: (payload: LoginPayload) =>
    client.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /** GET /api/auth/me — returns the authenticated user */
  me: () =>
    client.request<AuthUserResponse>("/auth/me", {
      method: "GET",
    }),

  /** POST /api/auth/logout — ends the authenticated session */
  logout: () =>
    client.request<{ success: boolean; message: string }>("/auth/logout", {
      method: "POST",
    }),
};
