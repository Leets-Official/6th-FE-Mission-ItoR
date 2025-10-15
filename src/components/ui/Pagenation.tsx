import React from "react";
import clsx from "clsx";
import {
  containerBase,
  listBase,
  itemBase,
  itemDefault,
  itemActive,
  itemDisabled,
} from "./Pagenation.variants";
import type { PagenationProps } from "./Pagenation.types";

function PageButton({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        itemBase,
        disabled ? itemDisabled : active ? itemActive : itemDefault
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </button>
  );
}

function makeRange(current: number, total: number, max: number) {
  const count = Math.min(total, Math.max(1, max));
  const pages = Array.from({ length: count }, (_, i) => i + 1);
  return pages;
}

const Pagenation: React.FC<PagenationProps> = ({
  page,
  totalPages,
  onChange,
  showArrows = true,
  maxButtons = 5,
  className,
}) => {
  const pages = makeRange(page, totalPages, maxButtons);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const go = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  return (
    <nav className={clsx(containerBase, className)} aria-label="pagination">
      <div className={listBase}>
        {showArrows && (
          <PageButton disabled={!canPrev} onClick={() => go(page - 1)}>
            {"<"}
          </PageButton>
        )}

        {pages.map((p) => (
          <PageButton key={p} active={p === page} onClick={() => go(p)}>
            {p}
          </PageButton>
        ))}

        {showArrows && (
          <PageButton disabled={!canNext} onClick={() => go(page + 1)}>
            {">"}
          </PageButton>
        )}
      </div>
    </nav>
  );
};

export default Pagenation;
