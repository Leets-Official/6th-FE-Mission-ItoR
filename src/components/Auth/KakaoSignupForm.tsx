import React, { useState } from "react";
import * as S from "./Signup.styled";
import TextFieldSet from "@/components/Text/TextFieldSet";
import Button from "@/components/Button/Button";
import * as E from "@/utils/validators";
import Avatar from "@/components/Avatar/Avatar";
import SmallButton from "@/components/SmallButton/SmallButton";
import { AddPhotoAlternateIcon, KakaoIcon } from "@/assets/icons";
import TextField from "@/components/Text/TextField";
import Modal from "@/components/Modal/Modal";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";

const KakaoSignupForm = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    birth: "",
    nickname: "",
    intro: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    newErrors.email = E.validateEmail(form.email);
    newErrors.name = E.validateName(form.name);
    newErrors.nickname = E.validateNickname(form.nickname);
    newErrors.birth = E.validateBirth(form.birth);
    newErrors.intro = E.validateIntro(form.intro);

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim() && !newErrors[key]) {
        newErrors[key] = "반드시 입력해야하는 필수 사항입니다";
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).every((v) => !v)) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(true); // 페이지 이동 대신 로그인 모달 띄우기
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

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

      <div className={S.socialSection}>
        <p className={S.socialLabel}>소셜 로그인</p>
        <div className={S.socialWrapper}>
          <KakaoIcon className={S.kakaoIcon} />
          <TextField value="카카오 로그인" disabled fullWidth className={S.kakaoTextField} />
        </div>
      </div>

      <div className={S.signupFormFields}>
        <TextFieldSet
          title="이메일"
          placeholder="이메일"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />
        <TextFieldSet
          title="이름"
          placeholder="이름"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
        />
        <TextFieldSet
          title="생년월일"
          placeholder="YYYY-MM-DD"
          value={form.birth}
          onChange={(e) => handleChange("birth", e.target.value)}
          error={errors.birth}
        />
        <TextFieldSet
          title="닉네임"
          placeholder="닉네임"
          helperText="20글자 이내"
          value={form.nickname}
          onChange={(e) => handleChange("nickname", e.target.value)}
          error={errors.nickname}
        />
        <TextFieldSet
          title="한 줄 소개"
          placeholder="한 줄 소개"
          value={form.intro}
          onChange={(e) => handleChange("intro", e.target.value)}
          error={errors.intro}
        />
      </div>

      <Button label="회원가입 완료" variant="primaryOutline" fullWidth onClick={handleSubmit} />

      <Modal
        open={isModalOpen}
        title="회원가입이 완료되었습니다!"
        onClose={handleModalClose}
        onConfirm={handleLoginRedirect}
        cancelText="확인"
        confirmText="로그인하기"
        cancelColor="bg-brand-white text-brand-black hover:bg-brand-lightGray"
        confirmColor="bg-brand-blue hover:bg-brand-blue/90 text-brand-white"
      />

      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
    </div>
  );
};

export default KakaoSignupForm;
