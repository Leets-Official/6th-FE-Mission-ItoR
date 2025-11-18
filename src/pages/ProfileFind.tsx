import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Profile from "@/assets/svgs/Profile.svg?react";
import { useUserProfile } from "@/hooks/auth/useAuth"; // Import the new hook

const ProfileFind: React.FC = () => {
  const { data: userProfile, isLoading, isError } = useUserProfile();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: "",
    nickname: "",
    introduction: "",
  });

  useEffect(() => {
    if (userProfile) {
      setForm({
        email: userProfile.email || "",
        password: "", // Passwords are not fetched for security reasons
        confirmPassword: "",
        name: userProfile.name || "",
        birthDate: userProfile.birthDate || "",
        nickname: userProfile.nickname || "",
        introduction: userProfile.introduction || "",
      });
    }
  }, [userProfile]);

  // 반복되는 필드 정의 (닉네임과 한줄소개 제외)
  const fields = [
    { key: "email", label: "메일", placeholder: "이메일", disabled: true, type: "email" },
    { key: "password", label: "비밀번호", placeholder: "......", type: "password", disabled: true },
    { key: "confirmPassword", label: "비밀번호 확인", placeholder: "......", type: "password", disabled: true },
    { key: "name", label: "이름", placeholder: "이름", disabled: true, type: "text" },
    { key: "birthDate", label: "생년월일", placeholder: "YYYY.MM.DD", disabled: true, type: "text" },
  ] as const;

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">프로필 정보를 불러오는 중입니다...</div>;
  if (isError) return <div className="flex justify-center items-center min-h-screen text-red-500">프로필 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="profile" />

      {/* 상단 프로필 배너 */}
      <div className="w-full bg-[#F5F5F5] border-b border-gray-300 py-[60px] flex items-center justify-center">
        <div className="flex items-start justify-center gap-8 w-[688px]">
          {/* 프로필 사진 */}
          {userProfile?.profilePicture ? (
            <img src={userProfile.profilePicture} alt="profile" className="w-[88px] h-[88px] rounded-full object-cover" />
          ) : (
            <Profile className="w-[88px] h-[88px]" />
          )}
          {/* 닉네임 및 한줄소개 */}
          <div className="flex flex-col gap-2 w-[568px]">
            <TextFieldSet
              label="닉네임"
              value={form.nickname}
              onChange={(value) => setForm({ ...form, nickname: value })}
              disabled={true}
            />
            <TextFieldSet
              label="한 줄 소개"
              value={form.introduction}
              onChange={(value) => setForm({ ...form, introduction: value })}
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* 하단 폼 필드 */}
      <div className="flex flex-col mt-[60px] mx-auto w-[688px]">
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
