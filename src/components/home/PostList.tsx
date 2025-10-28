import React, { useMemo } from "react";
import Pagination from "@ui/Pagination";
import PostItem from "./PostItem";
import type { Post } from "../../types/post";

interface PostListProps {
  posts: Post[];
  page: number;
  onPageChange: (next: number) => void;
  pageSize?: number;
}

const PostList: React.FC<PostListProps> = ({ posts, page, onPageChange, pageSize = 5 }) => {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const current = Math.min(page, totalPages);
  const sliced = useMemo(
    () => posts.slice((current - 1) * pageSize, current * pageSize),
    [posts, current, pageSize]
  );

  return (
    <>
      <ul className="divide-y divide-gray-90">
        {sliced.map((p) => (
          <PostItem key={String(p.id)} post={p} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-6 mb-10 flex justify-center">
          <Pagination page={current} totalPages={totalPages} onChange={onPageChange} />
        </div>
      )}
    </>
  );
};

export default PostList;
