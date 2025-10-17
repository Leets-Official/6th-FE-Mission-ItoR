import React, { useState } from "react";
import Header from "@/components/Header";
import { dummyPosts, type Post } from "@/api/Dummy";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

const Blogfind: React.FC = () => {
  const [posts] = useState<Post[]>(dummyPosts);

  return (
    <div className="flex flex-col items-center w-full">
      <Header variant="write" />

      <div className="flex flex-col items-center w-full mt-8 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8 mb-16">
        <Pagination />
      </div>
    </div>
  );
};

export default Blogfind;