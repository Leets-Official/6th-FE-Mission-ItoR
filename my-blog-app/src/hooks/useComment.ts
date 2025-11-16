import { useState, useRef, useEffect } from 'react'
import axiosInstance from '@/api/axiosInstance'

export interface Comment {
  commentId: number
  content: string
  nickName: string
  createdAt: string
}

export function useComment(postId: number) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const commentRef = useRef<HTMLDivElement>(null)

  /** 댓글 영역 스크롤 */
  const handleScrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /** 1) 댓글 조회 — GET */
  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/comments/post/${postId}`)
      setComments(res.data.data || [])
    } catch (err) {
      console.error('댓글 불러오기 실패:', err)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  /** 2) 댓글 등록 — POST */
  const handleAddComment = async () => {
    if (!newComment.trim()) return

    try {
      await axiosInstance.post('/comments', {
        postId,
        content: newComment.trim(),
      })

      setNewComment('')
      fetchComments() // 최신 댓글 다시 불러오기
    } catch (err) {
      console.error('댓글 등록 실패:', err)
    }
  }

  /** 3) 댓글 삭제 — DELETE */
  const handleDeleteClick = async (commentId: number) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`)
      fetchComments()
    } catch (err) {
      console.error('댓글 삭제 실패:', err)
    }
  }

  /** 4) 댓글 수정 — PATCH */
  const handleUpdateComment = async (commentId: number, content: string) => {
    try {
      await axiosInstance.patch(`/comments/${commentId}`, {
        content,
      })
      fetchComments()
    } catch (err) {
      console.error('댓글 수정 실패:', err)
    }
  }

  return {
    comments,
    newComment,
    commentRef,
    setNewComment,
    handleScrollToComments,
    handleAddComment,
    handleDeleteClick,
    handleUpdateComment,
  }
}
