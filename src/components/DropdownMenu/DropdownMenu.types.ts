export type DropdownMenuItem = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type DropdownMenuProps = {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
  menuClassName?: string;
  position?: "left" | "right";
};
