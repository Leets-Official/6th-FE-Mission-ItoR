export type ButtonVariant =
  | "outlinePointWhite"
  | "outlineGrayWhite"
  | "solidWhite"
  | "outlineGrayGray90"
  | "solidGray90"
  | "solidDark"
  | "solidDarkAlt";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  leftIcon?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};
