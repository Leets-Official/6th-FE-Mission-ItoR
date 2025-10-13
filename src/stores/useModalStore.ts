import { create } from 'zustand';

export type ModalType = 'login' | 'message' | 'logout' | null;

interface ModalStore {
  modalType: ModalType;
  modalMessage?: string;
  confirmButtonText?: string;
  onModalConfirm?: () => void;
  openModal: (type: Exclude<ModalType, null>, message?: string, onConfirm?: () => void, confirmText?: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  modalMessage: undefined,
  confirmButtonText: undefined,
  onModalConfirm: undefined,
  openModal: (type, message, onConfirm, confirmText) =>
    set({ modalType: type, modalMessage: message, onModalConfirm: onConfirm, confirmButtonText: confirmText }),
  closeModal: () =>
    set({ modalType: null, modalMessage: undefined, onModalConfirm: undefined, confirmButtonText: undefined }),
}));
