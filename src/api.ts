import type { Slide } from "./types";

const API_URL = "https://YOUR-RENDER-URL.onrender.com";

export async function fetchSlides(): Promise<Slide[]> {
  const res = await fetch(`${API_URL}/api/slides`);
  return res.json();
}
