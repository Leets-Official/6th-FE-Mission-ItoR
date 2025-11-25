import React from "react";
import Blogfind from "./Blogfind";
import ClearIcon from "@/assets/svgs/clear.svg?react";
import LoginGraphic from "@/components/LoginGraphic";
import LoginForm from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { S } from "@/styles/Login.styles";

const Login: React.FC = () => {
  const {
    form,
    setForm,
    isLoading,
    handleEmailLogin,
    handleKakaoLogin,
    handleNavigate,
  } = useLogin();

  return (
    <div className={S.pageContainer}>
      <Blogfind />
      <div className={S.blurOverlay}></div>
      <div className={S.popupContainer}>
        <div className={S.popupInner}>
          <button onClick={() => handleNavigate("/")} className={S.closeButton}>
            <ClearIcon className={S.closeIcon} />
          </button>
          <LoginGraphic />
          <LoginForm
            form={form}
            setForm={setForm}
            isLoading={isLoading}
            onEmailLogin={handleEmailLogin}
            onKakaoLogin={handleKakaoLogin}
            onNavigateToSignup={() => handleNavigate("/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
