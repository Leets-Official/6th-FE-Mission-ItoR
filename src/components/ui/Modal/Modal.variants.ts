import type { ConfirmVariant } from "@ui/Modal.types";

export const overlayBase =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/50";

export const cardBase =
  "flex w-[326px] flex-col items-start gap-6 rounded-[4px] bg-white px-4 pt-6 pb-4 shadow-[0_2px_8px_rgba(0,0,0,0.10)]";

export const headerBlock =
  "flex flex-col items-start gap-2 self-stretch px-1 rounded-[12px]";

export const titleLine =
  "text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] text-black";

export const descLine =
  "text-[12px] leading-[19.2px] font-normal text-gray-56";

export const actionsRow = "flex w-full items-center gap-2";

export const btnBase =
  "flex items-center justify-center gap-2 flex-1 basis-0 px-3 py-2 rounded-[2px] text-[14px] leading-[22.4px] font-normal tracking-[-0.07px]";

export const btnCancel =
  "border border-gray-96 text-black bg-transparent";

export const btnConfirmByVariant: Record<ConfirmVariant, string> = {
  negative: "bg-negative text-white",
  point: "bg-point text-white",
  default: "bg-black text-white",
};
