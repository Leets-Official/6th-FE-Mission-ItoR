export interface TextFieldProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email';
  error?: boolean;
  name?: string;

  // cva API
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
  type?: 'text' | 'password' | 'email';
  textFieldColor?: 'black' | 'gray56' | 'gray78';
  textFieldBackgroundColor?: 'transparent' | 'filled';
  textFieldFontSize?: 'light' | 'medium';
  error?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
