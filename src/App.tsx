import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ 추가

import Blogfind from "./pages/Blogfind";
import BlogDetail from "./pages/BlogDetail";
import { dummyPosts } from "@/api/Dummy";
import BlogWrite from "./pages/BlogWrite";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupEmail from "./pages/SignupEmail";
import ProfileDetail from "./pages/ProfileDetail";
import ProfileFind from "./pages/ProfileFind";
import SignupKakao from "./pages/SignupKakao";
import KakaoRedirect from "./pages/KakaoRedirect";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Blogfind />} />
          <Route path="/post/:id" element={<BlogDetailWrapper />} />
          <Route path="/write" element={<BlogWrite/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/email" element={<SignupEmail />} />
          <Route path="/profiledetail" element={<ProfileDetail />} />
          <Route path="/profilefind" element={<ProfileFind />} />
          <Route path="/signup/kakao" element={<SignupKakao />} />
          <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />
        </Routes>
      </Router>
    </QueryClientProvider>
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
