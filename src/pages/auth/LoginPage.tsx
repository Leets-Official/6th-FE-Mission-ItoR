import { FC } from 'react';
import { cn } from '@/utils/cn';
import { LoginLogo, LoginForm } from '@/components/auth';

interface LoginPageProps {
  className?: string;
}

const LoginPage: FC<LoginPageProps> = ({ className }) => {
  return (
    <div className={cn('login-page-row', className)}>
      <LoginLogo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
