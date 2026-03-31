import type { Comment } from "./types";
import { api } from "../../lib/axios";

export async function fetchComments(slideId: number): Promise<Comment[]> {
  const res = await api.get<Comment[]>(`/api/comments/${slideId}`);
  return res.data;
}

export async function postComment(
  slideId: number,
  userId: number,
  text: string
): Promise<Comment> {
  const res = await api.post<Comment>(`/api/comments/${slideId}`, {
    userId,
    text,
  });
  return res.data;
}

export async function deleteCommentApi(slideId: number, commentId: number) {
  const res = await api.delete(`/api/comments/${slideId}/${commentId}`);
  return res.data;
}
