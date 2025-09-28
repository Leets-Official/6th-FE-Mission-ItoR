import { useState } from "react";
import Modal from "@ui/Modal";

function App() {
  const [openWithDesc, setOpenWithDesc] = useState(true);  
  const [openNoDesc, setOpenNoDesc] = useState(false);      

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 bg-gray-100 p-6">
      <div className="flex gap-3">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          onClick={() => setOpenWithDesc(true)}
        >
          설명 있는 모달 열기
        </button>
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          onClick={() => setOpenNoDesc(true)}
        >
          설명 없는 모달 열기
        </button>
      </div>

      {/* 설명 있는 모달 */}
      <Modal
        open={openWithDesc}
        onClose={() => setOpenWithDesc(false)}
        onConfirm={() => {
          // TODO: 확인 동작
          console.log("confirm with description");
        }}
        onCancel={() => {
          console.log("cancel with description");
        }}
        titleLines={["Title line one", "Title line two"]}
        descriptionLines={["description line one", "description line two"]}
        cancelText="취소"
        confirmText="삭제하기"
      />

      {/* 설명 없는 모달 */}
      <Modal
        open={openNoDesc}
        onClose={() => setOpenNoDesc(false)}
        onConfirm={() => {
          // TODO: 확인 동작
          console.log("confirm no description");
        }}
        onCancel={() => {
          console.log("cancel no description");
        }}
        titleLines={["Title line one", "Title line two"]}
        cancelText="취소"
        confirmText="삭제하기"
      />
    </div>
  );
}

export default App;
