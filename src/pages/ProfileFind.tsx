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
    birthDate: "", // Changed from 'birth' to 'birthDate' to match API
    nickname: "",
    introduction: "", // Changed from 'intro' to 'introduction' to match API
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

  // 반복되는 필드 정의
  const fields = [
    { key: "email", label: "메일", placeholder: "이메일", disabled: true }, // Email is usually not editable
    { key: "password", label: "비밀번호", placeholder: "......", type: "password" },
    { key: "confirmPassword", label: "비밀번호 확인", placeholder: "......", type: "password" },
    { key: "name", label: "이름", placeholder: "이름" },
    { key: "birthDate", label: "생년월일", placeholder: "YYYY.MM.DD" }, // Changed key
  ] as const;

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">프로필 정보를 불러오는 중입니다...</div>;
  if (isError) return <div className="flex justify-center items-center min-h-screen text-red-500">프로필 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="profile" />

      <div className="w-full bg-gray-50 border-b border-gray-300 py-[60px] flex flex-col items-center justify-center">
        {userProfile?.profilePicture ? (
          <img src={userProfile.profilePicture} alt="profile" className="w-[88px] h-[88px] rounded-full object-cover" />
        ) : (
          <Profile className="w-[88px] h-[88px] mr-[700px]" />
        )}
        <div className="flex flex-col px-[430px]">
          <div className="w-[688px] flex flex-col gap-1 mr-[110px] text-gray-200 mt-[10px]">
            <TextFieldSet
              label=""
              value={form.nickname} // Display nickname here
              onChange={(value) => setForm({ ...form, nickname: value })}
            />
            <p className="text-gray-200 text-xs">* 20글자 이내</p>
            <TextFieldSet
              label=""
              value={form.introduction} // Display introduction here
              onChange={(value) => setForm({ ...form, introduction: value })}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[60px] px-[430px]">
        <div className="w-[688px] flex flex-col gap-4">
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
