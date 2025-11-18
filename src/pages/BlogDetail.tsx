import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import LineEnd from "@/assets/svgs/LineEnd.svg?react";
import Img from "@/assets/svgs/Img.png";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Done from "@/assets/svgs/done.svg?react";
import { usePostDetail, useDeletePost, useCreateComment } from "@/hooks/usePosts";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- Data Fetching ---
  const { data: post, isLoading, isError } = usePostDetail(id!);
  const { mutate: deletePost } = useDeletePost();
  const { mutate: createComment } = useCreateComment(id!);

  // --- State ---
  const [commentText, setCommentText] = useState("");
  const [toastMessage, setToastMessage] = useState<{ variant: "success" | "warning"; message: string } | null>(null);
  const [isBlogDeleteModalOpen, setIsBlogDeleteModalOpen] = useState(false);

  // --- User & Auth Info ---
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const isAuthor = post?.isOwner ?? false;
  const loggedInUser = {
    nickname: localStorage.getItem("nickname"),
    profilePicture: localStorage.getItem("profilePicture"),
  };

  // --- Event Handlers ---
  const handleBlogDeleteConfirm = () => {
    if (!id) return;
    deletePost(id, {
      onSuccess: () => {
        setToastMessage({ variant: "success", message: "게시글이 삭제되었습니다!" });
        setTimeout(() => {
          setToastMessage(null);
          navigate("/", { replace: true, state: { showToast: true } });
        }, 1500);
      },
      onError: () => alert("게시글 삭제에 실패했습니다."),
    });
    setIsBlogDeleteModalOpen(false);
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    createComment(commentText.trim(), {
      onSuccess: () => {
        setCommentText(""); // 입력창 비우기
      },
    });
  };

  // --- Render Logic ---
  if (isLoading)
    return <div className="flex justify-center items-center min-h-screen">게시글을 불러오는 중입니다...</div>;
  if (isError || !post)
    return <div className="flex justify-center items-center min-h-screen text-red-500">게시글을 불러오지 못했습니다.</div>;

  const isCommentSubmitDisabled = !commentText.trim();

  return (
    <div className="flex flex-col items-center w-full relative">
      {toastMessage && (
        <div className="flex items-center justify-center mt-4 max-w-[688px]">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-lg border-[#15DC5E] text-[#15DC5E] w-full max-w-[300px] justify-center">
            <Done className="text-[#15DC5E]" />
            <span className="text-[14px]">{toastMessage.message}</span>
          </div>
        </div>
      )}

      <Header variant="detail" isLoggedIn={isLoggedIn} isAuthor={isAuthor} post={post} onDelete={() => setIsBlogDeleteModalOpen(true)} />

      {/* 제목 및 정보 */}
      <div className="w-[688px] border-b border-gray-300 py-3">
        <h3 className="font-medium text-[18px] text-gray-900">{post.title}</h3>
        <div className="flex flex-row justify-start text-sm text-gray-500 gap-6 mt-2">
          <span>{post.nickName}</span>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="w-[688px] p-4 text-gray-800 text-[14px] leading-[160%] mt-4 whitespace-pre-line">
        {post.contents?.map((block: { contentOrder: React.Key; content: string }) => (
          <p key={block.contentOrder}>{block.content}</p>
        ))}
      </div>

      {/* 이미지 */}
      {post.contents
        ?.filter((c: { contentType: string }) => c.contentType === "IMAGE")
        .map((img: { content: string }, idx: number) => (
          <div key={idx} className="w-[688px] mt-6 mb-6">
            <img
              src={img.content}
              alt={`post-image-${idx}`}
              className="rounded-md w-full object-cover"
            />
          </div>
        ))}

      {/* 댓글 영역 */}
      <div className="w-[688px] mt-8">
        <p className="font-medium text-gray-900 text-[16px]">댓글 {post.comments.length}</p>
        {/* 댓글 목록 렌더링 */}
          {post.comments.length > 0 && (
            <div className="mb-4">
              {post.comments.map((comment) => (
                <div key={comment.commentId} className="rounded-md p-3 mb-2 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={comment.profileUrl || Img}
                      alt={comment.nickName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-medium text-sm">{comment.nickName}</span>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm ml-9">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        <div className="border border-gray-300 rounded-md mt-3 p-4">
          {/* 댓글 입력 섹션 */}
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={loggedInUser.profilePicture || Img}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-sm">{loggedInUser.nickname}</span>
              </div>
              <textarea
                placeholder="댓글을 입력하세요."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full h-[100px] rounded-md px-3 py-2 text-[14px] leading-[160%] placeholder:text-gray-400 focus:outline-none resize-none border border-gray-300"
              />
              <LineEnd />
              <div className="flex justify-end mt-2">
                <Button
                  variant={isCommentSubmitDisabled ? "grayBorder" : "blackWhite"}
                  onClick={handleCommentSubmit}
                  disabled={isCommentSubmitDisabled}
                >
                  등록
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-10">
              로그인 후 댓글을 작성할 수 있습니다.
            </div>
          )}
        </div>
      </div>

      {/* 작성자 프로필 */}
      <div className="w-full h-[354px] border-b border-gray-300 bg-[#F5F5F5] flex justify-center items-start pt-4">
        <div className="flex flex-col items-start w-[688px] py-4">
          <img
            src={Img}
            alt={`${post.nickName} 프로필`}
            className="w-[64px] h-[64px] object-cover rounded-full mb-4 mt-10"
          />
          <span className="text-[24px] font-medium text-gray-900">{post.nickName}</span>
          <span className="text-[14px] text-gray-700 mt-2">
            {post.introduction || "한 줄 소개가 없습니다."}
          </span>
        </div>
      </div>

      {/* 삭제 모달 */}
      {isBlogDeleteModalOpen && (
        <Modal
          titleLine1="해당 게시글을 삭제하시겠어요?"
          description="삭제된 게시글은 복구할 수 없습니다."
          onClose={() => setIsBlogDeleteModalOpen(false)}
          onConfirm={handleBlogDeleteConfirm}
        />
      )}
    </div>
  );
};

export default BlogDetail;
