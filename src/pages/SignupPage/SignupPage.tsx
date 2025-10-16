import Header from "@/components/Header/Header";
import { signupPage, signupHeaderBar, signupHeaderText, signupSection } from "./SignupPage.styled";
import SignupSection from "@/components/Auth/SignupSection";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";

export default function SignupPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main className={signupPage}>
      <Header title="GITLOG" variant="plain" onMenuClick={() => setIsSidebarOpen(true)} />
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
        <div className="mx-auto max-w-[900px]">
          <h2 className={signupHeaderText}>회원가입</h2>
        </div>
      </div>

      <section className={signupSection}>
        <SignupSection />
      </section>

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </main>
  );
}
