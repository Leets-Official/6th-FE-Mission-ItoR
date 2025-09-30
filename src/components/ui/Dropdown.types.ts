import type React from "react";

export type DropdownItem = {
  id: string;
  label: React.ReactNode | string;
  disabled?: boolean;
  onSelect?: () => void;
};

export type DropdownPosition = "left" | "right";

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: DropdownPosition;     // 기본 right
  className?: string;              // root wrapper
  menuClassName?: string;          // panel wrapper
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean;             // 말풍선 삼각형 표시 (기본 true)
  caretOffsetX?: number;           // caret의 x 오프셋(px) - right 기준
}
