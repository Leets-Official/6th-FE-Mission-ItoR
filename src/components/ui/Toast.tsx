import clsx from "clsx";
import DoneIcon from "@icons/done.svg?react";
import ErrorIcon from "@icons/error.svg?react";

type ToastVariant = "negative" | "positive";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  children: React.ReactNode;
  className?: string;
}

const base =
  "inline-flex h-10 px-3 items-center justify-center gap-1 shrink-0 " +
  "rounded-[25px] text-[14px] leading-[22.4px] font-normal tracking-[-0.07px] " +
  "backdrop-blur-[2px] bg-[rgba(255,255,255,0.90)]";

const byVariant: Record<ToastVariant, string> = {
  negative: "border border-[var(--Negative)] text-[var(--Negative)]",
  positive: "border border-[var(--Positive)] text-[var(--Positive)]",
};

const Icons: Record<ToastVariant, React.FC<React.SVGProps<SVGSVGElement>>> = {
  negative: ErrorIcon,
  positive: DoneIcon,
};

export default function Toast({ variant = "negative", children, className, ...rest }: ToastProps) {
  const Icon = Icons[variant];
  return (
    <div className={clsx(base, byVariant[variant], className)} {...rest}>
      <Icon className="w-5 h-5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
