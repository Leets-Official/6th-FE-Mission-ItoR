import React from "react";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import { dummyPosts } from "@/api/Dummy";
import ProfileIcon from "@/assets/svgs/Profile.svg?react";
import { useNavigate } from "react-router-dom";
import SettingIcon from "@/assets/svgs/settings.svg?react";

const ProfileDetail: React.FC = () => {
  const navigate = useNavigate();

  // 로그인된 사용자라고 가정 (예시로 "닉네임" 사용)
  const loggedInUser = "닉네임";

  // 로그인된 사용자의 게시글만 필터링
  const userPosts = dummyPosts.filter((post) => post.author === loggedInUser);

  // 해당 사용자의 프로필 정보 추출
  const userProfile = userPosts[0] || {
    profileUrl: undefined,
    profileIntro: "한 줄 소개가 없습니다.",
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="write" />

      <div className="w-full bg-[#F5F5F5] border-b border-gray-300 py-[60px] flex flex-col items-center justify-center">
        <ProfileIcon className="w-[88px] h-[88px] mr-[700px]" />
        <h1 className="text-[24px] font-semibold mt-4 mr-[700px]">{loggedInUser}</h1>
        <p className="text-[#606060] text-[14px] mt-1 mr-[600px]">
          {userProfile.profileIntro}
        </p>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mr-[640px] flex items-center gap-1 text-[12px] text-[#909090] border border-gray-300 rounded-sm px-3 py-1 mt-3 hover:bg-gray-50 transition"
        >
          <SettingIcon className="text-[#909090]"/> 내 프로필 설정
        </button>
      </div>

      <div className="flex flex-col items-center mt-[40px] px-[430px] w-full">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-start w-full py-6 border-b border-gray-200"
            >
              <div className="flex flex-col max-w-[500px]">
                <h2 className="text-[16px] font-semibold mb-1">{post.title}</h2>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center gap-2 text-[12px] text-gray-500">
                  {post.profileUrl ? (
                    <img
                      src={post.profileUrl}
                      alt={post.author}
                      className="w-[16px] h-[16px] rounded-full object-cover"
                    />
                  ) : (
                    <ProfileIcon className="w-[16px] h-[16px]" />
                  )}
                  <span>{post.author}</span>
                  <span>· {post.createdAt}</span>
                  <span>· 댓글 {post.commentsCount}</span>
                </div>
              </div>
              {post.photoUrl && (
                <img
                  src={post.photoUrl}
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
          <Pagination currentPage={1} totalPages={5} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;