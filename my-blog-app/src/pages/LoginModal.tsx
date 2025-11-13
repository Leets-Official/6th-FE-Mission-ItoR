import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GitlogLogo from '@/components/common/GitlogLogo'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'
import { ClearIcon } from '@/assets/icons/ClearIcon'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'
import { useLoginMutation } from '@/hooks/useLoginMutation'
import { useToast } from '@/context/ToastContext'
import { emailRegex, passwordRegex } from '@/utils/validation'

const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { mutate: login } = useLoginMutation(() => {
    onClose()
    navigate('/')
  })

  const { showToast } = useToast()

  const handleLogin = () => {
    if (!email || !password) {
      showToast('이메일과 비밀번호를 모두 입력해주세요.', 'negative')
      return
    }

    // 이메일 형식 검증
    if (!emailRegex.test(email)) {
      showToast('이메일 형식이 올바르지 않습니다.', 'negative')
      return
    }

    // 영문, 숫자, 특수문자 포함 가능 (8자 이상)
    if (!passwordRegex.test(password)) {
      showToast('비밀번호는 영문과 숫자를 포함해 8자 이상 입력해주세요.', 'negative')
      return
    }

    login({ email, password })
  }

  // 이동 핸들러
  const goToEmailSignUp = () => {
    onClose()
    navigate('/signup/email')
  }

  const goToKakaoSignUp = () => {
    onClose()
    if (BACKEND_BASE_URL) {
      window.location.href = `${BACKEND_BASE_URL}/auth/kakao`
    } else {
      showToast('로그인 시스템 설정 오류입니다. 관리자에게 문의해주세요.', 'negative')
    }
  }

  const goToSignUpMain = () => {
    onClose()
    navigate('/signup')
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50'>
      <div className='relative flex flex-row justify-center items-center w-[782px] max-w-[782px] py-[80px] bg-[#111112] rounded-[9px]'>
        <button onClick={onClose} className='absolute top-4 right-4 hover:opacity-80 transition'>
          <ClearIcon variant='modal' />
        </button>

        {/* 왼쪽 로고 섹션 */}
        <div className='flex flex-col justify-center items-center w-[308px] h-[160px] px-[13px] pt-[47.04px] pb-[36.93px]'>
          <GitlogLogo size='48px' color='white' spacing='2px' />
          <p className='flex justify-center items-center min-w-[240px] max-w-[344px] h-[46px] px-[16px] py-[12px] text-gray-400 text-[14px] font-light leading-[160%] text-center'>
            You can make anything by writing
          </p>
        </div>

        {/* 오른쪽 로그인 섹션 */}
        <div className='flex flex-col items-start gap-[8px] ml-[32px] min-w-[240px] max-w-[344px] px-[16px] py-[4px]'>
          <TextFiledSet
            label=''
            placeholder='이메일'
            inputClassName='bg-white text-gray-400 border border-[#E6E6E6] rounded-[4px] h-[46px] px-[16px] py-[12px] text-[14px] font-light leading-[160%]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFiledSet
            label=''
            placeholder='비밀번호'
            inputClassName='bg-white text-gray-400 border border-[#E6E6E6] rounded-[4px] h-[46px] px-[16px] py-[12px] text-[14px] font-light leading-[160%]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className='flex justify-center items-center h-[45px] px-[14px] rounded-[6px] bg-[#00A1FF] hover:bg-[#0092E8] text-white text-[14px] font-normal leading-[160%] tracking-[-0.07px] transition w-full'
          >
            이메일로 로그인
          </button>

          <div className='flex justify-center items-center gap-[2px] w-[313px] my-[8px]'>
            <div className='w-[123px] h-[1px] bg-[#333]' />
            <span className='text-[12px] text-[#909090] font-normal leading-[160%]'>SNS</span>
            <div className='w-[123px] h-[1px] bg-[#333]' />
          </div>

          <button
            onClick={goToKakaoSignUp}
            className='flex justify-center items-center gap-[10px] h-[45px] px-[14px] rounded-[6px] bg-[#FEE500] hover:bg-[#FCD400] text-[15px] font-semibold text-[rgba(0,0,0,0.85)] leading-[150%] transition w-full'
          >
            <KakaoIcon />
            카카오로 로그인
          </button>

          <button
            onClick={goToSignUpMain}
            className='flex justify-center items-center gap-[4px] px-[8px] pt-[2px] pb-[4px] rounded-[2px] text-[12px] font-normal text-[#909090] leading-[160%] hover:underline w-full justify-center'
          >
            또는 회원가입
          </button>
        </div>
      </div>
    </div>
  )
}
