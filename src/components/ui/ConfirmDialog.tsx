import Modal from "./Modal";
import type { ModalProps } from "./Modal/Modal.types"; 

type Variant = ModalProps["confirmVariant"];

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  variant = "negative",
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      titleLines={[title]}
      descriptionLines={description ? [description] : []}
      confirmText={confirmText}
      cancelText={cancelText}
      confirmVariant={variant}
    />
  );
}
