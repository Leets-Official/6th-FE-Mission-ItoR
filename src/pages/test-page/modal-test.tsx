import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { Link } from "react-router-dom";

const ModalTest = () => {
  const [openWithDesc, setOpenWithDesc] = useState(false);
  const [openWithoutDesc, setOpenWithoutDesc] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        {/* ✅ 설명 있는 모달 열기 */}
        <button
          onClick={() => setOpenWithDesc(true)}
          className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          모달 열기 (설명 있음)
        </button>

        {/* ✅ 설명 없는 모달 열기 */}
        <button
          onClick={() => setOpenWithoutDesc(true)}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          모달 열기 (설명 없음)
        </button>

        {/* 설명 있는 모달 */}
        <Modal
          open={openWithDesc}
          title={
            <>
              Title line one <br />
              Title line two
            </>
          }
          description={
            <>
              description line one <br />
              description line two
            </>
          }
          onClose={() => setOpenWithDesc(false)}
          onConfirm={() => {
            alert("삭제됨!");
            setOpenWithDesc(false);
          }}
        />

        {/* 설명 없는 모달 */}
        <Modal
          open={openWithoutDesc}
          title={
            <>
              Title line one <br />
              Title line two
            </>
          }
          onClose={() => setOpenWithoutDesc(false)}
          onConfirm={() => {
            alert("삭제됨!");
            setOpenWithoutDesc(false);
          }}
        />
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

export default ModalTest;
