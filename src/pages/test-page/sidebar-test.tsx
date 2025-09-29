import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

const SidebarTest = () => {
  return (
    <div className="flex h-screen items-stretch justify-center gap-6 bg-gray-100">
      <Sidebar variant="guest" />
      <Sidebar
        variant="user"
        nickname="%{닉네임}"
        intro="%{한줄 소개}"
        onMyPageClick={() => alert("마이페이지 이동")}
        onSettingClick={() => alert("설정 이동")}
        onLogoutClick={() => alert("로그아웃")}
      />
    </div>
  );
};

export default SidebarTest;
