// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ 여러 className들을 조건부로 합쳐주는 함수
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}