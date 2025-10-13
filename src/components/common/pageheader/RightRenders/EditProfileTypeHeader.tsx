import { FC } from 'react';
import { useEditModeStore } from '@/stores/useEditModeStore';

interface EditProfileTypeHeaderProps {
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export const EditProfileTypeHeader: FC<EditProfileTypeHeaderProps> = ({ onEdit, onCancel, onSave }) => {
  const isEditMode = useEditModeStore(state => state.isEditMode);

  if (!isEditMode) {
    return (
      <button type="button" onClick={onEdit} className="flex items-center justify-center gap-1 px-3 py-2">
        <span className="text-sm font-regular text-black">수정하기</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <button type="button" onClick={onCancel} className="flex items-center justify-center gap-1 px-3 py-2">
        <span className="text-sm font-regular text-warning">취소하기</span>
      </button>
      <button type="submit" onClick={onSave} className="flex items-center justify-center gap-1 px-3 py-2">
        <span className="text-sm font-regular text-black">저장하기</span>
      </button>
    </div>
  );
};
