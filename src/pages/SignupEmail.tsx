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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 반복되는 필드 정의 
  const fields = [
    { key: "email", label: "이메일", placeholder: "이메일" },
    { key: "password", label: "비밀번호", placeholder: "......" },
    { key: "confirmPassword", label: "비밀번호 확인", placeholder: "......" },
    { key: "name", label: "이름", placeholder: "이름" },
    { key: "birth", label: "생년월일", placeholder: "YYYY.MM.DD" },
    { key: "nickname", label: "닉네임", placeholder: "닉네임 (20자 이내)" },
    { key: "intro", label: "한 줄 소개", placeholder: "한 줄 소개" },
  ] as const;

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "이메일 형식이 올바르지 않습니다.";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!form.name.trim()) newErrors.name = "반드시 입력해야 하는 필수 사항입니다.";
    if (!form.birth.trim()) newErrors.birth = "2025년 00월 00일 이전의 수만 가능합니다.";
    if (!form.nickname.trim() || form.nickname.length > 20) newErrors.nickname = "닉네임은 최대 20글자입니다.";
    if (!form.intro.trim() || form.intro.length > 30) newErrors.intro = "한 줄 소개는 최대 30글자입니다.";

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
      <div className="relative w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">회원가입</h1>
        <p className="text-[14px] text-gray-600 mt-1">
          가입을 위해 회원님의 정보를 입력해주세요.
        </p>
      </div>

      {/* 프로필 아이콘 */}
      <div className="relative w-full h-[180px]">
        <div className="absolute left-[430px] top-[40px] flex flex-col items-start">
          <Profile className="w-[88px] h-[88px]" />
          <button className="mt-2 text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded-[2px]">
            프로필 사진 추가
          </button>
        </div>
      </div>

      {/* 메인 입력 영역 */}
      <div className="flex flex-col mt-[60px] px-[430px]">
        <div className="w-[688px] flex flex-col gap-4">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <TextFieldSet
                label={label}
                value={form[key]}
                placeholder={placeholder}
                onChange={(v) => setForm({ ...form, [key]: v })}
              />
              {errors[key] && (
                <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}

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
            cancelText="확인"
            confirmText="로그인하기"
            variant="info"
          />
        </div>
      )}
    </div>
  );
};

export default SignupEmail;
