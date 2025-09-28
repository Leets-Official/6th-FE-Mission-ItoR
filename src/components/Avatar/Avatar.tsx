import React from "react";
import defaultAvatarUrl from "@/assets/default-avatar.svg?url";
import { AvatarProps } from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = 100, className = "" }) => {
  const avatarSrc = src || defaultAvatarUrl;

  return (
    <div
      className={`avatar border-brand-borderGray bg-brand-bgGray flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }} // size는 동적이라 inline 유지
    >
      <img src={avatarSrc} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default Avatar;
