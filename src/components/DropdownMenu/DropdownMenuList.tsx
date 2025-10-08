import { FC } from "react";
import { DropdownMenuItem } from "./DropdownMenu.types";
import { baseMenu, bubbleArrow, menuItem } from "./DropdownMenu.styled";
import { cn } from "@/utils/cn";

interface DropdownMenuListProps {
  items: DropdownMenuItem[];
  onItemClick: (item: DropdownMenuItem) => void;
  position: "left" | "right";
  menuClassName?: string;
}

const DropdownMenuList: FC<DropdownMenuListProps> = ({
  items,
  onItemClick,
  position,
  menuClassName = "",
}) => {
  return (
    <div className={cn(baseMenu, position === "right" ? "right-0" : "left-0", menuClassName)}>
      <div className={bubbleArrow}></div>

      <ul className="flex flex-col">
        {items.map((item, idx) => (
          <li
            key={idx}
            onClick={() => !item.disabled && onItemClick(item)}
            className={cn(menuItem, item.disabled && "cursor-not-allowed opacity-50")}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenuList;
