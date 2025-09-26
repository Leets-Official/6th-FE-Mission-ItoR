import clsx from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';
import DropdownMenuList from './DropdownMenuList';
import { DropdownMenuItem, DropdownMenuProps } from './DropdownMenuTypes';

const DropdownMenu: FC<DropdownMenuProps> = ({
  trigger,
  items,
  className = '',
  menuClassName = '',
  position = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: DropdownMenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={clsx('relative inline-block', className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <DropdownMenuList
          items={items}
          onItemClick={handleItemClick}
          position={position}
          menuClassName={menuClassName}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
