import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  PostBody,
  PostDetailResponse,
  PostListResponse,
} from "@/api/posts";
import { AxiosError } from "axios";

/** 게시글 생성 */
export const useCreatePost = () =>
  useMutation({
    mutationFn: (body: PostBody) => createPost(body),
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "게시글 생성 중 오류가 발생했습니다.";
      console.error("게시글 생성 실패:", message);
      alert(message);
    },
  });

/** 게시글 수정 */
export const useUpdatePost = () =>
  useMutation({
    mutationFn: ({ id, body }: { id: string; body: PostBody }) =>
      updatePost(id, body),
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "게시글 수정 중 오류가 발생했습니다.";
      console.error("게시글 수정 실패:", message);
      alert(message);
    },
  });

/** 게시글 삭제 */
export const useDeletePost = () =>
  useMutation({
    mutationFn: (id: string) => deletePost(id),
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "게시글 삭제 중 오류가 발생했습니다.";
      console.error("게시글 삭제 실패:", message);
      alert(message);
    },
  });

/** 게시글 전체 조회 */
export const useAllPosts = (page: number) => {
  return useQuery<PostListResponse>({ // Specify return type
    queryKey: ["posts", page],
    queryFn: async () => getAllPosts(page), // Call getAllPosts directly
  });
};


/** 게시글 단일 조회 */
export const usePostDetail = (id: string) =>
  useQuery<PostDetailResponse>({ // Updated return type
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
