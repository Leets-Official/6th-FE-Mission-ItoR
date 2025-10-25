import type { ButtonVariant } from "@ui/Button/Button.types";

export const baseClass =
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1",
    "shrink-0",
    "text-[14px]",
    "leading-[22.4px]",
    "font-medium",
    "tracking-[-0.07px]",
    "transition-[filter]",
    "hover:brightness-95",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ].join(" ");

export const byVariant: Record<ButtonVariant, string> = {
  outlinePointWhite:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border",
      "border-[var(--Point)]",
      "bg-[var(--White)]",
      "text-[var(--Point)]",
    ].join(" "),

  outlineGrayWhite:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border",
      "border-[var(--Gray56)]",
      "bg-[var(--White)]",
      "text-[var(--Gray56)]",
    ].join(" "),

  solidWhite:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border-0",
      "bg-[var(--White)]",
      "text-[var(--Gray56)]",
    ].join(" "),

  outlineGrayGray90:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border",
      "border-[var(--Gray56)]",
      "bg-[var(--Gray90)]",
      "text-[var(--Gray56)]",
    ].join(" "),

  solidGray90:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border-0",
      "bg-[var(--Gray90)]",
      "text-[var(--Gray56)]",
    ].join(" "),

  solidDark:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border-0",
      "bg-[var(--Gray7)]",
      "text-[var(--White)]",
    ].join(" "),

  solidDarkAlt:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border-0",
      "bg-[var(--Gray7)]",
      "text-[var(--Gray56)]",
    ].join(" "),

  // 로그인 페이지 "이메일로 로그인"
  primaryBlue:
    [
      "h-10",
      "w-full",
      "px-4",
      "rounded-[4px]",
      "bg-[#0084E4]",
      "text-[var(--White)]",
      "font-medium",
      "leading-[22.4px]",
    ].join(" "),

  // 로그인 페이지 "카카오로 로그인"
  kakao:
    [
      "h-10",
      "w-full",
      "px-4",
      "rounded-[4px]",
      "bg-[#FEE500]",
      "text-[var(--Black)]",
      "font-medium",
      "leading-[22.4px]",
      "gap-2",
    ].join(" "),

  // 회원가입 form 하단의 "취소"
  neutralOutline:
    [
      "h-[38px]",
      "px-3",
      "rounded-[25px]",
      "border",
      "border-[var(--Gray90)]",
      "bg-[var(--White)]",
      "text-[var(--Gray20)]",
      "font-normal",
    ].join(" "),

  //헤더 "취소하기 / 저장하기"
  pillNeutral:
    [
      "h-10",
      "px-3",
      "rounded-[25px]",
      "bg-transparent",
      "text-[14px]",
      "leading-[22.4px]",
      "font-normal",
    ].join(" "),
};
