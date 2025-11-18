export default function PasswordEdit() {
  return (
    <div className='w-full max-w-[688px] px-4 flex flex-col gap-4'>
      <div>
        <label className='block text-sm text-gray-700 mb-1'>현재 비밀번호</label>
        <input
          type='password'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='현재 비밀번호'
        />
      </div>
      <div>
        <label className='block text-sm text-gray-700 mb-1'>새 비밀번호</label>
        <input
          type='password'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='새 비밀번호'
        />
      </div>
      <div>
        <label className='block text-sm text-gray-700 mb-1'>새 비밀번호 확인</label>
        <input
          type='password'
          className='w-full border border-gray-300 rounded px-3 py-2'
          placeholder='비밀번호 확인'
        />
      </div>
    </div>
  )
}
