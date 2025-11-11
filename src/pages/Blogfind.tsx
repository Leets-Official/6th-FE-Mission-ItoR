import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";
import { useAllPosts } from "@/hooks/usePosts";

// 서버 응답 타입 정의
interface PostResponse {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
}

const Blogfind: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  const { data: posts, isLoading, isError } = useAllPosts();

  // 게시글 클릭 시 상세 페이지로 이동
  const handleClickPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  // 삭제 후 토스트 표시용 state 관리
  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  // 오류 발생 시
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="write" />

      {showToast && (
        <Toast variant="success" message="삭제가 완료되었습니다!" />
      )}

      <div className="flex flex-col items-center w-full mt-8 gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.postId}
              className="cursor-pointer w-full flex justify-center"
              onClick={() => navigate(`/post/${post.postId}`)}
            >
              <PostCard
                post={{
                  id: post.postId,
                  title: post.title,
                  content: "", // API에는 본문 내용이 없음
                  author: post.nickName,
                  createdAt: post.createdAt,
                  commentsCount: post.commentCount,
                  profileUrl: post.profileUrl,
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm mt-10">
            게시글이 없습니다.
          </p>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8 mb-16">
        <Pagination />
      </div>
    </div>
  );
};

export default Blogfind;
