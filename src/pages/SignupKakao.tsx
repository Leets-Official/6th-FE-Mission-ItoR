import React, { useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import KakaoIcon from "@/assets/svgs/kakao.svg?react";
import Profile from "@/assets/svgs/Profile.svg?react";

const SignupKakao: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
    profileImg: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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
      <div className="flex flex-col mt-[60px] px-[430px] w-full">
        {/* 프로필 사진 */}
        <div className="flex flex-col items-start w-[688px] mb-[40px]">
          {form.profileImg ? (
            <img
              src={form.profileImg}
              alt="프로필"
              className="w-[88px] h-[88px] rounded-full object-cover mb-2"
            />
          ) : (
            <Profile className="w-[88px] h-[88px] mb-2" />
          )}

          <label className="border border-gray-300 text-gray-600 text-[12px] px-3 py-1 rounded-[2px] cursor-pointer hover:bg-gray-50 transition">
            프로필 사진 추가
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () =>
                    setForm((prev) => ({ ...prev, profileImg: reader.result as string }));
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col w-[688px] gap-2 mb-6">
          <p className="text-[14px] text-gray-800 font-medium">소셜 로그인</p>
          <button
            onClick={() => (window.location.href = "https://your-backend.com/api/auth/kakao")}
            className="flex items-center justify-center gap-2 w-full h-[46px] rounded-md bg-gray-100 text-gray-900 font-medium border border-gray-300 hover:bg-gray-200 transition"
          >
            <KakaoIcon className="w-[18px] h-[18px]" />
            카카오 로그인
          </button>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-4 w-[688px]">
          <TextFieldSet
            label="이메일"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            placeholder="이메일"
          />
          <TextFieldSet
            label="이름"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            placeholder="이름"
          />
          <TextFieldSet
            label="생년월일"
            value={form.birth}
            onChange={(v) => handleChange("birth", v)}
            placeholder="YYYY.MM.DD"
          />
          <div>
            <TextFieldSet
              label="닉네임"
              value={form.nickname}
              onChange={(v) => handleChange("nickname", v)}
              placeholder="닉네임"
            />
            <p className="text-[#909090] text-[12px] mt-1">* 20자 이내</p>
          </div>
          <TextFieldSet
            label="한 줄 소개"
            value={form.intro}
            onChange={(v) => handleChange("intro", v)}
            placeholder="한 줄 소개"
          />
        </div>

        {/* 완료 버튼 */}
        <button
          onClick={() => alert("회원가입 완료")}
          className="w-[688px] h-[46px] mt-[40px] border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition"
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
};

export default SignupKakao;