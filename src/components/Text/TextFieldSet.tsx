import React from "react";
import TextField from "./TextField";

interface TextFieldSetProps {
  title: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
}

const TextFieldSet: React.FC<TextFieldSetProps> = ({
  title,
  placeholder = "Text filed",
  helperText,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-brand-gray text-base">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <TextField placeholder={placeholder} size="lg" variant="default" />
      {helperText && <p className="mt-1 text-xs text-gray-400">* {helperText}</p>}
    </div>
  );
};

export default TextFieldSet;
