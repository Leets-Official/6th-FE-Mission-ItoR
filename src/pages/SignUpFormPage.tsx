// src/pages/SignUpFormPage.tsx
import React, { useRef, useState } from "react";
import ReorderIcon from "@icons/reorder.svg?react";
import imageIcon from "../assets/icons/image.svg";

export default function SignUpFormPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const pickFile = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col">
      {/* 헤더 */}
      <header className="w-full bg-white/90 backdrop-blur-[2px] border-b border-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button type="button" aria-label="메뉴 열기" className="w-6 h-6 inline-flex items-center justify-center">
              <ReorderIcon className="w-6 h-6" />
            </button>
            <div className="logo-text select-none">GITLOG</div>
          </div>
          <div />
        </div>
      </header>

      {/* 회색 상단 바 + 타이틀/설명 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8">
          <div className="h-8 max-h-8 max-w-[688px] mx-auto" />
          <div className="mx-auto w-full max-w-[688px] px-4 py-3 flex flex-col justify-center items-start gap-3">
            <h1 className="text-[24px] leading-[38.4px] font-medium text-[var(--Black)]">회원가입</h1>
            <p className="self-stretch text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray20)]">
              가입을 위해 회원님의 정보를 입력해주세요.
            </p>
          </div>
          <div className="h-5 max-h-5 max-w-[688px] mx-auto" />
        </div>
      </section>

      {/* 본문 */}
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px] px-4 py-8 flex flex-col gap-6">
          {/* 프로필 사진 */}
          <div className="flex flex-col items-start gap-3">
            <span className="text-[14px] leading-[22.4px] font-light tracking-[-0.07px] text-[var(--Gray56)]">
              프로필 사진
            </span>

            <div className="flex flex-col items-start gap-3">
              <div className="w-[90px] h-[90px] rounded-full overflow-hidden bg-[var(--Black)] flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="logo-text text-[40px] leading-none text-[var(--White)]">G</span>
                )}
              </div>

              {/* 프로필 사진 추가 버튼 */}
              <button
                type="button"
                onClick={pickFile}
                className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--Gray90)] px-2 py-1
                           text-[12px] leading-[19.2px] font-normal text-[var(--Gray56)]"
              >
                <img src={imageIcon} alt="" className="w-[14px] h-[14px]" />
                프로필 사진 추가
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </div>
          </div>

          {/* 입력 필드 */}
          <div className="flex flex-col gap-4">
            {/* 이메일 */}
            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">이메일</label>
              <input
                type="email"
                placeholder="이메일"
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">비밀번호</label>
              <input
                type="password"
                placeholder="••••••"
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">비밀번호 확인</label>
              <input
                type="password"
                placeholder="••••••"
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
            </div>

            {/* 이름 */}
            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">이름</label>
              <input
                type="text"
                placeholder="이름"
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">생년월일</label>
              <input
                type="text"
                placeholder="YYYY - MM - DD"
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
            </div>

            {/* 닉네임 */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-3">
                <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">닉네임</label>
                <input
                  type="text"
                  placeholder="닉네임"
                  className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                             text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                             placeholder-[var(--Gray-78,#C8C8C8)]"
                />
              </div>
              <p className="text-[12px] leading-[19.2px] font-light text-[var(--Gray-78,#C8C8C8)]">
                * 20글자 이내
              </p>
            </div>

            {/* 한 줄 소개 */}
            <div className="flex flex-col gap-3">
              <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">한 줄 소개</label>
              <input
                type="text"
                placeholder="한 줄 소개"
                className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                           text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                           placeholder-[var(--Gray-78,#C8C8C8)]"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="pt-2">
            <button
              type="button"
              className="h-[38px] px-3 rounded-[25px] border border-[var(--Point)]
                         bg-[var(--White)] text-[var(--Point)]
                         text-[14px] leading-[22.4px] font-normal tracking-[-0.07px]
                         w-full"
            >
              회원가입 완료
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
