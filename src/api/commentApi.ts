import api from "./index";
import { useAuthStore } from "@/store/useAuthStore";

export const createComment = async (postId: string, content: string) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.post(
    `/comments`,
    { postId, content },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res.data;
};

export const updateComment = async (commentId: number, content: string) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.put(
    `/comments/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res.data;
};

export const deleteComment = async (commentId: number) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
