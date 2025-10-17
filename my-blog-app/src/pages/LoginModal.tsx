import React, { useState } from 'react'
import GitlogLogo from '@/components/common/GitlogLogo'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'
import { ClearIcon } from '@/assets/icons/ClearIcon'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50'>
      <div className='relative bg-[#111112] rounded-[12px] w-[420px] max-w-[90%] p-8 text-white'>
        <button onClick={onClose} className='absolute top-4 right-4 hover:opacity-80 transition'>
          <ClearIcon variant='modal' />
        </button>

        <GitlogLogo size='48px' color='white' spacing='2px' />

        <div className='flex flex-col gap-3 mt-8'>
          <TextFiledSet
            label=''
            placeholder='이메일'
            inputClassName='bg-white'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFiledSet
            label=''
            placeholder='비밀번호'
            inputClassName='bg-white'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='mt-6 flex flex-col gap-3'>
          <button className='h-[45px] bg-primary rounded-[6px] hover:bg-[#0092E8] text-white text-[14px] font-medium'>
            이메일로 로그인
          </button>
          <button className='flex items-center justify-center gap-2 h-[45px] bg-[#FEE500] hover:bg-[#FCD400] rounded-[6px] text-[15px] font-semibold text-[rgba(0,0,0,0.85)]'>
            <KakaoIcon />
            카카오로 로그인
          </button>
        </div>

        <p className='text-center text-gray-300 text-[12px] mt-6'>
          You can make anything by writing.
        </p>
      </div>
    </div>
  )
}
