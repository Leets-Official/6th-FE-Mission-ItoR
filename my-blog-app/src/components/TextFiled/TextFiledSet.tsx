import TextFiled from './TextFiled'

type TextFiledSetProps = {
  label: string
  placeholder?: string
  helperText?: string
  showHelper?: boolean
}

export default function TextFiledSet({
  label,
  placeholder = 'Text filed',
  helperText,
  showHelper = false,
}: TextFiledSetProps) {
  return (
    <div className={`flex flex-col w-[688px] ${showHelper ? 'gap-1' : 'gap-3'}`}>
      {/* 라벨 */}
      <label className='text-[14px] font-light leading-[160%] tracking-[-0.07px] text-gray-600'>
        {label}
      </label>

      {/* 인풋 */}
      <TextFiled size='small' state='default' placeholder={placeholder} />

      {/* 주의 문구 */}
      {showHelper && helperText && (
        <span className='text-[12px] font-light leading-[160%] text-gray-400'>{helperText}</span>
      )}
    </div>
  )
}
