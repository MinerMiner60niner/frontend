import type { Slide } from "./types";

const API_URL = "https://backend-so4g.onrender.com";

export async function fetchSlides(): Promise<Slide[]> {
  const res = await fetch(`${API_URL}/api/slides`);
  return res.json();
}
