import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  signupPage,
  signupHeaderBar,
  signupHeaderText,
  signupSection,
  subtitle,
} from "./SignupPage.styled";
import { useState } from "react";
import SignupSection from "@/components/Auth/SignupSection";
import EmailSignupForm from "@/components/Auth/EmailSignupForm";
import KakaoSignupForm from "@/components/Auth/KakaoSignupForm";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";

export default function SignupPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mode, setMode] = useState<"select" | "email" | "kakao">("select");

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
          {mode === "select" ? (
            <h2 className={signupHeaderText}>회원가입</h2>
          ) : (
            <>
              <h2 className={signupHeaderText}>회원가입</h2>
              <p className={subtitle}>가입을 위해 회원님의 정보를 입력해주세요.</p>
            </>
          )}
        </div>
      </div>

      <section className={signupSection}>
        {mode === "select" && <SignupSection onSelect={(t) => setMode(t)} />}
        {mode === "email" && <EmailSignupForm />}
        {mode === "kakao" && <KakaoSignupForm />}
      </section>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
}
