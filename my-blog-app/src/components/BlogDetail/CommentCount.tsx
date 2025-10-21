export default function CommentCount({ count = 0 }: { count?: number }) {
  return (
    <div className='flex max-w-[688px] items-start gap-[40px] px-4 pt-4 pb-3 bg-white self-stretch'>
      <p className='text-[16px] font-medium leading-[160%] tracking-[-0.04px] text-black'>
        댓글
        <span className='ml-[4px] text-[#00A1FF] font-normal'>{count}</span>
      </p>
    </div>
  )
}
