export interface DropdownMenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
  menuClassName?: string;
  position?: 'left' | 'right';
}

export interface DropdownMenuListProps {
  items: DropdownMenuItem[];
  onItemClick: (item: DropdownMenuItem) => void;
  position?: 'left' | 'right';
  menuClassName?: string;
}
