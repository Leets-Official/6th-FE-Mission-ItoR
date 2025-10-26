import React from "react";
import clsx from "clsx";

interface LabeledTextAreaProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}

export default function LabeledTextArea({
  label,
  name,
  value,
  placeholder,
  rows = 4,
  required,
  onChange,
  error,
  className,
}: LabeledTextAreaProps) {
  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      <label className="text-[14px] font-light leading-[22.4px] text-[var(--Gray56)]">
        {label}
        {required && <span className="text-[var(--Negative)]"> *</span>}
      </label>

      <textarea
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "w-full resize-none rounded-[4px] border border-[var(--Gray90)] px-4 py-2",
          "text-[14px] font-light leading-[22.4px] text-[var(--Gray20)]",
          "placeholder-[var(--Gray-78,#C8C8C8)]"
        )}
      />

      {error && (
        <p className="text-[12px] leading-[18px] text-[var(--Negative)]">
          {error}
        </p>
      )}
    </div>
  );
}
