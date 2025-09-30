import type { ReactNode } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'flat'
  | 'tertiary'
  | 'ghost'
  | 'black'
  | 'blackMuted'
  | 'tag'
  | 'tagFilled'

export interface ButtonProps {
  children: ReactNode
  icon?: ReactNode
  iconSize?: number
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  className?: string
}
