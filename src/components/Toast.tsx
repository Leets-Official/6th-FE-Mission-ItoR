import React from "react";
import ErrorOutline from "@/assets/svgs/error_outline.svg?react";
import Done from "@/assets/svgs/done.svg?react";

type ToastVariant = "success" | "warning";

interface ToastProps {
  variant: ToastVariant;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ variant, message }) => {
  const variantStyles: Record<
    ToastVariant,
    {
      borderColor: string;
      textColor: string;
      icon: React.ReactNode;
      width: string;
      height: string;
    }
  > = {
    success: {
      borderColor: "border-[#15DC5E]",
      textColor: "text-[#15DC5E]",
      icon: <Done className="text-[#15DC5E]" />,
      width: "w-[147px]",
      height: "h-[40px]",
    },
    warning: {
      borderColor: "border-[#FF3F3F]",
      textColor: "text-[#FF3F3F]",
      icon: <ErrorOutline className="text-[#FF3F3F]" />,
      width: "w-[171px]",
      height: "h-[40px]",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
  className={`fixed top-4 left-1/2 transform -translate-x-1/2 
  flex items-center gap-2 px-4 py-2 rounded-full border bg-white shadow-lg 
  ${styles.borderColor} ${styles.height} max-w-[90%]`}
>
  {styles.icon}
  <span className={`text-[14px] ${styles.textColor} whitespace-nowrap`}>
    {message}
  </span>
</div>
  );
};

export default Toast;
