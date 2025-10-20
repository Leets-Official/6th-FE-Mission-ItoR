// src/pages/AccountProfilePage.tsx
import React, { useRef, useState } from "react";
import clsx from "clsx";
import ReorderIcon from "@icons/reorder.svg?react";

export default function AccountProfilePage() {
  // 초기 값 (실서비스에선 서버 fetch로 채우세요)
  const initial = {
    nickname: "닉네임",
    intro: "한 줄 소개",
    email: "ahksjhd@gmail.com",
    realname: "김릿츠",
    birth: "",
  };

  const [nickname, setNickname] = useState(initial.nickname);
  const [intro, setIntro] = useState(initial.intro);
  const [email, setEmail] = useState(initial.email);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [realname, setRealname] = useState(initial.realname);
  const [birth, setBirth] = useState(initial.birth);

  // 프로필 이미지
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const pickFile = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const labelBase = "text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]";
  const inputBase =
    "h-10 rounded-[4px] border border-[var(--Gray90)] px-4 text-[14px] leading-[22.4px] font-light text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)]";

  const onCancel = () => {
    setNickname(initial.nickname);
    setIntro(initial.intro);
    setEmail(initial.email);
    setPassword("");
    setPassword2("");
    setRealname(initial.realname);
    setBirth(initial.birth);
    setPreview(null);
  };

  const onSave = () => {
    // TODO: 저장 API 연동
    // 성공 시 initial 갱신
    // 여기선 로컬 state만 동기화
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = { nickname, intro, email, password, realname, birth, preview };
    // setInitial(...) 할 수 있지만 데모에선 생략
    alert("저장되었습니다."); // 임시 피드백
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

          {/* 오른쪽: 취소/저장 */}
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

      {/* 회색 상단 바: 아바타 + 닉네임/소개 입력 */}
      <section className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto w-full max-w-[1366px]">
          {/* 블랭크(64px) */}
          <div className="h-16 max-w-[688px] mx-auto px-4" />

          {/* 프로필(세로 1열 정렬, 리스트 기준선 좌측 정렬) */}
          <div className="mx-auto w-full max-w-[688px] px-4 flex flex-col items-start gap-3">
            {/* 아바타 */}
            <button
              type="button"
              onClick={pickFile}
              className="w-[64px] h-[64px] rounded-full overflow-hidden bg-[var(--Black)] flex items-center justify-center"
              aria-label="프로필 이미지 변경"
            >
              {preview ? (
                <img src={preview} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <span className="logo-text text-[36px] leading-[28px] text-[var(--White)] font-normal">G</span>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

            {/* 닉네임 인풋 */}
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
              className={clsx(
                "w-full max-w-[688px] h-10 rounded-[4px] border border-[var(--Gray90)] px-4",
                "text-[24px] leading-[38.4px] font-medium text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)]"
              )}
            />

            {/* 한 줄 소개 인풋 */}
            <input
              type="text"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="한 줄 소개"
              className={clsx(
                "w-full max-w-[688px] h-10 rounded-[4px] border border-[var(--Gray90)] px-4",
                "text-[14px] leading-[22.4px] font-light text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)]"
              )}
            />
          </div>

          {/* 하단 여백 */}
          <div className="h-5 max-h-5 max-w-[688px] mx-auto" />
        </div>
      </section>

      {/* 본문 */}
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[688px] px-4 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* 이메일 */}
            <div className="flex flex-col gap-3">
              <label className={labelBase}>메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                className={inputBase}
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-3">
              <label className={labelBase}>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className={inputBase}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="flex flex-col gap-3">
              <label className={labelBase}>비밀번호 확인</label>
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="••••••"
                className={inputBase}
              />
            </div>

            {/* 이름 */}
            <div className="flex flex-col gap-3">
              <label className={labelBase}>이름</label>
              <input
                type="text"
                value={realname}
                onChange={(e) => setRealname(e.target.value)}
                placeholder="이름"
                className={inputBase}
              />
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col gap-3">
              <label className={labelBase}>생년월일</label>
              <input
                type="text"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
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
