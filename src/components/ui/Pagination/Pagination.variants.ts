export const containerBase =
  "flex items-center justify-center gap-2 p-[10px] rounded-[2px]";

export const listBase =
  "inline-flex items-center gap-2 p-[10px] rounded-[2px]";

export const itemBase =
  "inline-flex items-center justify-center select-none " +
  "min-w-8 h-8 px-2 rounded-[2px] border text-[16px] leading-[24px] " +
  "bg-[var(--Neutral-1)] transition-colors";

export const itemDefault =
  "border-[var(--Neutral-5)] text-[var(--Black)] hover:border-[var(--Primary-6)]";

export const itemActive =
  "border-[var(--Primary-6)] text-[var(--Black)]";

export const itemDisabled =
  "border-[var(--Neutral-5)] text-[var(--Gray56)] opacity-60 cursor-not-allowed";
