import React from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useBlogDetail } from '@/hooks/useBlogDetail';
import { S } from '@/styles/BlogDetail.styles';
import PostHeader from '@/components/PostHeader';
import PostBody from '@/components/PostBody';
import CommentSection from '@/components/CommentSection';
import AuthorProfile from '@/components/AuthorProfile';
import Done from '@/assets/svgs/done.svg?react';

const BlogDetail: React.FC = () => {
  const hook = useBlogDetail();

  if (hook.isLoading) {
    return <div className={S.loadingOrError}>게시글을 불러오는 중입니다...</div>;
  }
  if (hook.isError || !hook.post) {
    return (
      <div className={`${S.loadingOrError} text-red-500`}>
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className={S.container}>
      {hook.toastMessage && (
        <div className={S.toastContainer}>
          <div
            className={`${S.toastInner} ${hook.toastMessage.variant === 'success' ? S.toastSuccess : S.toastWarning}`}
          >
            <Done className={S.toastIcon} />
            <span className={S.toastText}>{hook.toastMessage.message}</span>
          </div>
        </div>
      )}

      <Header
        variant="detail"
        isLoggedIn={hook.isLoggedIn}
        isAuthor={hook.isAuthor}
        post={hook.post}
        onDelete={() => hook.setIsBlogDeleteModalOpen(true)}
      />

      <PostHeader
        title={hook.post.title}
        author={hook.post.nickName}
        profileUrl={hook.post.profileUrl}
        createdAt={hook.post.createdAt}
        commentsCount={hook.post.comments.length}
        formatDate={hook.formatDate}
      />

      <PostBody contents={hook.post.contents || []} />

      <CommentSection
        comments={hook.post.comments}
        formatDate={hook.formatDate}
        onDeleteClick={hook.handleDeleteCommentClick}
        isLoggedIn={hook.isLoggedIn}
        commentText={hook.commentText}
        setCommentText={hook.setCommentText}
        isSubmitDisabled={hook.isCommentSubmitDisabled}
        onSubmit={hook.handleCommentSubmit}
        loggedInUser={hook.loggedInUser}
      />

      <AuthorProfile
        name={hook.post.nickName}
        introduction={hook.post.introduction}
        profileUrl={hook.post.profileUrl}
      />

      {hook.isBlogDeleteModalOpen && (
        <Modal
          titleLine1="해당 게시글을 삭제하시겠어요?"
          description="삭제된 게시글은 복구할 수 없습니다."
          onClose={() => hook.setIsBlogDeleteModalOpen(false)}
          onConfirm={hook.handleBlogDeleteConfirm}
          variant="delete"
        />
      )}

      {hook.isCommentDeleteModalOpen && (
        <Modal
          titleLine1="댓글을 삭제할까요?"
          onClose={() => hook.setIsCommentDeleteModalOpen(false)}
          onConfirm={hook.handleCommentDeleteConfirm}
          variant="delete"
        />
      )}
    </div>
  );
};

export default BlogDetail;
