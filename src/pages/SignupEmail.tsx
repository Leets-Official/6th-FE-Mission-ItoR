import React, { useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Modal from "@/components/Modal";
import Profile from "@/assets/svgs/Profile.svg?react"; 
import { useNavigate } from "react-router-dom";

const SignupEmail: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 이메일
    if (!form.email.trim()) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }

    // 비밀번호 확인 (주의문구 있음)
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 이름
    if (!form.name.trim()) {
      newErrors.name = "반드시 입력해야 하는 필수 사항입니다.";
    }

    // 생년월일
    if (!form.birth.trim()) {
      newErrors.birth = "2025년 00월 00일 이전의 수만 가능합니다.";
    }

    // 닉네임
    if (!form.nickname.trim() || form.nickname.length > 20) {
      newErrors.nickname = "닉네임은 최대 20글자입니다.";
    }

    // 한 줄 소개
    if (!form.intro.trim() || form.intro.length > 30) {
      newErrors.intro = "한 줄 소개는 최대 30글자입니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white relative">
      <Header variant="write" />

     {/* 상단 타이틀 */}
        <div className="relative w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-[#F5F5F5] px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">회원가입</h1>
        <p className="text-[14px] text-[#606060] mt-1">
            가입을 위해 회원님의 정보를 입력해주세요.
        </p>
        </div>

        {/* 프로필 아이콘 */}
        <div className="relative w-full h-[180px]"> {/* 공간 확보 */}
        <div className="absolute left-[430px] top-[40px] flex flex-col items-start">
            <Profile className="w-[88px] h-[88px]" />
            <button className="mt-2 text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded-[2px]">
            프로필 사진 추가
            </button>
        </div>
        </div>

      {/* 메인 영역 */}
      <div className="flex flex-col mt-[60px] px-[430px]">
        <div className="w-[688px] flex flex-col gap-4">

          {/* 이메일 */}
          <div>
            <TextFieldSet
              label="이메일"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              placeholder="이메일"
            />
            {errors.email && (
              <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                {errors.email}
              </p>
            )}
          </div>

          {/* 비밀번호 — 문구 없음 */}
          <TextFieldSet
            label="비밀번호"
            value={form.password}
            onChange={(v) => handleChange("password", v)}
            placeholder="......"
            type="password"
          />

          {/* 비밀번호 확인 */}
          <div>
            <TextFieldSet
              label="비밀번호 확인"
              value={form.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
              placeholder="......"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* 이름 */}
          <div>
            <TextFieldSet
              label="이름"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              placeholder="이름"
            />
            {errors.name && (
              <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                {errors.name}
              </p>
            )}
          </div>

          {/* 생년월일 */}
          <div>
            <TextFieldSet
              label="생년월일"
              value={form.birth}
              onChange={(v) => handleChange("birth", v)}
              placeholder="YYYY.MM.DD"
            />
            {errors.birth && (
              <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                {errors.birth}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <TextFieldSet
              label="닉네임"
              value={form.nickname}
              onChange={(v) => handleChange("nickname", v)}
              placeholder="닉네임 (20자 이내)"
            />
            {errors.nickname && (
              <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                {errors.nickname}
              </p>
            )}
          </div>

          {/* 한 줄 소개 */}
          <div>
            <TextFieldSet
              label="한 줄 소개"
              value={form.intro}
              onChange={(v) => handleChange("intro", v)}
              placeholder="한 줄 소개"
            />
            {errors.intro && (
              <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                {errors.intro}
              </p>
            )}
          </div>

          {/* 회원가입 완료 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full h-[46px] mt-6 border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition-colors"
          >
            회원가입 완료
          </button>
        </div>
      </div>

      {/* 회원가입 완료 모달 */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
            <Modal
            titleLine1="회원가입이 완료되었습니다!"
            onClose={() => setShowModal(false)}
            onConfirm={() => navigate("/login")}
            cancelText="확인"          // 왼쪽 버튼
            confirmText="로그인하기"   // 오른쪽 버튼
            variant="info"
            />
        </div>
        )}
    </div>
  );
};

export default SignupEmail;
