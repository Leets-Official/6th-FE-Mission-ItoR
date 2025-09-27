// src/components/ui/ToastButton.tsx
import React from "react";
import clsx from "clsx";
// 파일명에 맞춰 수정
import DoneIcon from "@icons/done.svg?react";
import ErrorIcon from "@icons/error.svg?react";

type ToastVariant = "negative" | "positive";

interface ToastButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToastVariant;
  children: React.ReactNode;
}

const base =
  "inline-flex h-10 px-3 items-center justify-center gap-1 shrink-0 " +
  "rounded-[25px] font-['Noto_Sans_KR'] text-[14px] font-normal leading-[160%] tracking-[-0.07px] " +
  "backdrop-blur-[2px] bg-[rgba(255,255,255,0.90)]";

const byVariant: Record<ToastVariant, string> = {
  negative: "border border-[var(--negative,#FF3F3F)] text-[var(--negative,#FF3F3F)]",
  positive: "border border-[var(--positive,#15DC5E)] text-[var(--positive,#15DC5E)]",
};

export default function ToastButton({
  variant = "negative",
  children,
  className,
  ...rest
}: ToastButtonProps) {
  return (
    <button
      className={clsx(base, byVariant[variant], className)}
      {...rest}
    >
      {variant === "negative" ? (
        <ErrorIcon className="w-5 h-5 shrink-0" />
      ) : (
        <DoneIcon className="w-5 h-5 shrink-0" />
      )}
      <span>{children}</span>
    </button>
  );
}
