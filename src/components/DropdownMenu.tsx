import React, { type FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

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

const DropdownMenu: FC<DropdownMenuProps> = ({
  trigger,
  items,
  className = "",
  menuClassName = "",
  position = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownMenuItem) => {
    if (!item.disabled && item.onClick) item.onClick();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">{trigger}</div>

      {isOpen && (
        <div className={cn("absolute mt-2 min-w-[160px] rounded-md shadow-lg z-50 bg-white p-2", position === "right" ? "right-0" : "left-0", menuClassName)}>
          <div className="absolute -top-2 right-4 w-3 h-3 rotate-45 bg-white"></div>
          <ul className="flex flex-col">
            {items.map((item, idx) => (
              <li
                key={idx}
                onClick={() => !item.disabled && handleItemClick(item)}
                className={clsx(
                  "px-4 py-2 cursor-pointer bg-white hover:bg-gray-100 rounded-md transition-colors",
                  item.disabled && "cursor-not-allowed opacity-50",
                  item.label.includes("삭제") && "text-red-500 font-medium"
                )}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
