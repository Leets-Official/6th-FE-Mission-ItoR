import { useLocation } from 'react-router-dom';
import { MYPAGE_ROUTES } from '@/constants';
import { useEditModeStore } from '@/stores/useEditModeStore';

type PageHeaderType = 'main' | 'detail' | 'write' | 'mypage' | 'editprofile';

export const usePageHeaderType = (): PageHeaderType => {
  const location = useLocation();
  const isEditMode = useEditModeStore(state => state.isEditMode);

  if (location.pathname === '/') {
    return 'main';
  }

  if (location.pathname.includes('/write')) {
    return 'write';
  }

  if (location.pathname === MYPAGE_ROUTES.MY_PROFILE) {
    return 'main';
  }

  if (location.pathname === MYPAGE_ROUTES.EDIT_PROFILE) {
    return isEditMode ? 'editprofile' : 'mypage';
  }

  if (location.pathname.startsWith('/mypage')) {
    return 'mypage';
  }

  return 'detail';
};
