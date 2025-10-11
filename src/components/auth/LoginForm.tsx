import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AUTH_TEXTS } from '@/constants';

interface LoginFormProps {
  className?: string;
  onClose?: () => void;
  showInputSection?: boolean;
  showSignupButton?: boolean;
  emailButtonText?: string;
  kakaoButtonText?: string;
  dividerText?: string;
  dividerLineColor?: string;
  onEmailClick?: () => void;
  onKakaoClick?: () => void;
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

const EmailLoginButton = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <div className={loginSectionContainerVariants()}>
    <button type="button" onClick={onClick} className={loginButtonVariants()}>
      {text}
    </button>
  </div>
);

const SnsDivider = ({ text, lineColor }: { text: string; lineColor?: string }) => (
  <div className={snsDividerContainerVariants()}>
    <div className={lineColor ? `w-sns-divider-line h-px ${lineColor}` : snsDividerLineVariants()} />
    <span className={snsDividerTextVariants()}>{text}</span>
    <div className={lineColor ? `w-sns-divider-line h-px ${lineColor}` : snsDividerLineVariants()} />
  </div>
);

const KakaoLoginButton = ({ onClick, text }: { onClick: () => void; text: string }) => (
  <div className={loginSectionContainerVariants()}>
    <button type="button" onClick={onClick} className={loginButtonVariants({ variant: 'kakao' })}>
      <div className={snsButtonContentVariants()}>
        <KakaoIcon />
        <span className={snsButtonTextVariants({ provider: 'kakao' })} style={{ fontFamily: 'Apple SD Gothic Neo' }}>
          {text}
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

const LoginForm: FC<LoginFormProps> = ({
  className,
  onClose,
  showInputSection = true,
  showSignupButton = true,
  emailButtonText = AUTH_TEXTS.LOGIN_FORM.BUTTONS.EMAIL_LOGIN,
  kakaoButtonText = AUTH_TEXTS.LOGIN_FORM.BUTTONS.KAKAO_LOGIN,
  dividerText = AUTH_TEXTS.LOGIN_FORM.DIVIDER.SNS,
  dividerLineColor,
  onEmailClick,
  onKakaoClick,
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {};
  const handleKakaoLogin = () => {};
  const handleSignup = () => {
    onClose?.();
    navigate('/mypage');
  };

  return (
    <div className={cn(loginFormVariants(), className)}>
      <Spacer height="md" className="max-w-login-form-max min-w-login-form-min px-4 py-1" />
      {showInputSection && <InputSection />}
      <EmailLoginButton onClick={onEmailClick || handleLogin} text={emailButtonText} />
      <SnsDivider text={dividerText} lineColor={dividerLineColor} />
      <KakaoLoginButton onClick={onKakaoClick || handleKakaoLogin} text={kakaoButtonText} />
      {showSignupButton && <SignupButton onClick={handleSignup} />}
    </div>
  );
};

export default LoginForm;
