// src/components/auth/SignUpForm.tsx
import React, { useRef, useState } from "react";

import { useForm } from "@src/hooks/useForm";
import { useSignUp } from "@src/hooks/useAuth";

import LabeledInput from "@src/components/ui/LabeledInput";
import LabeledTextArea from "@src/components/ui/LabeledTextArea";
import Button from "@ui/Button/Button";

import imageIcon from "@icons/image.svg";
import { uploadImageToPresignedUrl } from "@src/api/imageApi";

type Props = {
  onSuccess: () => void;
};

export default function SignUpForm({ onSuccess }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);

  const { values, errors, handleChange, runValidation, reset } = useForm({
    initialValues: {
      email: "",
      password: "",
      password2: "",
      realname: "",
      birth: "",
      nickname: "",
      intro: "",
    },
    validate: (v) => {
      const err: Record<string, string> = {};
      if (!v.email.trim()) err.email = "이메일을 입력해주세요.";
      if (!v.password.trim()) err.password = "비밀번호를 입력해주세요.";
      else if (v.password.length < 6)
        err.password = "비밀번호는 6자 이상이어야 합니다.";
      if (v.password2.trim() !== v.password.trim())
        err.password2 = "비밀번호가 일치하지 않습니다.";
      if (!v.nickname.trim()) err.nickname = "닉네임을 입력해주세요.";
      return err;
    },
  });

  const { mutate: signUp, isPending, isError } = useSignUp();

  const pickFile = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const localUrl = URL.createObjectURL(f);
    setPreview(localUrl);

    try {
      setIsUploadingProfile(true);
      const uploadedUrl = await uploadImageToPresignedUrl(f);
      setProfileUrl(uploadedUrl);
    } catch (err) {
      console.error(err);
      alert("프로필 이미지 업로드에 실패했어요. 다시 시도해주세요.");
      setProfileUrl(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setIsUploadingProfile(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = runValidation();
    if (!ok) return;

    if (isUploadingProfile) {
      alert("프로필 이미지를 업로드 중입니다. 잠시만 기다려주세요.");
      return;
    }

    signUp(
      {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
        profilePicture: profileUrl || undefined,
        birthDate: values.birth || undefined,
        name: values.realname || undefined,
        introduction: values.intro || undefined,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  const initial = (values.nickname?.trim()?.[0] ?? "").toUpperCase();

  type FieldName =
    | "email"
    | "password"
    | "password2"
    | "realname"
    | "birth"
    | "nickname";

  const inputFields: Array<{
    label: string;
    name: FieldName;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder: string;
    required?: boolean;
    helper?: string;
  }> = [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일",
      required: true,
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "••••••",
      required: true,
    },
    {
      label: "비밀번호 확인",
      name: "password2",
      type: "password",
      placeholder: "••••••",
      required: true,
    },
    {
      label: "이름",
      name: "realname",
      type: "text",
      placeholder: "이름",
    },
    {
      label: "생년월일",
      name: "birth",
      type: "text",
      placeholder: "YYYY - MM - DD",
    },
    {
      label: "닉네임",
      name: "nickname",
      type: "text",
      placeholder: "닉네임",
      required: true,
      helper: "* 20글자 이내",
    },
  ];

  const getError = (name: FieldName) => errors[name];

  return (
    <form
      className="mx-auto flex w/full max-w-[688px] flex-col gap-6 px-4 py-8"
      onSubmit={handleSubmit}
    >
      {/* 프로필 이미지 */}
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
            disabled={isPending || isUploadingProfile}
          >
            <img src={imageIcon} alt="" className="h-[14px] w-[14px]" />
            {isUploadingProfile ? "이미지 업로드 중..." : "프로필 사진 추가"}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
            disabled={isPending || isUploadingProfile}
          />
        </div>
      </div>

      {/* 입력 필드들 */}
      <div className="flex flex-col gap-4">
        {inputFields.map((f) => (
          <div key={f.name} className="flex flex-col gap-2">
            <LabeledInput
              label={f.label}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={handleChange}
              error={getError(f.name)}
              required={f.required}
              disabled={isPending}
            />
            {f.helper && (
              <p className="text-[12px] font-light leading-[19.2px] text-[var(--Gray-78,#C8C8C8)]">
                {f.helper}
              </p>
            )}
          </div>
        ))}

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
            가입에 실패했습니다. 다시 시도해주세요.
          </p>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="neutralOutline"
          className="flex-1"
          onClick={reset}
          disabled={isPending || isUploadingProfile}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="outlinePointWhite"
          className="flex-1"
          disabled={isPending || isUploadingProfile}
        >
          {isPending ? "가입 중..." : "회원가입 완료"}
        </Button>
      </div>
    </form>
  );
}
