import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { dummyPosts, type Post } from "@/api/Dummy";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

const Blogfind: React.FC = () => {
  const [posts] = useState<Post[]>(dummyPosts);
  const navigate = useNavigate();

  const handleClickPost = (post: Post) => {
    navigate(`/post/${post.id}`);
  };

  const handleClickWrite = () => {
    // 로그인 상태 확인 (지금은 true로 가정)
    const isLoggedIn = true;
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/write"); // BlogWrite 페이지로 이동
    }
  };


  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="write" />

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
