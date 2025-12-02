import TextFiled from './TextFiled'

type TextFiledSetProps = {
  label: string
  placeholder?: string
  type?: string
  helperText?: string
  showHelper?: boolean
  helperType?: 'default' | 'error'
  hasError?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputClassName?: string
  required?: boolean
  maxLength?: number
  autoComplete?: string
  disabled?: boolean
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
  disabled = false,
}: TextFiledSetProps) {
  return (
    <div className={`flex flex-col w-[688px] ${showHelper ? 'gap-1' : 'gap-3'}`}>
      <label className='text-[14px] font-light leading-[160%] tracking-[-0.07px] text-gray-600'>
        {label}
      </label>

      <TextFiled
        size='small'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={`${inputClassName ?? ''} ${hasError ? 'border-[#FF3F3F]' : ''}`}
      />

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
