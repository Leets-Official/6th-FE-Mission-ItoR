import { FC } from 'react';
import { cn } from '@/utils/cn';
import { useLoginForm } from '@/hooks';
import { Spacer } from '@/components';
import * as variants from '@/components/auth/LoginFormVariants';
import { AUTH_TEXTS } from '@/constants';
import {
  InputSection,
  ErrorMessage,
  SnsDivider,
  EmailLoginButton,
  KakaoLoginButton,
  SignupButton,
} from '@/components/auth/LoginFormComponents';

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
  const {
    email,
    password,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
    handleKeyDown,
    handleKakaoLogin,
    handleSignup,
  } = useLoginForm(onClose);

  return (
    <div className={cn(variants.loginFormVariants(), className)}>
      <Spacer height="md" className="max-w-login-form-max min-w-login-form-min px-4 py-1" />
      {showInputSection && (
        <InputSection
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onKeyDown={handleKeyDown}
        />
      )}
      <ErrorMessage message={errorMessage} />
      <EmailLoginButton onClick={onEmailClick || handleLogin} text={emailButtonText} />
      <SnsDivider text={dividerText} lineColor={dividerLineColor} />
      <KakaoLoginButton onClick={onKakaoClick || handleKakaoLogin} text={kakaoButtonText} />
      {showSignupButton && <SignupButton onClick={handleSignup} />}
    </div>
  );
};

export default LoginForm;
