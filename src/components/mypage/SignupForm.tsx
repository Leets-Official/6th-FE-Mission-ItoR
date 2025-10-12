import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/cn';
import Spacer from '@/components/common/Spacer/Spacer';
import TextBox from '@/components/common/Textbox/TextBox';
import Textarea from '@/components/common/Text/Textarea';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import LoginModal from '@/components/auth/LoginModal';
import { AddPhotoAlternateIcon } from '@/assets/icons/common';
import { useSignup } from '@/hooks/useSignup';
import { useModalStore } from '@/stores/useModalStore';
import { MYPAGE_TEXTS, SIGNUP_FORM_FIELDS } from '@/constants';
import { signupSchema, SignupFormData } from '@/utils/schemas';
import profileImage from '@/assets/profile.png';

interface SignupFormProps {
  className?: string;
}

const STYLES = {
  container: 'flex w-full flex-col items-center self-stretch',
  spacer: 'w-full max-w-content',
  profileSection: 'flex w-full max-w-content flex-col items-start justify-center gap-4 py-3 px-4',
  sectionTitle: 'flex items-center justify-center gap-2.5 self-stretch px-1.5',
  profileContent: 'flex flex-col items-start justify-center gap-4',
  profileImage: 'flex h-[90px] w-[90px] items-center gap-2.5 aspect-square rounded-sm',
  image: 'h-full w-full rounded-sm object-cover',
  textareaCommon: 'w-full max-w-content px-0',
  buttonWrapper: 'flex w-full max-w-content items-start gap-2.5 px-4',
} as const;

const SignupForm: FC<SignupFormProps> = ({ className }) => {
  const { previewImage, fileInputRef, handleImageUpload, handleButtonClick } = useSignup(profileImage);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const { modalType, openModal, closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange', // 실시간 유효성 검사
  });

  const onSubmit = (data: SignupFormData) => {
    console.log('Form submitted:', data);
    setIsCompleteModalOpen(true); // 완료 모달 열기
  };

  const handleLoginRedirect = () => {
    setIsCompleteModalOpen(false); // 완료 모달 닫기
    openModal('login'); // 로그인 모달 열기
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(STYLES.container, className)}>
      <Spacer height="md" className={STYLES.spacer} />

      <div className={STYLES.profileSection}>
        <div className={STYLES.sectionTitle}>
          <span className="flex-1 text-sm font-light text-gray-56">{MYPAGE_TEXTS.LABELS.PROFILE_PHOTO}</span>
        </div>
        <div className={STYLES.profileContent}>
          <div className={STYLES.profileImage}>
            <img src={previewImage} alt="Profile" className={STYLES.image} />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <TextBox
            showIcon
            icon={<AddPhotoAlternateIcon />}
            color="gray-90"
            borderColor="gray-90"
            onClick={handleButtonClick}
          >
            {MYPAGE_TEXTS.BUTTONS.ADD_PROFILE_PHOTO}
          </TextBox>
        </div>
      </div>

      {SIGNUP_FORM_FIELDS.map((field) => (
        <Textarea
          key={field.name}
          title={field.title}
          type={field.type}
          placeholder={field.placeholder}
          hintText={field.hintText}
          error={errors[field.name]?.message}
          className={STYLES.textareaCommon}
          {...register(field.name)}
        />
      ))}

      <Spacer height="md" className={STYLES.spacer} />

      <div className={STYLES.buttonWrapper}>
        <Button type="submit" intent="primary" variant="solid" fullWidth>
          {MYPAGE_TEXTS.BUTTONS.SIGNUP_SUBMIT}
        </Button>
      </div>

      <Spacer height="lg" className={STYLES.spacer} />

      {/* 회원가입 완료 모달 */}
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        confirmButtonText={MYPAGE_TEXTS.BUTTONS.LOGIN_REDIRECT}
        confirmButtonVariant="primary"
        onDelete={handleLoginRedirect}
      >
        <p className="py-4 text-center text-sm text-gray-600">
          {MYPAGE_TEXTS.MODAL.SIGNUP_COMPLETE}
        </p>
      </Modal>

      {/* 로그인 모달 */}
      <LoginModal isOpen={modalType === 'login'} onClose={closeModal} />
    </form>
  );
};

export default SignupForm;
