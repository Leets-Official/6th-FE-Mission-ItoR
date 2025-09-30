import type { ButtonProps } from './Button.types'
import { base, variants } from './Button.styled'

export function Button({
  children,
  icon,
  iconSize,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const defaultIconSize = iconSize ?? (variant === 'tag' || variant === 'tagFilled' ? 10.5 : 18)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && (
        <span
          style={{
            width: `${defaultIconSize}px`,
            height: `${defaultIconSize}px`,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}
