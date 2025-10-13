import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import LoginLogo from '@/components/auth/LoginLogo';
import LoginForm from '@/components/auth/LoginForm';
import { MYPAGE_TEXTS, MYPAGE_ROUTES } from '@/constants';

const STYLES = {
  formWrapper: 'flex h-post-card px-4 flex-col items-center gap-2.5 self-stretch',
  container: 'flex w-full max-w-login-page content-center items-center justify-center flex-wrap bg-white py-20',
  dividerLineColor: 'bg-[#F5F5F5]',
} as const;

interface MyPageFormProps {
  className?: string;
  children?: ReactNode;
}

const MyPageForm: FC<MyPageFormProps> = ({ className, children }) => {
  const navigate = useNavigate();

  const handleEmailSignup = () => {
    navigate(MYPAGE_ROUTES.SIGNUP);
  };

  const handleKakaoSignup = () => {};

  return (
    <div className={STYLES.formWrapper}>
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
    </div>
  );
};

export default MyPageForm;
