import React, { useState, useEffect } from "react";
import TextField from "@/components/Text/TextField";
import { KakaoIcon } from "@/assets/icons";
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
  errorText, // ✅ 추가
} from "./LoginModal.styled";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as E from "@/utils/validators";
import { LOGIN_ERROR_MESSAGES } from "@/utils/errorMessages";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
      const result = await onLogin?.(email, password);
      if (result === false) {
        if (email === "unknown@example.com") {
          setEmailError(LOGIN_ERROR_MESSAGES.emailNotRegistered);
        } else {
          setPasswordError(LOGIN_ERROR_MESSAGES.wrongPassword);
        }
      }
    } catch {
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
          <XIcon size={20} />
        </button>

        <div className={leftSection}>
          <h1 className={title}>GITLOG</h1>
          <p className={subtitle}>You can make anything by writing</p>
        </div>

        <div className={rightSection}>
          <div className={inputGroup}>
            {/* 이메일 */}
            <TextField
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={errorText}>*{emailError}</p>}

            {/* 비밀번호 */}
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
