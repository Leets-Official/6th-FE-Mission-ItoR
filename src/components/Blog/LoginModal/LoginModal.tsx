import React, { useState } from "react";
import TextField from "@/components/Text/TextField";
import { KakaoIcon, ClearIcon } from "@/assets/icons";
import {
  backdrop,
  wrapper,
  leftSection,
  rightSection,
  title,
  subtitle,
  inputGroup,
  loginButton,
  snsDivider,
  kakaoButton,
  footer,
  closeButton,
  errorText,
} from "./LoginModal.styled";
import { useNavigate } from "react-router-dom";
import * as E from "@/utils/validators";
import { LOGIN_ERROR_MESSAGES } from "@/utils/errorMessages";
import { useScrollLock } from "@/hooks/useScrollLock";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => Promise<boolean> | void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useScrollLock(open);

  if (!open) return null;

  const handleLogin = async () => {
    const emailValidation = E.validateLoginEmail(email);
    if (emailValidation) {
      setEmailError(emailValidation);
      setPasswordError("");
      return;
    }

    setEmailError("");
    setPasswordError("");

    try {
      if (!onLogin) return;

      const result = await onLogin(email, password);

      if (result === false) {
        if (email === "unknown@example.com") {
          setEmailError(LOGIN_ERROR_MESSAGES.emailNotRegistered);
        } else {
          setPasswordError(LOGIN_ERROR_MESSAGES.wrongPassword);
        }
      }
    } catch (error) {
      console.error(error);
      setPasswordError(LOGIN_ERROR_MESSAGES.wrongPassword);
    }
  };

  const handleSignupClick = () => {
    onClose();
    navigate("/signup");
  };

  return (
    <div className={backdrop}>
      <div className={wrapper}>
        <button className={closeButton} onClick={onClose}>
          <ClearIcon className="h-6 w-6" />
        </button>

        <div className={leftSection}>
          <h1 className={title}>GITLOG</h1>
          <p className={subtitle}>You can make anything by writing</p>
        </div>

        <div className={rightSection}>
          <div className={inputGroup}>
            <TextField
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={errorText}>*{emailError}</p>}

            <TextField
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className={errorText}>{passwordError}</p>}
          </div>

          <button className={loginButton} onClick={handleLogin}>
            이메일로 로그인
          </button>

          <div className={snsDivider}>
            <span>SNS</span>
          </div>

          <button className={kakaoButton}>
            <KakaoIcon className="h-5 w-5" />
            카카오로 로그인
          </button>

          <p
            className={`${footer} hover:text-brand-blue cursor-pointer transition`}
            onClick={handleSignupClick}
          >
            또는 회원가입
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
