import React from "react";
import { ModalProps } from "./Modal.types";
import {
  overlay,
  container,
  title,
  description,
  actions,
  buttonCancel,
  buttonConfirm,
} from "./Modal.styled";

const Modal: React.FC<ModalProps> = ({
  open,
  title: modalTitle,
  description: modalDescription,
  onClose,
  onConfirm,
  confirmText = "삭제하기",
  cancelText = "취소",
}) => {
  if (!open) return null;

  return (
    <div className={overlay}>
      <div className={container}>
        <div>
          <div className={title}>{modalTitle}</div>
          {modalDescription && <div className={description}>{modalDescription}</div>}
        </div>

        <div className={actions}>
          <button onClick={onClose} className={buttonCancel}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={buttonConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
