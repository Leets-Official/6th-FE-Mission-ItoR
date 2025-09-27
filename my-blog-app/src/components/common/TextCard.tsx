import type { ReactNode } from "react";

type TextCardProps = {
  variant?: "primary" | "secondary" | "body";
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function TextCard({
  variant = "body",
  title,
  subtitle,
  children,
}: TextCardProps) {
  const baseStyle =
    "w-[688px] max-w-[688px] px-4 py-3 bg-white font-['Noto_Sans_KR']";

  const variants: Record<typeof variant, string> = {
    primary: "flex flex-col justify-center items-start gap-3",
    secondary: "flex flex-col justify-center items-start gap-2",
    body: "flex items-start gap-[10px]",
  };

  return (
    <div className={`${baseStyle} ${variants[variant]}`}>
      {/* title */}
      {title && (
        <h2
          className={
            variant === "primary"
              ? "text-[24px] font-medium leading-[160%] text-[#333]"
              : variant === "secondary"
              ? "text-[16px] font-medium leading-[160%] text-[#333] truncate"
              : ""
          }
        >
          {title}
        </h2>
      )}

      {/* subtitle */}
      {subtitle && (
        <p className="text-[14px] font-light leading-[160%] tracking-[-0.07px] text-[#333]">
          {subtitle}
        </p>
      )}

      {/* children (body text) */}
    {children && (
    <p className="flex-1 text-[14px] font-light leading-[160%] tracking-[-0.07px] text-[#333]">
        {children}
    </p>
    )}
    </div>
  );
}
