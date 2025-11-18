import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Profile from "@/assets/svgs/Profile.svg?react";
import Toast from "@/components/Toast";
import { useUserProfile, useUpdateUserProfile } from "@/hooks/auth/useAuth";
import { UpdateUserProfilePayload } from "@/api/auth";

const ProfileFind: React.FC = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading, isError } = useUserProfile();
  const { mutate: updateUser } = useUpdateUserProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      setForm({
        email: userProfile.email || "",
        password: "",
        confirmPassword: "",
        name: userProfile.name || "",
        birthDate: userProfile.birthDate || "",
        nickname: userProfile.nickname || "",
        introduction: userProfile.introduction || "",
      });
    }
  }, [userProfile]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form to original data
    if (userProfile) {
      setForm({
        ...form,
        name: userProfile.name || "",
        birthDate: userProfile.birthDate || "",
        nickname: userProfile.nickname || "",
        introduction: userProfile.introduction || "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleSaveClick = () => {
    // TODO: Add password confirmation logic if password is changed
    const payload: UpdateUserProfilePayload = {
      email: form.email,
      name: form.name,
      nickname: form.nickname,
      birthDate: form.birthDate,
      introduction: form.introduction,
      // profilePicture: form.profilePicture, // TODO: Add profile picture upload logic
    };

    updateUser(payload, {
      onSuccess: () => {
        setToastMessage("저장되었습니다.");
        setTimeout(() => {
          setToastMessage(null);
          setIsEditing(false);
          navigate("/profiledetail");
        }, 1500);
      },
      onError: (error) => {
        alert(error.message || "프로필 업데이트에 실패했습니다.");
      },
    });
  };

  const fields = [
    { key: "email", label: "메일", placeholder: "이메일", disabled: !isEditing, type: "email" },
    { key: "password", label: "비밀번호", placeholder: "••••••••", type: "password", disabled: !isEditing },
    { key: "confirmPassword", label: "비밀번호 확인", placeholder: "••••••••", type: "password", disabled: !isEditing },
    { key: "name", label: "이름", placeholder: "이름", disabled: !isEditing, type: "text" },
    { key: "birthDate", label: "생년월일", placeholder: "YYYY.MM.DD", disabled: !isEditing, type: "text" },
  ] as const;

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">프로필 정보를 불러오는 중입니다...</div>;
  if (isError) return <div className="flex justify-center items-center min-h-screen text-red-500">프로필 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {isEditing ? (
        <Header variant="profile-edit" onPost={handleSaveClick} onCancel={handleCancelClick} />
      ) : (
        <Header variant="profile" onPost={handleEditClick} />
      )}

      {toastMessage && <Toast variant="success" message={toastMessage} />}

      {/* 상단 프로필 배너 */}
      <div className="w-full bg-[#F5F5F5] border-b border-gray-300 py-[60px] flex flex-col items-center justify-center">
        {/* 프로필 사진 */}
        {userProfile?.profilePicture ? (
          <img src={userProfile.profilePicture} alt="profile" className="w-[88px] h-[88px] rounded-full object-cover" />
        ) : (
          <Profile className="w-[88px] h-[88px]" />
        )}
        {/* 닉네임 및 한줄소개 */}
        <div className="flex flex-col gap-2 w-[568px] mt-4">
          <TextFieldSet
            label="닉네임"
            value={form.nickname}
            onChange={(value) => setForm({ ...form, nickname: value })}
            disabled={!isEditing}
          />
          <TextFieldSet
            label="한 줄 소개"
            value={form.introduction}
            onChange={(value) => setForm({ ...form, introduction: value })}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* 하단 폼 필드 */}
      <div className="flex flex-col mt-[60px] mx-auto w-[688px] mb-20">
        <div className="w-full flex flex-col gap-4">
          {fields.map(({ key, label, placeholder, disabled, type }) => (
            <TextFieldSet
              key={key}
              label={label}
              value={form[key]}
              placeholder={placeholder}
              onChange={(value) => setForm({ ...form, [key]: value })}
              disabled={disabled}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileFind;
