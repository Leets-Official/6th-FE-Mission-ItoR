import { FC } from 'react';
import { cn } from '@/utils/cn';
import Spacer from '@/components/common/Spacer/Spacer';
import TextBox from '@/components/common/Textbox/TextBox';
import Textarea from '@/components/common/Text/Textarea';
import Button from '@/components/common/Button/Button';
import { AddPhotoAlternateIcon } from '@/assets/icons/common';
import { useSignup } from '@/hooks/useSignup';
import { MYPAGE_TEXTS, SIGNUP_FORM_FIELDS } from '@/constants';
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

  return (
    <div className={cn(STYLES.container, className)}>
      <Spacer height="md" className={STYLES.spacer} />

      {/* 프로필 사진 섹션 */}
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

      {/* 폼 필드들 */}
      {SIGNUP_FORM_FIELDS.map((field) => (
        <Textarea
          key={field.title}
          title={field.title}
          type={field.type}
          placeholder={field.placeholder}
          hintText={field.hintText}
          className={STYLES.textareaCommon}
        />
      ))}

      <Spacer height="md" className={STYLES.spacer} />

      {/* 제출 버튼 */}
      <div className={STYLES.buttonWrapper}>
        <Button intent="primary" variant="solid" fullWidth>
          {MYPAGE_TEXTS.BUTTONS.SIGNUP_SUBMIT}
        </Button>
      </div>

      <Spacer height="lg" className={STYLES.spacer} />
    </div>
  );
};

export default SignupForm;
