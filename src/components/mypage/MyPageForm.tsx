import { FC, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import LoginLogo from '@/components/auth/LoginLogo';
import LoginForm from '@/components/auth/LoginForm';
import { MYPAGE_TEXTS } from '@/constants/mypage.constants';

const STYLES = {
  container: 'flex w-full max-w-login-page content-center items-center justify-center flex-wrap bg-white py-20 px-0',
  dividerLineColor: 'bg-gray-96',
} as const;

interface MyPageFormProps {
  className?: string;
  children?: ReactNode;
}

const MyPageForm: FC<MyPageFormProps> = ({ className, children }) => {
  const handleEmailSignup = () => {};

  const handleKakaoSignup = () => {};

  return (
    <div className={cn(STYLES.container, className)}>
      <LoginLogo isDark />
      <LoginForm
        showInputSection={false}
        showSignupButton={false}
        emailButtonText={MYPAGE_TEXTS.BUTTONS.EMAIL_SIGNUP}
        kakaoButtonText={MYPAGE_TEXTS.BUTTONS.KAKAO_SIGNUP}
        dividerText={MYPAGE_TEXTS.DIVIDER.OR}
        dividerLineColor={STYLES.dividerLineColor}
        onEmailClick={handleEmailSignup}
        onKakaoClick={handleKakaoSignup}
      />
      {children}
    </div>
  );
};

export default MyPageForm;
