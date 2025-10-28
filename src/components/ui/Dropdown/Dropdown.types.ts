import type React from "react";

export type DropdownItem = {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};

export type DropdownPosition = "left" | "right";
export type DropdownCaretOffset = "none" | "sm" | "md" | "lg";

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: DropdownPosition;
  className?: string;
  menuClassName?: string;
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean;
  caretOffset?: DropdownCaretOffset;
  /** @deprecated use caretOffset instead */
  caretOffsetX?: number;
}
