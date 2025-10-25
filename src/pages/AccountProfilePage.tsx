import React, { useRef, useState, useCallback } from "react";
import clsx from "clsx";
import ReorderIcon from "@icons/reorder.svg?react";

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // TODO: 저장 API 연동
  }, [form]);

  const labelBase =
    "text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]";
  const inputBase =
    "h-10 rounded-[4px] border border-[var(--Gray90)] px-4 text-[14px] leading-[22.4px] font-light text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)]";

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

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-reset h-10 px-3 rounded-[25px] text-[14px] leading-[22.4px] text-[var(--Negative)]"
            >
              취소하기
            </button>
            <button
              type="button"
              onClick={onSave}
              className="btn-reset h-10 px-3 rounded-[25px] text-[14px] leading-[22.4px] text-[var(--Black)]"
            >
              저장하기
            </button>
          </div>
        </div>
      </header>

      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px]">
          <div className="h-16 max-w-[688px] mx-auto px-4" />

          <div className="mx-auto w-full max-w-[688px] px-4 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={pickFile}
              className="w-[64px] h-[64px] rounded-full overflow-hidden bg-[var(--Black)] flex items-center justify-center"
              aria-label="프로필 이미지 변경"
            >
              {form.preview ? (
                <img
                  src={form.preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="logo-text text-[36px] leading-[28px] text-[var(--White)] font-normal">
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

            <input
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              className={clsx(
                "w-full max-w-[688px] h-10 rounded-[4px] border border-[var(--Gray90)] px-4",
                "text-[24px] leading-[38.4px] font-medium text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)]"
              )}
            />

            <input
              name="intro"
              type="text"
              value={form.intro}
              onChange={handleChange}
              placeholder="한 줄 소개"
              className={clsx(
                "w-full max-w-[688px] h-10 rounded-[4px] border border-[var(--Gray90)] px-4",
                "text-[14px] leading-[22.4px] font-light text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)]"
              )}
            />
          </div>

          <div className="h-5 max-h-5 max-w-[688px] mx-auto" />
        </div>
      </section>

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px] px-4 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label className={labelBase}>메일</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일"
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelBase}>비밀번호</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••"
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelBase}>비밀번호 확인</label>
              <input
                name="password2"
                type="password"
                value={form.password2}
                onChange={handleChange}
                placeholder="••••••"
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelBase}>이름</label>
              <input
                name="realname"
                type="text"
                value={form.realname}
                onChange={handleChange}
                placeholder="이름"
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelBase}>생년월일</label>
              <input
                name="birth"
                type="text"
                value={form.birth}
                onChange={handleChange}
                placeholder="YYYY - MM - DD"
                className={inputBase}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
