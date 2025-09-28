import type { TFSize, TFStyle } from "@ui/TextFiled.types";

export const fieldBase =
  "flex items-center gap-[10px] px-4 py-3 rounded-[4px] w-[656px]"; // padding: 12px 16px

export const labelClass =
  "text-[16px] leading-[24px] font-semibold text-[var(--Gray-56)]";

export const inputClass = "w-full outline-none bg-transparent min-w-0";

export const bySize: Record<TFSize, string> = {
  // 32 medium
  lg: "text-[24px] leading-[38.4px] font-medium",
  // 14 light
  sm: "text-[14px] leading-[22.4px] font-light tracking-[-0.07px]",
};

export const byStyle: Record<TFStyle, string> = {
  // 연한 텍스트(placeholder용) + 회색 보더
  placeholder:
    "border border-[var(--Gray90)] text-[var(--Gray-56)] bg-transparent",

  // 기본: 검정 텍스트 + 회색 보더
  default:
    "border border-[var(--Gray90)] text-[var(--Black)] bg-transparent",

  // 강조: 검정 텍스트 + 진한(Gray-33) 보더
  emphasis:
    "border border-[var(--Gray-33)] text-[var(--Black)] bg-transparent",

  // 비활성: 회색 배경 + 연한 텍스트
  disabled:
    "border border-[var(--Gray90)] bg-[var(--Gray90)] text-[var(--Gray-56)] cursor-not-allowed",
};

export const wrapperBase = "inline-flex flex-col gap-2";
