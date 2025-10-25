import React from "react";

interface LabeledInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  classNameWrapper?: string;
}

export default function LabeledInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  classNameWrapper,
}: LabeledInputProps) {
  return (
    <div className={classNameWrapper ?? "flex flex-col gap-3"}>
      <label className="text-[14px] leading-[22.4px] font-light text-[var(--Gray56)]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-10 rounded-[4px] border border-[var(--Gray90)] px-4
                   text-[14px] leading-[22.4px] font-light text-[var(--Gray20)]
                   placeholder-[var(--Gray-78,#C8C8C8)]"
      />
      {error && error.length > 0 && (
        <p className="text-[12px] leading-[18px] text-[var(--Negative)]">{error}</p>
      )}
    </div>
  );
}
