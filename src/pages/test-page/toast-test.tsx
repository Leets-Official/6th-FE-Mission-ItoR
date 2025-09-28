import React, { useState } from "react";
import Toast from "@/components/Toast/Toast";
import { Link } from "react-router-dom";

const ToastTest = () => {
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center gap-4 bg-gray-50">
      <div className="flex gap-4">
        <button
          onClick={() => setToast({ type: "success", msg: "저장되었습니다!" })}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          성공 토스트
        </button>

        <button
          onClick={() => setToast({ type: "error", msg: "내용을 입력해주세요." })}
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          에러 토스트
        </button>

        {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      </div>
      <div className="absolute bottom-40">
        <Link to="/">
          <button className="bg-brand-blue rounded-md px-4 py-2 font-medium text-white hover:bg-blue-500">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ToastTest;
