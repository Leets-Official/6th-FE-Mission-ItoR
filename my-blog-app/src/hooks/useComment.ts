import { useState, useRef, useEffect } from 'react'
import axiosInstance from '@/api/axiosInstance'

export interface Comment {
  commentId: number
  content: string
  nickName: string
  createdAt: string
}

export function useComment(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const commentRef = useRef<HTMLDivElement>(null)

  /** 댓글 영역으로 스크롤 */
  const scrollToComments = () => {
    commentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /** 댓글 조회 */
  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/comments/post/${postId}`)
      setComments(res.data.data || [])
    } catch (err) {
      console.error('댓글 조회 실패:', err)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  /** 댓글 등록 */
  const addComment = async () => {
    if (!newComment.trim()) return

    try {
      await axiosInstance.post(`/comments/${postId}`, {
        content: newComment.trim(),
      })
      setNewComment('')
      fetchComments()
    } catch (err) {
      console.error('댓글 등록 실패:', err)
    }
  }

  /** 댓글 삭제 */
  const deleteComment = async (commentId: number) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`)
      fetchComments()
    } catch (err) {
      console.error('댓글 삭제 실패:', err)
    }
  }

  /** 댓글 수정 */
  const updateComment = async (commentId: number, value: string) => {
    try {
      await axiosInstance.patch(`/comments/${commentId}`, {
        content: value,
      })
      fetchComments()
    } catch (err) {
      console.error('댓글 수정 실패:', err)
    }
  }

  return {
    comments,
    newComment,
    setNewComment,
    commentRef,
    scrollToComments,
    addComment,
    deleteComment,
    updateComment,
  }
}
