import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";
import api from "@/api/axiosInstance";

// 서버 응답 타입 정의
interface PostResponse {
  postId: string;
  title: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  commentCount: number;
}

// 게시글 목록 조회 함수
const fetchPosts = async (): Promise<PostResponse[]> => {
  const { data } = await api.get("/posts/all", {
    params: {
      size: 10, // 한 페이지당 게시글 개수
      page: 1,  // 현재 페이지 번호
    },
  });
  // Swagger 구조상 data.data.posts로 감싸져 있음
  return data?.data?.posts || [];
};

const Blogfind: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  // ✅ React Query로 데이터 가져오기
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // ✅ 게시글 클릭 시 상세 페이지로 이동
  const handleClickPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  // ✅ 삭제 후 토스트 표시용 state 관리
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

  // ✅ 로딩 중
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  // ✅ 오류 발생 시
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* 상단 헤더 */}
      <Header variant="write" />

      {/* ✅ 삭제 후 토스트 메시지 */}
      {showToast && (
        <Toast variant="success" message="삭제가 완료되었습니다!" />
      )}

      {/* ✅ 게시글 리스트 */}
      <div className="flex flex-col items-center w-full mt-8 gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.postId}
              className="cursor-pointer w-full flex justify-center"
              onClick={() => handleClickPost(post.postId)}
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

      {/* ✅ 페이지네이션 영역 */}
      <div className="flex justify-center items-center gap-2 mt-8 mb-16">
        <Pagination />
      </div>
    </div>
  );
};

export default Blogfind;
