import TextFiled from '../../components/TextFiled/TextFiled'

export default function TextFiledTestPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 bg-purple-100 p-8'>
      <h1 className='text-xl font-bold mb-4'>TextFiled Test</h1>

      {/* font-32 large */}
      <TextFiled size='large' state='default' placeholder='Text filed' />
      <TextFiled size='large' state='input' value='Text filed' />
      <TextFiled size='large' state='click' value='Text filed' />
      <TextFiled size='large' state='disabled' placeholder='Text filed' />

      {/* font-14 small */}
      <TextFiled size='small' state='default' placeholder='Text filed' />
      <TextFiled size='small' state='input' value='Text filed' />
      <TextFiled size='small' state='click' value='Text filed' />
      <TextFiled size='small' state='disabled' placeholder='Text filed' />
    </div>
  )
}
