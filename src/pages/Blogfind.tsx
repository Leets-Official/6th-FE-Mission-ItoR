import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { dummyPosts, type Post } from "@/api/Dummy";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import Toast from "@/components/Toast";

const Blogfind: React.FC = () => {
  const [posts] = useState<Post[]>(dummyPosts);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickPost = (post: Post) => {
    navigate(`/post/${post.id}`);
  };

  // 삭제로 전달된 state가 있을 때만 토스트 표시
  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
        // state 초기화, 뒤로가기에도 다시 뜨지 않도록
        navigate(location.pathname, { replace: true, state: {} });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="write" />

      {/* 삭제 토스트 */}
      {showToast && <Toast variant="success" message="삭제가 완료되었습니다!" />}

      <div className="flex flex-col items-center w-full mt-8 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="cursor-pointer w-full flex justify-center"
            onClick={() => handleClickPost(post)}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8 mb-16">
        <Pagination />
      </div>
    </div>
  );
};

export default Blogfind;
