// src/components/CommentList.tsx
import React from 'react';
import ProfileIcon from '@/assets/svgs/Profile.svg?react';
import DropdownMenu from './DropdownMenu';
import MoreVertIcon from '@/assets/svgs/more_vert.svg?react';
import { S } from '@/styles/BlogDetail.styles';
import { Comment } from '@/api/posts';

interface CommentListProps {
  comments: Comment[];
  formatDate: (dateString: string) => string;
  onDeleteClick: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, formatDate, onDeleteClick }) => {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className={S.commentListContainer}>
      {comments.map((comment) => (
        <div key={comment.commentId} className={S.commentItemWrapper}>
          <div className={S.commentItemHeader}>
            {comment.profileUrl ? (
              <img
                src={comment.profileUrl}
                alt={comment.nickName}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <ProfileIcon className="w-7 h-7" />
            )}
            <div>
              <span className={S.commentItemAuthor}>{comment.nickName}</span>
              <p className={S.commentItemDate}>{formatDate(comment.createdAt)}</p>
            </div>
          </div>
          <p className={S.commentItemContent}>{comment.content}</p>
          {comment.isOwner && (
            <div className={S.commentItemMenu}>
              <DropdownMenu
                trigger={<MoreVertIcon className={S.commentItemMenuIcon} />}
                items={[{ label: '삭제하기', onClick: () => onDeleteClick(comment.commentId) }]}
                position="right"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
