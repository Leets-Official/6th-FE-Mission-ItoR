// src/components/CommentSection.tsx
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { S } from '@/styles/BlogDetail.styles';
import { Comment } from '@/api/posts';

interface CommentSectionProps {
  comments: Comment[];
  formatDate: (dateString: string) => string;
  onDeleteClick: (commentId: string) => void;
  isLoggedIn: boolean;
  commentText: string;
  setCommentText: (text: string) => void;
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  loggedInUser: {
    nickname: string | null;
    profilePicture: string | null;
  };
}

const CommentSection: React.FC<CommentSectionProps> = (props) => {
  return (
    <div className={S.commentSectionContainer}>
      <p className={S.commentCount}>
        댓글 <span className="text-[#00A1FF]">{props.comments.length}</span>
      </p>
      <CommentList
        comments={props.comments}
        formatDate={props.formatDate}
        onDeleteClick={props.onDeleteClick}
      />

      {props.comments.length === 0 && (
        <p className="font-light text-sm leading-relaxed tracking-tight text-center my-4 text-gray-600">
          작성된 댓글이 없습니다.
          <br />
          응원의 첫 번째 댓글을 달아주세요.
        </p>
      )}

      <CommentForm
        isLoggedIn={props.isLoggedIn}
        commentText={props.commentText}
        setCommentText={props.setCommentText}
        isSubmitDisabled={props.isSubmitDisabled}
        onSubmit={props.onSubmit}
        loggedInUser={props.loggedInUser}
      />
    </div>
  );
};

export default CommentSection;
