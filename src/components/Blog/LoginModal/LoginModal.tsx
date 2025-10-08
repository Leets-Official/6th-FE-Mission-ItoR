import React, { useState } from "react";
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

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleLogin = () => {
    if (onLogin) onLogin(email, password);
  };

  return (
    <div className={backdrop}>
      <div className={wrapper}>
        {/* Close Button */}
        <button className={closeButton} onClick={onClose}>
          <XIcon size={20} />
        </button>

        {/* Left: Logo */}
        <div className={leftSection}>
          <h1 className={title}>GITLOG</h1>
          <p className={subtitle}>You can make anything by writing</p>
        </div>

        {/* Right: Form */}
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
          <p className={footer}>또는 회원가입</p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
