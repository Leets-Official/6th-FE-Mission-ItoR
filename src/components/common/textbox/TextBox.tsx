import { CreateIcon } from '@/assets/icons/common';
import Icon from '@/components/common/icon/Icon';
import { textBoxTextVariants, textBoxVariants } from '@/components/common/textbox/TextBoxVariants';
import clsx from 'clsx';
import React from 'react';

interface TextBoxProps {
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  color?: 'default' | 'primary' | 'positive' | 'gray';
  borderColor?: 'default' | 'primary' | 'positive' | 'gray' | 'transparent';
}

const TextBox: React.FC<TextBoxProps> = ({ children, className = '', showIcon = false, color, borderColor }) => {
  return (
    <div className={clsx(textBoxVariants({ color, borderColor }), className)}>
      {showIcon && (
        <Icon size="sm">
          <CreateIcon />
        </Icon>
      )}
      <span className={textBoxTextVariants({ color })}>{children}</span>
    </div>
  );
};

export default TextBox;
