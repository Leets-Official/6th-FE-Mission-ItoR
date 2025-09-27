import React, { useState } from "react";
import Button from "./Button";

interface ModalProps {
  titleLine1: string;
  titleLine2: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({ titleLine1, titleLine2, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleDelete = () => {
    alert("삭제");
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="blueBorder" onClick={openModal}>
        모달 열기
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[326px] h-[192px] rounded-lg relative flex flex-col justify-between">
            <div className={`flex flex-col pl-[40px] ${description ? "pt-4" : "pt-12"}`} >
              <p className="text-[16px] font-semibold text-left">{titleLine1}</p>
              <p className="text-[16px] font-semibold mt-1 text-left">{titleLine2}</p>
              {description && (
                <p className="text-[12px] text-gray-500 mt-2 text-left">
                  {description}
                </p>
              )}
            </div>

            <div className="flex justify-between absolute bottom-4 left-0 w-full px-[40px] gap-4">
              <button onClick={closeModal} className="w-[141px] h-[38px] bg-gray-100 text-gray-700 rounded-[2px] font-medium text-[14px]">
                취소
              </button>
              <button onClick={handleDelete} className="w-[141px] h-[38px] bg-red-500 text-white rounded-[2px] font-medium text-[14px]">
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

