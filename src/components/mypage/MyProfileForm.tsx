import { FC } from 'react';
import Spacer from '@/components/common/Spacer/Spacer';

interface MyProfileFormProps {
  className?: string;
}

const MyProfileForm: FC<MyProfileFormProps> = ({ className }) => {
  return (
    <div className={className}>
      <Spacer height="md" className="w-full max-w-content" />
      {/* MyProfileForm 내용 */}
    </div>
  );
};

export default MyProfileForm;
