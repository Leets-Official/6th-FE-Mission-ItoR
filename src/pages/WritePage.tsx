import React, { useEffect, useRef, useState } from "react";
import imageIcon from "../assets/icons/image.svg";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const canPublish =
    title.trim().length > 0 &&
    (body.trim().length > 0 || !!imageUrl);

  const openFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl(url);
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  }, [body]);

  const resetAll = () => {
    setTitle("");
    setBody("");
    setImageUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const publish = () => {
    if (!canPublish) return;
    alert("UI-only: 게시하기는 아직 서버 연동 전입니다.");
  };

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      {/* 상단 헤더 */}
      <header className="w-full border-b border-[var(--Gray96)] bg-white/90 backdrop-blur-[2px]">
        <div className="mx-auto flex h-[56px] w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="logo-text text-[24px] leading-[1.2] text-[var(--Black)]">
            GITLOG
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetAll}
              className="rounded-[25px] border border-[var(--Gray90)] px-4 py-[6px] text-[14px] font-light leading-[22.4px] text-[var(--Negative)]"
            >
              삭제하기
            </button>
            <button
              type="button"
              onClick={publish}
              disabled={!canPublish}
              className={`rounded-[25px] border px-4 py-[6px] text-[14px] font-light leading-[22.4px] ${
                canPublish
                  ? "border-[var(--Point,#00A1FF)] text-[var(--Point,#00A1FF)]"
                  : "border-[var(--Gray90)] text-[var(--Gray56)] opacity-40 cursor-not-allowed"
              }`}
            >
              게시하기
            </button>
          </div>
        </div>
      </header>

      {/* 사진 추가 바 */}
      <div className="w-full border-b border-[var(--Gray96)] bg-[var(--Gray96)]">
        <div className="mx-auto flex w-full max-w-[1366px] items-center px-4 py-2 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={openFile}
            className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--Gray90)] bg-white px-3 py-2 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)]"
          >
            <img
              src={imageIcon}
              alt=""
              className="h-[16px] w-[16px]"
            />
            <span>사진 추가하기</span>
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

      {/* 본문 */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[688px] px-4 py-6">
          {/* 제목 */}
          <section className="mb-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className={`w-full border-none px-0 text-[24px] font-medium leading-[38.4px] text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)] outline-none ${
                title ? "text-[var(--Black)]" : ""
              }`}
            />
          </section>

          {/* 구분선 */}
          <div
            className="mb-4 h-[1px] w-full bg-[var(--Gray90)]"
            role="separator"
            aria-hidden="true"
          />

          {/* 본문 textarea */}
          <section className="mb-6">
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="어떠한 것을 깨달았나요?"
              className="w-full resize-none border-none px-0 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)] outline-none"
            />
          </section>

          {/* 업로드된 이미지 미리보기 */}
          {imageUrl && (
            <section className="mb-6">
              <img
                src={imageUrl}
                alt="preview"
                className="max-h-[400px] w-full rounded-[4px] object-cover"
              />
            </section>
          )}

          <div className="h-16" />
        </div>
      </main>
    </div>
  );
}
