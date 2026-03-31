import { useEffect, useState } from "react";
import { likeSlide } from "../features/auth/api";
import { api } from "../lib/axios";
import { useAuth } from "../features/auth/AuthContext";

export function useLikes(slideId: number) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
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
    api
      .get(`/api/slides/${slideId}/likes`, {
        params: user ? { userId: user.id } : {},
      })
      .then((res) => {
        setLikes(res.data.likes);
        if (res.data.userHasLiked !== undefined) {
          setIsLiked(res.data.userHasLiked);
        }
      })
      .catch(() => setError("Neizdevās ielādēt datus"));
  }, [slideId, user]);

  return { likes, isLiked, sendLike, error };
}
