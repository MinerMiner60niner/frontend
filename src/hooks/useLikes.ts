import { useEffect, useState } from "react";
import { likeSlide } from "../features/auth/api";
import { useAuth } from "../features/auth/AuthContext";

const API_URL = "https://backend-so4g.onrender.com";

export function useLikes(slideId: number) {
  const { user } = useAuth();
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState("");

  async function sendLike() {
    if (!user) {
      setError("Jābūt ielogotam, lai nospiestu Like");
      return;
    }

    try {
      const result = await likeSlide(slideId, user.id);
      setLikes(result.likes);
      setIsLiked(!isLiked);
      setError("");
    } catch {
      setError("Neizdevās pievienot like");
    }
  }

  useEffect(() => {
    const url = `${API_URL}/api/slides/${slideId}/likes${
      user ? `?userId=${user.id}` : ""
    }`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setLikes(d.likes);
        if (d.userHasLiked !== undefined) {
          setIsLiked(d.userHasLiked);
        }
      })
      .catch(() => setError("Neizdevās ielādēt datus"));
  }, [slideId, user]);

  return { likes, isLiked, sendLike, error };
}
