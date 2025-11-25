import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Modal from "@/components/Modal";
import Profile from "@/assets/svgs/Profile.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useUploadImage } from "@/hooks/usePosts";

type FormState = {
  email: string;
  name: string;
  birthDate: string;
  nickname: string;
  introduction: string;
  profilePicture: string;
  kakaoId: number;
};

const SignupKakao: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
    profilePicture: "",
    kakaoId: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('SignupKakao - location.state:', location.state);
    
    const kakaoData = location.state as {
      kakaoId: number;
      email?: string;
      name?: string;
      nickname?: string;
      picture?: string;
      introduction?: string;
    };

    if (kakaoData && kakaoData.kakaoId) {
      console.log('카카오 데이터 설정:', kakaoData);
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
      console.error('카카오 데이터가 없습니다:', kakaoData);
      alert('카카오 로그인 정보가 없습니다. 다시 로그인해주세요.');
      navigate("/login", { replace: true });
    }
  }, [location.state, navigate]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // 에러 메시지 제거
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.email.trim()) {
      newErrors.email = "이메일을 입력해 주세요.";
    }
    if (!form.name.trim()) {
      newErrors.name = "이름을 입력해 주세요.";
    }
    if (!form.birthDate.trim()) {
      newErrors.birthDate = "생년월일을 입력해 주세요.";
    } else {
      // 날짜 형식 검증 (YYYY-MM-DD 또는 YYYY.MM.DD)
      const dateRegex = /^\d{4}[-./]\d{2}[-./]\d{2}$/;
      if (!dateRegex.test(form.birthDate)) {
        newErrors.birthDate = "올바른 날짜 형식으로 입력해주세요 (예: 2000-01-01)";
      }
    }
    if (!form.nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해 주세요.";
    } else if (form.nickname.length > 20) {
      newErrors.nickname = "닉네임은 최대 20글자까지 가능합니다.";
    }
    if (form.introduction.length > 30) {
      newErrors.introduction = "한 줄 소개는 최대 30글자까지 가능합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('입력 정보를 확인해주세요.');
      return;
    }

    if (!form.kakaoId || form.kakaoId === 0) {
      alert('카카오 로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.');
      navigate("/login", { replace: true });
      return;
    }

    setIsSubmitting(true);

    try {
      // 날짜 형식을 YYYY-MM-DD로 통일
      const formattedBirthDate = form.birthDate.replace(/\./g, '-');
      
      const payload = {
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        name: form.name.trim(),
        birthDate: formattedBirthDate,
        introduction: form.introduction.trim() || undefined,
        profilePicture: form.profilePicture || undefined,
        kakaoId: form.kakaoId,
      };

      console.log('회원가입 요청 payload:', payload);

      // 엔드포인트 경로 수정: /auth/register-oauth → /auth/register/oauth
      const res = await api.post("/auth/register/oauth", payload);
      console.log('카카오 회원가입 성공:', res.data);

      // 응답 구조 확인 후 토큰 저장
      const responseData = res.data?.data || res.data;
      const { accessToken, refreshToken } = responseData;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        
        // 추가 정보 저장
        localStorage.setItem("nickname", form.nickname);
        if (form.profilePicture) {
          localStorage.setItem("profilePicture", form.profilePicture);
        }
        if (form.introduction) {
          localStorage.setItem("introduction", form.introduction);
        }
      }

      setShowModal(true);
    } catch (error: unknown) {
      console.error('카카오 회원가입 실패:', error);
      
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.responseMessage ||
                           '회원가입 중 오류가 발생했습니다.';
        alert(errorMessage);
        console.error('에러 상세:', error.response?.data);
      } else {
        alert('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(file, {
      onSuccess: (url) => {
        console.log('프로필 이미지 업로드 성공:', url);
        setForm((prev) => ({ ...prev, profilePicture: url }));
      },
      onError: (error) => {
        console.error('이미지 업로드 실패:', error);
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
          <TextFieldSet
            label="이메일"
            value={form.email}
            placeholder="이메일"
            onChange={(v) => handleChange("email", v)}
            disabled={true}
          />
          <TextFieldSet
            label="이름"
            value={form.name}
            placeholder="이름"
            onChange={(v) => handleChange("name", v)}
          />
          <TextFieldSet
            label="생년월일"
            value={form.birthDate}
            placeholder="YYYY-MM-DD"
            onChange={(v) => handleChange("birthDate", v)}
          />
          <TextFieldSet
            label="닉네임"
            value={form.nickname}
            placeholder="닉네임 (최대 20자)"
            onChange={(v) => handleChange("nickname", v)}
          />
          <TextFieldSet
            label="한 줄 소개"
            value={form.introduction}
            placeholder="한 줄 소개 (최대 30자)"
            onChange={(v) => handleChange("introduction", v)}
          />

          {/* 에러 메시지 표시 */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 text-sm">
              {Object.values(errors).map((error, idx) => (
                <div key={idx}>• {error}</div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-[46px] mt-6 border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "가입 중..." : "회원가입 완료"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
          <Modal
            titleLine1="회원가입이 완료되었습니다!"
            onClose={() => {
              setShowModal(false);
              navigate("/", { replace: true });
            }}
            onConfirm={() => navigate("/", { replace: true })}
            cancelText="확인"
            confirmText="메인으로 가기"
            variant="info"
          />
        </div>
      )}
    </div>
  );
};

export default SignupKakao;