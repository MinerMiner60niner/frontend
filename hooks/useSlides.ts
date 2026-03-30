import { useEffect, useState } from "react";
import { fetchSlides } from "../src/features/auth/api";
import type { Slide } from "../src/features/slides/types";

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      const data = await fetchSlides();
      setSlides(data);
    } catch {
      setError("Neizdevās ielādēt slīdus");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { slides, loading, error, reload: load };
}
