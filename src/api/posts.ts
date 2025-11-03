import api from "./client";

export type PostBlockText = { type: "TEXT"; order: number; content: string };
export type PostBlockImage = { type: "IMAGE"; order: number; url: string };
export type PostBlock = PostBlockText | PostBlockImage;

export type PostSummary = {
  id: number;
  title: string;
  createdAt: string;
  author: { nickname: string };
  thumbnailUrl?: string;
  commentCount: number;
  excerpt?: string;
};

export type PageResult<T> = {
  data: T[];
  page: number;
  totalPages: number;
};

export type PostDetail = {
  id: number;
  title: string;
  createdAt: string;
  author: { nickname: string; avatarUrl?: string; introduction?: string };
  blocks: PostBlock[];
  comments: Array<{
    id: number;
    content: string;
    createdAt: string;
    mine?: boolean;
    author: { nickname: string; avatarUrl?: string };
  }>;
  mine?: boolean;
};

export async function getPosts(page: number, size: number) {
  const res = await api.get<PageResult<PostSummary>>("/posts", {
    params: { page, size },
  });
  return res.data;
}

export async function getPostDetail(id: number) {
  const res = await api.get<PostDetail>(`/posts/${id}`);
  return res.data;
}

export async function createPost(payload: { title: string; blocks: PostBlock[] }) {
  const res = await api.post<{ id: number }>("/posts", payload);
  return res.data;
}

export async function updatePost(id: number, payload: { title: string; blocks: PostBlock[] }) {
  const res = await api.put(`/posts/${id}`, payload);
  return res.data;
}

export async function deletePost(id: number) {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
}
