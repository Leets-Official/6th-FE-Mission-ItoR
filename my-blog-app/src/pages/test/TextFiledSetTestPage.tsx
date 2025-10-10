import TextFiledSet from '../../components/TextFiled/TextFiledSet'

export default function TextFiledSetTestPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8 bg-purple-100 p-8'>
      <h1 className='text-xl font-bold mb-4'>TextFilled Set Test</h1>

      {/* 주의 문구 없는 경우 */}
      <TextFiledSet label='제목' placeholder='Text filed' />

      {/* 주의 문구 있는 경우 */}
      <TextFiledSet
        label='제목'
        placeholder='Text filed'
        helperText='* 주의 문구'
        showHelper={true}
      />
    </div>
  )
}
