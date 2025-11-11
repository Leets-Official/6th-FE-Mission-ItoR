import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import Profile from "@/assets/svgs/Profile.svg?react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";

type FormState = {
  email: string;
  name: string;
  birthDate: string;
  nickname: string;
  introduction: string;
  profilePicture: string;
  kakaoId?: string;
};

const SignupKakao: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
    profilePicture: "",
    kakaoId: undefined,
  });

  // URL로 받은 값 세팅
  useEffect(() => {
    const kakaoId = params.get("kakaoId") || undefined;
    const email = params.get("email") || "";
    const name = params.get("name") || "";
    const nickname = params.get("nickname") || "";
    const profilePicture = params.get("profilePicture") || "";

    setForm((prev) => ({
      ...prev,
      kakaoId,
      email,
      name,
      nickname,
      profilePicture,
    }));
  }, [params]);

  // 입력 핸들러
  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ 카카오 회원가입 API 호출
  const handleSubmit = async () => {
    if (!form.kakaoId) return alert("카카오 인증 정보가 없습니다.");

    try {
      const res = await api.post("/auth/register-oauth", {
        email: form.email,
        name: form.name,
        birthDate: form.birthDate,
        nickname: form.nickname,
        introduction: form.introduction,
        profilePicture: form.profilePicture,
        kakaoId: Number(form.kakaoId),
      });

      const data = res.data?.data;

      // 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      alert("카카오 회원가입 완료!");
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("카카오 회원가입 실패:", error);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="write" />

      <div className="w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">카카오 회원가입</h1>
        <p className="text-[14px] text-gray-600 mt-1">
          부족한 정보를 입력하고 회원가입을 완료해주세요.
        </p>
      </div>

      <div className="flex flex-col mt-[30px] px-[430px] w-full">
        {/* 프로필 사진 */}
        <div className="flex flex-col items-start w-[688px] mb-[40px] gap-4">
          {form.profilePicture ? (
            <img
              src={form.profilePicture}
              alt="프로필"
              className="w-[88px] h-[88px] rounded-full object-cover"
            />
          ) : (
            <Profile className="w-[88px] h-[88px]" />
          )}
        </div>

        {/* 입력 폼 */}
        {[
          { key: "email", label: "이메일", placeholder: "이메일" },
          { key: "name", label: "이름", placeholder: "이름" },
          { key: "birthDate", label: "생년월일", placeholder: "YYYY.MM.DD" },
          { key: "nickname", label: "닉네임", placeholder: "닉네임" },
          { key: "introduction", label: "한 줄 소개", placeholder: "한 줄 소개" },
        ].map(({ key, label, placeholder }) => (
          <TextFieldSet
            key={key}
            label={label}
            value={form[key as keyof FormState] as string}
            placeholder={placeholder}
            onChange={(v) => handleChange(key as keyof FormState, v)}
          />
        ))}

        {/* 완료 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-[688px] h-[46px] mt-[40px] border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition"
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
};

export default SignupKakao;
