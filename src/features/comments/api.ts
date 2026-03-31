import type { Comment } from "./types";

const API_URL = "https://backend-so4g.onrender.com";

export async function fetchComments(slideId: number): Promise<Comment[]> {
  const res = await fetch(`${API_URL}/api/comments/${slideId}`);
  if (!res.ok) throw new Error("Neizdevās ielādēt komentārus");
  return res.json();
}

export async function postComment(
  slideId: number,
  userId: number,
  text: string
): Promise<Comment> {
  const res = await fetch(`${API_URL}/api/comments/${slideId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text }),
  });

  if (!res.ok) throw new Error("Neizdevās pievienot komentāru");
  return res.json();
}

export async function deleteCommentApi(slideId: number, commentId: number) {
  const res = await fetch(
    `${API_URL}/api/comments/${slideId}/${commentId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Neizdevās dzēst komentāru");
  return res.json();
}
