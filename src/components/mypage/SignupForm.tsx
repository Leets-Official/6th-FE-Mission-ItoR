import { FC } from 'react';
import Spacer from '@/components/common/Spacer/Spacer';

interface SignupFormProps {
  className?: string;
}

const SignupForm: FC<SignupFormProps> = ({ className }) => {
  return (
    <div className={className}>
      <Spacer height="md" />
      {/* 회원가입 폼 내용 */}
    </div>
  );
};

export default SignupForm;
