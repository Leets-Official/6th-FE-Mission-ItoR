import React from "react";
import clsx from "clsx";
import type { TextFieldProps } from "@ui/TextField.types";
import {
  wrapperBase,
  labelClass,
  fieldBase,
  inputClass,
  bySize,
  byStyle,
} from "./TextField.variants";

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      size = "lg",
      tfStyle = "default",
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const genId = React.useId();
    const inputId = id ?? genId;

    const styleKey: Parameters<typeof Object.keys>[0] & keyof typeof byStyle =
      (disabled ? "disabled" : tfStyle);

    return (
      <label className={clsx(wrapperBase, fullWidth && "w-full")}>
        {label && <span className={labelClass}>{label}</span>}

        <span
          className={clsx(
            fieldBase,
            byStyle[styleKey],
            bySize[size],
            fullWidth && "w-full",
            className
          )}
        >
          {leftIcon && <i className="shrink-0" aria-hidden>{leftIcon}</i>}

          <input
            id={inputId}
            ref={ref}
            className={inputClass}
            disabled={disabled}
            {...rest}
          />

          {rightIcon && <i className="shrink-0" aria-hidden>{rightIcon}</i>}
        </span>
      </label>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
