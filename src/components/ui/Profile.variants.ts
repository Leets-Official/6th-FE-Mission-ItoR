import type { ProfilePhotoSize } from "./Profile.types";

export const wrapBase =
  "relative inline-flex items-center justify-center overflow-hidden rounded-full aspect-square";

export const bySize: Record<ProfilePhotoSize, string> = {
  xl: "w-[90px] h-[90px]",
  lg: "w-[64px] h-[64px]",
  sm: "w-[40px] h-[40px]",
};

export const letterBase =
  "absolute text-white font-normal [font-family:'Smooch']";

export const letterBySize: Record<ProfilePhotoSize, string> = {
  xl: "left-[24px] top-[29px] text-[50px] leading-[28px]",
  lg: "left-[17px] top-[21px] text-[36px] leading-[20px]",
  sm: "left-[11px] top-[13px] text-[22px] leading-[12px]",
};
