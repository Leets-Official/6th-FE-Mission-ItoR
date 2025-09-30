import { FC } from 'react';
import { cn } from '@/utils/cn';
import { LogoWebp } from '@/assets/logo';

// 공통 base 스타일
const baseFlexCenterStyle = 'flex justify-center items-center self-stretch';

// 각 섹션별 스타일
const logoContainerStyle = cn(
  baseFlexCenterStyle,
  'h-logo-container min-w-logo-container-min max-w-logo-container px-[login-logo-px]'
);

const textboxContainerStyle = cn(
  baseFlexCenterStyle,
  'h-login-textbox-container min-w-login-textbox-container-min max-w-login-textbox-container',
  'px-4 py-3 gap-2.5'
);

const textboxTextStyle = 'flex-1 text-center text-gray-56 text-sm font-light leading-[160%] tracking-[-0.07px]';

const LoginLogo: FC = () => {
  return (
    <div className="login-logo-text-wrapper">
      <div className={logoContainerStyle}>
        <img src={LogoWebp} alt="Gitlog Logo" />
      </div>
      <div className={textboxContainerStyle}>
        <div className={textboxTextStyle}>
          You can make anything by writing
        </div>
      </div>
    </div>
  );
};

export default LoginLogo;