import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import TextCard from '@/components/common/TextCard'
import { AddPhotoAlternateIcon } from '@/assets/icons/AddPhotoAlternateIcon'
import { Button } from '@/components/Button/Button'
import Blank from '@/components/common/Blank'
import { TrashIcon } from '@/assets/icons/TrashIcon'
import { useBlogWrite } from '@/hooks/useBlogWrite'
import axiosInstance from '@/api/axiosInstance'
import { useToast } from '@/context/ToastContext'

export default function BlogWritePage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const {
    title,
    setTitle,
    content,
    setContent,
    imagePreview,
    setImagePreview,
    handleImageUpload,
    handleDeleteImage,
    handleSubmit,
  } = useBlogWrite()

  // 수정 모드: 기존 게시글 불러오기
  useEffect(() => {
    if (!postId) return
    axiosInstance
      .get('/posts/token', { params: { postId } })
      .then((res) => {
        const post = res.data.data
        setTitle(post.title)
        setContent(post.contents?.[0]?.content || '')
        if (post.contents.some((c: { contentType: string }) => c.contentType === 'IMAGE')) {
          const image = post.contents.find(
            (c: { contentType: string }) => c.contentType === 'IMAGE',
          )
          setImagePreview(image?.content)
        }
      })
      .catch(() => showToast('게시글 불러오기 실패', 'negative'))
  }, [postId])

  // 게시 or 수정
  const handleSubmitClick = async () => {
    if (!title.trim()) return showToast('제목을 입력해주세요.', 'negative')
    if (!content.trim()) return showToast('본문 내용을 입력해주세요.', 'negative')

    try {
      if (postId) {
        // 수정 모드
        await axiosInstance.patch(
          '/posts',
          {
            title,
            contents: [
              { contentOrder: 1, content, contentType: 'TEXT' },
              ...(imagePreview
                ? [{ contentOrder: 2, content: imagePreview, contentType: 'IMAGE' }]
                : []),
            ],
          },
          {
            params: { postId },
          },
        )

        showToast('게시글이 수정되었습니다.', 'positive')
        navigate(`/blog/${postId}`)
      } else {
        // 새 작성
        await handleSubmit()
      }
    } catch (error) {
      showToast('요청에 실패했습니다.', 'negative')
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen bg-white'>
      <PageHeader
        title='GITLOG'
        rightContent={
          <div className='flex gap-4'>
            {postId && (
              <Button intent='flat' className='!text-negative' onClick={handleDeleteImage}>
                삭제하기
              </Button>
            )}
            <Button intent='flat' className='!text-black' onClick={handleSubmitClick}>
              {postId ? '수정하기' : '게시하기'}
            </Button>
          </div>
        }
      />

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

      {imagePreview && (
        <div className='relative w-[600px] mt-6 flex flex-col justify-center items-center gap-2 border border-gray-200 bg-white rounded-md shadow-sm p-3'>
          <img
            src={imagePreview}
            alt='첨부된 이미지'
            className='w-full rounded-md object-contain max-h-[400px]'
          />
          <button
            onClick={handleDeleteImage}
            className='absolute top-2 right-2 text-gray-600 hover:text-negative flex items-center gap-1'
          >
            <TrashIcon />
            삭제
          </button>
        </div>
      )}
    </div>
  )
}
