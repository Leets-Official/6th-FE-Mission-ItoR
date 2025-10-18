import { useNavigate } from 'react-router-dom';
import { useModalStore } from '@/stores/useModalStore';
import { useBlogWriteStore } from '@/stores/useBlogWriteStore';
import { useToast } from '@/contexts/ToastContext';
import { PAGEHEADER_TEXTS } from '@/constants';
import { convertToApiFormat } from '@/utils/blogContentParser';


//컴포넌트 비즈니스 로직
export const useWriteTypeHeader = () => {
  const navigate = useNavigate();
  const { modalType, confirmButtonText, onModalConfirm, openModal, closeModal } = useModalStore();
  const { title, getCurrentContent, reset } = useBlogWriteStore();
  const { showToast } = useToast();


// 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    openModal(
      'delete',
      undefined,
      () => {
        reset();
        navigate(-1);
      },
      PAGEHEADER_TEXTS.WRITE.MODAL.CONFIRM,
    );
  };


//게시하기 버튼 클릭 핸들러
  const handlePublishClick = () => {
    const content = getCurrentContent();
    const { mode } = useBlogWriteStore.getState();

    // Validation: 제목과 내용 확인
    if (!title.trim() && !content.trim()) {
      showToast('내용을 입력해주세요', 'warning');
      return;
    }

    if (!title.trim()) {
      showToast('제목을 입력해주세요', 'warning');
      return;
    }

    if (!content.trim()) {
      showToast('내용을 입력해주세요', 'warning');
      return;
    }

    const payload = convertToApiFormat(title, content, mode === 'markdown');

    // TODO: API 호출 - API 연결 시 아래 localStorage 코드 삭제하고 여기에 POST 요청 구현

    // TODO: API 연결 시 삭제예정 - 임시: 로컬 스토리지에 저장 (백엔드 준비되기 전)
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    // TODO: API 연결 시 삭제예정 - 순차적인 ID 생성 (기존 포스트 중 최대 ID + 1)
    const maxId = savedPosts.length > 0
      ? Math.max(...savedPosts.map((p: any) => p.postId))
      : 0;
    const newPostId = maxId + 1;

    // TODO: API 연결 시 삭제예정 - 임시 PostDetail 객체 생성
    const newPost = {
      postId: newPostId,
      ...payload,
      isOwner: true,
      comments: [],
      nickName: 'User',
      profileUrl: '',
      introduction: '',
      createdAt: new Date().toISOString(),
    };
    savedPosts.push(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(savedPosts));

    reset();

    // 작성한 블로그 상세 페이지로 이동하고 성공 토스트 표시
    navigate(`/blog/${newPostId}`);
    showToast('저장되었습니다!', 'positive');
  };

  return {
    // 핸들러
    handleDeleteClick,
    handlePublishClick,
    // 모달 상태 (컴포넌트에서 모달 렌더링에 사용)
    modalType,
    confirmButtonText,
    onModalConfirm,
    closeModal,
  };
};
