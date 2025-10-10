import { FC } from 'react';

interface SignupFormProps {
  className?: string;
}

const SignupForm: FC<SignupFormProps> = ({ className }) => {
  return (
    <div className={className}>
      {/* 회원가입 폼 내용 */}
    </div>
  );
};

export default SignupForm;
