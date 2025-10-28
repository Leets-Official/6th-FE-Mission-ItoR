import { useEffect, useState } from "react";
import { fetchPosts, Post } from "@/api/postApi";

export function usePosts(page: number, size: number = 10) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageMax, setPageMax] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const res = await fetchPosts(page, size);

        const data = res?.data ?? {};
        const postList = data.post ?? [];
        const maxPage = data.pageMax ?? 1;

        if (Array.isArray(postList)) {
          setPosts(postList);
        } else {
          console.warn("Unexpected posts structure:", postList);
          setPosts([]);
        }

        setPageMax(maxPage);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [page, size]);

  return { posts, pageMax, loading };
}
