import api from "./index";
import { useAuthStore } from "@/store/useAuthStore";
import type { Post } from "@/types/post";

export const fetchPosts = async (page: number, size: number) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.get(`/posts`, {
    params: { page, size },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const fetchPostDetail = async (postId: string) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.get(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const createPost = async (payload: Pick<Post, "title" | "contents">) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.post(`/posts`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const updatePost = async (postId: string, payload: Pick<Post, "title" | "contents">) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.put(`/posts/${postId}`, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const deletePost = async (postId: string) => {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await api.delete(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export type { Post } from "@/types/post";
