import React from "react";

export type SmallVariant =
  | "secondaryOutline" // 회색 라인 + 투명 배경
  | "disabled"; // 흐린 텍스트 + 연한 회색 배경

export interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: SmallVariant;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}
