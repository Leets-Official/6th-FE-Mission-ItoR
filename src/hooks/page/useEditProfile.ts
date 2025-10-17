import { useEditModeStore } from '@/stores/useEditModeStore';

export const useEditProfile = () => {
  const { setEditMode } = useEditModeStore();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    // TODO: 저장 로직 구현
    setEditMode(false);
  };

  return {
    handleEdit,
    handleCancel,
    handleSave,
  };
};
