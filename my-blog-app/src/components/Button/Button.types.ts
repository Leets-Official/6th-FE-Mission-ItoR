import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  icon?: ReactNode
  iconSize?: number
  intent?:
    | 'primary'
    | 'secondary'
    | 'flat'
    | 'tertiary'
    | 'ghost'
    | 'black'
    | 'blackMuted'
    | 'tag'
    | 'tagFilled'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
