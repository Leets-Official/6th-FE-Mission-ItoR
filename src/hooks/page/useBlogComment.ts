import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { useModalStore } from '@/stores/useModalStore';
import type { Comment, PostDetail } from '@/types/blog';

/**
 * BlogComment 비즈니스 로직
 * - 댓글 등록 및 삭제 기능
 */
export const useBlogComment = (initialComments: Comment[], currentUserNickName: string) => {
  const { id } = useParams();
  const { showToast } = useToast();
  const { openModal, closeModal } = useModalStore();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // 댓글 등록
  const handleCommentSubmit = (content: string) => {
    // TODO: API 연결 시 삭제예정 - localStorage에서 게시글 찾기
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const postIndex = savedPosts.findIndex((p: PostDetail) => p.postId === Number(id));

    if (postIndex === -1) {
      showToast('게시글을 찾을 수 없습니다', 'warning');
      return;
    }

    // 새 댓글 생성
    const newComment: Comment = {
      commentId: Date.now(), // 임시 ID
      content,
      nickName: currentUserNickName,
      profileUrl: '',
      createdAt: new Date().toISOString(),
      isOwner: true,
    };

    // localStorage 업데이트
    savedPosts[postIndex].comments = [...savedPosts[postIndex].comments, newComment];
    localStorage.setItem('blogPosts', JSON.stringify(savedPosts));

    // 화면 업데이트
    setComments([...comments, newComment]);
    showToast('댓글이 등록되었습니다', 'positive');
  };

  // 댓글 삭제 모달 열기
  const handleCommentDeleteClick = (commentId: number) => {
    setDeleteTargetId(commentId);
    openModal('delete', undefined, () => confirmCommentDelete(), '삭제하기');
  };

  // 댓글 삭제 확인
  const confirmCommentDelete = () => {
    if (deleteTargetId === null) {
      return;
    }

    // TODO: API 연결 시 삭제예정 - localStorage에서 게시글 찾기
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const postIndex = savedPosts.findIndex((p: PostDetail) => p.postId === Number(id));

    if (postIndex === -1) {
      showToast('게시글을 찾을 수 없습니다', 'warning');
      closeModal();
      return;
    }

    // localStorage에서 댓글 삭제
    savedPosts[postIndex].comments = savedPosts[postIndex].comments.filter(
      (c: Comment) => c.commentId !== deleteTargetId
    );
    localStorage.setItem('blogPosts', JSON.stringify(savedPosts));

    // 화면 업데이트
    setComments(comments.filter(c => c.commentId !== deleteTargetId));
    showToast('댓글이 삭제되었습니다', 'positive');
    setDeleteTargetId(null);
    closeModal();
  };

  return {
    comments,
    handleCommentSubmit,
    handleCommentDeleteClick,
  };
};
