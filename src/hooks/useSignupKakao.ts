import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useUploadImage } from "@/hooks/usePosts";

export type FormState = {
  email: string;
  name: string;
  birthDate: string;
  nickname: string;
  introduction: string;
  profilePicture: string;
  kakaoId: number;
};

export const useSignupKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      alert("카카오 로그인 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/login", { replace: true });
    }
  }, [location.state, navigate]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    if (!form.email.trim()) newErrors.email = "이메일을 입력해 주세요.";
    if (!form.name.trim()) newErrors.name = "이름을 입력해 주세요.";
    if (!form.birthDate.trim()) {
      newErrors.birthDate = "생년월일을 입력해 주세요.";
    } else {
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
      alert("입력 정보를 확인해주세요.");
      return;
    }
    if (!form.kakaoId || form.kakaoId === 0) {
      alert("카카오 로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.");
      navigate("/login", { replace: true });
      return;
    }
    setIsSubmitting(true);
    try {
      const formattedBirthDate = form.birthDate.replace(/\./g, "-");
      const payload = {
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        name: form.name.trim(),
        birthDate: formattedBirthDate,
        introduction: form.introduction.trim() || undefined,
        profilePicture: form.profilePicture || undefined,
        kakaoId: form.kakaoId,
      };
      const res = await api.post("/auth/register-oauth", payload);
      const responseData = res.data?.data || res.data;
      const { accessToken, refreshToken } = responseData;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("nickname", form.nickname);
        if (form.profilePicture) localStorage.setItem("profilePicture", form.profilePicture);
        if (form.introduction) localStorage.setItem("introduction", form.introduction);
      }
      setShowModal(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.responseMessage ||
          "회원가입 중 오류가 발생했습니다.";
        alert(errorMessage);
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(file, {
      onSuccess: (url) => setForm((prev) => ({ ...prev, profilePicture: url })),
      onError: () => alert("이미지 업로드에 실패했습니다. 다시 시도해주세요."),
    });
  };

  return {
    form,
    errors,
    showModal,
    isSubmitting,
    isUploading,
    setShowModal,
    navigate,
    handleChange,
    handleSubmit,
    handleProfileChange,
  };
};
