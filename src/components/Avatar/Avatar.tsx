import React from "react";
import defaultAvatarUrl from "@/assets/default-avatar.svg?url";
import { AvatarProps } from "./Avatar.types";
import { containerStyle, imageStyle } from "./Avatar.styled";

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = 100, className = "" }) => {
  const avatarSrc = src || defaultAvatarUrl;

  return (
    <div className={`avatar ${className}`} style={containerStyle(size)}>
      <img src={avatarSrc} alt={alt} style={imageStyle} />
    </div>
  );
};

export default Avatar;
