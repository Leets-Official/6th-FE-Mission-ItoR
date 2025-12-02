// src/hooks/useBlogDetail.ts
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostDetail, useDeletePost, useCreateComment, useDeleteComment } from '@/hooks/usePosts';

export const useBlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- Data Fetching ---
  const { data: post, isLoading, isError, refetch } = usePostDetail(id!);
  const { mutate: deletePost } = useDeletePost();
  const { mutate: createComment } = useCreateComment(id!);
  const { mutate: deleteComment } = useDeleteComment(id!);

  // --- State ---
  const [commentText, setCommentText] = useState('');
  const [toastMessage, setToastMessage] = useState<{
    variant: 'success' | 'warning';
    message: string;
  } | null>(null);
  const [isBlogDeleteModalOpen, setIsBlogDeleteModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState<string | null>(null);

  // --- User & Auth Info ---
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const isAuthor = post?.isOwner ?? false;
  const loggedInUser = {
    nickname: localStorage.getItem('nickname'),
    profilePicture: localStorage.getItem('profilePicture'),
  };

  // --- Derived State ---
  const isCommentSubmitDisabled = !commentText.trim();

  // --- Helper Functions ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted.replace(/,/, '.').replace(/\s(\d{4})/, '$1');
  };

  // --- Event Handlers ---
  const handleBlogDeleteConfirm = () => {
    if (!id) return;
    deletePost(id, {
      onSuccess: () => {
        setToastMessage({ variant: 'success', message: '게시글이 삭제되었습니다!' });
        setTimeout(() => {
          setToastMessage(null);
          navigate('/', { replace: true, state: { showToast: true } });
        }, 1500);
      },
      onError: () => alert('게시글 삭제에 실패했습니다.'),
    });
    setIsBlogDeleteModalOpen(false);
  };

  const handleCommentSubmit = () => {
    if (isCommentSubmitDisabled) return;
    createComment(commentText.trim(), {
      onSuccess: () => {
        setCommentText('');
        refetch(); // Re-fetch post data to show new comment
      },
    });
  };

  const handleDeleteCommentClick = (commentId: string) => {
    setCommentToDeleteId(commentId);
    setIsCommentDeleteModalOpen(true);
  };

  const handleCommentDeleteConfirm = () => {
    if (!commentToDeleteId) return;
    deleteComment(commentToDeleteId, {
      onSuccess: () => {
        setToastMessage({ variant: 'success', message: '댓글이 삭제되었습니다!' });
        setTimeout(() => setToastMessage(null), 1500);
        refetch(); // Re-fetch post data to show updated comment list
      },
      onError: () => {
        setToastMessage({ variant: 'warning', message: '댓글 삭제에 실패했습니다.' });
        setTimeout(() => setToastMessage(null), 1500);
      },
    });
    setIsCommentDeleteModalOpen(false);
    setCommentToDeleteId(null);
  };

  return {
    id,
    post,
    isLoading,
    isError,
    commentText,
    setCommentText,
    toastMessage,
    isBlogDeleteModalOpen,
    setIsBlogDeleteModalOpen,
    isCommentDeleteModalOpen,
    setIsCommentDeleteModalOpen,
    isLoggedIn,
    isAuthor,
    loggedInUser,
    isCommentSubmitDisabled,
    formatDate,
    handleBlogDeleteConfirm,
    handleCommentSubmit,
    handleDeleteCommentClick,
    handleCommentDeleteConfirm,
  };
};
