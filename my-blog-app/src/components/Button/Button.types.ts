export type ButtonProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  iconSize?: number
  onClick?: () => void
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
  disabled?: boolean
  className?: string
}
