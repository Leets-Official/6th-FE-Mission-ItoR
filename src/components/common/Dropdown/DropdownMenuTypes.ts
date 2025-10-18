export interface DropdownMenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: 'default' | 'danger';
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
  menuClassName?: string;
  position?: 'left' | 'right';
  ariaLabel?: string;
}

export interface DropdownMenuListProps {
  items: DropdownMenuItem[];
  onItemClick: (item: DropdownMenuItem) => void;
  position?: 'left' | 'right';
  menuClassName?: string;
}
