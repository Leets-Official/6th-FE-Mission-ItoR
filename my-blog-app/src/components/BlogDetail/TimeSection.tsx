import Blank from '@/components/common/Blank'

export default function TimeSection({ date }: { date: string }) {
  return (
    <section className='flex flex-col items-center w-full'>
      <Blank size='lg' />
      <div className='w-[688px] max-w-[688px] flex justify-end text-[12px] text-[#909090] font-light leading-[160%]'>
        {date}
      </div>
    </section>
  )
}
