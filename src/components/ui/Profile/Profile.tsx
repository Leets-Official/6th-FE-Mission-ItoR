import React from "react";
import clsx from "clsx";
import type { ProfilePhotoProps } from "@ui/Profile.types";
import { wrapBase, bySize, letterBase, letterBySize } from "@ui/Profile.variants";

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  size = "lg",
  src,
  alt,
  name,
  initial,
  className,
  bgClassName,
}) => {
  const letter = (initial ?? name ?? "").trim().charAt(0).toUpperCase();

  return (
    <div className={clsx(wrapBase, bySize[size], className)}>
      {src ? (
        <img
          src={src}
          alt={alt ?? name ?? "profile photo"}
          className="w-full h-full object-cover"
        />
      ) : (
        <>
          {/* 원형 배경: #111112 */}
          <svg viewBox="0 0 90 90" className="absolute inset-0 w-full h-full" aria-hidden>
            <circle cx="45" cy="45" r="45" className={clsx("fill-[#111112]", bgClassName)} />
          </svg>

          {/* 이니셜 (사이즈별 좌표/폰트 적용) */}
          {letter && <span className={clsx(letterBase, letterBySize[size])}>{letter}</span>}
        </>
      )}
    </div>
  );
};

export default ProfilePhoto;
