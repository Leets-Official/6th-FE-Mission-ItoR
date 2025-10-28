import React, { useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import Profile from "@/assets/svgs/Profile.svg?react";

/** 폼 상태 타입 */
type FormState = {
  email: string;
  name: string;
  birth: string;
  nickname: string;
  intro: string;
  profileImg: string;
};

const SignupKakao: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
    profileImg: "",
  });

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fields: ReadonlyArray<{
    key: keyof FormState;
    label: string;
    placeholder: string;
    helper?: string;
  }> = [
    { key: "email", label: "이메일", placeholder: "이메일" },
    { key: "name", label: "이름", placeholder: "이름" },
    { key: "birth", label: "생년월일", placeholder: "YYYY.MM.DD" },
    { key: "nickname", label: "닉네임", placeholder: "닉네임", helper: "* 20자 이내" },
    { key: "intro", label: "한 줄 소개", placeholder: "한 줄 소개" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 상단 헤더 */}
      <Header variant="write" />

      {/* 타이틀 영역 */}
      <div className="w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">회원가입</h1>
        <p className="text-[14px] text-gray-600 mt-1">
          가입을 위해 회원님의 정보를 입력해주세요.
        </p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col mt-[30px] px-[430px] w-full">
        <p className="text-[14px] text-gray-400 mb-5">프로필 사진</p>

        {/* 프로필 사진 */}
        <div className="flex flex-col items-start w-[688px] mb-[40px] gap-4">
          {form.profileImg ? (
            <img
              src={form.profileImg}
              alt="프로필"
              className="w-[88px] h-[88px] rounded-full object-cover"
            />
          ) : (
            <Profile className="w-[88px] h-[88px]" />
          )}

          <label className="border border-gray-300 text-gray-600 text-[12px] px-3 py-1 rounded-[2px] cursor-pointer hover:bg-gray-50 transition">
            프로필 사진 추가
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === "string") {
                    handleChange("profileImg", reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col w-[688px] gap-2 mb-6">
          <p className="text-[14px] text-gray-800 font-medium">소셜 로그인</p>
          <button
            type="button"
            onClick={() => {
              window.location.href = "https://your-backend.com/api/auth/kakao";
            }}
            className="flex items-center justify-start gap-2 w-full h-[46px] rounded-md bg-gray-100 text-gray-900 font-medium border border-gray-300 hover:bg-gray-200 transition pl-4"
          >
            <KakaoIcon className="w-[18px] h-[18px]" />
            <span className="text-[#909090]">카카오 로그인</span>
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-4 w-[688px]">
          {fields.map(({ key, label, placeholder, helper }) => (
            <div key={key as string}>
              <TextFieldSet
                label={label}
                value={form[key] as string}
                onChange={(v) => handleChange(key, v)}
                placeholder={placeholder}
              />
              {helper && <p className="text-[#909090] text-[12px] mt-1">{helper}</p>}
            </div>
          ))}
        </div>

        {/* 완료 버튼 */}
        <button
          type="button"
          className="w-[688px] h-[46px] mt-[40px] border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition"
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
};

export default SignupKakao;
