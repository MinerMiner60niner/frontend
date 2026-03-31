import type { AuthResponse } from "./types";

const API_URL = "https://backend-so4g.onrender.com";

export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Neizdevās reģistrēties");
  return res.json();
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Nepareizs e-pasts vai parole");
  return res.json();
}

export async function likeSlide(slideId: number, userId: number) {
  const res = await fetch(`${API_URL}/api/slides/${slideId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Neizdevās nospiest like");
  return res.json();
}