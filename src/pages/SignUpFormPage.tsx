// src/pages/SignUpFormPage.tsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "@src/hooks/useForm";
import { useSignUp } from "@src/hooks/useAuth";

import LabeledInput from "@src/components/ui/LabeledInput";
import LabeledTextArea from "@src/components/ui/LabeledTextArea";
import Button from "@ui/Button/Button";

import ReorderIcon from "@icons/reorder.svg?react";
import imageIcon from "@icons/image.svg";

export default function SignUpFormPage() {
  const nav = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
      const err: { [key: string]: string } = {};
      if (!v.email.trim()) err.email = "이메일을 입력해주세요.";
      if (!v.password.trim()) err.password = "비밀번호를 입력해주세요.";
      else if (v.password.length < 6) err.password = "비밀번호는 6자 이상이어야 합니다.";
      if (v.password2.trim() !== v.password.trim()) err.password2 = "비밀번호가 일치하지 않습니다.";
      if (!v.nickname.trim()) err.nickname = "닉네임을 입력해주세요.";
      return err;
    },
  });

  const { mutate: signUp, isPending, isError, isSuccess } = useSignUp();

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

    signUp({
      email: values.email,
      nickname: values.nickname,
      password: values.password,
      profilePicture: preview || undefined,
      birthDate: values.birth || undefined,
      name: values.realname || undefined,
      introduction: values.intro || undefined,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // 회원가입 성공 시 로그인 페이지로 이동
      nav("/login");
    }
  }, [isSuccess, nav]);

  /** ===== 입력 필드 메타데이터 (map 렌더링) ===== */
  type FieldName = "email" | "password" | "password2" | "realname" | "birth" | "nickname";
  const inputFields: Array<{
    label: string;
    name: FieldName;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder: string;
    required?: boolean;
    helper?: string; // 닉네임 보조 문구 등
  }> = [
    { label: "이메일", name: "email", type: "email", placeholder: "이메일", required: true },
    { label: "비밀번호", name: "password", type: "password", placeholder: "••••••", required: true },
    { label: "비밀번호 확인", name: "password2", type: "password", placeholder: "••••••", required: true },
    { label: "이름", name: "realname", type: "text", placeholder: "이름" },
    { label: "생년월일", name: "birth", type: "text", placeholder: "YYYY - MM - DD" },
    { label: "닉네임", name: "nickname", type: "text", placeholder: "닉네임", required: true, helper: "* 20글자 이내" },
  ];

  const getError = (name: FieldName) => errors?.[name];

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      {/* 상단 헤더 */}
      <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
        <div className="mx-auto flex h-[56px] w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="inline-flex h-6 w-6 items-center justify-center"
            >
              <ReorderIcon className="h-6 w-6" />
            </button>
            <div className="logo-text select-none">GITLOG</div>
          </div>
          <div />
        </div>
      </header>

      {/* 타이틀 영역 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="mx-auto h-8 max-h-8 max-w-[688px]" />
          <div className="mx-auto flex w-full max-w-[688px] flex-col items-start justify-center gap-3 px-4 py-3">
            <h1 className="text-[24px] font-medium leading-[38.4px] text-[var(--Black)]">회원가입</h1>
            <p className="self-stretch text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray20)]">
              가입을 위해 회원님의 정보를 입력해주세요.
            </p>
          </div>
          <div className="mx-auto h-5 max-h-5 max-w-[688px]" />
        </div>
      </section>

      {/* 본문 폼 */}
      <main className="w-full flex-1">
        <form className="mx-auto flex w/full max-w-[688px] flex-col gap-6 px-4 py-8" onSubmit={handleSubmit}>
          {/* 프로필 이미지 업로드 */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray56)]">
              프로필 사진
            </span>

            <div className="flex flex-col items-start gap-3">
              <div className="flex h-[90px] w/[90px] items-center justify-center overflow-hidden rounded-full bg-[var(--Black)]">
                {preview ? (
                  <img src={preview} alt="profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="logo-text text-[40px] leading-none text-[var(--White)]">G</span>
                )}
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

          {/* 입력 필드들 (map 렌더링) */}
          <div className="flex flex-col gap-4">
            {inputFields.map((f) => (
              <div key={f.name} className="flex flex-col gap-2">
                <LabeledInput
                  label={f.label}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(values)[f.name] || ""} // useForm은 string 인덱스 기반이므로 안전 캐스팅
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

            {/* 한 줄 소개 (textarea는 별도 컴포넌트 유지) */}
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

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="neutralOutline" className="flex-1" onClick={reset} disabled={isPending}>
              취소
            </Button>

            <Button type="submit" variant="outlinePointWhite" className="flex-1" disabled={isPending}>
              {isPending ? "가입 중..." : "회원가입 완료"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
