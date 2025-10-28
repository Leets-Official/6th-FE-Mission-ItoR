import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import { AddPhotoAlternateIcon } from '@/assets/icons/AddPhotoAlternateIcon'
import Toast from '@/components/common/Toast'
import { Button } from '@/components/Button/Button'
import Blank from '@/components/common/Blank'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { useBlogWrite } from '@/hooks/useBlogWrite'

export default function BlogWritePage() {
  const {
    title,
    setTitle,
    content,
    setContent,
    image,
    toastType,
    isMenuOpen,
    setIsMenuOpen,
    handleImageUpload,
    handleDeleteImage,
    handleSubmit,
  } = useBlogWrite()

  return (
    <div className='flex flex-col items-center min-h-screen bg-white'>
      {/* 상단 헤더 */}
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-4'>
            <Button intent='flat' className='!text-negative'>
              삭제하기
            </Button>
            <Button intent='flat' className='!text-black' onClick={handleSubmit}>
              게시하기
            </Button>
          </div>
        }
      />

      {/* 하단 subHeader */}
      <PageHeader
        title=''
        hideMenu
        subContent={
          <div className='flex justify-center items-center gap-3 px-2 pt-[2px] pb-1 rounded-[2px]'>
            <label className='flex justify-center items-center gap-1 text-[12px] text-gray-500 cursor-pointer'>
              <AddPhotoAlternateIcon /> 사진 추가하기
              <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' />
            </label>
          </div>
        }
      />

      {/* 제목 입력 */}
      <div className='mt-8 w-[688px]'>
        <Blank size='md' />
        <TextCard variant='secondary'>
          <input
            type='text'
            placeholder='제목'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border-b border-transparent text-[20px] font-medium p-2 focus:outline-none ${
              title.trim() ? 'text-black' : 'text-[#C8C8C8]'
            }`}
          />
        </TextCard>
        <Blank size='md' />
      </div>

      {/* 내용 입력 */}
      <Blank size='md' />
      <div className='mt-6 w-[688px]'>
        <TextCard variant='body'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='어떤 것을 깨달았나요?'
            className={`w-full h-[300px] border-none resize-none focus:outline-none text-[14px] leading-[160%] ${
              content.trim() ? 'text-gray-800' : 'text-[#C8C8C8]'
            }`}
          />
        </TextCard>
        <Blank size='md' />
      </div>

      {/* 이미지 미리보기 + 클릭 시 메뉴 */}
      {image && (
        <div
          className={`relative w-[600px] mt-6 flex flex-col justify-center items-center gap-2
          border ${isMenuOpen ? 'border-[#00A1FF]' : 'border-gray-200'} 
          bg-white rounded-md shadow-sm p-3 cursor-pointer`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img
            src={image}
            alt='첨부된 이미지'
            className='w-full rounded-md object-contain max-h-[400px]'
          />
          {isMenuOpen && (
            <div
              className='absolute flex justify-center items-center gap-2
              px-4 py-2 border border-[#00A1FF] bg-white rounded-md shadow-sm
              top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteImage()
                }}
                className='flex items-center gap-2 text-[14px] text-gray-700 hover:text-negative'
              >
                <TrashIcon />
                <span>삭제하기</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 토스트 */}
      {toastType !== 'none' && (
        <div className='fixed bottom-8 right-8'>
          <Toast
            type={toastType}
            message={toastType === 'negative' ? '내용을 입력해주세요.' : '저장되었습니다!'}
          />
        </div>
      )}
    </div>
  )
}
