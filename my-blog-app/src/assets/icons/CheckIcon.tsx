type CheckIconProps = {
  className?: string
}

export function CheckIcon({
  className = 'w-check-icon h-check-icon text-positive',
}: CheckIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 18 14'
      className={`${className} fill-current shrink-0`}
    >
      <path d='M5.9999 11.2L1.7999 6.99998L0.399902 8.39998L5.9999 14L17.9999 1.99998L16.5999 0.599976L5.9999 11.2Z' />
    </svg>
  )
}
