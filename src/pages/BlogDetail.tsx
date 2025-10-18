// src/pages/BlogDetail.tsx
import React, { useState } from "react";
import Header from "@/components/Header";
import { type Post } from "@/api/Dummy";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Img from "@/assets/svgs/Img.png"; // 기본 프로필 이미지 및 게시글 이미지

interface BlogDetailProps {
  post: Post;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  const hasPhoto = !!post.photoUrl;
  const [commentText, setCommentText] = useState("");

  return (
    <div className="flex flex-col items-center w-full">
      {/* 헤더 */}
      <Header variant="detail" />

      {/* 게시글 정보 (제목 + 작성자, 날짜, 댓글수) */}
      <div
        className={`w-[688px] max-w-[688px] border-b border-gray-300 py-3 flex ${
          hasPhoto ? "flex-row" : "flex-col"
        } gap-4`}
      >
        <div className={`flex flex-col justify-between ${hasPhoto ? "w-[548px]" : "w-full"}`}>
          {/* 제목 */}
          <h3 className="font-[Noto Sans KR] font-medium text-[16px] leading-[160%] tracking-[-0.25%] text-gray-900 line-clamp-2">
            {post.title}
          </h3>

          {/* 작성자, 날짜, 댓글수 */}
          <div className="flex flex-row justify-start text-sm text-gray-500 gap-6 mt-2">
            <span>{post.author}</span>
            <span>{post.createdAt}</span>
            <span>댓글 <span className="text-[#00A1FF]">{post.commentsCount}</span>개</span>
          </div>
        </div>

        {/* 게시글 사진 */}
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

      {/* 게시글 내용 */}
      <div className="w-[688px] max-w-[688px] p-4 text-gray-800 font-[Noto Sans KR] text-[14px] leading-[160%] mt-4 whitespace-pre-line">
        {post.content}
      </div>

      <LineEnd />

      {/* 댓글 영역 */}
      <div className="flex flex-col w-[688px] max-w-[688px] mt-6">
        {/* 1. 댓글 수 */}
        <div className="h-[54px] px-4 pt-4 pb-3 font-[Noto Sans KR] text-sm">
          댓글 <span className="text-[#00A1FF]">{post.commentsCount}</span>
        </div>

        {/* 2. 댓글 안내 문구 */}
        {post.commentsCount === 0 && (
          <div className="flex flex-col gap-2 h-[68px] px-4 py-3 text-[#C8C8C8] font-[Noto Sans KR] text-center text-sm whitespace-pre-line">
            작성된 댓글이 없습니다.
            {"\n"}응원의 첫 번째 댓글을 달아보세요.
          </div>
        )}

        {/* 3. 댓글 입력창 */}
        <div className="h-[130px] px-4 py-3 flex flex-col">
          <input
            type="text"
            placeholder="로그인을 하고 댓글을 달아보세요!"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full h-full border border-gray-300 rounded-md px-3 text-[14px] font-light font-[Noto Sans KR] leading-[160%] placeholder:text-gray-400 tracking-[-0.5%] focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
          />
        </div>
      </div>

      {/* 작성자 정보 영역 */}
      <div className="w-full h-[354px] border-b border-gray-300 bg-[#F5F5F5] flex justify-center items-start pt-4">
        <div className="flex flex-col items-start w-[688px] max-w-[688px] h-[354px] bg-[#F5F5F5] border-b border-gray-300 py-4">
            {/* 프로필 이미지 */}
            <img
                src={post.profileUrl || Img}
                alt={`${post.author} 프로필`}
                className="w-[64px] h-[64px] object-cover rounded-full mb-4 mt-10"
            />

            {/* 닉네임 */}
            <span
                className="w-[656px] h-[38px] font-[Noto Sans KR] font-medium text-[24px] leading-[160%] tracking-[0%] text-gray-900 "
            >
                {post.author}
            </span>

            {/* 한 줄 소개 */}
            <span
                className="w-[656px] h-[22px] font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-gray-700  mt-2"
            >
                {post.profileIntro || "한 줄 소개가 없습니다."}
            </span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
