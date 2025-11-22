// src/components/account/ProfileImageUploader.tsx
import React, { useRef } from "react";
import imageIcon from "@icons/image.svg";

type Props = {
  nickname: string;
  preview: string | null;
  disabled: boolean;
  onChange: (file: File | null, previewUrl: string | null) => void;
};

export default function ProfileImageUploader({
  nickname,
  preview,
  disabled,
  onChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;

    if (!f) {
      onChange(null, preview);
      return;
    }

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(f);
    onChange(f, url);
  };

  const initial = nickname.trim()
    ? nickname.trim()[0].toUpperCase()
    : "G";

  return (
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
          ) : (
            <span className="logo-text text-[40px] leading-none text-[var(--White)]">
              {initial}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={pickFile}
          className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--Gray90)] px-2 py-1 text-[12px] font-normal leading-[19.2px] text-[var(--Gray56)]"
          disabled={disabled}
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
          disabled={disabled}
        />
      </div>
    </div>
  );
}
