// src/components/common/Spacer.tsx
import React from "react";
import clsx from "clsx";

type Props = {
  y?: number;
  x?: number;
  inline?: boolean;
  className?: string;
};

const Spacer: React.FC<Props> = ({ y, x, inline, className }) => {
  const style: React.CSSProperties = {
    ...(y != null ? { height: y } : null),
    ...(x != null ? { width: x } : null),
  };

  return inline ? (
    <span aria-hidden className={clsx("inline-block shrink-0", className)} style={style} />
  ) : (
    <div aria-hidden className={clsx("w-full shrink-0", className)} style={style} />
  );
};

export default Spacer;
