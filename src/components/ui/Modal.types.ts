import type React from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;

  onConfirm?: () => void;
  onCancel?: () => void;

  /** 버튼 라벨 **/
  confirmText?: string; // 기본: "삭제하기"
  cancelText?: string;  // 기본: "취소"

  /** 타이틀 두 줄 **/
  titleLines: Array<React.ReactNode>;

  /** 설명 라인 **/
  descriptionLines?: Array<React.ReactNode>;

  className?: string;

  closeOnOverlay?: boolean;
}
