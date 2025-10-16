import { FC, useState } from 'react';
import { ChatIcon, MoreVertIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';
import DropdownMenu from '@/components/common/Dropdown/DropdownMenu';
import Modal from '@/components/common/Modal/Modal';
import { useAuthStore } from '@/stores/useAuthStore';

interface DetailTypeHeaderProps {
  isOwner?: boolean;
}

export const DetailTypeHeader: FC<DetailTypeHeaderProps> = ({ isOwner = false }) => {
  const { isLoggedIn } = useAuthStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChatClick = () => {
    // 댓글 섹션으로 스크롤
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
      label: '수정하기',
      onClick: handleEdit,
    },
    {
      id: 'delete',
      label: '삭제하기',
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
        confirmButtonText="삭제하기"
        cancelButtonText="취소"
        confirmButtonVariant="danger"
      >
        <div className="flex flex-col items-start gap-2">
          <p className="text-base font-medium text-black">해당 블로그를 삭제할까요?</p>
          <p className="text-sm font-light text-gray-56">삭제된 블로그는 다시 확인할 수 없어요.</p>
        </div>
      </Modal>
    </>
  );
};
