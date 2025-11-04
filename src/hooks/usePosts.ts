// src/hooks/usePosts.ts
import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  type PostBlock,
  type PageResult,
  type PostSummary,
  type PostDetail,
} from "@src/api/posts";

export function usePosts(page: number, size = 10) {
  return useQuery<PageResult<PostSummary>>({
    queryKey: ["posts", page, size],
    queryFn: () => getPosts(page, size),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}

export function usePostDetail(id: string) {
  return useQuery<PostDetail>({
    queryKey: ["post", id],
    queryFn: () => getPostDetail(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation<{ id?: string }, unknown, { title: string; blocks: PostBlock[] }>({
    mutationFn: (payload) => createPost(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost(id: string) {
  const qc = useQueryClient();
  return useMutation<unknown, unknown, { title: string; blocks: PostBlock[] }>({
    mutationFn: (payload) => updatePost(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["post", id] });
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
