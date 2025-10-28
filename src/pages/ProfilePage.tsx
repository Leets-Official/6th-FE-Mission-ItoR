import React, { useRef, useState, useCallback } from "react";
import ReorderIcon from "@icons/reorder.svg?react";
import Button from "../components/ui/Button/Button";
import LabeledInput from "../components/ui/LabeledInput";
import LabeledTextArea from "../components/ui/LabeledTextArea";

export default function AccountProfilePage() {
  const initial = {
    nickname: "닉네임",
    intro: "한 줄 소개",
    email: "ahksjhd@gmail.com",
    password: "",
    password2: "",
    realname: "김릿츠",
    birth: "",
    preview: null as string | null,
  };

  const [form, setForm] = useState({
    nickname: initial.nickname,
    intro: initial.intro,
    email: initial.email,
    password: initial.password,
    password2: initial.password2,
    realname: initial.realname,
    birth: initial.birth,
    preview: initial.preview,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setForm((prev) => ({ ...prev, preview: url }));
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onCancel = useCallback(() => {
    setForm({
      nickname: initial.nickname,
      intro: initial.intro,
      email: initial.email,
      password: "",
      password2: "",
      realname: initial.realname,
      birth: initial.birth,
      preview: null,
    });
  }, [initial]);

  const onSave = useCallback(() => {
    // 저장 API 자리
  }, [form]);

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

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="pillNeutral"
              onClick={onCancel}
              className="text-[var(--Negative)]"
            >
              취소하기
            </Button>
            <Button
              type="button"
              variant="pillNeutral"
              onClick={onSave}
              className="text-[var(--Black)]"
            >
              저장하기
            </Button>
          </div>
        </div>
      </header>

      {/* 프로필 영역 (닉네임, 한 줄 소개, 프로필 이미지) */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="mx-auto h-16 max-w-[688px] px-4" />

          <div className="mx-auto flex w-full max-w-[688px] flex-col items-start gap-3 px-4">
            <button
              type="button"
              onClick={pickFile}
              className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full bg-[var(--Black)]"
              aria-label="프로필 이미지 변경"
            >
              {form.preview ? (
                <img
                  src={form.preview}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="logo-text text-[36px] leading-[28px] text-[var(--White)]">
                  G
                </span>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />

            {/* 닉네임 입력: 디자인이 다르기 때문에 그대로 유지 */}
            <input
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              className="h-10 w-full max-w-[688px] rounded-[4px] border border-[var(--Gray90)] px-4 text-[24px] font-medium leading-[38.4px] text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)]"
            />

            {/* 한 줄 소개: 원래 input이었는데 텍스트영역 컴포넌트로 맞춰도 되고, 여기서는 한 줄 유지 위해 그냥 input 유지 */}
            <input
              name="intro"
              type="text"
              value={form.intro}
              onChange={handleChange}
              placeholder="한 줄 소개"
              className="h-10 w-full max-w-[688px] rounded-[4px] border border-[var(--Gray90)] px-4 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)]"
            />
          </div>

          <div className="mx-auto h-5 max-h-5 max-w-[688px]" />
        </div>
      </section>

      {/* 상세 정보 수정 영역 */}
      <main className="w-full flex-1">
        <div className="mx-auto flex w-full max-w-[688px] flex-col gap-6 px-4 py-8">
          <div className="flex flex-col gap-4">
            <LabeledInput
              label="메일"
              name="email"
              type="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
            />

            <LabeledInput
              label="비밀번호"
              name="password"
              type="password"
              placeholder="••••••"
              value={form.password}
              onChange={handleChange}
            />

            <LabeledInput
              label="비밀번호 확인"
              name="password2"
              type="password"
              placeholder="••••••"
              value={form.password2}
              onChange={handleChange}
            />

            <LabeledInput
              label="이름"
              name="realname"
              type="text"
              placeholder="이름"
              value={form.realname}
              onChange={handleChange}
            />

            <LabeledInput
              label="생년월일"
              name="birth"
              type="text"
              placeholder="YYYY - MM - DD"
              value={form.birth}
              onChange={handleChange}
            />

            <LabeledTextArea
              label="소개"
              name="intro"
              value={form.intro}
              placeholder="한 줄 소개 또는 소개글"
              rows={2}
              onChange={handleChange}
              className=""
            />
          </div>
        </div>
      </main>
    </div>
  );
}
