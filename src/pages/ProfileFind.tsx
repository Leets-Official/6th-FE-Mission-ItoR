import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Profile from "@/assets/svgs/Profile.svg?react";
import Toast from "@/components/Toast";
import { useUserProfile, useUpdateUserProfile } from "@/hooks/auth/useAuth";
import { useUploadImage } from "@/hooks/usePosts";
import { UpdateUserProfilePayload } from "@/api/auth";

const ProfileFind: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Hooks ---
  const { data: userProfile, isLoading, isError } = useUserProfile();
  const { mutate: updateUser } = useUpdateUserProfile();
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  // --- State ---
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
    profilePicture: "", // Add profilePicture to form state
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
        profilePicture: userProfile.profilePicture || "", // Initialize with user data
      });
    }
  }, [userProfile]);

  // --- Event Handlers ---
  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form to original data, including profile picture
    if (userProfile) {
      setForm({
        ...form,
        name: userProfile.name || "",
        birthDate: userProfile.birthDate || "",
        nickname: userProfile.nickname || "",
        introduction: userProfile.introduction || "",
        profilePicture: userProfile.profilePicture || "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleSaveClick = () => {
    const payload: UpdateUserProfilePayload = {
      email: form.email,
      name: form.name,
      nickname: form.nickname,
      birthDate: form.birthDate,
      introduction: form.introduction,
      profilePicture: form.profilePicture, // Include profile picture in the payload
    };

    updateUser(payload, {
      onSuccess: () => {
        // Update localStorage with all new values
        localStorage.setItem("nickname", form.nickname);
        localStorage.setItem("introduction", form.introduction);
        localStorage.setItem("profilePicture", form.profilePicture);

        setToastMessage("저장되었습니다.");
        setTimeout(() => {
          window.location.href = "/profiledetail";
        }, 1500);
      },
      onError: (error) => {
        alert(error.message || "프로필 업데이트에 실패했습니다.");
      },
    });
  };

  const handleProfileClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only upload the image and update the local form state for preview
    uploadImage(file, {
      onSuccess: (url) => {
        setForm(prev => ({ ...prev, profilePicture: url }));
      },
      onError: () => {
        alert("이미지 업로드에 실패했습니다.");
      },
    });
  };

  // --- Render Data ---
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />

      {toastMessage && <Toast variant="success" message={toastMessage} />}

      <div className="w-full bg-[#F5F5F5] border-b border-gray-300 py-[60px] flex flex-col items-center justify-center">
        <button onClick={handleProfileClick} className="rounded-full disabled:cursor-not-allowed" disabled={!isEditing || isUploading}>
          {form.profilePicture ? (
            <img src={form.profilePicture} alt="profile" className="w-[88px] h-[88px] rounded-full object-cover" />
          ) : (
            <Profile className="w-[88px] h-[88px]" />
          )}
        </button>
        {isUploading && <p className="text-sm text-gray-500 mt-2">업로드 중...</p>}
        
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
