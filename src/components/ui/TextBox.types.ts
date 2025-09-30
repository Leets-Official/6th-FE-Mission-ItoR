// TextBox.types.ts
import type { HTMLAttributes, ReactNode } from "react";

export type TextBoxStyle = "primary" | "compact" | "single";

export interface TextBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tbStyle?: TextBoxStyle;
  title?: ReactNode;
  description?: ReactNode;
  text?: ReactNode;
  className?: string;
}
