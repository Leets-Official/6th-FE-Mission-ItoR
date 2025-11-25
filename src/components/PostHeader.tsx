// src/components/PostHeader.tsx
import React from "react";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";
import { S } from "@/styles/BlogDetail.styles";

interface PostHeaderProps {
  title: string;
  author: string;
  profileUrl: string | null | undefined;
  createdAt: string;
  commentsCount: number;
  formatDate: (dateString: string) => string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  author,
  profileUrl,
  createdAt,
  commentsCount,
  formatDate,
}) => {
  return (
    <div className={S.postHeader}>
      <h3 className={S.postTitle}>{title}</h3>
      <div className={S.postMeta}>
        {profileUrl ? (
          <img src={profileUrl} alt={author} className="w-6 h-6 rounded-full object-cover" />
        ) : (
          <ProfileIcon className="w-6 h-6" />
        )}
        <span className={S.postMetaAuthor}>{author}</span>
        <span className={S.postMetaSeparator}>·</span>
        <span>{formatDate(createdAt)}</span>
        <span className={S.postMetaSeparator}>·</span>
        <span>댓글 {commentsCount}</span>
      </div>
    </div>
  );
};

export default PostHeader;
