import React from "react";
import clsx from "clsx";

interface AuthInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function AuthInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}: AuthInputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        // 사이즈
        "h-10 w-full rounded-[4px] px-4",
        // 배경/테두리
        "bg-[var(--White)] border border-[var(--Gray90)]",
        // 텍스트
        "text-[14px] font-light leading-[22.4px] text-[var(--Black)]",
        // placeholder
        "placeholder-[var(--Gray-78,#C8C8C8)]",
        className
      )}
    />
  );
}
