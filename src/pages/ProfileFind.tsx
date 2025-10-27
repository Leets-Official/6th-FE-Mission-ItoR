import React, { useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Profile from "@/assets/svgs/Profile.svg?react";

const ProfileFind: React.FC = () => {
  const [form, setForm] = useState({
    email: "ahksjhd@gmail.com",
    password: "",
    confirmPassword: "",
    name: "김철수",
    birth: "",
    nickname: "닉네임",
    intro: "한 줄 소개",
  });

  // 반복되는 필드 정의
  const fields = [
    { key: "email", label: "메일", placeholder: "이메일" },
    { key: "password", label: "비밀번호", placeholder: "......" },
    { key: "confirmPassword", label: "비밀번호 확인", placeholder: "......" },
    { key: "name", label: "이름", placeholder: "이름" },
    { key: "birth", label: "생년월일", placeholder: "YYYY.MM.DD" },
  ] as const;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="profile" />

      <div className="w-full bg-gray-50 border-b border-gray-300 py-[60px] flex flex-col items-center justify-center">
        <Profile className="w-[88px] h-[88px] mr-[700px]" />
        <div className="flex flex-col px-[430px]">
          <div className="w-[688px] flex flex-col gap-1 mr-[110px] text-gray-200 mt-[10px]">
            <TextFieldSet
              label=""
              value={form.name}
              onChange={() => {}}
            />
            <p className="text-gray-200 text-xs">* 20글자 이내</p>
            <TextFieldSet
              label=""
              value={form.intro}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[60px] px-[430px]">
        <div className="w-[688px] flex flex-col gap-4">
          {fields.map(({ key, label, placeholder }) => (
            <TextFieldSet
              key={key}
              label={label}
              value={form[key]}
              placeholder={placeholder}
              onChange={(value) => setForm({ ...form, [key]: value })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileFind;
