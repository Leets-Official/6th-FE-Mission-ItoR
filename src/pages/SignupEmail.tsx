import React, { useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Modal from "@/components/Modal";
import Profile from "@/assets/svgs/Profile.svg?react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useUploadImage } from "@/hooks/usePosts"; // Import the upload hook

const SignupEmail: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage(); // Use the hook

  /** 이메일 유효성 검사 */
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  /** 입력값 검증 */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isEmail(form.email)) newErrors.email = "이메일 형식이 올바르지 않습니다.";
    if (!form.password.trim()) newErrors.password = "비밀번호를 입력해 주세요.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!form.name.trim()) newErrors.name = "이름을 입력해 주세요.";
    if (!form.birthDate.trim()) newErrors.birthDate = "생년월일을 입력해 주세요.";
    if (!form.nickname.trim() || form.nickname.length > 20)
      newErrors.nickname = "닉네임은 최대 20글자까지 가능합니다.";
    if (form.introduction.length > 30)
      newErrors.introduction = "한 줄 소개는 최대 30글자까지 가능합니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** 회원가입 요청 */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
        profilePicture: form.profilePicture || undefined,
        birthDate: form.birthDate,
        name: form.name.trim(),
        introduction: form.introduction.trim(),
      };

      const res = await api.post("/auth/register", payload);
      console.log("회원가입 성공:", res.data);

      setShowModal(true);
    } catch (error: unknown) {
      console.error("회원가입 실패:", error);
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /** 프로필 이미지 업로드 */
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        setForm((prev) => ({ ...prev, profilePicture: url }));
      },
      onError: () => {
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const fields = [
    { key: "email", label: "이메일", placeholder: "이메일" },
    { key: "password", label: "비밀번호", placeholder: "비밀번호" },
    { key: "confirmPassword", label: "비밀번호 확인", placeholder: "비밀번호 확인" },
    { key: "name", label: "이름", placeholder: "이름" },
    { key: "birthDate", label: "생년월일", placeholder: "YYYY-MM-DD" },
    { key: "nickname", label: "닉네임", placeholder: "닉네임 (20자 이내)" },
    { key: "introduction", label: "한 줄 소개", placeholder: "한 줄 소개 (30자 이내)" },
  ] as const;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white relative">
      <Header variant="none" />

      <div className="w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">회원가입</h1>
        <p className="text-[14px] text-gray-600 mt-1">
          가입을 위해 회원님의 정보를 입력해주세요.
        </p>
      </div>

      {/* 프로필 업로드 */}
      <div className="relative w-full h-[180px]">
        <div className="absolute left-[430px] top-[40px] flex flex-col items-start gap-2">
          {form.profilePicture ? (
            <img
              src={form.profilePicture}
              alt="프로필"
              className="w-[88px] h-[88px] rounded-full object-cover"
            />
          ) : (
            <Profile className="w-[88px] h-[88px]" />
          )}
          <label className="text-[12px] text-gray-600 border border-gray-300 px-3 py-1 rounded-[2px] cursor-pointer hover:bg-gray-50 transition">
            {isUploading ? "업로드 중..." : "프로필 사진 추가"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="flex flex-col mt-[60px] px-[430px]">
        <div className="w-[688px] flex flex-col gap-4">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <TextFieldSet
                label={label}
                value={form[key as keyof typeof form]}
                placeholder={placeholder}
                onChange={(v) => setForm({ ...form, [key]: v })}
                type={key.includes("password") ? "password" : "text"}
              />
              {errors[key] && (
                <p className="text-[#FF3F3F] text-[12px] ml-[16px] mt-[-8px]">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-[46px] mt-6 border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition disabled:opacity-50"
          >
            {isSubmitting ? "가입 중..." : "회원가입 완료"}
          </button>
        </div>
      </div>

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
