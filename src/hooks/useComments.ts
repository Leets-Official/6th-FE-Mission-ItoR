import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, updateComment } from "@src/api/comments";
import { usePostDetail } from "@src/hooks/usePosts";

/** 댓글 목록 훅 **/
export function useComments(postId: string) {
  const num = Number(postId);
  const validNum = Number.isFinite(num) && num > 0 ? num : 0;

  const { data } = usePostDetail(validNum);

  type ServerComment = {
    id?: number;
    commentId?: number;
    content?: string;
    createdAt?: string;
    author?: { nickname?: string; avatarUrl?: string };
    nickName?: string;
    profileUrl?: string;
    mine?: boolean;
    isOwner?: boolean;
  };

  type PostDetailWithComments = { comments?: ServerComment[] } | null | undefined;

  const post = data as PostDetailWithComments;
  const comments: ServerComment[] = Array.isArray(post?.comments) ? post!.comments! : [];

  return { data: comments };
}

export function useCreateComment(postId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}

export function useUpdateComment(postId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: { commentId: number; content: string }) =>
      updateComment(args.commentId, args.content),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}

export function useDeleteComment(postId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}
