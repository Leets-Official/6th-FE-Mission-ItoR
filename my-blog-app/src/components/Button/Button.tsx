import type { ButtonProps } from './Button.types'
import { button } from './Button.styled'

export function Button({
  children,
  icon,
  iconSize,
  onClick,
  intent = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  const defaultIconSize = iconSize ?? (intent === 'tag' || intent === 'tagFilled' ? 10.5 : 18)

  return (
    <button onClick={onClick} disabled={disabled} className={button({ intent, size, className })}>
      {icon && (
        <span
          className='inline-flex items-center'
          style={{
            width: `${defaultIconSize}px`,
            height: `${defaultIconSize}px`,
          }}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}
