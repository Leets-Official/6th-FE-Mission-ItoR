import type { ReactNode } from "react";

type ToastProps = {
  type?: "negative" | "positive";
  message: string;
  icon?: ReactNode;
};

export default function Toast({ type = "negative", message, icon }: ToastProps) {
  const baseStyle =
    "inline-flex h-10 px-3 justify-center items-center gap-1 shrink-0 rounded-[25px] border backdrop-blur-[2px] bg-white/90 text-[14px] leading-[160%] tracking-[-0.07px] font-['Noto_Sans_KR']";

  const variants: Record<"negative" | "positive", string> = {
    negative: "border-[#FF3F3F] text-[#FF3F3F]",
    positive: "border-[#15DC5E] text-[#15DC5E]",
  };

  return (
    <div className={`${baseStyle} ${variants[type]}`}>
      {icon && <span>{icon}</span>}
      <span>{message}</span>
    </div>
  );
}
