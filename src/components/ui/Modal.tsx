import React from "react";
import clsx from "clsx";
import type { ModalProps } from "@ui/Modal.types";
import {
  overlayBase,
  cardBase,
  headerBlock,
  titleLine,
  descLine,
  actionsRow,
  btnBase,
  btnCancel,
  btnConfirm,
} from "./Modal.variants";

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  confirmText = "삭제하기",
  cancelText = "취소",
  titleLines,
  descriptionLines,
  className,
  closeOnOverlay = true,
}) => {
  const baseId = React.useId();
  const labelId = `${baseId}-label`;
  const descId = `${baseId}-desc`;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlay) onClose();
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div className={overlayBase} onClick={handleOverlayClick} role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-describedby={descriptionLines?.length ? descId : undefined}
        className={clsx(cardBase, className)}
        onClick={stop}
      >
        {/* 타이틀/설명 블록 */}
        <div className={headerBlock}>
          {/* 타이틀: 1~2줄 */}
          <div id={labelId} className="flex flex-col gap-1">
            {titleLines.map((line, idx) => (
              <p key={idx} className={titleLine}>
                {line}
              </p>
            ))}
          </div>

          {/* 설명: 있을 때만 */}
          {descriptionLines?.length ? (
            <div id={descId} className="flex flex-col gap-1">
              {descriptionLines.map((line, idx) => (
                <p key={idx} className={descLine}>
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        {/* 액션 버튼 */}
        <div className={actionsRow}>
          <button type="button" className={clsx(btnBase, btnCancel)} onClick={handleCancel}>
            {cancelText}
          </button>
          <button type="button" className={clsx(btnBase, btnConfirm)} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
