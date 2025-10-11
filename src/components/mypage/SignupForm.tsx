import { FC } from 'react';
import Spacer from '@/components/common/Spacer/Spacer';
import TextBox from '@/components/common/Textbox/TextBox';
import Textarea from '@/components/common/Text/Textarea';
import Button from '@/components/common/Button/Button';
import { AddPhotoAlternateIcon } from '@/assets/icons/common';
import { useSignup } from '@/hooks/useSignup';
import profileImage from '@/assets/profile.png';

interface SignupFormProps {
  className?: string;
}

const SignupForm: FC<SignupFormProps> = ({ className }) => {
  const { previewImage, fileInputRef, handleImageUpload, handleButtonClick } = useSignup(profileImage);

  return (
    <div className={`flex w-full flex-col items-center self-stretch ${className}`}>
      <Spacer height="md" className="w-full max-w-content" />
      <div className="flex w-full max-w-content flex-col items-start justify-center gap-4 py-3 px-4">
        <div className="flex items-center justify-center gap-2.5 self-stretch px-1.5">
          <span className="flex-1 text-sm font-light text-gray-56">프로필 사진</span>
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex h-[90px] w-[90px] items-center gap-2.5 aspect-square rounded-sm">
            <img src={previewImage} alt="Profile" className="h-full w-full rounded-sm object-cover" />
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
            프로필 사진 추가
          </TextBox>
        </div>
      </div>
      <Textarea title="이메일" type="email" placeholder="이메일" className="w-full max-w-content px-0" />
      <Textarea title="비밀번호" type="password" placeholder="비밀번호" className="w-full max-w-content px-0" />
      <Textarea title="비밀번호 확인" type="password" placeholder="비밀번호를 다시 입력하세요" className="w-full max-w-content px-0" />
      <Textarea title="이름" placeholder="이름" className="w-full max-w-content px-0" />
      <Textarea title="생년월일" placeholder="YYYY-MM-DD" className="w-full max-w-content px-0" />
      <Textarea title="닉네임" placeholder="닉네임" className="w-full max-w-content px-0" />
      <Textarea title="한 줄 소개" placeholder="한 줄 소개" className="w-full max-w-content px-0" />
      <Spacer height="md" className="w-full max-w-content" />
      <div className="flex w-full max-w-content items-start gap-2.5 px-4">
        <Button intent="primary" variant="solid" fullWidth>
          회원가입 완료
        </Button>
      </div>
      <Spacer height="lg" className="w-full max-w-content" />
    </div>
  );
};

export default SignupForm;
