import React from "react";

interface ModalProps {
  titleLine1: string;
  titleLine2: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  titleLine1,
  titleLine2,
  description,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 블러만 적용, 검정색 제거 */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* 흰색 모달 박스 */}
      <div className="bg-white w-[326px] h-[192px] rounded-lg flex flex-col justify-between shadow-lg z-50 relative">
        <div className={`flex flex-col pl-[40px] ${description ? "pt-4" : "pt-12"}`}>
          <p className="text-[16px] font-semibold text-left">{titleLine1}</p>
          <p className="text-[16px] font-semibold mt-1 text-left">{titleLine2}</p>
          {description && (
            <p className="text-[12px] text-gray-500 mt-2 text-left">{description}</p>
          )}
        </div>

        {/* 버튼은 모달 박스 안에 위치 */}
        <div className="flex justify-between absolute bottom-4 left-0 w-full px-[40px] gap-4">
          <button
            onClick={onClose}
            className="w-[141px] h-[38px] bg-gray-100 text-gray-700 rounded-[2px] font-medium text-[14px]"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-[141px] h-[38px] bg-red-500 text-white rounded-[2px] font-medium text-[14px]"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
