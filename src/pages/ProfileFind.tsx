import React from "react";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import ProfileFormHeader from "@/components/ProfileFormHeader";
import ProfileForm from "@/components/ProfileForm";
import { useProfileFind } from "@/hooks/useProfileFind";
import { S } from "@/styles/ProfileFind.styles";

const ProfileFind: React.FC = () => {
  const {
    fileInputRef,
    isLoading,
    isError,
    isUploading,
    isEditing,
    form,
    setForm,
    toastMessage,
    isKakaoUser,
    fields,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleProfileClick,
    handleFileChange,
  } = useProfileFind();

  if (isLoading) {
    return <div className={S.loadingOrError}>프로필 정보를 불러오는 중입니다...</div>;
  }
  if (isError) {
    return (
      <div className={`${S.loadingOrError} text-red-500`}>
        프로필 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <div className={S.pageContainer}>
      {isEditing ? (
        <Header
          variant="profile-edit"
          onPost={handleSaveClick}
          onCancel={handleCancelClick}
        />
      ) : (
        <Header variant="profile" onPost={handleEditClick} />
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />

      {toastMessage && <Toast variant="success" message={toastMessage} />}

      <ProfileFormHeader
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        isUploading={isUploading}
        onProfileClick={handleProfileClick}
      />

      <ProfileForm
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        isKakaoUser={isKakaoUser}
        fields={fields}
      />
    </div>
  );
};

export default ProfileFind;
