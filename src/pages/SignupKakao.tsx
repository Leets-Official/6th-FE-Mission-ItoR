import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Modal from "@/components/Modal";
import Profile from "@/assets/svgs/Profile.svg?react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation import
import api from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useUploadImage } from "@/hooks/usePosts"; // useUploadImage import

type FormState = {
  email: string;
  name: string;
  birthDate: string;
  nickname: string;
  introduction: string;
  profilePicture: string;
  kakaoId: number; // kakaoId는 number 타입
};

const SignupKakao: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용
  const fileInputRef = React.useRef<HTMLInputElement>(null); // 파일 입력 ref
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage(); // 이미지 업로드 훅

  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
    profilePicture: "",
    kakaoId: 0, // 초기값 설정
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // location.state에서 데이터 가져오기
  useEffect(() => {
    const kakaoData = location.state as {
      kakaoId: number;
      email?: string;
      name?: string;
      nickname?: string;
      picture?: string;
      introduction?: string;
    };

    if (kakaoData && kakaoData.kakaoId) {
      setForm((prev) => ({
        ...prev,
        kakaoId: kakaoData.kakaoId,
        email: kakaoData.email || "",
        name: kakaoData.name || "",
        nickname: kakaoData.nickname || "",
        profilePicture: kakaoData.picture || "",
        introduction: kakaoData.introduction || "",
      }));
    } else {
      // 카카오 데이터가 없으면 로그인 페이지로 리다이렉트
      navigate("/login", { replace: true });
    }
  }, [location.state, navigate]);

  /** 입력값 검증 */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.email.trim()) newErrors.email = "이메일을 입력해 주세요.";
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
        name: form.name.trim(),
        birthDate: form.birthDate,
        introduction: form.introduction.trim(),
        profilePicture: form.profilePicture || undefined,
        kakaoId: form.kakaoId, // kakaoId는 이미 number 타입
      };

      const res = await api.post("/auth/register-oauth", payload);
      console.log("카카오 회원가입 성공:", res.data);

      // 토큰 저장 (백엔드 응답에 토큰이 있다면)
      const { accessToken, refreshToken } = res.data?.data || {};
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      }

      setShowModal(true);
    } catch (error: unknown) {
      console.error("카카오 회원가입 실패:", error);
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 프로필 사진 업로드 핸들러
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-white relative">
      <Header variant="none" />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleProfileChange}
        accept="image/*"
        hidden
      />

      <div className="w-full h-[114px] flex flex-col justify-center border-b border-gray-300 bg-gray-50 px-[430px]">
        <h1 className="text-[32px] font-medium text-gray-900">카카오 회원가입</h1>
        <p className="text-[14px] text-gray-600 mt-1">
          부족한 정보를 입력하고 회원가입을 완료해주세요.
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
          {[
            { key: "email", label: "이메일", placeholder: "이메일", disabled: true }, // 이메일은 카카오에서 받아오므로 수정 불가
            { key: "name", label: "이름", placeholder: "이름" },
            { key: "birthDate", label: "생년월일", placeholder: "YYYY.MM.DD" },
            { key: "nickname", label: "닉네임", placeholder: "닉네임" },
            { key: "introduction", label: "한 줄 소개", placeholder: "한 줄 소개" },
          ].map(({ key, label, placeholder, disabled }) => (
            <TextFieldSet
              key={key}
              label={label}
              value={form[key as keyof FormState] as string}
              placeholder={placeholder}
              onChange={(v) => handleChange(key as keyof FormState, v)}
              disabled={disabled} // disabled prop 추가
            />
          ))}

          <button
            type="button"
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

export default SignupKakao;
