import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  type PostBody,
  type PostResponse,
} from "@src/api/posts";

/** 게시글 생성 */
export const useCreatePost = () =>
  useMutation({
    mutationFn: (body: PostBody) => createPost(body),
  });

/** 게시글 수정 */
export const useUpdatePost = () =>
  useMutation({
    mutationFn: ({ id, body }: { id: string; body: PostBody }) =>
      updatePost(id, body),
  });

/** 게시글 삭제 */
export const useDeletePost = () =>
  useMutation({
    mutationFn: (id: string) => deletePost(id),
  });

/** 게시글 전체 조회 */
export const useAllPosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

/** 게시글 단일 조회 */
export const usePostDetail = (id: string) =>
  useQuery<PostResponse>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
