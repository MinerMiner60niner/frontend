import { useEffect, useState } from "react";
import { likeSlide } from "../features/auth/api";
import { useAuth } from "../features/auth/AuthContext";

export function useLikes(slideId: number) {
  const { user } = useAuth();
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false); // Pievienojam šo!
  const [error, setError] = useState("");

  async function sendLike() {
    if (!user) {
      setError("Jābūt ielogotam, lai nospiestu Like");
      return;
    }

    try {
      const result = await likeSlide(slideId, user.id);
      setLikes(result.likes);
      setIsLiked(!isLiked); // Pārslēdzam lokālo stāvokli pēc veiksmīga pieprasījuma
      setError(""); 
    } catch {
      setError("Neizdevās pievienot like");
    }
  }

  useEffect(() => {
    // Ja backend atbalsta, padodam userId, lai zinātu, vai šis lietotājs jau ir nospiedis like
    const url = `https://backend-so4g.onrender.com/api/slides/${slideId}/likes${user ? `?userId=${user.id}` : ""}`;
    
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

  // Tagad atgriežam arī isLiked
  return { likes, isLiked, sendLike, error };
}