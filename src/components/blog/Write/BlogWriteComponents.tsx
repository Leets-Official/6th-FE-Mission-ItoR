import { FC } from 'react';
import Button from '@/components/common/Button/Button';
import { cn } from '@/utils/cn';
import { BLOG_TEXTS } from '@/constants/blog.constants';
import type { EditorMode } from '@/types/blog';

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

interface ModeToggleButtonsProps {
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;
  getButtonProps: (targetMode: 'basic' | 'markdown') => {
    intent: 'primary' | 'secondary';
    variant: 'solid' | 'outline';
    size: 'sm';
  };
}

// TitleInput 컴포넌트
export const TitleInput: FC<TitleInputProps> = ({ title, setTitle }) => {
  const titleInputClasses = cn(
    "w-full bg-transparent outline-none self-stretch",
    "text-2xl font-medium leading-[160%] tracking-[-0.08px]",
    "text-black placeholder:text-gray-56",
    "overflow-hidden text-ellipsis whitespace-nowrap"
  );

  return (
    <input
      type="text"
      placeholder={BLOG_TEXTS.WRITE.PLACEHOLDERS.TITLE}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={titleInputClasses}
    />
  );
};

// ModeToggleButtons 컴포넌트
export const ModeToggleButtons: FC<ModeToggleButtonsProps> = ({ 
  setMode, 
  getButtonProps 
}) => (
  <div className="flex gap-2 mb-4">
    <Button
      onClick={() => setMode('basic')}
      {...getButtonProps('basic')}
    >
      {BLOG_TEXTS.WRITE.MODES.BASIC}
    </Button>
    
    <Button
      onClick={() => setMode('markdown')}
      {...getButtonProps('markdown')}
      className="hidden md:inline-flex"
    >
      {BLOG_TEXTS.WRITE.MODES.MARKDOWN}
    </Button>
  </div>
);
