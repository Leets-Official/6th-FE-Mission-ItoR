import CommentItem from './CommentItem'
import CommentField from './CommentField'
import CommentCount from './CommentCount'
import { useComment } from '@/hooks/useComment'
import { useToast } from '@/context/ToastContext'
import { useModal } from '@/context/ModalContext'

export default function ListItemMain({ post }) {
  const {
    comments,
    newComment,
    setNewComment,
    commentRef,
    scrollToComments,
    addComment,
    deleteComment,
    updateComment,
  } = useComment(post.postId)

  const { showToast } = useToast()
  const { openModal } = useModal()

  /** 댓글 삭제 버튼 클릭 */
  const handleDeleteClick = (commentId: number) => {
    openModal('댓글을 삭제할까요?', async () => {
      await deleteComment(commentId)
      showToast('댓글이 삭제되었습니다.', 'positive')
    })
  }

  return (
    <section ref={commentRef} className='w-full flex flex-col items-center'>
      <CommentCount count={comments.length} />

      {comments.map((c) => (
        <CommentItem
          key={c.commentId}
          author={c.nickName}
          date={new Date(c.createdAt).toLocaleString()}
          content={c.content}
          onDelete={() => handleDeleteClick(c.commentId)}
          onEditSubmit={(value) => updateComment(c.commentId, value)}
        />
      ))}

      <CommentField
        state='active'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onSubmit={async () => {
          await addComment()
          showToast('댓글이 등록되었습니다.', 'positive')
        }}
      />
    </section>
  )
}
