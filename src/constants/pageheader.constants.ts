export const PAGEHEADER_TEXTS = {
  // 메인 페이지 헤더
  MAIN: {
    WRITE_BUTTON: '깃로그 쓰기',
    MODAL: {
      LOGIN_REQUIRED: '로그인이 필요합니다',
      CANCEL: '취소',
      GO_TO_LOGIN: '로그인 하러 가기',
    },
  },

  // 상세 페이지 헤더
  DETAIL: {
    DROPDOWN: {
      EDIT: '수정하기',
      DELETE: '삭제하기',
    },
    MODAL: {
      DELETE_TITLE: '해당 블로그를 삭제할까요?',
      DELETE_DESCRIPTION: '삭제된 블로그는 다시 확인할 수 없어요.',
      CANCEL: '취소',
      CONFIRM: '삭제하기',
    },
  },

  // 작성 페이지 헤더
  WRITE: {
    DELETE_BUTTON: '삭제하기',
    PUBLISH_BUTTON: '게시하기',
    MODAL: {
      DELETE_TITLE: '해당 블로그를 삭제하시겠어요?',
      DELETE_DESCRIPTION: '삭제된 블로그는 다시 확인할 수 없어요.',
      CANCEL: '취소',
      CONFIRM: '삭제하기',
    },
  },

  // 프로필 수정 페이지 헤더
  EDIT_PROFILE: {
    EDIT_BUTTON: '수정하기',
    CANCEL_BUTTON: '취소하기',
    SAVE_BUTTON: '저장하기',
  },
} as const;
