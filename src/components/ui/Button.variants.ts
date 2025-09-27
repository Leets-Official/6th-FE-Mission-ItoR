import type { ButtonVariant } from "./Button.types";

export const baseClass =
  "inline-flex h-10 px-3 py-2 items-center justify-center gap-1 shrink-0 " +
  "rounded-[25px] text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] " +
  "transition-colors";

export const byVariant: Record<ButtonVariant, string> = {
  outlinePointWhite:
    "border border-[var(--Point)] bg-[var(--White)] text-[var(--Point)]",
  outlineGrayWhite:
    "border border-[var(--Gray56)] bg-[var(--White)] text-[var(--Gray56)]",
  solidWhite: "border-0 bg-[var(--White)] text-[var(--Gray56)]",
  outlineGrayGray90:
    "border border-[var(--Gray56)] bg-[var(--Gray90)] text-[var(--Gray56)]",
  solidGray90: "border-0 bg-[var(--Gray90)] text-[var(--Gray56)]",
  solidDark: "border-0 bg-[var(--Gray7)] text-[var(--White)]",
  solidDarkAlt: "border-0 bg-[var(--Gray7)] text-[var(--Gray56)]",
};
