import TextFiled from './TextFiled'

type TextFiledSetProps = {
  label: string
  placeholder?: string
  helperText?: string
  showHelper?: boolean
  helperType?: 'default' | 'error'
  hasError?: boolean // 추가: 에러 상태 여부
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputClassName?: string
}

export default function TextFiledSet({
  label,
  placeholder = 'Text filed',
  helperText,
  showHelper = false,
  helperType = 'default',
  hasError = false, // 기본값 false (회색)
  value,
  onChange,
  inputClassName,
}: TextFiledSetProps) {
  return (
    <div className={`flex flex-col w-[688px] ${showHelper ? 'gap-1' : 'gap-3'}`}>
      {/* 라벨 */}
      <label className='text-[14px] font-light leading-[160%] tracking-[-0.07px] text-gray-600'>
        {label}
      </label>

      {/* 인풋 */}
      <TextFiled
        size='small'
        state='default' // 타입 충돌 방지: error 제거
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${inputClassName ?? ''} ${hasError ? 'border-[#FF3F3F]' : 'border-[#E6E6E6]'}`} // 빨간 테두리 조건부 적용
      />

      {/* 안내 문구 */}
      {showHelper && helperText && (
        <span
          className={`text-[12px] font-light leading-[160%] ${
            hasError || helperType === 'error' ? 'text-[#FF3F3F]' : 'text-[#909090]'
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}
