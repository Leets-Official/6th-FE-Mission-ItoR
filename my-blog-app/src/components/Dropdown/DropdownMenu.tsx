import { useState } from 'react'
import clsx from 'clsx'

interface DropdownItem {
  label: string
  onClick: () => void
}

interface DropdownMenuProps {
  items: DropdownItem[]
  variant?: 'arrow' | 'material'
}

export default function DropdownMenu({ items, variant = 'material' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const isArrow = variant === 'arrow'

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          'px-4 py-2 rounded text-white transition-colors duration-150',
          isArrow ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600',
        )}
      >
        {isArrow ? 'Arrow Dropdown' : 'Material Dropdown'}
      </button>

      {open && (
        <div
          className={clsx(
            'absolute mt-2 w-40 rounded-md shadow-lg bg-white z-10',
            isArrow ? 'border border-blue-200' : 'border border-gray-200',
          )}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={item.onClick}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700'
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
