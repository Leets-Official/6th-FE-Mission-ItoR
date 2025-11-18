import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  createComment,
  deleteComment,
  getMyPosts,
  getPreSignedUrl,
  uploadImageToPreSignedUrl,
  PostBody,
  CommentBody,
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

/** 댓글 생성 */
export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  return useMutation({
    mutationFn: (content: string) => createComment({ postId, content }),
    onSuccess: () => {
      // 댓글 생성 성공 시, 해당 게시글의 쿼리를 정확한 키로 무효화하여 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ["post", postId, isLoggedIn] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "댓글 작성 중 오류가 발생했습니다.";
      console.error("댓글 생성 실패:", message);
      alert(message);
    },
  });
};

/** 댓글 삭제 */
export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      // 댓글 삭제 성공 시, 해당 게시글의 쿼리를 정확한 키로 무효화하여 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ["post", postId, isLoggedIn] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "댓글 삭제 중 오류가 발생했습니다.";
      console.error("댓글 삭제 실패:", message);
      alert(message);
    },
  });
};

/** 내 게시글 조회 */
export const useMyPosts = (page: number) => {
  return useQuery<PostListResponse>({
    queryKey: ["myPosts", page],
    queryFn: () => getMyPosts(page, 10), // size 10 is default
  });
};

/** 게시글 전체 조회 */
export const useAllPosts = (page: number) => {
  return useQuery<PostListResponse>({ // Specify return type
    queryKey: ["posts", page],
    queryFn: async () => getAllPosts(page), // Call getAllPosts directly
  });
};


/** 게시글 단일 조회 */
export const usePostDetail = (id: string) => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  return useQuery<PostDetailResponse>({
    queryKey: ["post", id, isLoggedIn], // 로그인 상태를 쿼리 키에 포함
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};

/** 이미지 업로드 */
export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      // 1. Get pre-signed URL from our backend
      const preSignedUrl = await getPreSignedUrl(file.name);

      // 2. Upload the file to the pre-signed URL
      await uploadImageToPreSignedUrl(preSignedUrl, file);

      // 3. Return the clean URL (without query parameters)
      const cleanUrl = preSignedUrl.split("?")[0];
      return cleanUrl;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ?? "이미지 업로드 중 오류가 발생했습니다.";
      console.error("이미지 업로드 실패:", message);
      alert(message);
    },
  });
};
