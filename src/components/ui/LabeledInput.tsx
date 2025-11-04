import React from "react";
import clsx from "clsx";

interface LabeledInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function LabeledInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  className,
  disabled,
}: LabeledInputProps) {
  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      <label className="text-[14px] font-light leading-[22.4px] text-[var(--Gray56)]">
        {label}
        {required && <span className="text-[var(--Negative)]"> *</span>}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "h-10 rounded-[4px] border border-[var(--Gray90)] px-4",
          "text-[14px] font-light leading-[22.4px] text-[var(--Gray20)]",
          "placeholder-[var(--Gray-78,#C8C8C8)]"
        )}
      />

      {error && (
        <p className="text-[12px] leading-[19.2px] text-[var(--Negative)]">
          {error}
        </p>
      )}
    </div>
  );
}
