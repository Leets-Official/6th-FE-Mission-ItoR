import React from 'react';
import TextFieldSet from './TextFieldSet';
import Profile from '@/assets/svgs/Profile.svg?react';
import { S } from '@/styles/ProfileFind.styles';

interface ProfileFormHeaderProps {
  form: {
    nickname: string;
    introduction: string;
    profilePicture: string;
  };
  setForm: (form: any) => void;
  isEditing: boolean;
  isUploading: boolean;
  onProfileClick: () => void;
}

const ProfileFormHeader: React.FC<ProfileFormHeaderProps> = ({
  form,
  setForm,
  isEditing,
  isUploading,
  onProfileClick,
}) => {
  return (
    <div className={S.headerContainer}>
      <div className={S.headerInner}>
        <button
          onClick={onProfileClick}
          className={S.profileImageButton}
          disabled={!isEditing || isUploading}
        >
          {form.profilePicture ? (
            <img src={form.profilePicture} alt="profile" className={S.profileImage} />
          ) : (
            <Profile className={S.profileImage} />
          )}
        </button>
        {isUploading && <p className={S.uploadingText}>업로드 중...</p>}

        <TextFieldSet
          label=""
          value={form.nickname}
          onChange={(value) => setForm({ ...form, nickname: value })}
          disabled={!isEditing}
          size="lg"
          className="w-full"
        />
        <p className={S.nicknameHelperText}>*20글자 이내</p>

        <TextFieldSet
          label=""
          value={form.introduction}
          onChange={(value) => setForm({ ...form, introduction: value })}
          disabled={!isEditing}
          size="sm"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProfileFormHeader;
