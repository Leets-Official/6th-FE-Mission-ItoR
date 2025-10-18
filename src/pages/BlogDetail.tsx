import React, { useState } from "react";
import Header from "@/components/Header";
import { type Post } from "@/api/Dummy";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Img from "@/assets/svgs/Img.png";
import Button from "@/components/Button"; 

interface BlogDetailProps {
  post: Post;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  const hasPhoto = !!post.photoUrl;
  const [commentText, setCommentText] = useState("");
  const [isLoggedIn] = useState(true); // 임시 로그인 여부
  const loggedInUserName = "홍길동"; // 임시 로그인 사용자 이름
  const isAuthor = isLoggedIn && loggedInUserName === post.author;

  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="detail" isLoggedIn={isLoggedIn} isAuthor={isAuthor} />
      <div
        className={`w-[688px] max-w-[688px] border-b border-gray-300 py-3 flex ${
          hasPhoto ? "flex-row" : "flex-col"
        } gap-4`}
      >
        <div className={`flex flex-col justify-between ${hasPhoto ? "w-[548px]" : "w-full"}`}>
          <h3 className="font-[Noto Sans KR] font-medium text-[16px] leading-[160%] text-gray-900 line-clamp-2">
            {post.title}
          </h3>

          <div className="flex flex-row justify-start text-sm text-gray-500 gap-6 mt-2">
            <span>{post.author}</span>
            <span>{post.createdAt}</span>
            <span>
              댓글 <span className="text-[#00A1FF]">{post.commentsCount}</span>개
            </span>
          </div>
        </div>

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

      <div className="w-[688px] p-4 text-gray-800 font-[Noto Sans KR] text-[14px] leading-[160%] mt-4 whitespace-pre-line">
        {post.content}
      </div>

      <LineEnd />

      <div className="flex flex-col w-[688px] max-w-[688px] mt-6">
        <div className="h-[54px] px-4 pt-4 pb-3 font-[Noto Sans KR] text-sm">
          댓글 <span className="text-[#00A1FF]">{post.commentsCount}</span>
        </div>

        {isLoggedIn ? (
          <div className="w-[656px] border border-gray-300 rounded-md px-4 py-2 mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2 mt-2">
              <img
                src={post.profileUrl || Img}
                alt={`${post.author} 프로필`}
                className="w-[20px] h-[20px] object-cover rounded-full"
              />
              <span className="font-[Noto Sans KR] text-[16px] text-gray-900 font-medium">
                {post.author}
              </span>
            </div>

            {/* 댓글 입력창 */}
            <textarea
              placeholder="댓글을 입력하세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full h-[112px]  rounded-md px-4 py-3 text-[14px] font-light font-[Noto Sans KR] leading-[160%] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <LineEnd />
            <div className="flex justify-end mt-">
            <Button variant="grayBorder">
              등록
            </Button>
          </div>
          </div>
          
        ) : (
          <div className="h-[130px] px-4 py-3 flex flex-col">
            <input
              type="text"
              placeholder="로그인을 하고 댓글을 달아보세요!"
              className="w-full h-full border border-gray-300 rounded-md px-3 text-[14px] font-light font-[Noto Sans KR] leading-[160%] placeholder:text-gray-400 tracking-[-0.5%] focus:outline-none"
            />
          </div>
          
        )}

      </div>


      <div className="w-full h-[354px] border-b border-gray-300 bg-[#F5F5F5] flex justify-center items-start pt-4">
        <div className="flex flex-col items-start w-[688px] py-4">
          <img
            src={post.profileUrl || Img}
            alt={`${post.author} 프로필`}
            className="w-[64px] h-[64px] object-cover rounded-full mb-4 mt-10"
          />

          <span className="w-[656px] font-[Noto Sans KR] font-medium text-[24px] leading-[160%] text-gray-900">
            {post.author}
          </span>

          <span className="w-[656px] font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-gray-700 mt-2">
            {post.profileIntro || "한 줄 소개가 없습니다."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;