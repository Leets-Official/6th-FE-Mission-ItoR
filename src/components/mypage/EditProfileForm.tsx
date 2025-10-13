import { FC } from 'react';
import Spacer from '@/components/common/Spacer/Spacer';

interface EditProfileFormProps {
  className?: string;
}

const EditProfileForm: FC<EditProfileFormProps> = ({ className }) => {
  return (
    <div className={className}>
      <Spacer height="md" className="w-full max-w-content" />
      {/* EditProfileForm 내용 */}
    </div>
  );
};

export default EditProfileForm;
