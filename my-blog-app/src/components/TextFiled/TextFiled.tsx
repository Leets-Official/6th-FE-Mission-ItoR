import React from 'react'
import clsx from 'clsx'

type TextFiledProps = {
  size?: 'large' | 'small' // font-32, font-14
  state?: 'default' | 'input' | 'click' | 'disabled'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextFiled({
  size = 'large',
  state = 'default',
  placeholder = 'Text field',
  value,
  onChange,
}: TextFiledProps) {
  const baseStyle =
    'flex items-center gap-[10px] w-[656px] px-4 py-3 rounded border font-sans bg-transparent'

  const sizeStyle = {
    large: 'text-[24px] font-medium leading-[160%]',
    small: 'text-[14px] font-light leading-[160%] tracking-[-0.07px]',
  }

  const stateStyle = {
    default: 'border-gray-100 text-gray-300',
    input: 'border-gray-100 text-black',
    click: 'border-gray-800 text-black',
    disabled:
      'border-gray-100 bg-gray-100 text-gray-300 placeholder:text-gray-300 cursor-not-allowed',
  }

  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={state === 'disabled'}
      className={clsx(baseStyle, sizeStyle[size], stateStyle[state])}
    />
  )
}
