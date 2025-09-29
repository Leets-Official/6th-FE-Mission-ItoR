import React from "react";
import clsx from "clsx";
import type { TextBoxProps } from "@ui/TextBox.types";
import {
  boxBase,
  byStyleWrap,
  titlePrimary,
  descCommon,
  titleCompact,
  textSingle,
} from "@ui/TextBox.variants";

const TextBox: React.FC<TextBoxProps> = ({
  tbStyle = "primary",
  title,
  description,
  text,
  className,
  children,
  ...rest
}) => {
  return (
    <div className={clsx(boxBase, byStyleWrap[tbStyle], className)} {...rest}>
      {tbStyle === "primary" && (
        <>
          {title != null && <div className={titlePrimary}>{title}</div>}
          {description != null && <div className={descCommon}>{description}</div>}
        </>
      )}

      {tbStyle === "compact" && (
        <>
          {title != null && <div className={titleCompact}>{title}</div>}
          {description != null && <div className={descCommon}>{description}</div>}
        </>
      )}

      {tbStyle === "single" && (
        <div className={textSingle}>{text ?? children}</div>
      )}
    </div>
  );
};

export default TextBox;
