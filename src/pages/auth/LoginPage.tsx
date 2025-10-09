import { FC } from 'react';
import { cn } from '@/utils/cn';
import { LoginLogo, LoginForm } from '@/components/auth';

interface LoginPageProps {
  className?: string;
  onClose?: () => void;
}

const LoginPage: FC<LoginPageProps> = ({ className, onClose }) => {
  return (
    <div className={cn('login-page-row', className)}>
      <LoginLogo />
      <LoginForm onClose={onClose} />
    </div>
  );
};

export default LoginPage;
