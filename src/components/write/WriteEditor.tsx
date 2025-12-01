// src/components/write/WriteEditor.tsx
import React, { useEffect, useRef } from "react";

type Props = {
  title: string;
  body: string;
  previewUrl: string | null;
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
};

export default function WriteEditor({
  title,
  body,
  previewUrl,
  onChangeTitle,
  onChangeBody,
}: Props) {
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  }, [body]);

  return (
    <main className="flex-1">
      <div className="page-inner page-main">
        <section className="mb-4">
          <input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="제목"
            className={`w-full border-none px-0 text-[24px] font-medium leading-[38.4px] text-[var(--Black)] placeholder-[var(--Gray-78,#C8C8C8)] outline-none ${
              title ? "text-[var(--Black)]" : ""
            }`}
          />
        </section>

        <div
          className="mb-4 h-[1px] w-full bg-[var(--Gray90)]"
          role="separator"
          aria-hidden="true"
        />

        <section className="mb-6">
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => onChangeBody(e.target.value)}
            placeholder="어떠한 것을 깨달았나요?"
            className="w-full resize-none border-none px-0 text-[14px] font-light leading-[22.4px] text-[var(--Gray20)] placeholder-[var(--Gray-78,#C8C8C8)] outline-none"
          />
        </section>

        {previewUrl && (
          <section className="mb-6">
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-[400px] w-full rounded-[4px] object-cover"
            />
          </section>
        )}

        <div className="h-16" />
      </div>
    </main>
  );
}
