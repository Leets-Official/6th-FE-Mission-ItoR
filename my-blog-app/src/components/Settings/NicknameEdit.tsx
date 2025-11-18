export default function NicknameEdit() {
  return (
    <div className='w-full max-w-[688px] px-4'>
      <label className='block text-sm text-gray-700 mb-1'>닉네임</label>
      <input
        type='text'
        className='w-full border border-gray-300 rounded px-3 py-2'
        placeholder='닉네임 입력'
      />
    </div>
  )
}
