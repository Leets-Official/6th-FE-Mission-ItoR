import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GitlogLogo from '@/components/common/GitlogLogo'
import { KakaoIcon } from '@/assets/icons/KakaoIcon'
import { ClearIcon } from '@/assets/icons/ClearIcon'
import TextFiledSet from '@/components/TextFiled/TextFiledSet'
import { useLoginMutation } from '@/hooks/useAuth'

const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login } = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) {
      console.error('이메일과 비밀번호를 모두 입력해주세요.')
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
    // navigate 대신 window.location.href 사용
    if (BACKEND_BASE_URL) {
      // 2단계 로직: 백엔드의 카카오 로그인 시작 API로 유저를 리다이렉트합니다.
      window.location.href = `${BACKEND_BASE_URL}/auth/kakao`
    } else {
      // 환경 변수 설정 오류 처리
      console.error('FATAL: VITE_API_BASE_URL 환경 변수가 설정되지 않았습니다.')
      // ⚠️ 경고: alert() 대신 사용자 정의 모달 UI를 사용해야 합니다.
      alert('로그인 시스템 설정 오류입니다. 관리자에게 문의해주세요.')
    }
  }

  const goToSignUpMain = () => {
    onClose()
    navigate('/signup')
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50'>
      {/* 모달 전체 컨테이너 */}
      <div className='relative flex flex-row justify-center items-center w-[782px] max-w-[782px] py-[80px] bg-[#111112] rounded-[9px]'>
        {/* 닫기 버튼 */}
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
          {/* 이메일 / 비밀번호 입력 */}
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

          {/* 이메일 로그인 버튼 */}
          <button
            onClick={handleLogin}
            className='flex justify-center items-center h-[45px] px-[14px] rounded-[6px] bg-[#00A1FF] hover:bg-[#0092E8] text-white text-[14px] font-normal leading-[160%] tracking-[-0.07px] transition w-full'
          >
            이메일로 로그인
          </button>

          {/* SNS 구분선 */}
          <div className='flex justify-center items-center gap-[2px] w-[313px] my-[8px]'>
            <div className='w-[123px] h-[1px] bg-[#333]' />
            <span className='text-[12px] text-[#909090] font-normal leading-[160%]'>SNS</span>
            <div className='w-[123px] h-[1px] bg-[#333]' />
          </div>

          {/* 카카오 로그인 버튼 */}
          <button
            onClick={goToKakaoSignUp}
            className='flex justify-center items-center gap-[10px] h-[45px] px-[14px] rounded-[6px] bg-[#FEE500] hover:bg-[#FCD400] text-[15px] font-semibold text-[rgba(0,0,0,0.85)] leading-[150%] transition w-full'
          >
            <KakaoIcon />
            카카오로 로그인
          </button>

          {/* 회원가입 버튼 */}
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
