export interface ModalProps {
  open: boolean;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}
