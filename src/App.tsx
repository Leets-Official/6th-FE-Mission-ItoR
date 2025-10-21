import { Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage/MainPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import PostDetailPage from "@/pages/PostDetailPage";
import PostWritePage from "@/pages/PostWritePage/PostWritePage";
import MyPage from "@/pages/MyPage/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/blog/:postId" element={<PostDetailPage />} />
      <Route path="/write" element={<PostWritePage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
