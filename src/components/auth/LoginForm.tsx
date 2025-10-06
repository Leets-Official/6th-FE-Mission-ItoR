import { FC } from 'react';
import { cn } from '@/utils/cn';
import Spacer from '@/components/common/Spacer/Spacer';
import {
  loginFormVariants,
  loginSectionContainerVariants,
  snsDividerContainerVariants,
  snsDividerLineVariants,
  snsDividerTextVariants,
  inputContainerVariants,
  inputFieldVariants,
  loginButtonVariants,
  snsButtonContentVariants,
  snsButtonTextVariants,
  signupButtonVariants,
  signupTextVariants,
} from './LoginFormVariants';
import { KakaoIcon } from '@/assets/icons/common';
import { AUTH_TEXTS } from '@/constants/auth.constants';

interface LoginFormProps {
  className?: string;
}

// 섹션별 함수들
const InputSection = () => (
  <div className={loginSectionContainerVariants({ align: 'start', gap: 'small' })}>
    <div className={inputContainerVariants()}>
      <input type="email" placeholder={AUTH_TEXTS.LOGIN_FORM.PLACEHOLDERS.EMAIL} className={inputFieldVariants()} />
    </div>
    <div className={inputContainerVariants()}>
      <input
        type="password"
        placeholder={AUTH_TEXTS.LOGIN_FORM.PLACEHOLDERS.PASSWORD}
        className={inputFieldVariants()}
      />
    </div>
  </div>
);

const EmailLoginButton = ({ onClick }: { onClick: () => void }) => (
  <div className={loginSectionContainerVariants()}>
    <button type="button" onClick={onClick} className={loginButtonVariants()}>
      {AUTH_TEXTS.LOGIN_FORM.BUTTONS.EMAIL_LOGIN}
    </button>
  </div>
);

const SnsDivider = () => (
  <div className={snsDividerContainerVariants()}>
    <div className={snsDividerLineVariants()} />
    <span className={snsDividerTextVariants()}>{AUTH_TEXTS.LOGIN_FORM.DIVIDER.SNS}</span>
    <div className={snsDividerLineVariants()} />
  </div>
);

const KakaoLoginButton = ({ onClick }: { onClick: () => void }) => (
  <div className={loginSectionContainerVariants()}>
    <button type="button" onClick={onClick} className={loginButtonVariants({ variant: 'kakao' })}>
      <div className={snsButtonContentVariants()}>
        <KakaoIcon />
        <span className={snsButtonTextVariants({ provider: 'kakao' })} style={{ fontFamily: 'Apple SD Gothic Neo' }}>
          {AUTH_TEXTS.LOGIN_FORM.BUTTONS.KAKAO_LOGIN}
        </span>
      </div>
    </button>
  </div>
);

const SignupButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} className={signupButtonVariants()}>
    <span className={signupTextVariants()}>{AUTH_TEXTS.LOGIN_FORM.BUTTONS.SIGNUP}</span>
  </button>
);

const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const handleLogin = () => {};
  const handleKakaoLogin = () => {};
  const handleSignup = () => {};

  return (
    <div className={cn(loginFormVariants(), className)}>
      <Spacer height="md" className="max-w-login-form-max min-w-login-form-min px-4 py-1" />
      <InputSection />
      <EmailLoginButton onClick={handleLogin} />
      <SnsDivider />
      <KakaoLoginButton onClick={handleKakaoLogin} />
      <SignupButton onClick={handleSignup} />
    </div>
  );
};

export default LoginForm;
