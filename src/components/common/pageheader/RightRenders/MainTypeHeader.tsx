import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateIcon } from '@/assets/icons/common';
import Icon from '@/components/common/Icon/Icon';
import { useAuthStore } from '@/stores/useAuthStore';
import Modal from '@/components/common/Modal/Modal';
import { LoginModal } from '@/components/auth';

export const MainTypeHeader: FC = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      setIsMessageModalOpen(true);
      return;
    }
    navigate('/blog/write');
  };

  const handleLoginConfirm = () => {
    setIsMessageModalOpen(false);
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 0);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex cursor-pointer items-center justify-center gap-1 rounded-[25px] px-3 py-2 text-sm font-normal leading-[160%] tracking-[-0.07px] text-gray hover:bg-gray-10"
      >
        <Icon size="lg">
          <CreateIcon />
        </Icon>
        <span>깃로그 쓰기</span>
      </div>

      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onDelete={handleLoginConfirm}
        cancelButtonText="취소"
        confirmButtonText="로그인 하러 가기"
        confirmButtonVariant="primary"
      >
        <p className="text-center text-sm">로그인이 필요합니다</p>
      </Modal>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};
