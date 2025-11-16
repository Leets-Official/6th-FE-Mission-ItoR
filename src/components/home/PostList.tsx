import React from "react";
import PostItem from "./PostItem";
import type { Post } from "../../types/post";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className="divide-y divide-gray-90">
      {posts.map((p) => (
        <PostItem key={String(p.id)} post={p} />
      ))}
    </ul>
  );
};

export default PostList;
