import React, { useState } from "react";
import Header from "@/components/Header";
import TextFieldSet from "@/components/TextFieldSet";
import Profile from "@/assets/svgs/Profile.svg?react";

const ProfileFind: React.FC = () => {
  const [form] = useState({
    email: "ahksjhd@gmail.com",
    password: "",
    confirmPassword: "",
    name: "김철수",
    birth: "",
    nickname: "닉네임",
    intro: "한 줄 소개",
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header variant="profile" />

      <div className="w-full bg-[#F5F5F5] border-b border-gray-300 py-[60px] flex flex-col items-center justify-center">
        <Profile className="w-[88px] h-[88px] mr-[700px]" />
        <div className="flex flex-col  px-[430px]">
        <div className="w-[688px] flex flex-col gap-1 mr-[110px] text-[#909090] mt-[10px]">
          <TextFieldSet
            label=""
            value={form.name}
            onChange={() => {}}
          />
          <p className="text-[#909090] text-[12px]">* 20글자 이내</p>
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
          <TextFieldSet
            label="메일"
            value={form.email}
            onChange={() => {}}
            placeholder="이메일"
          />

          <TextFieldSet
            label="비밀번호"
            value={form.password}
            onChange={() => {}}
            placeholder="......"
          />

          <TextFieldSet
            label="비밀번호 확인"
            value={form.confirmPassword}
            onChange={() => {}}
            placeholder="......"
          />

          <TextFieldSet
            label="이름"
            value={form.name}
            onChange={() => {}}
            placeholder="이름"
          />

          <TextFieldSet
            label="생년월일"
            value={form.birth}
            onChange={() => {}}
            placeholder="YYYY.MM.DD"
          />
        </div>


      </div>
    </div>
  );
};

export default ProfileFind;
