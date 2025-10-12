import DropdownMenu from '../../components/Dropdown/DropdownMenu'

export default function DropdownTestPage() {
  const oneItem = [{ label: 'menu 1', onClick: () => alert('menu 1 클릭') }]
  const twoItems = [
    { label: 'menu 1', onClick: () => alert('menu 1 클릭') },
    { label: 'menu 2', onClick: () => alert('menu 2 클릭') },
  ]

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900'>
      <h1 className='text-xl font-bold mb-4 text-white'>Dropdown Menu Test</h1>

      <DropdownMenu items={twoItems} variant='material' />
      <DropdownMenu items={oneItem} variant='arrow' />
      <DropdownMenu items={twoItems} variant='arrow' />
    </div>
  )
}
