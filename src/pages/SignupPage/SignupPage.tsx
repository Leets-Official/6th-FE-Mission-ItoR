import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import SignupSection from "@/components/Auth/SignupSection";
import SignupForm from "@/components/Auth/SignupForm";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import {
  signupPage,
  signupHeaderBar,
  signupHeaderText,
  signupSection,
  subtitle,
} from "./SignupPage.styled";

export default function SignupPage() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mode, setMode] = useState<"select" | "email" | "kakao">("select");
  const [kakaoUserData, setKakaoUserData] = useState(null);

  useEffect(() => {
    // 카카오 로그인에서 넘어온 경우
    if (location.state?.type === "kakao" && location.state?.kakaoUser) {
      setMode("kakao");
      setKakaoUserData(location.state.kakaoUser);
    }
  }, [location]);

  return (
    <main className={signupPage}>
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header title="GITLOG" variant="plain" onMenuClick={() => setIsSidebarOpen(true)} />
      </div>
      <div className="h-[70px]" />

      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)} />
          <aside className="animate-slideIn fixed top-0 left-0 z-50 h-full w-64">
            <Sidebar
              variant="guest"
              onLoginClick={() => {
                setIsLoginOpen(true);
                setIsSidebarOpen(false);
              }}
            />
          </aside>
        </>
      )}

      <div className={signupHeaderBar}>
        <div className="mx-auto max-w-[900px] md:px-20">
          <h2 className={signupHeaderText}>회원가입</h2>
          {mode !== "select" && (
            <p className={subtitle}>가입을 위해 회원님의 정보를 입력해주세요.</p>
          )}
        </div>
      </div>

      <section className={signupSection}>
        {mode === "select" && <SignupSection onSelect={(t) => setMode(t)} />}
        {mode !== "select" && <SignupForm type={mode} kakaoUserData={kakaoUserData} />}
      </section>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
}
