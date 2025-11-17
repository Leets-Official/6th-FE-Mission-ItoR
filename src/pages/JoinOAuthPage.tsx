// src/pages/JoinOAuthPage.tsx
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useForm } from "@src/hooks/useForm";
import { useOAuthSignUp } from "@src/hooks/useAuth";
import type { RegisterResponse } from "@src/api/auth";

import LabeledInput from "@src/components/ui/LabeledInput";
import LabeledTextArea from "@src/components/ui/LabeledTextArea";
import Button from "@ui/Button/Button";

import ReorderIcon from "@icons/reorder.svg?react";
import imageIcon from "@icons/image.svg";

// 카카오 redirect 에서 넘겨주는 state 형태
type OAuthState = {
  email?: string;
  nickname?: string;
  introduction?: string;
  profileUrl?: string;
  kakaoId?: number;
  // 그 외 필드도 올 수 있음
  [key: string]: unknown;
};

export default function JoinOAuthPage() {
  const nav = useNavigate();
  const location = useLocation();
  const state = (location.state as OAuthState | null) || null;

  // 잘못 들어온 경우 홈으로 보냄
  useEffect(() => {
    if (!state || !state.email || !state.nickname) {
      nav("/", { replace: true });
    }
  }, [state, nav]);

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
      if (!v.email.trim()) err.email = "이메일 정보가 없습니다.";
      if (!v.nickname.trim()) err.nickname = "닉네임을 입력해주세요.";
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
        password: "", // 카카오는 실제 비밀번호 없음 (더미 값)
        provider: "kakao",
        profilePicture: preview || state?.profileUrl || undefined,
        birthDate: undefined,
        name: undefined,
        introduction: values.intro || state?.introduction || undefined,
      },
      {
        // useOAuthSignUp 의 성공 타입은 RegisterResponse 로 추론됨
        onSuccess: (res: RegisterResponse) => {
          // 백엔드가 토큰을 같이 내려줄 수도 있으니 확장 타입으로 안전하게 파싱
          type TokenishData = RegisterResponse["data"] & {
            accessToken?: string;
            refreshToken?: string;
          };

          const rawData = res?.data as TokenishData;

          const accessToken =
            typeof rawData.accessToken === "string" ? rawData.accessToken : undefined;
          const refreshToken =
            typeof rawData.refreshToken === "string" ? rawData.refreshToken : undefined;

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }

          nav("/", { replace: true });
        },
      }
    );
  };

  const initialNickname = values.nickname.trim();
  const initial = initialNickname ? initialNickname[0].toUpperCase() : "";

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      {/* 헤더 */}
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

      {/* 상단 영역 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="mx-auto h-8 max-h-8 max-w-[688px]" />
          <div className="mx-auto flex w-full max-w-[688px] flex-col items-start justify-center gap-3 px-4 py-3">
            <h1 className="text-[24px] font-medium leading-[38.4px] text-[var(--Black)]">
              카카오 회원가입
            </h1>
            <p className="self-stretch text-[14px] font-light leading-[22.4px] tracking-[-0.07px] text-[var(--Gray20)]">
              카카오 계정으로 가입을 완료하기 위해 추가 정보를 입력해주세요.
            </p>
          </div>
          <div className="mx-auto h-5 max-h-5 max-w-[688px]" />
        </div>
      </section>

      {/* 본문 */}
      <main className="w-full flex-1">
        <form
          className="mx-auto flex w-full max-w-[688px] flex-col gap-6 px-4 py-8"
          onSubmit={handleSubmit}
        >
          {/* 프로필 사진 */}
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

          {/* 입력 필드들 */}
          <div className="flex flex-col gap-4">
            {/* 이메일 (읽기 전용) */}
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

            {/* 닉네임 */}
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

            {/* 한 줄 소개 */}
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

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="neutralOutline"
              className="flex-1"
              onClick={() => nav("/", { replace: true })}
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
      </main>
    </div>
  );
}
