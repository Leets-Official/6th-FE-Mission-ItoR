import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useUploadImage } from "@/hooks/usePosts";

export const useSignupEmail = () => {
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
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

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

      await api.post("/auth/register", payload);
      setShowModal(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
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

  return {
    form,
    setForm,
    errors,
    showModal,
    setShowModal,
    isSubmitting,
    isUploading,
    navigate,
    handleSubmit,
    handleProfileChange,
    fields,
  };
};
