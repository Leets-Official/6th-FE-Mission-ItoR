import { useState, useRef } from 'react'

export function useComment() {
  const [comments, setComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'positive' as 'positive' | 'negative',
  })

  const commentRef = useRef<HTMLDivElement>(null)

  /** 댓글 영역으로 스크롤 이동 */
  const handleScrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /** 댓글 추가 */
  const handleAddComment = () => {
    if (!newComment.trim()) {
      setToast({ show: true, message: '내용을 입력해주세요.', type: 'negative' })
      setTimeout(() => setToast({ show: false, message: '', type: 'positive' }), 2000)
      return
    }
    setComments((prev) => [...prev, newComment.trim()])
    setNewComment('')
    setToast({ show: true, message: '댓글이 등록되었습니다.', type: 'positive' })
    setTimeout(() => setToast({ show: false, message: '', type: 'positive' }), 2000)
  }

  /** 댓글 삭제 요청 */
  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index)
    setConfirmOpen(true)
  }

  /** 댓글 삭제 확정 */
  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      setComments((prev) => prev.filter((_, i) => i !== deleteIndex))
      setToast({ show: true, message: '댓글이 삭제되었습니다.', type: 'positive' })
      setTimeout(() => setToast({ show: false, message: '', type: 'positive' }), 2000)
    }
    setConfirmOpen(false)
  }

  return {
    comments,
    newComment,
    confirmOpen,
    toast,
    commentRef,
    setNewComment,
    setConfirmOpen,
    handleScrollToComments,
    handleAddComment,
    handleDeleteClick,
    handleDeleteConfirm,
  }
}
