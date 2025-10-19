import { Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage/MainPage";
import SignupPage from "@/pages/SignupPage/SignupPage";
import PostDetailPage from "@/pages/PostDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/blog/:postId" element={<PostDetailPage />} />
    </Routes>
  );
}

export default App;
