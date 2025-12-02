import React from 'react';
import GitLogo from '@/assets/svgs/GitLogo.svg?react';
import { S } from '@/styles/Login.styles';

const LoginGraphic: React.FC = () => {
  return (
    <div className={S.graphicContainer}>
      <GitLogo className={S.graphicSvg} />
      <p className={S.graphicText}>You can make anything by writing</p>
    </div>
  );
};

export default LoginGraphic;
