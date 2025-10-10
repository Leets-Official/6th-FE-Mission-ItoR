import { useState } from 'react'
import ConfirmModal from '../components/common/ConfirmModal/ConfirmModal'

export default function ConfirmModalTestPage() {
  const [isOpenWithDesc, setIsOpenWithDesc] = useState(false)
  const [isOpenWithoutDesc, setIsOpenWithoutDesc] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
      <h1 className='text-xl font-bold'>Confirm Modal Test</h1>

      {/* 버튼 1: description 있는 모달 */}
      <button
        onClick={() => setIsOpenWithDesc(true)}
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        설명 포함 모달 열기
      </button>

      <ConfirmModal
        isOpen={isOpenWithDesc}
        title={`Title line one\nTitle line two`}
        description={`description line one\ndescription line two`}
        cancelText='취소'
        confirmText='삭제하기'
        onCancel={() => setIsOpenWithDesc(false)}
        onConfirm={() => {
          alert('삭제 완료 (설명 있음)')
          setIsOpenWithDesc(false)
        }}
      />

      {/* 버튼 2: description 없는 모달 */}
      <button
        onClick={() => setIsOpenWithoutDesc(true)}
        className='px-4 py-2 bg-green-500 text-white rounded'
      >
        설명 없는 모달 열기
      </button>

      <ConfirmModal
        isOpen={isOpenWithoutDesc}
        title={`Title line one\nTitle line two`}
        cancelText='취소'
        confirmText='삭제하기'
        onCancel={() => setIsOpenWithoutDesc(false)}
        onConfirm={() => {
          alert('삭제 완료 (설명 없음)')
          setIsOpenWithoutDesc(false)
        }}
      />
    </div>
  )
}
