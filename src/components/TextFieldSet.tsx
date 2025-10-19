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
}

const TextFieldSet: React.FC<TextFieldSetProps> = ({
  label,
  value,
  onChange,
  variant = "outlineblack",
  size = "sm",
  placeholder,
  className,
}) => {
  return (
    <div className={`w-full h-[104px] p-[12px_16px] flex flex-col gap-[12px] ${className}`}>
      <span className="font-[Noto Sans KR] font-light text-[14px] leading-[160%] tracking-[-0.5%] text-gray-800">
        {label}
      </span>
      <TextField
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        variant={variant}
        size={size}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextFieldSet;
