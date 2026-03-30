import type { LikeResponse } from "./types";

const API_URL = "https://backend-so4g.onrender.com";

export async function likeSlide(
  slideId: number,
  userId: number
): Promise<LikeResponse> {
  const res = await fetch(`${API_URL}/api/slides/${slideId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) throw new Error("Neizdevās pievienot like");
  return res.json();
}
