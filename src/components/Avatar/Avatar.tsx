import React from "react";
import defaultAvatarUrl from "@/assets/default-avatar.svg?url";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = 100,
  className = "",
}: AvatarProps) => {
  const containerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    border: "2px solid #e0e0e0",
    flexShrink: 0,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  };

  const avatarSrc = src || defaultAvatarUrl;

  return (
    <div className={`avatar ${className}`} style={containerStyle}>
      <img src={avatarSrc} alt={alt} style={imageStyle} />
    </div>
  );
};

export default Avatar;
