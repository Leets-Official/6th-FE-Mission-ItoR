import { FC } from 'react';
import { ChatIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';
import DropdownMenu from '@/components/common/Dropdown/DropdownMenu';
import Modal from '@/components/common/Modal/Modal';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDetailTypeHeader } from '@/hooks';
import { PAGEHEADER_TEXTS } from '@/constants';

interface DetailTypeHeaderProps {
  isOwner?: boolean;
}

export const DetailTypeHeader: FC<DetailTypeHeaderProps> = ({ isOwner = false }) => {
  const { isLoggedIn } = useAuthStore();
  const {
    handleChatClick,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    modalTexts,
  } = useDetailTypeHeader();

  const dropdownItems = [
    {
      id: 'edit',
      label: PAGEHEADER_TEXTS.DETAIL.DROPDOWN.EDIT,
      onClick: handleEdit,
    },
    {
      id: 'delete',
      label: PAGEHEADER_TEXTS.DETAIL.DROPDOWN.DELETE,
      onClick: handleDelete,
      color: 'danger' as const,
    },
  ];

  const canEdit = isLoggedIn && isOwner;

  return (
    <>
      <div className="flex items-center gap-2">
        <Icon size="lg" clickable onClick={handleChatClick}>
          <ChatIcon />
        </Icon>
        {canEdit ? (
          <DropdownMenu
            trigger={
              <Icon size="lg" clickable>
                <MoreVertIcon />
              </Icon>
            }
            items={dropdownItems}
            position="right"
          />
        ) : (
          <Icon size="lg" className="opacity-100 cursor-not-allowed">
            <MoreVertIcon />
          </Icon>
        )}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleConfirmDelete}
        confirmButtonText={modalTexts.confirm}
        cancelButtonText={modalTexts.cancel}
        confirmButtonVariant="danger"
      >
        <div className="flex flex-col items-start gap-2">
          <p className="text-base font-medium text-black">{modalTexts.deleteTitle}</p>
          <p className="text-sm font-light text-gray-56">{modalTexts.deleteDescription}</p>
        </div>
      </Modal>
    </>
  );
};
