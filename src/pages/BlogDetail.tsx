import React, { useState } from "react";
import Header from "@/components/Header";
import { type Post } from "@/api/Dummy";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Img from "@/assets/svgs/Img.png";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import MoreVertIcon from "@/assets/svgs/more_vert.svg?react"; // 댓글 옵션 아이콘
import Toast from "@/components/Toast";
import Done from "@/assets/svgs/done.svg?react";

interface BlogDetailProps {
  post: Post;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  const hasPhoto = !!post.photoUrl;
  const [commentText, setCommentText] = useState("");
  const [isLoggedIn] = useState(true);
  const loggedInUserName = "홍길동";
  const isAuthor = isLoggedIn && loggedInUserName === post.author;

  // Toast 상태
  const [toastMessage, setToastMessage] = useState<{ variant: "success" | "warning"; message: string } | null>(null);

  // 블로그 삭제 모달
  const [isBlogDeleteModalOpen, setIsBlogDeleteModalOpen] = useState(false);

  // 댓글 삭제 모달
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // 블로그 삭제 함수
  const handleBlogDeleteClick = () => setIsBlogDeleteModalOpen(true);
  const handleBlogDeleteClose = () => setIsBlogDeleteModalOpen(false);
  const handleBlogDeleteConfirm = () => {
    setIsBlogDeleteModalOpen(false);
    setToastMessage({ variant: "success", message: "블로그 삭제가 완료되었습니다!" });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 댓글 삭제 함수
  const handleCommentDeleteConfirm = () => {
    // 실제 댓글 삭제 로직
    // 예: post.comments = post.comments.filter(c => c.id !== commentToDelete);
    setIsCommentDeleteModalOpen(false);
    setCommentToDelete(null);
    setToastMessage({ variant: "success", message: "삭제가 완료되었습니다!" });
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      {/* Toast */}
        {toastMessage && (
        <div className="flex items-center justify-center mt-4 max-w-[688px]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-lg border-[#15DC5E] text-[#15DC5E] w-full max-w-[300px] justify-center">
            {/* 아이콘 */}
            <Done className="text-[#15DC5E]" />
            {/* 메시지 */}
            <span className="text-[14px]">{toastMessage.message}</span>
            </div>
        </div>
        )}


      {/* 상단 헤더 */}
      <Header
        variant="detail"
        isLoggedIn={isLoggedIn}
        isAuthor={isAuthor}
        post={post}
        onDelete={handleBlogDeleteClick}
      />

      {/* 게시글 본문 */}
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
              댓글 <span className="text-[#00A1FF]">{post.comments?.length || 0}</span>개
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

      {/* 본문 내용 */}
      <div className="w-[688px] p-4 text-gray-800 font-[Noto Sans KR] text-[14px] leading-[160%] mt-4 whitespace-pre-line">
        {post.content}
      </div>

      {/* 댓글 헤더 */}
      <div className="w-[688px] max-w-[688px] mt-4 mb-2 text-[16px] font-[Noto Sans KR] font-medium text-gray-900">
        댓글 <span className="text-[#00A1FF]">{post.comments?.length || 0}</span>
      </div>

      {/* 댓글 목록 */}
      <div className="w-[688px] max-w-[688px] mt-2">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="rounded-md px-4 py-3 mb-3 bg-white">
              <div className="flex justify-between gap-2">
                <div className="flex gap-2">
                  <img
                    src={Img}
                    alt={`${comment.author} 프로필`}
                    className="w-[20px] h-[20px] rounded-full object-cover mt-1"
                  />
                  <div className="flex flex-col">
                    <span className="font-[Noto Sans KR] text-[14px] font-medium text-gray-900">
                      {comment.author}
                    </span>
                    <span className="text-[12px] text-gray-400 mt-0.5">
                      {comment.createdAt}
                    </span>
                    <p className="text-[14px] text-gray-700 font-[Noto Sans KR] leading-[160%] mt-2">
                      {comment.content}
                    </p>
                  </div>
                </div>

                {/* 로그인 유저 댓글이면 MoreVertIcon 표시 */}
                {isLoggedIn && comment.author === loggedInUserName && (
                  <div className="relative flex items-start">
                    <MoreVertIcon
                      className="w-5 h-5 text-gray-400 cursor-pointer"
                      onClick={() =>
                        setOpenDropdown((prev) => (prev === comment.id ? null : comment.id))
                      }
                    />
                    {/* Dropdown 메뉴 */}
                    {openDropdown === comment.id && (
                      <div className="absolute right-0 top-6 w-[100px] rounded shadow-md z-10">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setCommentToDelete(comment.id);
                            setIsCommentDeleteModalOpen(true);
                            setOpenDropdown(null);
                          }}
                        >
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-[14px] mt-6">
            아직 댓글이 없습니다.
          </div>
        )}
      </div>

      {/* 댓글 입력창 */}
      <div className="flex flex-col w-[688px] max-w-[688px] mt-6 mb-12">
        {isLoggedIn ? (
          <div className="w-[656px] border border-gray-300 rounded-md px-4 py-2 mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2 mt-2">
              <img
                src={Img}
                alt={`${loggedInUserName} 프로필`}
                className="w-[20px] h-[20px] object-cover rounded-full"
              />
              <span className="font-[Noto Sans KR] text-[16px] text-gray-900 font-medium">
                {loggedInUserName}
              </span>
            </div>
            <textarea
              placeholder="댓글을 입력하세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full h-[112px] rounded-md px-4 py-3 text-[14px] font-light font-[Noto Sans KR] leading-[160%] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <LineEnd />
            <div className="flex justify-end">
              <Button variant="grayBorder">등록</Button>
            </div>
          </div>
        ) : (
          <div className="h-[130px] px-4 py-3 flex flex-col">
            <input
              type="text"
              placeholder="로그인을 하고 댓글을 달아보세요!"
              className="w-full h-full border border-gray-300 rounded-md px-3 text-[14px] font-light font-[Noto Sans KR] leading-[160%] placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* 작성자 영역 */}
      <div className="w-full h-[354px] border-b border-gray-300 bg-[#F5F5F5] flex justify-center items-start pt-4">
        <div className="flex flex-col items-start w-[688px] max-w-[688px] h-[354px] py-4">
          <img
            src={post.profileUrl || Img}
            alt={`${post.author} 프로필`}
            className="w-[64px] h-[64px] object-cover rounded-full mb-4 mt-10"
          />
          <span className="w-[656px] font-[Noto Sans KR] font-medium text-[24px] leading-[160%] text-gray-900">
            {post.author}
          </span>
          <span className="w-[656px] font-[Noto Sans KR] font-light text-[14px] leading-[160%] text-gray-700 mt-2">
            {post.profileIntro || "한 줄 소개가 없습니다."}
          </span>
        </div>
      </div>

      {/* 블로그 삭제 모달 */}
      {isBlogDeleteModalOpen && (
        <Modal
          titleLine1="해당 블로그를 삭제하시겠어요?"
          titleLine2=""
          description="삭제된 블로그는 다시 확인할 수 없어요."
          onClose={handleBlogDeleteClose}
          onConfirm={handleBlogDeleteConfirm}
        />
      )}

      {/* 댓글 삭제 모달 */}
      {isCommentDeleteModalOpen && (
        <Modal
          titleLine1="댓글을 삭제할까요?"
          titleLine2=""
          description="삭제된 댓글은 다시 확인할 수 없어요."
          onClose={() => {
            setIsCommentDeleteModalOpen(false);
            setCommentToDelete(null);
          }}
          onConfirm={handleCommentDeleteConfirm}
        />
      )}
    </div>
  );
};

export default BlogDetail;
