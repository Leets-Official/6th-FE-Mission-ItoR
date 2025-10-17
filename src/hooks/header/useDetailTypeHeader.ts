import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogWriteStore } from '@/stores/useBlogWriteStore';
import { useToast } from '@/contexts/ToastContext';
import { PAGEHEADER_TEXTS } from '@/constants';
import type { PostDetail, ContentItem } from '@/types/blog';
import type { DetailTypeHeaderReturn } from '@/types/pageheader';

//DetailTypeHeader 비즈니스 로직
export const useDetailTypeHeader = (): DetailTypeHeaderReturn => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setTitle, setBasicContent, setMarkdownContent, setMode } = useBlogWriteStore();
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //댓글 섹션으로 스크롤
  const handleChatClick = () => {
    const commentSection = document.querySelector('[data-comment-section]');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //  수정하기 버튼 클릭 핸들러
  const handleEdit = () => {
    // TODO: API 연결 시 삭제예정 - localStorage에서 게시글 찾기
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = savedPosts.find((p: PostDetail) => p.postId === Number(id));

    if (!post) {
      showToast('게시글을 찾을 수 없습니다', 'warning');
      return;
    }

    // 데이터 채우기
    setTitle(post.title);

    // MARKDOWN 타입이 있으면 마크다운 모드, 없으면 기본 모드
    const hasMarkdown = post.contents.some((c: ContentItem) => c.contentType === 'MARKDOWN');

    if (hasMarkdown) {
      const markdownContent = post.contents.find((c: ContentItem) => c.contentType === 'MARKDOWN')?.content || '';
      setMarkdownContent(markdownContent);
      setMode('markdown');
    } else {
      // TEXT와 IMAGE를 HTML로 재구성
      const htmlContent = post.contents
        .filter((c: ContentItem) => c.contentType === 'TEXT' || c.contentType === 'IMAGE')
        .sort((a: ContentItem, b: ContentItem) => a.contentOrder - b.contentOrder)
        .map((c: ContentItem) => {
          if (c.contentType === 'TEXT') {
            return `<p>${c.content}</p>`;
          } else if (c.contentType === 'IMAGE') {
            return `<img src="${c.content}" />`;
          }
          return '';
        })
        .join('');
      setBasicContent(htmlContent);
      setMode('basic');
    }

    navigate('/blog/write');
  };

  //삭제하기 버튼 클릭 핸들러
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  //삭제 확인 핸들러
  const handleConfirmDelete = () => {
    // TODO: API 연결 시 삭제예정 - localStorage에서 삭제
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const filteredPosts = savedPosts.filter((p: PostDetail) => p.postId !== Number(id));
    localStorage.setItem('blogPosts', JSON.stringify(filteredPosts));

    setIsDeleteModalOpen(false);
    navigate('/');
    showToast('게시글이 삭제되었습니다', 'positive');
  };

  //삭제 모달 닫기
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    // 핸들러
    handleChatClick,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCloseDeleteModal,
    // 모달 상태
    isDeleteModalOpen,
    // 텍스트 상수
    modalTexts: {
      confirm: PAGEHEADER_TEXTS.DETAIL.MODAL.CONFIRM,
      cancel: PAGEHEADER_TEXTS.DETAIL.MODAL.CANCEL,
      deleteTitle: PAGEHEADER_TEXTS.DETAIL.MODAL.DELETE_TITLE,
      deleteDescription: PAGEHEADER_TEXTS.DETAIL.MODAL.DELETE_DESCRIPTION,
    },
  };
};
