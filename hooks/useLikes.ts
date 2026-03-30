import { useEffect, useState } from "react";
import { likeSlide } from "../src/features/auth/api";
import { useAuth } from "../src/features/auth/AuthContext";

export function useLikes(slideId: number) {
  const { user } = useAuth();
  const [likes, setLikes] = useState<number>(0);
  const [error, setError] = useState("");

  async function sendLike() {
    if (!user) {
      setError("Jābūt ielogotam, lai nospiestu Like");
      return;
    }

    try {
      const result = await likeSlide(slideId, user.id);
      setLikes(result.likes);
    } catch {
      setError("Neizdevās pievienot like");
    }
  }

  // Automātiski ielādē like skaitu no DB
  useEffect(() => {
    fetch(`https://backend-so4g.onrender.com/api/slides/${slideId}/likes`)
      .then((r) => r.json())
      .then((d) => setLikes(d.likes))
      .catch(() => setError("Neizdevās ielādēt like skaitu"));
  }, [slideId]);

  return { likes, sendLike, error };
}
