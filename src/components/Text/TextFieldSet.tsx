import React from "react";
import TextField from "./TextField";

interface TextFieldSetProps {
  title: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldSet: React.FC<TextFieldSetProps> = ({
  title,
  placeholder = "Text filed",
  helperText,
  type = "text",
  error,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-brand-gray text-sm">{title}</label>
      <TextField
        placeholder={placeholder}
        size="sm"
        variant="default"
        type={type}
        value={value}
        onChange={onChange}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-500">* {error}</p>
      ) : (
        helperText && <p className="mt-1 text-xs text-gray-400">* {helperText}</p>
      )}
    </div>
  );
};

export default TextFieldSet;
