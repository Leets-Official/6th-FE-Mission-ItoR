// src/components/ui/SmallButton.tsx
import clsx from "clsx";
import React from "react";
import Pencil from "../icons/Pencil";

type SmallVariant = "ghost" | "fill";

interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SmallVariant;
  leftIcon?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-1 " +
  "px-2 pt-[2px] pb-1 rounded-[2px] " + // padding: 2px 8px 4px 8px
  "text-[12px] leading-[19.2px] font-normal " +
  "text-[var(--Gray56)] transition-colors";

const byVariant: Record<SmallVariant, string> = {
  ghost: "bg-transparent hover:bg-[var(--Gray96)]",
  fill: "bg-[var(--Gray90)] hover:bg-[var(--Gray96)]",
};

export default function SmallButton({
  variant = "ghost",
  leftIcon = false,
  className,
  children,
  ...rest
}: SmallButtonProps) {
  return (
    <button
      className={clsx(base, byVariant[variant], className)}
      {...rest}
    >
      {leftIcon && (
        <Pencil className="w-3 h-3 mr-1 fill-current text-[var(--Gray56)]" />
      )}
      <span>{children}</span>
    </button>
  );
}
