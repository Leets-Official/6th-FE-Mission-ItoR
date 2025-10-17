import { FC, useState } from 'react';
import { ChatIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';
import DropdownMenu from '@/components/common/Dropdown/DropdownMenu';
import Modal from '@/components/common/Modal/Modal';
import { useAuthStore } from '@/stores/useAuthStore';
import { PAGEHEADER_TEXTS } from '@/constants';

interface DetailTypeHeaderProps {
  isOwner?: boolean;
}

export const DetailTypeHeader: FC<DetailTypeHeaderProps> = ({ isOwner = false }) => {
  const { isLoggedIn } = useAuthStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChatClick = () => {
    // 댓글 섹션 스크롤
    const commentSection = document.querySelector('[data-comment-section]');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEdit = () => {
    // TODO: 수정하기 기능 구현
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: 실제 삭제 API 호출
    setIsDeleteModalOpen(false);
  };

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
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        confirmButtonText={PAGEHEADER_TEXTS.DETAIL.MODAL.CONFIRM}
        cancelButtonText={PAGEHEADER_TEXTS.DETAIL.MODAL.CANCEL}
        confirmButtonVariant="danger"
      >
        <div className="flex flex-col items-start gap-2">
          <p className="text-base font-medium text-black">{PAGEHEADER_TEXTS.DETAIL.MODAL.DELETE_TITLE}</p>
          <p className="text-sm font-light text-gray-56">{PAGEHEADER_TEXTS.DETAIL.MODAL.DELETE_DESCRIPTION}</p>
        </div>
      </Modal>
    </>
  );
};
