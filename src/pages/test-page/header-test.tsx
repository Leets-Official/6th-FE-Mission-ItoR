import React from "react";
import Header from "@/components/Header/Header";
import HeaderLegacy from "@/components/Header/HeaderLegacy";

const HeaderTest = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 p-8">
      {/* 1. 깃로그 쓰기 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header variant="write" onWriteClick={() => alert("깃로그 쓰기")} />
      </div>

      {/* 2. 오른쪽 아이콘 */}
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

      {/* 4. 버튼 없는 기본 헤더 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header variant="plain" />
      </div>

      {/* 5. 수정하기 버튼 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header variant="edit" onEditClick={() => alert("수정하기")} />
      </div>

      {/* 6. 취소하기 / 저장하기 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <Header
          variant="saveCancel"
          onCancelClick={() => alert("취소하기")}
          onSaveClick={() => alert("저장하기")}
        />
      </div>

      {/* 7. Legacy 버전 */}
      <div className="w-full max-w-4xl rounded-md bg-white shadow">
        <HeaderLegacy />
      </div>
    </div>
  );
};

export default HeaderTest;
