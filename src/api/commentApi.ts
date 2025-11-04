import api from "./index";

export const createComment = async (postId: string, content: string) => {
  const res = await api.post(`/comments/${postId}`, { content });
  return res.data;
};

export const updateComment = async (commentId: number, content: string) => {
  const res = await api.patch(`/comments/${commentId}`, { content });
  return res.data;
};

export const deleteComment = async (commentId: number) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};
