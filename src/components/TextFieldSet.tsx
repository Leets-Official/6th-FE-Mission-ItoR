import React from "react";
import TextField from "./TextField";

interface TextFieldSetProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "gray" | "blue" | "black" | "filled" | "outlineblack";
  size?: "sm" | "lg";
  placeholder?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}

const TextFieldSet: React.FC<TextFieldSetProps> = ({
  label,
  value,
  onChange,
  variant = "outlineblack",
  size = "sm",
  placeholder,
  className,
  type = "text",
  disabled = false,
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-[8px] p-[8px_0px] ${className}`}
    >
      {label && (
        <span className="font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-[#909090]">
          {label}
        </span>
      )}

      <TextField
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        variant={variant}
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        className="text-[#909090] placeholder-[#B0B0B0]"
      />
    </div>
  );
};

export default TextFieldSet;