import api from "@src/api/client";

export async function createComment(postId: string, content: string) {
  // POST /comments/{postId}  body: { content }
  const res = await api.post(`/comments/${postId}`, { content });
  return res.data;
}

export async function updateComment(commentId: number, content: string) {
  // PATCH /comments/{commentId}  body: { content }
  const res = await api.patch(`/comments/${commentId}`, { content });
  return res.data;
}

export async function deleteComment(commentId: number) {
  // DELETE /comments/{commentId}
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
}
