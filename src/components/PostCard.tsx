import React from "react";
import clsx from "clsx"; // 조건부 클래스 병합
import { type Post } from "@/api/Dummy";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const hasPhoto = !!post.photoUrl;

  return (
    <div
      className={clsx(
        "w-full max-w-[688px] py-2 flex gap-4", // 수정: w-full + max-w 로 반응형 대응
        hasPhoto ? "flex-row" : "flex-col"      // clsx 로 조건부 스타일링
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-between",
          hasPhoto ? "w-[548px]" : "w-full"
        )}
      >
        <h3 className="font-[Noto Sans KR] font-medium text-[16px] leading-[160%] tracking-[-0.25%] text-gray-900 line-clamp-2">
          {post.title}
        </h3>

        <p className="font-[Noto Sans KR] font-normal text-[14px] text-gray-700 line-clamp-2 mt-1">
          {post.content}
        </p>

        <div className="flex flex-row justify-start text-sm text-gray-500 gap-6 mt-5">
          <span>{post.author}</span>
          <span>{post.createdAt}</span>
          <span>댓글 {post.commentsCount}개</span>
        </div>
      </div>

      <LineEnd />

      {hasPhoto && (
        <div className="w-[124px] h-[150px] flex items-center justify-center shrink-0">
          <img
            src={post.photoUrl}
            alt={post.title}
            className="w-[92px] h-[92px] object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
