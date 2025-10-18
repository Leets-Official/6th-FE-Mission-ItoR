import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Blogfind from "./pages/Blogfind";
import BlogDetail from "./pages/BlogDetail";
import { dummyPosts } from "@/api/Dummy";

function App() {
  return (
    <Router>
      <Routes>
        {/* 블로그 찾기 페이지 */}
        <Route path="/" element={<Blogfind />} />
        {/* 블로그 상세 페이지 */}
        <Route path="/post/:id" element={<BlogDetailWrapper />} />
      </Routes>
    </Router>
  );
}

// URL 파라미터 id로 더미 데이터 찾아서 BlogDetail에 전달
const BlogDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = dummyPosts.find((p) => p.id === Number(id));

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return <BlogDetail post={post} />;
};

export default App;
