import TextField from '@/components/common/Text/TextField';
import { TextareaProps } from '@/types/text';
import clsx from 'clsx';
import { FC } from 'react';

const Textarea: FC<TextareaProps> = ({
  title,
  className = '',
  hintText,
  placeholder,
  type = 'text',
  textFieldColor,
  textFieldBackgroundColor,
  textFieldFontSize,
}) => {
  return (
    <div className={clsx('flex w-full max-w-content flex-col items-start gap-1 px-4 py-3', className)}>
      {/* 제목과 텍스트 입력 필드 컨테이너 */}
      <div className="flex w-full flex-col items-start gap-3">
        {title && (
          <span className="flex-1 text-sm font-light text-gray-56">{title}</span>
        )}
        <TextField
          type={type}
          placeholder={placeholder}
          textColor={textFieldColor}
          backgroundColor={textFieldBackgroundColor}
          fontSize={textFieldFontSize}
          fullWidth
        />
      </div>

      {hintText && (
        <div className="flex items-center justify-center gap-2.5 self-stretch px-1.5 py-0">
          <span className="flex-1 text-xs font-light text-gray-78">* {hintText}</span>
        </div>
      )}
    </div>
  );
};

export default Textarea;
