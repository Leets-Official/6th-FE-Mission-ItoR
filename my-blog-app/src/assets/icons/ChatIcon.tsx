type ChatIconProps = {
  className?: string
}

export function ChatIcon({ className = 'w-[20px] h-[20px] text-gray-800' }: ChatIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      className={`${className} fill-current shrink-0`}
    >
      <path d='M2 2H18V14H3.17L2 15.17V2ZM2 0C0.9 0 0.01 0.9 0.01 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0H2ZM4 10H12V12H4V10ZM4 7H16V9H4V7ZM4 4H16V6H4V4Z' />
    </svg>
  )
}
