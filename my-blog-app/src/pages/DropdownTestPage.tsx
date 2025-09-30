import { ArrowDropdownMenu } from '../components/Dropdown/ArrowDropdownMenu'
import { MaterialDropdownMenu } from '../components/Dropdown/MaterialDropdownMenu'

export default function DropdownTestPage() {
  const oneItem = [{ label: 'menu 1', onClick: () => alert('menu 1 클릭') }]

  const twoItems = [
    { label: 'menu 1', onClick: () => alert('menu 1 클릭') },
    { label: 'menu 2', onClick: () => alert('menu 2 클릭') },
  ]

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900'>
      <h1 className='text-xl font-bold mb-4 text-white'>Dropdown Menu Test</h1>

      {/* Material Dropdown */}
      <MaterialDropdownMenu items={twoItems} />

      {/* Arrow Dropdown (1개, 2개) */}
      <ArrowDropdownMenu items={oneItem} />
      <ArrowDropdownMenu items={twoItems} />
    </div>
  )
}
