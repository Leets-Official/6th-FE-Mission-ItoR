import React from "react";
import * as S from "./Signup.styled";
import TextFieldSet from "@/components/Text/TextFieldSet";
import Button from "@/components/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
import SmallButton from "@/components/SmallButton/SmallButton";
import { AddPhotoAlternateIcon, KakaoIcon } from "@/assets/icons";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {
  type: "email" | "kakao";
}

const SignupForm: React.FC<SignupFormProps> = ({ type }) => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (type === "email" && form.password !== form.passwordConfirm) {
      setErrors({ passwordConfirm: "비밀번호가 일치하지 않습니다." });
      return;
    }

    const requestBody = {
      email: form.email,
      nickname: form.nickname,
      password: form.password,
      profilePicture: "",
      birthDate: form.birth,
      name: form.name,
      introduction: form.intro,
    };

    try {
      const success = await handleRegister(requestBody);
      if (success) setIsModalOpen(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 입력 정보를 다시 확인해주세요.");
    }
  };

  const fields = [
    { key: "email", title: "이메일", placeholder: "이메일" },
    ...(type === "email"
      ? [
          { key: "password", title: "비밀번호", placeholder: "비밀번호", type: "password" },
          {
            key: "passwordConfirm",
            title: "비밀번호 확인",
            placeholder: "비밀번호 확인",
            type: "password",
          },
        ]
      : []),
    { key: "name", title: "이름", placeholder: "이름" },
    { key: "birth", title: "생년월일", placeholder: "YYYY-MM-DD" },
    { key: "nickname", title: "닉네임", placeholder: "닉네임", helperText: "20글자 이내" },
    { key: "intro", title: "한 줄 소개", placeholder: "한 줄 소개" },
  ];

  return (
    <div className={S.signupFormContainer}>
      <div className={S.profileSection}>
        <label className={S.profileLabel}>프로필 사진</label>
        <div className={S.profileInner}>
          <Avatar size="xl" src="" alt="Profile" />
          <SmallButton
            label="프로필 사진 추가"
            variant="secondaryOutline"
            leftIcon={<AddPhotoAlternateIcon className={S.profileAddIcon} />}
            className="border-brand-lightGray text-xs"
          />
        </div>
      </div>

      {type === "kakao" && (
        <div className={S.socialSection}>
          <p className={S.socialLabel}>소셜 로그인</p>
          <div className={S.socialWrapper}>
            <KakaoIcon className={S.kakaoIcon} />
            <TextField value="카카오 로그인" disabled fullWidth className={S.kakaoTextField} />
          </div>
        </div>
      )}

      <div className={S.signupFormFields}>
        {fields.map(({ key, title, placeholder, helperText, type }) => (
          <TextFieldSet
            key={key}
            title={title}
            placeholder={placeholder}
            helperText={helperText}
            type={type}
            value={form[key as keyof typeof form]}
            onChange={(e) => handleChange(key, e.target.value)}
            error={errors[key]}
          />
        ))}
      </div>

      <Button
        label={loading ? "회원가입 중..." : "회원가입 완료"}
        variant="primaryOutline"
        fullWidth
        onClick={handleSubmit}
      />

      <Modal
        open={isModalOpen}
        title="회원가입이 완료되었습니다!"
        onClose={() => {
          setIsModalOpen(false);
          navigate("/", { replace: true });
        }}
        onConfirm={() => {
          setIsModalOpen(false);
          navigate("/", { replace: true, state: { openLogin: true } });
        }}
        cancelText="확인"
        confirmText="로그인하기"
        cancelColor="bg-white text-brand-darkGray border border-brand-lightGray hover:bg-brand-lightGray"
        confirmColor="bg-brand-blue text-white hover:bg-brand-blue/90"
      />

      <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default SignupForm;
