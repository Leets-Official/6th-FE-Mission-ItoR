import React from "react";
import clsx from "clsx";
import type { DropdownProps, DropdownItem } from "@ui/Dropdown.types";
import {
  rootBase,
  panelWrap,
  sheetBase,
  itemBase,
  itemInteractive,
  itemDisabled,
} from "./Dropdown.variants";
import Caret from "@icons/dropdown-caret.svg?react";

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  position = "right",
  className,
  menuClassName,
  onOpenChange,
  showArrow = true,
  caretOffsetX = 16,
}) => {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const setOpenSafe = (v: boolean) => {
    setOpen(v);
    onOpenChange?.(v);
  };

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpenSafe(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSafe(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const onItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    setOpenSafe(false);
  };

  return (
    <div ref={rootRef} className={clsx(rootBase, className)}>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpenSafe(!open)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpenSafe(!open)}
        className="cursor-pointer select-none"
      >
        {trigger}
      </div>

      {open && (
        <div
          className={clsx(panelWrap, position === "right" ? "right-0" : "left-0", menuClassName)}
          role="menu"
        >
          {showArrow && (
            <Caret
              className="absolute -top-2"
              style={{
                right: position === "right" ? `${caretOffsetX}px` : "auto",
                left: position === "left" ? `${caretOffsetX}px` : "auto",
              }}
              aria-hidden
            />
          )}

          <div className={sheetBase}>
            {items.map((it) => (
              <button
                key={it.id}
                type="button"
                role="menuitem"
                disabled={it.disabled}
                onClick={() => onItemClick(it)}
                className={clsx(
                  itemBase,
                  it.disabled ? itemDisabled : itemInteractive,
                  "first:rounded-t-[4px] last:rounded-b-[4px]"
                )}
              >
                <span className="flex-1 text-left">{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
