import React from 'react';

interface ModalProps {
  titleLine1: string;
  titleLine2?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string; // ✅ 버튼 텍스트 변경 가능
  cancelText?: string; // ✅ 버튼 텍스트 변경 가능
  variant?: 'delete' | 'info'; // ✅ 모달 스타일 구분
}

const Modal: React.FC<ModalProps> = ({
  titleLine1,
  titleLine2,
  description,
  onClose,
  onConfirm,
  confirmText = '삭제하기',
  cancelText = '취소',
  variant = 'info', // 기본값은 일반 정보형
}) => {
  // ✅ variant별 버튼 색상 정의
  const confirmButtonStyle =
    variant === 'delete'
      ? 'bg-[#FF3F3F] text-white hover:bg-[#E63939]'
      : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]';

  const cancelButtonStyle = 'bg-gray-100 text-gray-700';

  // ✅ 'delete' variant일 때 기본 확인 버튼 텍스트를 '삭제하기'로 변경
  const effectiveConfirmText =
    variant === 'delete' && confirmText === '확인' ? '삭제하기' : confirmText;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 반투명 배경 + 블러 */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>

      {/* 모달 본체 */}
      <div className="bg-white w-[326px] rounded shadow-lg flex flex-col relative z-50 p-4 pt-6 gap-6">
        {/* 텍스트 */}
        <div className={`flex flex-col w-[294px] gap-2 pr-1 pl-1 rounded-xl`}>
          <p className="text-[16px] font-semibold text-left">{titleLine1}</p>
          {titleLine2 && <p className="text-[16px] font-semibold mt-1 text-left">{titleLine2}</p>}
          {description && <p className="text-[12px] text-gray-500 mt-2 text-left">{description}</p>}
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-between w-full gap-2">
          <button
            onClick={onClose}
            className={`w-[141px] h-[38px] rounded-sm font-medium text-[14px] py-2 px-3 border ${cancelButtonStyle}`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`w-[141px] h-[38px] rounded-sm font-medium text-[14px] py-2 px-3 ${confirmButtonStyle}`}
          >
            {effectiveConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
