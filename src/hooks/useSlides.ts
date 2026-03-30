import { useEffect, useState } from "react";
import { fetchSlides } from "../features/slides/api";
import type { Slide } from "../features/slides/types";

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchSlides();
      setSlides(data);
    } catch (err) {
      setError("Neizdevās ielādēt slidus");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { slides, loading, error, reload: load };
}
