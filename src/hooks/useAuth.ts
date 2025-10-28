import { useState } from "react";
import { login, register, registerOAuth } from "@/api/auth";
import { useUserStore } from "@/store/useUserStore";

export interface RegisterRequest {
  email: string;
  nickname: string;
  password: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
}

export interface RegisterOAuthRequest {
  email: string;
  nickname: string;
  profilePicture: string;
  birthDate: string;
  name: string;
  introduction?: string;
  kakaoId: number;
}

export function useAuth() {
  const { setUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await login(email, password);
      setUser(user);
      return true;
    } catch (e) {
      console.error("로그인 실패:", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      await register(data);
      return true;
    } catch (e) {
      console.error("회원가입 실패:", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterOAuth = async (data: RegisterOAuthRequest) => {
    try {
      setLoading(true);
      await registerOAuth(data);
      return true;
    } catch (e) {
      console.error("카카오 회원가입 실패:", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    clearUser();
  };

  return { handleLogin, handleRegister, handleRegisterOAuth, handleLogout, loading };
}
