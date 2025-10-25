import React, { useRef, useState } from "react";
import { useForm } from "../hooks/useForm";
import LabeledInput from "../components/ui/LabeledInput";
import ReorderIcon from "@icons/reorder.svg?react";
import imageIcon from "../assets/icons/image.svg";

export default function SignUpFormPage() {
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

      if (!v.email.trim()) {
        err.email = "이메일을 입력해주세요.";
      }
      if (!v.password.trim()) {
        err.password = "비밀번호를 입력해주세요.";
      }
      if (v.password.trim() && v.password.length < 6) {
        err.password = "비밀번호는 6자 이상이어야 합니다.";
      }
      if (v.password2.trim() !== v.password.trim()) {
        err.password2 = "비밀번호가 일치하지 않습니다.";
      }
      if (!v.nickname.trim()) {
        err.nickname = "닉네임을 입력해주세요.";
      }
      return err;
    },
  });

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
  };

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      <header className="w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="메뉴 열기"
              className="w-6 h-6 inline-flex items-center justify-center"
            >
              <ReorderIcon className="w-6 h-6" />
            </button>
            <div className="logo-text select-none">GITLOG</div>
          </div>
          <div />
        </div>
      </header>

      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="h-8 max-h-8 max-w-[688px] mx-auto" />
          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col justify-center items-start gap-3">
            <h1 className="text-[24px] leading-[38.4px] font-medium text-[var(--Black)]">
              회원가입
            </h1>
            <p className="self-stretch text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray20)]">
              가입을 위해 회원님의 정보를 입력해주세요.
            </p>
          </div>
          <div className="h-5 max-h-5 max-w-[688px] mx-auto" />
        </div>
      </section>

      <main className="flex-1 w-full">
        <form
          className="mx-auto w-full max-w-[688px] px-4 py-8 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start gap-3">
            <span className="text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray56)]">
              프로필 사진
            </span>

            <div className="flex flex-col items-start gap-3">
              <div className="w-[90px] h-[90px] rounded-full overflow-hidden bg-[var(--Black)] flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="logo-text text-[40px] leading-none text-[var(--White)]">
                    G
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={pickFile}
                className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--Gray90)] px-2 py-1
                           text-[12px] leading-[19.2px] font-normal text-[var(--Gray56)]"
              >
                <img src={imageIcon} alt="" className="w-[14px] h-[14px]" />
                프로필 사진 추가
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
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
              classNameWrapper="flex flex-col gap-3"
            />

            <LabeledInput
              label="비밀번호"
              name="password"
              type="password"
              placeholder="••••••"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              classNameWrapper="flex flex-col gap-3"
            />

            <LabeledInput
              label="비밀번호 확인"
              name="password2"
              type="password"
              placeholder="••••••"
              value={values.password2}
              onChange={handleChange}
              error={errors.password2}
              classNameWrapper="flex flex-col gap-3"
            />

            <LabeledInput
              label="이름"
              name="realname"
              type="text"
              placeholder="이름"
              value={values.realname}
              onChange={handleChange}
              classNameWrapper="flex flex-col gap-3"
            />

            <LabeledInput
              label="생년월일"
              name="birth"
              type="text"
              placeholder="YYYY - MM - DD"
              value={values.birth}
              onChange={handleChange}
              classNameWrapper="flex flex-col gap-3"
            />

            <div className="flex flex-col gap-2">
              <LabeledInput
                label="닉네임"
                name="nickname"
                type="text"
                placeholder="닉네임"
                value={values.nickname}
                onChange={handleChange}
                error={errors.nickname}
                classNameWrapper="flex flex-col gap-3"
              />
              <p className="text-[12px] leading-[19.2px] font-light text-[var(--Gray-78,#C8C8C8)]">
                * 20글자 이내
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">
                한 줄 소개
              </label>
              <input
                name="intro"
                type="text"
                placeholder="한 줄 소개"
                value={values.intro}
                onChange={handleChange}
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
              {errors.intro && errors.intro.length > 0 && (
                <p className="text-[12px] leading-[19.2px] text-[var(--Negative)]">
                  {errors.intro}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="h-[38px] flex-1 px-3 rounded-[25px] border border-[var(--Gray90)]
                         bg-[var(--White)] text-[var(--Gray20)]
                         text-[14px] leading-[22.4px] font-normal tracking-[-0.07px]"
            >
              취소
            </button>

            <button
              type="submit"
              className="h-[38px] flex-1 px-3 rounded-[25px] border border-[var(--Point)]
                         bg-[var(--White)] text-[var(--Point)]
                         text-[14px] leading-[22.4px] font-normal tracking-[-0.07px]"
            >
              회원가입 완료
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
