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
        setPosts(res.data.post);
        setPageMax(res.data.pageMax);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [page, size]);

  return { posts, pageMax, loading };
}
