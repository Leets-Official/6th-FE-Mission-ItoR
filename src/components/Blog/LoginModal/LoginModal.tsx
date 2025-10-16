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
} from "./LoginModal.styled";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleLogin = () => {
    if (onLogin) onLogin(email, password);
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
            <TextField
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
