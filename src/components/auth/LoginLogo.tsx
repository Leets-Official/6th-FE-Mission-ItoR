import { FC } from 'react';
import { LogoWebp } from '@/assets/logo';
import { logoWrapperStyle, logoContainerStyle, textboxContainerStyle, textboxTextStyle } from './LoginLogo.styles';

const LoginLogo: FC = () => {
  return (
    <div className={logoWrapperStyle}>
      <div className={logoContainerStyle}>
        <img src={LogoWebp} alt="Gitlog Logo" />
      </div>
      <div className={textboxContainerStyle}>
        <div className={textboxTextStyle}>You can make anything by writing</div>
      </div>
    </div>
  );
};

export default LoginLogo;
