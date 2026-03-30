import { useEffect, useState } from "react";
import { fetchComments, postComment, deleteCommentApi } from "../features/comments/api";
import type { Comment } from "../features/comments/types";
import { useAuth } from "../hooks/useAuth";

export function useComments(slideId: number) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchComments(slideId);
      setComments(data);
    } catch {
      setError("Neizdevās ielādēt komentārus");
    } finally {
      setLoading(false);
    }
  }

  async function addComment(text: string) {
    if (!user) {
      setError("Jābūt ielogotam, lai pievienotu komentāru");
      return;
    }

    try {
      const newComment = await postComment(slideId, user.id, text);
      setComments(prev => [...prev, newComment]);
    } catch {
      setError("Neizdevās pievienot komentāru");
    }
  }

  async function deleteComment(id: number) {
    try {
      await deleteCommentApi(id);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch {
      setError("Neizdevās dzēst komentāru");
    }
  }

  useEffect(() => {
    load();
  }, [slideId]);

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    reload: load
  };
}
