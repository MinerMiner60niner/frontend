import type { AuthResponse } from "./types";
import { api } from "../../lib/axios";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });
  return res.data;
}

export async function likeSlide(slideId: number, userId: number) {
  const res = await api.post(`/api/slides/${slideId}/like`, { userId });
  return res.data;
}
