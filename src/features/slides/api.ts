import type { Slide } from "./types";
import { api } from "../../lib/axios";

export async function fetchSlides(): Promise<Slide[]> {
  const res = await api.get<Slide[]>("/api/slides");
  return res.data;
}
