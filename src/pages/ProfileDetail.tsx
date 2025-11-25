import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";
import { useNavigate } from "react-router-dom";
import SettingIcon from "@/assets/svgs/settings.svg?react";
import { useMyPosts, useUploadImage } from "@/hooks/usePosts";
import { useUpdateProfilePicture } from "@/hooks/auth/useAuth";

const ProfileDetail: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Hooks ---
  const { data, isLoading, isError } = useMyPosts(page);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();
  const { mutate: updatePicture } = useUpdateProfilePicture();

  // --- User Info ---
  const loggedInUser = {
    nickname: localStorage.getItem("nickname") || "사용자",
    introduction: localStorage.getItem("introduction") || "한 줄 소개가 없습니다.",
    profilePicture: localStorage.getItem("profilePicture"),
  };

  // --- Event Handlers ---
  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Upload image to pre-signed URL
    uploadImage(file, {
      onSuccess: (url) => {
        // 2. Update user's profile with the new image URL
        updatePicture({ profilePicture: url }, {
          onSuccess: () => {
            // 3. Force reload to show the new image everywhere
            window.location.reload();
          },
          onError: () => {
            alert("프로필 사진 업데이트에 실패했습니다.");
          }
        });
      },
      onError: () => {
        alert("이미지 업로드에 실패했습니다.");
      }
    });
  };

  // --- Derived State ---
  const userPosts = data?.posts.filter(post => post.nickName === loggedInUser.nickname) || [];
  const pageSize = 10;
  const apiTotalPages = data?.pageMax || 1;
  const isLastPageOfUserPosts = userPosts.length < pageSize;
  const probingTotalPages = isLastPageOfUserPosts ? page : page + 1;
  const totalPages = Math.min(probingTotalPages, apiTotalPages);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="write" />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />

      <div className="w-full bg-[#F5F5F5] border-b border-gray-300 py-[60px] flex flex-col px-[430px]">
        <button onClick={handleProfileClick} className="rounded-full" disabled={isUploading}>
          {loggedInUser.profilePicture ? (
            <img src={loggedInUser.profilePicture} alt="profile" className="w-[88px] h-[88px] rounded-full object-cover" />
          ) : (
            <ProfileIcon className="w-[88px] h-[88px]" />
          )}
        </button>
        {isUploading && <p className="text-sm text-gray-500 mt-2">업로드 중...</p>}
        <h1 className="text-[24px] font-semibold mt-4">{loggedInUser.nickname}</h1>
        <p className="text-[#606060] text-[14px] mt-1">
          {loggedInUser.introduction}
        </p>

        <button
          onClick={() => navigate("/profilefind")}
          className="flex items-center gap-1 text-[12px] text-[#909090] border border-gray-300 rounded-sm px-3 py-1 mt-3 hover:bg-gray-50 transition w-fit"
        >
          <SettingIcon className="text-[#909090]"/> 내 프로필 설정
        </button>
      </div>

      <div className="flex flex-col items-center mt-[40px] px-[430px] w-full">
        {isLoading ? (
          <p>게시글을 불러오는 중...</p>
        ) : isError ? (
          <p className="text-red-500">게시글을 불러오는 데 실패했습니다.</p>
        ) : userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div
              key={post.postId}
              onClick={() => navigate(`/blog/${post.postId}`)}
              className="flex justify-between items-start w-full py-6 border-b border-gray-200 cursor-pointer"
            >
              <div className="flex flex-col max-w-[500px]">
                <h2 className="text-[16px] font-semibold mb-1">{post.title}</h2>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3 line-clamp-2">
                  {post.contents?.[0]?.content || ""}
                </p>
                <div className="flex items-center gap-2 text-[12px] text-gray-500">
                  {post.profileUrl ? (
                    <img
                      src={post.profileUrl}
                      alt={post.nickName}
                      className="w-[16px] h-[16px] rounded-full object-cover"
                    />
                  ) : (
                    <ProfileIcon className="w-[16px] h-[16px]" />
                  )}
                  <span>{post.nickName}</span>
                  <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>· 댓글 {post.commentCount}</span>
                </div>
              </div>
              {post.contents?.find(c => c.contentType === 'IMAGE')?.content && (
                <img
                  src={post.contents.find(c => c.contentType === 'IMAGE')?.content}
                  alt="thumbnail"
                  className="w-[92px] h-[92px] rounded object-cover"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-10">작성한 게시글이 없습니다.</p>
        )}

        <div className="mt-[40px] mb-[60px]">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;