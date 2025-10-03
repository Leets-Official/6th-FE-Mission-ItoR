import React from "react";
import Header from "@/components/Header/Header";
import HeaderLegacy from "@/components/Header/HeaderLegacy";

const HeaderTest = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 p-8">
      {/* 1. GitLog + 깃로그 쓰기 버튼 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header variant="write" onWriteClick={() => alert("깃로그 쓰기")} />
      </div>

      {/* 2. 오른쪽 아이콘 버전 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header
          variant="chatMenu"
          onChatClick={() => alert("채팅")}
          onMenuClick={() => alert("메뉴")}
        />
      </div>

      {/* 3. 삭제하기 / 게시하기 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header
          variant="action"
          onDeleteClick={() => alert("삭제")}
          onPublishClick={() => alert("게시")}
        />
      </div>

      {/* 4. 입력창 + 사진/파일 추가하기 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <HeaderLegacy />
      </div>
    </div>
  );
};

export default HeaderTest;
