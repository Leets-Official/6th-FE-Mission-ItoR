import TextField from '@/components/common/text/TextField';
import { TextareaProps } from '@/types/text';
import clsx from 'clsx';
import React from 'react';

const Textarea: React.FC<TextareaProps> = ({
  title,
  className = '',
  hintText,
  placeholder,
  textFieldColor,
  textFieldBackgroundColor,
  textFieldFontSize,
}) => {
  return (
    <div className={clsx('flex w-[688px] px-4 py-3 flex-col items-start gap-1', className)}>
      {/* 제목과 텍스트 입력 필드 컨테이너 */}
      <div className="flex w-[656px] flex-col items-start gap-3">
        {title && (
          <span className="text-gray-56 text-sm font-light leading-[160%] tracking-[-0.07px] flex-1">{title}</span>
        )}
        <TextField
          placeholder={placeholder}
          textColor={textFieldColor}
          backgroundColor={textFieldBackgroundColor}
          fontSize={textFieldFontSize}
        />
      </div>

      {hintText && (
        <div className="flex px-1.5 py-0 justify-center items-center gap-2.5 self-stretch">
          <span className="text-xs font-light text-gray-78 flex-1">* {hintText}</span>
        </div>
      )}
    </div>
  );
};

export default Textarea;
