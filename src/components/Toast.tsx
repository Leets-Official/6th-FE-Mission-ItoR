import React from "react";
import ErrorOutline from "@/assets/svgs/error_outline.svg?react";
import Done from "@/assets/svgs/done.svg?react";

type ToastVariant = "success" | "warning";

interface ToastProps {
  variant: ToastVariant;
}

const Toast: React.FC<ToastProps> = ({ variant }) => {
  const variantStyles: Record<
    ToastVariant,
    {
      borderColor: string;
      textColor: string;
      icon: React.ReactNode;
      message: string;
      width: string;
      height: string;
    }
  > = {
    success: {
      borderColor: "border-[#15DC5E]",
      textColor: "text-[#15DC5E]",
      icon: <ErrorOutline className="text-[#15DC5E]" />,
      message: "저장되었습니다!",
      width: "w-[147px]",
      height: "h-[40px]",
    },
    warning: {
      borderColor: "border-[#FF3F3F]",
      textColor: "text-[#FF3F3F]",
      icon: <Done  className="text-[#FF3F3F]" />,
      message: "내용을 입력해주세요!",
      width: "w-[171px]",
      height: "h-[40px]",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-white ${styles.borderColor} ${styles.width} ${styles.height}`}>
        {styles.icon}
      <span className={`text-[14px] ${styles.textColor} whitespace-nowrap`}>
        {styles.message}
      </span>
    </div>
  );
};

export default Toast;
