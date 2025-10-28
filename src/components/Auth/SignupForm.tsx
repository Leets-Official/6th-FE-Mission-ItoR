import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, registerKakao } from "@/api/auth";
import TextFieldSet from "@/components/Text/TextFieldSet";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

interface SignupFormProps {
  type: "email" | "kakao";
  kakaoUser?: {
    email: string;
    name: string;
    profilePicture: string;
    kakaoId: number;
  };
}

export default function SignupForm({ type, kakaoUser }: SignupFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    email: kakaoUser?.email || "",
    password: "",
    passwordConfirm: "",
    name: kakaoUser?.name || "",
    birthDate: "",
    nickname: "",
    introduction: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (type === "email" && form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      if (type === "email") {
        await register({
          email: form.email,
          nickname: form.nickname,
          password: form.password,
          profilePicture: "",
          birthDate: form.birthDate,
          name: form.name,
          introduction: form.introduction,
        });
      } else {
        await registerKakao({
          email: form.email,
          nickname: form.nickname,
          profilePicture: kakaoUser?.profilePicture || "",
          birthDate: form.birthDate,
          name: form.name,
          introduction: form.introduction,
          kakaoId: kakaoUser!.kakaoId,
        });
      }
      setShowSuccessModal(true);
    } catch (error) {
      alert("회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <TextFieldSet
        title="이메일"
        placeholder="이메일"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      {type === "email" && (
        <>
          <TextFieldSet
            title="비밀번호"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <TextFieldSet
            title="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
          />
        </>
      )}

      <TextFieldSet
        title="이름"
        placeholder="이름"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <TextFieldSet
        title="생년월일"
        placeholder="YYYY-MM-DD"
        value={form.birthDate}
        onChange={(e) => handleChange("birthDate", e.target.value)}
      />

      <TextFieldSet
        title="닉네임"
        placeholder="닉네임"
        value={form.nickname}
        onChange={(e) => handleChange("nickname", e.target.value)}
      />

      <TextFieldSet
        title="한 줄 소개"
        placeholder="한 줄 소개"
        value={form.introduction}
        onChange={(e) => handleChange("introduction", e.target.value)}
      />

      <Button
        label={loading ? "처리 중..." : "회원가입 완료"}
        variant="primaryOutline"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      />

      <Modal
        open={showSuccessModal}
        title="회원가입이 완료되었습니다!"
        onClose={() => navigate("/", { replace: true })}
        onConfirm={() => navigate("/", { replace: true, state: { openLogin: true } })}
        cancelText="확인"
        confirmText="로그인하기"
      />
    </div>
  );
}
