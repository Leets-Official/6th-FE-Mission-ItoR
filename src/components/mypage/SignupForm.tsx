import { FC } from 'react';
import { tv } from 'tailwind-variants';
import Spacer from '@/components/common/Spacer/Spacer';
import TextBox from '@/components/common/Textbox/TextBox';
import Textarea from '@/components/common/Text/Textarea';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import LoginModal from '@/components/auth/LoginModal';
import { AddPhotoAlternateIcon } from '@/assets/icons/common';
import { useSignup } from '@/hooks';
import { MYPAGE_TEXTS, SIGNUP_FORM_FIELDS } from '@/constants';
import profileImage from '@/assets/profile.png';
import { SignupFormProps } from '@/types/mypage';

const signupFormStyles = tv({
  slots: {
    container: 'flex w-full flex-col items-center self-stretch',
    spacer: 'w-full max-w-content',
    profileSection: 'flex w-full max-w-content flex-col items-start justify-center gap-4 py-3 px-4',
    sectionTitle: 'flex items-center justify-center gap-2.5 self-stretch px-1.5',
    profileContent: 'flex flex-col items-start justify-center gap-4',
    profileImage: 'flex h-[90px] w-[90px] items-center gap-2.5 aspect-square rounded-full overflow-hidden',
    image: 'h-full w-full object-cover',
    textareaCommon: 'w-full max-w-content px-0',
    buttonWrapper: 'flex w-full max-w-content items-start gap-2.5 px-4',
  },
});

const SignupForm: FC<SignupFormProps> = ({ className }) => {
  const {
    previewImage,
    fileInputRef,
    handleImageUpload,
    handleButtonClick,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    handleLoginRedirect,
    isCompleteModalOpen,
    setIsCompleteModalOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
  } = useSignup(profileImage);

  const styles = signupFormStyles();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container({ className })}>
      <Spacer height="md" className={styles.spacer()} />
      <div className={styles.profileSection()}>
        <div className={styles.sectionTitle()}>
          <span className="flex-1 text-sm font-light text-gray-56">{MYPAGE_TEXTS.LABELS.PROFILE_PHOTO}</span>
        </div>
        <div className={styles.profileContent()}>
          <div className={styles.profileImage()}>
            <img src={previewImage} alt="Profile" className={styles.image()} />
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
      {SIGNUP_FORM_FIELDS.map(field => (
        <Textarea
          key={field.name}
          title={field.title}
          type={field.type}
          placeholder={field.placeholder}
          hintText={field.hintText}
          error={errors[field.name]?.message}
          className={styles.textareaCommon()}
          {...register(field.name)}
        />
      ))}
      <Spacer height="md" className={styles.spacer()} />
      <div className={styles.buttonWrapper()}>
        <Button type="submit" intent="primary" variant="solid" fullWidth>
          {MYPAGE_TEXTS.BUTTONS.SIGNUP_SUBMIT}
        </Button>
      </div>
      <Spacer height="lg" className={styles.spacer()} />
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        confirmButtonText={MYPAGE_TEXTS.BUTTONS.LOGIN_REDIRECT}
        confirmButtonVariant="primary"
        onDelete={handleLoginRedirect}
      >
        <p className="text-center text-sm">{MYPAGE_TEXTS.MODAL.SIGNUP_COMPLETE}</p>
      </Modal>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </form>
  );
};

export default SignupForm;
