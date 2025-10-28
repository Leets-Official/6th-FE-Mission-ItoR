import TextFiled from './TextFiled'

type TextFiledSetProps = {
  label: string
  placeholder?: string
  helperText?: string
  showHelper?: boolean
  helperType?: 'default' | 'error'
  hasError?: boolean // 에러 상태 여부
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputClassName?: string
  // 추가된 부분 (SignUpFormFields.tsx에서 사용 가능)
  required?: boolean
  maxLength?: number
  autoComplete?: string
}

export default function TextFiledSet({
  label,
  placeholder = 'Text filed',
  helperText,
  showHelper = false,
  helperType = 'default',
  hasError = false,
  value,
  onChange,
  inputClassName,
  required = false,
  maxLength,
  autoComplete,
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
        state='default'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={`${inputClassName ?? ''} ${hasError ? 'border-[#FF3F3F]' : 'border-[#E6E6E6]'}`}
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
