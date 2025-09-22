export interface TextFieldProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // 새로운 cva API
  variant?: 'default' | 'dark' | 'light';
  backgroundColor?: 'transparent' | 'filled';
  textColor?: 'black' | 'gray56' | 'gray78';
  fontSize?: 'light' | 'medium';
  disabled?: boolean;
  fullWidth?: boolean;
}

export interface TextareaProps {
  title?: string;
  className?: string;
  hintText?: string;
  placeholder?: string;
  textFieldColor?: 'black' | 'gray56' | 'gray78';
  textFieldBackgroundColor?: 'transparent' | 'filled';
  textFieldFontSize?: 'light' | 'medium';
}
