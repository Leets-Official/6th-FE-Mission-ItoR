import { inputVariants, textFieldVariants } from '@/components/common/text/TextFieldVariants';
import { TextFieldProps } from '@/types/text';
import clsx from 'clsx';
import React from 'react';

const TextField: React.FC<TextFieldProps> = ({
  placeholder = 'Text field',
  className = '',
  value,
  onChange,
  variant = 'default',
  backgroundColor = 'transparent',
  textColor = 'gray56',
  fontSize = 'light',
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <div className={clsx(textFieldVariants({ variant, backgroundColor, disabled, fullWidth }), className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputVariants({ textColor, fontSize })}
      />
    </div>
  );
};

export default TextField;
