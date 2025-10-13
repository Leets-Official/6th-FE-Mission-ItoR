import { FC } from 'react';

interface MyProfileFormProps {
  className?: string;
}

const MyProfileForm: FC<MyProfileFormProps> = ({ className }) => {
  return (
    <div className={className}>
      {/* MyProfileForm 내용 */}
    </div>
  );
};

export default MyProfileForm;
