import React from "react";
import clsx from "clsx";
import { type Post } from "@/api/Dummy";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const hasPhoto = !!post.photoUrl;

  return (
    <div className="w-[688px] border-b border-gray-200 pb-6">
      <div
        className={clsx(
          "flex justify-between items-start w-full gap-4",
          hasPhoto ? "flex-row" : "flex-col"
        )}
      >
        <div
          className={clsx(
            "flex flex-col justify-between",
            hasPhoto ? "w-[540px]" : "w-full"
          )}
        >
          <h3 className="font-[Noto Sans KR] font-medium text-[16px] leading-[160%] text-gray-900 line-clamp-1">
            {post.title}
          </h3>

          <p className="font-[Noto Sans KR] font-normal text-[14px] text-gray-700 leading-[160%] line-clamp-2 mt-1">
            {post.content}
          </p>

          <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mt-3">
            <img
              src={post.profileUrl}
              alt={post.author}
              className="w-[20px] h-[20px] rounded-full object-cover"
            />
            <span>{post.author}</span>
            <span className="text-gray-300">·</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="text-gray-300">·</span>
            <span>댓글 {post.commentsCount}</span>
          </div>
        </div>

        {hasPhoto && (
          <div className="w-[124px] h-[124px] flex items-center justify-center shrink-0">
            <img
              src={post.photoUrl}
              alt={post.title}
              className="w-[124px] h-[124px] object-cover rounded-md"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default PostCard;
