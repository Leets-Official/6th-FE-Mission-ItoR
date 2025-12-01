// src/components/auth/OAuthSignUpForm.tsx
import React, { useRef, useState } from "react";

import { useForm } from "@src/hooks/useForm";
import { useOAuthSignUp } from "@src/hooks/useAuth";
import type { RegisterResponse } from "@src/api/auth";

import LabeledInput from "@src/components/ui/LabeledInput";
import LabeledTextArea from "@src/components/ui/LabeledTextArea";
import Button from "@ui/Button/Button";

import imageIcon from "@icons/image.svg";
import { saveTokens } from "@src/lib/authStorage";
import { validateEmail, validateNickname } from "@src/utils/validators";

type OAuthStateLike = {
  email?: string;
  nickname?: string;
  introduction?: string;
  profileUrl?: string;
  kakaoId?: number;
  [key: string]: unknown;
};

type Props = {
  state: OAuthStateLike | null;
  onSuccess: () => void;
};

export default function OAuthSignUpForm({ state, onSuccess }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    typeof state?.profileUrl === "string" ? state.profileUrl : null
  );

  const { values, errors, handleChange, runValidation } = useForm({
    initialValues: {
      email: state?.email ?? "",
      nickname: state?.nickname ?? "",
      intro: state?.introduction ?? "",
    },
    validate: (v) => {
      const err: Record<string, string> = {};
      const emailError = validateEmail(v.email);
      if (emailError) err.email = emailError;

      const nicknameError = validateNickname(v.nickname);
      if (nicknameError) err.nickname = nicknameError;

      return err;
    },
  });

  const { mutate: oauthSignUp, isPending, isError } = useOAuthSignUp();

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = runValidation();
    if (!ok) return;

    oauthSignUp(
      {
        email: values.email,
        nickname: values.nickname,
        password: "",
        provider: "kakao",
        profilePicture: preview || state?.profileUrl || undefined,
        birthDate: undefined,
        name: undefined,
        introduction: values.intro || state?.introduction || undefined,
      },
      {
        onSuccess: (res: RegisterResponse) => {
          type TokenishData = RegisterResponse["data"] & {
            accessToken?: string;
            refreshToken?: string;
          };

          const rawData = res?.data as TokenishData;

          const accessToken =
            typeof rawData.accessToken === "string"
              ? rawData.accessToken
              : undefined;
          const refreshToken =
            typeof rawData.refreshToken === "string"
              ? rawData.refreshToken
              : undefined;

          saveTokens(accessToken, refreshToken);
          onSuccess();
        },
      }
    );
  };

  const initialNickname = values.nickname.trim();
  const initial = initialNickname ? initialNickname[0].toUpperCase() : "";

  return (
    <form
      className="mx-auto flex w-full max-w-[688px] flex-col gap-6 px-4 py-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-3">
        <span className="text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray56)]">
          프로필 사진
        </span>

        <div className="flex flex-col items-start gap-3">
          <div className="flex h-[90px] w-[90px] items-center justify-center overflow-hidden rounded-full bg-[var(--Black)]">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : initial ? (
              <span className="logo-text text-[40px] leading-none text-[var(--White)]">
                {initial}
              </span>
            ) : null}
          </div>

          <button
            type="button"
            onClick={pickFile}
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--Gray90)] px-2 py-1 text-[12px] font-normal leading-[19.2px] text-[var(--Gray56)]"
            disabled={isPending}
          >
            <img src={imageIcon} alt="" className="h-[14px] w-[14px]" />
            프로필 사진 추가
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
            disabled={isPending}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <LabeledInput
          label="이메일"
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
          disabled
        />

        <LabeledInput
          label="닉네임"
          name="nickname"
          type="text"
          placeholder="닉네임"
          value={values.nickname}
          onChange={handleChange}
          error={errors.nickname}
          required
          disabled={isPending}
        />
        <p className="text-[12px] font-light leading-[19.2px] text-[var(--Gray-78,#C8C8C8)]">
          * 20글자 이내로 입력해주세요.
        </p>

        <LabeledTextArea
          label="한 줄 소개"
          name="intro"
          placeholder="한 줄 소개"
          rows={2}
          value={values.intro}
          onChange={handleChange}
          disabled={isPending}
        />

        {isError && (
          <p className="text-[12px] leading-[19.2px] text-[var(--Negative)]">
            회원가입에 실패했습니다. 다시 시도해주세요.
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="neutralOutline"
          className="flex-1"
          onClick={onSuccess}
          disabled={isPending}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="outlinePointWhite"
          className="flex-1"
          disabled={isPending}
        >
          {isPending ? "가입 중..." : "카카오로 회원가입 완료"}
        </Button>
      </div>
    </form>
  );
}
