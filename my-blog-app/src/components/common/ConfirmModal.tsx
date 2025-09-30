type ConfirmModalProps = {
  isOpen: boolean
  title: string
  description?: string
  cancelText?: string
  confirmText?: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  cancelText = '취소',
  confirmText = '삭제하기',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40'>
      <div className='flex flex-col items-start gap-6 w-[326px] p-6 pb-4 rounded bg-white shadow-md'>
        {/* Title */}
        <h2 className='w-full text-black text-[14px] font-sans leading-[160%] tracking-[-0.07px] whitespace-pre-line'>
          {title}
        </h2>

        {/* Description (있을 때만 표시) */}
        {description && (
          <p className='w-full text-[#909090] text-[12px] font-sans leading-[160%] whitespace-pre-line'>
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className='flex gap-2 w-full'>
          <button
            onClick={onCancel}
            className='flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-[2px] border border-[#F5F5F5] text-black text-[14px] leading-[160%] tracking-[-0.07px]'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-[2px] bg-[#FF3F3F] text-white text-[14px] leading-[160%] tracking-[-0.07px]'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
