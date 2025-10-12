import * as variants from '@/components/auth/LoginFormVariants';
import { KakaoIcon } from '@/assets/icons/common';
import { AUTH_TEXTS } from '@/constants';

interface EmailLoginButtonProps {
  onClick: () => void;
  text: string;
}

export const EmailLoginButton = ({ onClick, text }: EmailLoginButtonProps) => (
  <div className={variants.loginSectionContainerVariants()}>
    <button type="button" onClick={onClick} className={variants.loginButtonVariants()}>
      {text}
    </button>
  </div>
);

interface KakaoLoginButtonProps {
  onClick: () => void;
  text: string;
}

export const KakaoLoginButton = ({ onClick, text }: KakaoLoginButtonProps) => (
  <div className={variants.loginSectionContainerVariants()}>
    <button type="button" onClick={onClick} className={variants.loginButtonVariants({ variant: 'kakao' })}>
      <div className={variants.snsButtonContentVariants()}>
        <KakaoIcon />
        <span className={variants.snsButtonTextVariants({ provider: 'kakao' })}>{text}</span>
      </div>
    </button>
  </div>
);

interface SignupButtonProps {
  onClick: () => void;
}

export const SignupButton = ({ onClick }: SignupButtonProps) => (
  <button type="button" onClick={onClick} className={variants.signupButtonVariants()}>
    <span className={variants.signupTextVariants()}>{AUTH_TEXTS.LOGIN_FORM.BUTTONS.SIGNUP}</span>
  </button>
);
